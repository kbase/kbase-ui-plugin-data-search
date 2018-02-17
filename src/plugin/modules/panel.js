define([
    'bluebird',
    'knockout-plus',
    'kb_common/html',
    'kb_common/bootstrapUtils',
    './lib/utils',
    './components/main',
    './lib/types'
], function (
    Promise, 
    ko,
    html, 
    BS,
    Utils,
    MainComponent,
    Types
) {
    'use strict';
    
    function factory(config) {
        var hostNode, container,
            runtime = config.runtime,
            types = Types.make({
                runtime: runtime
            });

        var styles = html.makeStyles({
            panel: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        });

        function template() {
            return ko.kb.komponent({
                name: MainComponent.name(),
                params: {}
            });
        }

        // Root viewmodel
        function viewModel() {
            return {
                runtime: runtime,
                types: types,
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
                    }
                }
            };
        }

        function attach(node) {
            hostNode = node;
            container = hostNode.appendChild(document.createElement('div'));
            container.classList.add(styles.classes.panel);

            return null;
        }
        function start() {
            return types.start()
                .then(function () {
                    container.innerHTML = [styles.sheet, template()].join('');
                    ko.applyBindings(viewModel, container, function (context) {
                        context.runtime = runtime;
                    });
        
                    runtime.send('ui', 'setTitle', 'Data Search');
                });            
        }

        function stop() {
            
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