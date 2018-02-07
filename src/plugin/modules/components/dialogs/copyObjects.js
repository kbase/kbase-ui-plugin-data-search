// a wrapper for the help component, loads the search help.
define([
    'bluebird',
    'knockout-plus',
    'kb_common/html',
    'kb_service/utils',
    '../../lib/ui',
    '../../lib/rpc'
], function (
    Promise,
    ko,
    html,
    apiUtils,
    ui,
    Rpc
) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        span = t('span'),
        input = t('input'),
        table = t('table'), tr = t('tr'), td = t('td'), th = t('th'),
        form = t('form'), select = t('select'), a = t('a'),
        p = t('p'), b = t('b');

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;


        var rpc = Rpc.make({
            runtime: runtime
        });

        // DATA CALLS

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
                });
        }

        function getObjectInfos(refs) {
            var paramRefs = refs.map(function (ref) {
                var refa = ref.split('/').map(function (part) {
                    return parseInt(part);
                });
                return {
                    wsid: refa[0],
                    objid: refa[1],
                    ver: refa[2]
                };
            });
            return rpc.call('Workspace', 'get_object_info3', {
                objects: paramRefs,
                ignoreErrors: 1
            })
                .spread(function (result) {
                    if (result.infos.length === 0) {
                        throw new Error('No object found with reference ' + ref);
                    }

                    return Promise.all(result.infos.map(function (info) {
                        return {
                            objectInfo: apiUtils.objectInfoToObject(info)
                        };
                    }));

                    // var objectInfo = apiUtils.objectInfoToObject(result.infos[0]);
                    // return [objectInfo, rpc.call('Workspace', 'get_workspace_info', {id: objectInfo.wsid})];
                });
            // .spread(function (objectInfo, wsInfo) {
            //     var workspaceInfo = apiUtils.workspaceInfoToObject(wsInfo);
            //     return {
            //         objectInfo: objectInfo,
            //         workspaceInfo: workspaceInfo
            //     };
            // });
        }

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
                    return [
                        objectInfo, 
                        rpc.call('Workspace', 'get_workspace_info', {
                            id: objectInfo.wsid
                        })
                            .spread(function (info) {
                                return info;
                            })
                    ];
                })
                .spread(function (objectInfo, wsInfo) {
                    console.log('wsinfo', wsInfo);
                    var workspaceInfo = apiUtils.workspaceInfoToObject(wsInfo);
                    return {
                        objectInfo: objectInfo,
                        workspaceInfo: workspaceInfo
                    };
                });
        }

        // TODO
        function doCopyIntoExistingNarrative(narrativeInfo) {
            var sourceObject = currentObjects();
            console.log('source object', sourceObject);            
            var from = {
                    wsid: sourceObject.objectInfo.wsid,
                    objid: sourceObject.objectInfo.id,
                    ver: sourceObject.objectInfo.version
                }, to = {
                    wsid: narrativeInfo.objectInfo.wsid, 
                    name: sourceObject.objectInfo.name
                };
            rpc.call('Workspace', 'copy_object', {
                from: from,
                to: to
            })
                .spread(function (copied) {
                    var copiedObjectInfo = apiUtils.objectInfoToObject(copied),
                        narrativeUrl = makeNarrativeUrl('/narrative/' + apiUtils.makeWorkspaceObjectId(narrativeInfo.workspaceInfo.id, narrativeInfo.workspaceInfo.metadata.narrative)),
                        message = div([
                            'Successfully copied this data object to the Narrative ',
                            narrativeInfo.workspaceInfo.metadata.narrative_nice_name,
                            span({
                                style: {
                                    fontStyle: 'italic'
                                }
                            }, [
                                (a({
                                    href: narrativeUrl, 
                                    class: 'btn btn-default', 
                                    target: '_blank'
                                }, 'Open this Narrative'))
                            ])
                        ]);

                    completionMessage(message);
                    return copiedObjectInfo;
                });
        }

        function paramsToQuery(params) {
            return Object.keys(params).map(function (key) {
                return key + '=' + encodeURIComponent(params[key]);
            }).join('&');
        }

        function makeUrl(path, params) {
            var query = paramsToQuery(params),
                url = '#' + path + '?' + query;

            return url;
        }

        function doCopyIntoNewNarrative(params) {
            var path = 'narrativemanager/new',
                redirectParams = {
                    copydata: params.objectInfo.ref
                },
                url = makeUrl(path, redirectParams);
            window.open(url, 'window_' + html.genId());
        }


        function makeNarrativeUrl(path) {
            var base = runtime.getConfig('services.narrative.url');
            return base + path;
        }


        

        // Values
        var narratives = ko.observableArray([]);
        var copyMethod = ko.observable();
        var selectedNarrative = ko.observable();
        var selectedNarrativeObject = ko.observable();
        var narrativesById = {};
        var errorMessage = ko.observable();
        var completionMessage = ko.observable();

        // Methods
        copyMethod.subscribe(function (newValue) {
            switch (newValue) {
            case 'new':
                selectedNarrative([undefined]);
                break;
            }
        }.bind(this));

        selectedNarrative.subscribe(function (newValue) {
            if (!newValue) {
                copyMethod('new');
            } else {
                copyMethod('existing');
                var parts = newValue.split('/');
                var workspaceId = parts[0];
                var objectId = parts[1];
                getNarrative({
                    workspaceId: workspaceId,
                    objectId: objectId
                })
                    .then(function (narrative) {
                        console.log('narrative?', narrative);
                        selectedNarrativeObject(narrative);
                    })
                    .catch(Error, function (err) {
                        console.error(err);
                        errorMessage(err.message);
                    })
                    .catch(function (err) {
                        console.error(err);
                        errorMessage('unknown error');
                    });
            }
        }.bind(this));
        

        // ACTIONS

        function doClose() {
            params.onClose();
        }


        function doCopyAndOpenNarrative() {
            alert('duplicate, then open the narrative.');
        }

        function doCopy () {
            errorMessage('');
            switch (copyMethod()) {
            case 'new':
                doCopyIntoNewNarrative();
                break;
            case 'existing':
                if (selectedNarrative()[0]) {
                    doCopyIntoExistingNarrative(selectedNarrativeObject());
                } else {
                    errorMessage('You must select a narrative before copying the data object into it.');
                }
                break;
            }
        }
       
        var currentObjects = ko.observableArray();

        // LIFECYCLE


        // START 
        
        getObjectInfos(params.selectedObjects())
            .then(function (objectInfos) {
                console.log('objectInfo', objectInfos);
                currentObjects(objectInfos);
                return  getWritableNarratives();
            })
            .then(function (writableNarratives) {
                console.log('got them', narratives);
                writableNarratives.forEach(function (narrative) {
                    narrativesById[narrative.id] = narrative;
                    narratives.push({
                        name: narrative.metadata.narrative_nice_name,
                        value: [String(narrative.id), narrative.metadata.narrative].join('/')
                    });
                });
            });

        return {
            title: 'Copy Objects',

            currentObjects: currentObjects,

            doClose: doClose,
            doCopy: doCopy,
            doCopyAndOpenNarrative: doCopyAndOpenNarrative,
            // onClose: params.onClose
            narratives: narratives,
            copyMethod: copyMethod,
            selectedNarrative: selectedNarrative,
            selectedNarrativeObject: selectedNarrativeObject,
            narrativesById: narrativesById,
            errorMessage: errorMessage,
            completionMessage: completionMessage,

        };
    }

    function buildCopyForm() {
        return div({class: 'container-fluid'}, [
            p([
                'You may use this  panel to copy the ', b('data object'),
                ' you are viewing into either a ', b('new Narrative'),
                ', which will be created automatically, or an ', b('existing Narrartive'),
                ' which you may select from the list below.'
            ]),
            div({class: 'col-md-8'}, [
                form([
                    table({class: 'table'}, [
                        tr([
                            td(input({type: 'radio', name: 'copyMethod', value: 'new', dataBind: {checked: 'copyMethod'}})),
                            td('Copy into New Narrative')
                        ]),
                        tr([
                            td(), td('or')
                        ]),
                        tr([
                            td(input({type: 'radio', name: 'copyMethod', value: 'existing', dataBind: {checked: 'copyMethod'}})),
                            td([
                                'Copy into: ',
                                select({dataBind: {
                                    optionsCaption: '"Select a Narrative to Copy To"',
                                    options: 'narratives',
                                    optionsValue: '"value"',
                                    optionsText: '"name"',
                                    value: 'selectedNarrative'
                                }})
                            ])
                        ]),
                        '<!-- ko if: errorMessage() -->',
                        tr([
                            td([
                                'ER'
                            ]),
                            td(div({dataBind: {text: 'errorMessage'}}))
                        ]),
                        '<!-- /ko -->',
                        // tr([
                        //     td(),
                        //     td([
                        //         div({class: 'btn-toolbar', role: 'toolbar'}, [
                        //             div({class: 'btn-group', role: 'group'},
                        //                 button({
                        //                     class: 'btn btn-primary',
                        //                     dataBind: 'click: $component.doCopy'
                        //                 }, 'Copy and Open Narrative'))
                        //         ])
                        //     ])
                        // ]),
                        '<!-- ko if: completionMessage() -->',
                        tr([
                            td([
                                ''
                            ]),
                            td(div({dataBind: {html: 'completionMessage'}}))
                        ]),
                        '<!-- /ko -->',
                    ])
                ])
            ]),
            div({class: 'col-md-4'}, [
                div({class: 'panel panel-default'}, [
                    div({class: 'panel-heading'}, [
                        div({class: 'panel-title'}, 'Selected Objects')
                    ]),
                    div({class: 'panel-body'}, [
                        '<!-- ko foreach: $component.currentObjects -->',

                        div({
                            dataBind: {
                                text: '$data.objectInfo.name'
                            }
                        }),

                        '<!-- /ko -->'
                        
                    ])
                ]),
                div({class: 'panel panel-default'}, [
                    div({class: 'panel-heading'}, [
                        div({class: 'panel-title'}, 'Selected Narrative')
                    ]),
                    div({class: 'panel-body'}, [
                        '<!-- ko if: copyMethod() === "existing" -->',
                        p([
                            'The data object will be copied into the following Narrative:'
                        ]),
                        '<!-- ko with: selectedNarrativeObject -->',
                        table({class: 'table'}, [
                            tr([
                                th('Ref'), td(div({dataBind: {text: 'objectInfo.ref'}}))
                            ]),
                            tr([
                                th('Name'), td(div({dataBind: {text: 'workspaceInfo.metadata.narrative_nice_name'}}))
                            ]),
                            tr([
                                th('Owner'), td(div({dataBind: {text: 'objectInfo.saved_by'}}))
                            ]),
                            tr([
                                th('Last saved'), td(div({dataBind: {text: 'objectInfo.saveDate'}}))
                            ])
                        ]),
                        '<!-- /ko -->',
                        '<!-- /ko -->',
                        '<!-- ko if: copyMethod() === "new" -->',
                        p([
                            'A new narrative will be created containing this data object.'
                        ]),
                        '<!-- /ko -->'
                    ])
                ])
            ])
        ]);
    }

    function template() {
        return ui.buildDialog({
            title: span({dataBind: {text: 'title'}}), 
            body: buildCopyForm(),
            buttons: [                
                {
                    type: 'primary',
                    label: 'Copy and Open Narrative',
                    onClick: 'doCopyAndOpenNarrative'
                },
                {
                    label: 'Copy',
                    onClick: 'doCopy'
                },
                {
                    type: 'danger',
                    label: 'Cancel',
                    onClick: 'doClose'
                }
            ],
        });
    }

    function component() {
        return {
            viewModel: {
                createViewModel: viewModel
            },
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});