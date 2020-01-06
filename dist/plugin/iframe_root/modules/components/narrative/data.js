define(["bluebird","moment","knockout","../../lib/searchApi"],(function(e,t,a,r){
"use strict";return{make:function(i){var n=i.maxSearchItems,o=i.types,c={
maxBufferSize:i.maxBufferSize||100,fetchSize:i.pageSize||20};return{
search:function(s){var u=r.make({runtime:i.runtime})
;return e.all([u.narrativeObjectSearch({query:s.terms.join(" "),page:s.start||0,
pageSize:c.fetchSize,withPrivateData:s.withPrivateData,
withPublicData:s.withPublicData}),u.typeSearch({query:s.terms.join(" "),
withPrivateData:s.withPrivateData,withPublicData:s.withPublicData,
dataSource:"narratives"})]).spread((function(e,r){
var i,c=e.objects.map((function(e){return function(e){
var t=o.getTypeForObject(e)
;if(!t)throw console.error("ERROR cannot type object",e),
new Error("Cannot type this object")
;var r=t.getRef(),i=t.detail(),n=i.reduce((function(e,t){return e[t.id]=t,e
}),{}),c=t.getIcon(),s=Object.keys(e.highlight).reduce((function(a,r){
if("source_tags"===r)return console.warn("highlight field "+r+" ignored"),a
;var i=t.getSearchFieldLabel(r)
;return i||(i=r,console.warn("highlight field "+r+" not found in type spec",e)),
a.push({id:r,label:i,highlights:e.highlight[r].map((function(e){return{
highlight:e}}))}),a}),[]);return{type:{label:t.getLabel(),icon:c},matchClass:{
id:t.getUIClass(),copyable:t.isCopyable(),viewable:t.isViewable(),ref:r},
detail:i,
url:window.location.origin+"#dataview/"+r.workspaceId+"/"+r.objectId+"/"+r.version,
title:e.object_name,name:e.object_name,date:new Date(e.timestamp),
scientificName:n.scientificName&&n.scientificName.value||"",matches:s,
selected:a.observable(),showMatches:a.observable(!1),
showDetails:a.observable(!1),active:a.observable(!1)}}(e)
})),u=Object.keys(r.type_to_count).map((function(e){return{id:e.toLowerCase(),
count:r.type_to_count[e]}}));return i=e.total>n?n:e.total,{items:c,
narratives:Object.keys(e.access_group_narrative_info).map((function(r){
var i=e.access_group_narrative_info[r];if(null===i)return{isNarrative:!1,
name:"not a narrative (name)",title:"not a narrative (title)",ref:{
workspaceId:parseInt(r,10),objectId:null},modified:null,owner:null,
active:a.observable(!1)};var n={isNarrative:!!i[0],name:i[0],title:i[0],ref:{
workspaceId:parseInt(r,10),objectId:i[1]},modified:t(i[2]).toDate(),owner:{
username:i[3],realName:i[4]},active:a.observable(!1)}
;return n.url=window.location.origin+"/narrative/ws."+n.ref.workspaceId+".obj."+n.ref.objectId,
n})).sort((function(e,t){return-(e.ref.workspaceId-t.ref.workspaceId)})),
first:s.start,isTruncated:!0,summary:{totalByType:u,totalSearchHits:i,
totalSearchSpace:e.total,isTruncated:i<e.total},stats:{
objectSearch:e.search_time,typeSearch:r.search_time}}})).then((function(e){
return function(e){var t=e.items.reduce((function(e,t){
var a=String(t.matchClass.ref.workspaceId);return e[a]||(e[a]={items:[],
matchedTerms:{}}),e[a].items.push(t),t.matches.forEach((function(t){
e[a].matchedTerms[t.term]=!0})),e}),{})
;return e.summary.totalNarrativeCount=Object.keys(t).length,
e.narratives.forEach((function(e){
e.objects=t[String(e.ref.workspaceId)].items.map((function(e){return e}))
;var a={};return e.objects.forEach((function(e){a[e.type.id]||(a[e.type.id]={
id:e.type.id,label:e.type.label,count:0}),a[e.type.id].count+=1
})),e.summary=Object.keys(a).map((function(e){return a[e]})),e})),e}(e)}))}}}}
}));