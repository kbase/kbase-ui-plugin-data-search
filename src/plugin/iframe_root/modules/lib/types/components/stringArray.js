define([
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html'
],
function (
    reg,
    gen,
    ViewModelBase,
    html
) {
    'use strict';

    var t = html.tag,
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

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            this.items = params.value;
            this.isEmpty = typeof this.items === 'undefined' ||
                this.items === null ||
                !Array.isArray(this.items) ||
                this.items.length === 0;
        }
    }

    function template() {
        return div({}, [
            gen.if('isEmpty',
                div('-'),
                table(
                    {
                        class: styles.classes.table
                    },
                    [
                        tbody(
                            {
                                dataBind: {
                                    foreach: 'items'
                                }
                            },
                            [
                                tr([
                                    td({
                                        dataBind: {
                                            text: '$data'
                                        }
                                    })
                                ])
                            ]
                        )
                    ]
                ))
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});
