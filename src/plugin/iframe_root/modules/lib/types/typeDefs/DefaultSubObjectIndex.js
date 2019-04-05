define([
    '../DefaultIndexBase'
], function (
    DefaultIndexBase
) {
    'use strict';

    const isViewable = true;
    const isCopyable = false;
    const uiClass = 'subObject';

    class DefaultSubObjectIndex extends DefaultIndexBase {
        constructor(params) {
            Object.assign({}, params, {
                isViewable, isCopyable, uiClass
            });
            super(params);
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

    return DefaultSubObjectIndex;
});