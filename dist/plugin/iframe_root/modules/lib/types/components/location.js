define(["kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html"],(function(t,e,a){
"use strict"
;var n=a.tag,d=n("table"),r=n("thead"),l=n("tbody"),i=n("tr"),u=n("th"),o=n("td")
;class s extends e{constructor(t){super(t),this.value=t.value}}function b(){
return d({class:"table table-kb-compact table-kb-plain"},[r(i([u({style:{
width:"25%"}},"start"),u({style:{width:"25%"}},"end"),u({style:{width:"25%"}
},"strand"),u({style:{width:"25%"}},"length (bp)")])),l({dataBind:{
foreach:"value"}},i([o({dataBind:{typedText:{value:"start",type:'"number"',
format:'"0,0"'}}}),o({dataBind:{typedText:{value:"end",type:'"number"',
format:'"0,0"'}}}),o({dataBind:{typedText:{value:"direction"}}}),o({dataBind:{
typedText:{value:"length",type:'"number"',format:'"0,0"'}}})]))])}
return t.registerComponent((function(){return{viewModel:s,template:b()}}))}));