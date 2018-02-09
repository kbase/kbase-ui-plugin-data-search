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
        button = t('button'),
        div = t('div'),
        span = t('span'),
        a = t('a'),
        ul = t('ul'),
        li = t('li'),
        table = t('table'),   
        caption = t('caption'),     
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
            backgroundColor: 'yellow',
            fontWeight: 'bold'
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
        }
    });

    function viewModel(params) {
        // If this is not an Element, it was installed with a comment and 
        // the first node in the template can be found as the next sibling.
        
        var searchState = params.searchState;

        // ACTIONS

        function doDuplicateNarrative(data) {
            // console.log('duplicate...', data);
            params.overlayComponent({
                name: DuplicateNarrativeComponent.name(),
                viewModel: {
                    narrative: data.ref
                }
            });
        }

        // function doOpenNarrative(cell) {
        //     if (cell.url) {
        //         window.open(cell.url, '_blank');
        //     }
        // }

        // function doViewObject(cell) {
        //     if (cell.url) {
        //         window.open(cell.url, '_blank');
        //     }
        // }

        // function doOpenProfile(cell) {
        //     if (cell.url) {
        //         window.open(cell.url, '_blank');
        //     }
        // }
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

        function descendantsComplete() {
            // console.log('completed?');
            // updateScroller();
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
            dispose: dispose,
            koDescendantsComplete: descendantsComplete
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

            // '<!-- ko case: "narrative" -->',
            // button({
            //     class: 'btn btn-default'                
            // }, 'Duplicate...'),
            // '<!-- /ko -->',

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
                        href: '"/narrative/ws." + matchClass.ref.workspaceId + "." + matchClass.ref.objectId'
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
            class: styles.classes.resultsTable,
        }, [
            caption('Matches'),
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
                        dataBind: {
                            text: 'before'
                        }
                    }),
                    span({
                        dataBind: {
                            text: 'match'
                        },
                        class: styles.classes.highlight
                    }),
                    span({
                        dataBind: {
                            text: 'after'
                        }
                    }),
                    '<!-- /ko -->',
                ])
            ]))
        ]);
    }

    function buildMatchViewMatches() {
        return div({
            class: styles.classes.row
        }, [
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 2em'
                }
            }, ''),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1'
                }
            }),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '5.5'
                }
            }, buildMatchHighlightsTable()),
           
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 4em'
                }
            })
        ]);
    }

    function buildMatchViewDetailTable() {
        return table({
            class: styles.classes.resultsTable,
        }, [
            caption('Detail'),
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
                        dataBind: {
                            text: 'before'
                        }
                    }), ' ',
                    span({
                        dataBind: {
                            text: 'match'
                        },
                        class: 'highlight'
                    }), ' ', 
                    span({
                        dataBind: {
                            text: 'after'
                        }
                    }),
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
                            format: 'format'
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

    function buildMatchViewDetail() {
        return div({
            class: styles.classes.row
        }, [
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 2em'
                }
            }, ''),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1'
                }
            }),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '5.5'
                }
            }, buildMatchViewDetailTable()),
           
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 4em'
                }
            }),
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

                '<!-- ko if: $component.view() === "matches" || $component.view() === "detail" -->',
                buildMatchViewMatches(),
                '<!-- /ko -->',

                '<!-- ko if: $component.view() === "detail" -->',
                buildMatchViewDetail(),
                '<!-- /ko -->'
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
            }, a({
                dataBind: {
                    attr: {
                        href: '"/narrative/ws." + ref.workspaceId + ".obj." + ref.objectId'                        
                    },
                    text: 'title'
                },
                target: '_blank'
            })),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1'
                }
            }, a({
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
                    flex: '0 0 2em'
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