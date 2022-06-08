define(['knockout', 'kb_knockout/registry', 'kb_knockout/components/error', 'kb_lib/html', '../../lib/ui'], function (
    ko,
    reg,
    ErrorComponent,
    html,
    ui
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span');

    function viewModel(params) {
        // xss safe (false positive)
        const error = ko.unwrap(params.error);

        const source = error.source;
        const code = error.code;
        const message = error.message;
        const detail = error.detail;
        const info = error.info;
        const stackTrace = error.stackTrace;

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
