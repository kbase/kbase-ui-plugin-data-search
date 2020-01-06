define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/subscriptionManager","kb_lib/html","kb_common/utils","./header","./navbar","./results","./data","../../lib/searchJob","../../lib/timer"],(function(e,t,a,r,s,o,n,l,c,i,u,m,f){
"use strict";var h=(0,o.tag)("div"),p=o.makeStyles({main:{flex:"1 1 0px",
display:"flex",flexDirection:"column"},toolbar:{flex:"0 0 50px",display:"flex",
flexDirection:"column"},navbar:{flex:"0 0 50px",display:"flex",
flexDirection:"column"},header:{flex:"0 0 40px",display:"flex",
flexDirection:"column"},results:{flex:"1 1 0px",display:"flex",
flexDirection:"column"}});function b(a,r){
var o=t.contextFor(r.element),l=o.$root.runtime,c=o.$root.types,i=o.$root.appBus,h=new s,p=function(){
var e=t.observable(20),a=t.observable(),r=t.observable("none"),s=t.observable(),o=t.observable(),n=t.observable(!1),l=t.observableArray(),c=t.observable(),i=t.observable(),u=t.observable(),m=t.observableArray(),f=t.pureComputed((function(){
var t=i();if("number"==typeof t)return Math.ceil(t/e())}));return{pageSize:e,
page:a,totalPages:f,status:r,error:s,errorMessage:o,searching:n,buffer:l,
isTruncated:c,totalSearchHits:i,totalSearchSpace:u,summary:m}}(),b=u.make({
runtime:l,types:c,pageSize:p.pageSize(),maxBufferSize:100,maxSearchItems:1e4
}),d=m.make(),g=null;function v(t){if(!n.isEqual(t,g)){
if(g=t,d.cancel(),!t.input)return p.status("none"),
p.buffer(null),p.isTruncated(null),
p.totalSearchHits(null),p.summary.removeAll(),void p.totalSearchSpace(null)
;var r=m.make()
;d=r,p.searching(!0),p.status("searching"),p.error(null),p.errorMessage(null)
;var s=f.make();s.start("search");var o=e.try((function(){r.started()
})).then((function(){return b.search({start:t.start,terms:t.terms})
})).then((function(e){return s.stop("search"),s.start("processing"),e
})).then((function(e){if(!r.isCanceled()){
if(0===e.items.length)return p.status("notfound"),
p.isTruncated(!1),p.totalSearchHits(null),
p.summary.removeAll(),p.totalSearchSpace(null),void p.page(null)
;var t=a.selectedObjects().reduce((function(e,t){return e[t]=!0,e}),{})
;e.items.forEach((function(e){t[e.matchClass.ref.objectRef]&&e.selected(!0)
})),p.buffer(e.items),
p.isTruncated(e.isTruncated),p.totalSearchHits(e.summary.totalSearchHits),
p.summary.removeAll(),e.summary.totalByType.forEach((function(e){
p.summary.push(e)})),p.summary.sort((function(e,t){return t.count-e.count
})),p.totalSearchSpace(e.summary.totalSearchSpace),
p.status("success"),p.page()||e.items.length>0&&p.page(1)}
})).catch((function(e){
p.status("error"),p.errorMessage(e.message),p.error(e),i.send("error",{error:e})
})).finally((function(){
s.stop("processing"),s.log(),r.finished(),p.searching(!1)}))
;return r.running(o),o}console.warn("duplicate query suppressed?",t,g)}
var S=t.pureComputed((function(){var e,t=p.page();e=t?t-1:0
;var r=a.searchTerms();return{input:a.searchInput(),terms:r.terms,start:e,
pageSize:p.pageSize(),forced:a.forceSearch()}}))
;return h.add(S.subscribe((function(e){v(e)}))),v(S()),{searchState:p,
view:a.view,overlayComponent:a.overlayComponent,
selectedObjects:a.selectedObjects,narrativesTotal:a.narrativesTotal,
referenceDataTotal:a.referenceDataTotal,featuresTotal:a.featuresTotal,
doToggleShowMatches:function(e){p.buffer().forEach((function(t){
e?(t.showMatches(!1),t.showDetails(!1)):(t.showMatches(!0),t.showDetails(!1))}))
},doToggleShowDetails:function(e){p.buffer().forEach((function(t){
e?(t.showMatches(!1),t.showDetails(!1)):(t.showMatches(!1),t.showDetails(!0))}))
},dispose:function(){d&&d.cancel(),h.dispose()}}}
return a.registerComponent((function(){return{viewModel:{createViewModel:b},
template:h({class:p.classes.main,dataKBTesthookComponent:"reference-data-main"
},[h({class:p.classes.navbar},r.component({name:c.name(),params:{
page:"searchState.page",totalPages:"searchState.totalPages",
typeCounts:"searchState.summary",resultCount:"searchState.totalSearchHits",
searchStatus:"searchState.status",
searchSpaceCount:"searchState.totalSearchSpace"}})),h({class:p.classes.header
},r.component({name:l.name(),params:{}})),h({class:p.classes.results
},r.component({name:i.name(),params:{searchState:"searchState",
narrativesTotal:"narrativesTotal",referenceDataTotal:"referenceDataTotal",
featuresTotal:"featuresTotal",view:"view",overlayComponent:"overlayComponent",
selectedObjects:"selectedObjects",doToggleShowMatches:"doToggleShowMatches",
doToggleShowDetails:"doToggleShowDetails"}}))]),stylesheet:p.sheet}}))}));