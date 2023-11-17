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
            const {
                workspace_id: workspaceId,
                object_id: objectId,
                object_version: version
            } = this.object;
            const objectRef = [workspaceId, objectId, version].join('/');
            // const m = this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+):(.*?)\/(.*)$/);
            // TODO: Restore This to Re-Enable Sub Objects
            const featureType = 'x'; //m[4];
            const featureId = 'y'; // m[5];
            // e.g. https://ci.kbase.us/#dataview/29768/2?sub=Feature&subid=b0001
            const subObjectRef = objectRef +
                            '&sub=' + featureType +
                            '&subid=' + featureId;

            // const objectRef = m.slice(1, 4).join('/');
            // TODO: fix this
            this.objectRef = {
                workspaceId,
                objectId,
                version,
                objectRef,
                subObjectRef,
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