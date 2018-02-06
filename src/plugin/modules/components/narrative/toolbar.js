define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
    html
) {
    'use strict';

    var t = html.tag,
        div = t('div'),
        span = t('span'),
        input = t('input'),
        label = t('label');

    var styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        },
        searchArea: {
            flex: '0 0 50px',
            // border: '1px red solid'
        },
        filterArea: {
            flex: '0 0 50px',
            textAlign: 'left'
            // border: '1px blue dashed'
        },
        resultArea: {
            flex: '1 1 0px',
            // border: '1px green dotted',
            display: 'flex',
            flexDirection: 'column'
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
        checkboxControl: {
            borderColor: 'transparent',
            boxShadow: 'none',
            margin: '0 2px'
        }
    });

    function viewModel(params) {
        var withPrivateData = ko.observable();
        var withSharedData = ko.observable();
        var withPublicData = ko.observable();

        withPrivateData.syncWith(params.includePrivateData);
        withSharedData.syncWith(params.includePrivateData);
        withPublicData.syncWith(params.includePublicData);

        return {
            withPrivateData: withPrivateData,
            withSharedData: withSharedData,
            withPublicData: withPublicData,
            typeCounts: params.typeCounts,
            resultCount: params.resultCount
        };
    }

    function buildOwnershipFilter() {
        return div({
            class: 'form-inline',
            style: {
                // display: 'inline-block',
                // textAlign: 'center',
                // margin: '6px auto'
            }
        }, [
            // 'Search in ',
            // label('Ownership '),
            span({
                dataBind: {
                    css: 'withPrivateData() ? "' + styles.classes.activeFilterInput + '" : null'
                },
                class: ['form-control', styles.classes.checkboxControl]               
            }, label({
                
                style: {
                    fontWeight: 'normal',
                    marginRight: '4px',
                    marginLeft: '6px'
                }
            }, [
                input({
                    type: 'checkbox',
                    dataBind: {
                        checked: 'withPrivateData'
                    }
                }),
                ' My Data'
            ])),
            span({
                dataBind: {
                    css: 'withSharedData() ? "' + styles.classes.activeFilterInput + '" : null'
                },
                class: ['form-control', styles.classes.checkboxControl]    
            }, label({
                style: {
                    fontWeight: 'normal',
                    marginRight: '4px',
                    marginLeft: '6px'
                }
            }, [
                input({
                    type: 'checkbox',
                    dataBind: {
                        checked: 'withSharedData'
                    }
                }),
                ' Shared with Me'
            ])),
            span({
                dataBind: {
                    css: 'withPublicData() ? "' + styles.classes.activeFilterInput + '" : null'
                },
                class: ['form-control', styles.classes.checkboxControl]    
            }, label({
                style: {
                    fontWeight: 'normal',
                    marginRight: '4px',
                    marginLeft: '6px'
                }
            }, [
                input({
                    type: 'checkbox',
                    dataBind: {
                        checked: 'withPublicData'
                    }
                }),
                ' Public'
            ]))
        ]);
    }

    function template() {
        return div({
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
            }, div({
                style: {
                    display: 'inline-block'
                }
            }, [
                // TODO: better way to switch on having results...
                '<!-- ko ifnot: typeCounts -->',
                'No active search',
                '<!-- /ko -->',

                '<!-- ko if: typeCounts -->',
                'In ',
                span({
                    dataBind: {
                        text: 'resultCount'
                    }
                }),
                ' Narratives, ',
                'found ',

                '<!-- ko foreach: typeCounts -->',
                span({
                    dataBind: {
                        text: 'count'
                    }
                }), ' ', 
                span({
                    dataBind: {
                        labelText: {
                            label: 'id',
                            quantity: 'count',
                            labels: '$root.labels'
                        }
                    }
                }), 

                '<!-- ko if: $index() !== $parent.typeCounts().length - 1 -->',
                ', ',
                '<!-- /ko -->',
                '<!-- /ko -->',

                '<!-- /ko -->',
                
                
            ])),
            div({
                style: {
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }
            }, [
                buildOwnershipFilter()
            ])
        ]);
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});