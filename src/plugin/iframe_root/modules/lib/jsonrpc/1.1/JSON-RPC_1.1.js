/*jslint white:true,browser:true*/
define([
    'uuid'
], function (
    Uuid
) {
    'use strict';

    /*
    JSONRPC errors capture the calling information and some
    error state. This or a sublcass should be used for all errors
    encountered within the request function. Subclasses may capture
    more specific information about specific errors.
    */
    class JSONRPCError extends Error {
        constructor (message, {method, params, url, originalMessage}) {
            super(message);
            this.url = url;
            this.method = method;
            this.params = params;
            this.originalMessage = originalMessage;
        }
        toJSON() {
            return {
                message: this.message,
                url: this.url,
                method: this.method,
                params: this.params,
                originalMessage: this.originalMessage
            };
        }
    }

    class JSONRPCTimeout extends JSONRPCError {
        constructor (message, {method, params, url, originalMessage, timeout, elapsed}) {
            super(message, {method, params, url, originalMessage, timeout, elapsed});
            this.timeout = timeout;
            this.elapsed = elapsed;
        }
        toJSON() {
            return {
                message: this.message,
                url: this.url,
                method: this.method,
                params: this.params,
                timeout: this.timeout,
                elapsed: this.elapsed,
                originalMessage: this.originalMessage
            };
        }
    }

    /**
     * An error returned from a JSON-RPC 1.1. method call
     */
    class JSONRPCMethodError extends JSONRPCError {
        constructor (message, {method, params, url, originalMessage, error}) {
            super(message, {method, params, url, originalMessage});
            this.error = error;
        }
        toJSON() {
            return {
                message: this.message,
                url: this.url,
                method: this.method,
                params: this.params,
                originalMessage: this.originalMessage,
                error: this.error
            };
        }
    }

    function startTimeout({after}) {
        if (!AbortController) {
            console.warn('AbortController not available, cannot implement timeout');
            return {};
        }
        const controller = new AbortController();
        const timeout = window.setTimeout(() => {
            console.warn(`Timed out after ${after}ms`);
            controller.abort();
        }, after);
        const cancel = () => {
            window.clearTimeout(timeout);
        };
        const abort = () => {
            window.clearTimeout(timeout);
            controller.abort();
        };
        return { //NOPMD
            signal: controller.signal,
            cancel,
            abort,
            started: Date.now()
        };
    }

    async function request(url, method, params, timeout, options = {}) {
        const rpc = {
            params,
            method,
            version: '1.1',
            id: new Uuid(4).format()
        };
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (options.authorization !== null) {
            headers.Authorization = options.authorization;
        }

        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers,
            body: JSON.stringify(rpc)
        };

        // Enforce timeout (see timeout method)
        const {signal, cancel: cancelTimeout, started} = startTimeout({after: timeout});
        if (signal) {
            fetchOptions.signal = signal;
        }

        let response;
        try {
            response = await fetch(url, fetchOptions);
        } catch (ex) {
            if (ex instanceof DOMException && ex.name === 'AbortError') {
                const elapsed = Date.now() - started;
                if (elapsed >= timeout) {
                    // probably a timeout.
                    throw new JSONRPCTimeout(`Request canceled - probably timed out after ${elapsed}ms with timeout of ${timeout}ms`, {
                        method,
                        params,
                        url,
                        timeout,
                        elapsed,
                        originalMessage: ex.mesage
                    });
                } else {
                    // perhaps still could be, given unknowns about the precise timing of setTimeout, but chances are low.
                    throw new JSONRPCError(`Request canceled - but elapsed time ${elapsed}ms does not exceed timeout of ${timeout}ms`, {
                        method,
                        params,
                        url,
                        originalMessage: ex.mesage
                    });
                }
            }
            throw new JSONRPCError('Error fetching JSON-RPC 1.1', {method, params, url, originalMessage: ex.mesage});
        } finally {
            if (cancelTimeout) {
                cancelTimeout();
            }
        }

        let jsonrpcResponse;
        try {
            const textResponse = await response.text();
            jsonrpcResponse = JSON.parse(textResponse);
        } catch (ex) {
            throw new JSONRPCError('Error parsing JSON-RPC 1.1 response', {method, params, url, originalMessage: ex.mesage});
        }

        if (jsonrpcResponse.id !== rpc.id) {
            console.warn(`Id in response ${jsonrpcResponse.id} does not match id in request ${rpc.id}`);
        }
        if (!jsonrpcResponse.version) {
            throw new JSONRPCError('"version" property missing in response', {method, params, url});
        }
        if (jsonrpcResponse.version !== '1.1') {
            throw new JSONRPCError(`"version" property is ${jsonrpcResponse.jsonrpc} not "1.1" as expected`, {method, params, url});
        }

        if (jsonrpcResponse.result) {
            return jsonrpcResponse.result;
        }
        if (!jsonrpcResponse.error) {
            throw new JSONRPCError('Invalid JSON-RPC 1.1 response - no result or error', {method, params, url});
        }

        throw new JSONRPCMethodError('Error running JSON-RPC 1.1 method', {method, params, url, error: jsonrpcResponse.error});
    }

    return Object.freeze({
        request,
        JSONRPCError,
        JSONRPCMethodError
    });
});