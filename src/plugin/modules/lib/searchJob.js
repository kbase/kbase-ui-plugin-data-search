define([], function () {
    function SearchJob() {
        var job = null;
        var state = null;

        function started() {
            state = 'started';
        }

        function running(newJob) {
            job = newJob;
            state = 'running';
        }

        function cancel() {
            console.log('canceling...');
            if (state === 'running') {
                if (job) {
                    try {
                        job.cancel();
                        console.log('canceled!');
                    } catch (ex) {
                        console.error('Error canceling search', ex);
                    }                        
                    state = 'canceled';
                }
            } else {
                console.log('cancelation not necessary');
            }
        }

        function finished() {
            job = null;
            state = 'finished';
        }

        function isCanceled() {
            return state === 'canceled';
        }

        return Object.freeze({
            started: started,
            running: running,
            cancel: cancel,
            finished: finished,
            isCanceled: isCanceled
        });
    }

    return {
        make: SearchJob
    };
});