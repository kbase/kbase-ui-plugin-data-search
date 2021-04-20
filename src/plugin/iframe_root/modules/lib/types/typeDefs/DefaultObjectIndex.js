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
            // TODO: fix this;
            const {
                workspace_id: workspaceId,
                object_id: objectId,
                object_version: version
            } = this.object;
            const objectRef = [workspaceId, objectId, version].join('/');
            this.objectRef =  {
                workspaceId,
                objectId,
                version,
                objectRef,
                dataviewId: objectRef
            };
            return this.objectRef;
        }
    }

    return DefaulObjectIndex;
});