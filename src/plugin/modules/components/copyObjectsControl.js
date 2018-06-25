define([
    'knockout-plus',
    'kb_common/html',
    './dialogs/copyObjects'
], function (
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

        var buttonTitle = ko.pureComputed(function () {
            if (params.selectedObjects().length > 0) {
                return 'Click me to open a window allowing you to copy the objects you have selected';
            } else {
                return 'When you have selected objects (via the checkbox to the left of them), clicking me will allow you to copy them';
            }
        });

        return {
            doCopyObjects: doCopyObjects,
            selectedObjects: params.selectedObjects,
            buttonTitle: buttonTitle
        };
    }

    function buildCopyButton() {
        return button({
            class: 'btn',
            dataBind: {
                click: 'doCopyObjects',
                enable: 'selectedObjects().length > 0',
                class: 'selectedObjects().length === 0 ? "btn-default" : "btn-primary"',
                attr: {
                    title: 'buttonTitle'
                }
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