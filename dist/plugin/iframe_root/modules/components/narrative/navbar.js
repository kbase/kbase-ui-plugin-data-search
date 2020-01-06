define(["kb_knockout/registry","kb_lib/html","./summary","../controls/accessControl"],(function(t,e,a,s){
"use strict";var l=e.tag,o=l("button"),n=l("span"),i=l("div"),c=e.makeStyles({
component:{css:{flex:"1 1 0px",display:"flex",flexDirection:"row"}},toolbar:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"row",marginBottom:"10px",
alignItems:"center"}},cell:{css:{padding:"4px"}}});function r(t){return{
page:t.page,totalPages:t.totalPages,doFirstPage:function(){t.page(1)},
doPrevPage:function(){t.page()>1&&t.page(t.page()-1)},doNextPage:function(){
t.page()<t.totalPages()&&t.page(t.page()+1)},doLastPage:function(){
t.page(t.totalPages())},typeCounts:t.typeCounts,resultCount:t.resultCount,
searchStatus:t.searchStatus,withPrivateData:t.withPrivateData,
withPublicData:t.withPublicData}}return t.registerComponent((function(){return{
viewModel:r,template:i({class:c.classes.component},[i({style:{flex:"1",
display:"flex",flexDirection:"row",alignItems:"center"}},i({
class:c.classes.toolbar},[i({class:c.classes.cell,style:{flex:"0 0 auto"}},i({
class:"btn-group",role:"group"},[o({type:"button",class:"btn btn-default",
title:"Show the first page of results",dataBind:{click:"doFirstPage",
enable:"page() > 1"}},n({class:"fa fa-step-backward"})),o({type:"button",
class:"btn btn-default",title:"Show the previous page of results",dataBind:{
click:"doPrevPage",enable:"page() > 1"}},n({class:"fa fa-chevron-left"})),o({
type:"button",class:"btn btn-default",title:"Show the next page of results",
dataBind:{click:"doNextPage",enable:"page() < totalPages()"}},n({
class:"fa fa-chevron-right"})),o({type:"button",class:"btn btn-default",
title:"Show the last page of results",dataBind:{click:"doLastPage",
enable:"page() < totalPages()"}},n({class:"fa fa-step-forward"}))])),i({
class:c.classes.cell,style:{flex:"0 0 auto"}
},["\x3c!-- ko if: totalPages() === 0 --\x3e","no pages","\x3c!-- /ko --\x3e","\x3c!-- ko if: totalPages() > 0 --\x3e",i({
style:{display:"inline-block",marginLeft:"6px"}},[" Page ",n({dataBind:{
text:"page"}})," of ",n({dataBind:{text:"totalPages"}
})]),"\x3c!-- /ko --\x3e"])])),i({style:{flex:"1",display:"flex",
flexDirection:"row",alignItems:"center"}},i({dataBind:{component:{
name:a.quotedName(),params:{typeCounts:"typeCounts",resultCount:"resultCount",
searchStatus:"searchStatus"}}}})),i({style:{flex:"1",display:"flex",
flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}},i({
dataBind:{component:{name:s.quotedName(),params:{
withPrivateData:"withPrivateData",withPublicData:"withPublicData"}}}}))]),
stylesheet:c.sheet}}))}));