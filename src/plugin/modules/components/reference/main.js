define([
    'knockout-plus',
    'kb_common/html',
    './header',
    './toolbar',
    './navbar',
    './results',
    './data'
], function (
    ko,
    html,
    HeaderComponent,
    ToolbarComponent,
    NavbarComponent,
    ResultsComponent,
    Data
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

        var includePrivateData = ko.observable(true);

        var includePublicData = ko.observable(true);

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

        // the search view model...
        var searchState = SearchState();

        var data = Data.make({
            runtime: runtime,
            pageSize: searchState.pageSize(),
            maxBufferSize: 100
        });

        function runSearch(query) {
            // ensure search is runnable
            if (!query.input) {
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
            return data.search({
                start: query.start,
                input: query.input,
                terms: query.terms
            })
                .then(function (result) {

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
                    // searchState.firstItemPosition(result.first);
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
                .finally(function () {
                    searchState.searching(false);
                });
        }
        

        var searchQuery = ko.pureComputed(function () {
            var page = searchState.page();
            var start;
            if (page) {
                start = (page - 1) * searchState.pageSize();
            } else {
                start = 0;
            }


            var input = params.searchInput();
            var terms;
            if (input) {
                terms = input.split(/\s+/)
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
            } else {
                terms = [];
            }

            return {
                input: params.searchInput(),
                terms: terms,
                withPrivateData: searchState.includePrivateData(),
                withPublicData: searchState.includePublicData(),
                start: start,
                pageSize: searchState.pageSize()
            };
        });

        searchQuery.subscribe(function (newValue) {
            runSearch(newValue);
        });

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

        return {
            searchState: searchState,
            view: params.view,
            overlayComponent: params.overlayComponent,
            selectedObjects: params.selectedObjects,

            // ACTIONS
            // doNextPage: doNextPage,
            // doPreviousPage: doPreviousPage
            doToggleShowMatches: doToggleShowMatches,
            doToggleShowDetails: doToggleShowDetails
        };
    }

    function xviewModel(params) {
        var context = ko.contextFor(componentInfo.element);
        var runtime = context['$root'].runtime;

        var searchState = SearchState();

        var data = Data.make({
            runtime: runtime,
            pageSize: searchState.pageSize(),
            maxBufferSize: 100
        });

        var items = [];
        for (var i = 0; i < 100; i += 1) {
            items.push({
                rowNmber: i,
                type: {
                    id: 'genome',
                    label: 'Genome'
                },
                name: 'GCF_000357445.2',
                ref: {
                    workspaceId: 1,
                    objectId: 1,
                    version: 1
                },
                scientificName: 'Escherichia coli',
                date: new Date('1/1/1970'),
               
                matchClass: {
                    id: 'object',
                    viewable: true,
                    copyable: true,
                    ref: {
                        workspaceId: 1,
                        objectId: 1,
                        version: 1
                    }
                },
                matches: [
                    {
                        type: 'taxonomy',
                        highlight: 'Escherichia <em>coli</em> KTE198'
                    }
                ],
                detail: [
                    {
                        id: 'domain',
                        label: 'Domain',
                        value: 'Bacteria'
                    },
                    {
                        id: 'taxonomy',
                        label: 'Taxonomy',
                        value: 'Escherichia coli KTE198'
                    },
                    {
                        id: 'dna_length',
                        label: 'DNA Length',
                        value: '5,212,450'
                    },
                    {
                        id: 'contig_count',
                        label: '# Contigs',
                        value: '108'
                    },
                    {
                        id: 'name',
                        label: 'Name',
                        value: 'Escherichia coli KTE198'
                    },
                    {
                        id: 'id',
                        label: 'ID',
                        value: 'KBase Central Store: 1181744.3'
                    }
                ]
            });
        }
        return {
            items: items,
            view: params.view,
            overlayComponent: params.overlayComponent
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
                    resultCount: 'searchState.totalSearchHits'
                }
            })),
            div({
                class: styles.classes.navbar
            }, ko.kb.komponent({
                name: NavbarComponent.name(),
                params: {
                    page: 'searchState.page',
                    totalPages: 'searchState.totalPages'
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

    function xtemplate() {
        return div({
            class: styles.classes.main
        }, [
            styles.sheet,
            div({
                class: styles.classes.toolbar
            }, ko.kb.komponent({
                name: ToolbarComponent.name(),
                params: {}
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
                    items: 'items',
                    view: 'view',
                    overlayComponent: 'overlayComponent'
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