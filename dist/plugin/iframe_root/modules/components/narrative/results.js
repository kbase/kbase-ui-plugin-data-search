define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","../dialogs/duplicateNarrative","../dialogs/copyObjects","../funnyRandomPrompt"],(function(e,t,a,o,s,l,r){
"use strict"
;var c=o.tag,i=c("p"),n=c("hr"),d=c("button"),x=c("div"),f=c("span"),p=c("a"),h=c("ul"),m=c("li"),u=c("table"),g=c("tbody"),b=c("tr"),k=c("td")
;function w(e){return"rgba(220,220,220,"+e+")"}var y=o.makeStyles({component:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"column",overflowY:"scroll"}},
body:{css:{flex:"1 1 auto",display:"flex",flexDirection:"column"}},row:{css:{
flex:"1 1 auto",display:"flex",flexDirection:"row",alignItems:"center"}},
resultsRow:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
backgroundColor:w(.4),marginBottom:"15px"},modifiers:{active:{
backgroundColor:w(.6)}}},narrativeRow:{css:{backgroundColor:w(.8)},modifiers:{
active:{backgroundColor:w(1)}}},objectRow:{css:{backgroundColor:w(.6)},
modifiers:{active:{backgroundColor:w(.8)}}},objectItemRow:{css:{}},rowCell:{
css:{padding:"4px"}},detailHeader:{css:{borderBottom:"1px silver solid"},
scopes:{active:{borderBottom:"1px gray solid"}}},highlight:{css:{},inner:{em:{
backgroundColor:"yellow",fontWeight:"bold"}}},resultsTable:{css:{
border:"1px silver solid",width:"100%",maxWidth:"60em"},scopes:{active:{
border:"1px gray solid"}},inner:{caption:{paddingBottom:"0"},td:{padding:"4px"},
"td:nth-child(1)":{width:"10em"},"td:nth-child(2)":{wordBreak:"break-word"}}},
highlightsTable:{css:{border:"0.5px solid rgba(220,220,220,0.5)",width:"100%",
maxWidth:"60em"},scopes:{active:{border:"0.5px solid rgba(220,220,220,1)"}},
inner:{caption:{paddingBottom:"0"},td:{css:{padding:"4px",verticalAlign:"top",
borderBottom:"0.5px solid rgba(220,220,220,0.5)"},scopes:{active:{
borderBottom:"0.5px solid rgba(220,220,220,1)"}}},"td:nth-child(1)":{
width:"10em"},"td:nth-child(2)":{wordBreak:"break-word"},"td:nth-last-child":{
borderBottom:"none"}}},detailTable:{css:{
border:"0.5px solid rgba(220,220,220,0.5)",width:"100%",maxWidth:"60em"},
scopes:{active:{border:"0.5px solid rgba(220,220,220,1)"}},inner:{caption:{
paddingBottom:"0"},td:{css:{padding:"4px",verticalAlign:"top",
borderBottom:"0.5px solid rgba(220,220,220,0.5)"},scopes:{active:{
borderBottom:"0.5px solid rgba(220,220,220,1)"}}},"td:nth-child(1)":{
width:"14em"},"td:nth-child(2)":{wordBreak:"break-word"},"td:nth-last-child":{
borderBottom:"none"}}},sectionTitle:{css:{fontWeight:"bold",color:"gray",
marginTop:"10px"}}});function v(t,a){var o=e.contextFor(a.element).$root.appBus
;var r=t.view;return{buffer:t.buffer,status:t.status,
errorMessage:t.errorMessage,view:r,narrativesTotal:t.narrativesTotal,
referenceDataTotal:t.referenceDataTotal,featuresTotal:t.featuresTotal,
doDuplicateNarrative:function(e){t.overlayComponent({name:s.name(),viewModel:{
narrative:e.ref}})},doCopyObject:function(e){t.overlayComponent({name:l.name(),
viewModel:{objectsToCopy:[e.matchClass.ref.objectRef]}})},
doOpenNarrative:function(e){window.open(e.url,"_blank")},
doViewObject:function(e){window.open(e.url,"_blank")},doNextPage:function(){
t.doNextPage()},doPreviousPage:function(){t.doPreviousPage()},
doToggleSelected:function(e){
e.selected(!e.selected()),t.selectedObjects().indexOf(e.matchClass.ref.objectRef)>=0?t.selectedObjects.remove(e.matchClass.ref.objectRef):t.selectedObjects.push(e.matchClass.ref.objectRef)
},doShowObjects:function(){r("list")},doShowMatches:function(){r("matches")},
doShowDetails:function(){r("detail")},doMouseOverRow:function(e){e.active(!0)},
doMouseOutRow:function(e){e.active(!1)},doShowError:function(){o.send("error",{
error:t.error()})},dispose:function(){}}}return t.registerComponent((function(){
return{viewModel:{createViewModel:v},template:x({class:y.classes.component,
dataKBTesthookComponent:"results"},[x({style:{flex:"1 1 0px"},
name:"result-rows-container"
},["\x3c!-- ko switch: status --\x3e",'\x3c!-- ko case: "none" --\x3e',x({
class:"alert alert-info",dataKBTesthookAlert:"no-search",style:{
margin:"40px auto 0 auto",maxWidth:"40em",padding:"20px"}
},[i("Enter one or more terms above to find user data and Narratives."),n({
style:{width:"50%"}
}),i("This will search both text and data in all your Narratives, Narratives shared with you (Private), and Narratives shared with all KBase users (Public)."),n({
style:{width:"50%"}
}),i(["Multiple search terms are treated as “AND”  statements. The search will find objects or text that include all of the terms you submit. ","Terms are matched against whole words; no partial matches will be listed. Other search operators and wildcards are not currently supported."])]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "notfound" --\x3e',x({
class:"alert alert-warning",dataKBTesthookAlert:"not-found",style:{
margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center",padding:"20px"}
},[i("Sorry, no User Data found."),a.if("referenceDataTotal",i(["However, there ",a.plural("referenceDataTotal()","is ","are "),f({
style:{fontWeight:"bold"}},[f({dataBind:{typedText:{value:"referenceDataTotal",
type:'"number"',format:'"0,0"'}}
})," matching Reference Data object",a.plural("referenceDataTotal()",".","s.")])])),a.if("featuresTotal",i(["However, there ",a.plural("featuresTotal()","is ","are "),f({
style:{fontWeight:"bold"}},[f({dataBind:{typedText:{value:"featuresTotal",
type:'"number"',format:'"0,0"'}}
})," matching Genome Feature",a.plural("featuresTotal()",".","s.")])]))]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "searching" --\x3e',x({
class:"well",style:{margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center"
}},[x({dataBind:{component:r.quotedName(),params:{}}
})]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "error" --\x3e',x({
class:"alert alert-danger",dataKBTesthookAlert:"error",style:{
margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center",padding:"20px"}
},[i("Sorry, an error occurred with this search."),i({dataBind:{
text:"errorMessage"}}),i([d({class:"btn btn-default",dataBind:{
click:"$component.doShowError"}
},"Show Error")])]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "success" --\x3e',x({
dataBind:{foreach:"buffer"},name:"result-rows"},[x({class:y.classes.resultsRow,
dataBind:{event:{mouseenter:"$component.doMouseOverRow",
mouseleave:"$component.doMouseOutRow"},
class:'active() ? "'+y.scopes.active+'" : null'}},[x({
class:[y.classes.row,y.classes.narrativeRow],
dataKBTesthookElement:"narrative-row"},[x({class:y.classes.rowCell,style:{
flex:"4",fontWeight:"bold",fontSize:"120%"}
},["\x3c!-- ko if: isNarrative --\x3e",p({dataBind:{attr:{
href:'"/narrative/ws." + ref.workspaceId + ".obj." + ref.objectId'}},style:{
display:"flex",alignItems:"top"},target:"_blank"},[f({class:"fa-stack",style:{
textAlign:"center",width:"1.5em"}},[f({class:"fa fa-file fa-stack-1x",style:{
fontSize:"120%"}},f({style:{color:"white",fontFamily:"sans-serif",
fontWeight:"bold",fontSize:"70%",position:"absolute",left:"0",top:"0",
width:"100%",textAlign:"center"}},"N"))]),f({style:{marginLeft:"3px",
marginTop:"3px"},dataBind:{text:"title"}
})]),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: isNarrative --\x3e",f({},[f({
class:"fa-stack",style:{textAlign:"center",width:"1.5em"}},[f({
class:"fa fa-folder-o fa-stack-1x",style:{fontSize:"120%"}})]),"Workspace #",f({
dataBind:{text:"ref.workspaceId"}
})," (not a Narrative)"]),"\x3c!-- /ko --\x3e"]),x({class:y.classes.rowCell,
style:{flex:"1"}},a.if("owner === null","(null)",p({target:"_blank",dataBind:{
attr:{href:'"/#people/" + owner.username'},text:"owner.realName"}}))),x({
class:y.classes.rowCell,style:{flex:"0 0 4em"}}),x({class:y.classes.rowCell,
style:{flex:"1.5"},dataBind:{typedText:{type:'"date"',format:'"MM/DD/YYYY"',
value:"modified"}}}),x({class:y.classes.rowCell,style:{flex:"0 0 4em",
textAlign:"right"}},["\x3c!-- ko if: isNarrative --\x3e",x({},[x({
class:"btn-group"},[d({type:"button",
class:"btn btn-default btn-sm dropdown-toggle btn-kb-toggle-dropdown",
dataToggle:"dropdown",ariaHasPopup:"true",areaExpanded:"false"},[f({
class:"fa fa-bars"})]),h({class:"dropdown-menu dropdown-menu-right"},[m(x({
style:{fontWeight:"bold",textAlign:"center",color:"gray"}},"Narrative")),m({
role:"separator",class:"divider"}),m(p({dataBind:{
click:"$component.doDuplicateNarrative"}},"Duplicate...")),m(p({dataBind:{
click:"$component.doOpenNarrative"}},"Open"))])])]),"\x3c!-- /ko --\x3e"])]),x({
class:[y.classes.body],dataBind:{foreach:"objects"}},[x({
class:y.classes.objectItemRow,dataKBTesthookElement:"object-row"},[x({
class:[y.classes.row,y.classes.objectRow]},[x({class:y.classes.rowCell,style:{
flex:"0 0 2em"}
},["\x3c!-- ko switch: matchClass.id --\x3e",'\x3c!-- ko case: "dataObject" --\x3e',"\x3c!-- ko if: matchClass.copyable --\x3e",f({
style:{fontSize:"120%"},class:"fa",dataBind:{attr:{
title:'selected() ? "Click to udeselect this object" : "Click to select this object for copying"'
},class:'selected() ? "fa-check-square-o" : "fa-square-o"',
click:"$component.doToggleSelected"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),x({
class:y.classes.rowCell,style:{flex:"0 0 2em"}
},["\x3c!-- ko if: type.icon --\x3e",'\x3c!-- ko if: type.icon.type === "fontAwesome" --\x3e',f({
dataBind:{class:'type.icon.classes.join(" ")',style:{color:"type.icon.color"}}
}),"\x3c!-- /ko --\x3e",'\x3c!-- ko if: type.icon.type === "kbase" --\x3e',f({
dataBind:{class:'type.icon.classes.join(" ")',style:{color:"type.icon.color"}}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: type.icon --\x3e",f({
class:"fa fa-file-o"}),"\x3c!-- /ko --\x3e"]),x({class:y.classes.rowCell,style:{
flex:"1"},dataBind:{text:"type.label"}}),x({class:y.classes.rowCell,style:{
flex:"4"}
},["\x3c!-- ko switch: matchClass.id --\x3e",'\x3c!-- ko case: "narrative" --\x3e',p({
dataBind:{attr:{
href:'"/narrative/ws." + matchClass.ref.workspaceId + ".obj." + matchClass.ref.objectId'
},text:"title"},target:"_blank"
}),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "dataObject" --\x3e',"\x3c!-- ko if: matchClass.viewable --\x3e",p({
dataBind:{attr:{
href:'"/#dataview/" + matchClass.ref.workspaceId + "/" + matchClass.ref.objectId + "/" + matchClass.ref.version'
},text:"title"},target:"_blank"
}),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: matchClass.viewable --\x3e",x({
dataBind:{text:"title"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),x({
class:y.classes.rowCell,style:{flex:"1.5"},dataBind:{typedText:{type:'"date"',
format:'"MM/DD/YYYY"',value:"date"}}}),x({class:y.classes.rowCell,style:{
flex:"0 0 4em",textAlign:"right"}
},x({},["\x3c!-- ko if: matchClass.copyable || matchClass.viewable --\x3e",x({
class:"btn-group",dataBind:{enable:"$parent.active"}},[d({type:"button",
class:"btn btn-default btn-sm dropdown-toggle btn-kb-toggle-dropdown",
dataToggle:"dropdown",ariaHasPopup:"true",areaExpanded:"false"},[f({
class:"fa fa-ellipsis-h"})]),h({class:"dropdown-menu dropdown-menu-right"
},[m(x({style:{fontWeight:"bold",textAlign:"center",color:"gray"}
},"Object")),"\x3c!-- ko if: matchClass.copyable --\x3e",m(p({dataBind:{
click:"$component.doCopyObject"}
},"Copy...")),"\x3c!-- /ko --\x3e","\x3c!-- ko if: matchClass.viewable --\x3e",m(p({
dataBind:{click:"$component.doViewObject"}
},"View")),"\x3c!-- /ko --\x3e"])]),"\x3c!-- /ko --\x3e"]))]),'\x3c!-- ko if: $component.view() === "matches" || $component.view() === "detail" --\x3e',x({
style:{flex:"1 1 0px",display:"flex",flexDirection:"row",marginBottom:"10px"}
},[x({class:y.classes.rowCell,style:{flex:"0 0 2em"}}),x({style:{flex:"2",
marginRight:"4px"}
},['\x3c!-- ko if: $component.view() === "matches" || $component.view() === "detail" --\x3e',x({
class:y.classes.sectionTitle
},"Matches"),"\x3c!-- ko if: matches.length > 0 --\x3e",u({
class:y.classes.highlightsTable},[g({dataBind:{foreach:"matches"}},b([k({
dataBind:{text:"label"}
}),k({},["\x3c!-- ko foreach: $data.highlights --\x3e",f({
class:y.classes.highlight,dataBind:{html:"highlight"}
}),"\x3c!-- /ko --\x3e"])]))]),"\x3c!-- /ko --\x3e","\x3c!-- ko if: matches.length === 0 --\x3e",i({
style:{marginTop:"10px",fontStyle:"italic"}},["No matches reported ... ",f({
class:"fa fa-bug fa-rotate-90"
})," ... it is a mystery!"]),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),x({
style:{flex:"3",marginLeft:"4px"}
},['\x3c!-- ko if: $component.view() === "detail" --\x3e',x({
class:y.classes.sectionTitle},"Detail"),u({class:y.classes.detailTable},[g({
dataBind:{foreach:"detail"}},b([k({dataBind:{text:"label"}
}),"\x3c!-- ko if: $data.highlights --\x3e",k(["\x3c!-- ko foreach: $data.highlights --\x3e",f({
class:y.classes.highlight,dataBind:{html:"highlight"}
}),"\x3c!-- /ko --\x3e"]),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: $data.highlights --\x3e","\x3c!-- ko if: $data.type --\x3e",k({
dataBind:{typedText:{value:"value",type:"type",format:"format",
default:"$data.default",missing:"$data.missing"}}
}),"\x3c!-- /ko --\x3e","\x3c!-- ko if: $data.component --\x3e",k({dataBind:{
component:{name:"$data.component",params:{value:"$data.value",
params:"$data.params"}}}
}),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: $data.type || $data.component --\x3e",k({
dataBind:{text:"value"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]))]),"\x3c!-- /ko --\x3e"]),x({
class:y.classes.rowCell,style:{flex:"0 0 4em"}
})]),"\x3c!-- /ko --\x3e"])])])]),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"])]),
stylesheet:y.sheet}}))}));