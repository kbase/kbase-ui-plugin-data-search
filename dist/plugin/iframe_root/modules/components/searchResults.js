define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","../lib/nanoBus","./tabset","./narrative/main","./narrative/tab","./reference/main","./reference/tab","./features/main","./features/tab"],(function(e,a,t,r,n,o,s,c,i,l,m,u){
"use strict";var f=(0,r.tag)("div");function b(a,t){
var r=e.contextFor(t.element).$root.runtime,o=n.make()
;return o.on("ready",(function(){o.send("add-tab",{tab:{id:"user-data",tab:{
label:"User Data",component:{name:c.name(),params:{count:a.narrativesTotal}}},
panel:{component:{name:s.name(),params:{view:a.view,searchInput:a.searchInput,
forceSearch:a.forceSearch,searchTerms:a.searchTerms,
overlayComponent:a.overlayComponent,selectedObjects:a.selectedObjects,
narrativesTotal:a.narrativesTotal,referenceDataTotal:a.referenceDataTotal,
featuresTotal:a.featuresTotal,withPrivateData:a.withPrivateData,
withPublicData:a.withPublicData}}}}
},!1),r.featureEnabled("search_features")&&o.send("add-tab",{tab:{
id:"genome-features",tab:{label:"Genome Features",component:{name:u.name(),
params:{count:a.featuresTotal}}},panel:{component:{name:m.name(),params:{
view:a.view,searchInput:a.searchInput,forceSearch:a.forceSearch,
searchTerms:a.searchTerms,overlayComponent:a.overlayComponent,
selectedObjects:a.selectedObjects,narrativesTotal:a.narrativesTotal,
referenceDataTotal:a.referenceDataTotal,featuresTotal:a.featuresTotal,
withPrivateData:a.withPrivateData,withPublicData:a.withPublicData,
withUserData:a.withUserData,withReferenceData:a.withReferenceData}}}}
},!1),o.send("add-tab",{tab:{id:"reference-data",tab:{label:"Reference Data",
component:{name:l.name(),params:{count:a.referenceDataTotal}}},panel:{
component:{name:i.name(),params:{view:a.view,searchInput:a.searchInput,
forceSearch:a.forceSearch,searchTerms:a.searchTerms,
overlayComponent:a.overlayComponent,selectedObjects:a.selectedObjects,
narrativesTotal:a.narrativesTotal,referenceDataTotal:a.referenceDataTotal,
featuresTotal:a.featuresTotal}}}}},!1),o.send("select-tab",0)})),{view:a.view,
tabsetBus:o}}return a.registerComponent((function(){return{viewModel:{
createViewModel:b},template:f({style:{flex:"1 1 0px",display:"flex",
flexDirection:"column"}},[t.component({name:o.name(),params:{bus:"tabsetBus",
view:"view"}})])}}))}));