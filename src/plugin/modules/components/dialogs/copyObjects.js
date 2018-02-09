define([
    'knockout-plus',
    'kb_common/html',
    'kb_service/utils',
    '../../lib/ui',
    '../../lib/rpc',
    '../../lib/data',
    'select2',
], function (
    ko,
    html,
    apiUtils,
    ui,
    Rpc,
    Data
) {
    'use strict';

    var t = html.tag,
        h3 = t('h3'),
        div = t('div'),
        span = t('span'),
        input = t('input'),
        button = t('button'),
        table = t('table'), 
        tbody = t('tbody'),
        tr = t('tr'), td = t('td'), th = t('th'),
        form = t('form'), select = t('select'), a = t('a'),
        p = t('p'), b = t('b');

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;
        var objectsToCopy = ko.unwrap(params.objectsToCopy);
        var objectToView = ko.observable();
       
        function viewObject(ref) {
            data.getObjectInfo(ref)
                .then(function (objectInfo) {
                    objectToView(objectInfo);
                });
        }

        function doViewObject(data) {
            viewObject({
                workspaceId: data.workspaceInfo.id,
                objectId: data.objectInfo.id,
                version: data.objectInfo.version
            });
        }

        var data = Data.make({
            runtime: runtime
        });

        var error = ko.observable();

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
        var newNarrativeName = ko.observable();
        var copyStatus = ko.observable('none');

        // Computeds
        var canCopy = ko.pureComputed(function () {
            switch (copyStatus()) {
            case 'none':
                switch (copyMethod()) {
                case 'existing':
                    if (selectedNarrativeObject()) {
                        return true;
                    }
                    break;
                case 'new':
                    if (newNarrativeName()) {
                        return true;
                    }
                }
                return false;
            
            case 'copying':
                return false;
            case 'error':
                return false;
            default:
                console.warn('Unknown copy status: ', copyStatus());
                return false;
            }
        });

        // Methods
        copyMethod.subscribe(function (newValue) {
            switch (newValue) {
            case 'new':
                selectedNarrative(null);
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
                data.getNarrative({
                    workspaceId: workspaceId,
                    objectId: objectId
                })
                    .then(function (narrative) {
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

        // DATA CALLS

        function copyIntoNarrative(arg) {
            return data.copyObjects({
                sourceObjectRefs: selectedObjects().map(function(object) {
                    return object.objectInfo.ref;
                }),
                targetWorkspaceId: arg.workspaceId
            });
        }

        function copyIntoNewNarrative(newNarrativeTitle) {
            return data.createNarrative({
                name: newNarrativeTitle                
            })
                .then(function (newNarrative) {
                    return data.copyObjects({
                        sourceObjectRefs: selectedObjects().map(function(object) {
                            return object.objectInfo.ref;
                        }),
                        targetWorkspaceId: newNarrative.workspaceInfo.id
                    })
                        .then(function () {
                            return newNarrative;
                        });
                });
        }

        // ACTIONS

        function doClose() {
            params.onClose();
        }

        function doCopy () {
            errorMessage('');
            switch (copyMethod()) {
            case 'new':
                copyIntoNewNarrative(newNarrativeName())
                    .then(function(newNarrative) {
                        selectedNarrativeObject({
                            workspaceInfo: newNarrative.workspaceInfo,
                            objectInfo: newNarrative.narrativeInfo
                        });
                        var narrativeId = apiUtils.makeWorkspaceObjectId(newNarrative.workspaceInfo.id, newNarrative.narrativeInfo.id),
                            narrativeUrl = makeNarrativeUrl('/narrative/' + narrativeId),
                            // TODO: move the markup into the ... markup!
                            message = div([
                                'Successfully copied this data object to the new Narrative ',
                                newNarrative.workspaceInfo.metadata.narrative_nice_name,
                                span({
                                    style: {
                                        fontStyle: 'italic'
                                    }
                                }, a({
                                    href: narrativeUrl, 
                                    class: 'btn btn-default', 
                                    target: '_blank'
                                }, 'Open this Narrative'))
                            ]);
                        completionMessage(message);
                    })                    
                    .catch(function (err) {
                        error(err.message);
                    });
                break;
            case 'existing':
                if (selectedNarrativeObject()) {
                    var narrative = selectedNarrativeObject();
                    copyIntoNarrative({
                        workspaceId: narrative.workspaceInfo.id
                    })
                        .then(function () {
                            var narrativeId = apiUtils.makeWorkspaceObjectId(narrative.workspaceInfo.id, narrative.objectInfo.id),
                                narrativeUrl = makeNarrativeUrl('/narrative/' + narrativeId),
                                // TODO: move the markup into the ... markup!
                                message = div([
                                    'Successfully copied this data object to the Narrative ',
                                    narrative.workspaceInfo.metadata.narrative_nice_name,
                                    span({
                                        style: {
                                            fontStyle: 'italic'
                                        }
                                    }, a({
                                        href: narrativeUrl, 
                                        class: 'btn btn-default', 
                                        target: '_blank'
                                    }, 'Open this Narrative'))
                                ]);
                            completionMessage(message);
                        })                        
                        .catch(function (err) {
                            error(err.message);
                        });
                } else {
                    errorMessage('You must select a narrative before copying the data object into it.');
                }
                break;
            }
        }
       
        var selectedObjects = ko.observableArray();

        // getObjectsInfo(objectsToCopy)


        data.getObjectsInfo(objectsToCopy)
            .then(function (objectsInfo) {
                selectedObjects(objectsInfo);
                return  data.getWritableNarratives();
            })
            .then(function (writableNarratives) {
                writableNarratives.forEach(function (narrative) {
                    narrativesById[narrative.id] = narrative;
                    narratives.push({
                        name: narrative.metadata.narrative_nice_name,
                        value: [String(narrative.id), narrative.metadata.narrative].join('/')
                    });
                });
            });

        function doRemoveObject(data) {
            selectedObjects.remove(data);
        }

        return {
            title: 'Copy Object',
            narratives: narratives,
            copyMethod: copyMethod,
            selectedNarrative: selectedNarrative,
            selectedNarrativeObject: selectedNarrativeObject,
            selectedObjects: selectedObjects,
            narrativesById: narrativesById,
            errorMessage: errorMessage,
            completionMessage: completionMessage,
            newNarrativeName: newNarrativeName,
            canCopy: canCopy,
            objectToView: objectToView,

            // Actions
            doClose: doClose,
            doCopy: doCopy,
            doRemoveObject: doRemoveObject,
            doViewObject: doViewObject
        };
    }


    function buildObjectList() {
        return div({class: 'container-fluid'}, [
            h3('Selected objects'),
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-md-8'
                }, [
                    '<!-- ko ifnot: selectedObjects().length -->',
                    'no objects selected',
                    '<!-- /ko -->',
                    '<!-- ko if: selectedObjects().length -->',
                    table({ 
                        class: 'table table-hover'
                    }, [
                        tbody({
                            dataBind: {
                                foreach: 'selectedObjects'
                            }
                        }, [
                            tr({
                                style: {
                                    cursor: 'pointer'
                                },
                                dataBind: {
                                    click: '$component.doViewObject'
                                }
                            }, [
                                td({
                                    style: {
                                        width: '2em'
                                    },
                                    dataBind: {
                                        text: 'objectInfo.id'
                                    }
                                }),
                                td({
                                    dataBind: {
                                        text: 'objectInfo.name'
                                    }
                                }),
                                td({
                                    style: {
                                        textAlign: 'center'
                                    }
                                }, button({
                                    type: 'button',
                                    class: 'btn btn-sm btn-danger btn-kb-flat',
                                    dataBind: {
                                        click: '$component.doRemoveObject'
                                    }
                                }, span({
                                    class: 'fa fa-times'
                                })))
                            ])
                        ])
                    ]), 
                    '<!-- /ko -->'
                ]),               
                div({
                    class: 'col-md-4'
                }, div({
                    class: 'panel panel-default',
                    style: {
                        width: '100%'
                    }
                }, [
                    div({
                        class: 'panel-heading'
                    }, [
                        div({
                            class: 'panel-title'
                        }, 'View Selected Object')
                    ]),
                    div({
                        class: 'panel-body'
                    }, [
                        '<!-- ko ifnot: objectToView -->',
                        'When you select an object to view, it will show here',
                        '<!-- /ko -->',

                        '<!-- ko if: objectToView -->',
                        '<!-- ko with: objectToView -->',
                        table({
                            class: 'table'
                        }, [
                            tr([
                                td('id'),
                                td({
                                    dataBind: {
                                        text: 'objectInfo.id'
                                    }
                                })]),
                            tr([
                                td('name'),
                                td({
                                    dataBind: {
                                        text: 'objectInfo.name'
                                    }
                                })])
                        ]),
                        '<!-- /ko -->',
                        '<!-- /ko -->'
                        
                    ])
                ]))
            ])
        ]);
    }

    function buildIntro() {
        return  p([
            'You may use this  panel to copy the ', b('data object'),
            ' you are viewing into either a ', b('new Narrative'),
            ', which will be created automatically, or an ', b('existing Narrartive'),
            ' which you may select from the list below.'
        ]);
    }

    function buildCopyForm() {
        return div({class: 'container-fluid'}, [
            h3('Selected Narrative'),
            div({class: 'row'}, [           
                div({class: 'col-md-8'}, [               
                    form([
                        table({class: 'table'}, [
                            tr([
                                td(input({
                                    type: 'radio', 
                                    name: 'copyMethod', 
                                    value: 'new', 
                                    dataBind: {
                                        checked: 'copyMethod'
                                    }
                                })),
                                td('Copy into New Narrative')
                            ]),
                            '<!-- ko if: copyMethod() === "new" -->',
                            tr([
                                td('New Narrative name'),
                                td(input({
                                    class: 'form-control',
                                    dataBind: {
                                        textInput: 'newNarrativeName'
                                    }
                                }))
                            ]),
                            '<!-- /ko -->',
                            tr([
                                td(), td('or')
                            ]),
                            tr([
                                td(input({
                                    type: 'radio', 
                                    name: 'copyMethod', 
                                    value: 'existing', 
                                    dataBind: {
                                        checked: 'copyMethod'
                                    }
                                })),
                                td([
                                    'Copy into: ',
                                    select({
                                        class: 'form-control',
                                        dataBind: {
                                            optionsCaption: '"Select a Narrative to Copy To"',
                                            options: 'narratives',
                                            optionsValue: '"value"',
                                            optionsText: '"name"',
                                            value: 'selectedNarrative'
                                        }
                                    })])
                            ]),
                            '<!-- ko if: errorMessage() -->',
                            tr([
                                td([
                                    'ER'
                                ]),
                                td(div({
                                    dataBind: {
                                        text: 'errorMessage'
                                    }
                                }))
                            ]),
                            '<!-- /ko -->',                       
                            '<!-- ko if: completionMessage() -->',
                            tr([
                                td([
                                    ''
                                ]),
                                td(div({
                                    dataBind: {
                                        html: 'completionMessage'
                                    }
                                }))
                            ]),
                            '<!-- /ko -->',
                        ])
                    ])
                ]),
                div({class: 'col-md-4'}, [
                    
                    div({class: 'panel panel-default'}, [
                        div({class: 'panel-heading'}, [
                            div({
                                class: 'panel-title'
                            }, [
                                '<!-- ko if: selectedNarrativeObject -->',
                                'Selected Narrative',
                                '<!-- /ko -->',
                                '<!-- ko ifnot: selectedNarrativeObject -->',
                                'Narrative will appear below when selected',
                                '<!-- /ko -->'
                            ])
                        ]),
                        div({class: 'panel-body'}, [
                            '<!-- ko if: copyMethod() === "existing" -->',
                            p([
                                'The data object will be copied into the following Narrative:'
                            ]),
                            '<!-- ko with: selectedNarrativeObject -->',
                            table({class: 'table'}, [
                                tr([
                                    th('Ref'), 
                                    td({
                                        dataBind: {
                                            text: 'objectInfo.ref'
                                        }
                                    })
                                ]),
                                tr([
                                    th('Name'), 
                                    td({
                                        dataBind: {
                                            text: 'workspaceInfo.metadata.narrative_nice_name'
                                        }
                                    })
                                ]),
                                tr([
                                    th('Owner'), 
                                    td({
                                        dataBind: {
                                            text: 'objectInfo.saved_by'
                                        }
                                    })
                                ]),
                                tr([
                                    th('Modified'), 
                                    td({
                                        dataBind: {
                                            typedText: {
                                                value: 'objectInfo.saveDate',
                                                type: '"date"',
                                                format: '"MM/DD/YYYY"'
                                            }
                                        }
                                    })
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
            ])
        ]);
    }

    function template() {
        return ui.buildDialog({
            title: span({dataBind: {text: 'title'}}), 
            body: div({
                class: 'container-fluid'
            }, [
                buildIntro(),
                buildObjectList(),
                buildCopyForm()
            ]),
            buttons: [                
                {
                    type: 'primary',
                    label: 'Copy',
                    onClick: 'doCopy',
                    enable: 'canCopy'
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