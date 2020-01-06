define(["knockout","kb_knockout/registry","kb_lib/html","kb_lib/htmlBuilders","kb_lib/htmlBootstrapBuilders","../../lib/ui","../../lib/data"],(function(e,t,a,r,o,n,i){
"use strict"
;var l=a.tag,c=l("div"),s=l("p"),d=l("span"),u=l("button"),p=l("input"),b=l("table"),m=l("tr"),x=l("td")
;function v(t,a){
var r=e.contextFor(a.element).$root.runtime,o=t.narrative,n=e.observable(),l=e.observable(),c=e.observable(),s=e.observable("none"),d=e.observable(),u=i.make({
runtime:r});var p=e.pureComputed((function(){return!!(l()&&l().length>0)}))
;return u.getNarrative(t.narrative).then((function(e){
n(e.workspaceInfo.metadata.narrative_nice_name),
l(e.workspaceInfo.metadata.narrative_nice_name+" - Copy")})),{
title:"Duplicate Narrative",oldNarrativeName:n,newNarrativeName:l,
canDuplicate:p,newNarrative:c,status:s,error:d,doClose:function(){t.onClose()},
doDuplicate:function(){s("inprogress"),u.copyNarrative({
workspaceId:o.workspaceId,objectId:o.objectId,name:l()}).then((function(e){
s("success"),c(e)})).catch((function(e){s("error"),d(e.message)}))},
doOpenNarrative:function(e){
var t="ws."+e.workspaceInfo.id+".obj."+e.objectInfo.id
;window.open(window.location.origin+"/narrative/"+t)}}}
return t.registerComponent((function(){return{viewModel:{createViewModel:v},
template:n.buildDialog({title:d({dataBind:{text:"title"}}),icon:"copy",
body:c({},[s(["Duplicating a Narrative will make a completed copy of the Narrative; you will be the owner of the copy."]),s(["This new Narrative will contain all of the data objects, apps, markdown, "," and code cells from the original. The state of any apps, including run logs and errors ","will be lost, but all generated data and reports will be retained."]),c({
class:"form-inline"},[b([m({style:{borderBottom:"6px solid transparent"}
},[x("Original Narrative Name"),x(p({class:"form-control",style:{
marginLeft:"4px",width:"30em",maxWidth:"30em"},readonly:!0,dataBind:{
value:"oldNarrativeName"}}))]),m([x("New Narrative Name"),x(p({
class:"form-control",style:{marginLeft:"4px",width:"30em",maxWidth:"30em"},
dataBind:{textInput:"newNarrativeName"}
}))])]),"\x3c!-- ko if: newNarrativeName --\x3e",s({style:{marginTop:"6px"}
},["You may now copy this narrative to a new narrative named ",d({style:{
fontWeight:"bold"},dataBind:{text:"newNarrativeName"}
})]),"\x3c!-- /ko --\x3e",c({},[u({type:"button",class:"btn btn-primary",
dataBind:{enable:"canDuplicate() && !newNarrative()",click:"doDuplicate"}
},"Duplicate")]),c({class:"well",style:{marginTop:"12px"},dataBind:{
visible:'status() && status() !== "none"'}
},["\x3c!-- ko switch: status --\x3e",'\x3c!-- ko case: "inprogress" --\x3e',r.loading("Duplicating..."),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "success" --\x3e',"Successfully duplicated Narrative","\x3c!-- /ko --\x3e",'\x3c!-- ko case: "error" --\x3e',["\x3c!-- ko if: error --\x3e",o.buildPanel({
type:"danger",title:"Error",body:c({dataBind:{text:"error"}})
}),"\x3c!-- /ko --\x3e"],"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),"\x3c!-- ko if: newNarrative --\x3e","\x3c!-- ko with: newNarrative --\x3e",c({},[s(["Your new Narrative ",d({
style:{fontWeight:"bold"},dataBind:{
text:"workspaceInfo.metadata.narrative_nice_name"}
})," has been successfully created."]),u({type:"button",class:"btn btn-default",
dataBind:{click:"$component.doOpenNarrative"}
},"Open It")]),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"])]),buttons:[{
type:"default",label:"Close",onClick:"doClose"}]})}}))}));