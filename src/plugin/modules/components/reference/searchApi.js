define([
    '../../lib/rpc'
], function (
    Rpc
) {
    'use strict';

    function factory(config) {
        var runtime = config.runtime;
        var rpc = Rpc.make({
            runtime: runtime
        });

        function objectSearch(arg) {
            // console.log('searchApi.search', arg);
            var query = arg.query;
            var start = arg.page * arg.pageSize;
            var count = arg.pageSize;
            // var withPrivate = arg.withPrivate ?  1 : 0;
            // var withPublic = arg.withPublic ? 1 : 0;

            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: ['refdata'],
                    source_tags_blacklist: 0
                },
                pagination: {
                    start: start,
                    count: count
                },
                post_processing: {
                    ids_only: 0,
                    skip_info: 0,
                    skip_keys: 1,
                    skip_data: 0,
                    include_highlight: 1
                },
                access_filter: {
                    with_private: 0,
                    with_public: 1
                },
                sorting_rules: [{
                    is_timestamp: 1,
                    is_object_name: 0,
                    key_name: 'date',
                    descending: 1
                }]
            };

            return rpc.call('KBaseSearchEngine', 'search_objects', param)
                .spread(function (result) {
                    return result;
                });
        }

        function typeSearch(arg) {
            var query = arg.query;
            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: ['refdata'],
                    source_tags_blacklist: 0
                },
                access_filter: {
                    with_private: 0,
                    with_public: 1
                }
            };
            return rpc.call('KBaseSearchEngine', 'search_types', param)
                .spread(function (result) {
                    return result;
                });
        }

        return {
            objectSearch: objectSearch,
            typeSearch: typeSearch
        };
    }

    return {
        make: factory
    };
});