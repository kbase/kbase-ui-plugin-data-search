define([], function () {
    'use strict';

    function factory() {
        var timers = [];
        var timersMap = {};

        function startTimer(name) {
            timersMap[name] = {
                start: new Date(),
                stop: null,
                elapsed: null
            };
            timers.push(name);
        }

        function stopTimer(name) {
            var timer = timersMap[name];
            if (!timer) {
                return;
            }
            timer.stop = new Date();
            timer.elapsed = timer.stop.getTime() - timer.start.getTime();
        }

        function log() {
            timers.forEach(function (name) {
                var timer = timersMap[name];
                var elapsed = timer.elapsed === undefined ? 'running' : timer.elapsed;
                
                console.info('timer: ' + name + ':' + elapsed);
            });
        }

        return {
            start: startTimer,
            stop: stopTimer,
            log: log
        };

    }

    return {
        make: factory
    };
});