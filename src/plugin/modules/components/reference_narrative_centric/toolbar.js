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
        span = t('span');

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
        return {
            typeCounts: params.typeCounts,
            resultCount: params.resultCount
        };
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
                // 'In ',
                // span({
                //     dataBind: {
                //         text: 'resultCount'
                //     }
                // }),
                // ' Objects, ',
                'Found ',

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
                
                
            ]))
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