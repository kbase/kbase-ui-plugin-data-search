define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/subscriptionManager","kb_lib/html","kb_lib/htmlBuilders","../../lib/data"],(function(e,t,a,o,r,n,l){
"use strict";const i=r.tag,s=i("div"),d=i("span"),c=i("input"),u=i("select")
;function b(t,a){
const r=e.contextFor(a.element).$root.runtime,n=new o,i=l.make({runtime:r
}),s=e.observable();s.syncWith(t.selectedNarrative);const d=[{label:"Title",
value:"title",selected:e.observable(!1)},{label:"Date",value:"date",
selected:e.observable(!1)}],c=e.observable("date"),u=e.observable("descending")
;const b=e.observable(!1),f=e.observableArray([]),v=e.observable()
;i.getWritableNarratives().then((function(t){t.forEach((function(t){f.push({
title:t.metadata.narrative_nice_name,
ref:[String(t.id),t.metadata.narrative].join("/"),owner:t.owner,
realName:t.ownerRealName,date:t.modDate,searchable:{
title:t.metadata.narrative_nice_name.toLowerCase(),owner:t.owner,
realName:t.ownerRealName.toLowerCase()},sortable:{
title:t.metadata.narrative_nice_name.toLowerCase(),owner:t.owner,
date:t.modDate.getTime()},active:e.observable(!1),selected:e.observable(!1)})
})),b(!0)})).catch((function(e){v(e)}));const p=e.observable().extend({
rateLimit:150}),g=e.observable(!1),y=e.pureComputed((function(){
return!p()||p().length<2?null:p()}));function m(e,t){return e<t?-1:e>t?1:0}
const h=e.pureComputed((function(){return"ascending"===u()?1:-1
})),x=e.pureComputed((function(){var e,t=y();if(t){var a=t.toLowerCase()
;e=f().filter((function(e){return Object.keys(e.searchable).some((function(t){
return e.searchable[t].indexOf(a)>=0}))}))}else e=f();var o=c()
;return e.sort((function(e,t){var a=h();switch(o){case"title":
return a*m(e.sortable.title,t.sortable.title);case"username":
return a*m(e.sortable.username,t.sortable.username);case"date":default:
return a*m(e.sortable.date,t.sortable.date)}}))}))
;var w=e.pureComputed((function(){return f().length
})),k=e.observable(!1),C=e.observable(),B=e.observable(!1);return{loading:g,
inputValue:p,narrativesFiltered:x,totalCount:w,searchCount:C,isSearching:B,
doSelectValue:function(e){if(e.selected())return e.selected(!1),void s(null)
;x().forEach((function(e){e.selected(!1)})),s(e.ref),e.selected(!0)},
doClearSearch:function(){p("")},tooManyResults:k,sortOptions:d,sortOption:c,
sortDirection:u,ready:b,doDeactivate:function(e){e.active(!1)},
doActivate:function(e){e.active(!0)},doToggleSort:function(){
u("descending"===u()?"ascending":"descending")},dispose:function(){n.dispose()}}
}var f=r.makeStyles({component:{css:{},inner:{".-row.-active":{css:{
backgroundColor:"silver"}}}},container:{css:{}},selectedRow:{css:{
backgroundColor:"silver"}},hoverRow:{css:{backgroundColor:"silver"}},
addonButton:{css:{},pseudoClasses:{hover:{
backgroundColor:"rgba(200,200,200,0.5)"},active:{
backgroundColor:"rgba(200,200,200,1)"}}}})
;return t.registerComponent((function(){return{viewModel:{createViewModel:b},
template:s({style:{},class:f.classes.component},s({class:f.classes.container
},[s({dataBind:{if:"loading()"}},n.loading()),s({dataBind:{ifnot:"loading()"}
},[s({width:"100%"},s({style:{display:"flex",flexDirection:"row"}},[c({
class:"form-control",style:{flex:"1"},dataBind:{value:"inputValue",
valueUpdate:'"input"'}}),s({style:{flex:"0 0 auto"}},u({class:"form-control",
style:{flex:"0 0 auto"},dataBind:{value:"sortOption",options:"sortOptions",
optionsValue:'"value"',optionsText:'"label"'}})),d({
class:["input-group-addon","fa",f.classes.addonButton],style:{display:"block",
flex:"0 0 auto",width:"auto"},dataBind:{
class:'sortDirection() === "ascending" ? "fa-sort-asc" : "fa-sort-desc"',
click:"doToggleSort"}}),d({
class:["input-group-addon","fa","fa-times",f.classes.addonButton],style:{
cursor:"pointer",width:"auto"},dataBind:{click:"doClearSearch",
enable:"inputValue"}})])),s({style:{width:"100%",display:"flex",
flexDirection:"column",height:"20em"}},["\x3c!-- ko ifnot: ready --\x3e",s({
style:{textAlign:"center",margin:"20px"}
},n.loading("Loading data")),"\x3c!-- /ko --\x3e","\x3c!-- ko if: ready --\x3e",s({
style:{borderTop:"1px silver solid",borderLeft:"1px silver solid",
borderRight:"1px silver solid",backgroundColor:"#EEE",zIndex:"100",
padding:"4px",width:"100%",flex:"0 0 auto"}},[s({style:{flex:"0 0 auto"}
},["Showing ",a.if("narrativesFiltered().length === totalCount()",d(["all ",d({
dataBind:{typedText:{value:"totalCount",type:'"number"',format:'"0,0"'}}
})," writable narratives"]),d([d({dataBind:{text:"narrativesFiltered().length"}
})," out of ",d({dataBind:{text:"totalCount"}
})," writable narratives"]))])]),s({dataBind:{foreach:{
data:"narrativesFiltered",includeDestroyed:"false"}},style:{
border:"1px silver solid",backgroundColor:"white",zIndex:"100",width:"100%",
overflow:"auto",flex:"1"}},s({class:"-row",style:{padding:"4px",
cursor:"pointer",borderBottom:"1px silver solid"},dataBind:{
click:"$parent.doSelectValue",
class:'[($data && $data.active && active() ? "'+f.classes.hoverRow+'" : ""), ($data && $data.selected && selected() ? "'+f.classes.selectedRow+'" : "")].join(" ")',
event:{mouseover:"$parent.doActivate",mouseout:"$parent.doDeactivate"}}},[s({
style:{fontWeight:"bold"},dataBind:{text:"title"}}),s({style:{display:"flex",
flexDirection:"row"}},[s({style:{flex:"2"},dataBind:{text:"realName"}}),s({
style:{flex:"1"},dataBind:{text:"owner"}}),s({style:{flex:"1"},dataBind:{
typedText:{value:"date",type:'"date"',format:'"MM/DD/YYYY"'}}
})])])),"\x3c!-- /ko --\x3e"]),s({class:"text-warning",style:{fontStyle:"italic"
},dataBind:{if:"tooManyResults()"}},["Too many matches (",d({dataBind:{
text:"searchCount"}
}),") to display -- please enter more in order to narrow your results."]),s({
style:{fontStyle:"italic"},dataBind:{
if:"!tooManyResults() && narrativesFiltered().length === 0 && inputValue() && inputValue().length < 2"
}
},["Please enter two or more letters above to search for your research or educational organization. "]),s({
style:{fontStyle:"italic"},dataBind:{
if:"!tooManyResults() && narrativesFiltered().length === 0 && inputValue() && inputValue().length >= 2"
}
},["Nothing matched your entry. You may leave it as is to use this value in your profile, ","or try different text to match your organization."])])])),
stylesheet:f.sheet}}))}));