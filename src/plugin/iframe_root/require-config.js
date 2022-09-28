(function (global) {
    'use strict';

    function getParamsFromIFrame(global) {
        if (!global.frameElement.hasAttribute('data-params')) {
            throw new Error('No params found in window!!');
        }
        return JSON.parse(decodeURIComponent(global.frameElement.getAttribute('data-params')));
    }

    function makeCacheBusterKey(buildInfo, developMode) {
        // NB developMode not implemented yet, so always defaults
        // to the gitCommitHash
        if (developMode) {
            return String(new Date().getTime());
        } else {
            return buildInfo.git.commitHash;
        }
    }

    const params = getParamsFromIFrame(global);
    const cacheBusterKey = makeCacheBusterKey(params.buildInfo, params.developMode);

    // Get the path to the index file. Since require-config is loaded directly by
    // index.html, the location is to index.html. We slice off index.html to get
    // the directory pathy.
    const pathList = global.location.pathname.split('/').slice(0, -1);

    // All javascript modules are located in the modules directory.
    pathList.push('modules');
    const baseUrl = pathList.join('/');

    global.require = {
        baseUrl,
        urlArgs: 'cb=' + cacheBusterKey,
        paths: {
            bluebird: 'vendor/bluebird/bluebird',
            bootstrap: 'vendor/bootstrap/bootstrap',
            bootstrap_css: 'vendor/bootstrap/css/bootstrap',
            css: 'vendor/require-css/css',
            dagre: 'vendor/dagre/dagre',
            d3: 'vendor/d3/d3',
            d3_sankey: 'vendor/d3-plugins-sankey/sankey',
            d3_sankey_css: 'vendor/d3-plugins-sankey/sankey',
            datatables: 'vendor/datatables/jquery.dataTables',
            datatables_css: 'vendor/datatables/jquery.dataTables',
            datatables_bootstrap_css: 'vendor/datatables-bootstrap3-plugin/datatables-bootstrap3',
            datatables_bootstrap: 'vendor/datatables-bootstrap3-plugin/datatables-bootstrap3',
            dompurify: 'vendor/dompurify/purify',
            fileSaver: 'vendor/file-saver/FileSaver',
            font_awesome: 'vendor/font-awesome/css/font-awesome',
            handlebars: 'vendor/handlebars/handlebars',
            highlight_css: 'vendor/highlightjs/default',
            highlight: 'vendor/highlightjs/highlight.pack',
            jquery: 'vendor/jquery/jquery',
            'jquery-ui': 'vendor/jquery-ui/jquery-ui',
            'js-yaml': 'vendor/js-yaml/js-yaml',
            kb_common: 'vendor/kbase-common-js',
            kb_common_ts: 'vendor/kbase-common-ts',
            kb_lib: 'vendor/kbase-common-es6',
            kb_service: 'vendor/kbase-service-clients-js',
            kb_knockout: 'vendor/kbase-knockout-extensions-es6',
            kb_widget: 'vendor/kbase-ui-widget',
            'knockout-arraytransforms': 'vendor/knockout-arraytransforms/knockout-arraytransforms',
            'knockout-projections': 'vendor/knockout-projections/knockout-projections',
            'knockout-switch-case': 'vendor/knockout-switch-case/knockout-switch-case',
            'knockout-validation': 'vendor/knockout-validation/knockout.validation',
            'knockout-mapping': 'vendor/bower-knockout-mapping/knockout.mapping',
            knockout: 'vendor/knockout/knockout',
            marked: 'vendor/marked/marked',
            md5: 'vendor/spark-md5/spark-md5',
            moment: 'vendor/moment/moment',
            numeral: 'vendor/numeral/numeral',
            preact: 'vendor/preact/preact.umd',
            text: 'vendor/requirejs-text/text',
            underscore: 'vendor/underscore/underscore-umd',
            uuid: 'vendor/pure-uuid/uuid',
            yaml: 'vendor/requirejs-yaml/yaml',
            json: 'vendor/requirejs-json/json'
        },
        shim: {
            bootstrap: {
                deps: ['jquery', 'css!bootstrap_css']
            },
            highlight: {
                deps: ['css!highlight_css']
            },
            d3_sankey: {
                deps: ['d3', 'css!d3_sankey_css']
            }
        }
    };
})(window);
