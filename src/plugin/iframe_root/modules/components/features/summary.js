define(['knockout', 'kb_knockout/registry', 'kb_lib/html'], function (ko, reg, html) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        span = t('span');

    function viewModel(params) {
        var typeCounts = ko.pureComputed(function () {
            if (params.typeCounts()) {
                return params.typeCounts().sort(function (a, b) {
                    return b.count - a.count;
                });
            } else {
                return [];
            }
        });

        return {
            typeCounts: typeCounts,
            resultCount: params.resultCount,
            searchSpaceCount: params.searchSpaceCount,
            searchStatus: params.searchStatus
        };
    }

    function template() {
        return div(
            {
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'row'
                }
            },
            [
                div(
                    {
                        style: {
                            display: 'inline-block'
                        }
                    },
                    [
                        '<!-- ko switch: searchStatus() -->',

                        '<!-- ko case: "none" -->',
                        '',
                        '<!-- /ko -->',

                        '<!-- ko case: "notfound" -->',
                        '',
                        '<!-- /ko -->',

                        '<!-- ko case: "success" -->',

                        'Found ',
                        span({
                            dataBind: {
                                typedText: {
                                    value: 'searchSpaceCount',
                                    type: '"number"',
                                    format: '"0,0"'
                                }
                            }
                        }),
                        ' total',
                        '<!-- ko if: resultCount() < searchSpaceCount() -->',
                        ' (truncated to ',
                        span({
                            dataBind: {
                                typedText: {
                                    value: 'resultCount',
                                    type: '"number"',
                                    format: '"0,0"'
                                }
                            }
                        }),
                        ')',
                        '<!-- /ko -->',

                        '<!-- /ko -->',

                        '<!-- /ko -->'
                    ]
                )
            ]
        );
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});
