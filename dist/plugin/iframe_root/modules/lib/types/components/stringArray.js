define(["kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html"],(function(t,e,a){
"use strict"
;var o=a.tag,d=o("div"),i=o("table"),r=o("tbody"),s=o("tr"),n=o("td"),l=a.makeStyles({
table:{css:{width:"100%",maxWidth:"60em"},inner:{caption:{paddingBottom:"0"},
td:{padding:"2px",verticalAlign:"top",
borderBottom:"0.5px solid rgba(220,220,220,0.5)",wordBreak:"break-word"},
"td:nth-last-child":{borderBottom:"none"}}}});class c extends e{constructor(t){
super(t),this.items=t.value}}return t.registerComponent((function(){return{
viewModel:c,template:d({},[i({class:l.classes.table},[r({dataBind:{
foreach:"items"}},[s([n({dataBind:{text:"$data"}})])])])]),stylesheet:l.sheet}
}))}));