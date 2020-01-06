define(["kb_knockout/registry","kb_lib/html"],(function(e,t){"use strict"
;var a=t.tag,l=a("div"),i=a("span"),o=a("input"),r=a("label"),c=t.makeStyles({
component:{flex:"1 1 0px",display:"flex",flexDirection:"column"},searchArea:{
flex:"0 0 50px"},filterArea:{flex:"0 0 50px",textAlign:"left"},resultArea:{
flex:"1 1 0px",display:"flex",flexDirection:"column"},activeFilterInput:{
backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},modifiedFilterInput:{
backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},checkboxControl:{
borderColor:"transparent",boxShadow:"none",margin:"0 2px"},checkboxLabel:{
fontWeight:"normal",marginRight:"4px",marginLeft:"6px"},fieldGroupLabel:{
fontWeight:"bold",color:"gray",marginTop:"8px",marginRight:"4px"}})
;function s(e){return{withPrivateData:e.withPrivateData,
withPublicData:e.withPublicData}}return e.registerComponent((function(){return{
viewModel:s,template:l({style:{flex:"1 1 0px",display:"flex",flexDirection:"row"
}},[l({style:{flex:"1",display:"flex",justifyContent:"flex-end",
alignItems:"center"}},l({class:"form-inline"},[i({
class:c.classes.fieldGroupLabel},"Access:"),i({
class:["form-control",c.classes.checkboxControl],
title:"Indicate whether to show private data - your data or shared directly with you",
dataBind:{css:'withPrivateData() ? "'+c.classes.activeFilterInput+'" : null'}
},r({class:c.classes.checkboxLabel},[o({type:"checkbox",dataBind:{
checked:"withPrivateData",enable:"withPublicData"}})," Private"])),i({
class:["form-control",c.classes.checkboxControl],
title:"Indicate whether to show public data - data which has been made viewable to all KBase users",
dataBind:{css:'withPublicData() ? "'+c.classes.activeFilterInput+'" : null'}
},r({class:c.classes.checkboxLabel},[o({type:"checkbox",dataBind:{
checked:"withPublicData",enable:"withPrivateData"}})," Public"]))]))]),
stylesheet:c.sheet}}))}));