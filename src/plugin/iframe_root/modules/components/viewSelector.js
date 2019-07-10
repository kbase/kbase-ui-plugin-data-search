define(['kb_knockout/registry', 'kb_lib/html'], function (reg, html) {
    'use strict';

    var t = html.tag,
        select = t('select'),
        div = t('div');

    var styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'row'
        },
        searchArea: {
            flex: '0 0 50px'
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

        var viewOptions = [
            {
                value: 'list',
                label: 'List'
            },
            {
                value: 'matches',
                label: 'Matches'
            },
            {
                value: 'detail',
                label: 'Detail'
            }
        ];

        return {
            resultsView: resultsView,
            viewOptions: viewOptions
        };
    }

    function template() {
        return div(
            {
                class: 'form-inline pull-right'
            },
            [
                'View ',
                select({
                    class: 'form-control',
                    title: 'Select the level of detail for viewing search results',
                    dataBind: {
                        value: 'resultsView',
                        options: 'viewOptions',
                        optionsText: '"label"',
                        optionsValue: '"value"'
                    }
                })
            ]
        );
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});
