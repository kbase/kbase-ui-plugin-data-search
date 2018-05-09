define([
    'knockout-plus',
    'kb_common/html',
    './summary',
    '../controls/accessControl',
    '../controls/dataSource'
], function (
    ko,
    html,
    SummaryComponent,
    AccessControlComponent,
    DataSourceComponent
) {
    'use strict';

    var t = html.tag,
        button = t('button'),
        span = t('span'),
        div = t('div');

    var styles = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        },
        toolbar: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '10px',
                alignItems: 'center'
            }
        },
        cell: {
            css: {
                padding: '4px'
            }
        }
    });

    function viewModel(params) {
        function doFirstPage() {
            params.page(1);
        }
        function doPrevPage() {
            if (params.page() > 1) {
                params.page(params.page() - 1);
            }
        }
        function doNextPage() {
            if (params.page() < params.totalPages()) {
                params.page(params.page() + 1);
            }

        }
        function doLastPage() {
            params.page(params.totalPages());
        }
        return {
            page: params.page,
            totalPages: params.totalPages,

            doFirstPage: doFirstPage,
            doPrevPage: doPrevPage,
            doNextPage: doNextPage,
            doLastPage: doLastPage,

            // for summary

            typeCounts: params.typeCounts,
            resultCount: params.resultCount,
            searchStatus: params.searchStatus,
            searchSpaceCount: params.searchSpaceCount,

            // for workspace type
            withUserData: params.withUserData,
            withReferenceData: params.withReferenceData,

            // for access control
            withPrivateData: params.withPrivateData,
            withPublicData: params.withPublicData
        };
    }

    function buildNavButtons() {
        return div({
            class: 'btn-group',
            role: 'group'
        }, [
            button({
                type: 'button',
                class: 'btn btn-default',
                title: 'Show the first page of results',
                dataBind: {
                    click: 'doFirstPage',
                    enable: 'page() > 1'
                }
            }, span({
                class: 'fa fa-step-backward'
            })),
            button({
                type: 'button',
                class: 'btn btn-default',
                title: 'Show the previous page of results',
                dataBind: {
                    click: 'doPrevPage',
                    enable: 'page() > 1'
                }
            }, span({
                class: 'fa fa-chevron-left'
            })),
            button({
                type: 'button',
                class: 'btn btn-default',
                title: 'Show the next page of results',
                dataBind: {
                    click: 'doNextPage',
                    enable: 'page() < totalPages()'
                }
            }, span({
                class: 'fa fa-chevron-right'
            })),
            button({
                type: 'button',
                class: 'btn btn-default',
                title: 'Show the last page of results',
                dataBind: {
                    click: 'doLastPage',
                    enable: 'page() < totalPages()'
                }
            }, span({
                class: 'fa fa-step-forward'
            }))
        ]);
    }

    function buildNavbar() {
        return div({
            class: styles.classes.toolbar
        }, [
            div({
                class: styles.classes.cell,
                style: {
                    flex: '0 0 auto'
                }
            }, buildNavButtons()),            
            div({
                class: styles.classes.cell,
                style: {
                    flex: '0 0 auto'
                }
            }, [
                // Note if no pages, display nothing

                '<!-- ko if: totalPages() === 0 -->',
                'no pages',
                '<!-- /ko -->',

                '<!-- ko if: totalPages() > 0 -->',
                div({
                    style: {
                        display: 'inline-block',
                        marginLeft: '6px'
                    }
                }, [
                    ' Page ',
                    span({
                        dataBind: {
                            text: 'page'
                        }
                    }), 
                    ' of ',
                    span({
                        dataBind: {
                            text: 'totalPages'
                        }
                    })
                ]),
                '<!-- /ko -->'
            ])
        ]);
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            div({
                style: {
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }
            }, buildNavbar()),
            div({
                style: {
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }
            }, div({
                dataBind: {
                    component: {
                        name: SummaryComponent.quotedName(),
                        params: {
                            typeCounts: 'typeCounts',
                            resultCount: 'resultCount',
                            searchStatus: 'searchStatus',
                            searchSpaceCount: 'searchSpaceCount'
                        }
                    }
                }
            })),
            div({
                style: {
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }
            }, div({
                dataBind: {
                    component: {
                        name: DataSourceComponent.quotedName(),
                        params: {
                            withUserData: 'withUserData',
                            withReferenceData: 'withReferenceData',
                        }
                    }
                }
            })),
            div({
                style: {
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }
            }, div({
                dataBind: {
                    component: {
                        name: AccessControlComponent.quotedName(),
                        params: {
                            withPrivateData: 'withPrivateData',
                            withPublicData: 'withPublicData',
                        }
                    }
                }
            }))
            
        ]);
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return ko.kb.registerComponent(component);
});