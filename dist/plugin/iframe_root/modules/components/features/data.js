define(["bluebird","knockout","../../lib/searchApi","../../lib/types/utils","yaml!../../data/stopWords.yml"],(function(e,t,a,r,n){
"use strict";function i(e){return n.warn.indexOf(e)>=0||n.ignore.indexOf(e)>=0}
return{make:function(n){var o=n.maxSearchItems,s=n.types,c={
maxBufferSize:n.maxBufferSize||100,fetchSize:n.pageSize||20};return{
search:function(i){var u=a.make({runtime:n.runtime})
;return e.all([u.featuresSearch({query:i.terms.join(" "),
withUserData:i.withUserData,withReferenceData:i.withReferenceData,
withPrivateData:i.withPrivateData,withPublicData:i.withPublicData,
page:i.start||0,pageSize:c.fetchSize})]).spread((function(e){
var a,n=e.objects.map((function(e){return function(e){
var a=s.getTypeForObject(e)
;if(!a)throw console.error("ERROR cannot type object",e),
new Error("Cannot type this object")
;var r=a.getIcon(),n=a.getRef(),i=a.detail(),o=i.reduce((function(e,t){
return e[t.id]=t,e}),{}),c=Object.keys(e.highlight).reduce((function(t,r){
if("source_tags"===r)return console.warn("highlight field "+r+" ignored"),t
;var n=a.getSearchFieldLabel(r)
;return n||(n=r,console.warn("highlight field "+r+" not found in type spec",e)),
t.push({id:r,label:n,highlights:e.highlight[r].map((function(e){return{
highlight:e}}))}),t}),[]);return{type:{label:a.getLabel(),icon:r},matchClass:{
id:a.getUIClass(),copyable:a.isCopyable(),viewable:a.isViewable(),ref:n},ref:n,
detail:i,url:window.location.origin+"#dataview/"+n.dataviewId,
name:e.object_name,date:new Date(e.timestamp),id:o.id.value,
featureType:o.featureType.value,featureFunctions:o.functions.value,matches:c,
selected:t.observable(),showMatches:t.observable(!1),
showDetails:t.observable(!1),active:t.observable(!1)}}(e)}))
;a=e.total>o?o:e.total;var c=n.reduce((e,t)=>{const a=t.ref.objectRef
;return e[a]||(e[a]={ref:t.ref,items:[]}),e[a].items.push(t),e},{})
;let u=Object.keys(c).map(e=>c[e])
;const l=Object.keys(e.objects_info).reduce((t,a)=>{const n=function(e){
const[t,a,,n,i,o,s,,,,c]=e,u=n.replace(/[+](\d\d)(\d\d)$/,(e,t,a)=>"+"+t+":"+a)
;return{scientificName:c.Name,kbaseGenomeId:null,domain:c.Domain,
lineage:r.parseTaxonomy(c.Taxonomy),source:c.Source,sourceId:c["Source ID"],
dnaSize:parseInt(c.Size,10),contigCount:parseInt(c["Number contigs"]),
featureCount:parseInt(c["Number features"]),
gcContent:parseFloat(c["GC content"]),ref:[s,t,i].map(String).join("/"),
objectId:t,workspaceId:s,objectVersion:i,objectName:a,lastSavedAt:new Date(u),
lastSavedBy:o}}(e.objects_info[a]);return t[n.ref]=n,t
},{}),f=Object.keys(e.access_groups_info).reduce((t,a)=>{const r=function(e){
const[t,a,r,n,,,,,i]=e,o=n.replace(/[+](\d\d)(\d\d)$/,(e,t,a)=>"+"+t+":"+a),s={
workspaceId:t,owner:r,modificationDate:new Date(o)}
;return"narrative"in i?(s.type="narrative",
s.title=i.narrative_nice_name,s.objectId=parseInt(i.narrative,10)):i.searchtags&&i.searchtags.match(/refdata/)?(s.type="refdata",
s.title=a):(s.type="unknown",s.title=a),s}(e.access_groups_info[a])
;return t[String(r.workspaceId)]=r,t},{});return u.forEach(e=>{
e.genomeInfo=l[e.ref.objectRef],
e.isOpen=t.observable(!1),e.showItemDetail=t.observable(!1),
e.showItemMatches=t.observable(!1),e.workspaceInfo=f[String(e.ref.workspaceId)]
}),u=u.filter(e=>!!e.genomeInfo),{items:n,grouped:u,first:i.start,
isTruncated:!0,summary:{totalSearchHits:a,totalSearchSpace:e.total,
isTruncated:a<e.total},stats:{objectSearch:e.search_time}}}))},isStopWord:i}}}
}));