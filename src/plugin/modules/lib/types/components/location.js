define([
    'kb_ko/KO',
    'kb_ko/lib/viewModelBase',
    'kb_common/html'
], function (
    KO,
    ViewModelBase,
    html
) {
    'use strict';

    var t = html.tag,
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

    function buildLocationTable() {
        return table({
            class: 'table table-kb-compact table-kb-plain'
        }, [
            thead(
                tr([
                    th({
                        style: {
                            width: '25%'
                        }
                    }, 'start'),
                    th({
                        style: {
                            width: '25%'
                        }
                    }, 'end'),
                    th({
                        style: {
                            width: '25%'
                        }
                    }, 'strand'),
                    th({
                        style: {
                            width: '25%'
                        }
                    }, 'length (bp)')
                ])
            ),
            tbody({
                dataBind: {
                    foreach: 'value'
                }
            }, tr([
                td({
                    dataBind: {
                        typedText: {
                            value: 'start',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }),
                td({
                    dataBind: {
                        typedText: {
                            value: 'end',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }),
                td({
                    dataBind: {
                        typedText: {
                            value: 'direction'
                        }
                    }
                }),
                td({
                    dataBind: {
                        typedText: {
                            value: 'length',
                            type: '"number"',
                            format: '"0,0"'
                        }
                    }
                }),
            ]))
        ]);
    }

    function template() {
        return buildLocationTable();
        
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return KO.registerComponent(component);
});