define([
    'knockout-plus',
    'kb_common/html',
    './dialogs/copyObjects'
], function(
    ko,
    html,
    CopyObjectsComponent
) {
    'use strict';

    var t = html.tag,
        span = t('span'),
        label = t('label'),
        button = t('button'),
        input = t('input'),
        div = t('div');

    function viewModel(params) {
        var resultsView = params.resultsView;
        console.log('results view', params);

        function doCopyObjects(data) {
            params.overlayComponent({
                name: CopyObjectsComponent.name(),
                viewModel: {
                    selectedObjects: params.selectedObjects
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

    function buildViewSelector() {
        return div({
            class: 'form-inline'
        }, [
            // 'Search in ',
            'View ',
            span({
                dataBind: {
                    css: 'resultsView() === "list" ? "' + styles.classes.activeFilterInput + '" : null'
                },
                class: ['form-control', styles.classes.radioControl]               
            }, label({
                class: styles.classes.radioLabel
            }, [
                input({
                    type: 'radio',
                    name: 'results-view',
                    value: 'list',
                    dataBind: {
                        checked: 'resultsView'
                    }
                }),
                ' List'
            ])),
            span({
                dataBind: {
                    css: 'resultsView() === "matches" ? "' + styles.classes.activeFilterInput + '" : null'
                },
                class: ['form-control', styles.classes.radioControl]    
            }, label({
                class: styles.classes.radioLabel
            }, [
                input({
                    type: 'radio',
                    name: 'results-view',
                    value: 'matches',
                    dataBind: {
                        checked: 'resultsView'
                    }
                }),
                ' Matches'
            ])),
            span({
                dataBind: {
                    css: 'resultsView() === "detail" ? "' + styles.classes.activeFilterInput + '" : null'
                },
                class: ['form-control', styles.classes.radioControl]    
            }, label({
                class: styles.classes.radioLabel
            }, [
                input({
                    type: 'radio',
                    name: 'results-view',
                    value: 'detail',
                    dataBind: {
                        checked: 'resultsView'
                    }
                }),
                ' Detail'
            ]))
        ]);
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
            }, buildViewSelector())
        ]);
    }

    // function buildFilterArea() {
    //     return div({
    //         class: 'form-inline',
    //         style: {
    //             display: 'inline-block'
    //         }
    //     }, [
    //         styles.sheet,
    //         span({
    //             class: [styles.classes.filterLabel]
    //         }, 'Filters: '),
            
            
    //         div({
    //             style: {
    //                 display: 'inline-block',
    //                 marginLeft: '12px'
    //             }
    //         }, [
    //             label('Job Status '),
               
    //             ko.kb.komponent({
    //                 name: JobStatusFilterComponent.name(),
    //                 params: {
    //                     jobStatusFilter: 'jobStatusFilter'
    //                 }
    //             })
    //         ]),
           
    //     ]);
    // }

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