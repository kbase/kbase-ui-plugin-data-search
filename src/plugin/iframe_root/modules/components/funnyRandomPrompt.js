define(['kb_knockout/registry', 'kb_lib/html', 'kb_lib/htmlBuilders'], function (reg, html, htmlBuilders) {
    'use strict';

    var t = html.tag,
        span = t('span'),
        div = t('div');

    function viewModel() {
        function getRandomPrompt() {
            var prompts = [
                'Hunting for data',
                'Looking for stuff',
                'Searching for matching objects',
                'Querying for information',
                'Probing for interesting things'
            ];
            return prompts[Math.floor(Math.random() * prompts.length)];
        }

        var funnyPrompt = getRandomPrompt();

        return {
            funnyPrompt: funnyPrompt
        };
    }

    function template() {
        var prompt = span({
            dataBind: {
                text: 'funnyPrompt'
            }
        });
        return div([htmlBuilders.loading(prompt)]);
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});
