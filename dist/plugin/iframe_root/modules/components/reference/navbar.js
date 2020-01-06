define(["kb_knockout/registry","kb_lib/html","./summary"],(function(e,t,a){
"use strict";var s=t.tag,l=s("button"),o=s("span"),n=s("div"),c=t.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"row"}},toolbar:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"row",marginBottom:"10px",
alignItems:"center"}},cell:{css:{padding:"4px"}}});function r(e){return{
page:e.page,totalPages:e.totalPages,doFirstPage:function(){e.page(1)},
doPrevPage:function(){e.page()>1&&e.page(e.page()-1)},doNextPage:function(){
e.page()<e.totalPages()&&e.page(e.page()+1)},doLastPage:function(){
e.page(e.totalPages())},typeCounts:e.typeCounts,resultCount:e.resultCount,
searchStatus:e.searchStatus,searchSpaceCount:e.searchSpaceCount}}
return e.registerComponent((function(){return{viewModel:r,template:n({
class:c.classes.component},[n({style:{flex:"1",display:"flex",
flexDirection:"row",alignItems:"center"}},n({class:c.classes.toolbar},[n({
class:c.classes.cell,style:{flex:"0 0 auto"}},n({class:"btn-group",role:"group"
},[l({type:"button",class:"btn btn-default",
title:"Show the first page of results",dataBind:{click:"doFirstPage",
enable:"page() > 1"}},o({class:"fa fa-step-backward"})),l({type:"button",
class:"btn btn-default",title:"Show the previous page of results",dataBind:{
click:"doPrevPage",enable:"page() > 1"}},o({class:"fa fa-chevron-left"})),l({
type:"button",class:"btn btn-default",title:"Show the next page of results",
dataBind:{click:"doNextPage",enable:"page() < totalPages()"}},o({
class:"fa fa-chevron-right"})),l({type:"button",class:"btn btn-default",
title:"Show the last page of results",dataBind:{click:"doLastPage",
enable:"page() < totalPages()"}},o({class:"fa fa-step-forward"}))])),n({
class:c.classes.cell,style:{flex:"0 0 auto"}
},["\x3c!-- ko if: totalPages() === 0 --\x3e","no pages","\x3c!-- /ko --\x3e","\x3c!-- ko if: totalPages() > 0 --\x3e",n({
style:{display:"inline-block",marginLeft:"6px"}},[" Page ",o({dataBind:{
text:"page"}})," of ",o({dataBind:{text:"totalPages"}
})]),"\x3c!-- /ko --\x3e"])])),n({style:{flex:"1",display:"flex",
flexDirection:"row",alignItems:"center"}},n({dataBind:{component:{
name:a.quotedName(),params:{typeCounts:"typeCounts",resultCount:"resultCount",
searchStatus:"searchStatus",searchSpaceCount:"searchSpaceCount"}}}}))]),
stylesheet:c.sheet}}))}));