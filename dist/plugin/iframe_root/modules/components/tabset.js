define(["knockout","kb_knockout/registry","kb_lib/html","css!./tabset.css"],(function(t,a,e){
"use strict";var n=e.tag,o=n("ul"),c=n("li"),s=n("a"),i=n("span"),l=n("div")
;function b(a){
var n=a.bus,o=e.genId(),c=t.observableArray(),s=t.observableArray(["nav","nav-tabs"]),i=t.observable()
;function l(a){return{id:a.id,tab:{label:a.tab.label,component:a.tab.component},
panel:{component:a.panel.component,content:a.panel.content},content:a.content,
active:t.observable(!1),closable:t.observable(a.closable||!1)}}function b(t,a){
var e=l(t);c.push(e),a&&(r(),d(e))}function d(t){t.active(!0),i(t)}function r(){
i()&&i().active(!1)}function p(t){r(),d(t)}return n.on("add-tab",(function(t){
b(t.tab)})),n.on("select-tab",(function(t){"number"==typeof t&&p(c()[t])
})),a.tabs&&a.tabs.forEach((function(t){c.push(l(t))
})),"active"in a||c().length>0&&(c()[0].active(!0),i(c()[0])),n.send("ready"),{
tabs:c,tabClasses:s,tabsetId:o,doCloseTab:function(t){var a=c.indexOf(t)
;if(c.remove(t),0!==a&&t===i()){var e,n=c().length,o=c().reduce((function(t,a){
return t+(a.closable()?1:0)}),0)
;d(e=o>0?a===n-o?c()[a+1]:c()[a-1]:c()[0]),e.active(!0)}},doSelectTab:p,addTab:b
}}return a.registerComponent((function(){return{viewModel:b,template:l({
class:"component-tabset",dataKBTesthookComponent:"tabset"},[o({dataBind:{attr:{
id:"tabsetId"},foreach:"tabs"},class:"kb-tabs",role:"tablist"},c({
role:"presentation",class:"tabs",dataBind:{css:{active:"active"}}},[s({
dataBind:{click:"$component.doSelectTab",attr:{"data-k-b-testhook-tab":"id"}},
role:"tab",style:{display:"inline-block"}},[i({dataBind:{text:"tab.label"}
}),"\x3c!-- ko if: tab.component --\x3e",i({dataBind:{component:{
name:"tab.component.name",params:"tab.component.params"}},
dataKBTesthookButton:"tab"
}),"\x3c!-- /ko --\x3e","\x3c!-- ko if: $parent.closable --\x3e",i({
class:"-button",dataBind:{click:"$component.doCloseTab"}},i({class:"fa fa-times"
})),"\x3c!-- /ko --\x3e"])])),l({class:"tab-content",style:{position:"relative"
},dataBind:{foreach:"tabs"}},["\x3c!-- ko if: active --\x3e",l({dataBind:{attr:{
active:"active"},css:{in:"active",active:"active"},with:"panel"},
class:"tab-pane fade",role:"tabpanel"
},["\x3c!-- ko if: $data.component --\x3e",l({style:{flex:"1 1 0px",
display:"flex",flexDirection:"column"},dataBind:{component:{
name:"component.name",params:"component.params"}}
}),"\x3c!-- /ko --\x3e","\x3c!-- ko if: $data.content --\x3e",l({style:{
flex:"1 1 0px",display:"flex",flexDirection:"column"},dataBind:{
html:"$data.content"}}),"\x3c!-- /ko --\x3e"]),"\x3c!-- /ko --\x3e"])])}}))}));