define([
    'bluebird',
    'moment',
    'knockout-plus',
    'kb_service/utils',
    '../../lib/types',
    '../../lib/rpc',
    // 'json!./data/search_objects.json',
    // 'json!./data/search_objects-fixed.json',
    'json!./data/workspaces.json',
    'json!./data/objects.json'
], function (
    Promise,
    moment,
    ko,
    apiUtils,
    Types,
    Rpc,
    // searchObjectsData,
    // searchObjectsDataFixed,
    workspacesDb,
    objectsDb
) {
    'use strict';

    // For now, this fakes the search...
    function factory(params) {

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

        // var searchState = {
        //     // holds search result items for display
        //     buffer: [],
           
        //     // position of first item in the buffer in the total search results space.
        //     firstItemPosition: null,
        //     // Is the total search results space truncated due to limitations of the back end?
        //     isTruncated: null,
        //     // The total # of items (may be estimated) in the search results space.
        //     totalResultCount: null
        // };

        var types = {
            narrative: {
                label: 'Narrative',
                copyable: false,
                viewable: false,
                class: 'narrative'
            },
            genome: {
                label: 'Genome',
                copyable: true,
                viewable: true,
                class: 'dataObject'
            },
            assembly: {
                label: 'Assembly',
                copyable: true,
                viewable: true,
                class: 'dataObject'
            },
            report: {
                label: 'Report',
                copyable: false,
                viewable: false,
                class: 'miscObject'
            },
            genomefeature: {
                label: 'Genome Feature',
                copyable: false,
                viewable: true,
                class: 'subObject'
            },
            pairedendlibrary: {
                label: 'Paired End Library',
                copyable: true,
                viewable: true,
                class: 'dataObject'
            },
            singleendlibrary: {
                label: 'Single End Library',
                copyable: true,
                viewable: true,
                class: 'dataObject'
            }

        };

       
        function fixup(objects) {
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
                // console.log('REF', obj, obj.ref);

                // if (obj.x.type === 'genome') {
                //     obj.data.assembly_ref = '';
                //     obj.data.contigset_ref = '';
                //     obj.key_props.assembly_ref = '';
                //     obj.key_props.contigset_ref = '';
                // }
                // obj.matches = [
                //     {
                //         "id": "taxonomy",
                //         "label": "Taxonomy",
                //         "highlight": "Escherichia <em>coli</em> KTE198"
                //     }
                // ];
                obj.key_props_lc = Object.keys(obj.key_props).reduce(function (acc, key) {

                    // TODO: hmm, how are arrays actually represented?
                    // FORNOW: just turn them into a string joined with commas.
                    if (obj.key_props[key] instanceof Array) {
                        obj.key_props[key] = obj.key_props[key].join(', ');
                    }

                    if (!obj.key_props[key].toLowerCase) {
                        console.warn('key not in props: ', key, obj.key_props[key]);
                    } else {
                        acc[key] = obj.key_props[key].toLowerCase();
                        
                    }
                    return acc;
                }, {});
                return obj;
            });
            return newObjects;
        }

        function filterData(data, terms) {
            // var objects = data.result[0].objects;
            var objects = data;
            var newObjects = objects.map(function (obj) {
                // obj.matches = [
                //     {
                //         "id": "taxonomy",
                //         "label": "Taxonomy",
                //         "highlight": "Escherichia <em>coli</em> KTE198"
                //     }
                // ];
                var matches = Object.keys(obj.key_props).map(function (key) {
                    var value = obj.key_props[key];
                    var searchValue = obj.key_props_lc[key];

                    // if (obj.x.type === 'genome') {
                    //     console.log('G', key, value, searchValue);
                    // }
                    

                    var term = terms[0];
                    var match = searchValue.indexOf(term);
                    if (match === -1) {
                        return;
                    }

                    // take up to 20 characters on either side of the highlighted term.
                    // hmm, make it a structure...

                    var begin;
                    var beforePrefix;
                    if (match > 20) {
                        begin = match - 20;
                        beforePrefix = '...';
                    } else {
                        begin = 0;
                        beforePrefix = '';
                    }

                    var end = match + term.length + 20;
                    var afterSuffix;
                    if (end < value.length) {
                        afterSuffix = '...';
                    } else {
                        afterSuffix = '';
                    }

                    // var highlight = [value.slice(0, match), '<em>', value.slice(match, match + term.length), '</em>', value.slice(match + term.length)].join('');
                    // var highlight = [value.slice(0, match), '<em>', value.slice(match, match + term.length), '</em>', value.slice(match + term.length)].join('');
                    var highlights = [{
                        before: beforePrefix + value.slice(begin, match),
                        match: value.slice(match, match + term.length),
                        after: value.slice(match + term.length, end) + afterSuffix
                    }];
                    return {
                        id: key,
                        label: key,
                        highlights: highlights
                    };
                }).filter(function (x) {
                    return x;
                });
                obj.matches = matches;
                return obj;
            }).filter(function (obj) {
                // console.log('matches', obj.matches.length);
                // return true;
                return (obj.matches.length > 0);
            });
            // data.result[0].objects = newObjects;
            
            // return data;
            return newObjects;
        }

        function simulateSearchAPIData(query) {
            var fixed = fixup(JSON.parse(JSON.stringify(objectsDb)));
            var terms = query.input.split(/\s+/);
            var filtered = filterData(fixed, terms);
            // console.log('simulating...', fixed.length, filtered.length, terms, filtered);

            // Get summary too!
            return {
                version: '1.1',
                result: [
                    {
                        pagination: {
                            start: 1,
                            count: 10
                        },
                        sorting_rules: [
                            {
                                is_timestamp: 1,
                                descending: 1
                            }
                        ],
                        total: filtered.length,
                        search_time: 793,
                        objects: filtered
                    }
                ]
            };
        }

        function simulateSearchAPISummary(query) {
            var fixed = fixup(JSON.parse(JSON.stringify(objectsDb)));
            var terms = query.input.split(/\s+/);
            var filtered = filterData(fixed, terms);

            var summary = filtered.reduce(function (acc, obj) {
                if (!acc[obj.x.type]) {
                    acc[obj.x.type] = 0;
                }
                acc[obj.x.type] += 1;
                return acc; 
            }, {});

            console.log('simulating summary call...', summary);

            // Get summary too!
            return {
                version: '1.1',
                result: [
                    {
                        types: summary
                    }
                ]
            };
        }

        function simulateNarratives(items) {
            var workspaceIds = items.reduce(function (accum, item) {
                var workspaceId = item.matchClass.ref.workspaceId;
                if (accum.indexOf(workspaceId) === -1) {
                    accum.push(workspaceId);
                }
                return accum;
            }, []).sort();
            

            return workspacesDb.filter(function (workspaceInfo) {
                return workspaceIds.some(function (id) {
                    return workspaceInfo.id === id;
                });
            }).map(function (workspaceInfo, index) {
                // TODO: for now we are accepting all workspaces, we'll
                // set a workspact type and title approporiately here.
                // TODO: filter out all but narratives from this view; 
                // the reference data will filter out all but references.
                var title;
                if (workspaceInfo.metadata.narrative_nice_name) {
                    title = workspaceInfo.metadata.narrative_nice_name;
                } else {
                    title = 'not narrative: ' + workspaceInfo.name;
                }

                title += ' (' + workspaceInfo.tag + ')';

                return {
                    title: title,
                    owner: workspaceInfo.owner,
                    owner_real_name: 'TBD',
                    modified: workspaceInfo.modified,
                    workspace_id: workspaceInfo.id,
                    object_id: parseInt(workspaceInfo.metadata.narrative)
                };
            });
        }

        // // simulates the new narrative field which WILL be returned
        // // with the results.
        // function getNarratives(workspaceIds) {
        //     return Promise.try(function () {

        //         console.log('workspaces db', workspacesDb);

        //         return workspacesDb.filter(function (workspaceInfo) {
        //             return workspaceIds.some(function (id) {
        //                 return workspaceInfo.id === id;
        //             });
        //         }).map(function (workspaceInfo, index) {
        //             // TODO: for now we are accepting all workspaces, we'll
        //             // set a workspact type and title approporiately here.
        //             // TODO: filter out all but narratives from this view; 
        //             // the reference data will filter out all but references.
        //             var title;
        //             if (workspaceInfo.metadata.narrative_nice_name) {
        //                 title = workspaceInfo.metadata.narrative_nice_name;
        //             } else {
        //                 title = 'not narrative: ' + workspaceInfo.name;
        //             }

        //             title += ' (' + workspaceInfo.tag + ')';

        //             console.log('narrative', workspaceInfo);
        //             return {
        //                 rowNumber: index,
        //                 title: title,
        //                 owner: {
        //                     username: workspaceInfo.owner,
        //                     // TODO: need real real name
        //                     realName: workspaceInfo.owner
        //                 },
        //                 date: workspaceInfo.modDate,
        //                 ref: {
        //                     workspaceId: workspaceInfo.id,

        //                     // TODO: only valid for narratives!
        //                     // TODO: we should have filtered for only narratives 
        //                     objectId: parseInt(workspaceInfo.metadata.narrative)
        //                 },
        //                 description: 'Description here'
        //             };
        //         });


        //         // return Promise.all(workspaceIds.map(function (workspaceId) {
        //         //     return rpc.call('Workspace', 'get_workspace_info', {
        //         //         id: workspaceId
        //         //     })
        //         //         .spread(function (result) {
        //         //             return apiUtils.workspaceInfoToObject(result);
        //         //         });
        //         // }))
        //         //     .then(function (workspaces) {
        //         //         return workspaces.map(function (workspaceInfo, index) {
        //         //             // console.log('ws info', workspaceInfo);
        //         //             return {
        //         //                 rowNumber: index,
        //         //                 title: workspaceInfo.metadata.narrative_nice_name,
        //         //                 owner: {
        //         //                     username: workspaceInfo.owner,
        //         //                     // TODO: need real real name
        //         //                     realName: workspaceInfo.owner
        //         //                 },
        //         //                 date: workspaceInfo.modDate,
        //         //                 ref: {
        //         //                     workspaceId: workspaceInfo.id,
        //         //                     objectId: parseInt(workspaceInfo.metadata.narrative)
        //         //                 },
        //         //                 description: 'Description here'
        //         //             };
        //         //         });
        //         //     });
        //     });
        // }


        function getRealNames(usernames) {
            return rpc.call('UserProfile', 'get_user_profile', usernames)
                .spread(function (profiles) {
                    return profiles.reduce(function (acc, profile) {
                        acc[profile.user.username] = profile.user.realname;
                        return acc;
                    }, {});
                });
        }

        function generateSearchObjectData(query) {
            // The data is a canned copy of an actual search api result json blob.
            var data = simulateSearchAPIData(query);
            var summaryResult = simulateSearchAPISummary(query);

            // extract just the objects returned
            var items = data.result[0].objects;
            var summary = summaryResult.result[0].types;

            summary = Object.keys(summary).map(function (key) {
                return {
                    id: key,
                    count: summary[key],
                    label: types[key].label
                };
            });

            var total = items.length;

            // phase 1:
            // now transform them into a nice set of objects

            var newItems = items.map(function (item, index) {
                var type = Types.getType(item.type);
                if (!type || !type.methods || !type.methods.detail) {
                    console.log('!! type not found', type, item.type);
                }
                return {
                    rowNumber: index,
                    type: {
                        id: item.type,
                        label: type.label
                    },
                    matchClass: {
                        id: types[item.type].class,
                        copyable: types[item.type].copyable,
                        viewable: types[item.type].viewable,
                        ref: item.ref
                    },
                    // should be different per object type? E.g. narrative - nice name, others object name??
                    title: item.object_name,
                    date: new Date(item.timestamp * 1000),
                    // TODO:
                    matches: item.matches,
                    detail: type.methods.detail(item),
                    selected: ko.observable()
                };
            });

            // phase 2: fetch the narratives for the workspaces.
            // fake it...
            var narratives = simulateNarratives(newItems);

            narratives = narratives.map(function (narrative) {
                return {
                    title: narrative.title,
                    modified: moment(narrative.modified).toDate(),
                    ref: {
                        workspaceId: narrative.workspace_id,
                        objectid: narrative.object_id
                    },
                    owner: {
                        username: narrative.owner,
                        realName: narrative.owner_real_name
                    }
                };
            });
            

            // phase 3: enhance the narratives from the user profile (for now)

            var usernames = Object.keys(narratives.reduce(function (acc, narrative) {
                acc[narrative.owner.username] = true;
                return acc;
            }, {}));

            return getRealNames(usernames)
                .then(function (realNames) {
                    narratives.forEach(function (narrative) {
                        narrative.owner.realName = realNames[narrative.owner.username];
                    });
                    /// phase 4: assemble the results to be view model friendly.
                    // console.log('WORKSPACES', workspaces, newItems.length);

                    // phase 3: assemble the viewmodel.
                    var result = narratives.map(function (narrative) {
                        var objects = newItems.filter(function (item) {
                            // console.log('filter??', item.matchClass.ref.workspaceId, narrative.ref.workspaceId);
                            return (item.matchClass.ref.workspaceId === narrative.ref.workspaceId);
                        }).sort(function (a, b) {
                            return a.matchClass.id < b.matchClass.id;
                        });
                        // console.log('narrative objects', narrative.ref.workspaceId, objects.length, newItems);
                        narrative.objects = objects;
                        var summary = {};
                        objects.forEach(function (object) {
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
                        // console.log('narrative summary', narrative, narrative.summary);
                        return narrative;
                    });

                    // console.log('result', result);

                    return {
                        narratives: result,
                        summary: summary,
                        total: total
                    };
                });
        }

        

        // var fakeSearchData = generateFakeSearchData();

        function search(query) {
            return Promise.try(function () {

                var start = query.start || 0;
                var numberToFetch = searchConfig.fetchSize;

                // a search will reset all of the markers and the buffer.
                // it will fetch the first pageSize items, if any.
                // It will populate the buffer and the markers.
                // Fake for now...

                // apply fake searching and highlighting.
                return generateSearchObjectData(query)
                    .then(function (fakeSearchData) {

                        // This is the paged results out of the search.
                        var results = fakeSearchData.narratives.slice(start, start + numberToFetch);

                        // // We will actually get the results and incorporate them into the buffer;
                        // // for now we just make it the buffer.
                        // searchState.buffer = results;

                        // // The top item is the first item in the buffer.
                        // searchState.firstItemPosition = start;

                        // // searchData.paging.bottomItem = numberToFetch - 1;

                        // // pretend the generated search data is the total # of items found.
                        // searchState.totalResultCount = fakeSearchData.length;

                        // // Say that we truncated the results.
                        // searchState.isTruncated = true;

                        return {
                            items: results,
                            first: start,                            
                            isTruncated: true,
                            summary: {
                                total: fakeSearchData.total,
                                types: fakeSearchData.summary,
                                narratives: fakeSearchData.narratives.length
                            }
                        };
                    });
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