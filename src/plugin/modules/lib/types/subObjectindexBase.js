define([
    './indexBase'
], function (
    IndexBase
) {
    'use strict';

    const isViewable = true;
    const isCopyable = false; 
    const uiClass = 'subObject';

    class SubObjectIndexBase extends IndexBase {
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
            var m = this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+):(.*?)\/(.*)$/);
            var featureType = m[4];
            var featureId = m[5];
            // e.g. https://ci.kbase.us/#dataview/29768/2?sub=Feature&subid=b0001
            var subObjectRef = m.slice(1, 4).join('/') + 
                            '?sub=' + featureType + 
                            '&subid=' + featureId;
            this.objectRef = {
                workspaceId: parseInt(m[1]),
                objectId: parseInt(m[2]),
                version: parseInt(m[3]),
                ref: subObjectRef,
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