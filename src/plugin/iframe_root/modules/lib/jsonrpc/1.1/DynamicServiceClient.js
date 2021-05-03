/*jslint white:true,browser:true,jsnomen:true*/
define([
    './JSON-RPC_1.1'
], function (jsonRpc) {
    'use strict';

    class DynamicServiceClient {
        constructor({module, url, timeout, version, token}) {
            this.module = module;
            this.token = token;
            this.timeout = timeout;
            this.url = url;
            this.version = version;

            if (!module) {
                throw new Error('"module" is required, it was not provided');
            }
            if (!timeout) {
                throw new Error('"timeout" is required; it was not provided');
            }
            if (!url) {
                throw new Error('"url" for service discovery is required; it was not provided');
            }
        }

        callFunc(funcName, params) {
            const options = {
                authorization: this.token
            };

            const serviceLookupParams = [{
                module_name: this.module,
                version: this.version || null
            }];
            return jsonRpc.request(this.url, 'ServiceWizard', 'get_service_status', serviceLookupParams, this.timeout, options)
                .then(([{url}]) => {
                    return jsonRpc.request(url, `${this.module}.${funcName}`, params, this.timeout, options);
                });
        }
    }

    return DynamicServiceClient;
});
