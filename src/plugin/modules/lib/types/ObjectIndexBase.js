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

        getRef() {
            if (this.objectRef) {
                return this.objectRef;
            }
            const m = this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
            const objectRef = m.slice(1, 4).join('/');
            this.objectRef =  {
                workspaceId: parseInt(m[1]),
                objectId: parseInt(m[2]),
                version: parseInt(m[3]),
                objectRef: objectRef,
                dataviewId: objectRef
            };
            return this.objectRef;
        }
    }

    return ObjectIndexBase;
});