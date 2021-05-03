define(['bluebird', 'moment', 'knockout', '../../lib/searchApi'], function (Promise, moment, ko, SearchAPI) {
    'use strict';

    // For now, this fakes the search...
    function factory(params) {
        var maxSearchResults = params.maxSearchItems;
        var types = params.types;

        var searchConfig = {
            // max number of search result items to hold in the buffer
            // before we start removing those out of view
            maxBufferSize: params.maxBufferSize || 100,
            // number of search items to fetch at one time.
            fetchSize: params.pageSize || 20
        };

        function isBlacklistedHighlightField(fieldName) {
            return ['tags'].includes(fieldName);
        }

        function objectToViewModel(obj) {
            const typedObject = types.getTypeForObject(obj);
            if (!typedObject) {
                console.error('ERROR cannot type object', obj);
                throw new Error('Cannot type this object');
            }

            const ref = typedObject.getRef();
            const detail = typedObject.detail();
            const detailMap = detail.reduce(function (m, field) {
                m[field.id] = field;
                return m;
            }, {});

            const icon = typedObject.getIcon();

            const matches = Object.keys(obj.highlight).reduce(function (matches, field) {
                if (isBlacklistedHighlightField(field)) {
                    console.warn('highlight field ' + field + ' ignored');
                    return matches;
                }

                var label = typedObject.getSearchFieldLabel(field);
                if (!label) {
                    label = field;
                    console.warn('highlight field ' + field + ' not found in type spec', obj);
                }

                matches.push({
                    id: field,
                    label: label,
                    highlights: obj.highlight[field].map(function (highlight) {
                        return {
                            highlight: highlight
                        };
                    })
                });
                return matches;
            }, []);

            // Uncomment to re-enable highlights merging into details
            // detail.forEach(function (field) {
            //     if (matchMap[field.id]) {
            //         field.highlights = matchMap[field.id].highlights;
            //     }
            // });

            var vm = {
                type: {
                    label: typedObject.getLabel(),
                    icon: icon
                },
                matchClass: {
                    id: typedObject.getUIClass(),
                    copyable: typedObject.isCopyable(),
                    viewable: typedObject.isViewable(),
                    ref
                },

                // Detail, type-specific
                detail: detail,

                url: window.location.origin + '#dataview/' + ref.workspaceId + '/' + ref.objectId + '/' + ref.version,

                // should be different per object type? E.g. narrative - nice name, others object name??
                // Generic fields
                title: typedObject.getTitle(),
                name: obj.object_name,
                date: new Date(obj.modified_at),
                scientificName: detailMap.scientificName ? detailMap.scientificName.value || '' : '',

                matches: matches,
                selected: ko.observable(),
                showMatches: ko.observable(false),
                showDetails: ko.observable(false),
                active: ko.observable(false)
            };

            return vm;
        }

        function groupByNarrative(searchResult) {
            // group into workspaces
            var grouped = searchResult.items.reduce(function (groups, item) {
                var id = String(item.matchClass.ref.workspaceId);
                if (!groups[id]) {
                    groups[id] = {
                        items: [],
                        matchedTerms: {}
                    };
                }
                groups[id].items.push(item);
                item.matches.forEach(function (match) {
                    groups[id].matchedTerms[match.term] = true;
                });
                return groups;
            }, {});

            searchResult.summary.totalNarrativeCount = Object.keys(grouped).length;

            searchResult.narratives.forEach(function (narrative) {
                narrative.objects = grouped[String(narrative.ref.workspaceId)].items
                    // get a separate array of items
                    .map(function (item) {
                        return item;
                    });

                // Get the summary of object types per narrative.
                var summary = {};
                narrative.objects.forEach(function (object) {
                    if (!summary[object.type.id]) {
                        summary[object.type.id] = {
                            id: object.type.id,
                            label: object.type.label,
                            count: 0
                        };
                    }
                    summary[object.type.id].count += 1;
                });
                narrative.summary = Object.keys(summary).map(function (key) {
                    return summary[key];
                });
                return narrative;
            });

            return searchResult;
        }

        function search(query) {
            const searchApi = SearchAPI.make({
                runtime: params.runtime
            });
            return Promise.all([
                searchApi.narrativeObjectSearch({
                    query: query.terms.join(' '),
                    page: query.start || 0,
                    pageSize: searchConfig.fetchSize,
                    withPrivateData: query.withPrivateData,
                    withPublicData: query.withPublicData
                }),
                searchApi.typeSearch({
                    query: query.terms.join(' '),
                    withPrivateData: query.withPrivateData,
                    withPublicData: query.withPublicData,
                    dataSource: 'narratives'
                })
            ])
                .then(([objectResults, typeResults]) => {
                    const objects = objectResults.objects.map(function (object) {
                        return objectToViewModel(object);
                    });
                    const totalByType = Object.keys(typeResults.type_to_count)
                        .map(function (typeName) {
                            return {
                                id: typeName.toLowerCase(),
                                count: typeResults.type_to_count[typeName]
                            };
                        });
                    let totalSearchHits;
                    if (objectResults.total > maxSearchResults) {
                        totalSearchHits = maxSearchResults;
                    } else {
                        totalSearchHits = objectResults.total;
                    }

                    const narratives = Object.keys(objectResults.access_group_narrative_info)
                        .map(function (workspaceId) {
                            const info = objectResults.access_group_narrative_info[workspaceId];

                            if (info === null) {
                                return {
                                    isNarrative: false,
                                    name: 'not a narrative (name)',
                                    title: 'not a narrative (title)',
                                    ref: {
                                        workspaceId: parseInt(workspaceId, 10),
                                        objectId: null
                                    },
                                    modified: null,
                                    owner: null,
                                    active: ko.observable(false)
                                };
                            }

                            const narrative = {
                                isNarrative: info[0] ? true : false,
                                name: info[0],
                                title: info[0],
                                ref: {
                                    workspaceId: parseInt(workspaceId, 10),
                                    objectId: info[1]
                                },
                                modified: moment(info[2]).toDate(),
                                owner: {
                                    username: info[3],
                                    realName: info[4]
                                },
                                active: ko.observable(false)
                            };
                            narrative.url = `${window.location.origin}/narrative/${narrative.ref.workspaceId}`;
                            return narrative;
                        })
                        .sort(function (a, b) {
                            return -(a.ref.workspaceId - b.ref.workspaceId);
                        });

                    return {
                        items: objects,
                        narratives,
                        first: query.start,
                        isTruncated: true,
                        summary: {
                            totalByType: totalByType,
                            totalSearchHits: totalSearchHits,
                            totalSearchSpace: objectResults.total,
                            isTruncated: totalSearchHits < objectResults.total
                        },
                        stats: {
                            objectSearch: objectResults.search_time,
                            typeSearch: typeResults.search_time
                        }
                    };
                })
                .then(function (result) {
                    return groupByNarrative(result);
                });
        }

        return {
            search
        };
    }

    return {
        make: factory
    };
});
