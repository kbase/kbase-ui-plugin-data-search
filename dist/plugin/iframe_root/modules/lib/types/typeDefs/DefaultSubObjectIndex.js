define(["../DefaultIndexBase"],(function(e){"use strict";return class extends e{
constructor(e){Object.assign({},e,{isViewable:!0,isCopyable:!1,
uiClass:"subObject"}),super(e)}getRef(){if(this.objectRef)return this.objectRef
;const e=this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+):(.*?)\/(.*)$/),t=e[4],s=e[5],i=e.slice(1,4).join("/")+"?sub="+t+"&subid="+s,c=e.slice(1,4).join("/")
;return this.objectRef={workspaceId:parseInt(e[1]),objectId:parseInt(e[2]),
version:parseInt(e[3]),objectRef:c,subObjectRef:i,featureType:t,feature:s,
featureId:s,dataviewId:i},this.objectRef}}}));