define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html',
    '../dialogs/duplicateNarrative',
    '../dialogs/copyObjects',
    '../funnyRandomPrompt'
], function (
    ko,
    reg,
    gen,
    html,
    DuplicateNarrativeComponent,
    CopyObjectComponent,
    FunnyRandomPromptComponent
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
                // marginBottom: '10px'
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

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var appBus = context['$root'].appBus;

        // If this is not an Element, it was installed with a comment and
        // the first node in the template can be found as the next sibling.

        // var searchState = params.searchState;

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
                    objectsToCopy: [data.matchClass.ref.objectRef]
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
            if (params.selectedObjects().indexOf(data.matchClass.ref.objectRef) >= 0) {
                params.selectedObjects.remove(data.matchClass.ref.objectRef);
            } else {
                params.selectedObjects.push(data.matchClass.ref.objectRef);
            }
        }

        function doMouseOverRow(data) {
            data.active(true);
        }

        function doMouseOutRow(data) {
            data.active(false);
        }

        function doShowError() {
            appBus.send('error', {
                error: params.error()
            });
        }

        // LIFECYCLE

        function dispose() {
        }
        return {
            buffer: params.buffer,
            status: params.status,
            errorMessage: params.errorMessage,
            // searchState: searchState,
            view: view,

            narrativesTotal: params.narrativesTotal,
            referenceDataTotal: params.referenceDataTotal,
            featuresTotal: params.featuresTotal,

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

            doShowError: doShowError,

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
                        title: 'selected() ? "Click to udeselect this object" : "Click to select this object for copying"'
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
                },
                target: '_blank'
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
                class: styles.classes.objectItemRow,
                dataKBTesthookElement: 'object-row'
            }, [
                buildMatchViewObject(),

                '<!-- ko if: $component.view() === "matches" || $component.view() === "detail" -->',
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '10px'
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
                ]),
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
            }, 'N') )
        ]);
    }

    function buildOtherObjectIcon() {
        return span({
            class: 'fa-stack',
            style: {
                textAlign: 'center',
                width: '1.5em'
            }
        }, [
            span({
                class: 'fa fa-folder-o fa-stack-1x',
                style: {
                    fontSize: '120%',
                    // color: 'rgba(150,150,150,1)'
                }
            })
        ]);
    }

    function buildNarrativeRow() {
        return  div({
            class: [styles.classes.row, styles.classes.narrativeRow],
            dataKBTesthookElement: 'narrative-row'
        }, [
            // columns
            div({
                class: styles.classes.rowCell,
                style: {
                    flex: '4',
                    fontWeight: 'bold',
                    fontSize: '120%'
                }
            }, [
                '<!-- ko if: isNarrative -->',
                a({
                    dataBind: {
                        attr: {
                            href: '"/narrative/ws." + ref.workspaceId + ".obj." + ref.objectId'
                        }
                    },
                    style: {
                        display: 'flex',
                        alignItems: 'top'
                    },
                    target: '_blank'
                }, [
                    buildNarrativeIcon(),
                    span({
                        style: {
                            marginLeft: '3px',
                            // just nudge it down to align more harmoniously with
                            // the icon.
                            marginTop: '3px'
                        },
                        dataBind: {
                            text: 'title'
                        }
                    })
                ]),
                '<!-- /ko -->',
                '<!-- ko ifnot: isNarrative -->',
                span({
                }, [
                    buildOtherObjectIcon(),
                    'Workspace #',
                    span({
                        dataBind: {
                            text: 'ref.workspaceId'
                        }
                    }),
                    ' (not a Narrative)'
                ]),
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

            }, [
                '<!-- ko if: isNarrative -->',
                buildNarrativeOptionsColumn(),
                '<!-- /ko -->'
            ])
        ]);
    }

    function buildResults() {
        return div({
            dataBind: {
                foreach: 'buffer',
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
            // p('No active search'),
            p('Enter one or more terms above to find user data and Narratives.'),
            hr({
                style: {
                    width: '50%'
                }
            }),
            p('This will search both text and data in all your Narratives, Narratives shared with you (Private), and Narratives shared with all KBase users (Public).'),
            hr({
                style: {
                    width: '50%'
                }
            }),
            p([
                'Multiple search terms are treated as “AND”  statements. The search will find objects or text that include all of the terms you submit. ',
                'Terms are matched against whole words; no partial matches will be listed. Other search operators and wildcards are not currently supported.'
            ])
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
            p('Sorry, no User Data found.'),
            gen.if('referenceDataTotal', p([
                'However, there ',
                gen.plural('referenceDataTotal()', 'is ', 'are '),
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
            ])),
            gen.if('featuresTotal', p([
                'However, there ',
                gen.plural('featuresTotal()', 'is ', 'are '),
                span({
                    style: {
                        fontWeight: 'bold'
                    }
                }, [
                    span({
                        dataBind: {
                            typedText: {
                                value: 'featuresTotal',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }),
                    ' matching Genome Feature',
                    ko.kb.pluralize('featuresTotal()', '.', 's.')
                ])
            ]))
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
                    text: 'errorMessage'
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
                '<!-- ko switch: status -->',

                '<!-- ko case: "none" -->',
                buildNoSearch(),
                '<!-- /ko -->',

                '<!-- ko case: "notfound" -->',
                buildNotFound(),
                '<!-- /ko -->',

                '<!-- ko case: "searching" -->',
                buildSearching(),
                '<!-- /ko -->',

                '<!-- ko case: "error" -->',
                buildError(),
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
