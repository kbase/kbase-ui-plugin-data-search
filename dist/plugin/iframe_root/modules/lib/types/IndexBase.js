define([],(function(){"use strict";function e(e){
var s,t=0,i=["#F44336","#E91E63","#9C27B0","#3F51B5","#2196F3","#673AB7","#FFC107","#0277BD","#00BCD4","#009688","#4CAF50","#33691E","#2E7D32","#AEEA00","#03A9F4","#FF9800","#FF5722","#795548","#006064","#607D8B"]
;for(s=0;s<e.name.length;s+=1)t+=e.name.charCodeAt(s);return i[t%i.length]}
return class{constructor(e){
this.params=e,this.runtime=e.runtime,this.object=e.object,
this.indexId=e.indexId,
this.indexVersion=e.indexVersion,this.detailFieldDefs=e.detailFieldDefs,
this.kbaseTypeModule=e.kbaseTypeModule,
this.kbaseTypeId=e.kbaseTypeId,this.searchFields=e.searchFields,
this.detailFields=null,this.objectRef=null,this.data=null}getData(){
return this.data?this.data:(this.data=this.objectToData(),this.data)}detail(){
if(this.detailFields)return this.detailFields;this.detailFields=[]
;const e=this.getData();return this.detailFieldDefs.forEach(s=>{
this.detailFields.push({id:s.id,label:s.label,value:e[s.id],type:s.type,
format:s.format,component:s.component,missing:s.missing,default:s.default,
params:s.params})}),this.detailFields}getIcon(){return function(s){var t={
type:"fontAwesome",classes:["fa-file-o"]},i=t.classes.map((function(e){return e
}));switch(t.type){case"kbase":if(i.push("icon"),s.size)switch(s.size){
case"small":i.push("icon-sm");break;case"medium":i.push("icon-md");break
;case"large":i.push("icon-lg")}break;case"fontAwesome":i.push("fa")}if(i)return{
classes:i,type:t.type,color:t.color||e(s.type),
html:'<span class="'+i.join(" ")+'"></span>'}}({type:{
module:this.kbaseTypeModule,name:this.kbaseTypeId,version:{major:null,minor:null
}}})}isViewable(){return this.params.isViewable}isCopyable(){
return this.params.isCopyable}getUIClass(){return this.params.uiClass}
getLabel(){return this.params.label}getSearchFieldLabel(e){switch(e){
case"object_name":return"Object Name"}const s=this.searchFields[e]
;if(s)return s.label}}}));