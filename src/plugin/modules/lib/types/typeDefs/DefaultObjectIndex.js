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
            let m = this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/);
            let objectRef = m.slice(1, 4).join('/');
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

    return DefaulObjectIndex;
});