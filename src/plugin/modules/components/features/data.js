define([
    'bluebird',
    'knockout-plus',
    '../../lib/searchApi',
    '../../lib/types/utils',
    'yaml!../../data/stopWords.yml'
], function (
    Promise,
    ko,
    SearchAPI,
    utils,
    stopWordsDb
) {
    'use strict';

    function isStopWord(word) {
        if (stopWordsDb.warn.indexOf(word) >= 0) {
            return true;
        }
        if (stopWordsDb.ignore.indexOf(word) >= 0) {
            return true;
        }
        return false;
    }

    // For now, this fakes the search...
    function factory(params) {
        var maxSearchResults = params.maxSearchItems;

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

            var icon = type.getIcon();

            var ref = type.getRef();
            var detail = type.detail();
            var detailMap = detail.reduce(function (m, field) {
                m[field.id] = field;
                return m;
            }, {});

            var matches = Object.keys(obj.highlight).reduce(function (matches, field) {
                if (field === 'source_tags') {
                    console.warn('highlight field ' + field + ' ignored');
                    return matches;
                }

                var label = type.getSearchFieldLabel(field);
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
                    label: type.getLabel(),
                    icon: icon
                },
                matchClass: {
                    id: type.getUIClass(),
                    copyable: type.isCopyable(),
                    viewable: type.isViewable(),
                    ref: ref
                },
                ref: ref,
                // Detail, type-specific
                detail: detail,

                url: window.location.origin + '#dataview/' + ref.dataviewId,

                // should be different per object type? E.g. narrative - nice name, others object name??
                // Generic fields
                name: obj.object_name,
                date: new Date(obj.timestamp),

                id: detailMap.id.value,
                featureType: detailMap.feature_type.value,
                functions: detailMap.functions.value,
                scientificName: detailMap.genome_scientific_name.value,
                matches: matches,
                selected: ko.observable(),
                showMatches: ko.observable(false),
                showDetails: ko.observable(false),
                active: ko.observable(false)
            };
            return vm;
        }

        function objectInfoToGenomeInfo(group) {
            const item = group.items[0];
            // JS doesn't like the +0000 offset in the date string.
            /*
            const savedDate = saveDate.replace(/[+](\d\d)(\d\d)$/, (_match, hours, minutes) => {
                return '+' + hours + ':' + minutes;
            });
            */
            return {
                // genome info extracted mostly from the metadata
                scientificName: item.scientificName,
                kbaseGenomeId: group.ref.objectRef,
                domain: null,
                lineage: null,
                source: null,
                sourceId: null,
                dnaSize: null,
                contigCount: null,
                featureCount: null,
                gcContent: null,

                // object ref
                ref: group.ref.objectRef,
                objectId: group.ref.objectId,
                workspaceId: group.ref.workspaceId,
                objectVersion: group.ref.version,
                objectName: null,

                // object stats
                lastSavedAt: item.timestamp,
                lastSavedBy: item.creator

                // source info ... narrative or ref data
            };
        }

        function workspaceInfoToContainerInfo(info) {
            const id = info[0];
            const owner = info[2];
            const containerInfo = {
                workspaceId: id,
                owner: owner,
                modificationDate: null
            };
            return containerInfo;
        }

        function search(query) {
            var searchApi = SearchAPI.make({
                runtime: params.runtime
            });
            return Promise.all([
                searchApi.featuresSearch({
                    query: query.terms.join(' '),
                    withUserData: query.withUserData,
                    withReferenceData: query.withReferenceData,
                    withPrivateData: query.withPrivateData,
                    withPublicData: query.withPublicData,
                    page: query.start || 0,
                    pageSize: searchConfig.fetchSize
                })
            ])
                .spread(function (objectResults) {
                    var objects = objectResults.objects.map(function (object) {
                        return objectToViewModel(object);
                    });
                    // var totalByType = Object.keys(typeResults.type_to_count).map(function (typeName) {
                    //     return {
                    //         id: typeName.toLowerCase(),
                    //         count: typeResults.type_to_count[typeName]
                    //     };
                    // });
                    var totalSearchHits;
                    if (objectResults.total > maxSearchResults) {
                        totalSearchHits = maxSearchResults;
                    } else {
                        totalSearchHits = objectResults.total;
                    }

                    // Group the results by object reference.
                    var byObjectRef = objects.reduce((byObjectRef, object) => {
                        const ref = object.ref.objectRef;
                        if (!byObjectRef[ref]) {
                            byObjectRef[ref] = {
                                ref: object.ref,
                                items: []
                            };
                        }
                        byObjectRef[ref].items.push(object);
                        return byObjectRef;
                    }, {});
                    let groupedByObjectRef = Object.keys(byObjectRef).map((ref) => {
                        const group = byObjectRef[ref];
                        return group;
                    });

                    const workspaceInfoMap = Object.keys(objectResults.access_groups_info || {})
                        .reduce((workspaceInfoMap, key) =>{
                            const info = workspaceInfoToContainerInfo(objectResults.access_groups_info[key]);
                            workspaceInfoMap[String(info.workspaceId)] = info;
                            return workspaceInfoMap;
                        }, {});

                    groupedByObjectRef.forEach((group) => {
                        group.genomeInfo = objectInfoToGenomeInfo(group);

                        // ui controls

                        // group details opened?
                        group.isOpen = ko.observable(false);

                        // group items showing...
                        group.showItemDetail = ko.observable(false);
                        group.showItemMatches = ko.observable(false);

                        group.workspaceInfo = workspaceInfoMap[String(group.ref.workspaceId)];
                    });

                    // remove any groups for which the genome object does not exists
                    // (deleted or permissions problem)
                    groupedByObjectRef = groupedByObjectRef.filter((group) => {
                        return group.genomeInfo ? true : false;
                    });

                    return {
                        items: objects,
                        grouped: groupedByObjectRef,
                        first: query.start,
                        isTruncated: true,
                        summary: {
                            // totalByType: totalByType,
                            totalSearchHits: totalSearchHits,
                            totalSearchSpace: objectResults.total,
                            isTruncated: (totalSearchHits < objectResults.total)
                        },
                        stats: {
                            objectSearch: objectResults.search_time,
                            // typeSearch: typeResults.search_time
                        }
                    };
                });
        }

        return {
            search: search,
            isStopWord: isStopWord
        };
    }

    return {
        make: factory
    };
});
