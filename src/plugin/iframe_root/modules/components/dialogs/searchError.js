define(['knockout', 'kb_knockout/registry', 'kb_knockout/components/error', 'kb_lib/html', '../../lib/ui'], function (
    ko,
    reg,
    ErrorComponent,
    html,
    ui
) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        span = t('span');

    function viewModel(params) {
        var error = ko.unwrap(params.error);

        var source = error.source;
        var code = error.code;
        var message = error.message;
        var detail = error.detail;
        var info = error.info;
        var stackTrace = error.stackTrace;

        function doClose() {
            params.onClose();
        }

        return {
            // The error wrapper dialog interface
            title: 'Search Error',
            buttons: [
                {
                    title: 'Close',
                    action: doClose
                }
            ],
            error: error,
            close: close,
            onClose: doClose,
            // The error component VM interface
            source: source,
            code: code,
            message: message,
            detail: detail,
            info: info,
            stackTrace: stackTrace
        };
    }

    function buildErrorViewer() {
        return div({
            dataBind: {
                component: {
                    name: ErrorComponent.quotedName(),
                    params: {
                        source: 'source',
                        code: 'code',
                        message: 'message',
                        detail: 'detail',
                        info: 'info',
                        stackTrace: 'stackTrace'
                    }
                }
            }
        });
    }

    function buildTitle() {
        return span({
            dataBind: {
                text: 'title'
            }
        });
    }

    function template() {
        return ui.buildDialog({
            type: 'error',
            title: buildTitle(),
            body: buildErrorViewer()
        });
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});
