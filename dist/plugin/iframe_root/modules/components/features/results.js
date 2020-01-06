define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_lib/html","../dialogs/copyObjects","../funnyRandomPrompt","../../lib/types/components/stringArray","../../lib/types/components/taxonomy","../../lib/ui","./header"],(function(e,t,a,o,s,l,i,n,r,c){
"use strict"
;var d=o.tag,x=d("p"),p=d("hr"),h=d("button"),g=d("div"),m=d("span"),f=d("a"),b=d("ul"),u=d("li"),w=d("table"),y=d("tbody"),k=d("tr"),v=d("th"),B=d("td")
;function T(e){return"rgba(220,220,220,"+e+")"}var S=o.makeStyles({component:{
css:{flex:"1 1 0px",display:"flex",flexDirection:"column",overflowY:"scroll"}},
body:{css:{flex:"1 1 auto",display:"flex",flexDirection:"column"}},row:{css:{
flex:"1 1 auto",display:"flex",flexDirection:"row",alignItems:"center"}},
resultsRow:{css:{flex:"1 1 0px",display:"flex",flexDirection:"column",
backgroundColor:T(.4)},modifiers:{active:{backgroundColor:T(.6)}}},objectRow:{
css:{backgroundColor:T(.4)},modifiers:{active:{backgroundColor:T(.6)}}},
rowCell:{css:{padding:"4px",wordBreak:"break-word"}},detailHeader:{css:{
borderBottom:"1px silver solid"},scopes:{active:{borderBottom:"1px gray solid"}}
},highlight:{css:{},inner:{em:{backgroundColor:"yellow",fontWeight:"bold"}}},
resultsTable:{css:{width:"100%",maxWidth:"100%"},scopes:{active:{
border:"1px gray solid"}},inner:{caption:{paddingBottom:"0"},td:{padding:"4px"},
"td:nth-child(1)":{width:"30%"},"td:nth-child(2)":{width:"70%",
wordBreak:"break-word"}}},highlightsTable:{css:{width:"100%",maxWidth:"60em"},
scopes:{active:{}},inner:{caption:{paddingBottom:"0"},td:{css:{padding:"4px",
verticalAlign:"top",borderBottom:"0.5px solid rgba(220,220,220,0.5)"},scopes:{
active:{borderBottom:"0.5px solid rgba(220,220,220,1)"}}},th:{css:{
padding:"4px",verticalAlign:"top",
borderBottom:"0.5px solid rgba(220,220,220,0.5)",fontWeight:"normal",
color:"#777"},scopes:{active:{borderBottom:"0.5px solid rgba(220,220,220,1)"}}},
"th:nth-child(1)":{width:"10em"},"td:nth-child(2)":{wordBreak:"break-word"},
"tr:last-child td":{borderBottom:"none"},"tr:last-child th":{borderBottom:"none"
}}},detailTable:{css:{width:"100%",maxWidth:"60em"},scopes:{active:{}},inner:{
caption:{paddingBottom:"0"}," > tbody > tr > td":{css:{padding:"4px",
verticalAlign:"top",borderBottom:"0.5px solid rgba(220,220,220,0.5)"},scopes:{
active:{borderBottom:"0.5px solid rgba(220,220,220,1)"}}}," > tbody > tr > th":{
css:{padding:"4px",verticalAlign:"top",
borderBottom:"0.5px solid rgba(220,220,220,0.5)",fontWeight:"normal",
color:"#777"},scopes:{active:{borderBottom:"0.5px solid rgba(220,220,220,1)"}}},
" > tbody > tr > th:nth-child(1)":{width:"14em"},
" > tbody > tr > td:nth-child(2)":{wordBreak:"break-word"},
" > tbody > tr:last-child > td":{borderBottom:"none"},
" > tbody > tr:last-child > th":{borderBottom:"none"}}},groupHeaderTable:{css:{
width:"100%",maxWidth:"60em"},inner:{caption:{paddingBottom:"0"},td:{css:{
padding:"4px",verticalAlign:"top",
borderBottom:"0.5px solid rgba(220,220,220,0.8)"},scopes:{active:{
borderBottom:"0.5px solid rgba(220,220,220,1)"}}},th:{css:{padding:"4px",
verticalAlign:"top",borderBottom:"0.5px solid rgba(220,220,220,0.8)",
fontWeight:"normal",color:"#777"},scopes:{active:{
borderBottom:"0.5px solid rgba(220,220,220,1)"}}},"td:nth-child(1)":{
width:"10em"},"td:nth-child(2)":{wordBreak:"break-word"},"tr:last-child td":{
borderBottom:"none"},"tr:last-child th":{borderBottom:"none"}}},objectItemRow:{
css:{marginBottom:"10px"}},sectionTitle:{css:{fontWeight:"bold",color:"gray",
marginTop:"4px",marginBottom:"6px",textAlign:"center"}},resultGroup:{css:{
marginBottom:"15px"}},groupRow:{css:{backgroundColor:T(.8)},modifiers:{active:{
backgroundColor:T(1)}}},header:{backgroundColor:"rgba(220,220,220,0.6)",
height:"40px",display:"flex",flexDirection:"column"}});function C(t,a){
var o=e.contextFor(a.element).$root.appBus,l=t.searchState;return{searchState:l,
error:t.error,errorMessage:t.errorMessage,view:t.view,
narrativesTotal:t.narrativesTotal,referenceDataTotal:t.referenceDataTotal,
featuresTotal:t.featuresTotal,doCopyObject:function(e){t.overlayComponent({
name:s.name(),viewModel:{objectsToCopy:[e.matchClass.ref.subObjectRef]}})},
doViewObject:function(e){window.open(e.url,"_blank")},doNextPage:function(){
t.doNextPage()},doPreviousPage:function(){t.doPreviousPage()},
doToggleSelected:function(e){
e.selected(!e.selected()),t.selectedObjects().indexOf(e.matchClass.ref.ref)>=0?t.selectedObjects.remove(e.matchClass.ref.ref):t.selectedObjects.push(e.matchClass.ref.ref)
},doToggleShowMatches:function(e,a){
a.originalEvent.altKey?t.doToggleShowMatches(e.showDetails()):e.showItemMatches()?(e.showItemMatches(!1),
e.items.forEach(e=>{e.showMatches(!1),e.showDetails(!1)
})):(e.showItemDetail(!1),e.showItemMatches(!0),e.items.forEach(e=>{
e.showMatches(!0),e.showDetails(!1)}))},doToggleShowDetails:function(e,a){
a.originalEvent.altKey?t.doToggleShowDetails(e.showDetails()):e.showItemDetail()?(e.showItemDetail(!1),
e.items.forEach(e=>{e.showMatches(!1),e.showDetails(!1)
})):(e.showItemMatches(!1),e.showItemDetail(!0),e.items.forEach(e=>{
e.showMatches(!0),e.showDetails(!0)}))},doMouseOverRow:function(e){e.active(!0)
},doMouseOutRow:function(e){e.active(!1)},doToggleGenomeDetail:function(e){
e.isOpen(!e.isOpen())},doShowError:function(){o.send("error",{error:l.error()})
},dispose:function(){}}}return t.registerComponent((function(){return{
viewModel:{createViewModel:C},template:g({class:S.classes.component,
dataKBTesthookComponent:"results"},[g({style:{flex:"1 1 0px"},
name:"result-rows-container"
},["\x3c!-- ko switch: searchState.status --\x3e",'\x3c!-- ko case: "none" --\x3e',g({
class:"alert alert-info",dataKBTesthookAlert:"no-search",style:{
margin:"40px auto 0 auto",maxWidth:"40em",padding:"20px"}
},[x("Enter one or more terms above to find Reference Data in KBase."),p({
style:{width:"50%"}
}),x('All search terms are "and"ed together -- you will get objects which include all of the terms you submit.  In addition, terms are matched against whole words (no partial matches) and wildcards are not supported.')]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "notfound" --\x3e',g({
class:"alert alert-warning",dataKBTesthookAlert:"not-found",style:{
margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center",padding:"20px"}
},[x("Sorry, no Genome Features found."),"\x3c!-- ko if: narrativesTotal --\x3e",x(["However, there ",a.plural("narrativesTotal()","is ","are "),m({
style:{fontWeight:"bold"}},[m({dataBind:{typedText:{value:"narrativesTotal",
type:'"number"',format:'"0,0"'}}
})," matching User Data object",a.plural("narrativesTotal()",".","s.")])]),"\x3c!-- /ko --\x3e","\x3c!-- ko if: referenceDataTotal --\x3e",x(["However, there ",a.plural("referenceDataTotal()","is ","are "),m({
style:{fontWeight:"bold"}},[m({dataBind:{typedText:{value:"referenceDataTotal",
type:'"number"',format:'"0,0"'}}
})," matching Reference Data object",a.plural("referenceDataTotal()",".","s.")])]),"\x3c!-- /ko --\x3e"]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "error" --\x3e',g({
class:"alert alert-danger",dataKBTesthookAlert:"error",style:{
margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center",padding:"20px"}
},[x("Sorry, an error occurred with this search."),x({dataBind:{
text:"searchState.errorMessage"}}),x([h({class:"btn btn-default",dataBind:{
click:"$component.doShowError"}
},"Show Error")])]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "searching" --\x3e',g({
class:"well",style:{margin:"40px auto 0 auto",maxWidth:"40em",textAlign:"center"
}},[g({dataBind:{component:l.quotedName(),params:{}}
})]),"\x3c!-- /ko --\x3e",'\x3c!-- ko case: "success" --\x3e',g({dataBind:{
foreach:"searchState.grouped"},name:"result-rows"},g({
class:S.classes.resultGroup},[g({class:S.classes.groupRow,style:{
border:"1px silver solid",padding:"6px"}},[g([g({style:{display:"inline-block",
verticalAlign:"top",width:"50%",paddingRight:"10px"}},[f({style:{
fontSize:"120%",fontWeight:"bold",fontStyle:"italic"},dataBind:{attr:{
href:'"/#dataview/" + genomeInfo.ref'},text:'genomeInfo.scientificName || "n/a"'
},target:"_blank"}),g({style:{},dataBind:{text:"genomeInfo.domain"}}),f({style:{
fontStyle:"normal"},dataBind:{attr:{href:'"/#dataview/" + genomeInfo.ref'},
text:"genomeInfo.objectName"},target:"_blank"})]),g({style:{
display:"inline-block",verticalAlign:"top",width:"25%",paddingLeft:"10px",
textAlign:"right"}},[a.switch("workspaceInfo.type",[['"narrative"',g({style:{
textAlign:"left"}},[g([m({class:"fa-stack",style:{textAlign:"center",
width:"1.5em"}},[m({class:"fa fa-file fa-stack-1x",style:{fontSize:"120%"}},m({
style:{color:"white",fontFamily:"sans-serif",fontWeight:"bold",fontSize:"70%",
position:"absolute",left:"0",top:"0",width:"100%",textAlign:"center"}
},"N"))]),m({style:{fontStyle:"italic"}},"in a Narrative")]),g([m({style:{
color:"silver",fontStyle:"italic",marginRight:"4px"}},"title"),f({dataBind:{
text:"workspaceInfo.title",attr:{
href:'"narrative/ws." + workspaceInfo.workspaceId + ".obj." + workspaceInfo.objectId'
}},target:"_blank"})])])],['"refdata"',g({style:{textAlign:"left"}},[g([m({
class:"fa fa-database",style:{textAlign:"center",width:"1.5em",fontSize:"120%"}
}),m({style:{fontStyle:"italic"}},"in a Reference Data Workspace")]),g([m({
style:{color:"silver",fontStyle:"italic",marginRight:"4px"}},"title"),m({
dataBind:{text:"workspaceInfo.title"}})])])],['"unknown"',g({style:{
textAlign:"left"}},[g([m({class:"fa fa-question-circle-o",style:{
textAlign:"center",width:"1.5em",fontSize:"120%"}}),m({style:{fontStyle:"italic"
}},"in an Unknown Workspace")]),g([m({style:{color:"silver",fontStyle:"italic",
marginRight:"4px"}},"title"),m({dataBind:{text:"workspaceInfo.title"}
})])])]])]),g({style:{display:"inline-block",verticalAlign:"top",width:"25%",
paddingLeft:"10px",textAlign:"right"}},[g([m({style:{color:"silver",
fontStyle:"italic",marginRight:"4px"}},"last saved"),m({dataBind:{typedText:{
value:"genomeInfo.lastSavedAt",type:'"date"',format:'"YYYY/MM/DD"'}}})]),g([m({
style:{color:"silver",fontStyle:"italic",marginRight:"4px"}},"owner"),f({
dataBind:{text:"workspaceInfo.owner",attr:{
href:'"/#people/" + workspaceInfo.owner'}},target:"_blank"})])])]),g(g({
class:"btn-toolbar"},[m({class:"btn btn-text",style:{fontStyle:"italic"}
},"Show: "),h({type:"button",class:"btn btn-default btn-kb-flat",style:{
margin:"2px",padding:"2px"},dataBind:{
click:"function(...args){$component.doToggleGenomeDetail.apply($component, args);}"
}},[m({class:"fa",dataBind:{css:{"fa-check-circle-o":"isOpen()",
"fa-circle-o":"!isOpen()"}}})," genome details "]),h({type:"button",
class:"btn btn-default btn-kb-flat",style:{margin:"2px",padding:"2px"},
dataBind:{
click:"function(...args){$component.doToggleShowDetails.apply($component, args);}"
}},[m({class:"fa",dataBind:{css:{"fa-check-circle-o":"showItemDetail()",
"fa-circle-o":"!showItemDetail()"}}})," feature details "]),h({type:"button",
class:"btn btn-default btn-kb-flat",style:{margin:"2px",padding:"2px"},
dataBind:{
click:"function(...args){$component.doToggleShowMatches.apply($component, args);}"
}},[m({class:"fa",dataBind:{css:{"fa-check-circle-o":"showItemMatches()",
"fa-circle-o":"!showItemMatches()"}}
})," just search matches "])])),a.if("isOpen()",g({style:{margin:"4px",
padding:"4px",border:"1px solid rgba(150, 150, 150, 1)",
boxShadow:"4px 4px 4px rgba(200, 200, 200, 0.7)"}},[g({
class:S.classes.sectionTitle},"Genome Details"),g({style:{
display:"inline-block",verticalAlign:"top",width:"50%",paddingRight:"10px"}},w({
class:S.classes.groupHeaderTable},[y([k([v({width:"20%"},"Scientific name"),B({
dataBind:{text:"genomeInfo.scientificName"}
})]),k([v("KBase ID"),B("n/a")]),k([v("Lineage"),B({dataBind:{component:{
name:n.quotedName(),params:{value:"genomeInfo.lineage"}}}})]),k([v("Source"),B({
dataBind:{text:"genomeInfo.source"}})]),k([v("Source ID"),B({dataBind:{
text:"genomeInfo.sourceId"}})])])])),g({style:{display:"inline-block",
verticalAlign:"top",width:"50%",paddingLeft:"10px"}},w({
class:S.classes.groupHeaderTable},[y([k([v({width:"20%"},"DNA size"),B({
dataBind:{typedText:{value:"genomeInfo.dnaSize",type:'"number"',format:'"0,0"'}}
})]),k([v("Feature count"),B({dataBind:{typedText:{
value:"genomeInfo.featureCount",type:'"number"',format:'"0,0"'}}
})]),k([v("Contig count"),B({dataBind:{typedText:{
value:"genomeInfo.contigCount",type:'"number"',format:'"0,0"'}}
})]),k([v("GC content"),B({dataBind:{typedText:{value:"genomeInfo.gcContent",
type:'"number"',format:'"0.00%"'}}})])])]))]))]),g({class:S.classes.header
},a.component({name:c.name(),params:{}})),g({dataBind:{foreach:"items"},
name:"result-rows"},[g({class:S.classes.resultsRow},[g({
class:[S.classes.row,S.classes.objectRow],dataKBTesthookElement:"object-row"
},[g({class:S.classes.rowCell,style:{flex:"0 0 2em"}
},["\x3c!-- ko switch: matchClass.id --\x3e",'\x3c!-- ko case: "dataObject" --\x3e',"\x3c!-- ko if: matchClass.copyable --\x3e",m({
style:{fontSize:"120%"},class:"fa",dataBind:{attr:{
title:'selected() ? "Click to deselect this object" : "Click to select this object for copying"'
},class:'selected() ? "fa-check-square-o" : "fa-square-o"',
click:"$component.doToggleSelected"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),g({
class:S.classes.rowCell,style:{flex:"1"},dataBind:{text:"featureType"}}),g({
class:S.classes.rowCell,style:{flex:"1.6",workBreak:"break-all"}
},["\x3c!-- ko switch: matchClass.id --\x3e",'\x3c!-- ko case: "subObject" --\x3e',"\x3c!-- ko if: matchClass.viewable --\x3e",f({
dataBind:{attr:{href:'"/#dataview/" + matchClass.ref.subObjectRef'},text:"id"},
target:"_blank"
}),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: matchClass.viewable --\x3e",g({
dataBind:{text:"id"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]),g({
class:S.classes.rowCell,style:{flex:"3"}},g({dataBind:{component:{
name:i.quotedName(),params:{value:"featureFunctions"}}}})),g({
class:S.classes.rowCell,style:{flex:"0 0 4em",textAlign:"right"}
},g({},["\x3c!-- ko if: matchClass.copyable || matchClass.viewable --\x3e",g({
class:"btn-group",dataBind:{enable:"$parent.active"}},[h({type:"button",
class:"btn btn-default btn-sm dropdown-toggle btn-kb-toggle-dropdown",
dataToggle:"dropdown",ariaHasPopup:"true",areaExpanded:"false"},[m({
class:"fa fa-ellipsis-h"})]),b({class:"dropdown-menu dropdown-menu-right"
},[u(g({style:{fontWeight:"bold",textAlign:"center",color:"gray"}
},"Object")),"\x3c!-- ko if: matchClass.copyable --\x3e",u(f({dataBind:{
click:"$component.doCopyObject"}
},"Copy...")),"\x3c!-- /ko --\x3e","\x3c!-- ko if: matchClass.viewable --\x3e",u(f({
dataBind:{click:"$component.doViewObject"}
},"View")),"\x3c!-- /ko --\x3e"])]),"\x3c!-- /ko --\x3e"]))]),"\x3c!-- ko if: showDetails() || showMatches() --\x3e",g({
class:[S.classes.body]},[g({class:S.classes.objectItemRow},[g({style:{
flex:"1 1 0px",display:"flex",flexDirection:"row"}},[g({class:S.classes.rowCell,
style:{flex:"0 0 2em"}}),g({style:{flex:"2",marginRight:"4px"}},g({style:{
padding:"4px",margin:"4px",display:"flex",flexDirection:"row"}},[g({style:{
flex:"2",marginRight:"4px"}},["\x3c!-- ko if: showMatches() --\x3e",g({style:{
margin:"4px",padding:"4px",border:"1px solid rgba(150, 150, 150, 1)",
boxShadow:"4px 4px 4px rgba(200, 200, 200, 0.7)"}},[g({
class:S.classes.sectionTitle
},"Matches"),"\x3c!-- ko if: matches.length > 0 --\x3e",w({
class:S.classes.highlightsTable},[y({dataBind:{foreach:"matches"}},k([v({
dataBind:{text:"label"}
}),B({},["\x3c!-- ko foreach: $data.highlights --\x3e",g({
class:S.classes.highlight,dataBind:{html:"highlight"}
}),"\x3c!-- /ko --\x3e"])]))]),"\x3c!-- /ko --\x3e","\x3c!-- ko if: matches.length === 0 --\x3e",x({
style:{marginTop:"10px",fontStyle:"italic"}},["No matches reported ... ",m({
class:"fa fa-bug fa-rotate-90"
})," ... it is a mystery!"]),"\x3c!-- /ko --\x3e"]),"\x3c!-- /ko --\x3e"]),g({
style:{flex:"3",marginLeft:"4px"}},["\x3c!-- ko if: showDetails() --\x3e",g({
style:{margin:"4px",padding:"4px",border:"1px solid rgba(150, 150, 150, 1)",
boxShadow:"4px 4px 4px rgba(200, 200, 200, 0.7)"}},[g({
class:S.classes.sectionTitle},"Feature Details"),w({class:S.classes.detailTable
},[y({dataBind:{foreach:"detail"}},k([v({dataBind:{text:"label"}
}),"\x3c!-- ko ifnot: $data.value --\x3e",B(r.buildNA()),"\x3c!-- /ko --\x3e","\x3c!-- ko if: $data.value --\x3e","\x3c!-- ko if: $data.type --\x3e",B({
dataBind:{typedText:{value:"value",type:"type",format:"format"}}
}),"\x3c!-- /ko --\x3e","\x3c!-- ko if: $data.component --\x3e",B({dataBind:{
component:{name:"$data.component",params:{value:"$data.value",
params:"$data.params"}}}
}),"\x3c!-- /ko --\x3e","\x3c!-- ko ifnot: $data.type || $data.component --\x3e",B({
dataBind:{text:"value"}
}),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]))])]),"\x3c!-- /ko --\x3e"])])),g({
class:S.classes.rowCell,style:{flex:"0 0 4em"}
})])])]),"\x3c!-- /ko --\x3e"])])])),"\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"])]),
stylesheet:S.sheet}}))}));