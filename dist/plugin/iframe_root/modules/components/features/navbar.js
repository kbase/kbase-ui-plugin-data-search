define(["kb_knockout/registry","kb_lib/html","./summary","../controls/accessControl","../controls/dataSource"],(function(e,t,a,s,l){
"use strict";var n=t.tag,o=n("button"),i=n("span"),c=n("div"),r=t.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"row"}},toolbar:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"row",marginBottom:"10px",
alignItems:"center"}},cell:{css:{padding:"4px"}}});function p(e){return{
page:e.page,totalPages:e.totalPages,doFirstPage:function(){e.page(1)},
doPrevPage:function(){e.page()>1&&e.page(e.page()-1)},doNextPage:function(){
e.page()<e.totalPages()&&e.page(e.page()+1)},doLastPage:function(){
e.page(e.totalPages())},typeCounts:e.typeCounts,resultCount:e.resultCount,
searchStatus:e.searchStatus,searchSpaceCount:e.searchSpaceCount,
withUserData:e.withUserData,withReferenceData:e.withReferenceData,
withPrivateData:e.withPrivateData,withPublicData:e.withPublicData}}
return e.registerComponent((function(){return{viewModel:p,template:c({
class:r.classes.component},[c({style:{flex:"1",display:"flex",
flexDirection:"row",alignItems:"center"}},c({class:r.classes.toolbar},[c({
class:r.classes.cell,style:{flex:"0 0 auto"}},c({class:"btn-group",role:"group"
},[o({type:"button",class:"btn btn-default",
title:"Show the first page of results",dataBind:{click:"doFirstPage",
enable:"page() > 1"}},i({class:"fa fa-step-backward"})),o({type:"button",
class:"btn btn-default",title:"Show the previous page of results",dataBind:{
click:"doPrevPage",enable:"page() > 1"}},i({class:"fa fa-chevron-left"})),o({
type:"button",class:"btn btn-default",title:"Show the next page of results",
dataBind:{click:"doNextPage",enable:"page() < totalPages()"}},i({
class:"fa fa-chevron-right"})),o({type:"button",class:"btn btn-default",
title:"Show the last page of results",dataBind:{click:"doLastPage",
enable:"page() < totalPages()"}},i({class:"fa fa-step-forward"}))])),c({
class:r.classes.cell,style:{flex:"0 0 auto"}
},["\x3c!-- ko if: totalPages() === 0 --\x3e","no pages","\x3c!-- /ko --\x3e","\x3c!-- ko if: totalPages() > 0 --\x3e",c({
style:{display:"inline-block",marginLeft:"6px"}},[" Page ",i({dataBind:{
text:"page"}})," of ",i({dataBind:{text:"totalPages"}
})]),"\x3c!-- /ko --\x3e"])])),c({style:{flex:"1",display:"flex",
flexDirection:"row",alignItems:"center"}},c({dataBind:{component:{
name:a.quotedName(),params:{typeCounts:"typeCounts",resultCount:"resultCount",
searchStatus:"searchStatus",searchSpaceCount:"searchSpaceCount"}}}})),c({style:{
flex:"1",display:"flex",flexDirection:"row",alignItems:"center",
justifyContent:"flex-end"}},c({dataBind:{component:{name:l.quotedName(),params:{
withUserData:"withUserData",withReferenceData:"withReferenceData"}}}})),c({
style:{flex:"1",display:"flex",flexDirection:"row",alignItems:"center",
justifyContent:"flex-end"}},c({dataBind:{component:{name:s.quotedName(),params:{
withPrivateData:"withPrivateData",withPublicData:"withPublicData"}}}}))]),
stylesheet:r.sheet}}))}));