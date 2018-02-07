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

    });

    function viewModel(params) {
        return {};
    }

    function buildHeader() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '10px'
            }
        }, [
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, 'Narrative'),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }),
            div({
                style: {
                    flex: '3',
                    // border: '1px dashed silver'
                }
            }),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, [
                'Owner'
            ]),
            div({
                style: {
                    flex: '1.5',
                    // border: '1px dashed silver'
                }
            }, [
                'Last saved'
            ]),
            div({
                style: {
                    flex: '1',
                    // border: '1x silver dashed'
                }
            }, ''),
        ]);
    }

    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                overflowY: 'hidden',
                // border: '1px dotted orange',
                display: 'flex',
                flexDirection: 'row'
            }
        }, [
            styles.sheet,
            div({
                style: {
                    flex: '1 1 0px'
                }
            }, buildHeader()),
            div({
                style: {
                    flex: '0 0 25px',
                    display: 'flex',
                    flexDirection: 'column'
                }
            })
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