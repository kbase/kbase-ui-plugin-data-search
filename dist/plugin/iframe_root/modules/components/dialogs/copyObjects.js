define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/subscriptionManager","kb_lib/html","kb_lib/htmlBuilders","kb_lib/htmlBootstrapBuilders","../../lib/ui","../../lib/data","../controls/narrativeSelector"],(function(e,t,o,a,c,n,s,i,r,l){
"use strict"
;const d=c.tag,b=d("a"),f=d("h3"),p=d("div"),u=d("span"),h=d("input"),y=d("button"),x=d("table"),m=d("thead"),v=d("tbody"),w=d("tr"),j=d("td"),k=d("th"),g=d("p"),I=d("b")
;function O(t,o){
var c=e.contextFor(o.element).$root.runtime,n=e.unwrap(t.objectsToCopy),s=e.observable(),i=new a
;function l(e){d.getObjectInfo(e).then((function(e){s(e)}))}var d=r.make({
runtime:c});function b(e){return c.getConfig("services.narrative.url")+e}
var f=e.observable(),p=e.observable(),u=e.observable(),h=e.observable(),y=e.observable(),x=e.observable(),m=e.observable("none"),v=e.pureComputed((function(){
switch(m()){case"none":switch(f()){case"existing":if(u())return!0;break
;case"new":if(x())return!0}return!1;case"copying":return!1;case"success":
return!0;case"error":return!1;default:
return console.warn("Unknown copy status: ",m()),!1}}))
;i.add(f.subscribe(function(e){switch(e){case"new":p(null)}
}.bind(this))),i.add(p.subscribe(function(e){if(e){f("existing")
;var t=e.split("/"),o=t[0],a=t[1];d.getNarrative({workspaceId:o,objectId:a
}).then((function(e){u(e)})).catch(Error,(function(e){
console.error(e),m("error"),h(e.message)})).catch((function(e){console.error(e),
m("error"),h("unknown error")}))}else f("new")}.bind(this)))
;var w=e.observableArray();return d.getObjectsInfo(n).then((function(t){
t.forEach((function(t){w.push({workspaceInfo:t.workspaceInfo,
objectInfo:t.objectInfo,selected:e.observable()})}))})),{title:"Copy Object",
copyMethod:f,selectedNarrative:p,selectedNarrativeObject:u,selectedObjects:w,
errorMessage:h,completionMessage:y,newNarrativeName:x,canCopy:v,objectToView:s,
copyStatus:m,messages:{
removeObjectFromList:"Remove this object from the list of selected objects to copy.",
cannotRemoveLastObjectFromList:"Sorry, cannot remove the last object from the list."
},doClose:function(){t.onClose()},doCopy:function(){
switch(h(""),m("copying"),f()){case"new":(function(e){return d.createNarrative({
title:e}).then((function(e){return d.copyObjects({
sourceObjectRefs:w().map((function(e){return e.objectInfo.ref})),
targetWorkspaceId:e.workspaceInfo.id}).then((function(){return e}))}))
})(x()).then((function(e){
var t=b("/narrative/"+["ws",e.workspaceInfo.id,"obj",e.objectInfo.id].join("."))
;u({workspaceInfo:e.workspaceInfo,objectInfo:e.objectInfo,url:t}),m("success")
})).catch((function(e){m("error"),h(e.message)}));break;case"existing":if(u()){
var e=u();(function(e){return d.copyObjects({
sourceObjectRefs:w().map((function(e){return e.objectInfo.ref})),
targetWorkspaceId:e.workspaceId})})({workspaceId:e.workspaceInfo.id
}).then((function(){
var t=b("/narrative/"+["ws",e.workspaceInfo.id,"obj",e.objectInfo.id].join("."))
;u({workspaceInfo:e.workspaceInfo,objectInfo:e.objectInfo,url:t}),m("success")
})).catch((function(e){m("error"),h(e.message)}))
}else h("You must select a narrative before copying the data object into it.")}
},doRemoveObject:function(e){e.selected()&&s(null),w.remove(e)},
doSelectObject:function(e){
e.selected()?(e.selected(!1),s(null)):(w().forEach((function(e){e.selected(!1)
})),e.selected(!0),l({workspaceId:e.workspaceInfo.id,objectId:e.objectInfo.id,
version:e.objectInfo.version}))},dispose:function(){i.dispose()}}}
var B=c.makeStyles({viewTable:{css:{width:"100%"},inner:{td:{border:"none",
padding:"3px",verticalAlign:"top"},th:{border:"none",padding:"3px",
verticalAlign:"top",fontWeight:"normal"},"td:nth-child(1)":{width:"30%"},
"th:nth-child(1)":{width:"30%"}}},selectedObjectsTable:{css:{width:"100%"},
inner:{"tbody tr:hover":{backgroundColor:"rgba(200,200,200,0.8)"},td:{
borderBottom:"1px solid rgba(200,200,200,0.8)",padding:"3px",
verticalAlign:"middle"},th:{borderBottom:"1px solid rgba(200,200,200,0.8)",
padding:"3px",verticalAlign:"top",fontWeight:"normal",fontStyle:"italic"},
"td:nth-child(1)":{width:"30%"},"th:nth-child(1)":{width:"30%"},
"td:nth-child(3)":{textAlign:"center"},"th:nth-child(3)":{textAlign:"center"}}},
selectableRow:{css:{},modifiers:{selected:{backgroundColor:"rgba(200,200,200,1)"
}}}});return t.registerComponent((function(){return{viewModel:{createViewModel:O
},template:p([i.buildDialog({title:u({dataBind:{text:"title"}}),icon:"clone",
body:p({class:"container-fluid"
},[g(["You may use this  panel to copy the ",I("data object")," you are viewing into either a ",I("new Narrative"),", which will be created on the fly, or an ",I("existing Narrartive")," which you may select from the list below."]),p({
class:"container-fluid"},[f("Selected objects"),p({class:"row"},[p({
class:"col-md-8"
},[o.ifnot("selectedObjects().length",u("no objects selected"),x({
class:B.classes.selectedObjectsTable
},[m([w([k("type"),k("object name"),k("remove")])]),v({dataBind:{
foreach:"selectedObjects"}},[w({class:[B.classes.selectableRow],style:{
cursor:"pointer"},dataBind:{click:"$component.doSelectObject",
class:'selected() ? "'+B.scopes.selected+'" : false'}},[j({style:{width:"2em"},
dataBind:{text:"objectInfo.typeName"}}),j({dataBind:{text:"objectInfo.name"}
}),j({style:{textAlign:"center"}},y({type:"button",
class:"btn btn-xs btn-danger btn-kb-flat",dataBind:{
click:"$component.doRemoveObject",
enable:"$component.selectedObjects().length > 1",attr:{
title:"$component.selectedObjects().length > 1 ? $component.messages.removeObjectFromList : $component.messages.cannotRemoveLastObjectFromList"
}}},u({class:"fa fa-times"})))])])]))]),p({class:"col-md-4"},p({
class:"panel panel-default",style:{width:"100%"}},[p({class:"panel-heading"
},[p({class:"panel-title",dataBind:{style:{
color:'objectToView() ?  "black" : "gray"'}}},"Inspect Selected Object")]),p({
class:"panel-body"
},["\x3c!-- ko ifnot: objectToView --\x3e","If you click on an object listed on the left, details will show here","\x3c!-- /ko --\x3e","\x3c!-- ko if: objectToView --\x3e","\x3c!-- ko with: objectToView --\x3e",x({
class:B.classes.viewTable},[w([k("name"),j({dataBind:{text:"objectInfo.name"}
})]),w([k("modified"),j({dataBind:{typedText:{value:"objectInfo.saveDate",
type:'"date"',format:'"MM/DD/YYYY"'}}})]),w([k("by"),j({dataBind:{
text:"objectInfo.saved_by"}})]),w([k("type"),j({dataBind:{
text:"objectInfo.typeName"}})]),w([k("module"),j({dataBind:{
text:"objectInfo.typeModule"}})]),w([k("version"),j([u({dataBind:{
text:"objectInfo.typeMajorVersion"}}),".",u({dataBind:{
text:"objectInfo.typeMinorVersion"}
})])])]),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"])]))])]),p({
class:"container-fluid"},[f("Select Narrative"),p({class:"row"},[p({
class:"col-md-8"},[p({class:"row"},[p({class:"col-sm-2"},h({type:"radio",
name:"copyMethod",value:"new",dataBind:{checked:"copyMethod"}})),p({
class:"col-sm-10"
},"Copy into New Narrative")]),'\x3c!-- ko if: copyMethod() === "new" --\x3e',p({
class:"row"},[p({class:"col-sm-2"}),p({class:"col-sm-10"},p({style:{
display:"flex",flexDirection:"row",alignItems:"center"}},[p({style:{
flex:"0 0 auto",weight:"bold",color:"rgb(100,100,100)",marginRight:"4px"}
},"Name "),p({style:{flex:"1"}},h({class:"form-control",style:{width:"100%"},
dataBind:{textInput:"newNarrativeName"}}))]))]),"\x3c!-- /ko --\x3e",p({
class:"row"},[p({class:"col-sm-2"}),p({class:"col-sm-10",style:{
fontStyle:"italic",padding:"6px"}}," - or - ")]),p({class:"row"},[p({
class:"col-sm-2"},h({type:"radio",name:"copyMethod",value:"existing",dataBind:{
checked:"copyMethod"}})),p({class:"col-sm-10"
},["Copy into an existing Narrative: ",o.ifnot('copyMethod() === "existing"',p({
style:{fontStyle:"italic"}},"select a writable narrative."),p({style:{
marginBottom:"20px"},dataBind:{component:{name:l.quotedName(),params:{
selectedNarrative:"selectedNarrative"}}}}))])])]),p({class:"col-md-4"},[p({
class:"panel panel-default"},[p({class:"panel-heading"},[p({class:"panel-title",
dataBind:{style:{color:'selectedNarrativeObject() ? "black" : "gray"'}}
},["Selected Narrative"])]),p({class:"panel-body"
},["\x3c!-- ko ifnot: copyMethod --\x3e","When you have selected a narrative to copy into, details about it will be shown here","\x3c!-- /ko --\x3e",'\x3c!-- ko if: copyMethod() === "existing" --\x3e',g(["The data object will be copied into the following Narrative:"]),"\x3c!-- ko ifnot: selectedNarrativeObject() --\x3e",g({
style:{fontStyle:"italic",textAlign:"center"}
},"Select a narrative from those available to you on the left."),"\x3c!-- /ko --\x3e","\x3c!-- ko with: selectedNarrativeObject --\x3e",x({
class:B.classes.viewTable},[w([k("Name"),j({dataBind:{
text:"workspaceInfo.metadata.narrative_nice_name"}})]),w([k("Ref"),j({dataBind:{
text:"objectInfo.ref"}})]),w([k("Owner"),j({dataBind:{text:"objectInfo.saved_by"
}})]),w([k("Modified"),j({dataBind:{typedText:{value:"objectInfo.saveDate",
type:'"date"',format:'"MM/DD/YYYY"'}}
})])]),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e",'\x3c!-- ko if: copyMethod() === "new" --\x3e',g(["A new narrative will be created containing this data object."]),"\x3c!-- /ko --\x3e"])])])])]),p({
class:"container-fluid"},[p({class:"row"},[p({class:"col-md-8"
},["\x3c!-- ko if: $component.selectedObjects().length === 0 --\x3e","No objects to copy!","\x3c!-- /ko --\x3e","\x3c!-- ko if: $component.selectedObjects().length > 0 --\x3e",y({
type:"button",class:"btn btn-primary",dataBind:{enable:"canCopy",click:"doCopy"}
},["Copy Object","\x3c!-- ko if: $component.selectedObjects().length > 1 --\x3e","s","\x3c!-- /ko --\x3e"," into Narrative"]),"\x3c!-- /ko --\x3e"]),p({
class:"col-md-4"})])]),p({style:{marginTop:"12px"}
},[['\x3c!-- ko if: copyStatus() === "success" --\x3e',s.buildPanel({
type:"success",title:"Successfully Copied",
body:p([g(["Successfully copied this data object to the Narrative ",u({style:{
fontWeight:"bold"},dataBind:{
text:"selectedNarrativeObject().workspaceInfo.metadata.narrative_nice_name"}
})]),g([u({style:{fontStyle:"italic"}},b({dataBind:{attr:{
href:"selectedNarrativeObject().url"}},class:"btn btn-default",target:"_blank"
},"Open this Narrative"))])])
}),"\x3c!-- /ko --\x3e"],['\x3c!-- ko if: copyStatus() === "copying" --\x3e',s.buildPanel({
type:"info",title:"In Progress",body:p([n.loading("Copying")])
}),"\x3c!-- /ko --\x3e"],['\x3c!-- ko if: copyStatus() === "error" --\x3e',s.buildPanel({
type:"error",title:"Error",
body:p([g("An error occurred attempting to copy the data:"),g({dataBind:{
text:"error"}})])}),"\x3c!-- /ko --\x3e"]])]),buttons:[{type:"default",
label:"Close",onClick:"doClose"}]})]),stylesheet:B.sheet}}))}));