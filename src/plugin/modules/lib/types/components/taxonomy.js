define([
    'knockout-plus',
    'kb_common/html',
    '../../ui'
], function (
    ko,
    html,
    ui
) {
    'use strict';

    let t = html.tag,
        span = t('span'),
        div = t('div');

    function viewModel(params) {
        let isEmpty;
        if (!params.value) {
            isEmpty = true;
        } else if (params.value.length === 0) {
            isEmpty = true;
        } else {
            isEmpty = false;
        }
        return {
            value: params.value,
            isEmpty: isEmpty
        };
    }

    function buildLineage() {
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

    function template() {        
        return div([
            '<!-- ko if: isEmpty -->',
            ui.buildNA(),
            '<!-- /ko -->',
            '<!-- ko ifnot: isEmpty -->',
            buildLineage(),
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