define(["knockout","kb_knockout/registry","kb_lib/html"],(function(o,e,r){
"use strict";const t=r.tag,n=t("div"),a=t("span"),s=t("a");function l(e){return{
searchInputQueryValue:o.pureComputed((function(){
return encodeURIComponent(e.searchInput()||"")}))}}const i=r.makeStyles({
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
left:"0",right:"0"},navBar:{css:{borderBottom:"1px silver solid"}},
selectedNavLink:{css:{display:"inline-block",padding:"4px 8px",
margin:"0 8px 0 8px",cursor:"pointer",verticalAlign:"center",
border:"1px rgba(200, 200, 200, 1) solid",marginBottom:"-1px",
borderBottom:"1px white solid"}},navLink:{css:{display:"inline-block",
padding:"4px 8px",margin:"0 8px 0 8px",cursor:"pointer",verticalAlign:"center",
border:"1px rgba(200, 200, 200, 0.5) solid",borderBottom:"none",
backgroundColor:"#DDD",opacity:"0.8"},pseudo:{hover:{backgroundColor:"#FFF",
opacity:"1"}}},label:{css:{fontWeight:"bold",color:"gray",marginRight:"4px"}}})
;return e.registerComponent((function(){return{viewModel:l,template:n({
class:i.classes.component,dataKBTesthookComponent:"nav-bar"},[n({styles:{
flex:"1 1 0px"}},n({class:i.classes.navBar},[a({class:i.classes.label
},"Search:"),a({class:i.classes.selectedNavLink
},"KBase - User Data, Genome Features, Reference Data"),s({dataBind:{attr:{
href:'"/#jgi-search?q=" + searchInputQueryValue()'}},class:i.classes.navLink,
target:"_parent"},"JGI")]))]),stylesheet:i.sheet}}))}));