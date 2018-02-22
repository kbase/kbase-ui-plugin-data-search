// a wrapper for the help component, loads the search help.
define([
    'knockout-plus',
    'kb_common/html',
    '../lib/ui',
    'yaml!../data/help.yml'
], function (
    ko,
    html,
    ui,
    helpDb
) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        span = t('span');

    var styles = html.makeStyles({
        markdown: {
            css: {

            },
            inner: {
                blockquote: {
                    fontSize: 'inherit',
                    marginLeft: '1em',
                    paddingLeft: '1em',
                    borderLeft: '3px silver solid'
                },
                p: {
                    maxWidth: '50em'
                },
                h1: {
                    marginTop: '0',
                    marginBottom: '0',
                    fontWeight: 'bold',
                    fontSize: '150%'
                },
                h2: {
                    marginTop: '1em',
                    marginBottom: '0',
                    fontWeight: 'bold',
                    fontSize: '133%'
                },
                h3: {
                    marginTop: '1em',
                    marginBottom: '0',
                    fontWeight: 'bold',
                    fontSize: '120%'
                },
                h4: {
                    marginTop: '1em',
                    marginBottom: '0',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    fontSize: '100%'
                },
                h5: {
                    marginTop: '1em',
                    marginBottom: '0',
                    fontWeight: 'bold',
                    fontSize: '100%'
                }
            }
        }
    });

    function viewModel(params) {
        function doClose() {
            params.onClose();
        }

        return {
            title: 'Search Help',
            buttons: [
                {
                    title: 'Close',
                    action: doClose
                }
            ],
            helpDb: helpDb,
            onClose: params.onClose
        };
    }

    function buildHelpViewer() {
        return div({
            class: styles.classes.markdown,
            dataBind: {
                component: {
                    name: '"generic/help"',
                    params: {
                        helpDb: 'helpDb',
                        onClose: 'onClose'
                    }
                }
            }
        });
    }

    function template() {
        return ui.buildDialog({
            title: span({dataBind: {text: 'title'}}), 
            icon: 'question-circle',
            body: buildHelpViewer()
        });
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