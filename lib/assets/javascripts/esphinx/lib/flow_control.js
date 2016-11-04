var
    FlowControl;

FlowControl = (function () {
    "use strict";

    return {

        new: function (options) {
            var
                ConstructorReference = FlowControl.new;

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(options);
            }

            if (options) {
                (function wait () {
                    setTimeout(function () {
                        if (options.condition.call()) {
                            options.ready();
                        } else {
                            wait();
                        }
                    }, 0);
                })();
            }

            // improves here
            // doesn't delay loop run, tha's why should expected to run a callback
            this.delay = function (ms, getReadyCondition) {
                (function wait () {
                    setTimeout(function () {
                        getReadyCondition(function (readyCondition) {
                            if (!readyCondition) {
                                wait();
                            }
                        });
                    }, ms);
                })();
            };

            return this;
        }

    };

})();