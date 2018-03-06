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

    function template() {
        return table({
            class: 'table table-kb-compact table-kb-plain'
        }, [
            thead(
                tr([
                    th('type'),
                    th('id')
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
                            text: 'type'
                        }
                    }),
                    td({
                        dataBind: {
                            text: 'alias'
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