define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
    html
) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        span = t('span');

    function viewModel(params) {
        return {
            typeCounts: params.typeCounts,
            resultCount: params.resultCount,
            searchStatus: params.searchStatus
        };
    }

    function buildSearchSummary() {
        return div({
            style: {
                display: 'inline-block'
            }
        }, [
            '<!-- ko switch: searchStatus() -->',

            '<!-- ko case: "none" -->',
            '',
            '<!-- /ko -->',

            '<!-- ko case: "notfound" -->',
            '',
            '<!-- /ko -->',

            '<!-- ko case: "success" -->',
            // 'In ',
            // span({
            //     dataBind: {
            //         text: 'resultCount'
            //     }
            // }),
            // ' Narratives, ',
            'Found ',

            '<!-- ko foreach: typeCounts -->',
            span({
                dataBind: {
                    typedText: {
                        value: 'count',
                        type: '"number"',
                        format: '"0,0"'
                    }
                }
            }), ' ',
            span({
                dataBind: {
                    labelText: {
                        label: 'id',
                        quantity: 'count',
                        labels: '$root.labels'
                    }
                }
            }),

            '<!-- ko if: $index() !== $parent.typeCounts().length - 1 -->',
            ', ',
            '<!-- /ko -->',
            '<!-- /ko -->',

            '<!-- /ko -->',
            '<!-- /ko -->'
        ]);
    }

    function template() {
        return div({}, [
            div({
                style: {
                    flex: '1',
                    display: 'flex',
                    alignItems: 'center'
                }
            }, buildSearchSummary())
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