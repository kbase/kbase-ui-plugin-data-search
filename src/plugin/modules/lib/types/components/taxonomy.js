define([
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html',
    '../../ui'
], function (
    reg,
    gen,
    ViewModelBase,
    html,
    ui
) {
    'use strict';

    let t = html.tag,
        span = t('span'),
        div = t('div');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            this.value = params.value;

            let isEmpty;
            if (!params.value) {
                isEmpty = true;
            } else if (params.value.length === 0) {
                isEmpty = true;
            } else {
                isEmpty = false;
            }
            this.isEmpty = isEmpty;
        }
    }

    function buildLineage() {
        return div({
            dataBind: {
                foreach: 'value'
            }
        }, [
            span({
                dataBind: {
                    text: '$data'
                }
            }),
            gen.if('$index() !== $parent.value.length - 1', ' > ')
        ]);
    }

    function template() {        
        return div([
            gen.if('isEmpty', ui.buildNA(), buildLineage())
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});