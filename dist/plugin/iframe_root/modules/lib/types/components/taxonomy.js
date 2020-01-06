define(["kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","../../ui"],(function(e,t,i,n,a){
"use strict";const l=n.tag,u=l("span"),o=l("div");class s extends i{
constructor(e){let t;super(e),this.value=e.value,t=!e.value||0===e.value.length,
this.isEmpty=t}}return e.registerComponent((function(){return{viewModel:s,
template:o([t.if("isEmpty",a.buildNA(),o({dataBind:{foreach:"value"}},[u({
dataBind:{text:"$data"}
}),t.if("$index() !== $parent.value.length - 1"," > ")]))])}}))}));