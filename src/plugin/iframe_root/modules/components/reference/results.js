define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    '../dialogs/copyObjects',
    '../funnyRandomPrompt'
], function (ko, reg, gen, html, CopyObjectComponent, FunnyRandomPromptComponent) {
    'use strict';

    const t = html.tag,
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

    const styles = html.makeStyles({
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
                backgroundColor: rowBackgroundColor(0.6)
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
                borderBottom: '1px silver solid'
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
                }
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
        objectItemRow: {
            css: {
                marginBottom: '10px'
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
        const context = ko.contextFor(componentInfo.element);
        const appBus = context['$root'].appBus;
        // If this is not an Element, it was installed with a comment and
        // the first node in the template can be found as the next sibling.

        const searchState = params.searchState;

        // ACTIONS

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
                error: searchState.error()
            });
        }

        // LIFECYCLE

        function dispose() {}

        return {
            searchState: searchState,
            view: params.view,

            narrativesTotal: params.narrativesTotal,
            referenceDataTotal: params.referenceDataTotal,

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

            doShowError: doShowError,

            // LIFECYCLE
            dispose: dispose
        };
    }

    function buildOptionsColumn() {
        return div({}, [
            '<!-- ko if: matchClass.copyable || matchClass.viewable -->',
            div(
                {
                    class: 'btn-group',
                    dataBind: {
                        enable: '$parent.active'
                    }
                },
                [
                    button(
                        {
                            type: 'button',
                            class: 'btn btn-default btn-sm dropdown-toggle btn-kb-toggle-dropdown',
                            dataToggle: 'dropdown',
                            ariaHasPopup: 'true',
                            areaExpanded: 'false'
                        },
                        [
                            span({
                                class: 'fa fa-ellipsis-h'
                            })
                        ]
                    ),
                    ul(
                        {
                            class: 'dropdown-menu dropdown-menu-right'
                        },
                        [
                            li(
                                div(
                                    {
                                        style: {
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: 'gray'
                                        }
                                    },
                                    'Object'
                                )
                            ),
                            '<!-- ko if: matchClass.copyable -->',
                            li(
                                a(
                                    {
                                        dataBind: {
                                            click: '$component.doCopyObject'
                                        }
                                    },
                                    'Copy...'
                                )
                            ),
                            '<!-- /ko -->',
                            '<!-- ko if: matchClass.viewable -->',
                            li(
                                a(
                                    {
                                        dataBind: {
                                            click: '$component.doViewObject'
                                        }
                                    },
                                    'View'
                                )
                            ),
                            '<!-- /ko -->'
                        ]
                    )
                ]
            ),
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
                    fontSize: '120%'
                },
                class: 'fa',
                dataBind: {
                    attr: {
                        title:
                            'selected() ? "Click to deselect this object" : "Click to select this object for copying"'
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
            // 'x',
            // span({
            //     dataBind: {
            //         text: 'JSON.stringify(matchClass)'
            //     }
            // }),
            '<!-- ko switch: matchClass.id -->',

            '<!-- ko case: "dataObject" -->',
            '<!-- ko if: matchClass.viewable -->',
            a({
                dataBind: {
                    attr: {
                        href:
                            '"/#dataview/" + matchClass.ref.workspaceId + "/" + matchClass.ref.objectId + "/" + matchClass.ref.version'
                    },
                    text: 'name'
                },
                target: '_blank'
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

    function buildObjectView() {
        return div(
            {
                class: [styles.classes.row, styles.classes.objectRow],
                dataKBTesthookElement: 'object-row'
            },
            [
                div(
                    {
                        class: styles.classes.rowCell,
                        style: {
                            flex: '0 0 2em'
                        }
                    },
                    buildObjectCheckbox()
                ),
                div(
                    {
                        class: styles.classes.rowCell,
                        style: {
                            flex: '0 0 2em'
                        }
                    },
                    buildObjectIcon()
                ),
                div({
                    class: styles.classes.rowCell,
                    style: {
                        flex: '1'
                    },
                    dataBind: {
                        text: 'type.label'
                    }
                }),
                div(
                    {
                        class: styles.classes.rowCell,
                        style: {
                            flex: '2'
                        }
                    },
                    buildObjectLink()
                ),
                div(
                    {
                        class: styles.classes.rowCell,
                        style: {
                            flex: '3'
                        }
                    },
                    div({
                        dataBind: {
                            text: 'scientificName'
                        }
                    })
                ),
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
                div(
                    {
                        class: styles.classes.rowCell,
                        style: {
                            flex: '0 0 4em',
                            textAlign: 'right'
                        }
                    },
                    buildOptionsColumn()
                )
            ]
        );
    }

    function buildMatchHighlightsTable() {
        return table(
            {
                class: styles.classes.highlightsTable
            },
            [
                tbody(
                    {
                        dataBind: {
                            foreach: 'matches'
                        }
                    },
                    tr([
                        td({
                            dataBind: {
                                text: 'label'
                            }
                        }),
                        td({}, [
                            '<!-- ko foreach: $data.highlights -->',
                            span({
                                class: styles.classes.highlight,
                                dataBind: {
                                    html: 'highlight'
                                }
                            }),
                            '<!-- /ko -->'
                        ])
                    ])
                )
            ]
        );
    }

    function buildMatchViewDetailTable() {
        return table(
            {
                class: styles.classes.detailTable
            },
            [
                tbody(
                    {
                        dataBind: {
                            foreach: 'detail'
                        }
                    },
                    tr([
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
                            '<!-- /ko -->'
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
                    ])
                )
            ]
        );
    }

    function buildViewRow() {
        return div(
            {
                class: [styles.classes.body]
            },
            [
                div(
                    {
                        class: styles.classes.objectItemRow
                    },
                    [
                        div(
                            {
                                style: {
                                    flex: '1 1 0px',
                                    display: 'flex',
                                    flexDirection: 'row'
                                }
                            },
                            [
                                div({
                                    class: styles.classes.rowCell,
                                    style: {
                                        flex: '0 0 2em'
                                    }
                                }),
                                div(
                                    {
                                        style: {
                                            flex: '2',
                                            marginRight: '4px'
                                        }
                                    },
                                    [
                                        '<!-- ko if: $component.view() === "matches" || $component.view() === "detail" -->',
                                        div(
                                            {
                                                class: styles.classes.sectionTitle
                                            },
                                            'Matches'
                                        ),

                                        '<!-- ko if: matches.length > 0 -->',
                                        buildMatchHighlightsTable(),
                                        '<!-- /ko -->',
                                        '<!-- ko if: matches.length === 0 -->',
                                        p(
                                            {
                                                style: {
                                                    marginTop: '10px',
                                                    fontStyle: 'italic'
                                                }
                                            },
                                            [
                                                'No matches reported ... ',
                                                span({ class: 'fa fa-bug fa-rotate-90' }),
                                                ' ... it is a mystery!'
                                            ]
                                        ),
                                        '<!-- /ko -->',

                                        '<!-- /ko -->'
                                    ]
                                ),
                                div(
                                    {
                                        style: {
                                            flex: '3',
                                            marginLeft: '4px'
                                        }
                                    },
                                    [
                                        '<!-- ko if: $component.view() === "detail" -->',
                                        div(
                                            {
                                                class: styles.classes.sectionTitle
                                            },
                                            'Detail'
                                        ),
                                        buildMatchViewDetailTable(),
                                        '<!-- /ko -->'
                                    ]
                                ),
                                div({
                                    class: styles.classes.rowCell,
                                    style: {
                                        flex: '0 0 4em'
                                    }
                                })
                            ]
                        )
                    ]
                )
            ]
        );
    }

    function buildRow() {
        return div(
            {
                class: styles.classes.resultsRow,
                dataBind: {
                    event: {
                        mouseenter: '$component.doMouseOverRow',
                        mouseleave: '$component.doMouseOutRow'
                    },
                    class: 'active() ? "' + styles.scopes.active + '" : null'
                }
            },
            [
                buildObjectView(),
                '<!-- ko if: $component.view() === "matches" || $component.view() === "detail" -->',
                buildViewRow(),
                '<!-- /ko -->'
            ]
        );
    }

    function buildResults() {
        return div(
            {
                dataBind: {
                    foreach: 'searchState.buffer'
                },
                name: 'result-rows'
            },
            [buildRow()]
        );
    }

    function buildNoSearch() {
        return div(
            {
                class: 'alert alert-info',
                dataKBTesthookAlert: 'no-search',
                style: {
                    margin: '40px auto 0 auto',
                    maxWidth: '40em',
                    padding: '20px'
                }
            },
            [
                p('Enter one or more terms above to search Reference Data in KBase.'),
                hr({
                    style: {
                        width: '50%'
                    }
                }),
                p('Reference Data is provided by the following sources:'),
                ul([li('RefSeq - NCBI Reference Sequence Database')]),
                hr({
                    style: {
                        width: '50%'
                    }
                }),
                p([
                    'Multiple search terms are treated as “AND” statements. ',
                    'The search will find objects or text that include all of the terms you submit. ',
                    'Terms are matched against whole words; no partial matches will be listed. ',
                    'Other search operators and wildcards are not currently supported.'
                ])
            ]
        );
    }

    function buildNotFound() {
        return div(
            {
                class: 'alert alert-warning',
                dataKBTesthookAlert: 'not-found',
                style: {
                    margin: '40px auto 0 auto',
                    maxWidth: '40em',
                    textAlign: 'center',
                    padding: '20px'
                }
            },
            [
                p('Sorry, no Reference Data found.'),
                '<!-- ko if: narrativesTotal -->',
                p([
                    'However, there ',
                    gen.plural('narrativesTotal()', 'is ', 'are '),
                    span(
                        {
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        [
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
                            gen.plural('narrativesTotal()', '.', 's.')
                        ]
                    )
                ]),
                '<!-- /ko -->'
            ]
        );
    }

    function buildError() {
        return div(
            {
                class: 'alert alert-danger',
                dataKBTesthookAlert: 'error',
                style: {
                    margin: '40px auto 0 auto',
                    maxWidth: '40em',
                    textAlign: 'center',
                    padding: '20px'
                }
            },
            [
                p('Sorry, an error occurred with this search.'),
                p({
                    dataBind: {
                        text: 'searchState.errorMessage'
                    }
                }),
                p([
                    button(
                        {
                            class: 'btn btn-default',
                            dataBind: {
                                click: '$component.doShowError'
                            }
                        },
                        'Show Error'
                    )
                ])
            ]
        );
    }

    function buildSearching() {
        return div(
            {
                class: 'well',
                style: {
                    margin: '40px auto 0 auto',
                    maxWidth: '40em',
                    textAlign: 'center'
                }
            },
            [
                div({
                    dataBind: {
                        component: FunnyRandomPromptComponent.quotedName(),
                        params: {}
                    }
                })
            ]
        );
    }

    function template() {
        return div(
            {
                class: styles.classes.component,
                dataKBTesthookComponent: 'results'
            },
            [
                div(
                    {
                        style: {
                            flex: '1 1 0px'
                        },
                        name: 'result-rows-container'
                    },
                    [
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
                    ]
                )
            ]
        );
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
