define(["bluebird","knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/subscriptionManager","kb_lib/html","kb_common/utils","./navbar","./results","./data","../../lib/searchJob","../../lib/timer"],(function(e,t,a,r,s,o,i,n,c,l,u,h){
"use strict";const f=(0,o.tag)("div"),m=o.makeStyles({main:{flex:"1 1 0px",
display:"flex",flexDirection:"column"},toolbar:{flex:"0 0 50px",display:"flex",
flexDirection:"column"},navbar:{flex:"0 0 50px",display:"flex",
flexDirection:"column"},header:{flex:"0 0 40px",display:"flex",
flexDirection:"column"},results:{flex:"1 1 0px",display:"flex",
flexDirection:"column"}});function p(a,r){
var o=t.contextFor(r.element),n=o.$root.runtime,c=o.$root.types,f=o.$root.appBus,m=new s,p=function(e){
var a=t.observable(20),r=t.observable(),s=t.observable("none"),o=t.observable(),i=t.observable(),n=t.observable(!1),c=t.observableArray(),l=t.observableArray(),u=t.observable(),h=t.observable(),f=t.observable(),m=t.observableArray(),p=t.pureComputed((function(){
var e=h();if("number"==typeof e)return Math.ceil(e/a())
})),b=e.withPrivateData,w=e.withPublicData,D=e.withUserData,v=e.withReferenceData
;return{pageSize:a,page:r,totalPages:p,status:s,errorMessage:o,error:i,
searching:n,buffer:c,grouped:l,isTruncated:u,totalSearchHits:h,
totalSearchSpace:f,summary:m,withUserData:D,withReferenceData:v,
withPrivateData:b,withPublicData:w}}({withPrivateData:a.withPrivateData,
withPublicData:a.withPublicData,withUserData:a.withUserData,
withReferenceData:a.withReferenceData}),b=l.make({runtime:n,types:c,
pageSize:p.pageSize(),maxBufferSize:100,maxSearchItems:1e4}),w=u.make(),D=null
;function v(t){if(!i.isEqual(t,D)){
if(D=t,w.cancel(),!t.input)return p.status("none"),
p.buffer(null),p.isTruncated(null),
p.totalSearchHits(null),p.summary.removeAll(),void p.totalSearchSpace(null)
;var r=u.make()
;w=r,p.searching(!0),p.status("searching"),p.errorMessage(null),p.error(null)
;var s=h.make();s.start("search");var o=e.try((function(){r.started()
})).then((function(){return b.search({start:t.start,terms:t.terms,
withUserData:t.withUserData,withReferenceData:t.withReferenceData,
withPrivateData:t.withPrivateData,withPublicData:t.withPublicData})
})).then((function(e){return s.stop("search"),s.start("processing"),e
})).then((function(e){if(!r.isCanceled()){
if(0===e.items.length)return p.status("notfound"),
p.isTruncated(!1),p.totalSearchHits(null),
p.summary.removeAll(),p.totalSearchSpace(null),void p.page(null)
;var t=a.selectedObjects().reduce((function(e,t){return e[t]=!0,e}),{})
;e.items.forEach((function(e){t[e.matchClass.ref.ref]&&e.selected(!0)
})),p.buffer(e.items),
p.grouped(e.grouped),p.isTruncated(e.isTruncated),p.totalSearchHits(e.summary.totalSearchHits),
p.summary.removeAll(),
p.totalSearchSpace(e.summary.totalSearchSpace),p.status("success"),
p.page()||e.items.length>0&&p.page(1)}})).catch((function(e){
p.status("error"),p.errorMessage(e.message),p.error(e),f.send("error",{error:e})
})).finally((function(){
s.stop("processing"),s.log(),r.finished(),p.searching(!1)}))
;return r.running(o),o}console.warn("duplicate query suppressed?",t,D)}
var d=t.pureComputed((function(){var e,t=p.page();e=t?t-1:0
;var r=a.searchTerms();return{input:a.searchInput(),terms:r.terms,start:e,
pageSize:p.pageSize(),forced:a.forceSearch(),withUserData:p.withUserData(),
withReferenceData:p.withReferenceData(),withPrivateData:p.withPrivateData(),
withPublicData:p.withPublicData()}}));return m.add(d.subscribe((function(e){v(e)
}))),v(d()),{searchState:p,view:a.view,narrativesTotal:a.narrativesTotal,
referenceDataTotal:a.referenceDataTotal,featuresTotal:a.featuresTotal,
overlayComponent:a.overlayComponent,selectedObjects:a.selectedObjects,
doToggleShowMatches:function(e){p.buffer().forEach((function(t){
e?(t.showMatches(!1),t.showDetails(!1)):(t.showMatches(!0),t.showDetails(!1))}))
},doToggleShowDetails:function(e){p.buffer().forEach((function(t){
e?(t.showMatches(!1),t.showDetails(!1)):(t.showMatches(!1),t.showDetails(!0))}))
},dispose:function(){w&&w.cancel(),m.dispose()}}}
return a.registerComponent((function(){return{viewModel:{createViewModel:p},
template:f({class:m.classes.main,dataKBTesthookComponent:"genome-features-main"
},[f({class:m.classes.navbar},r.component({name:n.name(),params:{
page:"searchState.page",totalPages:"searchState.totalPages",
typeCounts:"searchState.summary",resultCount:"searchState.totalSearchHits",
searchStatus:"searchState.status",
searchSpaceCount:"searchState.totalSearchSpace",
withUserData:"searchState.withUserData",
withReferenceData:"searchState.withReferenceData",
withPrivateData:"searchState.withPrivateData",
withPublicData:"searchState.withPublicData"}})),f({class:m.classes.results
},r.component({name:c.name(),params:{searchState:"searchState",
narrativesTotal:"narrativesTotal",referenceDataTotal:"referenceDataTotal",
featuresTotal:"featuresTotal",view:"view",overlayComponent:"overlayComponent",
selectedObjects:"selectedObjects",doToggleShowMatches:"doToggleShowMatches",
doToggleShowDetails:"doToggleShowDetails"}}))]),stylesheet:m.sheet}}))}));