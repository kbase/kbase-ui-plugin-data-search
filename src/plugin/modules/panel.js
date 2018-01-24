define([
    'bluebird',
    'knockout-plus',
    'kb_common/html',
    'kb_common/bootstrapUtils',
    './lib/utils',
    './components/main'
], function (
    Promise, 
    ko,
    html, 
    BS,
    Utils,
    MainComponent
) {
    'use strict';
    
    var t = html.tag,
        div = t('div');

    function factory(config) {
        var hostNode, container,
            runtime = config.runtime;

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


        function viewModel() {
            return {};
        }

        function attach(node) {
            hostNode = node;
            container = hostNode.appendChild(document.createElement('div'));
            container.classList.add(styles.classes.panel);

            return null;
        }
        function start(params) {
            container.innerHTML = [styles.sheet, template()].join('');
            ko.applyBindings(viewModel, container);

            runtime.send('ui', 'setTitle', 'Data Search');
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