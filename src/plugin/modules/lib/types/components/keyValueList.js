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
        table = t('table'),
        thead = t('thead'),
        tbody = t('tbody'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    function viewModel(params) {
        var fieldParams = params.params || {};
        return {
            value: params.value,
            col1Header: fieldParams.col1 || 'key',
            col2Header: fieldParams.col2 || 'value'
        };
    }

    function buildTable() {
        return table({
            class: 'table table-kb-compact table-kb-plain'
        }, [
            thead(
                tr([
                    th({
                        dataBind: {
                            text: 'col1Header'
                        }
                    }),
                    th({
                        dataBind: {
                            text: 'col2Header'
                        }
                    })
                ])
            ),
            tbody({
                dataBind: {
                    foreach: 'value'
                }
            }, [
                tr([
                    td({
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

    function template() {
        return div([
            '<!-- ko if: value && value.length > 0 -->',
            buildTable(),
            '<!-- /ko -->',
            '<!-- ko if: !value ||  value.length === 0 -->',
            'n/a',
            '<!-- /ko -->',
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