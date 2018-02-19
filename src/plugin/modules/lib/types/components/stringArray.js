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

    var styles = html.makeStyles({
        table: {
            css: {
                // border: '0.5px solid rgba(220,220,220,0.5)',
                width: '100%',
                maxWidth: '60em'
            },
            // scopes: {
            //     active: {
            //         border: '0.5px solid rgba(220,220,220,1)'
            //     }
            // },
            inner: {
                caption: {
                    paddingBottom: '0'
                },
                td: {
                    padding: '2px',
                    verticalAlign: 'top',
                    borderBottom: '0.5px solid rgba(220,220,220,0.5)',
                    wordBreak: 'break-word'
                },
                'td:nth-last-child': {
                    borderBottom: 'none'
                }
            }
        }
    });

    function viewModel(params) {
        return {
            items: params.value
        };
    }

    function template() {
        return div({}, [
            styles.sheet,
            table({
                class: styles.classes.table,
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