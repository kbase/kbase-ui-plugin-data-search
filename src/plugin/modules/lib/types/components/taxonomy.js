define([
    'kb_ko/KO',
    'kb_ko/lib/viewModelBase',
    'kb_common/html',
    '../../ui'
], function (
    KO,
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
            '<!-- ko if: $index() !== $parent.value.length - 1 -->',
            ' > ',
            '<!-- /ko -->'            
        ]);
    }

    function template() {        
        return div([
            '<!-- ko if: isEmpty -->',
            ui.buildNA(),
            '<!-- /ko -->',
            '<!-- ko ifnot: isEmpty -->',
            buildLineage(),
            '<!-- /ko -->'
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return KO.registerComponent(component);
});