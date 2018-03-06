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
        input = t('input'),
        table = t('table'),
        tr = t('tr'),
        td = t('td');

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;

        var narrativeToDuplicate = params.narrative;

        var oldNarrativeName = ko.observable();

        var newNarrativeName = ko.observable();

        var newNarrative = ko.observable();

        var status = ko.observable('none');

        var error = ko.observable();

        var data = Data.make({
            runtime: runtime
        });

        function doClose() {
            params.onClose();
        }

        function doDuplicate() {
            status('inprogress');
            data.copyNarrative({
                workspaceId: narrativeToDuplicate.workspaceId,
                objectId: narrativeToDuplicate.objectId,
                name: newNarrativeName()
            })
                .then(function (newNarrativeInfo) {
                    status('success');
                    newNarrative(newNarrativeInfo);
                })
                .catch(function (err) {
                    status('error');
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

        data.getNarrative(params.narrative)
            .then(function (info) {
                oldNarrativeName(info.workspaceInfo.metadata.narrative_nice_name);
                newNarrativeName(info.workspaceInfo.metadata.narrative_nice_name + ' - Copy');
            });

        return {
            title: 'Duplicate Narrative',
            oldNarrativeName: oldNarrativeName,
            newNarrativeName: newNarrativeName,
            canDuplicate: canDuplicate,
            newNarrative: newNarrative,
            status: status,
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

    function buildStatusDisplay() {
        return div({
            class: 'well',
            style: {
                marginTop: '12px'
            },
            dataBind: {
                visible: 'status() && status() !== "none"'
            }
        }, [
            '<!-- ko switch: status -->',

            '<!-- ko case: "inprogress" -->',
            html.loading('Duplicating...'),
            '<!-- /ko -->',

            '<!-- ko case: "success" -->',
            'Successfully duplicated Narrative',
            '<!-- /ko -->',

            '<!-- ko case: "error" -->',
            buildError(),
            '<!-- /ko -->',

            '<!-- /ko -->'
        ]);
    }

    function buildBody() {
        return div({}, [
            p([
                'Duplicating a Narrative will make a completed copy of the Narrative; you will be the owner of the copy.'
            ]),
            p([
                'This new Narrative will contain all of the data objects, apps, markdown, ',
                ' and code cells from the original. The state of any apps, including run logs and errors ',
                'will be lost, but all generated data and reports will be retained.'
            ]),
            div({
                class: 'form-inline'
            }, [
                table([
                    tr({
                        style: {
                            borderBottom: '6px solid transparent'
                        }
                    }, [
                        td('Original Narrative Name'),
                        td(input({
                            class: 'form-control',
                            style: {
                                marginLeft: '4px',
                                width: '30em',
                                maxWidth: '30em',
                            },
                            readonly: true,
                            dataBind: {
                                value: 'oldNarrativeName'
                            }
                        }))
                    ]),
                    tr([
                        td('New Narrative Name'),
                        td(input({
                            class: 'form-control',
                            style: {
                                marginLeft: '4px',
                                width: '30em',
                                maxWidth: '30em',
                            },
                            dataBind: {
                                textInput: 'newNarrativeName'
                            }
                        }))
                    ])
                ]),                
                '<!-- ko if: newNarrativeName -->',
                p({
                    style: {
                        marginTop: '6px'
                    }
                }, [
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
                buildStatusDisplay(),
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
                        ' has been successfully created.'
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
                '<!-- /ko -->'                
            ])
        ]);
    }

    function template() {
        return ui.buildDialog({
            title: span({dataBind: {text: 'title'}}), 
            icon: 'copy',
            body: buildBody(),
            buttons: [
                {
                    type: 'default',
                    label: 'Close',
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