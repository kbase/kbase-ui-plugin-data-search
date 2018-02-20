define([
    './rpc'
], function (
    Rpc
) {
    'use strict';

    function factory(config) {
        var runtime = config.runtime;
        var rpc = Rpc.make({
            runtime: runtime
        });

        function referenceObjectSearch(arg) {
            var query = arg.query;
            var start = arg.page * arg.pageSize;
            var count = arg.pageSize;

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
                    skip_keys: 0,
                    skip_data: 0,
                    include_highlight: 1
                },
                access_filter: {
                    with_private: 0,
                    with_public: 1
                },
                sorting_rules: [{
                    is_object_property: 0,
                    property: 'timestamp',
                    ascending: 0
                }]
            };

            return rpc.call('KBaseSearchEngine', 'search_objects', param)
                .spread(function (result) {
                    return result;
                });
        }

        function referenceObjectSearchTotal(arg) {
            var query = arg.query;

            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: ['refdata'],
                    source_tags_blacklist: 0
                },
                pagination: {
                    start: 0,
                    count: 0
                },
                post_processing: {
                    ids_only: 1,
                    skip_info: 1,
                    skip_keys: 1,
                    skip_data: 1,
                    include_highlight: 1
                },
                access_filter: {
                    with_private: 0,
                    with_public: 1
                }
            };

            return rpc.call('KBaseSearchEngine', 'search_objects', param)
                .spread(function (result) {
                    return result.total;
                });
        }

        function narrativeObjectSearch(arg) {
            var query = arg.query;
            var start = arg.page * arg.pageSize;
            var count = arg.pageSize;
            var withPrivate = arg.withPrivateData ?  1 : 0;
            var withPublic = arg.withPublicData ? 1 : 0;

            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: ['refdata'],
                    source_tags_blacklist: 1
                },
                pagination: {
                    start: start,
                    count: count
                },
                post_processing: {
                    ids_only: 0,
                    skip_info: 0,
                    skip_keys: 0,
                    skip_data: 0,
                    include_highlight: 1
                },
                access_filter: {
                    with_private: withPrivate,
                    with_public: withPublic
                },
                sorting_rules: [{
                    is_object_property: 0,
                    property: 'access_group_id',
                    ascending: 0
                }]
            };

            return rpc.call('KBaseSearchEngine', 'search_objects', param)
                .spread(function (result) {
                    return result;
                });
        }

        function narrativeObjectSearchTotal(arg) {
            var query = arg.query;
            var withPrivate = arg.withPrivateData ?  1 : 0;
            var withPublic = arg.withPublicData ? 1 : 0;

            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: ['refdata'],
                    source_tags_blacklist: 1
                },
                pagination: {
                    start: 0,
                    count: 0
                },
                post_processing: {
                    ids_only: 1,
                    skip_info: 1,
                    skip_keys: 1,
                    skip_data: 1,
                    include_highlight: 0
                },
                access_filter: {
                    with_private: withPrivate,
                    with_public: withPublic
                }
            };

            return rpc.call('KBaseSearchEngine', 'search_objects', param)
                .spread(function (result) {
                    return result.total;
                });
        }

        function typeSearch(arg) {
            var query = arg.query;
            var withPrivate = arg.withPrivateData ?  1 : 0;
            var withPublic = arg.withPublicData ? 1 : 0;

            var param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: ['refdata'],
                    source_tags_blacklist: null
                },
                access_filter: {
                    with_private: withPrivate,
                    with_public: withPublic
                }
            };
            switch (arg.dataSource) {
            case 'narratives':
                param.match_filter.source_tags_blacklist = 1;
                break;
            case 'referenceData':
                param.match_filter.source_tags_blacklist = 0;
                break;
            default:
                throw new Error('Invalid data source: ' + arg.dataSource);
            }

            return rpc.call('KBaseSearchEngine', 'search_types', param)
                .spread(function (result) {
                    return result;
                });
        }

        return {
            referenceObjectSearch: referenceObjectSearch,
            narrativeObjectSearch: narrativeObjectSearch,
            referenceObjectSearchTotal: referenceObjectSearchTotal,
            narrativeObjectSearchTotal: narrativeObjectSearchTotal,
            typeSearch: typeSearch
        };
    }

    return {
        make: factory
    };
});