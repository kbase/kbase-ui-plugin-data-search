define([], function () {
    function HeightMonitor(params) {
        var element = params.element;
        var onHeightCalc = params.onUpdate;
        var rateLimitTimeout = params.rateLimit || 200;

        var timer = null;

        function calcHeight() {
            return element.clientHeight;
        }

        function doResize() {
            if (timer) {
                return;
            }
            timer = window.setTimeout(function () {
                timer = null;
                onHeightCalc(calcHeight());
            }, rateLimitTimeout);
        }

        function start() {                
            onHeightCalc(calcHeight());                
            window.addEventListener('resize', doResize, false);
        }

        function stop() {
            if  (timer) {
                window.clearTimeout(timer);
            }
            window.removeEventListener('resize', doResize, false);
        }

        return {
            start: start,
            stop: stop
        };
    }

    return HeightMonitor;
});