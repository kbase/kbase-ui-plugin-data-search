define([
    './IndexBase'
], function (
    IndexBase
) {
    'use strict';

    const isViewable = true;
    const isCopyable = false;
    const uiClass = 'subObject';

    class SubObjectIndexBase extends IndexBase {
        constructor(params) {
            super(Object.assign({}, params, {
                isViewable, isCopyable, uiClass
            }));
        }

        getRef() {
            if (this.objectRef) {
                return this.objectRef;
            }
            const m = this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+):(.*?)\/(.*)$/);
            const featureType = m[4];
            const featureId = m[5];
            // e.g. https://ci.kbase.us/#dataview/29768/2?sub=Feature&subid=b0001
            const subObjectRef = m.slice(1, 4).join('/') +
                            '?sub=' + featureType +
                            '&subid=' + featureId;
            const objectRef = m.slice(1, 4).join('/');

            this.objectRef = {
                workspaceId: parseInt(m[1]),
                objectId: parseInt(m[2]),
                version: parseInt(m[3]),
                objectRef: objectRef,
                subObjectRef: subObjectRef,
                featureType: featureType,
                feature: featureId,
                featureId: featureId,
                dataviewId: subObjectRef
            };
            return this.objectRef;
        }
    }

    return SubObjectIndexBase;
});