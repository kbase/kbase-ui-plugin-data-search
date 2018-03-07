define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
    html
) {
    'use strict';

    var t = html.tag,
        span = t('span'),
        div = t('div'),
        table = t('table'),
        thead = t('thead'),
        tbody = t('tbody'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    function viewModel(params) {
        return {
            value: params.value
        };
    }

    function buildLocationList() {
        return div({
            dataBind: {
                foreach: 'value'
            }
        }, [
            div([
                span({
                    dataBind: {
                        typedText: {
                            value: 'start',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }), 
                // ' ',
                // '<!-- ko if: start < end -->',
                // '→',
                // '<!-- /ko -->',
                // '<!-- ko if: start > end -->',
                // '←',
                // '<!-- /ko -->',
                // '<!-- ko if: start === end -->',
                // '=',
                // '<!-- /ko -->',
                // ' ',
                ' to ',
                span({
                    dataBind: {
                        typedText: {
                            value: 'end',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }),
                ' (' + 
                span({
                    dataBind: {
                        text: 'direction'
                    }
                }), 
                '): ',
                span({
                    dataBind: {
                        typedText: {
                            value: 'length',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }), 
                'bp'
            ])
            // div([
            //     'd:', 
            //     span({
            //         dataBind: {
            //             text: 'direction'
            //         }
            //     }),
            //     ', ',
            //     's:', 
            //     span({
            //         dataBind: {
            //             text: 'start'
            //         }
            //     }),
            //     ', ',
            //     'e:', 
            //     span({
            //         dataBind: {
            //             text: 'end'
            //         }
            //     }),
            //     ', ',
            //     'l:', 
            //     span({
            //         dataBind: {
            //             text: 'length'
            //         }
            //     }),
            //     ', ',
            //     'g:', 
            //     span({
            //         dataBind: {
            //             text: 'genome'
            //         }
            //     }),
            // ])    
        ]);
    }

    function buildLocationTable() {
        return table({
            class: 'table table-kb-compact table-kb-plain'
        }, [
            thead(
                tr([
                    th({
                        style: {
                            width: '25%'
                        }
                    }, 'start'),
                    th({
                        style: {
                            width: '25%'
                        }
                    }, 'end'),
                    th({
                        style: {
                            width: '25%'
                        }
                    }, 'strand'),
                    th({
                        style: {
                            width: '25%'
                        }
                    }, 'length (bp)')
                ])
            ),
            tbody({
                dataBind: {
                    foreach: 'value'
                }
            }, tr([
                td({
                    dataBind: {
                        typedText: {
                            value: 'start',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }),
                td({
                    dataBind: {
                        typedText: {
                            value: 'end',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }),
                td({
                    dataBind: {
                        typedText: {
                            value: 'direction'
                        }
                    }
                }),
                td({
                    dataBind: {
                        typedText: {
                            value: 'length',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }),
            ]))
        ]);
    }

    function template() {
        return buildLocationTable();
        
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});