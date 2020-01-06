define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","../dialogs/copyObjects","../funnyRandomPrompt"],(function(e,t,a,o,s,l){
"use strict"
;var c=o.tag,i=c("p"),r=c("hr"),n=c("button"),d=c("div"),x=c("span"),h=c("a"),p=c("ul"),m=c("li"),f=c("table"),g=c("tbody"),u=c("tr"),b=c("td")
;function k(e){return"rgba(220,220,220,"+e+")"}var w=o.makeStyles({component:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"column",overflowY:"scroll"}},
body:{css:{flex:"1 1 auto",display:"flex",flexDirection:"column"}},row:{css:{
flex:"1 1 auto",display:"flex",flexDirection:"row",alignItems:"center"}},
resultsRow:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
backgroundColor:k(.4),marginBottom:"15px"},modifiers:{active:{
backgroundColor:k(.6)}}},objectRow:{css:{backgroundColor:k(.6)},modifiers:{
active:{backgroundColor:k(.8)}}},rowCell:{css:{padding:"4px"}},detailHeader:{
css:{borderBottom:"1px silver solid"},scopes:{active:{
borderBottom:"1px gray solid"}}},highlight:{css:{},inner:{em:{
backgroundColor:"yellow",fontWeight:"bold"}}},resultsTable:{css:{
border:"1px silver solid",width:"100%",maxWidth:"100%"},scopes:{active:{
border:"1px gray solid"}},inner:{caption:{paddingBottom:"0"},td:{padding:"4px"},
"td:nth-child(1)":{width:"30%"},"td:nth-child(2)":{width:"70%",
wordBreak:"break-word"}}},highlightsTable:{css:{
border:"0.5px solid rgba(220,220,220,0.5)",width:"100%",maxWidth:"60em"},
scopes:{active:{border:"0.5px solid rgba(220,220,220,1)"}},inner:{caption:{
paddingBottom:"0"},td:{css:{padding:"4px",verticalAlign:"top",
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
borderBottom:"none"}}},objectItemRow:{css:{marginBottom:"10px"}},sectionTitle:{
css:{fontWeight:"bold",color:"gray",marginTop:"10px"}}});function y(t,a){
var o=e.contextFor(a.element).$root.appBus,l=t.searchState;return{searchState:l,
view:t.view,narrativesTotal:t.narrativesTotal,
referenceDataTotal:t.referenceDataTotal,featuresTotal:t.featuresTotal,
doCopyObject:function(e){t.overlayComponent({name:s.name(),viewModel:{
objectsToCopy:[e.matchClass.ref.objectRef]}})},doViewObject:function(e){
window.open(e.url,"_blank")},doNextPage:function(){t.doNextPage()},
doPreviousPage:function(){t.doPreviousPage()},doToggleSelected:function(e){
e.selected(!e.selected()),
t.selectedObjects().indexOf(e.matchClass.ref.objectRef)>=0?t.selectedObjects.remove(e.matchClass.ref.objectRef):t.selectedObjects.push(e.matchClass.ref.objectRef)
},doToggleShowMatches:function(e,a){
a.originalEvent.altKey?t.doToggleShowMatches(e.showMatches()):e.showMatches()?(e.showMatches(!1),
e.showDetails(!1)):(e.showMatches(!0),e.showDetails(!1))},
doToggleShowDetails:function(e,a){
a.originalEvent.altKey?t.doToggleShowDetails(e.showDetails()):e.showDetails()?(e.showMatches(!1),
e.showDetails(!1)):(e.showMatches(!1),e.showDetails(!0))},
doMouseOverRow:function(e){e.active(!0)},doMouseOutRow:function(e){e.active(!1)
},doShowError:function(){o.send("error",{error:l.error()})},dispose:function(){}
}}return t.registerComponent((function(){return{viewModel:{createViewModel:y},
template:d({class:w.classes.component,dataKBTesthookComponent:"results"},[d({
style:{flex:"1 1 0px"},name:"result-rows-container"
},["\x3c!-- ko switch: searchState.status --\x3e",'\x3c!-- ko case: "none" --\x3e',d({
class:"alert alert-info",dataKBTesthookAlert:"no-search",style:{
margin:"40px auto 0 auto",maxWidth:"40em",padding:"20px"}
},[i("Enter one or more terms above to search Reference Data in KBase."),r({
style:{width:"50%"}
}),i("Reference Data is provided by the following sources:"),p([m("RefSeq - NCBI Reference Sequence Database")]),r({
style:{width:"50%"}
}),i(["Multiple search terms are treated as “AND” statements. ","The search will find objects or text that include all of the terms you submit. ","Terms are matched against whole words; no partial matches will be listed. ","Other search operators and wildcards are not currently supported."])]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "notfound" --\x3e',d({
class:"alert alert-warning",dataKBTesthookAlert:"not-found",style:{
margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center",padding:"20px"}
},[i("Sorry, no Reference Data found."),"\x3c!-- ko if: narrativesTotal --\x3e",i(["However, there ",a.plural("narrativesTotal()","is ","are "),x({
style:{fontWeight:"bold"}},[x({dataBind:{typedText:{value:"narrativesTotal",
type:'"number"',format:'"0,0"'}}
})," matching User Data object",a.plural("narrativesTotal()",".","s.")])]),"\x3c!-- /ko --\x3e","\x3c!-- ko if: featuresTotal --\x3e",i(["However, there ",a.plural("featuresTotal()","is ","are "),x({
style:{fontWeight:"bold"}},[x({dataBind:{typedText:{value:"featuresTotal",
type:'"number"',format:'"0,0"'}}
})," matching Genome Feature",a.plural("featuresTotal()",".","s.")])]),"\x3c!-- /ko --\x3e"]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "error" --\x3e',d({
class:"alert alert-danger",dataKBTesthookAlert:"error",style:{
margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center",padding:"20px"}
},[i("Sorry, an error occurred with this search."),i({dataBind:{
text:"searchState.errorMessage"}}),i([n({class:"btn btn-default",dataBind:{
click:"$component.doShowError"}
},"Show Error")])]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "searching" --\x3e',d({
class:"well",style:{margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center"
}},[d({dataBind:{component:l.quotedName(),params:{}}
})]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "success" --\x3e',d({dataBind:{
foreach:"searchState.buffer"},name:"result-rows"},[d({
class:w.classes.resultsRow,dataBind:{event:{
mouseenter:"$component.doMouseOverRow",mouseleave:"$component.doMouseOutRow"},
class:'active() ? "'+w.scopes.active+'" : null'}},[d({
class:[w.classes.row,w.classes.objectRow],dataKBTesthookElement:"object-row"
},[d({class:w.classes.rowCell,style:{flex:"0 0 2em"}
},["\x3c!-- ko switch: matchClass.id --\x3e",'\x3c!-- ko case: "dataObject" --\x3e',"\x3c!-- ko if: matchClass.copyable --\x3e",x({
style:{fontSize:"120%"},class:"fa",dataBind:{attr:{
title:'selected() ? "Click to deselect this object" : "Click to select this object for copying"'
},class:'selected() ? "fa-check-square-o" : "fa-square-o"',
click:"$component.doToggleSelected"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),d({
class:w.classes.rowCell,style:{flex:"0 0 2em"}
},["\x3c!-- ko if: type.icon --\x3e",'\x3c!-- ko if: type.icon.type === "fontAwesome" --\x3e',x({
dataBind:{class:'type.icon.classes.join(" ")',style:{color:"type.icon.color"}}
}),"\x3c!-- /ko --\x3e",'\x3c!-- ko if: type.icon.type === "kbase" --\x3e',x({
dataBind:{class:'type.icon.classes.join(" ")',style:{color:"type.icon.color"}}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: type.icon --\x3e",x({
class:"fa fa-file-o"}),"\x3c!-- /ko --\x3e"]),d({class:w.classes.rowCell,style:{
flex:"1"},dataBind:{text:"type.label"}}),d({class:w.classes.rowCell,style:{
flex:"2"}
},["\x3c!-- ko switch: matchClass.id --\x3e",'\x3c!-- ko case: "dataObject" --\x3e',"\x3c!-- ko if: matchClass.viewable --\x3e",h({
dataBind:{attr:{
href:'"/#dataview/" + matchClass.ref.workspaceId + "/" + matchClass.ref.objectId + "/" + matchClass.ref.version'
},text:"name"},target:"_blank"
}),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: matchClass.viewable --\x3e",d({
dataBind:{text:"name"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),d({
class:w.classes.rowCell,style:{flex:"3"}},d({dataBind:{text:"scientificName"}
})),d({class:w.classes.rowCell,style:{flex:"1"},dataBind:{typedText:{
type:'"date"',format:'"MM/DD/YYYY"',value:"date"}}}),d({class:w.classes.rowCell,
style:{flex:"0 0 4em",textAlign:"right"}
},d({},["\x3c!-- ko if: matchClass.copyable || matchClass.viewable --\x3e",d({
class:"btn-group",dataBind:{enable:"$parent.active"}},[n({type:"button",
class:"btn btn-default btn-sm dropdown-toggle btn-kb-toggle-dropdown",
dataToggle:"dropdown",ariaHasPopup:"true",areaExpanded:"false"},[x({
class:"fa fa-ellipsis-h"})]),p({class:"dropdown-menu dropdown-menu-right"
},[m(d({style:{fontWeight:"bold",textAlign:"center",color:"gray"}
},"Object")),"\x3c!-- ko if: matchClass.copyable --\x3e",m(h({dataBind:{
click:"$component.doCopyObject"}
},"Copy...")),"\x3c!-- /ko --\x3e","\x3c!-- ko if: matchClass.viewable --\x3e",m(h({
dataBind:{click:"$component.doViewObject"}
},"View")),"\x3c!-- /ko --\x3e"])]),"\x3c!-- /ko --\x3e"]))]),'\x3c!-- ko if: $component.view() === "matches" || $component.view() === "detail" --\x3e',d({
class:[w.classes.body]},[d({class:w.classes.objectItemRow},[d({style:{
flex:"1 1 0px",display:"flex",flexDirection:"row"}},[d({class:w.classes.rowCell,
style:{flex:"0 0 2em"}}),d({style:{flex:"2",marginRight:"4px"}
},['\x3c!-- ko if: $component.view() === "matches" || $component.view() === "detail" --\x3e',d({
class:w.classes.sectionTitle
},"Matches"),"\x3c!-- ko if: matches.length > 0 --\x3e",f({
class:w.classes.highlightsTable},[g({dataBind:{foreach:"matches"}},u([b({
dataBind:{text:"label"}
}),b({},["\x3c!-- ko foreach: $data.highlights --\x3e",x({
class:w.classes.highlight,dataBind:{html:"highlight"}
}),"\x3c!-- /ko --\x3e"])]))]),"\x3c!-- /ko --\x3e","\x3c!-- ko if: matches.length === 0 --\x3e",i({
style:{marginTop:"10px",fontStyle:"italic"}},["No matches reported ... ",x({
class:"fa fa-bug fa-rotate-90"
})," ... it is a mystery!"]),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),d({
style:{flex:"3",marginLeft:"4px"}
},['\x3c!-- ko if: $component.view() === "detail" --\x3e',d({
class:w.classes.sectionTitle},"Detail"),f({class:w.classes.detailTable},[g({
dataBind:{foreach:"detail"}},u([b({dataBind:{text:"label"}
}),"\x3c!-- ko if: $data.highlights --\x3e",b(["\x3c!-- ko foreach: $data.highlights --\x3e",x({
class:w.classes.highlight,dataBind:{html:"highlight"}
}),"\x3c!-- /ko --\x3e"]),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: $data.highlights --\x3e","\x3c!-- ko if: $data.type --\x3e",b({
dataBind:{typedText:{value:"value",type:"type",format:"format",
default:"$data.default",missing:"$data.missing"}}
}),"\x3c!-- /ko --\x3e","\x3c!-- ko if: $data.component --\x3e",b({dataBind:{
component:{name:"$data.component",params:{value:"$data.value",
params:"$data.params"}}}
}),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: $data.type || $data.component --\x3e",b({
dataBind:{text:"value"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]))]),"\x3c!-- /ko --\x3e"]),d({
class:w.classes.rowCell,style:{flex:"0 0 4em"}
})])])]),"\x3c!-- /ko --\x3e"])]),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"])]),
stylesheet:w.sheet}}))}));