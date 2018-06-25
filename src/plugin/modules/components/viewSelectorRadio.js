define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
    html
) {
    'use strict';


    var t = html.tag,
        span = t('span'),
        label = t('label'),
        input = t('input'),
        div = t('div');

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


    function viewModel(params) {
        var resultsView = params.resultsView;

        return {
            resultsView: resultsView,
        };
    }

    function template() {
        return div({
            class: 'form-inline pull-right'
        }, [
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

    function component() {
        return {
            viewModel: viewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return ko.kb.registerComponent(component);
});