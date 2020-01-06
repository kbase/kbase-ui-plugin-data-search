define(["kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","./dialogs/copyObjects","./viewSelector"],(function(e,t,o,n,l){
"use strict";var r=o.tag,i=r("button"),s=r("div");function a(e){return{
resultsView:e.resultsView,doCopyObjects:function(){e.overlayComponent({
name:n.name(),viewModel:{objectsToCopy:e.selectedObjects}})},
selectedObjects:e.selectedObjects}}var c=o.makeStyles({component:{
flex:"1 1 0px",display:"flex",flexDirection:"row"},searchArea:{flex:"0 0 50px"},
activeFilterInput:{backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},
modifiedFilterInput:{backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},
radioControl:{borderColor:"transparent",boxShadow:"none",margin:"0"},
radioLabel:{fontWeight:"normal",marginRight:"4px",marginLeft:"6px"}})
;function d(){return s({style:{flex:"1 1 0px",display:"flex",flexDirection:"row"
}},[s({style:{flex:"1",display:"flex",alignItems:"center"}},i({
class:"btn btn-default",dataBind:{click:"$component.doCopyObjects",
enable:"selectedObjects().length > 0"}},"Copy Selected...")),s({style:{flex:"1",
display:"flex",justifyContent:"flex-end",alignItems:"center"}},t.component({
name:l.name(),params:{resultsView:"resultsView"}}))])}
return e.registerComponent((function(){return{viewModel:a,template:d(),
stylesheet:c.sheet}}))}));