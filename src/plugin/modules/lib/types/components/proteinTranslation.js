define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html',
    '../../ui'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    ui
) {
    'use strict';

    let t = html.tag,
        button = t('button'),
        span = t('span'),
        div = t('div');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            let isEmpty;
            if (!params.value) {
                isEmpty = true;
            } else if (params.value.length === 0) {
                isEmpty = true;
            } else {
                this.value = params.value;
                this.proteinLength = this.value.length;
                this.showing = ko.observable(false);
                isEmpty = false;
            }
            this.isEmpty = isEmpty;
        }

        doToggleShow() {
            if (!this.isEmpty) {
                this.showing(!this.showing());
            }
        }
    }

    function buildProtein() {
        return div([
            div({
            }, button({
                type: 'button',
                class: 'btn btn-default btn-kb-flat',
                style: {
                    padding: '0px',
                    margin: '0px'
                },
                dataBind: {
                    click: 'function (d,e) {return $component.doToggleShow.call($component,d,e);}',
                    // text: 'showing() ? "Hide" : "Show"'
                }
            },  gen.if('showing()', 
                span([
                    'hide ',
                    span({
                        class: 'fa fa-caret-down'
                    })
                ]),
                span([
                    'show ',
                    span({
                        class: 'fa fa-caret-right'
                    })
                ])))),
            gen.if('showing', 
                div({
                    dataBind: {
                        text: 'value'
                    }
                }))                
        ]);
    }

    function template() {        
        return div([
            gen.if('isEmpty', ui.buildNA(), buildProtein())
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