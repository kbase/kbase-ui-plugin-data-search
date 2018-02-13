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

    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        }, [
            div({
                style: {
                    display: 'inline-block'
                }
            }, [
                '<!-- ko switch: searchStatus() -->',

                '<!-- ko case: "none" -->',
                '',
                '<!-- /ko -->',
    
                '<!-- ko case: "notfound" -->',
                'Nothing found',
                '<!-- /ko -->',
    
                '<!-- ko case: "success" -->',

                'Found ',

                '<!-- ko foreach: typeCounts -->',
                span({
                    dataBind: {
                        text: 'count'
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