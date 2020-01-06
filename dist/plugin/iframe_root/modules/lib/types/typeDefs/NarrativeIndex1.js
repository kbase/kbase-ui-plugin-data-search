define(["../IndexBase"],(function(e){"use strict";const t=[{id:"title",
label:"Title"}],a={title:{disableSort:!0,label:"Title",type:"string"},source:{
label:"Source",type:"string"},code_output:{label:"Code Output",type:"string"},
app_output:{label:"App Output",type:"string"},app_info:{label:"App Info",
type:"string"},app_input:{label:"App Input",type:"string"},job_ids:{
label:"Job Ids",type:"string"},creator:{label:"Creator",type:"string"}},r=[{
key:"title",label:"Title"},{key:"created",label:"Created (fake)"},{
key:"updated",label:"Updated (fake)"},{label:"Owner (fake)",value:"owner"},{
label:"Creator",value:"creator"}];return class extends e{constructor(e){
super(Object.assign({},e,{indexId:"Narrative",indexVersion:1,detailFieldDefs:t,
searchFields:a,sortFields:r,kbaseTypeModule:"KBaseNarrative",
kbaseTypeId:"Narrative",label:"Narrative",isViewable:!1,isCopyable:!1,
uiClass:"narrative"}))}objectToData(){return{title:this.object.key_props.title}}
getRef(){if(this.objectRef)return this.objectRef
;var e=this.object.guid.match(/^WS:(\d+)\/(\d+)\/(\d+)$/),t=e.slice(1,4).join("/")
;return this.objectRef={workspaceId:parseInt(e[1]),objectId:parseInt(e[2]),
version:parseInt(e[3]),objectRef:t,dataviewId:t},this.objectRef}}}));