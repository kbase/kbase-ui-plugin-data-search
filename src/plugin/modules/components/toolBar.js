define([
    'knockout-plus',
    'kb_common/html'
], function(
    ko,
    html
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
        console.log('results view', resultsView);
        return { 
            resultsView: resultsView
        };
    }

    var styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'row'
        },
        // component: {
        //     flex: '1 1 0px',
        //     display: 'flex',
        //     flexDirection: 'column'
        // },
        searchArea: {
            flex: '0 0 50px',
        },
        activeFilterInput: {
            // fontFamily: 'monospace',
            backgroundColor: 'rgba(209, 226, 255, 1)',
            color: '#000'
        },
        modifiedFilterInput: {
            // fontFamily: 'monospace',
            backgroundColor: 'rgba(255, 245, 158, 1)',
            color: '#000'
        },
        radioControl: {
            borderColor: 'transparent',
            boxShadow: 'none',
            margin: '0',
            padding: '3px 6px'
        },
        radioLabel: {
            fontWeight: 'normal',
            marginRight: '3px',
            marginLeft: '3px'
        }
    });

    function buildCopyButton() {
        return button({
            class: 'btn btn-default'
        }, 'Copy Selected...');
    }

    function buildViewSelector() {
        return div({
            style: {
                display: 'inline-block',
                textAlign: 'center',
                // margin: '6px auto'
            },
            class: 'form-inline'
        }, [
            // 'Search in ',
            label('View '),
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
            class: styles.classes.component
        }, [
            styles.sheet,
            div({
                style: {
                    flex: '1 1 0px'
                }
            }, buildCopyButton()),
            div({
                style: {
                    flex: '1 1 0px',
                    textAlign: 'right'
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