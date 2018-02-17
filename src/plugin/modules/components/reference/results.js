define([
    'knockout-plus',
    'kb_common/html',
    '../dialogs/copyObjects',
    'css!./results.css'
], function (
    ko,
    html,
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
                maxWidth: '100%'
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
                    width: '30%'
                },
                'td:nth-child(2)': {
                    width: '70%',
                    wordBreak: 'break-word'
                }
            }
        }, 
        highlightsTable: {
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
        detailTable: {
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
                    width: '14em'
                },
                'td:nth-child(2)': {
                    wordBreak: 'break-word'
                }
            }
        },
        objectItemRow: {
            css: {
                marginBottom: '10px'
            }
        }
    });        

    function viewModel(params) {
        // If this is not an Element, it was installed with a comment and 
        // the first node in the template can be found as the next sibling.
        
        var searchState = params.searchState;

        // ACTIONS

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

        function doToggleShowMatches(data, ev) {
            if (ev.originalEvent.altKey) {
                params.doToggleShowMatches(data.showMatches());
                return;
            }
            if (data.showMatches()) {
                data.showMatches(false);
                data.showDetails(false);
            } else {
                data.showMatches(true);
                data.showDetails(false);
            }
        }

        function doToggleShowDetails(data, ev) {
            if (ev.originalEvent.altKey) {
                params.doToggleShowDetails(data.showDetails());
                return;
            }
            if (data.showDetails()) {
                data.showMatches(false);
                data.showDetails(false);
            } else {
                data.showMatches(false);
                data.showDetails(true);
            }
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
            view: params.view,

            // scroller: scroller,

            // ACTIONS
            doCopyObject: doCopyObject,
            doViewObject: doViewObject,

            doNextPage: doNextPage,
            doPreviousPage: doPreviousPage,

            doToggleSelected: doToggleSelected,

            doToggleShowMatches: doToggleShowMatches,
            doToggleShowDetails: doToggleShowDetails,

            doMouseOverRow: doMouseOverRow,
            doMouseOutRow: doMouseOutRow,

            // LIFECYCLE
            dispose: dispose
        };
    }

    function buildOptionsColumn() {
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
                    })
                ]),
                ul({
                    class: 'dropdown-menu dropdown-menu-right'
                }, [
                    li(a({
                        dataBind: {
                            click: '$component.doCopyObject'
                        }
                    }, 'copy...')),
                    li(a({
                        dataBind: {
                            click: '$component.doViewObject'
                        }
                    }, 'view object'))
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

            '<!-- ko case: "dataObject" -->',
            '<!-- ko if: matchClass.viewable -->',
            a({
                dataBind: {
                    attr: {
                        href: '"#dataview/" + matchClass.ref.workspaceId + "/" + matchClass.ref.objectId + "/" + matchClass.ref.version'
                    },
                    text: 'name'
                }
            }),
            '<!-- /ko -->',
            '<!-- ko ifnot: matchClass.viewable -->',
            div({
                dataBind: {
                    text: 'name'
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

            '<!-- ko ifnot: type.icon.type === "fontAwesome" -->',
            span({
                class: 'fa fa-file-o'
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

    function buildObjectView() {
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
                    flex: '2'
                }
            }, buildObjectLink()),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '3'
                }
            }, div({
                dataBind: {
                    text: 'scientificName'
                }
            })),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1'
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
            }, buildOptionsColumn()),
        ]);
    }

    function buildMatchHighlightsTable() {
        return table({
            class: styles.classes.highlightsTable,
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

    function buildViewRow() {
        return div({
            class: [styles.classes.body],
        }, [
            div({
                class: styles.classes.objectItemRow
            }, [
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
                        buildMatchHighlightsTable(),
                        '<!-- /ko -->'                                
                    ]),
                    div({
                        style: {
                            flex: '3',
                            marginLeft: '4px'
                        }
                    }, [
                        '<!-- ko if: $component.view() === "detail" -->',
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
            buildObjectView(),
            '<!-- ko if: $component.view() === "matches" || $component.view() === "detail" -->',
            buildViewRow(),
            '<!-- /ko -->'
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
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});