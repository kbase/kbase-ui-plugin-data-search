define(["kb_knockout/registry","kb_lib/html"],(function(e,s){"use strict"
;var t=s.tag,a=t("span"),l=t("label"),r=t("input"),i=t("div"),o=s.makeStyles({
component:{flex:"1 1 0px",display:"flex",flexDirection:"row"},searchArea:{
flex:"0 0 50px"},activeFilterInput:{backgroundColor:"rgba(209, 226, 255, 1)",
color:"#000"},modifiedFilterInput:{backgroundColor:"rgba(255, 245, 158, 1)",
color:"#000"},radioControl:{borderColor:"transparent",boxShadow:"none",
margin:"0"},radioLabel:{fontWeight:"normal",marginRight:"4px",marginLeft:"6px"}
});function n(e){return{resultsView:e.resultsView}}
return e.registerComponent((function(){return{viewModel:n,template:i({
class:"form-inline pull-right"},["View ",a({dataBind:{
css:'resultsView() === "list" ? "'+o.classes.activeFilterInput+'" : null'},
class:["form-control",o.classes.radioControl]},l({class:o.classes.radioLabel
},[r({type:"radio",name:"results-view",value:"list",dataBind:{
checked:"resultsView"}})," List"])),a({dataBind:{
css:'resultsView() === "matches" ? "'+o.classes.activeFilterInput+'" : null'},
class:["form-control",o.classes.radioControl]},l({class:o.classes.radioLabel
},[r({type:"radio",name:"results-view",value:"matches",dataBind:{
checked:"resultsView"}})," Matches"])),a({dataBind:{
css:'resultsView() === "detail" ? "'+o.classes.activeFilterInput+'" : null'},
class:["form-control",o.classes.radioControl]},l({class:o.classes.radioLabel
},[r({type:"radio",name:"results-view",value:"detail",dataBind:{
checked:"resultsView"}})," Detail"]))]),stylesheet:o.sheet}}))}));