define(["jquery","knockout","kb_knockout/registry","kb_knockout/lib/subscriptionManager","kb_lib/html","./searchHelp"],(function(e,t,o,n,s,a){
"use strict"
;var r=s.tag,i=r("p"),c=r("div"),l=r("span"),d=r("button"),u=r("input")
;function p(e){
var o=new n,r=e.searchInput,i=e.searchHistory,c=e.inputWarnings,l=e.forceSearch,d=t.observable(!1)
;var u=t.observableArray([]);function p(){u.removeAll()}
o.add(c.subscribe((function(e){
0===e.length&&u.removeAll(),e.forEach((function(e){u.push(e)}))})))
;var g=t.observable().syncFrom(e.searchInput);o.add(r.subscribe((function(t){
e.searchInput(t)})));var y=t.pureComputed((function(){
return g()!==r()?h.classes.modifiedFilterInput:r()?h.classes.activeFilterInput:null
}));function f(){r(g()),l((new Date).getTime())}var b=s.genId();function k(e){
var t=e.target.getAttribute("data-type")
;return-1==["history-toggle-button","history-toggle-button-icon","history-item"].indexOf(t)&&d(!1),
!0}return document.addEventListener("click",k,!0),{searchControlValue:g,
searching:t.observable(!1),showHistory:d,doToggleHistory:function(){d(!d())},
useFromHistory:function(e){d(!1),g(e),r(e)},searchHistory:i,searchInputClass:y,
historyContainerId:b,warnings:u,doClearWarnings:p,doHelp:function(){
e.overlayComponent({name:a.name(),params:{},viewModel:{}})},doRunSearch:f,
doKeyUp:function(e,t){
u().length>0&&p(),t.key?"Enter"===t.key&&f():t.keyCode&&13===t.keyCode&&f()},
doClearInput:function(){g(""),f()},dispose:function(){
k&&document.removeEventListener("click",k,!0),o.dispose()}}}var h=s.makeStyles({
component:{flex:"1 1 0px",display:"flex",flexDirection:"column"},searchArea:{
flex:"0 0 50px"},activeFilterInput:{backgroundColor:"rgba(209, 226, 255, 1)",
color:"#000"},modifiedFilterInput:{backgroundColor:"rgba(255, 245, 158, 1)",
color:"#000"},historyContainer:{display:"block",position:"absolute",
border:"1px silver solid",backgroundColor:"rgba(255,255,255,0.9)",zIndex:"3",
top:"100%",left:"0",right:"0"},historyItem:{css:{padding:"3px",cursor:"pointer"
},pseudo:{hover:{backgroundColor:"silver"}}},addonButton:{css:{color:"black",
cursor:"pointer"},pseudo:{hover:{backgroundColor:"silver"},active:{
backgroundColor:"gray",color:"white"}}},addonButtonDisabled:{css:{color:"gray",
cursor:"normal"}},warningContainer:{display:"block",position:"absolute",
border:"1px silver solid",backgroundColor:"#fcf8e3",zIndex:"3",top:"100%",
left:"0",right:"0"}});return o.registerComponent((function(){return{viewModel:p,
template:c({class:h.classes.component,dataKBTesthookComponent:"search-bar"},[c({
styles:{flex:"1 1 0px"}},c({class:"form"},c({class:"input-group"},[c({
class:"form-control",style:{display:"inline-block",width:"100%",
position:"relative",padding:"0",border:"none"}},[u({class:"form-control",
title:"Enter one or more search terms here, the press Enter/Return or click the search icon",
dataBind:{textInput:"searchControlValue",hasFocus:!0,css:"searchInputClass",
event:{keyup:"doKeyUp"}},dataKBTesthookInput:"search-input",
placeholder:"Search KBase Data"}),"\x3c!-- ko if: showHistory --\x3e",c({
class:h.classes.historyContainer,dataBind:{attr:{id:"historyContainerId"}}
},["\x3c!-- ko if: searchHistory().length > 0 --\x3e","\x3c!-- ko foreach: searchHistory --\x3e",c({
dataBind:{text:"$data",click:"$component.useFromHistory"},
class:h.classes.historyItem,dataType:"history-item"
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: searchHistory().length > 0 --\x3e",i({
style:{fontStyle:"italic"}
},"no items in history yet - Search!"),"\x3c!-- /ko --\x3e"]),"\x3c!-- /ko --\x3e","\x3c!-- ko if: warnings().length && !showHistory() --\x3e",c({
class:h.classes.warningContainer},[c({dataBind:{foreach:"warnings"}},c({style:{
marginTop:"2px",marginBottom:"2px",padding:"3px"},dataBind:{text:"$data"}})),c({
style:{borderTop:"1px solid rgba(200,200,200,0.5)",padding:"3px",
textAlign:"center"}},[d({class:"btn btn-default btn-sm",type:"button",dataBind:{
click:"doClearWarnings"}},"Clear")])]),"\x3c!-- /ko --\x3e"]),c({
class:"input-group-addon "+h.classes.addonButton,
title:"Click me to run the search",style:{cursor:"pointer",paddingLeft:"4px",
paddingRight:"4px"},dataBind:{click:"doRunSearch"}},l({style:{
display:"inline-block",width:"2em",textAlign:"center"}},l({class:"fa",style:{
fontSize:"100%",color:"#000"},dataBind:{css:{"fa-search":"!searching()",
"fa-spinner fa-pulse":"searching()"}}}))),c({
class:"input-group-addon "+h.classes.addonButton,
title:"Click me to clear the search input area to the left",dataBind:{
click:"searchControlValue() ? doClearInput : null",
css:'searchControlValue() ? "'+h.classes.addonButton+'" : "'+h.classes.addonButtonDisabled+'"'
}},l({class:"fa fa-times"})),c({
class:"input-group-addon "+h.classes.addonButton,
title:"Click me to see the last 10 unique search inputs",
dataType:"history-toggle-button",dataBind:{click:"doToggleHistory",style:{
"background-color":'showHistory() ? "silver" : null'}}},l({
dataType:"history-toggle-button-icon",class:"fa fa-history"})),c({
class:"input-group-addon "+h.classes.addonButton,
title:"Click me to see help for Data Search",dataBind:{click:"doHelp"}},l({
class:"fa fa-question"}))])))]),stylesheet:h.sheet}}))}));