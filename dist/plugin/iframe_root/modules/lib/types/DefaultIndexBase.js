define(["./IndexBase","./components/stringArray","./components/keyValueList"],(function(e,t,n){
"use strict";const s=[];function o(e){switch(typeof e){case"undefined":
case"string":case"number":case"boolean":return!0;default:return null===e}}
return class extends e{constructor(e){
const o=e.object.type.toLowerCase(),r=e.object.type_ver,c=o,a=function(e){
return Object.keys(e.data).map(s=>{const o=e.data[s];switch(typeof o){
case"string":case"number":return{id:s,label:s};case"boolean":return{id:s,
label:s,type:"boolean"};case"object":return o instanceof Array?{id:s,label:s,
component:t.name()}:null===o?{id:s,label:s}:!Object.keys(o).some(e=>{
const t=o[e];if("object"==typeof t&&null!==t)return!0})&&{id:s,label:s,
component:n.name()}}return null}).filter(e=>!!e)}(e.object),l=function(e){
return Object.keys(e.key_props).reduce((e,t)=>(e[t]={label:t,type:"string"
},e),{})}(e.object);super({runtime:e.runtime,object:e.object,indexId:o,
indexVersion:r,detailFieldDefs:a,searchFields:l,sortFields:s,
kbaseTypeModule:null,kbaseTypeId:null,label:c})}objectToData(){
return Object.keys(this.object.data).reduce((e,t)=>{const n=this.object.data[t]
;return o(n)?e[t]=n:"object"==typeof n&&(n instanceof Array?n.some(e=>{
if(!o(e))return!0})||(e[t]=n):Object.keys(n).some(e=>{if(!o(n[e]))return!0
})||(e[t]=Object.keys(n).map(e=>({key:e,value:n[e]})))),e},{})}getIcon(){
var e=["fa","fa-question-circle-o"];return{classes:e,type:"fontAwesome",
color:"red",html:'<span class="'+e.join(" ")+'"></span>'}}}}));