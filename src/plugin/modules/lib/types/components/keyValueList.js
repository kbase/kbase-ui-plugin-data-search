define([
    'kb_ko/KO',
    'kb_ko/lib/viewModelBase',
    'kb_common/html',
    '../../ui'
], function (
    KO,
    ViewModelBase,
    html,
    ui
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

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            let fieldParams = params.params || {};

            this.value = params.value;
            this.col1Header = fieldParams.col1 || 'key';
            this.col2Header = fieldParams.col2 || 'value';
        }
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
            ui.buildNA(),
            '<!-- /ko -->',
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return KO.registerComponent(component);
});