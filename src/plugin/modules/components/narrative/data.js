define([
    'bluebird',
    'moment',
    'knockout-plus',
    'kb_service/utils',
    '../../lib/types',
    '../../lib/rpc',
    // 'json!./data/search_objects.json',
    // 'json!./data/search_objects-fixed.json',
    'json!../../data/search/workspaces.json',
    'json!../../data/search/objects.json',
    'json!../../data/stopWords.json'
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
    objectsDb,
    stopWordsDb
) {
    'use strict';

    // var workspaceDb = workspacesDb.reduce(function (accum, workspace) {
    //     accum[workspace.id] = workspace;
    //     return accum;
    // }, {});

    var workspaceDb = { 
        countByType: workspacesDb.reduce(function (countByType, workspace) {
            if (!countByType[workspace.tag]) {
                countByType[workspace.tag] = 0;
            }
            countByType[workspace.tag] += 1;
            return countByType;
        }, {}),
        db: workspacesDb.reduce(function (db, workspace) {
            db[String(workspace.id)] = workspace;
            return db;
        }, {})
    };

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

        function filterData(data, query) {
            var objects = data;
            var terms = query.terms;
            var workspaceType = query.workspaceType;
            var operator = query.operator;
            var username = query.username;

            var newObjects = objects.map(function (obj) {
                if (obj.x.workspace.tag !== workspaceType) {
                    return;
                }

                // umm... we are supposed to parse the guid.
                var workspace = workspaceDb.db[obj.x.locator['workspace-id']];

                // get the matches for each term.
                var termMatches = terms.map(function (term) {

                    // permissions filter.
                    if (query.withPrivateData) {
                        if (query.withPublicData) {
                            // all data ... just ignore!
                        } else {
                            // just private data, no public.
                            // er, what does this mean?
                            // i'm going to intperpret as not the user's data,
                            // and public.
                            if (obj.x.workspace.owner === username &&
                                workspace.public === 'n') {
                                return;
                            }
                        }
                    } else {
                        if (query.withPublicData) {
                            // no private data, just public.
                            // this can just mean all public data...
                            if (workspace.public === 'n') {
                                return;
                            }
                        } else {
                            // not private or public ... nothing!
                            return;
                        }
                    }


                    term = term.toLowerCase();
                    // Get all matches for this term across all index key_props.
                    // If matches is empty, this term is a miss (and since we are and-ing, this 
                    // object is a miss.)
                    var matches = Object.keys(obj.key_props).reduce(function (matchAccum, key) {
                        var keyProps = obj.key_props[key];
                        var keyPropsForMatching = obj.key_props_lc[key];

                        // Null key props will not be saved as lower-cased versions.
                        if (!keyPropsForMatching) {
                            return matchAccum;
                        }

                        if (!(keyProps instanceof Array)) {
                            keyProps = [keyProps];
                            keyPropsForMatching = [keyPropsForMatching];
                        } 

                        // Will contain matches for any key prop values which match on the
                        // current term.
                        // Note the usage of plural -- a key prop is an array with possibly multiple values.
                        var keyPropsMatches = keyPropsForMatching.reduce(function (accum, keyPropForMatching, index) {
                            var match = keyPropForMatching.indexOf(term);
                            if (match === -1) {
                                return accum;
                            }
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
                            // Use the key prop value from the index, not the 
                            // lower cased one we use for matching.
                            var value = keyProps[index];
                            if (end < value.length) {
                                afterSuffix = '...';
                            } else {
                                afterSuffix = '';
                            }

                            accum.push({
                                before: beforePrefix + value.slice(begin, match),
                                match: value.slice(match, match + term.length),
                                after: value.slice(match + term.length, end) + afterSuffix
                            });
                            return accum;
                        }, []);

                        // If no matches, return undefined so we can filter this
                        // later.
                        if (keyPropsMatches.length === 0) {
                            return matchAccum;
                        }

                        // This is the match, if any, for this term on this 
                        matchAccum.push({
                            id: key,
                            label: key,
                            highlights: keyPropsMatches,
                            term: term
                        });
                        return matchAccum;
                    }, []);

                    // we should now have the matches for this term.

                    // Apply the operator logic at the object level

                    switch (operator) {
                    case 'or':
                        if (matches.length === 0) {
                            return;
                        }
                        break;
                    case 'and':
                        var matchedTerms = matches.reduce(function (terms, match) {
                            if (!terms[match.term]) {
                                terms[match.term] = 0;
                            }
                            terms[match.term] += 1;
                            return terms;
                        }, {});
                        if (matchedTerms.length !== terms.length) {
                            return;
                        }
                        break;
                    default: 
                        throw new Error('Invalid operator: ' + operator);
                    }

                    return matches;
                }).filter(function (x) {
                    // TODO: don't use map + filter, use reduce!
                    return x ? true : false;
                });

                if (termMatches.length > 0) {
                    var matches = termMatches.reduce(function (accum, matches) {
                        matches.forEach(function (match) {
                            accum.push(match);
                        });
                        return accum;
                    }, []);
                    obj.matches = matches;
                } else {
                    obj.matches = [];
                }
               
                return obj;
            }).filter(function (obj) {
                if (!obj) {
                    return false;
                }
                if (obj.matches.length === 0) {
                    return false;
                }
                // Ah, make sure the object has each of the terms matching at least once across all matches.                
                var matchingTerms = Object.keys(obj.matches.reduce(function (acc, match) {
                    acc[match.term] = true;
                    return acc;
                }, {}));
                return matchingTerms.length > 0;
            });
            return newObjects;
        }

        function simulateSearchAPIData(query) {
            var fixed = fixupObjects(JSON.parse(JSON.stringify(objectsDb)));
            var filtered = filterData(fixed, query.terms);
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
            var fixed = fixupObjects(JSON.parse(JSON.stringify(objectsDb)));
           
            var filtered = filterData(fixed, query.terms);

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

        function simulateNarratives(workspaceIds) {
            // var workspaceIds = items.reduce(function (accum, item) {
            //     var workspaceId = item.matchClass.ref.workspaceId;
            //     if (accum.indexOf(workspaceId) === -1) {
            //         accum.push(workspaceId);
            //     }
            //     return accum;
            // }, []).sort();
            

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

        function objectToViewModel(obj) {
            var type = Types.getType(obj.type);
            if (!type || !type.methods || !type.methods.detail) {
                console.log('!! type not found', type, obj.type);
            }
            var ref = type.methods.guidToReference(obj.guid);
            return {
                type: {
                    id: obj.type,
                    label: type.label
                },
                matchClass: {
                    id: types[obj.type].class,
                    copyable: types[obj.type].copyable,
                    viewable: types[obj.type].viewable,
                    ref: ref
                },
                // should be different per object type? E.g. narrative - nice name, others object name??
                title: obj.object_name,
                date: new Date(obj.timestamp * 1000),
                // TODO:
                matches: obj.matches,
                detail: type.methods.detail(obj),
                selected: ko.observable()
            };
        }

       
        function narrativeSearch(query) {
            var fixed = fixupObjects(JSON.parse(JSON.stringify(objectsDb)));

            var searchQuery = {
                terms: query.terms,
                workspaceType: 'narrative',
                operator: 'or',
                username: query.username,
                withPrivateData: query.withPrivateData,
                withPublicData: query.withPublicData
            };

            var items = filterData(fixed, searchQuery);
            

            // group into workspaces
            var grouped = items.reduce(function (groups, item) {
                var id = String(item.ref.workspaceId);
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


            // Only keep groups (narratives) for which the # of matched terms is the
            // same as the # of query terms.
            var fullyMatched = Object.keys(grouped).reduce(function (accum, groupId) {
                if (Object.keys(grouped[groupId].matchedTerms).length === query.terms.length) {
                    accum[groupId] = grouped[groupId];
                }
                return accum;
            }, {});


            // Now we have are full simulation of the entire search space!

            // Get summary.
            var objectsByType = Object.keys(fullyMatched).reduce(function (objectCountByType, groupId) {
                var group = fullyMatched[groupId];
                group.items.forEach(function (object) {
                    var type = object.type;

                    if (!objectCountByType[type]) {
                        objectCountByType[type] = 0;
                    }
                    objectCountByType[type] += 1;
                });
                return objectCountByType;
            }, {});
            var objectsTypeSummary = Object.keys(objectsByType).map(function (typeId) {
                var type = types[typeId];
                return {
                    id: typeId,
                    label: type.label,
                    count: objectsByType[typeId]
                };
            });

            var summary = {
                totalByType: objectsTypeSummary,
                totalSearchHits: Object.keys(fullyMatched).length,
                totalSearchSpace: workspaceDb.countByType.narrative
            };

            // phase 2: fetch the narratives for the workspaces.
            // fake it...
            var narratives = simulateNarratives(Object.keys(fullyMatched).map(function (idString) {
                return parseInt(idString);
            })).map(function (narrative) {
                return {
                    title: narrative.title,
                    modified: moment(narrative.modified).toDate(),
                    ref: {
                        workspaceId: narrative.workspace_id,
                        objectId: narrative.object_id
                    },
                    owner: {
                        username: narrative.owner,
                        realName: narrative.owner_real_name
                    },
                    showObjects: ko.observable(false),
                    showMatches: ko.observable(false),
                    showDetails: ko.observable(false),
                    active: ko.observable(false)
                };
            })  
                .sort(function (a, b) {
                    return (a.ref.workspaceId < b.ref.workspaceId);
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
                        // var objects = newItems.filter(function (item) {
                        //     // console.log('filter??', item.matchClass.ref.workspaceId, narrative.ref.workspaceId);
                        //     return (item.matchClass.ref.workspaceId === narrative.ref.workspaceId);
                        // }).sort(function (a, b) {
                        //     return a.matchClass.id < b.matchClass.id;
                        // });

                        narrative.objects = fullyMatched[String(narrative.ref.workspaceId)].items.map(function (item) {
                            return objectToViewModel(item);
                        }).sort(function (a, b) {
                            return a.matchClass.id < b.matchClass.id;
                        });

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
                        // console.log('narrative summary', narrative, narrative.summary);
                        return narrative;
                    });

                    // console.log('result', result);

                    return {
                        narratives: result,
                        summary: summary
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
                return narrativeSearch(query)
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

                        // todo: sort this out!
                        return {
                            items: results,
                            first: start,                            
                            isTruncated: true,
                            summary: fakeSearchData.summary
                            // summary: {
                            //     total: fakeSearchData.total,
                            //     types: fakeSearchData.summary,
                            //     narratives: fakeSearchData.narratives.length
                            // }
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