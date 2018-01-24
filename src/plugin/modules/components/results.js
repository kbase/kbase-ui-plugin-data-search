define([
    'knockout-plus',
    'kb_common/html',
    '../lib/nanoBus',
    './tabset',
    './narrativeResults',
    './referenceDataResults'
], function (
    ko,
    html,
    NanoBus,
    TabsetComponent,
    NarrativeResultsComponent,
    ReferenceDataResultsComponent
) {
    'use strict';

    var t = html.tag,
        div = t('div');

    function viewModel(params) {
        var tabsetBus = NanoBus();

        tabsetBus.on('ready', function () {
            tabsetBus.send('add-tab', {
                tab: {
                    label: 'Narratives',
                    component: {
                        name: NarrativeResultsComponent.name(),
                        // NB these params are bound here, not in the tabset.
                        params: {

                        }
                    }
                }
            });
            tabsetBus.send('add-tab', {
                tab: {
                    label: 'Reference Data',
                    component: {
                        name: ReferenceDataResultsComponent.name(),
                        // NB these params are bound here, not in the tabset.
                        params: {

                        }
                    }
                }
            });
        });

        return {
            tabsetBus: tabsetBus
        };
    }

    function buildTabset() {
        return ko.kb.komponent({
            name: TabsetComponent.name(),
            params: {
                bus: 'tabsetBus'
            }
        });
    }
    
    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px red solid'
            }
        }, [
            buildTabset()
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