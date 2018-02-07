define([
    'knockout-plus',
    'kb_common/html',
    './data',
    './header',
    './toolbar',
    './results'
], function (
    ko,
    html,
    Data,
    HeaderComponent,
    ToolbarComponent,
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
        header: {
            flex: '0 0 25px',
            display: 'flex',
            flexDirection: 'column'
        },
        results: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column',
            border: '1px silver solid'
        }

    });

    function viewModel(params, componentInfo) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;

        // the search view model...
        var searchState = {
            // INPUT

            includePrivateData: ko.observable(true),
            includePublicData: ko.observable(true),

            pageSize: ko.observable(20),

            // OUTPUT
            status: ko.observable('none'),

            searching: ko.observable(false),

            // holds search result items for display
            buffer: ko.observableArray(),
           
            // position of first item in the buffer in the total search results space.
            firstItemPosition: ko.observable(),

            // Is the total search results space truncated due to limitations of the back end?
            isTruncated: ko.observable(),

            // The total # of items (may be estimated) in the search results space.
            totalResultCount: ko.observable(),

            resultCount: ko.observable(),

            // Summary by type
            // TODO: an array, or a map of observables...
            summary: ko.observable(),

            start: ko.observable()
        };

        var data = Data.make({
            runtime: runtime,
            pageSize: searchState.pageSize(),
            maxBufferSize: 100
        });

        

        // var result = data.search({
        //     start: 25
        // });
        console.log('params', params);

        function runSearch(query) {
            console.log('run search with', query);
            // ensure search is runnable
            if (!query.input) {
                searchState.status('none');
                searchState.buffer(null);
                searchState.firstItemPosition(null);
                searchState.isTruncated(null);
                searchState.totalResultCount(null);
                searchState.summary(null);
                searchState.resultCount(null);
                return;
            }


            console.log('run search', query);
            searchState.searching(true);
            searchState.status('searching');
            return data.search({
                start: query.start,
                input: query.input
            })
                .then(function (result) {
                    console.log('result', result);
                    searchState.buffer(result.items);
                    searchState.firstItemPosition(result.first);
                    searchState.isTruncated(result.isTruncated);
                    searchState.totalResultCount(result.summary.total);
                    searchState.summary(result.summary.byType);
                    searchState.resultCount(result.summary.narrativeCount);
                    searchState.status('success');
                })
                .finally(function () {
                    searchState.searching(false);
                });
        }
        

        var searchQuery = ko.pureComputed(function () {
            return {
                input: params.searchInput(),
                withPrivateData: searchState.includePrivateData(),
                withPublicData: searchState.includePublicData(),
                start: searchState.start(),
                pageSize: searchState.pageSize()
            };
        });

        searchQuery.subscribe(function (newValue) {
            runSearch(newValue);
        });


        // ACTIONS
        function doNextPage() {
            var first = searchState.firstItemPosition();
            if (typeof first !== 'number') {
                return;
            }
            var total = searchState.totalResultCount();
            if (typeof total !== 'number') {
                return;
            }
            var pageSize = searchState.pageSize();
            var last = total - pageSize;
            if (last < 0) {
                last = 0;
            }
            var newStart = first + pageSize;
            if (newStart > last) {
                newStart = last;
            }
            // runSearch({
            //     start: newStart
            // });
            searchState.start(newStart);
        }

        function doPreviousPage() {
            var first = searchState.firstItemPosition();
            if (typeof first !== 'number' || first === 0) {
                return;
            }
            var pageSize = searchState.pageSize();
            var newStart;
            if (first <= pageSize) {
                newStart = 0;
            } else {
                newStart = first - pageSize;
            }
            // runSearch({
            //     start: newStart
            // });
            searchState.start(newStart);
        }

        // runSearch({
        //     input: params.searchInput(),            
        //     start: 0
        // });

        return {
            searchState: searchState,
            view: params.view,
            overlayComponent: params.overlayComponent,
            selectedObjects: params.selectedObjects,

            // ACTIONS
            doNextPage: doNextPage,
            doPreviousPage: doPreviousPage
        };
    }

    function template() {
        return div({
            class: styles.classes.main
        }, [
            styles.sheet,
            div({
                class: styles.classes.toolbar
            }, ko.kb.komponent({
                name: ToolbarComponent.name(),
                params: {
                    typeCounts: 'searchState.summary',
                    resultCount: 'searchState.resultCount',
                    includePrivateData: 'searchState.includePrivateData',
                    includePublicData: 'searchState.includePublicData'
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
                    doNextPage: 'doNextPage',
                    doPreviousPage: 'doPreviousPage',
                    view: 'view',
                    overlayComponent: 'overlayComponent',
                    selectedObjects: 'selectedObjects'
                }
            }))
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