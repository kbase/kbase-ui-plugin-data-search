define(["kb_knockout/registry","kb_lib/html"],(function(e,s){"use strict"
;var l=(0,s.tag)("div"),a=s.makeStyles({component:{css:{flex:"1 1 0px",
display:"flex",flexDirection:"column",overflowY:"scroll"},pseudo:{
":-webkit-scrollbar-track":{backgroundColor:"white"}}},header:{css:{
flex:"1 1 0px",display:"flex",flexDirection:"row",marginBottom:"10px",
borderBottom:"1px solid silver"}},headerCell:{css:{padding:"4px"}}})
;function t(){return{}}return e.registerComponent((function(){return{
viewModel:t,template:l({class:a.classes.component},[l({class:a.classes.header
},[l({class:a.classes.headerCell,style:{flex:"0 0 2em"}}),l({
class:a.classes.headerCell,style:{flex:"1"}},"Type"),l({
class:a.classes.headerCell,style:{flex:"0 0 2em"}}),l({
class:a.classes.headerCell,style:{flex:"4"}},["Name"]),l({
class:a.classes.headerCell,style:{flex:"1.5"}},["Modified"]),l({
class:a.classes.headerCell,style:{flex:"0 0 4em"}})])]),stylesheet:a.sheet}}))
}));