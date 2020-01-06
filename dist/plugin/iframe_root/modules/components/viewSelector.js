define(["kb_knockout/registry","kb_lib/html"],(function(e,t){"use strict"
;var l=t.tag,o=l("select"),i=l("div"),r=t.makeStyles({component:{flex:"1 1 0px",
display:"flex",flexDirection:"row"},searchArea:{flex:"0 0 50px"},
activeFilterInput:{backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},
modifiedFilterInput:{backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},
radioControl:{borderColor:"transparent",boxShadow:"none",margin:"0"},
radioLabel:{fontWeight:"normal",marginRight:"4px",marginLeft:"6px"}})
;function a(e){return{resultsView:e.resultsView,viewOptions:[{value:"list",
label:"List"},{value:"matches",label:"Matches"},{value:"detail",label:"Detail"}]
}}return e.registerComponent((function(){return{viewModel:a,template:i({
class:"form-inline pull-right"},["View ",o({class:"form-control",
title:"Select the level of detail for viewing search results",dataBind:{
value:"resultsView",options:"viewOptions",optionsText:'"label"',
optionsValue:'"value"'}})]),stylesheet:r.sheet}}))}));