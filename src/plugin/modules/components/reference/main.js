define([
    'bluebird',
    'knockout-plus',
    'kb_common/html',
    'kb_common/utils',
    './header',
    './navbar',
    './results',
    './data',
    '../../lib/searchJob',
    '../../lib/timer'
], function (
    Promise,
    ko,
    html,
    utils,
    HeaderComponent,
    NavbarComponent,
    ResultsComponent,
    Data,
    SearchJob,
    Timer
) {
    'use strict';

    var t = html.tag,
        div = t('div');

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
        }
    });     

    function SearchState() {
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
        var summary = ko.observable();

        // var start = ko.observable();

        var totalPages = ko.pureComputed(function () {
            var totalItems = totalSearchHits();
            if (typeof totalItems !== 'number') {
                return;
            }
            return Math.ceil(totalItems / pageSize());
        });

        return {
            pageSize: pageSize,
            page: page,
            totalPages: totalPages,
            status: status,
            searching: searching,
            buffer: buffer,
            isTruncated: isTruncated,
            totalSearchHits: totalSearchHits,
            totalSearchSpace: totalSearchSpace,
            summary: summary
        };
    }

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;
        var types = context['$root'].types;
        var appBus = context['$root'].appBus;

        var subscriptions = ko.kb.SubscriptionManager.make();

        // the search view model...
        var searchState = SearchState();

        var data = Data.make({
            runtime: runtime,
            types: types,
            pageSize: searchState.pageSize(),
            maxBufferSize: 100,
            maxSearchItems: 10000
        });

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
            if (!query.input) {
                searchState.status('none');
                searchState.buffer(null);
                searchState.isTruncated(null);
                searchState.totalSearchHits(null);
                searchState.summary(null);
                searchState.totalSearchSpace(null);
                return;
            }

            var thisSearch = SearchJob.make();
            currentSearch = thisSearch;

            searchState.searching(true);
            searchState.status('searching');

            var timer = Timer.make();

            timer.start('search');

            var searchJob = Promise.try(function () {
                thisSearch.started();
            })
                .then(function () {
                    return data.search({
                        start: query.start,
                        terms: query.terms
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
                        searchState.summary(null);
                        searchState.totalSearchSpace(null);
                        searchState.page(null);
                        return;
                    }

                    var selected = params.selectedObjects().reduce(function (set, ref) {
                        set[ref] = true;
                        return set;
                    }, {});

                    // TODO: we need an ES5 
                    result.items.forEach(function (object) {
                        if (selected[object.matchClass.ref.ref]) {
                            object.selected(true);
                        }
                    });

                    searchState.buffer(result.items);
                    searchState.isTruncated(result.isTruncated);
                    searchState.totalSearchHits(result.summary.totalSearchHits);
                    searchState.summary(result.summary.totalByType);
                    searchState.totalSearchSpace(result.summary.totalSearchSpace);
                    searchState.status('success');

                    // if page not set yet (because initial search), set it.
                    if (!searchState.page()) {
                        if (result.items.length > 0) {
                            searchState.page(1);
                        }
                    }
                }) 
                .catch(function (err) {
                    appBus.send('error', {
                        error: err
                    });
                })
                .finally(function () {
                    timer.stop('processing');
                    timer.log();
                    thisSearch.finished();
                    searchState.searching(false);
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

            return {
                input: params.searchInput(),
                terms: terms.terms,
                start: start,
                pageSize: searchState.pageSize(),
                forced: params.forceSearch()
            };
        });
        
        subscriptions.add(searchQuery.subscribe(function (newValue) {
            runSearch(newValue);
        }));

        // // ACTIONS
        
        function doToggleShowMatches(currentlyShowing) {
            searchState.buffer().forEach(function (item) {
                if (currentlyShowing) {
                    item.showMatches(false);
                    item.showDetails(false);
                } else {
                    item.showMatches(true);
                    item.showDetails(false);
                }
            });
        }
        function doToggleShowDetails(currentlyShowing) {
            searchState.buffer().forEach(function (item) {
                if (currentlyShowing) {
                    item.showMatches(false);
                    item.showDetails(false);
                } else {
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
            searchState: searchState,
            view: params.view,
            overlayComponent: params.overlayComponent,
            selectedObjects: params.selectedObjects,

            // ACTIONS
            doToggleShowMatches: doToggleShowMatches,
            doToggleShowDetails: doToggleShowDetails,

            // LIFECYCLE
            dispose: dispose
        };
    }

    function template() {
        return div({
            class: styles.classes.main
        }, [
            div({
                class: styles.classes.navbar
            }, ko.kb.komponent({
                name: NavbarComponent.name(),
                params: {
                    page: 'searchState.page',
                    totalPages: 'searchState.totalPages',

                    typeCounts: 'searchState.summary',
                    resultCount: 'searchState.totalSearchHits',
                    searchStatus: 'searchState.status',
                    searchSpaceCount: 'searchState.totalSearchSpace'
                }
            })),
            div({
                class: styles.classes.header
            },  ko.kb.komponent({
                name: HeaderComponent.name(),
                params: {}
            })),
            div({
                class: styles.classes.results
            },  ko.kb.komponent({
                name: ResultsComponent.name(),
                params: {
                    searchState: 'searchState',
                    view: 'view',
                    overlayComponent: 'overlayComponent',
                    selectedObjects: 'selectedObjects',
                    doToggleShowMatches: 'doToggleShowMatches',
                    doToggleShowDetails: 'doToggleShowDetails'
                }
            }))
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