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

        // TODO: refactor to match ObjectIndexBase's getRef(), specifically the
        // switch from using the kbase_id or guid to the top level ws, obj info.
        getRef() {
            if (this.objectRef) {
                return this.objectRef;
            }
            const featureType = this.object.data.feature_type;
            const featureId = this.object.data.id;
            // e.g. https://ci.kbase.us/#dataview/29768/2?sub=Feature&subid=b0001
            const {
                workspace_id: workspaceId,
                object_id: objectId,
                object_version: version
            } = this.object;
            const objectRef = [workspaceId, objectId, version].join('/');
            const subObjectRef = `${objectRef}?sub=${featureType}&subid=${featureId}`;
            // TODO: fix this
            this.objectRef = {
                workspaceId: this.object.access_group,
                objectId: this.object.obj_id,
                version: this.object.version,
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