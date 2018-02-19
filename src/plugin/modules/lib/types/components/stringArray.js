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
        tbody = t('tbody'),
        tr = t('tr'),
        td = t('td');

    function viewModel(params) {
        return {
            items: params.value
        };
    }

    function template() {
        return table({
            class: 'table table-bordered',
        }, [
            tbody({
                dataBind: {
                    foreach: 'items'
                }
            }, [
                tr([                    
                    td({
                        dataBind: {
                            text: '$data'
                        }
                    })
                ])
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