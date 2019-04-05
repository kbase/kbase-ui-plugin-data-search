define([], function () {
    'use strict';
    function ElementMonitor(params) {
        var element = params.element;

        var valueGetter = params.getValue;
        var updateCallback = params.onUpdate;
        var interval = params.interval || 100;

        var lastValue;

        var doLoop = false;
        var timer;

        function notifyIfChanged() {
            var currentValue = valueGetter(element);
            if (currentValue !== lastValue) {
                lastValue = currentValue;
                updateCallback(lastValue);
            }
        }

        function loop() {
            if (!doLoop) {
                return;
            }
            timer = window.setTimeout(function () {
                if (!timer) {
                    return;
                }
                notifyIfChanged();
                loop();
            }, interval);
        }

        function start() {
            notifyIfChanged();
            doLoop = true;
            loop();
        }

        function stop() {
            doLoop = false;
            if (timer) {
                window.clearTimeout(timer);
            }
        }

        return {
            start: start,
            stop: stop
        };
    }
    return ElementMonitor;
});