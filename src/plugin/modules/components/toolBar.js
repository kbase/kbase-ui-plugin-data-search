define([
    'knockout-plus',
    'kb_common/html',
    './dialogs/copyObjects',
    './viewSelector'
], function(
    ko,
    html,
    CopyObjectComponent,
    ViewSelectorComponent
) {
    'use strict';

    var t = html.tag,
        button = t('button'),
        div = t('div');

    function viewModel(params) {
        var resultsView = params.resultsView;

        function doCopyObjects() {
            params.overlayComponent({
                name: CopyObjectComponent.name(),
                viewModel: {
                    objectsToCopy: params.selectedObjects
                }
            });
        }

        return { 
            resultsView: resultsView,
            doCopyObjects: doCopyObjects,
            selectedObjects: params.selectedObjects
        };
    }

    var styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'row'
        },
        searchArea: {
            flex: '0 0 50px',
        },
        activeFilterInput: {
            backgroundColor: 'rgba(209, 226, 255, 1)',
            color: '#000'
        },
        modifiedFilterInput: {
            backgroundColor: 'rgba(255, 245, 158, 1)',
            color: '#000'
        },
        radioControl: {
            borderColor: 'transparent',
            boxShadow: 'none',
            margin: '0'
        },
        radioLabel: {
            fontWeight: 'normal',
            marginRight: '4px',
            marginLeft: '6px'
        }
    });

    function buildCopyButton() {
        return button({
            class: 'btn btn-default',
            dataBind: {
                click: '$component.doCopyObjects',
                enable: 'selectedObjects().length > 0'
            }
        }, 'Copy Selected...');
    }

   

    function buildToolbar() {
        return div({
            // class: styles.classes.component
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        }, [
            styles.sheet,
            div({
                style: {
                    flex: '1',
                    display: 'flex',
                    alignItems: 'center'
                }
            }, buildCopyButton()),
            div({
                style: {
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }
            }, ko.kb.komponent({
                name: ViewSelectorComponent.name(),
                params: {
                    resultsView: 'resultsView'
                }
            }))
        ]);
    }

    function template() {
        return buildToolbar();
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});