define([
    'knockout-plus',
    'kb_common/html',
    'css!./tabset.css'
], function (
    ko,
    html
) {
    'use strict';

    var t = html.tag,
        ul = t('ul'),
        li = t('li'),
        a = t('a'),
        span = t('span'),
        div = t('div');

    function viewModel(params) {

        var bus = params.bus;

        var tabsetId = html.genId();
        var tabs = ko.observableArray();
        var tabClasses = ko.observableArray(['nav', 'nav-tabs']);
        var activeTab = ko.observable();

        // Bus -- ??!!
        // TODO: provide the bus on the top level of the params...
        bus.on('add-tab', function (message) {
            addTab(message.tab);
        });
        bus.on('select-tab', function (message) {
            if (typeof message === 'number') {
                doSelectTab(tabs()[message]);
            }
        });

        // Initialize Tabs

        if (params.tabs) {
            params.tabs.forEach(function (tab) {
                tabs.push(makeTab(tab));
            });
        }

        if (!('active' in params)) {
            if (tabs().length > 0) {
                tabs()[0].active(true);
                activeTab(tabs()[0]);
            }
        }

        function doCloseTab(tab) {
            var index = tabs.indexOf(tab);
            tabs.remove(tab);
            if (index === 0) {
                return;
            }
            // if not the selected tab, nothing else to do.
            if (tab !== activeTab()) {
                return;
            }

            // If no closable tabs, we go back to the first tab.
            var currentTab;
            var totalTabs = tabs().length;
            var closableTabs = tabs().reduce(function (closableCount, tab) {
                return closableCount + (tab.closable() ? 1 : 0);
            }, 0);
            var nonclosableTabs = totalTabs - closableTabs;
            if (closableTabs > 0) {
                // avoid opening up the last unclosable tab if there are closables left.
                if (index === nonclosableTabs) {
                    currentTab = tabs()[index + 1];
                } else {
                    currentTab = tabs()[index - 1];
                }
            } else {
                currentTab = tabs()[0];
            }

            activateTab(currentTab);
            currentTab.active(true);
        }

        // bootstrap tabs implemeneted in knockout. tricky...
        function makeTab(params) {
            if (!params.component.params) {
                params.component.params = {};
            }
            // params.component.params = params;
            return {
                label: params.label,
                component: params.component,
                content: params.content,
                active: ko.observable(false),
                closable: ko.observable(params.closable || false)
            };
        }

        function addTab(tab, activate) {
            var newTab = makeTab(tab);
            tabs.push(newTab);
            if (activate) {
                deactivateCurrentTab();
                activateTab(newTab);
            }
        }

        function activateTab(tab) {
            tab.active(true);
            activeTab(tab);
        }

        function deactivateCurrentTab() {
            if (activeTab()) {
                activeTab().active(false);
            }
        }

        function doSelectTab(tab) {
            deactivateCurrentTab();
            activateTab(tab);
        }

        bus.send('ready');

        return {
            // JUST TABS
            tabs: tabs,
            tabClasses: tabClasses,
            tabsetId: tabsetId,
            doCloseTab: doCloseTab,
            doSelectTab: doSelectTab,
            addTab: addTab
        };
    }

    function buildTab() {
        return li({
            role: 'presentation',
            class: 'tabs',
            dataBind: {
                css: {
                    active: 'active'
                }
            }
        }, [
            a({
                dataBind: {
                    click: '$component.doSelectTab'
                },
                role: 'tab',
                style: {
                    display: 'inline-block'
                }
            }, [                
                span({
                    dataBind: {
                        text: 'label'
                    }
                }),
                '<!-- ko if: closable -->',
                span({
                    class: '-button',
                    dataBind: {
                        click: '$component.doCloseTab'
                    }
                }, span({
                    class: 'fa fa-times',
                })),
                '<!-- /ko -->'
            ]),
        ]);
    }

    function buildTabPanel() {
        return [
            '<!-- ko if: active -->',
            div({
                dataBind: {
                    attr: {
                        active: 'active'
                    },
                    css: { 
                        in: 'active',
                        active: 'active'
                    }
                },
                class: 'tab-pane fade',
                role: 'tabpanel'
            }, [
                '<!-- ko if: $data.component -->',
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'column'
                    },
                    dataBind: {
                        component: {
                            name: 'component.name',
                            params: 'component.params'
                        }
                    }
                }),
                '<!-- /ko -->',
                '<!-- ko if: $data.content -->',
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'column'
                    },
                    dataBind: {
                        html: '$data.content'
                    }
                }),
                '<!-- /ko -->'
            ]),
            '<!-- /ko -->'
        ];
    }

    function template() {
        return div({
            class: 'component-tabset'
        }, [
            ul({
                dataBind: {
                    attr: {
                        id: 'tabsetId'
                    },
                    foreach: 'tabs'
                },
                class: 'kb-tabs',
                role: 'tablist'
            }, buildTab()),
            div({
                class: 'tab-content',
                style: {
                    position: 'relative'
                },
                dataBind: {
                    foreach: 'tabs'
                }
            },  buildTabPanel())
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