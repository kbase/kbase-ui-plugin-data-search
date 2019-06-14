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
            const featureType = this.object.data.feature_type;
            const featureId = this.object.data.id;
            // e.g. https://ci.kbase.us/#dataview/29768/2?sub=Feature&subid=b0001
            const objectRef = this.object.kbase_id;
            const subObjectRef = objectRef +
                            '?sub=' + featureType +
                            '&subid=' + featureId;

            this.objectRef = {
                workspaceId: parseInt(this.object.access_group),
                objectId: parseInt(this.object.obj_id),
                version: parseInt(this.object.version),
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
