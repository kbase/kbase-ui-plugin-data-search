define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
    html
) {
    'use strict';
    
    var t = html.tag,
        span = t('span');

    function viewModel(params) {
        return {
            count: params.count
        };
    }

    function template() {
        return span({
            style: {
                margin: '2px',
                padding: '2px',
                backgroundColor: 'rgba(220,220,220,0.5)',
                border: '0.5px solid rgba(200,200,200,0.5)',
                borderRadius: '3px'
            },
            dataBind: {
                typedText: {
                    value: 'count',
                    type: '"number"',
                    format: '"0,0"'
                }, 
                style: {
                    'font-weight': 'count() ? "bold" : "normal"'
                },
                visible: 'typeof count() === "number"'
            },
            dataKBTesthookComponent: 'tab-total-count'
        });
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});