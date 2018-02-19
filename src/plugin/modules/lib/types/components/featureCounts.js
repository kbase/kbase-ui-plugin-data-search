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
        var featureCounts = [];
        if (params.value && typeof params.value === 'object') {
            Object.keys(params.value).forEach(function (key) {
                featureCounts.push({
                    key: key,
                    value: params.value[key]
                });
            });
        }
        return {
            featureCounts: featureCounts
        };
    }

    function template() {
        return table({
            class: 'table table-bordered',
        }, [
            tbody({
                dataBind: {
                    foreach: 'featureCounts'
                }
            }, [
                tr([
                    td({
                        style: {
                            width: '8em'
                        },
                        dataBind: {
                            text: 'key'
                        }
                    }),
                    td({
                        dataBind: {
                            text: 'value'
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