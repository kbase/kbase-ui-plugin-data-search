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
                backgroundColor: 'silver',
                border: '1px gray solid',
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