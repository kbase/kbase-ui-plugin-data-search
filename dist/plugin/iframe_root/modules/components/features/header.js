define(["kb_knockout/registry","kb_lib/html"],(function(e,s){"use strict"
;var l=(0,s.tag)("div"),t=s.makeStyles({component:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column",fontStyle:"italic",color:"#777"},pseudo:{
":-webkit-scrollbar-track":{backgroundColor:"white"}}},header:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"row",marginBottom:"10px",
borderBottom:"0.5px solid rgba(200,200,200,1)"}},headerCell:{css:{padding:"4px"}
}});function a(){return{}}return e.registerComponent((function(){return{
viewModel:a,template:l({class:t.classes.component},[l({class:t.classes.header
},[l({class:t.classes.headerCell,style:{flex:"0 0 2em"}}),l({
class:t.classes.headerCell,style:{flex:"1"}},["Feature Type"]),l({
class:t.classes.headerCell,style:{flex:"1.6"}},["ID"]),l({
class:t.classes.headerCell,style:{flex:"3"}},["Functions"]),l({
class:t.classes.headerCell,style:{flex:"0 0 4em"}})])]),stylesheet:t.sheet}}))
}));