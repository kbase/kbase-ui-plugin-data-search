define([
    './IndexBase'
], function (
    IndexBase
) {
    'use strict';

    const isViewable = true;
    const isCopyable = true;
    const uiClass = 'dataObject';

    class ObjectIndexBase extends IndexBase {
        constructor(params) {
            super(Object.assign({}, params, {
                isViewable, isCopyable, uiClass
            }));
        }
    }

    return ObjectIndexBase;
});
