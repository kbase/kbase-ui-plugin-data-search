define([
    'knockout-plus',
    'kb_common/html',
    './searchBar',
    './toolBar',
    './results',
    './viewSelector',
    './copyObjectsControl',
    '../lib/searchApi',
    '../lib/data'
], function (
    ko,
    html,
    SearchBarComponent,
    ToolBarComponent,
    SearchResultsComponent,
    ViewSelectorComponent,
    CopyObjectsControlComponent,
    SearchApi,
    Data
) {
    'use strict';

    var t = html.tag,
        div = t('div');

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;
        var searchApi = SearchApi.make({
            runtime: runtime
        });

        var data = Data.make({
            runtime: params.runtime
        });

        // OVERLAY
        var overlayComponent = ko.observable();
        // var showOverlay = ko.observable();

        // showOverlay.subscribe(function (newValue) {
        //     overlayComponent(newValue);
        // });

        // SEARCH INPUTS
        var searchInput = ko.observable();

        var searchTerms = ko.pureComputed(function () {
            if (!searchInput()) {
                return [];
            }

            return searchInput().split(/\s+/)
                .map(function (term) {
                    return term.trim(' ').toLowerCase();
                })
                .filter(function (term) {
                    if (term.length === 0) {
                        return false;
                    } else if (data.isStopWord(term)) {
                        return false;
                    }
                    return true;
                });
        });

        var searchHistory = ko.observableArray();

        var resultsView = ko.observable('detail');

        var selectedObjects = ko.observableArray();

        // These are just to support showing preview totals on the tabs.
        var narrativesTotal = ko.observable();
        var referenceDataTotal = ko.observable();

        var withPrivateData = ko.observable(true);
        var withPublicData = ko.observable(true);

        var referenceDataTotalQuery = ko.pureComputed(function () {
            return {
                query: searchTerms().join(' ')
            };
        });
        referenceDataTotalQuery.subscribe(function (newQuery) {
            if (!newQuery.query) {
                referenceDataTotal(null);
                return;
            }
            return searchApi.referenceObjectSearchTotal(newQuery)
                .then(function (total) {
                    referenceDataTotal(total);
                });
        });

        var narrativesTotalQuery = ko.pureComputed(function () {
            return {
                query: searchTerms().join(' '),
                withPrivateData: withPrivateData(),
                withPublicData: withPublicData()
            };
        });
        narrativesTotalQuery.subscribe(function (newQuery) {
            if (!newQuery.query) {
                narrativesTotal(null);
                return;
            }
            return searchApi.narrativeObjectSearchTotal(newQuery)
                .then(function (total) {
                    narrativesTotal(total);
                });
        });

        return {
            // search: {

            //     // Control the overlay.
            //     showOverlay: showOverlay
            // },
            // showOverlay: showOverlay,
            searchInput: searchInput,
            searchTerms: searchTerms,
            searchHistory: searchHistory,
            overlayComponent: overlayComponent,
            resultsView: resultsView,
            selectedObjects: selectedObjects,

            narrativesTotal: narrativesTotal,
            referenceDataTotal: referenceDataTotal,
            withPrivateData: withPrivateData,
            withPublicData: withPublicData
        };
    }

    var styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        },
        searchArea: {
            flex: '0 0 50px',
        },
        filterArea: {
            flex: '0 0 50px',
            textAlign: 'left'
        },
        resultArea: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        },
        activeFilterInput: {
            backgroundColor: 'rgba(209, 226, 255, 1)',
            color: '#000'
        },
        modifiedFilterInput: {
            backgroundColor: 'rgba(255, 245, 158, 1)',
            color: '#000'
        },
        checkboxControl: {
            borderColor: 'transparent',
            boxShadow: 'none',
            margin: '0 2px'
        }
    });

    function buildInputArea() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        }, [
            div({
                style: {
                    flex: '2'
                }
            },  ko.kb.komponent({
                name: SearchBarComponent.name(),
                params: {
                    searchInput: 'searchInput',
                    searchHistory: 'searchHistory',
                    overlayComponent: 'overlayComponent',
                    resultsView: 'resultsView'
                }
            })),
            div({
                style: {
                    flex: '1'
                }
            }, ko.kb.komponent({
                name: CopyObjectsControlComponent.name(),
                params: {
                    selectedObjects: 'selectedObjects',
                    overlayComponent: 'overlayComponent'
                }
            })),
            div({
                style: {
                    flex: '0 0 auto'
                }
            }, ko.kb.komponent({
                name: ViewSelectorComponent.name(),
                params: {
                    resultsView: 'resultsView'
                }
            }))
        ]);
    }

    function buildResultsArea() {
        return ko.kb.komponent({
            name: SearchResultsComponent.name(),
            params: {
                searchInput: 'searchInput',
                searchTerms: 'searchTerms',
                view: 'resultsView',
                overlayComponent: 'overlayComponent',
                selectedObjects: 'selectedObjects',

                narrativesTotal: 'narrativesTotal',
                referenceDataTotal: 'referenceDataTotal',
                withPrivateData: 'withPrivateData',
                withPublicData: 'withPublicData'
            }
        });
    }

    function template() {
        return div({
            class: styles.classes.component,
            style: {
                paddingRight: '12px',
                paddingLeft: '12px'
            }
        }, [
            div({
                class: styles.classes.component
            }, [
                // The search input area
                div({
                    class: styles.classes.searchArea
                }, buildInputArea()),
                // The search filter area
                // div({
                //     class: styles.classes.filterArea
                // }, buildToolbarArea()),
                // The search results / error / message area
                div({
                    class: styles.classes.resultArea
                }, [
                    buildResultsArea(),
                ])
            ]),
            ko.kb.komponent({
                name: 'generic/overlay-panel-bootstrappish',
                params: {
                    component: 'overlayComponent',
                    hostVm: '$data'
                }
            })
        ]);
    }

    function component() {
        return {
            viewModel: {
                createViewModel: viewModel
            },
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return ko.kb.registerComponent(component);
});