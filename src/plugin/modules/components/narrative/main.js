define([
    'knockout-plus',
    'kb_common/html',
    'kb_common/utils',
    './data',
    './header',
    './navbar',
    './results'
], function (
    ko,
    html,
    utils,
    Data,
    HeaderComponent,
    NavbarComponent,
    ResultsComponent
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
            flexDirection: 'column',
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
        var summary = ko.observable();

        // var start = ko.observable();

        var totalPages = ko.pureComputed(function () {
            var totalItems = totalSearchHits();
            if (typeof totalItems !== 'number') {
                return;
            }
            return Math.ceil(totalItems / pageSize());
        });

        // page.subscribe(function (newValue) {
        //     searchState.start( (newValue - 1) * searchState.pageSize());
        // });

        return {
            includePrivateData: includePrivateData,
            includePublicData: includePublicData,
            pageSize: pageSize,
            page: page,
            totalPages: totalPages,
            status: status,
            searching: searching,
            buffer: buffer,
            // firstItemPosition: firstItemPosition,
            isTruncated: isTruncated,
            totalSearchHits: totalSearchHits,
            totalSearchSpace: totalSearchSpace,
            summary: summary
            // start: start
        };
    }

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;
        var types = context['$root'].types;
        var appBus = context['$root'].appBus;

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

        var queryFinished;

        function runSearch(query) {
            // ensure search is runnable
            var start = new Date().getTime();
            if (!query.terms || query.terms.length === 0) {
                searchState.status('none');
                searchState.buffer(null);
                // searchState.firstItemPosition(null);
                searchState.isTruncated(null);
                searchState.totalSearchHits(null);
                searchState.summary(null);
                searchState.totalSearchSpace(null);
                return;
            }

            searchState.searching(true);
            searchState.status('searching');

            data.search({
                start: query.start,
                terms: query.terms,
                withPrivateData: query.withPrivateData,
                withPublicData: query.withPublicData
            })
                .then(function(result) {
                    // console.log('DATA OK', result, query);
                    queryFinished = new Date().getTime();
                    return result;
                })
                .then(function (result) {
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

                    // TODO: use the es5-collections map for the selected objects.
                    result.narratives.forEach(function (item) {
                        item.objects.forEach(function (object) {
                            if (selected[object.matchClass.ref.ref]) {
                                object.selected(true);
                            }
                        });
                    });

                    searchState.buffer(result.narratives);
                    // searchState.firstItemPosition(result.first);
                    searchState.isTruncated(result.isTruncated);
                    searchState.totalSearchHits(result.summary.totalSearchHits);
                    searchState.summary(result.summary.totalByType);
                    searchState.totalSearchSpace(result.summary.totalSearchSpace);
                    searchState.status('success');


                    // if page not set yet (because initial search), set it.
                    // TODO: page should be invalidated when we launch a search due to new
                    // query terms.
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
                    console.log('time - search: ', queryFinished - start);
                    console.log('time - process:', new Date().getTime() - queryFinished);
                    searchState.searching(false);
                });
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
                // input: params.searchInput(),
                terms: terms,
                withPrivateData: searchState.includePrivateData(),
                withPublicData: searchState.includePublicData(),
                start: start,
                pageSize: searchState.pageSize(),
                username: runtime.service('session').getUsername()
            };
        });

        var lastQuery = null;
        searchQuery.subscribe(function (newValue) {
            if (utils.isEqual(newValue, lastQuery)) {
                console.warn('duplicate query - why?', newValue, lastQuery);
                return;
            }
            console.log('search query changed?', utils.isEqual(newValue, lastQuery), JSON.parse(JSON.stringify(newValue)), JSON.parse(JSON.stringify(lastQuery)));
            lastQuery = newValue;
            runSearch(newValue);
        });

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

        return {
            searchState: searchState,
            view: params.view,
            overlayComponent: params.overlayComponent,
            selectedObjects: params.selectedObjects,

            // ACTIONS
            // doNextPage: doNextPage,
            // doPreviousPage: doPreviousPage
            doToggleShowObjects: doToggleShowObjects,
            doToggleShowMatches: doToggleShowMatches,
            doToggleShowDetails: doToggleShowDetails
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
                    withPrivateData: 'searchState.includePrivateData',
                    withPublicData: 'searchState.includePublicData',
                    searchStatus: 'searchState.status'
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
                    // doNextPage: 'doNextPage',
                    // doPreviousPage: 'doPreviousPage',
                    view: 'view',
                    overlayComponent: 'overlayComponent',
                    selectedObjects: 'selectedObjects',
                    doToggleShowObjects: 'doToggleShowObjects',
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