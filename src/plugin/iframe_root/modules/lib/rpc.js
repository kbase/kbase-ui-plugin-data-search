define([
    'kb_common/jsonRpc/dynamicServiceClient',
    'kb_common/jsonRpc/genericClient',
    'kb_common/jsonRpc/exceptions',
    './errors'
], function (
    DynamicService,
    GenericClient,
    exceptions,
    errors
) {
    'use strict';
    function factory(config) {
        var runtime = config.runtime;

        // TODO: this should go in to the ui services
        function call(moduleName, functionName, params, urlKey) {
            const serviceConfig = runtime.config(`services.${moduleName}`);
            const module = serviceConfig.module || moduleName;
            const url = runtime.config(['services', moduleName, urlKey || 'url'].join('.'));
            const token = runtime.service('session').getAuthToken();
            var client;
            if (url) {
                client = new GenericClient({module, url, token});
            } else {
                client = new DynamicService({
                    url: runtime.config('services.ServiceWizard.url'),
                    token, module
                });
            }
            return client.callFunc(functionName, [
                params
            ])
                .catch(function (err) {
                    if (err instanceof exceptions.AjaxError) {
                        console.error('AJAX Error', err);
                        // let message = 'An error was encountered connecting to a service';
                        throw new errors.DataSearchError('AJAX Error: ' + err.name, err.code, err.message, null, {
                            originalError: err
                        });
                    } else if (err instanceof exceptions.RpcError) {
                        console.error('RPC Error', err);
                        const message = 'An error was encountered running an rpc method';
                        const detail = 'The module is "' + err.module + '", the method "' + err.func + '", ' +
                                      'the error returned from the service is "' + (err.message || 'unknown') + '"';
                        throw new errors.DataSearchError('service-call-error', err.name, message, detail , {
                            originalError: err
                        });
                    } else {
                        throw new errors.DataSearchError('rpc-call', err.name, err.message, null, {
                            originalError: err
                        });
                    }
                });
        }

        return {
            call: call
        };
    }

    return {
        make: factory
    };
});
