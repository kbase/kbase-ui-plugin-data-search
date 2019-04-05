define(['knockout', 'kb_knockout/lib/generators', './components/main', './lib/types', './lib/nanoBus'], function (
    ko,
    gen,
    MainComponent,
    Types,
    NanoBus
) {
    'use strict';

    function factory(config) {
        var hostNode,
            container,
            runtime = config.runtime,
            types = Types.make({
                runtime: runtime
            });

        var initialQuery;

        function template() {
            return gen
                .component({
                    name: MainComponent.name(),
                    params: {
                        initialQuery: 'initialQuery'
                    }
                })
                .join('');
        }

        var appBus = NanoBus.make();

        // Root viewmodel
        function viewModel() {
            return {
                appBus: appBus,
                runtime: runtime,
                types: types,
                initialQuery: initialQuery,
                // TODO: generate from the registered types.
                labels: {
                    narrative: {
                        singular: 'Narrative',
                        plural: 'Narratives'
                    },
                    genome: {
                        singular: 'Genome',
                        plural: 'Genomes'
                    },
                    assembly: {
                        singular: 'Assembly',
                        plural: 'Assemblies'
                    },
                    pairedendlibrary: {
                        singular: 'Paired End Library',
                        plural: 'Paired End Libraries'
                    },
                    singleendlibrary: {
                        singular: 'Single End Library',
                        plural: 'Single End Libraries'
                    },
                    fbamodel: {
                        singular: 'FBA Model',
                        plural: 'FBA Models'
                    },
                    media: {
                        singular: 'Media',
                        plural: 'Media'
                    },
                    taxon: {
                        singular: 'Taxon',
                        plural: 'Taxa'
                    },
                    tree: {
                        singular: 'Tree',
                        plural: 'Trees'
                    }
                }
            };
        }
        function attach(node) {
            hostNode = node;
            container = hostNode.appendChild(document.createElement('div'));
            container.style.flex = '1 1 0px';
            container.style.display = 'flex';
            container.style['flex-direction'] = 'column';
            container.setAttribute('data-k-b-testhook-plugin', 'data-search');

            return null;
        }
        function start(params) {
            initialQuery = params.q;
            return types
                .start()
                .then(function () {
                    return appBus.start();
                })
                .then(function () {
                    container.innerHTML = template();
                    ko.applyBindings(viewModel, container, function (context) {
                        context.runtime = runtime;
                    });

                    runtime.send('ui', 'setTitle', 'Data Search (BETA)');
                });
        }

        function stop() {
            return appBus.stop();
        }
        function detach() {
            if (hostNode && container) {
                hostNode.removeChild(container);
            }
        }

        /* Returning the widget
        The widget is returned as a simple JS object. In this case we have also hardened the object
        by usinng Object.freeze, which ensures that properties may not be added or modified.
        */
        return Object.freeze({
            attach: attach,
            start: start,
            stop: stop,
            detach: detach
        });
    }

    return {
        make: factory
    };
});
