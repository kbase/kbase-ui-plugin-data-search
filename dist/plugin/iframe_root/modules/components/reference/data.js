define(["bluebird","knockout","../../lib/searchApi","yaml!../../data/stopWords.yml"],(function(e,t,a,r){
"use strict";function i(e){return r.warn.indexOf(e)>=0||r.ignore.indexOf(e)>=0}
return{make:function(r){var n=r.maxSearchItems,o=r.types,c={
maxBufferSize:r.maxBufferSize||100,fetchSize:r.pageSize||20};return{
search:function(i){var s=a.make({runtime:r.runtime})
;return e.all([s.referenceObjectSearch({query:i.terms.join(" "),page:i.start||0,
pageSize:c.fetchSize}),s.typeSearch({query:i.terms.join(" "),withPrivateData:0,
withPublicData:1,dataSource:"referenceData"})]).spread((function(e,a){
var r,c=e.objects.map((function(e){return function(e){
var a=o.getTypeForObject(e)
;if(!a)throw console.error("ERROR cannot type object",e),
new Error("Cannot type this object")
;var r=a.getIcon(a),i=a.getRef(),n=a.detail(),c=n.reduce((function(e,t){
return e[t.id]=t,e}),{}),s=Object.keys(e.highlight).reduce((function(t,r){
if("source_tags"===r)return console.warn("highlight field "+r+" ignored"),t
;var i=a.getSearchFieldLabel(r)
;return i||(i=r,console.warn("highlight field "+r+" not found in type spec",e)),
t.push({id:r,label:i,highlights:e.highlight[r].map((function(e){return{
highlight:e}}))}),t}),[]);return{type:{id:e.type,label:a.getLabel(),icon:r},
matchClass:{id:a.getUIClass(),copyable:a.isCopyable(),viewable:a.isViewable(),
ref:i},detail:n,
url:window.location.origin+"#dataview/"+i.workspaceId+"/"+i.objectId+"/"+i.version,
name:e.object_name,date:new Date(e.timestamp),
scientificName:c.scientificName&&c.scientificName.value||"",matches:s,
selected:t.observable(),showMatches:t.observable(!1),
showDetails:t.observable(!1),active:t.observable(!1)}}(e)
})),s=Object.keys(a.type_to_count).map((function(e){return{id:e.toLowerCase(),
count:a.type_to_count[e]}}));return r=e.total>n?n:e.total,{items:c,
first:i.start,isTruncated:!0,summary:{totalByType:s,totalSearchHits:r,
totalSearchSpace:e.total,isTruncated:r<e.total},stats:{
objectSearch:e.search_time,typeSearch:a.search_time}}}))},isStopWord:i}}}}));