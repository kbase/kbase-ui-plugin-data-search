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
        div = t('div');

    function viewModel(params) {
        return {
            value: params.value
        };
    }

    function template() {
        return div({
            dataBind: {
                foreach: 'value'
            }
        }, [
            div([
                'd:', 
                span({
                    dataBind: {
                        text: 'direction'
                    }
                }),
                ', ',
                's:', 
                span({
                    dataBind: {
                        text: 'start'
                    }
                }),
                ', ',
                'e:', 
                span({
                    dataBind: {
                        text: 'end'
                    }
                }),
                ', ',
                'l:', 
                span({
                    dataBind: {
                        text: 'length'
                    }
                }),
                ', ',
                'g:', 
                span({
                    dataBind: {
                        text: 'genome'
                    }
                }),
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