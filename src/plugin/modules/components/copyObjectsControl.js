define([
    'knockout-plus',
    'kb_common/html',
    './dialogs/copyObjects'
], function(
    ko,
    html,
    CopyObjectComponent
) {
    'use strict';

    var t = html.tag,
        button = t('button'),
        span = t('span'),
        div = t('div');

    function viewModel(params) {
        function doCopyObjects() {
            params.overlayComponent({
                name: CopyObjectComponent.name(),
                viewModel: {
                    objectsToCopy: params.selectedObjects
                }
            });
        }

        return { 
            doCopyObjects: doCopyObjects,
            selectedObjects: params.selectedObjects
        };
    }

    function buildCopyButton() {
        return button({
            class: 'btn',
            dataBind: {
                click: '$component.doCopyObjects',
                enable: 'selectedObjects().length > 0',
                class: 'selectedObjects().length === 0 ? "btn-default" : "btn-primary"'
            }
        }, [
            span({
                class: 'fa fa-clone',
                style: {
                    marginRight: '6px'
                }
            }),
            'Copy Selected...'
        ]);
    }

    function template() {
        return div({
            style: {
                textAlign: 'center'
            }
        }, buildCopyButton());
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});