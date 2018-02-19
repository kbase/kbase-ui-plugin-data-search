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
                text: 'count',
                visible: 'typeof count() === "number"'
            }
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