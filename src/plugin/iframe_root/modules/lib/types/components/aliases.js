define(['kb_knockout/registry', 'kb_knockout/lib/viewModelBase', 'kb_lib/html', '../../ui'], function (
    reg,
    ViewModelBase,
    html,
    ui
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        table = t('table'),
        thead = t('thead'),
        tbody = t('tbody'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            this.value = params.value;
        }
    }

    // function viewModel(params) {
    //     return {
    //         value: params.value
    //     };
    // }

    function buildAliasesTable() {
        return table(
            {
                class: 'table table-kb-compact table-kb-plain'
            },
            [
                thead(tr([th('type'), th('id')])),
                tbody(
                    {
                        dataBind: {
                            foreach: 'value'
                        }
                    },
                    [
                        tr([
                            td([
                                '<!-- ko ifnot: type -->',
                                ui.buildNA(),
                                span({
                                    dataBind: {
                                        text: 'type'
                                    }
                                }),
                                '<!-- /ko -->',
                                '<!-- ko if: type -->',
                                span({
                                    dataBind: {
                                        text: 'type'
                                    }
                                }),
                                '<!-- /ko -->'
                            ]),
                            td({
                                dataBind: {
                                    text: 'alias'
                                }
                            })
                        ])
                    ]
                )
            ]
        );
    }

    function template() {
        return div([
            '<!-- ko if: value && value.length > 0 -->',
            buildAliasesTable(),
            '<!-- /ko -->',
            '<!-- ko if: !value ||  value.length === 0 -->',
            ui.buildNA(),
            '<!-- /ko -->'
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});
