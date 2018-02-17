define([
    'bluebird',
    'moment',
    'knockout-plus',
    'kb_service/utils',
    '../../lib/rpc',
    '../../lib/searchApi'
], function (
    Promise,
    moment,
    ko,
    apiUtils,
    Rpc,
    SearchAPI
) {
    'use strict';

    // For now, this fakes the search...
    function factory(params) {
        var maxSearchResults = params.maxSearchItems;
        var rpc = Rpc.make({
            runtime: params.runtime
        });
        var types = params.types;

        var searchConfig = {
            // max number of search result items to hold in the buffer
            // before we start removing those out of view
            maxBufferSize: params.maxBufferSize || 100,
            // number of search items to fetch at one time.
            fetchSize: params.pageSize || 20,
        };


        function objectToViewModel(obj) {
            var type = types.getTypeForObject(obj);
            if (!type) {
                console.error('ERROR cannot type object', obj);
                throw new Error('Cannot type this object');
            }
            obj.type = type.getDef();
            
            var ref = type.getRef();
            var detail = type.detail();
            var detailMap = detail.reduce(function (m, field) {
                m[field.id] = field;
                return m;
            }, {});

            var icon = types.getIcon(type);
            // if (icon && icon.type !== 'fontAwesome') {
            //     console.log('icon?', icon);
            // }

            var matches = Object.keys(obj.highlight).reduce(function (matches, field) {
                if (field === 'source_tags') {
                    console.warn('highlight field ' + field + ' ignored');
                    return matches;
                } 
                var label;                
                if (!type.getDef().searchKeysMap[field]) {
                    // TODO: make this configurable?
                    console.warn('highlight field ' + field + ' not found in type spec', obj);
                    switch (field) {
                    case 'object_name':
                        label = 'Object Name';
                        break;
                    default:
                        label = field;
                    }                   
                } else {
                    label =  type.getDef().searchKeysMap[field].label;
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
                    id: obj.type,
                    label: type.getDef().label,
                    icon: icon
                },
                matchClass: {
                    id: type.getDef().ui.class,
                    copyable: type.getDef().ui.copyable,
                    viewable: type.getDef().ui.viewable,
                    ref: ref
                },

                // Detail, type-specific
                detail: detail,

                url: window.location.origin + '#dataview/' + ref.workspaceId + '/' + ref.objectId + '/' + ref.version,

                // should be different per object type? E.g. narrative - nice name, others object name??
                // Generic fields
                title: obj.object_name,
                name: obj.object_name,                
                date: new Date(obj.timestamp),
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
                    })
                    // then sort them by the type.
                    .sort(function (a, b) {
                        return a.type.id < b.type.id;
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
            var searchApi = SearchAPI.make({
                runtime: params.runtime
            });
            console.log('search api query:', query);
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
                .spread(function (objectResults, typeResults) {
                    console.log('search api results (object, type):', JSON.parse(JSON.stringify(objectResults)), typeResults);
                    var objects = objectResults.objects.map(function (object) {
                        return objectToViewModel(object);
                    });
                    // console.log('objects ordered??', objects.map(function (o) {return [o.date, o.matchClass.ref.workspaceId, o.type.id];}));
                    var totalByType = Object.keys(typeResults.type_to_count).map(function (typeName) {
                        return {
                            id: typeName.toLowerCase(),
                            count: typeResults.type_to_count[typeName]
                        };
                    });
                    var totalSearchHits;
                    if (objectResults.total > maxSearchResults) {
                        totalSearchHits = maxSearchResults;
                    } else {
                        totalSearchHits = objectResults.total;
                    }
                    var narratives = Object.keys(objectResults.access_group_narrative_info)
                        .map(function (workspaceId) {
                            var info = objectResults.access_group_narrative_info[workspaceId];
                            var narrative =  {
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
                            narrative.url = window.location.origin + '/narrative/ws.' + narrative.ref.workspaceId + '.obj.' + narrative.ref.objectId;                            
                            return narrative;
                        })
                        .sort(function (a, b) {
                            return -(a.ref.workspaceId - b.ref.workspaceId);
                        });
                    
                    return {
                        items: objects,
                        narratives: narratives,
                        first: query.start,
                        isTruncated: true,
                        summary: {
                            totalByType: totalByType,
                            totalSearchHits: totalSearchHits,
                            totalSearchSpace: objectResults.total,
                            isTruncated: (totalSearchHits < objectResults.total)
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
            search: search
        };
    }

    return {
        make: factory
    };
});