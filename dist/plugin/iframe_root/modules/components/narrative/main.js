define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/subscriptionManager","kb_lib/html","kb_common/utils","./data","./header","./navbar","./results","../../lib/searchJob","../../lib/timer"],(function(e,a,t,r,s,o,n,l,c,i,u,h,f){
"use strict";var b=(0,o.tag)("div");a.bindingHandlers.labelText={
update:function(e,t){
var r,s=t(),o=a.unwrap(s.label),n=a.unwrap(s.quantity),l=a.unwrap(s.labels)[o]
;l?r=0===n||n>1?l.plural:l.singular:(console.warn("labelText: No label found for: "+o),
r=o),e.innerText=r}};var m=o.makeStyles({main:{flex:"1 1 0px",display:"flex",
flexDirection:"column"},toolbar:{flex:"0 0 50px",display:"flex",
flexDirection:"column"},navbar:{flex:"0 0 50px",display:"flex",
flexDirection:"column"},header:{flex:"0 0 40px",display:"flex",
flexDirection:"column"},results:{flex:"1 1 0px",display:"flex",
flexDirection:"column"}});function p(t,r){
var o=a.contextFor(r.element),c=o.$root.runtime,i=o.$root.types,u=o.$root.appBus,b=new s,m=function(e){
var t=e.withPrivateData,r=e.withPublicData,s=a.observable(20),o=a.observable(),n=a.observable("none"),l=a.observable(!1),c=a.observableArray(),i=a.observable(),u=a.observable(),h=a.observable(),f=a.observableArray(),b=a.pureComputed((function(){
var e=u();if("number"==typeof e)return Math.ceil(e/s())
})),m=a.observable(),p=a.observable();return{includePrivateData:t,
includePublicData:r,pageSize:s,page:o,totalPages:b,status:n,searching:l,
buffer:c,isTruncated:i,totalSearchHits:u,totalSearchSpace:h,summary:f,
errorMessage:m,error:p}}({withPrivateData:t.withPrivateData,
withPublicData:t.withPublicData}),p=l.make({runtime:c,types:i,
pageSize:m.pageSize(),maxBufferSize:100,maxSearchItems:1e4}),d=h.make(),v=null
;function g(a){if(!n.isEqual(a,v)){
if(v=a,d.cancel(),!a.terms||0===a.terms.length)return m.status("none"),
m.buffer(null),
m.isTruncated(null),m.totalSearchHits(null),m.summary.removeAll(),
void m.totalSearchSpace(null);m.searching(!0),m.status("searching")
;var r=h.make();d=r;var s=f.make()
;s.start("search"),m.errorMessage(null),m.error(null);var o=e.try((function(){
r.started()})).then((function(){return p.search({start:a.start,terms:a.terms,
withPrivateData:a.withPrivateData,withPublicData:a.withPublicData})
})).then((function(e){return s.stop("search"),s.start("processing"),e
})).then((function(e){if(!r.isCanceled()){
if(0===e.items.length)return m.status("notfound"),
m.isTruncated(!1),m.totalSearchHits(null),
m.summary.removeAll(),m.totalSearchSpace(null),void m.page(null)
;var a=t.selectedObjects().reduce((function(e,a){return e[a]=!0,e}),{})
;e.narratives.forEach((function(e){e.objects.forEach((function(e){
a[e.matchClass.ref.objectRef]&&e.selected(!0)}))
})),m.buffer(e.narratives),m.isTruncated(e.isTruncated),
m.totalSearchHits(e.summary.totalSearchHits),
m.summary.removeAll(),e.summary.totalByType.forEach((function(e){
m.summary.push(e)})),m.summary.sort((function(e,a){return a.count-e.count
})),m.totalSearchSpace(e.summary.totalSearchSpace),
m.status("success"),m.page()||e.items.length>0&&m.page(1)}
})).catch((function(e){
m.status("error"),m.errorMessage(e.message),m.error(e),u.send("error",{error:e})
})).finally((function(){
s.stop("processing"),s.log(),m.searching(!1),r.finished()}))
;return r.running(o),o}console.warn("duplicate query suppressed?",a,v)}
var w=a.pureComputed((function(){var e,a=m.page();e=a?a-1:0
;var r=t.searchTerms(),s=t.forceSearch();return{terms:r.terms,
withPrivateData:m.includePrivateData(),withPublicData:m.includePublicData(),
start:e,pageSize:m.pageSize(),username:c.service("session").getUsername(),
forced:s}}));return b.add(w.subscribe((function(e){g(e)}))),g(w()),{
searchState:m,view:t.view,overlayComponent:t.overlayComponent,
selectedObjects:t.selectedObjects,doToggleShowObjects:function(e){
m.buffer().forEach((function(a){
e?(a.showObjects(!1),a.showMatches(!1),a.showDetails(!1)):(a.showObjects(!0),
a.showMatches(!1),a.showDetails(!1))}))},doToggleShowMatches:function(e){
m.buffer().forEach((function(a){
e?(a.showObjects(!1),a.showMatches(!1),a.showDetails(!1)):(a.showObjects(!1),
a.showMatches(!0),a.showDetails(!1))}))},doToggleShowDetails:function(e){
m.buffer().forEach((function(a){
e?(a.showObjects(!1),a.showMatches(!1),a.showDetails(!1)):(a.showObjects(!1),
a.showMatches(!1),a.showDetails(!0))}))},narrativesTotal:t.narrativesTotal,
referenceDataTotal:t.referenceDataTotal,featuresTotal:t.featuresTotal,
dispose:function(){d&&d.cancel(),b.dispose()}}}
return t.registerComponent((function(){return{viewModel:{createViewModel:p},
template:b({class:m.classes.main,dataKBTesthookComponent:"narrative-main"},[b({
class:m.classes.navbar},r.component({name:i.name(),params:{
page:"searchState.page",totalPages:"searchState.totalPages",
typeCounts:"searchState.summary",resultCount:"searchState.totalSearchHits",
withPrivateData:"searchState.includePrivateData",
withPublicData:"searchState.includePublicData",searchStatus:"searchState.status"
}})),b({class:m.classes.header},r.component({name:c.name(),params:{}})),b({
class:m.classes.results},r.component({name:u.name(),params:{
buffer:"searchState.buffer",narrativesTotal:"narrativesTotal",
referenceDataTotal:"referenceDataTotal",featuresTotal:"featuresTotal",
status:"searchState.status",errorMessage:"searchState.errorMessage",
error:"searchState.error",view:"view",overlayComponent:"overlayComponent",
selectedObjects:"selectedObjects",doToggleShowObjects:"doToggleShowObjects",
doToggleShowMatches:"doToggleShowMatches",
doToggleShowDetails:"doToggleShowDetails"}}))]),stylesheet:m.sheet}}))}));