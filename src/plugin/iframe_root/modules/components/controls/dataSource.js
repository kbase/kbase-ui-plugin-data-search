define(['kb_knockout/registry', 'kb_lib/html'], function (reg, html) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        input = t('input'),
        label = t('label');

    const styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        },
        searchArea: {
            flex: '0 0 50px'
            // border: '1px red solid'
        },
        filterArea: {
            flex: '0 0 50px',
            textAlign: 'left'
            // border: '1px blue dashed'
        },
        resultArea: {
            flex: '1 1 0px',
            // border: '1px green dotted',
            display: 'flex',
            flexDirection: 'column'
        },
        activeFilterInput: {
            // fontFamily: 'monospace',
            backgroundColor: 'rgba(209, 226, 255, 1)',
            color: '#000'
        },
        modifiedFilterInput: {
            // fontFamily: 'monospace',
            backgroundColor: 'rgba(255, 245, 158, 1)',
            color: '#000'
        },
        checkboxControl: {
            borderColor: 'transparent',
            boxShadow: 'none',
            margin: '0 2px'
        },
        checkboxLabel: {
            fontWeight: 'normal',
            marginRight: '4px',
            marginLeft: '6px'
        },
        fieldGroupLabel: {
            fontWeight: 'bold',
            color: 'gray',
            marginTop: '8px',
            marginRight: '4px'
            // fontSize: '80%'
        }
    });

    function viewModel(params) {
        return {
            withUserData: params.withUserData,
            withReferenceData: params.withReferenceData
        };
    }

    function buildControl() {
        return div(
            {
                class: 'form-inline'
            },
            [
                span(
                    {
                        class: styles.classes.fieldGroupLabel
                    },
                    'Data source:'
                ),
                span(
                    {
                        class: ['form-control', styles.classes.checkboxControl],
                        title: 'Search over data created by users in Narratives',
                        dataBind: {
                            css: 'withUserData() ? "' + styles.classes.activeFilterInput + '" : null'
                        }
                    },
                    label(
                        {
                            class: styles.classes.checkboxLabel
                        },
                        [
                            input({
                                type: 'checkbox',
                                dataBind: {
                                    checked: 'withUserData'
                                }
                            }),
                            ' User'
                        ]
                    )
                ),
                span(
                    {
                        class: ['form-control', styles.classes.checkboxControl],
                        title: 'Search over reference data',
                        dataBind: {
                            css: 'withReferenceData() ? "' + styles.classes.activeFilterInput + '" : null'
                        }
                    },
                    label(
                        {
                            class: styles.classes.checkboxLabel
                        },
                        [
                            input({
                                type: 'checkbox',
                                dataBind: {
                                    checked: 'withReferenceData'
                                }
                            }),
                            ' Reference'
                        ]
                    )
                )
            ]
        );
    }

    function template() {
        return div(
            {
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'row'
                }
            },
            [
                div(
                    {
                        style: {
                            flex: '1',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }
                    },
                    buildControl()
                )
            ]
        );
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});
