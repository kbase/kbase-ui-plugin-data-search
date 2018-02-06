define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
    html
) {
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

    function viewModel(params) {
        return {};
    }

    function buildHeader() {
        return div({
            class: styles.classes.header
        }, [
            div({
                class: styles.classes.headerCell,
                style: {
                    flex: '5'
                }
            }, 'Narrative'),            
            div({
                class: styles.classes.headerCell,
                style: {
                    flex: '1'
                }
            }, [
                'Owner'
            ]),
            div({
                class: styles.classes.headerCell,
                style: {
                    flex: '1.5'
                }
            }, [
                'Last saved'
            ]),
            div({
                class: styles.classes.headerCell,
                style: {
                    flex: '1'
                }
            }, '')
        ]);
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            styles.sheet,
            buildHeader()
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