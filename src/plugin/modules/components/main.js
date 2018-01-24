define([
    'knockout-plus',
    'kb_common/html',
    './searchBar',
    './toolBar',
    './results'
], function (
    ko,
    html,
    SearchBarComponent,
    ToolBarComponent,
    SearchResultsComponent
) {
    'use strict';

    var t = html.tag,
        div = t('div');

    function viewModel(params) {
        // OVERLAY
        var overlayComponent = ko.observable();
        // var showOverlay = ko.observable();

        // showOverlay.subscribe(function (newValue) {
        //     overlayComponent(newValue);
        // });

        // SEARCH INPUTS
        var searchInput = ko.observable();

        var searchHistory = ko.observableArray();

        var resultsView = ko.observable('list');

        return {
            // search: {

            //     // Control the overlay.
            //     showOverlay: showOverlay
            // },
            // showOverlay: showOverlay,
            searchInput: searchInput,
            searchHistory: searchHistory,
            overlayComponent: overlayComponent,
            resultsView: resultsView
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
            // border: '1px red solid'
        },
        filterArea: {
            flex: '0 0 50px',
            textAlign: 'left'
            // border: '1px blue dashed'
        },
        resultArea: {
            flex: '1 1 0px',
            // border: '1px green dotted',
            display: 'flex',
            flexDirection: 'column'
        },
        activeFilterInput: {
            // fontFamily: 'monospace',
            backgroundColor: 'rgba(209, 226, 255, 1)',
            color: '#000'
        },
        modifiedFilterInput: {
            // fontFamily: 'monospace',
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
        return ko.kb.komponent({
            name: SearchBarComponent.name(),
            params: {
                // search: 'search'
                searchInput: 'searchInput',
                searchHistory: 'searchHistory',
                overlayComponent: 'overlayComponent'
            }
        });
    }

    function buildToolbarArea() {
        return ko.kb.komponent({
            name: ToolBarComponent.name(),
            params: {
                // search: 'search'
                resultsView: 'resultsView'
            }
        });
    }

    function buildResultsArea() {
        return ko.kb.komponent({
            name: SearchResultsComponent.name(),
            params: {
                // search: 'search'
                
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
                styles.sheet,
                // The search input area
                div({
                    class: styles.classes.searchArea
                }, buildInputArea()),
                // The search filter area
                div({
                    class: styles.classes.filterArea
                }, buildToolbarArea()),
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
            viewModel: viewModel,
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});