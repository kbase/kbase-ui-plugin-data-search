define([
    './rpc',
    'lib/jsonrpc/1.1/ServiceClient'
], (
    Rpc,
    ServiceClient
) => {
    'use strict';

    const REQUEST_TIMEOUT = 60000;

    function factory(config) {
        const runtime = config.runtime;

        const searchAPI = new ServiceClient({
            module: 'KBaseSearchEngine',
            url: runtime.config('services.SearchAPI2Legacy.url'),
            token: runtime.service('session').getAuthToken(),
            timeout: REQUEST_TIMEOUT
        });

        function referenceObjectSearch(arg) {
            const query = arg.query;
            const start = arg.page * arg.pageSize;
            const count = arg.pageSize;

            const params = {
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

            return searchAPI.callFunc('search_objects', [params])
                .then(([result]) => {
                    return result;
                });
        }

        function referenceObjectSearchTotal(arg) {
            const query = arg.query;
            const param = {
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

            return searchAPI.callFunc('search_objects', [param])
                .then(([result]) => {
                    return result.total;
                });
        }

        function narrativeObjectSearch(arg) {
            const query = arg.query;
            const start = arg.page * arg.pageSize;
            const count = arg.pageSize;
            const withPrivate = arg.withPrivateData ? 1 : 0;
            const withPublic = arg.withPublicData ? 1 : 0;
            const param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: ['refdata', 'noindex'],
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
                    include_highlight: 1,
                    add_narrative_info: 1
                },
                access_filter: {
                    with_private: withPrivate,
                    with_public: withPublic
                },
                sorting_rules: [{
                    is_object_property: 0,
                    property: 'access_group_id',
                    ascending: 0
                }, {
                    is_object_property: 0,
                    property: 'type',
                    ascending: 1
                }]
            };

            return searchAPI.callFunc('search_objects', [param])
                .then((result) => {
                    return result[0];
                })
                .catch((err) => {
                    console.error('narrativeObjectSearch error', err);
                    throw err;
                });
        }

        function narrativeObjectSearchTotal(arg) {
            const query = arg.query;
            const withPrivate = arg.withPrivateData ? 1 : 0;
            const withPublic = arg.withPublicData ? 1 : 0;
            const param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: ['refdata', 'noindex'],
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

            return searchAPI.callFunc('search_objects', [param])
                .then(([result]) => {
                    return result.total;
                });
        }

        function typeSearch(arg) {
            const query = arg.query;
            const withPrivate = arg.withPrivateData ? 1 : 0;
            const withPublic = arg.withPublicData ? 1 : 0;
            const param = {
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    source_tags: null,
                    source_tags_blacklist: null
                },
                access_filter: {
                    with_private: withPrivate,
                    with_public: withPublic
                }
            };
            switch (arg.dataSource) {
            case 'narratives':
                param.match_filter.source_tags = ['refdata', 'noindex'];
                param.match_filter.source_tags_blacklist = 1;
                break;
            case 'referenceData':
                param.match_filter.source_tags = ['refdata'];
                param.match_filter.source_tags_blacklist = 0;
                break;
            default:
                throw new Error('Invalid data source: ' + arg.dataSource);
            }

            return searchAPI.callFunc('search_types', [param])
                .then(([result]) => {
                    return result;
                });
        }

        return {
            referenceObjectSearch,
            narrativeObjectSearch,
            referenceObjectSearchTotal,
            narrativeObjectSearchTotal,
            typeSearch
        };
    }

    return {
        make: factory
    };
});
