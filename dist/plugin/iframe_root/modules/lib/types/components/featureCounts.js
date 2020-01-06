define(["kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html"],(function(t,e,a){
"use strict"
;var o=a.tag,d=o("div"),r=o("table"),n=o("tbody"),s=o("tr"),i=o("td")
;class l extends e{constructor(t){
super(t),this.featureCounts=[],t.value&&"object"==typeof t.value&&Object.keys(t.value).forEach(e=>{
this.featureCounts.push({key:e,value:t.value[e]})})}}var u=a.makeStyles({table:{
css:{width:"100%",maxWidth:"60em"},inner:{caption:{paddingBottom:"0"},td:{
width:"50%",padding:"2px",verticalAlign:"top",
borderBottom:"0.5px solid rgba(220,220,220,0.5)"},"td:nth-child(1)":{},
"td:nth-child(2)":{wordBreak:"break-word"},"td:nth-last-child":{
borderBottom:"none"}}}});return t.registerComponent((function(){return{
viewModel:l,template:d([r({class:u.classes.table},[n({dataBind:{
foreach:"featureCounts"}},[s([i({style:{width:"8em"},dataBind:{text:"key"}}),i({
dataBind:{typedText:{value:"value",type:'"number"',format:'"0,0"'}}})])])])]),
stylesheet:u.sheet}}))}));