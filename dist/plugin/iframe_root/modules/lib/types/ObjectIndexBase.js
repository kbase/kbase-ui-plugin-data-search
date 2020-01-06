define(["./IndexBase"],(function(e){"use strict";return class extends e{
constructor(e){super(Object.assign({},e,{isViewable:!0,isCopyable:!0,
uiClass:"dataObject"}))}getRef(){if(this.objectRef)return this.objectRef
;const e=this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/),t=e.slice(1,4).join("/")
;return this.objectRef={workspaceId:parseInt(e[1]),objectId:parseInt(e[2]),
version:parseInt(e[3]),objectRef:t,dataviewId:t},this.objectRef}}}));