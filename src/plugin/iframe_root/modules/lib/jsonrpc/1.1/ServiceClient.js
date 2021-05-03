/*jslint white:true,browser:true,jsnomen:true*/
define([
    './JSON-RPC_1.1'
], function (jsonRpc) {
    'use strict';

    class ServiceClient {
        constructor({module, url, timeout, token}) {
            this.module = module;
            this.url = url;
            this.timeout = timeout;
            this.token = token;

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
            return jsonRpc.request(this.url, `${this.module}.${funcName}`, params, this.timeout, options);
        }
    }

    return ServiceClient;
});
