define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/subscriptionManager',
    'kb_lib/html',
    'kb_knockout/components/overlayPanel',
    './navBar',
    './searchBar',
    './searchResults',
    './viewSelector',
    './copyObjectsControl',
    './dialogs/searchError',
    '../lib/searchApi',
    '../lib/data',
    '../lib/errors',
    '../lib/profile'
], function (
    ko,
    reg,
    gen,
    SubscriptionManager,
    html,
    OverlayPanelComponent,
    NavBarComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ViewSelectorComponent,
    CopyObjectsControlComponent,
    SearchErrorComponent,
    SearchApi,
    Data,
    errors,
    Profile
) {
    'use strict';

    var t = html.tag,
        div = t('div');

    function viewModel(params, componentInfo) {
        var subscriptions = new SubscriptionManager();
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;
        var appBus = context['$root'].appBus;
        var searchApi = SearchApi.make({
            runtime: runtime
        });

        var data = Data.make({
            runtime: params.runtime
        });

        // OVERLAY
        var overlayComponent = ko.observable();

        // SEARCH INPUTS
        var searchInput = ko.observable();

        subscriptions.add(
            searchInput.subscribe(function (newValue) {
                addToSearchHistory(newValue);
            })
        );

        var forceSearch = ko.observable();

        var searchTerms = ko.pureComputed(function () {
            if (!searchInput()) {
                return {
                    terms: [],
                    diagnosis: 'empty-input'
                };
            }

            // Trim out whitespace.
            var whiteSpaceStripped = searchInput()
                .trim()
                .split(/\s+/)
                .filter(function (term) {
                    return term.length;
                });

            // If that is all there is we have an empty query.
            if (whiteSpaceStripped.length === 0) {
                return {
                    terms: [],
                    diagnosis: 'just-whitespace'
                };
            }

            // Remove stop words. If that is all we have, we
            // have an empty query wity another reason.
            var stopWordsStripped = whiteSpaceStripped.filter(function (term) {
                return !data.isStopWord(term);
            });
            if (whiteSpaceStripped.length > stopWordsStripped.length) {
                var stopWords = whiteSpaceStripped.filter(function (term) {
                    return data.isStopWord(term);
                });
                if (stopWordsStripped.length === 0) {
                    return {
                        terms: [],
                        diagnosis: 'just-stopwords',
                        theStopWords: stopWords
                    };
                }
                return {
                    terms: stopWordsStripped,
                    diagnosis: 'some-stopwords',
                    theStopWords: stopWords
                };
            }

            return {
                terms: stopWordsStripped,
                diagnosis: 'ok',
                force: forceSearch()
            };
        });

        var inputWarnings = ko.pureComputed(function () {
            var terms = searchTerms();
            switch (terms.diagnosis) {
            case 'just-whitespace':
                return ['Empty search input.', 'You must supply one or more terms to initiate a query.'];
            case 'just-stopwords':
                // TODO: i'd like to have emphasis on these words, but we need to
                // sanitize them first...
                return [
                    'The search consisted of just "stop words".',
                    'Stop words are considered too common to be usefully applied to a search.',
                    'The following stop words were detected: ' + terms.theStopWords.join(', ') + '.'
                ];
            case 'some-stopwords':
                // TODO: i'd like to have emphasis on these words, but we need to
                // sanitize them first...
                return [
                    'The search included some "stop words".',
                    'Stop words are considered too common to be usefully applied to a search ' +
                            'and are removed from the terms before submitting the query.',
                    'The following stop words were detected and removed: ' + terms.theStopWords.join(', ') + '.',
                    'The terms sent were: ' + terms.terms.join(' ')
                ];
            }
            return [];
        });

        // SEARCH HISTORY

        var searchHistory = ko.observableArray();

        function getSearchHistory() {
            var profile = Profile.make({
                runtime: runtime
            });
            return profile.getHistory('search').spread(function (result, error) {
                if (result) {
                    return result;
                } else {
                    // showError(error);
                    appBus.send('error', error);
                }
            });
        }

        function saveSearchHistory(history) {
            var profile = Profile.make({
                runtime: runtime
            });
            return profile.saveHistory('search', history).spread(function (result, error) {
                if (result) {
                    return result;
                } else {
                    appBus.send('error', error);
                    // showError(error);
                }
            });
        }

        function addToSearchHistory(value) {
            // Do not add empty search values.
            if (!value) {
                return;
            }
            if (value.trim().length === 0) {
                return;
            }

            // Remove the search input if it is already in the list
            searchHistory.remove(value);

            // Add the item to the top of the list.
            searchHistory.unshift(value);

            // remove the last entry if we have exceeded 10 items.
            // the last entry will be the oldest one.
            if (searchHistory().length > 10) {
                searchHistory.pop();
            }
        }

        subscriptions.add(
            searchHistory.subscribe(function (newValue) {
                saveSearchHistory(newValue);
            })
        );

        var resultsView = ko.observable('detail');

        var selectedObjects = ko.observableArray();

        // These are just to support showing preview totals on the tabs.
        var narrativesTotal = ko.observable();
        var referenceDataTotal = ko.observable();
        var featuresTotal = ko.observable();

        var withPrivateData = ko.observable(true);
        var withPublicData = ko.observable(true);
        var withUserData = ko.observable(true);
        var withReferenceData = ko.observable(true);

        var referenceDataTotalQuery = ko.pureComputed(function () {
            var terms = searchTerms().terms;
            return {
                query: terms.join(' ')
            };
        });
        subscriptions.add(
            referenceDataTotalQuery.subscribe(function (newQuery) {
                if (!newQuery.query) {
                    referenceDataTotal(null);
                    return;
                }
                return searchApi.referenceObjectSearchTotal(newQuery).then(function (total) {
                    referenceDataTotal(total);
                });
            })
        );

        var narrativesTotalQuery = ko.pureComputed(function () {
            var terms = searchTerms().terms;

            return {
                query: terms.join(' '),
                withPrivateData: withPrivateData(),
                withPublicData: withPublicData()
            };
        });
        subscriptions.add(
            narrativesTotalQuery.subscribe(function (newQuery) {
                if (!newQuery.query) {
                    narrativesTotal(null);
                    return;
                }
                return searchApi.narrativeObjectSearchTotal(newQuery).then(function (total) {
                    narrativesTotal(total);
                });
            })
        );

        var featuresTotalQuery = ko.pureComputed(function () {
            var terms = searchTerms().terms;

            return {
                query: terms.join(' '),
                withPrivateData: withPrivateData(),
                withPublicData: withPublicData(),
                withUserData: withUserData(),
                withReferenceData: withReferenceData()
            };
        });

        if (runtime.featureEnabled('search_features')) {
            subscriptions.add(
                featuresTotalQuery.subscribe(function (newQuery) {
                    if (!newQuery.query) {
                        featuresTotal(null);
                        return;
                    }
                    return searchApi.featuresSearchTotal(newQuery).then(function (total) {
                        featuresTotal(total);
                    });
                })
            );
        }

        function grokErrorMessage(message) {
            if (message.error) {
                // The caller just passed us some error thing and asked us
                // to grok it!
                var stackTrace;
                if (message.error instanceof errors.DataSearchError) {
                    stackTrace = message.error.stack.split('\n');
                    console.error('data search error', message.error);
                    return {
                        source: message.error.source,
                        id: message.error.code,
                        message: message.error.message,
                        detail: message.error.detail,
                        info: message.error.info,
                        stackTrace: message.error.info.originalError.stack.split('\n')
                    };
                } else if (message.error instanceof Error) {
                    stackTrace = message.error.stack.split('\n');
                    return {
                        source: 'Error',
                        id: message.error.name,
                        message: message.error.message,
                        stackTrace: stackTrace
                    };
                } else if (typeof message.error === 'string') {
                    return {
                        message: message.error
                    };
                } else if (typeof message.error === 'object') {
                    console.warn('Unknown error object: ', message.error);
                    return {
                        source: 'Unknown'
                        // id: message.id,
                        // message: message.message,
                        // stackTrace: message.
                    };
                }
            } else {
                return {
                    source: message.source,
                    id: message.id,
                    message: message.message,
                    stackTrace: message.stackTrace,
                    info: message.info
                };
            }
        }

        appBus.on('error', function (message) {
            var error = grokErrorMessage(message);
            overlayComponent({
                name: SearchErrorComponent.name(),
                type: 'error',
                viewModel: {
                    error: error
                }
            });
        });

        appBus.on('alert', function (msg) {
            alert(msg);
        });

        appBus.start();

        function dispose() {
            appBus.stop();
            subscriptions.dispose();
        }

        // MAIN (INIT)

        getSearchHistory()
            .then(function (history) {
                searchHistory(history);
            })
            .then(function () {
                searchInput(params.initialQuery);
            })
            .catch(function (err) {
                console.error('ERROR retrieving search history', err);
            });

        return {
            appBus: appBus,

            searchInput: searchInput,
            forceSearch: forceSearch,
            inputWarnings: inputWarnings,
            searchTerms: searchTerms,
            searchHistory: searchHistory,
            overlayComponent: overlayComponent,
            resultsView: resultsView,
            selectedObjects: selectedObjects,

            narrativesTotal: narrativesTotal,
            referenceDataTotal: referenceDataTotal,
            featuresTotal: featuresTotal,

            withPrivateData: withPrivateData,
            withPublicData: withPublicData,
            withUserData: withUserData,
            withReferenceData: withReferenceData,

            dispose: dispose
        };
    }

    var styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '12px',
            paddingLeft: '12px'
        },
        navArea: {
            flex: '0 0 50px'
        },
        searchArea: {
            flex: '0 0 50px'
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
        return div(
            {
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'row'
                }
            },
            [
                div(
                    {
                        style: {
                            flex: '2'
                        }
                    },
                    gen.component({
                        name: SearchBarComponent.name(),
                        params: {
                            searchInput: 'searchInput',
                            forceSearch: 'forceSearch',
                            inputWarnings: 'inputWarnings',
                            searchHistory: 'searchHistory',
                            overlayComponent: 'overlayComponent',
                            resultsView: 'resultsView'
                        }
                    })
                ),
                div(
                    {
                        style: {
                            flex: '1'
                        }
                    },
                    gen.component({
                        name: CopyObjectsControlComponent.name(),
                        params: {
                            selectedObjects: 'selectedObjects',
                            overlayComponent: 'overlayComponent'
                        }
                    })
                ),
                div(
                    {
                        style: {
                            flex: '0 0 auto'
                        }
                    },
                    gen.component({
                        name: ViewSelectorComponent.name(),
                        params: {
                            resultsView: 'resultsView'
                        }
                    })
                )
            ]
        );
    }

    function buildNavArea() {
        return div(
            {
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'row'
                }
            },
            [
                div(
                    {
                        style: {
                            flex: '1'
                        }
                    },
                    gen.component({
                        name: NavBarComponent.name(),
                        params: {
                            searchInput: 'searchInput'
                        }
                    })
                )
            ]
        );
    }

    function buildResultsArea() {
        return gen.component({
            name: SearchResultsComponent.name(),
            params: {
                searchInput: 'searchInput',
                forceSearch: 'forceSearch',
                searchTerms: 'searchTerms',
                view: 'resultsView',
                overlayComponent: 'overlayComponent',
                selectedObjects: 'selectedObjects',

                narrativesTotal: 'narrativesTotal',
                referenceDataTotal: 'referenceDataTotal',
                featuresTotal: 'featuresTotal',

                withPrivateData: 'withPrivateData',
                withPublicData: 'withPublicData',
                withUserData: 'withUserData',
                withReferenceData: 'withReferenceData'
            }
        });
    }

    function template() {
        return div(
            {
                class: styles.classes.component,
                dataKBTesthookComponent: 'main'
            },
            [
                div(
                    {
                        class: styles.classes.navArea
                    },
                    buildNavArea()
                ),
                // The search input area
                div(
                    {
                        class: styles.classes.searchArea
                    },
                    buildInputArea()
                ),
                // The search filter area
                // div({
                //     class: styles.classes.filterArea
                // }, buildToolbarArea()),
                // The search results / error / message area
                div(
                    {
                        class: styles.classes.resultArea
                    },
                    [buildResultsArea()]
                ),
                gen.component({
                    name: OverlayPanelComponent.name(),
                    params: {
                        component: 'overlayComponent',
                        hostVm: '$data'
                    }
                })
            ]
        );
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

    return reg.registerComponent(component);
});
