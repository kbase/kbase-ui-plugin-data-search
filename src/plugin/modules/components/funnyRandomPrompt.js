define([
    'knockout-plus',
    'kb_common/html'
], function (
    ko,
    html
) {
    'use strict';

    var t = html.tag,
        span = t('span'),
        div = t('div');

    function viewModel(params) {

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
        return div([
            html.loading(prompt)
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