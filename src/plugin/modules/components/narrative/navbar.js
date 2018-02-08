define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
    html
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
                flexDirection: 'column'
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
            doLastPage: doLastPage
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
                // Note: if no pages, then display nothing here.

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
            styles.sheet,
            buildNavbar()
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