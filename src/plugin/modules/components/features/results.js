define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html',
    '../dialogs/copyObjects',
    '../funnyRandomPrompt',
    '../../lib/types/components/stringArray',
    '../../lib/types/components/taxonomy',
    '../../lib/ui',
    './header'
], function (
    ko,
    reg,
    gen,
    html,
    CopyObjectComponent,
    FunnyRandomPromptComponent,
    StringArrayComponent,
    LineageComponent,
    ui,
    HeaderComponent
) {
    'use strict';

    var t = html.tag,
        p = t('p'),
        hr = t('hr'),
        button = t('button'),
        div = t('div'),
        span = t('span'),
        a = t('a'),
        ul = t('ul'),
        li = t('li'),
        table = t('table'),
        tbody = t('tbody'),
        tr = t('tr'),
        th = t('th'),
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
                // marginBottom: '15px'
            },
            modifiers: {
                active: {
                    backgroundColor: rowBackgroundColor(0.6)
                }
            }
        },
        objectRow: {
            css: {
                backgroundColor: rowBackgroundColor(0.4),
            },
            modifiers: {
                active: {
                    backgroundColor: rowBackgroundColor(0.6)
                }
            }
        },
        rowCell: {
            css: {
                padding: '4px',
                wordBreak: 'break-word'
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
                // border: '1px silver solid',
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
                // border: '0.5px solid rgba(220,220,220,0.5)',
                width: '100%',
                maxWidth: '60em'
            },
            scopes: {
                active: {
                    // border: '0.5px solid rgba(220,220,220,1)'
                }
            },
            inner: {
                caption: {
                    paddingBottom: '0'
                },
                td: {
                    css: {
                        padding: '4px',
                        verticalAlign: 'top',
                        borderBottom: '0.5px solid rgba(220,220,220,0.5)'
                    },
                    scopes: {
                        active: {
                            borderBottom: '0.5px solid rgba(220,220,220,1)'
                        }
                    }
                },
                th: {
                    css: {
                        padding: '4px',
                        verticalAlign: 'top',
                        borderBottom: '0.5px solid rgba(220,220,220,0.5)',
                        fontWeight: 'normal',
                        color: '#777'
                    },
                    scopes: {
                        active: {
                            borderBottom: '0.5px solid rgba(220,220,220,1)'
                        }
                    }
                },
                // 'tr:nth-child(1) td': {
                //     borderTop: '0.5px solid rgba(220,220,220,0.5)'
                // },
                'th:nth-child(1)': {
                    width: '10em'
                },
                'td:nth-child(2)': {
                    wordBreak: 'break-word'
                },
                'tr:last-child td': {
                    borderBottom: 'none'
                },
                'tr:last-child th': {
                    borderBottom: 'none'
                }
            }
        },
        detailTable: {
            css: {
                // border: '0.5px solid rgba(220,220,220,0.5)',
                width: '100%',
                maxWidth: '60em'
            },
            scopes: {
                active: {
                    // border: '0.5px solid rgba(220,220,220,1)'
                }
            },
            inner: {
                caption: {
                    paddingBottom: '0'
                },
                // 'tr:nth-child(1) td': {
                //     borderTop: '0.5px solid rgba(220,220,220,0.5)'
                // },
                ' > tbody > tr > td': {
                    css: {
                        padding: '4px',
                        verticalAlign: 'top',
                        borderBottom: '0.5px solid rgba(220,220,220,0.5)'
                    },
                    scopes: {
                        active: {
                            borderBottom: '0.5px solid rgba(220,220,220,1)'
                        }
                    }
                },
                ' > tbody > tr > th': {
                    css: {
                        padding: '4px',
                        verticalAlign: 'top',
                        borderBottom: '0.5px solid rgba(220,220,220,0.5)',
                        fontWeight: 'normal',
                        color: '#777'
                    },
                    scopes: {
                        active: {
                            borderBottom: '0.5px solid rgba(220,220,220,1)'
                        }
                    }
                },
                ' > tbody > tr > th:nth-child(1)': {
                    width: '14em'
                },
                ' > tbody > tr > td:nth-child(2)': {
                    wordBreak: 'break-word'
                },
                ' > tbody > tr:last-child > td': {
                    borderBottom: 'none'
                },
                ' > tbody > tr:last-child > th': {
                    borderBottom: 'none'
                }
            }
        },
        groupHeaderTable: {
            css: {
                width: '100%',
                maxWidth: '60em'
            },
            inner: {
                caption: {
                    paddingBottom: '0'
                },
                td: {
                    css: {
                        padding: '4px',
                        verticalAlign: 'top',
                        borderBottom: '0.5px solid rgba(220,220,220,0.8)'
                    },
                    scopes: {
                        active: {
                            borderBottom: '0.5px solid rgba(220,220,220,1)'
                        }
                    }
                },
                th: {
                    css: {
                        padding: '4px',
                        verticalAlign: 'top',
                        borderBottom: '0.5px solid rgba(220,220,220,0.8)',
                        fontWeight: 'normal',
                        color: '#777'
                    },
                    scopes: {
                        active: {
                            borderBottom: '0.5px solid rgba(220,220,220,1)'
                        }
                    }
                },
                'td:nth-child(1)': {
                    width: '10em'
                },
                'td:nth-child(2)': {
                    wordBreak: 'break-word'
                },
                'tr:last-child td': {
                    borderBottom: 'none'
                },
                'tr:last-child th': {
                    borderBottom: 'none'
                }
            }
        },
        objectItemRow: {
            css: {
                marginBottom: '10px'
            }
        },
        sectionTitle: {
            css: {
                fontWeight: 'bold',
                color: 'gray',
                marginTop: '4px',
                marginBottom: '6px',
                textAlign: 'center'
            }
        },
        resultGroup: {
            css: {
                marginBottom: '15px'
            }
        },
        groupRow: {
            css: {
                backgroundColor: rowBackgroundColor(0.8),
            },
            modifiers: {
                active: {
                    backgroundColor: rowBackgroundColor(1)
                }
            }
        },
        header: {
            // flex: '0 0 40px',
            backgroundColor: 'rgba(220,220,220,0.6)',
            height: '40px',
            display: 'flex',
            flexDirection: 'column'
        },
    });

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var appBus = context['$root'].appBus;
        // If this is not an Element, it was installed with a comment and
        // the first node in the template can be found as the next sibling.

        var searchState = params.searchState;

        // ACTIONS

        function doCopyObject(data) {
            params.overlayComponent({
                name: CopyObjectComponent.name(),
                viewModel: {
                    objectsToCopy: [data.matchClass.ref.subObjectRef]
                }
            });
        }

        function doViewObject(data) {
            window.open(data.url, '_blank');
        }

        // function doToggleShowMatches(data, ev) {
        //     if (ev.originalEvent.altKey) {
        //         params.doToggleShowMatches(data.showMatches());
        //         return;
        //     }
        //     if (data.showMatches()) {
        //         data.showMatches(false);
        //         data.showDetails(false);
        //     } else {
        //         data.showMatches(true);
        //         data.showDetails(false);
        //     }
        // }

        function doToggleShowMatches(data, ev) {
            if (ev.originalEvent.altKey) {
                params.doToggleShowMatches(data.showDetails());
                return;
            }
            if (data.showItemMatches()) {
                data.showItemMatches(false);
                data.items.forEach((item) => {
                    item.showMatches(false);
                    item.showDetails(false);
                });
            } else {
                data.showItemDetail(false);
                data.showItemMatches(true);
                data.items.forEach((item) => {
                    item.showMatches(true);
                    item.showDetails(false);
                });
            }
        }

        function doToggleShowDetails(data, ev) {
            if (ev.originalEvent.altKey) {
                params.doToggleShowDetails(data.showDetails());
                return;
            }
            if (data.showItemDetail()) {
                data.showItemDetail(false);
                data.items.forEach((item) => {
                    item.showMatches(false);
                    item.showDetails(false);
                });
            } else {
                data.showItemMatches(false);
                data.showItemDetail(true);
                data.items.forEach((item) => {
                    item.showMatches(true);
                    item.showDetails(true);
                });
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

        function doToggleGenomeDetail(data) {
            data.isOpen(data.isOpen() ? false : true);
        }

        function doShowError() {
            appBus.send('error', {
                error: searchState.error()
            });
        }

        // LIFECYCLE

        function dispose() {
        }

        return {
            searchState: searchState,
            error: params.error,
            errorMessage: params.errorMessage,
            view: params.view,

            narrativesTotal: params.narrativesTotal,
            referenceDataTotal: params.referenceDataTotal,
            featuresTotal: params.featuresTotal,

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

            doToggleGenomeDetail: doToggleGenomeDetail,

            doShowError: doShowError,

            // LIFECYCLE
            dispose: dispose
        };
    }

    function buildOptionsColumn() {
        return div({
        }, [
            '<!-- ko if: matchClass.copyable || matchClass.viewable -->',
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
                    })
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
                    '<!-- ko if: matchClass.copyable -->',
                    li(a({
                        dataBind: {
                            click: '$component.doCopyObject'
                        }
                    }, 'Copy...')),
                    '<!-- /ko -->',
                    '<!-- ko if: matchClass.viewable -->',
                    li(a({
                        dataBind: {
                            click: '$component.doViewObject'
                        }
                    }, 'View')),
                    '<!-- /ko -->'
                ])
            ]),
            '<!-- /ko -->'
        ]);
    }


    function buildObjectCheckbox() {
        return [
            '<!-- ko switch: matchClass.id -->',

            '<!-- ko case: "dataObject" -->',
            '<!-- ko if: matchClass.copyable -->',

            span({
                style: {
                    fontSize: '120%',
                },
                class: 'fa',
                dataBind: {
                    attr: {
                        title: 'selected() ? "Click to deselect this object" : "Click to select this object for copying"'
                    },
                    class: 'selected() ? "fa-check-square-o" : "fa-square-o"',
                    click: '$component.doToggleSelected'
                }
            }),

            '<!-- /ko -->',
            '<!-- /ko -->',

            '<!-- /ko -->'
        ];
    }

    function buildSubObjectLink() {
        return [
            '<!-- ko switch: matchClass.id -->',

            '<!-- ko case: "subObject" -->',
            '<!-- ko if: matchClass.viewable -->',
            a({
                dataBind: {
                    attr: {
                        href: '"#dataview/" + matchClass.ref.subObjectRef'
                    },
                    text: 'id'
                },
                target: '_blank'
            }),
            '<!-- /ko -->',
            '<!-- ko ifnot: matchClass.viewable -->',
            div({
                dataBind: {
                    text: 'id'
                }
            }),
            '<!-- /ko -->',
            '<!-- /ko -->',

            '<!-- /ko -->'
        ];
    }

    // function buildScientificNameField() {
    //     return [
    //         a({
    //             dataBind: {
    //                 attr: {
    //                     href: '"#dataview/" + matchClass.ref.objectRef'
    //                 },
    //                 text: 'scientificName'
    //             },
    //             target: '_blank'
    //         })
    //     ];
    // }

    // function buildObjectIcon() {
    //     return [
    //         '<!-- ko if: type.icon -->',

    //         '<!-- ko if: type.icon.type === "fontAwesome" -->',
    //         span({
    //             // class: 'fa-2x',
    //             dataBind: {
    //                 class: 'type.icon.classes.join(" ")',
    //                 style: {
    //                     color: 'type.icon.color'
    //                 }
    //             }
    //         }),
    //         '<!-- /ko -->',

    //         '<!-- ko if: type.icon.type === "kbase" -->',
    //         span({
    //             dataBind: {
    //                 class: 'type.icon.classes.join(" ")',
    //                 style: {
    //                     color: 'type.icon.color'
    //                 }
    //             }
    //         }),
    //         '<!-- /ko -->',

    //         '<!-- /ko -->',

    //         '<!-- ko ifnot: type.icon -->',
    //         span({
    //             class: 'fa fa-file-o'
    //         }),
    //         '<!-- /ko -->'
    //     ];
    // }

    function buildObjectView() {
        return div({
            class: [styles.classes.row, styles.classes.objectRow],
            dataKBTesthookElement: 'object-row'
        }, [
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '0 0 2em'
                }
            }, buildObjectCheckbox()),
            // div({
            //     class: styles.classes.rowCell,
            //     style: {
            //         flex: '0 0 2em'
            //     }
            // }, buildObjectIcon()),
            // div({
            //     class: styles.classes.rowCell,
            //     style: {
            //         flex: '1'
            //     },
            //     dataBind: {
            //         text: 'type.label'
            //     }
            // }),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1'
                },
                dataBind: {
                    text: 'featureType'
                }
            }),
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '1.6',
                    workBreak: 'break-all'
                }
            }, buildSubObjectLink()),
            // TODO: we should abstract out the column
            // definitions so we can define each value
            // as either a raw value (e.g. string) or
            // component, just as we do for detail view
            // and in other search tools...
            // but expediency says, just get it done
            // quickly first.
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '3'
                }
            }, div({
                dataBind: {
                    component: {
                        name: StringArrayComponent.quotedName(),
                        params: {
                            value: 'featureFunctions'
                        }
                    }
                }
            })),

            // div({
            //     dataBind: {
            //         text: 'featureFunctions'
            //     }
            // })),
            // div({
            //     class: styles.classes.rowCell,
            //     style: {
            //         flex: '3'
            //     }
            // }, buildScientificNameField()),
            // div({
            //     class: styles.classes.rowCell,
            //     style: {
            //         flex: '0 0 6em'
            //     },
            //     dataBind: {
            //         typedText: {
            //             type: '"date"',
            //             format: '"MM/DD/YYYY"',
            //             value: 'date'
            //         }
            //     }
            // }),
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
            tbody({
                dataBind: {
                    foreach: 'matches'
                }
            }, tr([
                th({
                    dataBind: {
                        text: 'label'
                    }
                }),
                td({
                },[
                    '<!-- ko foreach: $data.highlights -->',
                    div({
                        class: styles.classes.highlight,
                        dataBind: {
                            html: 'highlight'
                        }
                    }),
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
                th({
                    dataBind: {
                        text: 'label'
                    }
                }),
                // '<!-- ko if: $data.highlights -->',

                // td([
                //     '<!-- ko foreach: $data.highlights -->',
                //     span({
                //         class: styles.classes.highlight,
                //         dataBind: {
                //             html: 'highlight'
                //         }
                //     }),
                //     // span({
                //     //     dataBind: {
                //     //         text: 'before'
                //     //     }
                //     // }), ' ',
                //     // span({
                //     //     dataBind: {
                //     //         text: 'match'
                //     //     },
                //     //     class: 'highlight'
                //     // }), ' ',
                //     // span({
                //     //     dataBind: {
                //     //         text: 'after'
                //     //     }
                //     // }),
                //     '<!-- /ko -->',
                // ]),

                // '<!-- /ko -->',
                // '<!-- ko ifnot: $data.highlights -->',

                '<!-- ko ifnot: $data.value -->',
                td(ui.buildNA()),
                '<!-- /ko -->',

                '<!-- ko if: $data.value -->',

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
                                value: '$data.value',
                                params: '$data.params'
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

                // '<!-- /ko -->'
            ]))
        ]);
    }

    function buildDetailRow() {
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
                    }, div({
                        style: {
                            // border: '1px silver solid',
                            padding: '4px',
                            margin: '4px',
                            display: 'flex',
                            flexDirection: 'row'
                        }
                    }, [
                        div({
                            style: {
                                flex: '2',
                                marginRight: '4px'
                            }
                        }, [
                            '<!-- ko if: showMatches() -->',
                            // '<!-- ko if: $component.view() === "matches" || $component.view() === "detail" -->',
                            div({
                                style: {
                                    margin: '4px',
                                    padding: '4px',
                                    border: '1px solid rgba(150, 150, 150, 1)',
                                    boxShadow: '4px 4px 4px rgba(200, 200, 200, 0.7)'
                                }
                            }, [
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
                            ]),

                            '<!-- /ko -->'
                        ]),
                        div({
                            style: {
                                flex: '3',
                                marginLeft: '4px'
                            }
                        }, [
                            '<!-- ko if: showDetails() -->',
                            // '<!-- ko if: $component.view() === "detail" -->',
                            div({
                                style: {
                                    margin: '4px',
                                    padding: '4px',
                                    border: '1px solid rgba(150, 150, 150, 1)',
                                    boxShadow: '4px 4px 4px rgba(200, 200, 200, 0.7)'
                                }
                            }, [
                                div({
                                    class: styles.classes.sectionTitle
                                }, 'Feature Details'),
                                buildMatchViewDetailTable()
                            ]),
                            '<!-- /ko -->'
                        ]),
                    ])),
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
            // dataBind: {
            //     event: {
            //         mouseenter: '$component.doMouseOverRow',
            //         mouseleave: '$component.doMouseOutRow'
            //     },
            //     class: 'active() ? "' + styles.scopes.active + '" : null',
            // }
        }, [
            buildObjectView(),
            '<!-- ko if: showDetails() || showMatches() -->',
            // '<!-- ko if: $component.view() === "matches" || $component.view() === "detail" -->',
            buildDetailRow(),
            '<!-- /ko -->'
        ]);
    }

    function buildRowHeader() {
        return div({
            class: styles.classes.header
        },  ko.kb.komponent({
            name: HeaderComponent.name(),
            params: {}
        }));
    }

    function buildResults() {
        return div({
            dataBind: {
                foreach: 'searchState.grouped',
            },
            name: 'result-rows'
        }, div({
            class: styles.classes.resultGroup
        }, [
            buildGroupHeader(),
            buildRowHeader(),
            buildGroupedRows()
        ]));
    }

    function buildGroupHeaderCol1() {
        return table({
            class: styles.classes.groupHeaderTable
        }, [
            tbody([
                tr([
                    th({
                        width: '20%'
                    }, 'Scientific name'),
                    td({
                        dataBind: {
                            text: 'genomeInfo.scientificName'
                        }
                    })
                ]),
                tr([
                    th('KBase ID'),
                    td('n/a')
                ]),
                tr([
                    th('Lineage'),
                    td({
                        dataBind: {
                            component: {
                                name: LineageComponent.quotedName(),
                                params: {
                                    value: 'genomeInfo.lineage'
                                }
                            }
                            // text: 'genomeInfo.lineage'
                        }
                    })
                ]),
                tr([
                    th('Source'),
                    td({
                        dataBind: {
                            text: 'genomeInfo.source'
                        }
                    })
                ]),
                tr([
                    th('Source ID'),
                    td({
                        dataBind: {
                            text: 'genomeInfo.sourceId'
                        }
                    })
                ]),
            ])
        ]);
    }

    function buildGroupHeaderCol2() {
        return table({
            class: styles.classes.groupHeaderTable
        }, [
            tbody([
                tr([
                    th({
                        width: '20%'
                    }, 'DNA size'),
                    td({
                        dataBind: {
                            typedText: {
                                value: 'genomeInfo.dnaSize',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    })
                ]),
                tr([
                    th('Feature count'),
                    td({
                        dataBind: {
                            typedText: {
                                value: 'genomeInfo.featureCount',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    })
                ]),
                tr([
                    th('Contig count'),
                    td({
                        dataBind: {
                            typedText: {
                                value: 'genomeInfo.contigCount',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    })
                ]),
                tr([
                    th('GC content'),
                    td({
                        dataBind: {
                            typedText: {
                                value: 'genomeInfo.gcContent',
                                type: '"number"',
                                format: '"0.00%"'
                            }
                        }
                    })
                ]),
            ])
        ]);
    }

    function buildGroupToolbar() {
        return div({
            class: 'btn-toolbar'
        }, [
            span({
                class: 'btn btn-text',
                style: {
                    fontStyle: 'italic'
                }
            }, 'Show: '),
            button({
                type: 'button',
                class: 'btn btn-default btn-kb-flat',
                style: {
                    margin: '2px',
                    padding: '2px'
                },
                dataBind: {
                    click: 'function(...args){$component.doToggleGenomeDetail.apply($component, args);}',
                }
            }, [
                span({
                    class: 'fa',
                    dataBind: {
                        css: {
                            'fa-check-circle-o': 'isOpen()',
                            'fa-circle-o': '!isOpen()'
                        }
                    }
                }),
                ' genome details '
            ]),
            button({
                type: 'button',
                class: 'btn btn-default btn-kb-flat',
                style: {
                    margin: '2px',
                    padding: '2px'
                },
                dataBind: {
                    click: 'function(...args){$component.doToggleShowDetails.apply($component, args);}',
                }
            }, [
                span({
                    class: 'fa',
                    dataBind: {
                        css: {
                            'fa-check-circle-o': 'showItemDetail()',
                            'fa-circle-o': '!showItemDetail()'
                        }
                    }
                }),
                ' feature details '
            ]),
            // button({
            //     type: 'button',
            //     class: 'btn btn-default btn-kb-flat',
            //     style: {
            //         margin: '2px',
            //         padding: '2px'
            //     },
            //     dataBind: {
            //         click: 'function(d,e){$component.doToggleShowDetails.call($component,d,e);}',
            //         // text: 'isOpen() ? "Close genome detail":"Open genome detail"'
            //     }
            // }, gen.if('showItemDetail()',
            //     span([
            //         'hide feature details ',
            //         span({
            //             class: 'fa fa-caret-down'
            //         })
            //     ]),
            //     span([
            //         'show feature details ',
            //         span({
            //             class: 'fa fa-caret-right'
            //         })
            //     ]))),
            button({
                type: 'button',
                class: 'btn btn-default btn-kb-flat',
                style: {
                    margin: '2px',
                    padding: '2px'
                },
                dataBind: {
                    click: 'function(...args){$component.doToggleShowMatches.apply($component, args);}',
                }
            }, [
                span({
                    class: 'fa',
                    dataBind: {
                        css: {
                            'fa-check-circle-o': 'showItemMatches()',
                            'fa-circle-o': '!showItemMatches()'
                        }
                    }
                }),
                ' just search matches '
            ]),
        ]);
    }

    function buildNarrativeIcon() {
        return span({
            class: 'fa-stack',
            style: {
                textAlign: 'center',
                width: '1.5em'
            }
        }, [
            span({
                class: 'fa fa-file fa-stack-1x',
                style: {
                    fontSize: '120%',
                    // color: 'rgba(150,150,150,1)'
                }
            }, span({
                style: {
                    color: 'white',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    fontSize:'70%',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    textAlign: 'center'
                }
            }, 'N'))
        ]);
    }

    function buildNarrativeInfo() {
        return div({
            style: {
                textAlign: 'left'
            }
        }, [
            div([
                buildNarrativeIcon(),
                span({
                    style: {
                        // color: 'silver',
                        fontStyle: 'italic',
                        // marginRight: '4px'
                    }
                }, 'in a Narrative'),
            ]),
            div([
                span({
                    style: {
                        color: 'silver',
                        fontStyle: 'italic',
                        marginRight: '4px'
                    }
                }, 'title'),
                a({
                    dataBind: {
                        text: 'workspaceInfo.title',
                        attr: {
                            href: '"narrative/ws." + workspaceInfo.workspaceId + ".obj." + workspaceInfo.objectId'
                        }
                    },
                    target: '_blank'
                })
            ])
        ]);
    }

    function buildRefdataIcon() {
        return span({
            class: 'fa fa-database',
            style: {
                textAlign: 'center',
                width: '1.5em',
                fontSize: '120%'
            }
        });
        // return span({
        //     class: 'fa-stack',
        //     style: {
        //         textAlign: 'center',
        //         width: '1.5em'
        //     }
        // }, [
        //     span({
        //         class: 'fa fa-file fa-stack-1x',
        //         style: {
        //             fontSize: '120%',
        //             // color: 'rgba(150,150,150,1)'
        //         }
        //     }, span({
        //         style: {
        //             color: 'white',
        //             fontFamily: 'sans-serif',
        //             fontWeight: 'bold',
        //             fontSize:'70%',
        //             position: 'absolute',
        //             left: '0',
        //             top: '0',
        //             width: '100%',
        //             textAlign: 'center'
        //         }
        //     }, 'N') )
        // ]);
    }

    function buildRefdataInfo() {
        return div({
            style: {
                textAlign: 'left'
            }
        }, [
            div([
                buildRefdataIcon(),
                span({
                    style: {
                        // color: 'silver',
                        fontStyle: 'italic',
                        // marginRight: '4px'
                    }
                }, 'in a Reference Data Workspace'),
            ]),
            div([
                span({
                    style: {
                        color: 'silver',
                        fontStyle: 'italic',
                        marginRight: '4px'
                    }
                }, 'title'),
                span({
                    dataBind: {
                        text: 'workspaceInfo.title'
                    }
                })
            ])
        ]);
    }

    function buildUnknownIcon() {
        return span({
            class: 'fa fa-question-circle-o',
            style: {
                textAlign: 'center',
                width: '1.5em',
                fontSize: '120%'
            }
        });
    }

    function buildUnknownInfo() {
        return div({
            style: {
                textAlign: 'left'
            }
        }, [
            div([
                buildUnknownIcon(),
                span({
                    style: {
                        fontStyle: 'italic',
                    }
                }, 'in an Unknown Workspace'),
            ]),
            div([
                span({
                    style: {
                        color: 'silver',
                        fontStyle: 'italic',
                        marginRight: '4px'
                    }
                }, 'title'),
                span({
                    dataBind: {
                        text: 'workspaceInfo.title'
                    }
                })
            ])
        ]);
    }

    function buildGroupHeader() {
        return div({
            class: styles.classes.groupRow,
            style: {
                border: '1px silver solid',
                padding: '6px'
            }
        }, [
            div([
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '50%',
                        paddingRight: '10px'
                    }
                }, [
                    a({
                        style: {
                            fontSize: '120%',
                            fontWeight: 'bold',
                            fontStyle: 'italic'
                        },
                        dataBind: {
                            attr: {
                                href: '"#dataview/" + genomeInfo.ref'
                            },
                            text: 'genomeInfo.scientificName || "n/a"'
                        },
                        target: '_blank'
                    }),
                    div({
                        style: {
                        },
                        dataBind: {
                            text: 'genomeInfo.domain'
                        }
                    }),
                    a({
                        style: {
                            fontStyle: 'normal'
                        },
                        dataBind: {
                            attr: {
                                href: '"#dataview/" + genomeInfo.ref'
                            },
                            text: 'genomeInfo.objectName'
                        },
                        target: '_blank'
                    }),
                ]),
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '25%',
                        paddingLeft: '10px',
                        textAlign: 'right'
                    }
                }, [
                    gen.switch('workspaceInfo.type', [
                        [
                            '"narrative"',
                            buildNarrativeInfo()
                        ],
                        [
                            '"refdata"',
                            buildRefdataInfo()
                        ],
                        [
                            '"unknown"',
                            buildUnknownInfo()
                        ]
                    ]),

                    // gen.cond([
                    //     'workspaceInfo.type === "narrative"',
                    //     buildNarrativeInfo(),
                    //     'workspaceInfo.type === "refdata"',
                    //     buildRefdataInfo(),
                    //     'workspaceInfo.type === "unknown"',
                    //     buildUnknownInfo(),
                    // ]),

                    // div([
                    //     span({
                    //         style: {
                    //             color: 'silver',
                    //             fontStyle: 'italic',
                    //             marginRight: '4px'
                    //         }
                    //     }, 'owner'),
                    //     span({
                    //         style: {
                    //         },
                    //         dataBind: {
                    //             text: 'workspaceInfo.owner'
                    //         }
                    //     })
                    // ])
                ]),
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '25%',
                        paddingLeft: '10px',
                        textAlign: 'right'
                    }
                }, [
                    div([
                        span({
                            style: {
                                color: 'silver',
                                fontStyle: 'italic',
                                marginRight: '4px'
                            }
                        }, 'last saved'),
                        span({
                            dataBind: {
                                typedText: {
                                    value: 'genomeInfo.lastSavedAt',
                                    type: '"date"',
                                    format: '"YYYY/MM/DD"'
                                }
                            }
                        })
                    ]),
                    div([
                        span({
                            style: {
                                color: 'silver',
                                fontStyle: 'italic',
                                marginRight: '4px'
                            }
                        }, 'owner'),
                        a({
                            dataBind: {
                                text: 'workspaceInfo.owner',
                                attr: {
                                    href: '"#people/" + workspaceInfo.owner'
                                }
                            },
                            target: '_blank'
                        })
                    ])
                ])
            ]),
            div(buildGroupToolbar()),
            gen.if('isOpen()',
                div({
                    style: {
                        margin: '4px',
                        padding: '4px',
                        border: '1px solid rgba(150, 150, 150, 1)',
                        boxShadow: '4px 4px 4px rgba(200, 200, 200, 0.7)'
                    }
                }, [
                    div({
                        class: styles.classes.sectionTitle
                    }, 'Genome Details'),
                    div({
                        style: {
                            display: 'inline-block',
                            verticalAlign: 'top',
                            width: '50%',
                            paddingRight: '10px'
                        }
                    }, buildGroupHeaderCol1()),
                    div({
                        style: {
                            display: 'inline-block',
                            verticalAlign: 'top',
                            width: '50%',
                            paddingLeft: '10px'
                        }
                    }, buildGroupHeaderCol2())
                ]))
        ]);
    }

    function buildGroupedRows() {
        return div({
            dataBind: {
                foreach: 'items',
            },
            name: 'result-rows'
        }, [
            buildRow()
        ]);
    }

    function buildNoSearch() {
        return div({
            class: 'alert alert-info',
            dataKBTesthookAlert: 'no-search',
            style: {
                margin: '40px auto 0 auto',
                maxWidth: '40em',
                padding: '20px'
            }
        }, [
            p('Enter one or more terms above to find Reference Data in KBase.'),
            hr({
                style: {
                    width: '50%'
                }
            }),

            p('All search terms are "and"ed together -- you will get objects which include all of the terms you submit. ' +
              ' In addition, terms are matched against whole words (no partial matches) and wildcards are not supported.')
        ]);
    }

    function buildNotFound() {
        return div({
            class: 'alert alert-warning',
            dataKBTesthookAlert: 'not-found',
            style: {
                margin: '40px auto 0 auto',
                maxWidth: '40em',
                textAlign: 'center',
                padding: '20px',
            }
        }, [
            p('Sorry, no Genome Features found.'),
            '<!-- ko if: narrativesTotal -->',
            p([
                'However, there ',
                ko.kb.pluralize('narrativesTotal()', 'is ', 'are '),
                span({
                    style: {
                        fontWeight: 'bold'
                    }
                }, [
                    span({
                        dataBind: {
                            typedText: {
                                value: 'narrativesTotal',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }),

                    ' matching User Data object',
                    ko.kb.pluralize('narrativesTotal()', '.', 's.')
                ])
            ]),
            '<!-- /ko -->',
            '<!-- ko if: referenceDataTotal -->',
            p([
                'However, there ',
                ko.kb.pluralize('referenceDataTotal()', 'is ', 'are '),
                span({
                    style: {
                        fontWeight: 'bold'
                    }
                }, [
                    span({
                        dataBind: {
                            typedText: {
                                value: 'referenceDataTotal',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }),
                    ' matching Reference Data object',
                    ko.kb.pluralize('referenceDataTotal()', '.', 's.')
                ])
            ]),
            '<!-- /ko -->',

        ]);
    }

    function buildError() {
        return div({
            class: 'alert alert-danger',
            dataKBTesthookAlert: 'error',
            style: {
                margin: '40px auto 0 auto',
                maxWidth: '40em',
                textAlign: 'center',
                padding: '20px',
            }
        }, [
            p('Sorry, an error occurred with this search.'),
            p({
                dataBind: {
                    text: 'searchState.errorMessage'
                }
            }),
            p([
                button({
                    class: 'btn btn-default',
                    dataBind: {
                        click: '$component.doShowError'
                    }
                }, 'Show Error')
            ])

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
            div({
                dataBind: {
                    component: FunnyRandomPromptComponent.quotedName(),
                    params: {}
                }
            })
        ]);
    }

    function template() {
        return div({
            class: styles.classes.component,
            dataKBTesthookComponent: 'results'
        }, [
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

                '<!-- ko case: "error" -->',
                buildError(),
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
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});