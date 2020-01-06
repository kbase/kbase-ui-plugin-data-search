define(["kb_knockout/registry","kb_lib/html"],(function(e,t){"use strict"
;const a=t.tag,l=a("div"),r=a("span"),c=a("input"),o=a("label"),n=t.makeStyles({
component:{flex:"1 1 0px",display:"flex",flexDirection:"column"},searchArea:{
flex:"0 0 50px"},filterArea:{flex:"0 0 50px",textAlign:"left"},resultArea:{
flex:"1 1 0px",display:"flex",flexDirection:"column"},activeFilterInput:{
backgroundColor:"rgba(209, 226, 255, 1)",color:"#000"},modifiedFilterInput:{
backgroundColor:"rgba(255, 245, 158, 1)",color:"#000"},checkboxControl:{
borderColor:"transparent",boxShadow:"none",margin:"0 2px"},checkboxLabel:{
fontWeight:"normal",marginRight:"4px",marginLeft:"6px"},fieldGroupLabel:{
fontWeight:"bold",color:"gray",marginTop:"8px",marginRight:"4px"}})
;function s(e){return{withUserData:e.withUserData,
withReferenceData:e.withReferenceData}}return e.registerComponent((function(){
return{viewModel:s,template:l({style:{flex:"1 1 0px",display:"flex",
flexDirection:"row"}},[l({style:{flex:"1",display:"flex",
justifyContent:"flex-end",alignItems:"center"}},l({class:"form-inline"},[r({
class:n.classes.fieldGroupLabel},"Data source:"),r({
class:["form-control",n.classes.checkboxControl],
title:"Search over data created by users in Narratives",dataBind:{
css:'withUserData() ? "'+n.classes.activeFilterInput+'" : null'}},o({
class:n.classes.checkboxLabel},[c({type:"checkbox",dataBind:{
checked:"withUserData"}})," User"])),r({
class:["form-control",n.classes.checkboxControl],
title:"Search over reference data",dataBind:{
css:'withReferenceData() ? "'+n.classes.activeFilterInput+'" : null'}},o({
class:n.classes.checkboxLabel},[c({type:"checkbox",dataBind:{
checked:"withReferenceData"}})," Reference"]))]))]),stylesheet:n.sheet}}))}));