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

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            this.featureCounts = [];
            if (params.value && typeof params.value === 'object') {
                Object.keys(params.value).forEach((key) => {
                    this.featureCounts.push({
                        key: key,
                        value: params.value[key]
                    });
                });
            }
        }
    }

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
                    width: '50%',
                    padding: '2px',
                    verticalAlign: 'top',
                    borderBottom: '0.5px solid rgba(220,220,220,0.5)'
                },
                'td:nth-child(1)': {
                    // width: '15em'
                },
                'td:nth-child(2)': {
                    wordBreak: 'break-word'
                },
                'td:nth-last-child': {
                    borderBottom: 'none'
                }
            }
        }
    });

    function template() {
        return div([
            table({
                class: styles.classes.table,
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
                                typedText: {
                                    value: 'value',
                                    type: '"number"',
                                    format: '"0,0"'
                                }
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