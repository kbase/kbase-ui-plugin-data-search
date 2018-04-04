define([
    'bluebird',
    'knockout',
    'kb_ko/KO',
    'kb_ko/lib/generators',
    'kb_common/html',
    'kb_common/bootstrapUtils',
    'kb_service/utils',
    '../../lib/ui',
    '../../lib/rpc',
    '../../lib/data',
    '../controls/narrativeSelector',
    'select2',
], function (
    Promise,
    ko,
    KO,
    gen,
    html,
    BS,
    apiUtils,
    ui,
    Rpc,
    Data,
    NarrativeSelectorComponent
) {
    'use strict';

    let t = html.tag,
        a = t('a'),
        h3 = t('h3'),
        div = t('div'),
        span = t('span'),
        input = t('input'),
        button = t('button'),
        table = t('table'), 
        thead = t('thead'),
        tbody = t('tbody'),
        tr = t('tr'), td = t('td'), th = t('th'),
        p = t('p'), b = t('b');

    // VIEWMODEL    

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;
        var objectsToCopy = ko.unwrap(params.objectsToCopy);
        var objectToView = ko.observable();
        var subscriptions = ko.kb.SubscriptionManager.make();

        var messages = {
            removeObjectFromList: 'Remove this object from the list of selected objects to copy.',
            cannotRemoveLastObjectFromList: 'Sorry, cannot remove the last object from the list.'            
        };
       
        function viewObject(ref) {
            data.getObjectInfo(ref)
                .then(function (objectInfo) {
                    objectToView(objectInfo);
                });
        }

        function doSelectObject(data) {
            if (data.selected()) {
                data.selected(false);
                objectToView(null);
            } else {
                selectedObjects().forEach(function (obj) {
                    obj.selected(false);
                });
                data.selected(true);
                viewObject({
                    workspaceId: data.workspaceInfo.id,
                    objectId: data.objectInfo.id,
                    version: data.objectInfo.version
                });
            }           
        }

        var data = Data.make({
            runtime: runtime
        });

        function makeNarrativeUrl(path) {
            var base = runtime.getConfig('services.narrative.url');
            return base + path;
        }

        // Values
        var copyMethod = ko.observable();
        var selectedNarrative = ko.observable();
        var selectedNarrativeObject = ko.observable();
        var errorMessage = ko.observable();
        var completionMessage = ko.observable();
        var newNarrativeName = ko.observable();
        var copyStatus = ko.observable('none');

        // new narrative stuff...

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
            case 'success':
                return true;
            case 'error':
                return false;
            default:
                console.warn('Unknown copy status: ', copyStatus());
                return false;
            }
        });

        // Methods
        subscriptions.add(copyMethod.subscribe(function (newValue) {
            switch (newValue) {
            case 'new':
                selectedNarrative(null);
                break;
            }
        }.bind(this)));

        subscriptions.add(selectedNarrative.subscribe(function (newValue) {
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
                        copyStatus('error');
                        errorMessage(err.message);
                    })
                    .catch(function (err) {
                        console.error(err);
                        copyStatus('error');
                        errorMessage('unknown error');
                    });
            }
        }.bind(this)));

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
                title: newNarrativeTitle
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
            copyStatus('copying');
            switch (copyMethod()) {
            case 'new':
                copyIntoNewNarrative(newNarrativeName())
                    .then(function(newNarrative) {
                        var narrativeId = [
                            'ws',
                            newNarrative.workspaceInfo.id,
                            'obj', 
                            newNarrative.objectInfo.id
                        ].join('.');
                        var narrativeUrl = makeNarrativeUrl('/narrative/' + narrativeId);
                        selectedNarrativeObject({
                            workspaceInfo: newNarrative.workspaceInfo,
                            objectInfo: newNarrative.objectInfo,
                            url: narrativeUrl
                        });
                        copyStatus('success');
                    })                    
                    .catch(function (err) {
                        copyStatus('error');
                        errorMessage(err.message);
                    });
                break;
            case 'existing':
                if (selectedNarrativeObject()) {
                    var narrative = selectedNarrativeObject();
                    copyIntoNarrative({
                        workspaceId: narrative.workspaceInfo.id
                    })
                        .then(function () {
                            var narrativeId = [
                                'ws',
                                narrative.workspaceInfo.id,
                                'obj', 
                                narrative.objectInfo.id
                            ].join('.');
                            var narrativeUrl = makeNarrativeUrl('/narrative/' + narrativeId);
                            selectedNarrativeObject({
                                workspaceInfo: narrative.workspaceInfo,
                                objectInfo: narrative.objectInfo,
                                url: narrativeUrl
                            });
                            copyStatus('success');
                        })                        
                        .catch(function (err) {
                            copyStatus('error');
                            errorMessage(err.message);
                        });
                } else {
                    errorMessage('You must select a narrative before copying the data object into it.');
                }
                break;
            }
        }
       
        var selectedObjects = ko.observableArray();

        data.getObjectsInfo(objectsToCopy)
            .then(function (objectsInfo) {
                objectsInfo.forEach(function (objectInfo) {
                    selectedObjects.push({
                        workspaceInfo: objectInfo.workspaceInfo,
                        objectInfo: objectInfo.objectInfo,
                        selected: ko.observable()
                    });
                });
            });

        function doRemoveObject(data) {
            if (data.selected()) {
                objectToView(null);
            }
            selectedObjects.remove(data);
        }

        function dispose() {
            subscriptions.dispose();
        }

        return {
            title: 'Copy Object',
            copyMethod: copyMethod,
            selectedNarrative: selectedNarrative,
            selectedNarrativeObject: selectedNarrativeObject,
            selectedObjects: selectedObjects,
            errorMessage: errorMessage,
            completionMessage: completionMessage,
            newNarrativeName: newNarrativeName,
            canCopy: canCopy,
            objectToView: objectToView,
            copyStatus: copyStatus,
            messages: messages,

            // Actions
            doClose: doClose,
            doCopy: doCopy,
            doRemoveObject: doRemoveObject,
            doSelectObject: doSelectObject,

            dispose: dispose
        };
    }

    // UI 

    var styles = html.makeStyles({
        viewTable: {
            css: {
                width: '100%'
            },
            inner: {
                td: {
                    border: 'none',
                    padding: '3px',
                    verticalAlign: 'top'
                },
                th: {
                    border: 'none',
                    padding: '3px',
                    verticalAlign: 'top',
                    fontWeight: 'normal'
                },
                'td:nth-child(1)': {
                    width: '30%'
                },
                'th:nth-child(1)': {
                    width: '30%'
                }
            }
        },
        selectedObjectsTable: {
            css: {
                width: '100%'
            },
            inner: {
                'tbody tr:hover': {
                    backgroundColor: 'rgba(200,200,200,0.8)'
                },
                td: {
                    borderBottom: '1px solid rgba(200,200,200,0.8)',
                    padding: '3px',
                    verticalAlign: 'middle'
                },
                th: {
                    borderBottom: '1px solid rgba(200,200,200,0.8)',
                    padding: '3px',
                    verticalAlign: 'top',
                    fontWeight: 'normal',
                    fontStyle: 'italic'
                },
                'td:nth-child(1)': {
                    width: '30%'
                },
                'th:nth-child(1)': {
                    width: '30%'
                },
                'td:nth-child(3)': {
                    textAlign: 'center'
                },
                'th:nth-child(3)': {
                    textAlign: 'center'
                }
            }
        },
        selectableRow: {
            css: {},
            modifiers: {
                selected: {
                    backgroundColor: 'rgba(200,200,200,1)'
                }
            }
        }
    });

    function buildObjectList() {
        return div({class: 'container-fluid'}, [
            h3('Selected objects'),
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-md-8'
                }, [
                    gen.ifnot('selectedObjects().length',
                        span('no objects selected'),
                        table({ 
                            class: styles.classes.selectedObjectsTable
                        }, [
                            thead([
                                tr([
                                    th('type'),
                                    th('object name'),
                                    th('remove')
                                ])
                            ]),
                            tbody({
                                dataBind: {
                                    foreach: 'selectedObjects'
                                }
                            }, [
                                tr({
                                    class: [styles.classes.selectableRow],
                                    style: {
                                        cursor: 'pointer'
                                    },
                                    dataBind: {
                                        click: '$component.doSelectObject',
                                        class: 'selected() ? "' + styles.scopes.selected + '" : false'
                                    }
                                }, [
                                    td({
                                        style: {
                                            width: '2em'
                                        },
                                        dataBind: {
                                            text: 'objectInfo.typeName'
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
                                        class: 'btn btn-xs btn-danger btn-kb-flat',
                                        dataBind: {
                                            click: '$component.doRemoveObject',
                                            enable: '$component.selectedObjects().length > 1',
                                            attr: {
                                                title: '$component.selectedObjects().length > 1 ? $component.messages.removeObjectFromList : $component.messages.cannotRemoveLastObjectFromList'
                                            }
                                        }
                                    }, span({
                                        class: 'fa fa-times'
                                    })))
                                ])
                            ])
                        ]))
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
                            class: 'panel-title',
                            dataBind: {
                                style: {
                                    color: 'objectToView() ?  "black" : "gray"'
                                }
                            }
                        }, 'Inspect Selected Object')
                    ]),
                    div({
                        class: 'panel-body'
                    }, [
                        '<!-- ko ifnot: objectToView -->',
                        'If you click on an object listed on the left, details will show here',
                        '<!-- /ko -->',

                        '<!-- ko if: objectToView -->',
                        '<!-- ko with: objectToView -->',
                        table({
                            class: styles.classes.viewTable
                        }, [
                            // tr([
                            //     th('type'),
                            //     td({
                            //         dataBind: {
                            //             text: 'objectInfo.type'
                            //         }
                            //     })]),
                                                          
                            tr([
                                th('name'),
                                td({
                                    dataBind: {
                                        text: 'objectInfo.name'
                                    }
                                })]),
                            tr([
                                th('modified'),
                                td({
                                    dataBind: {
                                        typedText: {
                                            value: 'objectInfo.saveDate',
                                            type: '"date"',
                                            format: '"MM/DD/YYYY"'
                                        }
                                    }
                                })]),
                            tr([
                                th('by'),
                                td({
                                    dataBind: {
                                        text: 'objectInfo.saved_by'
                                    }
                                })]),
                            tr([
                                th('type'),
                                td({
                                    dataBind: {
                                        text: 'objectInfo.typeName'
                                    }
                                })]),                                
                            tr([
                                th('module'),
                                td({
                                    dataBind: {
                                        text: 'objectInfo.typeModule'
                                    }
                                })]),                                
                            tr([
                                th('version'),
                                td([
                                    span({
                                        dataBind: {
                                            text: 'objectInfo.typeMajorVersion'
                                        }
                                    }),
                                    '.',
                                    span({
                                        dataBind: {
                                            text: 'objectInfo.typeMinorVersion'
                                        }
                                    })
                                ])])
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
            ', which will be created on the fly, or an ', b('existing Narrartive'),
            ' which you may select from the list below.'
        ]);
    }

    function buildCopyForm() {
        return div({class: 'container-fluid'}, [
            h3('Select Narrative'),
            div({class: 'row'}, [           
                div({class: 'col-md-8'}, [
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-sm-2'
                        }, input({
                            type: 'radio', 
                            name: 'copyMethod', 
                            value: 'new', 
                            dataBind: {
                                checked: 'copyMethod'
                            }
                        })),
                        div({
                            class: 'col-sm-10'
                        }, 'Copy into New Narrative')
                    ]),
                    '<!-- ko if: copyMethod() === "new" -->',
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-sm-2'
                        }),
                        div({
                            class: 'col-sm-10'
                        }, div({
                            style: {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }
                        }, [
                            div({
                                style: {
                                    flex: '0 0 auto',
                                    weight: 'bold',
                                    color: 'rgb(100,100,100)',
                                    marginRight: '4px'
                                }
                            }, 'Name '),
                            div({
                                style: {
                                    flex: '1'
                                }
                            }, input({
                                class: 'form-control',
                                style: {
                                    width: '100%'
                                },
                                dataBind: {
                                    textInput: 'newNarrativeName'
                                }
                            }))
                        ]))
                    ]),
                    '<!-- /ko -->',
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-sm-2'
                        }),
                        div({
                            class: 'col-sm-10',
                            style: {
                                fontStyle: 'italic',
                                padding: '6px'
                            }
                        }, ' - or - ')
                    ]),
                   
                    div({
                        class: 'row'
                    }, [
                        div({
                            class: 'col-sm-2'
                        }, input({
                            type: 'radio', 
                            name: 'copyMethod', 
                            value: 'existing', 
                            dataBind: {
                                checked: 'copyMethod'
                            }
                        })),
                        div({
                            class: 'col-sm-10'
                        }, [
                            'Copy into an existing Narrative: ',
                            gen.ifnot('copyMethod() === "existing"',
                                div({
                                    style: {
                                        fontStyle: 'italic'
                                    }
                                }, 'select a writable narrative.'),
                                div({
                                    style: {
                                        marginBottom: '20px'
                                    },
                                    dataBind: {
                                        component: {
                                            name: NarrativeSelectorComponent.quotedName(),
                                            params: {
                                                selectedNarrative: 'selectedNarrative'
                                            }
                                        }
                                    }
                                })),
                        ])
                    ])
                ]),
                div({class: 'col-md-4'}, [
                    
                    div({class: 'panel panel-default'}, [
                        div({class: 'panel-heading'}, [
                            div({
                                class: 'panel-title',
                                dataBind: {
                                    style: {
                                        color: 'selectedNarrativeObject() ? "black" : "gray"'
                                    }
                                }
                            }, [
                                'Selected Narrative'
                            ])
                        ]),
                        div({class: 'panel-body'}, [
                            '<!-- ko ifnot: copyMethod -->',
                            'When you have selected a narrative to copy into, details about it will be shown here',
                            '<!-- /ko -->',

                            '<!-- ko if: copyMethod() === "existing" -->',
                            p([
                                'The data object will be copied into the following Narrative:'
                            ]),
                            '<!-- ko ifnot: selectedNarrativeObject() -->',
                            p({
                                style: {
                                    fontStyle: 'italic',
                                    textAlign: 'center'
                                }
                            }, 'Select a narrative from those available to you on the left.'),
                            '<!-- /ko -->',
                            '<!-- ko with: selectedNarrativeObject -->',
                            table({
                                class: styles.classes.viewTable
                            }, [
                                
                                tr([
                                    th('Name'), 
                                    td({
                                        dataBind: {
                                            text: 'workspaceInfo.metadata.narrative_nice_name'
                                        }
                                    })
                                ]),
                                tr([
                                    th('Ref'), 
                                    td({
                                        dataBind: {
                                            text: 'objectInfo.ref'
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

    function buildCopyButton() {
        return div({
            class: 'container-fluid'
        }, [
            div({
                class: 'row'
            }, [           
                div({
                    class: 'col-md-8'
                }, [
                    '<!-- ko if: $component.selectedObjects().length === 0 -->',
                    'No objects to copy!',
                    '<!-- /ko -->',
                    '<!-- ko if: $component.selectedObjects().length > 0 -->',
                    button({
                        type: 'button',
                        class: 'btn btn-primary',
                        dataBind: {
                            enable: 'canCopy',
                            click: 'doCopy'
                        }                     
                    }, [
                        'Copy Object',
                        '<!-- ko if: $component.selectedObjects().length > 1 -->',
                        's',
                        '<!-- /ko -->',
                        ' into Narrative'
                    ]),
                    '<!-- /ko -->'
                ]),
                div({
                    class: 'col-md-4'
                })
            ])
        ]);
    }

    function buildSuccessPanel() {
        return [
            '<!-- ko if: copyStatus() === "success" -->',
            BS.buildPanel({
                type: 'success',
                title: 'Successfully Copied',
                body:  div([
                    p([
                        'Successfully copied this data object to the Narrative ',
                        span({
                            style: {
                                fontWeight: 'bold'
                            },
                            dataBind: {
                                text: 'selectedNarrativeObject().workspaceInfo.metadata.narrative_nice_name'
                            }
                        })
                    ]),
                    p([
                        span({
                            style: {
                                fontStyle: 'italic'
                            }
                        }, a({
                            dataBind: {
                                attr: {
                                    href: 'selectedNarrativeObject().url'
                                }
                            },
                            class: 'btn btn-default', 
                            target: '_blank'
                        }, 'Open this Narrative'))
                    ])
                ])
            }),
            '<!-- /ko -->'
        ];
    }

    function buildErrorPanel() {
        return [
            '<!-- ko if: copyStatus() === "error" -->',           
            BS.buildPanel({
                type: 'error',
                title: 'Error',
                body:  div([
                    p('An error occurred attempting to copy the data:'),
                    p({
                        dataBind: {
                            text: 'error'
                        }
                    })
                ])
            }),
            '<!-- /ko -->'
        ];
    }

    function buildInProgressPanel() {
        return [
            '<!-- ko if: copyStatus() === "copying" -->',
            BS.buildPanel({
                type: 'info',
                title: 'In Progress',
                body:  div([
                    html.loading('Copying')
                ])
            }),            
            '<!-- /ko -->'
        ];
    }

    function template() {
        return div([
            ui.buildDialog({
                title: span({dataBind: {text: 'title'}}), 
                icon: 'clone',
                body: div({
                    class: 'container-fluid'
                }, [
                    buildIntro(),
                    buildObjectList(),
                    buildCopyForm(),
                    buildCopyButton(),
                    div({
                        style: {
                            marginTop: '12px'
                        }
                    }, [
                        buildSuccessPanel(),
                        buildInProgressPanel(),
                        buildErrorPanel()
                    ])                    
                ]),
                buttons: [                
                    {
                        type: 'default',
                        label: 'Close',
                        onClick: 'doClose'
                    }
                ],
            })
        ]);
    }

    function component() {
        return {
            viewModel: {
                createViewModel: viewModel
            },
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return KO.registerComponent(component);
});