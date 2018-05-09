define([
    'bluebird',
    'moment',
    'knockout-plus',
    'kb_service/utils',
    'kb_common/jsonRpc/genericClient',
    '../../lib/searchApi',
    '../../lib/types/utils',
    'yaml!../../data/stopWords.yml'
], function (
    Promise,
    moment,
    ko,
    ServiceUtils,
    GenericClient,
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
                featureType: detailMap.featureType.value,
                featureFunctions: detailMap.functions.value,
                // scientificName: detailMap.scientificName.value,

                matches: matches,
                selected: ko.observable(),
                showMatches: ko.observable(false),
                showDetails: ko.observable(false),
                active: ko.observable(false)
            };
            return vm;
        }

        function objectInfoToGenomeInfo(info) {
            let [objectId, objectName, /* type */, saveDate, objectVersion, savedBy,
                workspaceId, /* workspaceName */, /* checksum */, /*size */, meta] = info;

            return {
                // genome info extracted mostly from the metadata
                scientificName: meta['Name'],
                kbaseGenomeId: null,
                domain: meta['Domain'],
                lineage: utils.parseTaxonomy(meta['Taxonomy']),
                source: meta['Source'],
                sourceId: meta['Source ID'],
                dnaSize: parseInt(meta['Size'], 10),
                contigCount: parseInt(meta['Number contigs']),
                featureCount: parseInt(meta['Number features']),
                gcContent: parseFloat(meta['GC content']),

                // object ref
                ref: [workspaceId, objectId, objectVersion].map(String).join('/'),
                objectId: objectId,
                workspaceId: workspaceId,
                objectVersion: objectVersion,
                objectName: objectName,

                // object stats
                lastSavedAt: new Date(saveDate),
                lastSavedBy: savedBy,

                // source info ... narrative or ref data

            };
        }

        function workspaceInfoToContainerInfo(info) {
            let [id, workspace, owner, moddate, /* max_objid */, 
                /* user_permission */, 
                /* globalread */, /* lockstat */, metadata] = info;
            // ServiceUtils.workspaceInfoToObject(info);
            let containerInfo = {
                workspaceId: id,
                owner: owner,
                modificationDate: new Date(moddate)
            };
            if ('narrative' in metadata) {
                containerInfo.type = 'narrative';
                containerInfo.title = metadata['narrative_nice_name'];
                containerInfo.objectId = parseInt(metadata['narrative'], 10);
            } else if (metadata['searchtags'] && metadata['searchtags'].match(/refdata/)) {
                containerInfo.type = 'refdata';
                containerInfo.title = workspace;
            } else {
                containerInfo.type = 'unknown';
                containerInfo.title = workspace;
            }
            return containerInfo;
        }

        function search(query) {
            var searchApi = SearchAPI.make({
                runtime: params.runtime
            });
            // console.log('search api query:', query);
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
                    // console.log('search api results (object, type):', objectResults, typeResults);
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

                    // Do grouping
                    var byObjectRef = objects.reduce((byObjectRef, object) => {
                        let ref = object.ref.objectRef;
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
                        let group = byObjectRef[ref];
                        return group;
                    });

                    // Fake the object manifest for now...
                    let workspaces = groupedByObjectRef.reduce((workspaces, group) => {
                        let workspaceId = group.ref.workspaceId;
                        workspaces[String(workspaceId)] = true;
                        return workspaces;
                    }, {});

                    let workspaceIdentities = Object.keys(workspaces).map((workspaceId) => {
                        return {
                            id: parseInt(workspaceId, 10)
                        };
                    });

                    let objectSpecs = groupedByObjectRef.map((group) => {
                        return {
                            wsid: group.ref.workspaceId,
                            objid: group.ref.objectId,
                            ver: group.ref.version
                        };
                    });

                    let workspace = new GenericClient({
                        module: 'Workspace',
                        url: params.runtime.config('services.Workspace.url'),
                        token: params.runtime.service('session').getAuthToken()
                    });

                    return Promise.all([
                        Promise.all(workspaceIdentities.map((id) => {
                            return workspace.callFunc('get_workspace_info', [id])
                                .spread((info) => {
                                    return workspaceInfoToContainerInfo(info);
                                });
                        })),
                        Promise.try(() => {
                            if (objectSpecs.length === 0) {
                                return [];
                            }
                            return workspace.callFunc('get_object_info3', [{
                                objects: objectSpecs,
                                includeMetadata: 1,
                                ignoreErrors: 1
                            }]).spread((result) => {
                                return result.infos.map((info) => {
                                    if (info) {
                                        return objectInfoToGenomeInfo(info);
                                    } else {
                                        // Sometimes an object may have been deleted, but it is still indexed.
                                        return null;
                                    }
                                });
                            });
                        })
                    ])
                        .spread((workspaceInfo, objectInfo) => {

                            let objectInfoMap = {};
                            objectInfo.forEach((info) => {
                                if (!info) {
                                    return;
                                }
                                objectInfoMap[info.ref] = info;
                            });

                            let workspaceInfoMap = {};
                            workspaceInfo.forEach((info) => {
                                workspaceInfoMap[String(info.workspaceId)] = info;
                            });

                            groupedByObjectRef.forEach((group) => {
                                group.genomeInfo = objectInfoMap[group.ref.objectRef];
                                // console.log('hmm', group.genomeInfo);

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