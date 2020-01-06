define(["kb_lib/html","kb_common/props"],(function(e,t){"use strict"
;var n=(0,e.tag)("span");return{padRight:function(e,t){
var r,i,a=e.lastIndexOf(".");if(a>=0){if((r=t-(e.length-a))<=0)return e}else r=t
;var o="";for(i=0;i<r;i+=1)o+=n({style:{visibility:"hidden"}},"0");return e+o},
parseTaxonomy:function(e){var t;if(!e)return[];if(e.indexOf(";")>=0)t=";";else{
if(!(e.indexOf(",")>=0))return[e];t=","}return e.split(t).map((function(e){
return e.trim(" ")})).filter((function(e){return 0!==e.trim(" ").length}))},
processTypeDef:function(e){
return e.searchKeysMap={},e.searchKeys.forEach((function(t){
e.searchKeysMap[t.key]=t
})),e.sortFieldsMap={},e.sortFields||(e.sortFields=[]),e.sortFields.forEach((function(t){
e.sortFieldsMap[t.key]=t})),e},dataToDetail:function(e,n){var r=t.make({data:e})
;return n.map((function(e){return{id:e.id,label:e.label,value:r.getItem(e.id),
type:e.type,format:e.format,component:e.component,missing:e.missing,
default:e.default}}))},parseBoolean:function(e,t){return void 0===e?t:1===e}}
}));