define([
    '../DefaultIndexBase'
], function (
    DefaultIndexBase
) {
    'use strict';

    const isViewable = true;
    const isCopyable = true;
    const uiClass = 'dataObject';

    class DefaulObjectIndex extends DefaultIndexBase {
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
            this.objectRef =  {
                workspaceId: this.object.access_group,
                objectId: this.object.obj_id,
                version: this.object.version,
                objectRef: this.object.kbase_id,
                dataviewId: this.object.kbase_id
            };
            return this.objectRef;
        }
    }

    return DefaulObjectIndex;
});