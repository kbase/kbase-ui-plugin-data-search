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
        }
    }


    function template() {
        return div({}, [
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
            viewModel: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return KO.registerComponent(component);
});