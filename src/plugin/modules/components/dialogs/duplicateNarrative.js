// a wrapper for the help component, loads the search help.
define([
    'knockout-plus',
    'kb_common/html',
    'kb_common/bootstrapUtils',
    '../../lib/ui',
    '../../lib/data'
], function (
    ko,
    html,
    BS,
    ui,
    Data
) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        p = t('p'),
        span = t('span'),
        button = t('button'),
        label = t('label'),
        input = t('input');

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;

        var narrativeToDuplicate = params.narrative;

        var newNarrativeName = ko.observable();

        var newNarrative = ko.observable();

        var error = ko.observable();

        var data = Data.make({
            runtime: runtime
        });

        function doClose() {
            params.onClose();
        }

        function doDuplicate() {
            data.copyNarrative({
                workspaceId: narrativeToDuplicate.workspaceId,
                objectId: narrativeToDuplicate.objectId,
                name: newNarrativeName()
            })
                .then(function (newNarrativeInfo) {
                    newNarrative(newNarrativeInfo);
                })
                .catch(function (err) {
                    error(err.message);
                });
        }

        var canDuplicate = ko.pureComputed(function () {
            if (newNarrativeName()) {
                if (newNarrativeName().length > 0) {
                    return true;
                }
            }
            return false;
        });

        function doOpenNarrative(data) {
            var narrativeId = 'ws.' + data.workspaceInfo.id + '.obj.' + data.objectInfo.id;
            window.open(window.location.origin + '/narrative/' + narrativeId);
        }

        return {
            title: 'Duplicate Narrative',
            newNarrativeName: newNarrativeName,
            canDuplicate: canDuplicate,
            newNarrative: newNarrative,
            error: error,

            // Actions
            doClose: doClose,
            doDuplicate: doDuplicate,
            doOpenNarrative: doOpenNarrative
        };
    }

    function buildError() {
        return [
            '<!-- ko if: error -->',
            BS.buildPanel({
                type: 'danger',
                title: 'Error',
                body: div({
                    dataBind: {
                        text: 'error'
                    }
                })         
            }),
            '<!-- /ko -->'
        ];
    }

    function buildBody() {
        return div({}, [
            div({
                class: 'form-inline'
            }, [
                div({
                    class: 'form-group'
                }, [
                    label('New Narrative Name'),
                    input({
                        dataBind: {
                            textInput: 'newNarrativeName'
                        }
                    })
                ]),
                '<!-- ko if: newNarrativeName -->',
                p([
                    'You may now copy this narrative to a new narrative named ',
                    span({
                        style: {
                            fontWeight: 'bold'
                        },
                        dataBind: {
                            text: 'newNarrativeName'
                        }
                    })
                ]),
                '<!-- /ko -->',
                div({}, [
                    button({
                        type: 'button',
                        class: 'btn btn-primary',
                        dataBind: {
                            enable: 'canDuplicate() && !newNarrative()',
                            click: 'doDuplicate'
                        }
                    }, 'Duplicate')
                ]),
                '<!-- ko if: newNarrative -->',
                '<!-- ko with: newNarrative -->',
                div({}, [
                    p([
                        'Your new Narrative ',
                        span({
                            style: {
                                fontWeight: 'bold'
                            },
                            dataBind: {
                                text: 'workspaceInfo.metadata.narrative_nice_name'
                            }
                        }),
                        'has been successfully created.'
                    ]),
                    button({
                        type: 'button',
                        class: 'btn btn-default',
                        dataBind: {
                            click: '$component.doOpenNarrative'
                        }
                    }, 'Open It')
                ]),
                '<!-- /ko -->',
                '<!-- /ko -->',

                buildError()
                
            ])
        ]);
    }

    function template() {
        return ui.buildDialog({
            title: span({dataBind: {text: 'title'}}), 
            body: buildBody(),
            buttons: [
                // {
                //     label: 'Duplicate',
                //     onClick: 'doDuplicate'
                // },
                {
                    type: 'danger',
                    label: 'Cancel',
                    onClick: 'doClose'
                }
            ],
        });
    }

    function component() {
        return {
            viewModel: {
                createViewModel: viewModel
            },
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});