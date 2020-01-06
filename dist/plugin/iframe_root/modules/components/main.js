define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/subscriptionManager","kb_lib/html","kb_knockout/components/overlayPanel","./navBar","./searchBar","./searchResults","./viewSelector","./copyObjectsControl","./dialogs/searchError","../lib/searchApi","../lib/data","../lib/errors","../lib/profile"],(function(e,r,t,o,a,n,s,i,c,l,u,p,m,f,d,h){
"use strict";var b=(0,a.tag)("div");function v(r,t){
var a=new o,n=e.contextFor(t.element),s=n.$root.runtime,i=n.$root.appBus,c=m.make({
runtime:s}),l=f.make({runtime:r.runtime}),u=e.observable(),b=e.observable()
;a.add(b.subscribe((function(e){!function(e){if(!e)return
;if(0===e.trim().length)return;g.remove(e),g.unshift(e),g().length>10&&g.pop()
}(e)})));var v=e.observable(),w=e.pureComputed((function(){if(!b())return{
terms:[],diagnosis:"empty-input"}
;var e=b().trim().split(/\s+/).filter((function(e){return e.length}))
;if(0===e.length)return{terms:[],diagnosis:"just-whitespace"}
;var r=e.filter((function(e){return!l.isStopWord(e)}));if(e.length>r.length){
var t=e.filter((function(e){return l.isStopWord(e)}));return 0===r.length?{
terms:[],diagnosis:"just-stopwords",theStopWords:t}:{terms:r,
diagnosis:"some-stopwords",theStopWords:t}}return{terms:r,diagnosis:"ok",
force:v()}})),y=e.pureComputed((function(){var e=w();switch(e.diagnosis){
case"just-whitespace":
return["Empty search input.","You must supply one or more terms to initiate a query."]
;case"just-stopwords":
return['The search consisted of just "stop words".',"Stop words are considered too common to be usefully applied to a search.","The following stop words were detected: "+e.theStopWords.join(", ")+"."]
;case"some-stopwords":
return['The search included some "stop words".',"Stop words are considered too common to be usefully applied to a search and are removed from the terms before submitting the query.","The following stop words were detected and removed: "+e.theStopWords.join(", ")+".","The terms sent were: "+e.terms.join(" ")]
}return[]})),g=e.observableArray();a.add(g.subscribe((function(e){!function(e){
h.make({runtime:s}).saveHistory("search",e).spread((function(e,r){if(e)return e
;i.send("error",r)}))}(e)})))
;var k=e.observable("detail"),x=e.observableArray(),D=e.observable(),T=e.observable(),j=e.observable(),C=e.observable(!0),S=e.observable(!0),A=e.observable(!0),P=e.observable(!0),I=e.pureComputed((function(){
return{query:w().terms.join(" ")}}));a.add(I.subscribe((function(e){
if(e.query)return c.referenceObjectSearchTotal(e).then((function(e){T(e)}))
;T(null)})));var O=e.pureComputed((function(){return{query:w().terms.join(" "),
withPrivateData:C(),withPublicData:S()}}));a.add(O.subscribe((function(e){
if(e.query)return c.narrativeObjectSearchTotal(e).then((function(e){D(e)}))
;D(null)})));var R=e.pureComputed((function(){return{query:w().terms.join(" "),
withPrivateData:C(),withPublicData:S(),withUserData:A(),withReferenceData:P()}
}));return s.featureEnabled("search_features")&&a.add(R.subscribe((function(e){
if(e.query)return c.featuresSearchTotal(e).then((function(e){j(e)}));j(null)
}))),i.on("error",(function(e){var r=function(e){
return e.error?e.error instanceof d.DataSearchError?(r=e.error.stack.split("\n"),
console.error("data search error",e.error),{source:e.error.source,
id:e.error.code,message:e.error.message,detail:e.error.detail,info:e.error.info,
stackTrace:e.error.info.originalError.stack.split("\n")
}):e.error instanceof Error?(r=e.error.stack.split("\n"),{source:"Error",
id:e.error.name,message:e.error.message,stackTrace:r
}):"string"==typeof e.error?{message:e.error
}:"object"==typeof e.error?(console.warn("Unknown error object: ",e.error),{
source:"Unknown"}):void 0:{source:e.source,id:e.id,message:e.message,
stackTrace:e.stackTrace,info:e.info};var r}(e);u({name:p.name(),type:"error",
viewModel:{error:r}})})),i.on("alert",(function(e){alert(e)
})),i.start(),h.make({runtime:s}).getHistory("search").spread((function(e,r){
if(e)return e;i.send("error",r)})).then((function(e){g(e)})).then((function(){
b(r.initialQuery)})).catch((function(e){
console.error("ERROR retrieving search history",e)})),{appBus:i,searchInput:b,
forceSearch:v,inputWarnings:y,searchTerms:w,searchHistory:g,overlayComponent:u,
resultsView:k,selectedObjects:x,narrativesTotal:D,referenceDataTotal:T,
featuresTotal:j,withPrivateData:C,withPublicData:S,withUserData:A,
withReferenceData:P,dispose:function(){i.stop(),a.dispose()}}}
var w=a.makeStyles({component:{flex:"1 1 0px",display:"flex",
flexDirection:"column",paddingRight:"12px",paddingLeft:"12px"},navArea:{
flex:"0 0 50px"},searchArea:{flex:"0 0 50px"},filterArea:{flex:"0 0 50px",
textAlign:"left"},resultArea:{flex:"1 1 0px",display:"flex",
flexDirection:"column"},activeFilterInput:{
backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},modifiedFilterInput:{
backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},checkboxControl:{
borderColor:"transparent",boxShadow:"none",margin:"0 2px"}})
;return r.registerComponent((function(){return{viewModel:{createViewModel:v},
template:b({class:w.classes.component,dataKBTesthookComponent:"main"},[b({
class:w.classes.navArea},b({style:{flex:"1 1 0px",display:"flex",
flexDirection:"row"}},[b({style:{flex:"1"}},t.component({name:s.name(),params:{
searchInput:"searchInput"}}))])),b({class:w.classes.searchArea},b({style:{
flex:"1 1 0px",display:"flex",flexDirection:"row"}},[b({style:{flex:"2"}
},t.component({name:i.name(),params:{searchInput:"searchInput",
forceSearch:"forceSearch",inputWarnings:"inputWarnings",
searchHistory:"searchHistory",overlayComponent:"overlayComponent",
resultsView:"resultsView"}})),b({style:{flex:"1"}},t.component({name:u.name(),
params:{selectedObjects:"selectedObjects",overlayComponent:"overlayComponent"}
})),b({style:{flex:"0 0 auto"}},t.component({name:l.name(),params:{
resultsView:"resultsView"}}))])),b({class:w.classes.resultArea},[t.component({
name:c.name(),params:{searchInput:"searchInput",forceSearch:"forceSearch",
searchTerms:"searchTerms",view:"resultsView",
overlayComponent:"overlayComponent",selectedObjects:"selectedObjects",
narrativesTotal:"narrativesTotal",referenceDataTotal:"referenceDataTotal",
featuresTotal:"featuresTotal",withPrivateData:"withPrivateData",
withPublicData:"withPublicData",withUserData:"withUserData",
withReferenceData:"withReferenceData"}})]),t.component({name:n.name(),params:{
component:"overlayComponent",hostVm:"$data"}})]),stylesheet:w.sheet}}))}));