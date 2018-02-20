define([], function () {
    var lastBusId = 0;

    function NanoBus() {
        var queue = [];
        var lastListenerId = 0;
        var busId = lastBusId += 1;
        // var runInterval = 0;
        var messageReceivers = {};

        function processQueue() {
            var processing = queue;
            queue = [];
            processing.forEach(function (message) {
                var receivers = messageReceivers[message.id];
                if (!receivers) {
                    return;
                }
                receivers.forEach(function (receiver) {
                    try {
                        receiver(message.payload);
                    } catch (ex) {
                        console.error('Error processing message: ' + ex.message, ex);
                    }
                });
            });
        }

        function dumpListeners() {
            Object.keys(messageReceivers).forEach(function (messageId) {
                console.log('bus id: ' + busId + ', msg id: ' + messageId + ', ' + messageReceivers[messageId].length + ' listeners');
            });
        }

        function run() {
            if (queue.length === 0) {
                return;
            }
            // window.setTimeout(function () {
            //     processQueue();
            //     // just in case any new messages crept in.
            //     if (queue.length > 0) {
            //         run();
            //     }
            // }, runInterval);

            window.requestAnimationFrame(function () {
                processQueue();
                // dumpListeners();
                if (queue.length > 0) {
                    run();
                }
            });
        }

        function send(id, payload) {
            queue.push({
                id: id,
                payload: payload
            });
            run();
        }

        function on(id, handler) {
            if (!messageReceivers[id]) {
                messageReceivers[id] = [];
            }
            messageReceivers[id].push(handler);
        }

        function start() {

        }

        function stop() {

        }

        return {
            start: start,
            stop: stop,
            send: send,
            on: on
        };
    }

    return {
        make: NanoBus
    };
});
