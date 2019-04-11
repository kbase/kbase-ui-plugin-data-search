define(['kb_knockout/registry', 'kb_lib/html'], function (reg, html) {
    'use strict';

    var t = html.tag,
        div = t('div');

    var styles = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll'
            },
            pseudo: {
                ':-webkit-scrollbar-track': {
                    backgroundColor: 'white'
                }
            }
        },
        header: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '10px',
                borderBottom: '1px solid silver'
            }
        },
        headerCell: {
            css: {
                padding: '4px'
            }
        }
    });

    function viewModel() {
        return {};
    }

    function buildHeader() {
        return div(
            {
                class: styles.classes.header
            },
            [
                div({
                    class: styles.classes.headerCell,
                    style: {
                        flex: '0 0 2em'
                    }
                }),
                div(
                    {
                        class: styles.classes.headerCell,
                        style: {
                            flex: '1'
                        }
                    },
                    'Type'
                ),
                div({
                    class: styles.classes.headerCell,
                    style: {
                        flex: '0 0 2em'
                    }
                }),
                div(
                    {
                        class: styles.classes.headerCell,
                        style: {
                            flex: '4'
                        }
                    },
                    ['Name']
                ),

                div(
                    {
                        class: styles.classes.headerCell,
                        style: {
                            flex: '1.5'
                        }
                    },
                    ['Modified']
                ),
                div({
                    class: styles.classes.headerCell,
                    style: {
                        flex: '0 0 4em'
                    }
                })
            ]
        );
    }

    function template() {
        return div(
            {
                class: styles.classes.component
            },
            [buildHeader()]
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
