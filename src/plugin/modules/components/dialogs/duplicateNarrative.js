// a wrapper for the help component, loads the search help.
define([
    'knockout-plus',
    'kb_common/html',
    '../../lib/ui'
], function (
    ko,
    html,
    ui
) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        span = t('span');

    function viewModel(params) {
        function doClose() {
            params.onClose();
        }

        function doDuplicate() {
            alert('duplicating now...');
        }

        function doDuplicateAndOpen() {
            alert('duplicate, then open the narrative.');
        }

        return {
            title: 'Duplicate Narrative',
            doClose: doClose,
            doDuplicate: doDuplicate,
            doDuplicateAndOpen: doDuplicateAndOpen
            // onClose: params.onClose
        };
    }

    function buildHelpViewer() {
        return div({
        }, 'Duplicate this narrative ...');
    }

    function template() {
        return ui.buildDialog({
            title: span({dataBind: {text: 'title'}}), 
            body: buildHelpViewer(),
            buttons: [
                {
                    label: 'Duplicate',
                    onClick: 'doDuplicate'
                },
                {
                    label: 'Duplicate and Open',
                    onClick: 'doDuplicateAndOpen'
                },
                {
                    label: 'Cancel',
                    onClick: 'doClose'
                }
            ],
        });
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});