define([
    'knockout-plus',
    'kb_common/html',
    '../lib/nanoBus',
    './tabset',
    './narrative/main',
    './narrative/tab',
    './reference/main',
    './reference/tab',
    './features/main',
    './features/tab'
], function (
    ko,
    html,
    NanoBus,
    TabsetComponent,
    NarrativeResultsComponent,
    NarrativeTabComponent,
    ReferenceDataResultsComponent,
    ReferenceDataTabComponent,
    FeaturesResultsComponent,
    FeaturesTabComponent
) {
    'use strict';

    var t = html.tag,
        div = t('div');

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;

        var tabsetBus = NanoBus.make();
        tabsetBus.on('ready', function () {
            tabsetBus.send('add-tab', {
                tab: {
                    id: 'user-data',
                    tab: {
                        label: 'User Data',
                        component: {
                            name: NarrativeTabComponent.name(),
                            params: {
                                count: params.narrativesTotal
                            }
                        }
                    },
                    panel: {
                        component: {
                            name: NarrativeResultsComponent.name(),
                            // NB these params are bound here, not in the tabset.
                            // TODO: this should be named viewModel since that is what it is...
                            params: {
                                view: params.view,
                                searchInput: params.searchInput,
                                forceSearch: params.forceSearch,
                                searchTerms: params.searchTerms,
                                overlayComponent: params.overlayComponent,
                                selectedObjects: params.selectedObjects,
                                narrativesTotal: params.narrativesTotal,
                                referenceDataTotal: params.referenceDataTotal,
                                featuresTotal: params.featuresTotal,
                                withPrivateData: params.withPrivateData,
                                withPublicData: params.withPublicData
                            }
                        }
                    }
                }
            }, false);

            if (runtime.allow('alpha')) {
                tabsetBus.send('add-tab', {
                    tab: {
                        id: 'genome-features',
                        tab: {
                            label: 'Genome Features',
                            component: {
                                name: FeaturesTabComponent.name(),
                                params: {
                                    count: params.featuresTotal
                                }
                            }
                        },
                        panel: {
                            component: {
                                name: FeaturesResultsComponent.name(),
                                // NB these params are bound here, not in the tabset.
                                params: {
                                    view: params.view,
                                    searchInput: params.searchInput,
                                    forceSearch: params.forceSearch,
                                    searchTerms: params.searchTerms,
                                    overlayComponent: params.overlayComponent,
                                    selectedObjects: params.selectedObjects,
                                    narrativesTotal: params.narrativesTotal,
                                    referenceDataTotal: params.referenceDataTotal,
                                    featuresTotal: params.featuresTotal,
                                    withPrivateData: params.withPrivateData,
                                    withPublicData: params.withPublicData
                                }
                            }
                        }
                    }
                }, false);
            }

            tabsetBus.send('add-tab', {
                tab: {
                    id: 'reference-data',
                    tab: {
                        label: 'Reference Data',
                        component: {
                            name: ReferenceDataTabComponent.name(),
                            params: {
                                count: params.referenceDataTotal
                            }
                        }
                    },
                    panel: {
                        component: {
                            name: ReferenceDataResultsComponent.name(),
                            // NB these params are bound here, not in the tabset.
                            params: {
                                view: params.view,
                                searchInput: params.searchInput,
                                forceSearch: params.forceSearch,
                                searchTerms: params.searchTerms,
                                overlayComponent: params.overlayComponent,
                                selectedObjects: params.selectedObjects,
                                narrativesTotal: params.narrativesTotal,
                                referenceDataTotal: params.referenceDataTotal,
                                featuresTotal: params.featuresTotal,

                            }
                        }
                    }
                }
            }, false);


            tabsetBus.send('select-tab', 0);
        });

        return {
            view: params.view,
            tabsetBus: tabsetBus
        };
    }

    function buildTabset() {
        return ko.kb.komponent({
            name: TabsetComponent.name(),
            params: {
                bus: 'tabsetBus',
                view: 'view'
            }
        });
    }

    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }, [
            buildTabset()
        ]);
    }

    function component() {
        return {
            viewModel: {
                createViewModel: viewModel
            },
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});