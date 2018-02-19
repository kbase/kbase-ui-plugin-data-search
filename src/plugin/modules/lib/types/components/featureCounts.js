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

    function viewModel(params) {
        var featureCounts = [];
        if (params.value && typeof params.value === 'object') {
            Object.keys(params.value).forEach(function (key) {
                featureCounts.push({
                    key: key,
                    value: params.value[key]
                });
            });
        }
        return {
            featureCounts: featureCounts
        };
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
            viewModel: viewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return ko.kb.registerComponent(component);
});