define(["kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html","../../ui"],(function(e,t,a,l){
"use strict"
;var o=a.tag,i=o("div"),c=o("table"),d=o("thead"),n=o("tbody"),r=o("tr"),u=o("th"),s=o("td")
;class k extends t{constructor(e){super(e);const t=e.params||{}
;this.value=e.value,
this.col1Header=t.col1||"key",this.col2Header=t.col2||"value"}}
return e.registerComponent((function(){return{viewModel:k,
template:i(["\x3c!-- ko if: value && value.length > 0 --\x3e",c({
class:"table table-kb-compact table-kb-plain"},[d(r([u({dataBind:{
text:"col1Header"}}),u({dataBind:{text:"col2Header"}})])),n({dataBind:{
foreach:"value"}},[r([s({dataBind:{text:"key"}}),s({dataBind:{text:"value"}
})])])]),"\x3c!-- /ko --\x3e","\x3c!-- ko if: !value ||  value.length === 0 --\x3e",l.buildNA(),"\x3c!-- /ko --\x3e"])
}}))}));