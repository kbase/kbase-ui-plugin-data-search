define([
    'knockout-plus',
    'kb_common/html',
    '../dialogs/duplicateNarrative',
    '../dialogs/copyObjects'
], function (
    ko,
    html,
    DuplicateNarrativeComponent,
    CopyObjectComponent
) {
    'use strict';

    var t = html.tag,
        p = t('p'),
        button = t('button'),
        div = t('div'),
        span = t('span'),
        a = t('a'),
        ul = t('ul'),
        li = t('li'),
        table = t('table'),   
        tbody = t('tbody'),
        tr = t('tr'),
        td = t('td');

    function rowBackgroundColor(opacity) {
        return 'rgba(220,220,220,' + opacity + ')';
    }

    var styles = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll'
            }
        },
        body: {
            css: {
                flex: '1 1 auto',                
                display: 'flex',
                flexDirection: 'column'
            }
        },   
        row: {
            css: {
                flex: '1 1 auto',                
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }
        },
        resultsRow: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: rowBackgroundColor(0.4),
                marginBottom: '15px'
            },
            modifiers: {
                active: {
                    backgroundColor: rowBackgroundColor(0.6)
                }
            }
        }, 
        narrativeRow: {
            css: {
                backgroundColor: rowBackgroundColor(0.8),
            },
            modifiers: {
                active: {
                    backgroundColor: rowBackgroundColor(1)
                }
            }
        }, 
        objectRow: {
            css: {
                backgroundColor: rowBackgroundColor(0.6),
            },
            modifiers: {
                active: {
                    backgroundColor: rowBackgroundColor(0.8)
                }
            }
        }, 
        objectItemRow: {
            css: {
                marginBottom: '10px'
            }
        },
        rowCell: {
            css: {
                padding: '4px'
            }
        },
        detailHeader: {
            css: {
                borderBottom: '1px silver solid',
            },
            scopes: {
                active: {
                    borderBottom: '1px gray solid'
                }
            }
        },
        highlight: {
            css: {},
            inner: {
                em: {
                    backgroundColor: 'yellow',
                    fontWeight: 'bold'
                }
            }            
        },
        resultsTable: {
            css: {
                border: '1px silver solid',
                width: '100%',
                maxWidth: '60em'
            },
            scopes: {
                active: {
                    border: '1px gray solid'
                }
            },
            inner: {
                caption: {
                    paddingBottom: '0'
                },
                td: {
                    padding: '4px'
                },
                'td:nth-child(1)': {
                    width: '10em'
                },
                'td:nth-child(2)': {
                    wordBreak: 'break-word'
                }
            }
        },
        highlightsTable: {
            css: {
                border: '0.5px solid rgba(220,220,220,0.5)',
                width: '100%',
                maxWidth: '60em'
            },
            scopes: {
                active: {
                    border: '0.5px solid rgba(220,220,220,1)'
                }
            },
            inner: {
                caption: {
                    paddingBottom: '0'
                },
                td: {
                    padding: '4px',
                    verticalAlign: 'top',
                    borderBottom: '0.5px solid rgba(220,220,220,0.5)'
                },
                'td:nth-child(1)': {
                    width: '10em'
                },
                'td:nth-child(2)': {
                    wordBreak: 'break-word'
                },
                'td:nth-last-child': {
                    borderBottom: 'none'
                },
            }
        },
        detailTable: {
            css: {
                border: '0.5px solid rgba(220,220,220,0.5)',
                width: '100%',
                maxWidth: '60em'
            },
            scopes: {
                active: {
                    border: '0.5px solid rgba(220,220,220,1)'
                }
            },
            inner: {
                caption: {
                    paddingBottom: '0'
                },
                td: {
                    padding: '4px',
                    verticalAlign: 'top',
                    borderBottom: '0.5px solid rgba(220,220,220,0.5)'
                },
                'td:nth-child(1)': {
                    width: '14em'
                },
                'td:nth-child(2)': {
                    wordBreak: 'break-word'
                },
                'td:nth-last-child': {
                    borderBottom: 'none'
                }
            }
        },
        sectionTitle: {
            css: {
                fontWeight: 'bold',
                color: 'gray',
                marginTop: '10px'
            }
        }
    });

    function viewModel(params) {
        // If this is not an Element, it was installed with a comment and 
        // the first node in the template can be found as the next sibling.
        
        var searchState = params.searchState;

        // ACTIONS

        function doDuplicateNarrative(data) {
            params.overlayComponent({
                name: DuplicateNarrativeComponent.name(),
                viewModel: {
                    narrative: data.ref
                }
            });
        }

        function doOpenNarrative(data) {
            window.open(data.url, '_blank');
        }

        function doCopyObject(data) {
            params.overlayComponent({
                name: CopyObjectComponent.name(),
                viewModel: {
                    objectsToCopy: [data.matchClass.ref.ref]
                }
            });
        }

        function doViewObject(data) {
            window.open(data.url, '_blank');
        }

        var view = params.view;

        function doShowObjects() {
            view('list');
        }

        function doShowMatches() {
            view('matches');
        }

        function doShowDetails() {
            view('detail');
        }
       
        function doNextPage() {            
            params.doNextPage();
        }

        function doPreviousPage() {
            params.doPreviousPage();
        }

        function doToggleSelected(data) {
            data.selected(data.selected() ? false : true);
            if (params.selectedObjects().indexOf(data.matchClass.ref.ref) >= 0) {
                params.selectedObjects.remove(data.matchClass.ref.ref);
            } else {
                params.selectedObjects.push(data.matchClass.ref.ref);
            }
        }

        function doMouseOverRow(data) {
            data.active(true);
        }

        function doMouseOutRow(data) {
            data.active(false);
        }

        // LIFECYCLE

        function dispose() {
        }

        return {
            searchState: searchState,
            view: view,

            // scroller: scroller,

            // ACTIONS
            doDuplicateNarrative: doDuplicateNarrative,
            doCopyObject: doCopyObject,
            doOpenNarrative: doOpenNarrative,
            doViewObject: doViewObject,

            doNextPage: doNextPage,
            doPreviousPage: doPreviousPage,

            doToggleSelected: doToggleSelected,

            doShowObjects: doShowObjects,
            doShowMatches: doShowMatches,
            doShowDetails: doShowDetails,

            doMouseOverRow: doMouseOverRow,
            doMouseOutRow: doMouseOutRow,

            // LIFECYCLE
            dispose: dispose
        };
    }
 
    function buildNarrativeOptionsColumn() {
        return div({
        }, [
            div({
                class: 'btn-group'
            }, [
                button({
                    type: 'button',
                    class: 'btn btn-default btn-sm dropdown-toggle btn-kb-toggle-dropdown',
                    dataToggle: 'dropdown',
                    ariaHasPopup: 'true',
                    areaExpanded: 'false'
                }, [
                    span({
                        class: 'fa fa-bars'
                    }),
                    // span({
                    //     class: 'caret'
                    // })
                ]),
                ul({
                    class: 'dropdown-menu dropdown-menu-right'
                }, [
                    li(div({
                        style: {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'gray'
                        }
                    }, 'Narrative')),
                    li({
                        role: 'separator',
                        class: 'divider'
                    }),
                    li(a({
                        dataBind: {
                            click: '$component.doDuplicateNarrative'
                        }
                    }, 'Duplicate...')),
                    li(a({
                        dataBind: {
                            click: '$component.doOpenNarrative'
                        }
                    }, 'Open'))
                ])
            ])
        ]);
    }

    function buildObjectOptionsColumn() {
        return div({
        }, [
            div({
                class: 'btn-group',
                dataBind: {
                    enable: '$parent.active'
                }
            }, [
                button({
                    type: 'button',
                    class: 'btn btn-default btn-sm dropdown-toggle btn-kb-toggle-dropdown',
                    dataToggle: 'dropdown',
                    ariaHasPopup: 'true',
                    areaExpanded: 'false'
                }, [
                    span({
                        class: 'fa fa-ellipsis-h'
                    }),
                    // span({
                    //     class: 'caret'
                    // })
                ]),
                ul({
                    class: 'dropdown-menu dropdown-menu-right'
                }, [
                    li(div({
                        style: {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'gray'
                        }
                    }, 'Object')),
                    li(a({
                        dataBind: {
                            click: '$component.doCopyObject'
                        }
                    }, 'Copy...')),
                    li(a({
                        dataBind: {
                            click: '$component.doViewObject'
                        }
                    }, 'View'))
                ])
            ])
        ]);
    }

    function buildObjectCheckbox() {
        return [
            '<!-- ko switch: matchClass.id -->',

            '<!-- ko case: "dataObject" -->',
            '<!-- ko if: matchClass.copyable -->',

            '<!-- ko if: selected() -->',
            span({
                class: 'fa fa-check-square-o',
                style: {
                    fontSize: '120%',
                },
                dataBind: {
                    click: '$component.doToggleSelected'
                }
            }),
            '<!-- /ko -->',

            '<!-- ko ifnot: selected() -->',
            span({
                class: 'fa fa-square-o',
                style: {
                    fontSize: '120%',
                },
                dataBind: {
                    click: '$component.doToggleSelected'
                }
            }),
            '<!-- /ko -->',

            '<!-- /ko -->',
            '<!-- /ko -->',

            '<!-- /ko -->'
        ];
    }
    
    function buildObjectLink() {
        return [
            '<!-- ko switch: matchClass.id -->',

            '<!-- ko case: "narrative" -->',
            a({
                dataBind: {
                    attr: {
                        href: '"/narrative/ws." + matchClass.ref.workspaceId + ".obj." + matchClass.ref.objectId'
                    },
                    text: 'title'
                }
            }),
            '<!-- /ko -->',

            '<!-- ko case: "dataObject" -->',
            '<!-- ko if: matchClass.viewable -->',
            a({
                dataBind: {
                    attr: {
                        href: '"#dataview/" + matchClass.ref.workspaceId + "/" + matchClass.ref.objectId + "/" + matchClass.ref.version',
                    },
                    text: 'title'
                },
                target: '_blank'
            }),
            '<!-- /ko -->',
            '<!-- ko ifnot: matchClass.viewable -->',
            div({
                dataBind: {
                    text: 'title'
                }
            }),
            '<!-- /ko -->',
            '<!-- /ko -->',

            '<!-- /ko -->'
        ];
    }

    function buildObjectIcon() {
        return [
            '<!-- ko if: type.icon -->',

            '<!-- ko if: type.icon.type === "fontAwesome" -->',
            span({
                // class: 'fa-2x',
                dataBind: {
                    class: 'type.icon.classes.join(" ")',
                    style: {
                        color: 'type.icon.color'
                    }
                }
            }),
            '<!-- /ko -->',

            '<!-- ko if: type.icon.type === "kbase" -->',
            span({
                dataBind: {
                    class: 'type.icon.classes.join(" ")',
                    style: {
                        color: 'type.icon.color'
                    }
                }
            }),
            '<!-- /ko -->',

            '<!-- /ko -->',

            '<!-- ko ifnot: type.icon -->',
            span({
                class: 'fa fa-file-o'
            }),
            '<!-- /ko -->'
        ];
    }

    function buildMatchViewObject() {
        return div({
            class: [styles.classes.row, styles.classes.objectRow]
        }, [
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 2em'
                }
            }, buildObjectCheckbox()),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 2em'
                }
            }, buildObjectIcon()),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1'
                },
                dataBind: {
                    text: 'type.label'
                }
            }),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '4'
                }
            }, buildObjectLink()),
            
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1.5'
                },
                dataBind: {
                    typedText: {
                        type: '"date"',
                        format: '"MM/DD/YYYY"',
                        value: 'date'
                    }
                }
            }),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 4em',
                    textAlign: 'right'
                }
            }, buildObjectOptionsColumn()),
        ]);
    }

    function buildMatchHighlightsTable() {
        return table({
            class: styles.classes.highlightsTable,
        }, [
            
            tbody({
                dataBind: {
                    foreach: 'matches'
                }
            }, tr([
                td({
                    dataBind: {
                        text: 'label'
                    }
                }),
                td({
                },[
                    '<!-- ko foreach: $data.highlights -->',
                    span({
                        class: styles.classes.highlight,
                        dataBind: {
                            html: 'highlight'
                        }
                    }),
                    // span({
                    //     dataBind: {
                    //         text: 'before'
                    //     }
                    // }),
                    // span({
                    //     dataBind: {
                    //         text: 'match'
                    //     },
                    //     class: styles.classes.highlight
                    // }),
                    // span({
                    //     dataBind: {
                    //         text: 'after'
                    //     }
                    // }),
                    '<!-- /ko -->',
                ])
            ]))
        ]);
    }

    function buildMatchViewDetailTable() {
        return table({
            class: styles.classes.detailTable,
        }, [
            tbody({
                dataBind: {
                    foreach: 'detail'
                }
            }, tr([
                td({
                    dataBind: {
                        text: 'label'
                    }
                }),
                '<!-- ko if: $data.highlights -->',
            
                td([
                    '<!-- ko foreach: $data.highlights -->',
                    span({
                        class: styles.classes.highlight,
                        dataBind: {
                            html: 'highlight'
                        }
                    }), 
                    // span({
                    //     dataBind: {
                    //         text: 'before'
                    //     }
                    // }), ' ',
                    // span({
                    //     dataBind: {
                    //         text: 'match'
                    //     },
                    //     class: 'highlight'
                    // }), ' ', 
                    // span({
                    //     dataBind: {
                    //         text: 'after'
                    //     }
                    // }),
                    '<!-- /ko -->',
                ]),
                
                '<!-- /ko -->',
                '<!-- ko ifnot: $data.highlights -->',

                '<!-- ko if: $data.type -->',
                td({
                    dataBind: {
                        typedText: {
                            value: 'value',
                            type: 'type',
                            format: 'format',
                            default: '$data.default',
                            missing: '$data.missing'
                        }
                    }
                }),
                '<!-- /ko -->',

                '<!-- ko if: $data.component -->',
                td({
                    dataBind: {
                        component: {
                            name: '$data.component',
                            params: {
                                value: '$data.value'
                            }
                        }
                    }
                }),
                '<!-- /ko -->',

                '<!-- ko ifnot: $data.type || $data.component -->',
                td({
                    dataBind: {
                        text: 'value'
                    }
                }),
                '<!-- /ko -->',

                '<!-- /ko -->'
            ]))
        ]);
    }

    function buildViewRow() {
        return div({
            class: [styles.classes.body],
            dataBind: {
                foreach: 'objects'
            }
        }, [
            div({
                class: styles.classes.objectItemRow
            }, [
                buildMatchViewObject(),
                
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'row'
                    }
                }, [
                    div({
                        class: styles.classes.rowCell,
                        style: {
                            flex: '0 0 2em'
                        }
                    }),
                    div({
                        style: {
                            flex: '2',
                            marginRight: '4px'
                        }
                    }, [
                        '<!-- ko if: $component.view() === "matches" || $component.view() === "detail" -->',

                        div({
                            class: styles.classes.sectionTitle
                        }, 'Matches'),

                        '<!-- ko if: matches.length > 0 -->',
                        buildMatchHighlightsTable(),
                        '<!-- /ko -->',
                        '<!-- ko if: matches.length === 0 -->',
                        p({
                            style: {
                                marginTop: '10px',
                                fontStyle: 'italic'
                            }
                        }, [
                            'No matches reported ... ', 
                            span({class: 'fa fa-bug fa-rotate-90'}),
                            ' ... it is a mystery!'
                        ]),
                        '<!-- /ko -->',


                        '<!-- /ko -->'                                
                    ]),
                    div({
                        style: {
                            flex: '3',
                            marginLeft: '4px'
                        }
                    }, [
                        '<!-- ko if: $component.view() === "detail" -->',
                        div({
                            class: styles.classes.sectionTitle
                        }, 'Detail'),
                        buildMatchViewDetailTable(),
                        '<!-- /ko -->'
                    ]),
                    div({
                        class: styles.classes.rowCell,
                        style: {
                            flex: '0 0 4em'
                        }
                    })
                ])
            ])
        ]);
    }

    function buildRow() {
        return div({
            class: styles.classes.resultsRow,
            dataBind: {
                event: {
                    mouseenter: '$component.doMouseOverRow',
                    mouseleave: '$component.doMouseOutRow'
                },
                class: 'active() ? "' + styles.scopes.active + '" : null',
            }
        }, [
            buildNarrativeRow(),
            buildViewRow()
        ]);
    }

    function buildNarrativeRow() {
        return  div({
            class: [styles.classes.row, styles.classes.narrativeRow],
        }, [
            // columns
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '4',
                    fontWeight: 'bold'
                }
            }, [
                '<!-- ko if: title -->',
                a({
                    dataBind: {
                        attr: {
                            href: '"/narrative/ws." + ref.workspaceId + ".obj." + ref.objectId'                        
                        },
                        text: 'title'
                    },
                    target: '_blank'
                }),
                '<!-- /ko -->',
                '<!-- ko ifnot: title -->',
                a({
                    dataBind: {
                        attr: {
                            href: '"#dataview/" + ref.workspaceId + "/" + ref.objectId'                        
                        },
                        text: 'ref.workspaceId'
                    },
                    target: '_blank'
                }),
                '<!-- /ko -->'
            ]),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1'
                }
            }, a({
                target: '_blank',
                dataBind: {
                    attr: {
                        href: '"#people/" + owner.username'
                    },
                    text: 'owner.realName'
                }
            })),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 4em'
                }
            }),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1.5'
                },
                dataBind: {
                    typedText: {
                        type: '"date"',
                        format: '"MM/DD/YYYY"',
                        value: 'modified'
                    }
                }
            }),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 4em',
                    textAlign: 'right'
                },
               
            }, buildNarrativeOptionsColumn())
        ]);
    }

    function buildResults() {
        return div({
            dataBind: {
                foreach: 'searchState.buffer',
            },
            name: 'result-rows'
        }, [
            buildRow()
        ]);
    }

    function buildNoSearch() {
        return div({
            class: 'well',
            style: {
                margin: '40px auto 0 auto',
                maxWidth: '40em',
                textAlign: 'center'
            }
        }, [
            'No active search'
        ]);
    }

    function buildNotFound() {
        return div({
            class: 'well',
            style: {
                margin: '40px auto 0 auto',
                maxWidth: '40em',
                textAlign: 'center'
            }
        }, [
            'Nothing found'
        ]);
    }

    function buildSearching() {
        return div({
            class: 'well',
            style: {
                margin: '40px auto 0 auto',
                maxWidth: '40em',
                textAlign: 'center'
            }
        }, [
            html.loading()
        ]);
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            styles.sheet,            
            div({
                style: {
                    flex: '1 1 0px'
                },
                name: 'result-rows-container'
            }, [
                '<!-- ko switch: searchState.status -->',

                '<!-- ko case: "none" -->',
                buildNoSearch(),
                '<!-- /ko -->',

                '<!-- ko case: "notfound" -->',
                buildNotFound(),
                '<!-- /ko -->',

                '<!-- ko case: "searching" -->',
                buildSearching(),
                '<!-- /ko -->',

                '<!-- ko case: "success" -->',
                buildResults(),
                '<!-- /ko -->',

                '<!-- /ko -->'
            ])
        ]);
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