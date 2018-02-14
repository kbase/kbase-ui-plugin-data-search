define([
    'bluebird',
    'moment',
    'knockout-plus',
    'kb_service/utils',
    '../../lib/types',
    '../../lib/rpc',
    './searchApi',
    // 'json!./data/search_objects.json',
    // 'json!./data/search_objects-fixed.json',
    'json!../../data/search/workspaces.json',
    'json!../../data/search/objects.json',
    'yaml!../../data/stopWords.yml'
], function (
    Promise,
    moment,
    ko,
    apiUtils,
    Types,
    Rpc,
    SearchAPI,
    // searchObjectsData,
    // searchObjectsDataFixed,
    workspacesDb,
    objectsDb,
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
        var rpc = Rpc.make({
            runtime: params.runtime
        });

        var searchConfig = {
            // max number of search result items to hold in the buffer
            // before we start removing those out of view
            maxBufferSize: params.maxBufferSize || 100,
            // number of search items to fetch at one time.
            fetchSize: params.pageSize || 20,
        };

        // Adjustments to the objects to make them easier to work with...
        // perhaps should just be in the base objects.json
        function fixupObjects(objects) {
            var newObjects = objects.map(function (obj) {
                // var typeId = Types.typeIt(obj);
                // console.log('typed!', typeId, obj);
                // x is the new black ... er it is the extensions added by the 
                // data generation scripts (Racket).
                var type = Types.getType(obj.x.type);
                obj.type = obj.x.type;

                // TODO: the proper way...
                // obj.ref = type.methods.guidToReference(obj.guid);
                // TODO: the new way from fake data...
                obj.ref = {
                    workspaceId: obj.x.locator['workspace-id'],
                    objectId: obj.x.locator['object-id'],
                    version: obj.x.locator.version
                };
                obj.ref.ref = [obj.ref.workspaceId, obj.ref.objectId, obj.ref.version].join('/');
                obj.ref.dataviewId = obj.ref.ref;

                obj.key_props['username'] = obj.x.workspace.owner;
                var sharedWith = obj.x.workspace['shared-with'] || [];
                obj.key_props['shared-with'] = sharedWith.map(function (share) {
                    return share[0];
                });

                // A lower case version of the props, for case insensitive searching.
                obj.key_props_lc = Object.keys(obj.key_props).reduce(function (acc, key) {
                    var keyPropValue = obj.key_props[key];
                    if (keyPropValue instanceof Array) {
                        acc[key] = keyPropValue.map(function (value) {
                            if (value) {
                                return value.toLowerCase();
                            }
                        }).filter(function (value) {
                            return value ? true : false;
                        });
                    } else {
                        if (keyPropValue) {
                            if (!keyPropValue.toLowerCase) {
                                console.warn('key not in props: ', key, keyPropValue);
                            } else {
                                acc[key] = keyPropValue.toLowerCase();
                            }
                        }
                    }
                    return acc;
                }, {});

                return obj;
            });
            return newObjects;
        }

        function getRealNames(usernames) {
            return rpc.call('UserProfile', 'get_user_profile', usernames)
                .spread(function (profiles) {
                    return profiles.reduce(function (acc, profile) {
                        acc[profile.user.username] = profile.user.realname;
                        return acc;
                    }, {});
                });
        }

        function objectToViewModel(obj) {
            var typeId = Types.typeIt(obj);
            if (!typeId) {
                console.error('ERROR cannot type object', obj);
                throw new Error('Cannot type this object');
            }
            obj.type = typeId;
            var type = Types.getType(typeId);
            if (!type || !type.methods || !type.methods.detail) {
                console.error('!! type not found', type, obj.type, obj);
                throw new Error('Type not found');
            }
            var ref = type.methods.guidToReference(obj.guid);
            var detail = type.methods.detail(obj);
            var detailMap = detail.reduce(function (m, field) {
                m[field.id] = field;
                return m;
            }, {});

            var matches = Object.keys(obj.highlight).reduce(function (matches, field) {
                if (field === 'source_tags') {
                    console.warn('highlight field ' + field + ' ignored');
                    return matches;
                } 
                if (!type.searchKeysMap[field]) {
                    console.warn('highlight field ' + field + ' not found in type spec', obj);
                    return matches;
                }
                matches.push({
                    id: field,
                    label: type.searchKeysMap[field].label,
                    highlights: obj.highlight[field].map(function (highlight) {
                        return {
                            highlight: highlight
                        };
                    })
                });
                return matches;
            }, []);

            var matchMap = matches.reduce(function (matchMap, match) {            
                matchMap[match.id] = match;
                return matchMap;
            }, {});

            // Uncomment to re-enable highlights merging into details
            // detail.forEach(function (field) {
            //     if (matchMap[field.id]) {
            //         field.highlights = matchMap[field.id].highlights;
            //     }
            // });

            var vm = {
                type: {
                    id: obj.type,
                    label: type.label
                },
                matchClass: {
                    id: type.ui.class,
                    copyable: type.ui.copyable,
                    viewable: type.ui.viewable,
                    ref: ref
                },

                // Detail, type-specific
                detail: detail,

                url: window.location.origin + '#dataview/' + ref.workspaceId + '/' + ref.objectId + '/' + ref.version,

                // should be different per object type? E.g. narrative - nice name, others object name??
                // Generic fields
                name: obj.object_name,                
                date: new Date(obj.timestamp * 1000),
                scientificName: detailMap.scientificName ? detailMap.scientificName.value || '' : '',

                matches: matches,
                selected: ko.observable(),
                showMatches: ko.observable(false),
                showDetails: ko.observable(false),
                active: ko.observable(false)
            };
            return vm;
        }

        function search(query) {
            var searchApi = SearchAPI.make({
                runtime: params.runtime
            });
            console.log('search api query:', query);
            return Promise.all([
                searchApi.objectSearch({
                    query: query.terms.join(' '),
                    page: query.start || 0,
                    pageSize: searchConfig.fetchSize
                }),
                searchApi.typeSearch({
                    query: query.terms.join(' ')
                })
            ])
                .spread(function (objectResults, typeResults) {
                    console.log('search api results (object, type):', objectResults, typeResults);
                    var objects = objectResults.objects.map(function (object) {
                        return objectToViewModel(object);
                    });
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
                    // console.log('view model objects', objects);
                    return {
                        items: objects,
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
                });
        }


        // function searchx(query) {
        //     return Promise.try(function () {

        //         var start = query.start || 0;
        //         var numberToFetch = searchConfig.fetchSize;

        //         // a search will reset all of the markers and the buffer.
        //         // it will fetch the first pageSize items, if any.
        //         // It will populate the buffer and the markers.
        //         // Fake for now...

        //         // apply fake searching and highlighting.
        //         return referenceSearch(query)
        //             .then(function (fakeSearchData) {

        //                 // This is the paged results out of the search.
        //                 var results = fakeSearchData.data.slice(start, start + numberToFetch)
        //                     .map(function (item) {
        //                         return objectToViewModel(item);
        //                     });


        //                 // todo: sort this out!

        //                 var result = {
        //                     items: results,
        //                     first: start,                            
        //                     isTruncated: true,
        //                     summary: fakeSearchData.summary
        //                     // summary: {
        //                     //     total: fakeSearchData.total,
        //                     //     types: fakeSearchData.summary,
        //                     //     narratives: fakeSearchData.narratives.length
        //                     // }
        //                 };
        //                 console.log('result', result);
        //                 return result;
        //             });
        //     });

        // }

        return {
            search: search,
            isStopWord: isStopWord
        };
    }

    return {
        make: factory
    };
});