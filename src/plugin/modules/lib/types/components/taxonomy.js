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
        div = t('div');

    function viewModel(params) {
        return {
            value: params.value
        };
    }

    function template() {
        return div({
            dataBind: {
                foreach: 'value'
            }
        }, [
            span({
                dataBind: {
                    text: '$data'
                }
            }),
            '<!-- ko if: $index() !== $parent.value.length - 1 -->',
            ' > ',
            '<!-- /ko -->'            
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