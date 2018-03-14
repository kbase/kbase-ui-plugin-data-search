define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
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

    function viewModel(params) {
        return {
            value: params.value
        };
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
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});