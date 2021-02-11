define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/subscriptionManager',
    'kb_lib/html',
    'kb_common/utils',
    './data',
    './header',
    './navbar',
    './results',
    '../../lib/searchJob',
    '../../lib/timer'
], function (
    Promise,
    ko,
    reg,
    gen,
    SubscriptionManager,
    html,
    utils,
    Data,
    HeaderComponent,
    NavbarComponent,
    ResultsComponent,
    SearchJob,
    Timer
) {
    'use strict';

    var t = html.tag,
        div = t('div');

    ko.bindingHandlers.labelText = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            var valueUnwrapped = ko.unwrap(value.label);
            var quantity = ko.unwrap(value.quantity);
            var labels = ko.unwrap(value.labels);
            // var missing = value.missing || '';
            var formatted;

            var label = labels[valueUnwrapped];
            if (!label) {
                console.warn('labelText: No label found for: ' + valueUnwrapped);
                formatted = valueUnwrapped;
            } else if (quantity === 0 || quantity > 1) {
                formatted = label.plural;
            } else {
                formatted = label.singular;
            }

            element.innerText = formatted;
        }
    };

    var styles = html.makeStyles({
        main: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        },
        toolbar: {
            flex: '0 0 50px',
            display: 'flex',
            flexDirection: 'column'
        },
        navbar: {
            flex: '0 0 50px',
            display: 'flex',
            flexDirection: 'column'
        },
        header: {
            flex: '0 0 40px',
            display: 'flex',
            flexDirection: 'column'
        },
        results: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
            // border: '1px silver solid'
        }
    });

    function SearchState(params) {
        var includePrivateData = params.withPrivateData;

        var includePublicData = params.withPublicData;

        var pageSize = ko.observable(20);

        // Paging
        var page = ko.observable();

        // OUTPUT
        var status = ko.observable('none');

        var searching = ko.observable(false);

        // holds search result items for display
        var buffer = ko.observableArray();

        // position of first item in the buffer in the total search results space.
        // var firstItemPosition = ko.observable();

        // Is the total search results space truncated due to limitations of the back end?
        var isTruncated = ko.observable();

        // The total # of items (may be estimated) in the search results space.
        var totalSearchHits = ko.observable();

        var totalSearchSpace = ko.observable();

        // Summary by type
        // TODO: an array, or a map of observables...
        var summary = ko.observableArray();

        var totalPages = ko.pureComputed(function () {
            var totalItems = totalSearchHits();
            if (typeof totalItems !== 'number') {
                return;
            }
            return Math.ceil(totalItems / pageSize());
        });

        var errorMessage = ko.observable();
        var error = ko.observable();

        return {
            includePrivateData,
            includePublicData,
            pageSize,
            page,
            totalPages,
            status,
            searching,
            buffer,
            isTruncated,
            totalSearchHits,
            totalSearchSpace,
            summary,
            errorMessage,
            error
        };
    }

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;
        var types = context['$root'].types;
        var appBus = context['$root'].appBus;
        var subscriptions = new SubscriptionManager();

        // the search view model...
        var searchState = SearchState({
            withPrivateData: params.withPrivateData,
            withPublicData: params.withPublicData
        });

        var data = Data.make({
            runtime: runtime,
            types: types,
            pageSize: searchState.pageSize(),
            maxBufferSize: 100,
            maxSearchItems: 10000
        });

        // We track the current search with a search job object.
        // Create an initial inactive search job to support the
        // "cancel before searching" logic. Avoids the necessity of
        // checking for the existence of an search job.
        var currentSearch = SearchJob.make();

        var lastQuery = null;
        function runSearch(query) {
            if (utils.isEqual(query, lastQuery)) {
                console.warn('duplicate query suppressed?', query, lastQuery);
                return;
            }
            lastQuery = query;

            currentSearch.cancel();

            // ensure search is runnable
            if (!query.terms || query.terms.length === 0) {
                searchState.status('none');
                searchState.buffer(null);
                searchState.isTruncated(null);
                searchState.totalSearchHits(null);
                searchState.summary.removeAll();
                searchState.totalSearchSpace(null);
                return;
            }

            searchState.searching(true);
            searchState.status('searching');

            var thisSearch = SearchJob.make();
            currentSearch = thisSearch;

            var timer = Timer.make();

            timer.start('search');
            searchState.errorMessage(null);
            searchState.error(null);

            var searchJob = Promise.try(function () {
                thisSearch.started();
            })
                .then(function () {
                    return data.search({
                        start: query.start,
                        terms: query.terms,
                        withPrivateData: query.withPrivateData,
                        withPublicData: query.withPublicData
                    });
                })
                .then(function (result) {
                    timer.stop('search');
                    timer.start('processing');
                    return result;
                })
                .then(function (result) {
                    if (thisSearch.isCanceled()) {
                        return;
                    }
                    if (result.items.length === 0) {
                        searchState.status('notfound');
                        searchState.isTruncated(false);
                        searchState.totalSearchHits(null);
                        searchState.summary.removeAll();
                        searchState.totalSearchSpace(null);
                        searchState.page(null);
                        return;
                    }

                    var selected = params.selectedObjects().reduce(function (set, ref) {
                        set[ref] = true;
                        return set;
                    }, {});

                    // TODO: use the es5-collections map for the selected objects.
                    result.narratives.forEach(function (item) {
                        item.objects.forEach(function (object) {
                            if (selected[object.matchClass.ref.objectRef]) {
                                object.selected(true);
                            }
                        });
                    });

                    searchState.buffer(result.narratives);
                    searchState.isTruncated(result.isTruncated);
                    searchState.totalSearchHits(result.summary.totalSearchHits);
                    searchState.summary.removeAll();
                    result.summary.totalByType.forEach(function (total) {
                        searchState.summary.push(total);
                    });
                    searchState.summary.sort(function (a, b) {
                        return b.count - a.count;
                    });
                    searchState.totalSearchSpace(result.summary.totalSearchSpace);
                    searchState.status('success');

                    // if page not set yet (because initial search), set it.
                    // TODO: page should be invalidated when we launch a search due to new
                    // query terms.
                    // TODO: this will span the searchQuery, but since the page is transformed
                    // into the start field, and the start field value will be the same for an
                    // initial search, the check for identical searchQuery in the subscription
                    if (!searchState.page()) {
                        if (result.items.length > 0) {
                            searchState.page(1);
                        }
                    }
                })
                .catch(function (err) {
                    searchState.status('error');
                    searchState.errorMessage(err.message);
                    searchState.error(err);
                    appBus.send('error', {
                        error: err
                    });
                })
                .finally(function () {
                    timer.stop('processing');
                    timer.log();
                    searchState.searching(false);
                    thisSearch.finished();
                });
            thisSearch.running(searchJob);
            return searchJob;
        }

        var searchQuery = ko.pureComputed(function () {
            var page = searchState.page();
            var start;
            if (page) {
                start = page - 1;
            } else {
                start = 0;
            }

            var terms = params.searchTerms();

            var forced = params.forceSearch();

            return {
                terms: terms.terms,
                withPrivateData: searchState.includePrivateData(),
                withPublicData: searchState.includePublicData(),
                start: start,
                pageSize: searchState.pageSize(),
                username: runtime.service('session').getUsername(),
                forced: forced
            };
        });

        subscriptions.add(
            searchQuery.subscribe(function (newValue) {
                runSearch(newValue);
            })
        );

        // // ACTIONS

        function doToggleShowObjects(currentlyShowingObjects) {
            searchState.buffer().forEach(function (item) {
                if (currentlyShowingObjects) {
                    item.showObjects(false);
                    item.showMatches(false);
                    item.showDetails(false);
                } else {
                    item.showObjects(true);
                    item.showMatches(false);
                    item.showDetails(false);
                }
            });
        }
        function doToggleShowMatches(currentlyShowing) {
            searchState.buffer().forEach(function (item) {
                if (currentlyShowing) {
                    item.showObjects(false);
                    item.showMatches(false);
                    item.showDetails(false);
                } else {
                    item.showObjects(false);
                    item.showMatches(true);
                    item.showDetails(false);
                }
            });
        }
        function doToggleShowDetails(currentlyShowing) {
            searchState.buffer().forEach(function (item) {
                if (currentlyShowing) {
                    item.showObjects(false);
                    item.showMatches(false);
                    item.showDetails(false);
                } else {
                    item.showObjects(false);
                    item.showMatches(false);
                    item.showDetails(true);
                }
            });
        }

        // MAIN

        runSearch(searchQuery());

        // LIFECYCLE

        function dispose() {
            if (currentSearch) {
                currentSearch.cancel();
            }
            subscriptions.dispose();
        }

        return {
            searchState,
            view: params.view,
            overlayComponent: params.overlayComponent,
            selectedObjects: params.selectedObjects,

            // ACTIONS
            doToggleShowObjects: doToggleShowObjects,
            doToggleShowMatches: doToggleShowMatches,
            doToggleShowDetails: doToggleShowDetails,

            narrativesTotal: params.narrativesTotal,
            referenceDataTotal: params.referenceDataTotal,

            dispose
        };
    }

    function template() {
        return div(
            {
                class: styles.classes.main,
                dataKBTesthookComponent: 'narrative-main'
            },
            [
                div(
                    {
                        class: styles.classes.navbar
                    },
                    gen.component({
                        name: NavbarComponent.name(),
                        params: {
                            page: 'searchState.page',
                            totalPages: 'searchState.totalPages',
                            typeCounts: 'searchState.summary',
                            resultCount: 'searchState.totalSearchHits',
                            withPrivateData: 'searchState.includePrivateData',
                            withPublicData: 'searchState.includePublicData',
                            searchStatus: 'searchState.status'
                        }
                    })
                ),
                div(
                    {
                        class: styles.classes.header
                    },
                    gen.component({
                        name: HeaderComponent.name(),
                        params: {}
                    })
                ),
                div(
                    {
                        class: styles.classes.results
                    },
                    gen.component({
                        name: ResultsComponent.name(),
                        params: {
                            buffer: 'searchState.buffer',
                            narrativesTotal: 'narrativesTotal',
                            referenceDataTotal: 'referenceDataTotal',

                            status: 'searchState.status',
                            errorMessage: 'searchState.errorMessage',
                            error: 'searchState.error',
                            view: 'view',
                            overlayComponent: 'overlayComponent',
                            selectedObjects: 'selectedObjects',
                            doToggleShowObjects: 'doToggleShowObjects',
                            doToggleShowMatches: 'doToggleShowMatches',
                            doToggleShowDetails: 'doToggleShowDetails'
                        }
                    })
                )
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
