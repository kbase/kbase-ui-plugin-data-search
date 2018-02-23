define([
    'bluebird',
    'kb_service/utils',
    './rpc',
    'yaml!../data/stopWords.yml'
], function (
    Promise,
    apiUtils,
    Rpc,
    stopWordsDb
) {
    function factory(config) {
        var runtime = config.runtime;

        var rpc = Rpc.make({
            runtime: runtime
        });

        function getNarrative(ref) {
            return rpc.call('Workspace', 'get_object_info3', {
                objects: [{
                    wsid: ref.workspaceId,
                    objid: ref.objectId
                }],
                ignoreErrors: 1
            })
                .spread(function (result) {
                    if (result.infos.length === 0) {
                        throw new Error('No Narrative found with reference ' + ref.workspaceId + '/' + ref.objectId);
                    }
                    if (result.infos.length > 1) {
                        throw new Error('Too many Narratives found with reference ' + ref.workspaceId + '/' + ref.objectId);
                    }
                    var objectInfo = apiUtils.objectInfoToObject(result.infos[0]);
                    return Promise.all([
                        objectInfo, 
                        rpc.call('Workspace', 'get_workspace_info', {
                            id: objectInfo.wsid
                        })
                            .spread(function (info) {
                                return info;
                            })
                    ]);
                })
                .spread(function (objectInfo, wsInfo) {
                    var workspaceInfo = apiUtils.workspaceInfoToObject(wsInfo);
                    return {
                        objectInfo: objectInfo,
                        workspaceInfo: workspaceInfo
                    };
                });
        }

        function getObjectInfo(ref) {
            return rpc.call('Workspace', 'get_object_info3', {
                objects: [{
                    wsid: ref.workspaceId,
                    objid: ref.objectId,
                    ver: ref.version
                }],
                ignoreErrors: 1
            })
                .spread(function (result) {
                    if (result.infos.length === 0) {
                        throw new Error('No object found with reference ' + ref);
                    }
                    if (result.infos.length > 1) {
                        throw new Error('Too many objects found with reference ' + ref);
                    }
                    var objectInfo = apiUtils.objectInfoToObject(result.infos[0]);
                    return Promise.all([objectInfo, rpc.call('Workspace', 'get_workspace_info', {id: objectInfo.wsid})]);
                })
                .spread(function (objectInfo, wsInfo) {
                    var workspaceInfo = apiUtils.workspaceInfoToObject(wsInfo[0]);
                    return {
                        objectInfo: objectInfo,
                        workspaceInfo: workspaceInfo
                    };
                });
        }

        function getObjectsInfo(refs) {
            var normalizedRefs = refs.map(function (ref) {
                if (typeof ref === 'string') {
                    var a = ref.split('/').map(function (x) {
                        return parseInt(x, 10);
                    });
                    return {
                        workspaceId: a[0],
                        objectId: a[1],
                        version: a[2]
                    };
                }
            });

            return Promise.all(normalizedRefs.map(function (ref) {
                return getObjectInfo(ref);
            }));
        }

        function getWritableNarratives() {
            return rpc.call('Workspace', 'list_workspace_info', {
                perm: 'w'
            })
                .spread(function (data) {
                    var objects = data.map(function (workspaceInfo) {
                        return apiUtils.workspace_metadata_to_object(workspaceInfo);
                    });
                    return objects.filter(function (obj) {
                        if (obj.metadata.narrative && (!isNaN(parseInt(obj.metadata.narrative, 10))) &&
                            // don't keep the current narrative workspace.
                            obj.metadata.narrative_nice_name &&
                            obj.metadata.is_temporary && obj.metadata.is_temporary !== 'true') {
                            return true;
                        }
                        return false;
                    });
                })
                .then(function (narratives) {
                    var owners = Object.keys(narratives.reduce(function (owners, narrative) {
                        owners[narrative.owner] = true;
                        return owners;
                    }, {}));
                    return rpc.call('UserProfile', 'get_user_profile', owners)
                        .spread(function (profiles) {
                            var ownerProfiles = profiles.reduce(function (ownerProfiles, profile) {
                                ownerProfiles[profile.user.username] = profile;
                                return ownerProfiles;
                            }, {});
                            narratives.forEach(function (narrative) {
                                narrative.ownerRealName = ownerProfiles[narrative.owner].user.realname;
                            });
                            return narratives;
                        });
                });
        }

        function copyObject(arg) {
            return rpc.call('NarrativeService', 'copy_object', {
                ref: arg.sourceObjectRef,
                target_ws_id: arg.targetWorkspaceId
            })
                .spread(function (copiedObjectInfo) {  
                    // NB: the narrative service will have already transformed
                    // the workspace object info into a structure compatible with
                    // the venerable objectInfoToObject :)                 
                    return copiedObjectInfo;
                });
        }

        function copyObjects(arg) {
            return Promise.all(arg.sourceObjectRefs.map(function (ref) {
                return copyObject({
                    sourceObjectRef: ref,
                    targetWorkspaceId: arg.targetWorkspaceId
                });
            }));
        }

        function createNarrative(arg) {
            var commentCell = [
                '# ' + arg.title,
                '',
                'This narrative was created by the "Copy Object" dialog in the "Data Search" web app.',
                '',
                'You will find your copied data in the Data panel on the left-hand side of the Narrative.',
            ].join('\n');

            return rpc.call('NarrativeService', 'create_new_narrative', {
                title: arg.title,
                includeIntroCell: 0,
                markdown: commentCell
            })
                .spread(function (newNarrative) {
                    return {
                        workspaceInfo: newNarrative.workspaceInfo,
                        objectInfo: newNarrative.narrativeInfo
                    };
                });
        }

        function copyNarrative(arg) {
            return rpc.call('NarrativeService', 'copy_narrative', {
                workspaceRef: [arg.workspaceId, arg.objectId].join('/'),
                newName: arg.name
            })
                .spread(function (newWorkspace) {
                    return getNarrative({
                        workspaceId: newWorkspace.newWsId,
                        objectId: newWorkspace.newNarId
                    });
                });
        }

        function isStopWord(word) {
            if (stopWordsDb.warn.indexOf(word) >= 0) {
                return true;
            }
            if (stopWordsDb.ignore.indexOf(word) >= 0) {
                return true;
            }
            return false;
        }

        return {
            getNarrative: getNarrative,
            getObjectInfo: getObjectInfo,
            getObjectsInfo: getObjectsInfo,
            getWritableNarratives: getWritableNarratives,
            copyObject: copyObject,
            copyObjects: copyObjects,
            createNarrative: createNarrative,
            copyNarrative: copyNarrative,
            isStopWord: isStopWord
        };
    }

    return {
        make: factory
    };
});