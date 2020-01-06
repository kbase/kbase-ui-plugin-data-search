define(["knockout","kb_knockout/registry","kb_knockout/lib/generators","kb_knockout/lib/viewModelBase","kb_lib/html","../../ui"],(function(t,e,n,i,o,s){
"use strict";const a=o.tag,l=a("button"),u=a("span"),c=a("div")
;class h extends i{constructor(e){let n
;super(e),e.value?0===e.value.length?n=!0:(this.value=e.value,
this.proteinLength=this.value.length,
this.showing=t.observable(!1),n=!1):n=!0,this.isEmpty=n}doToggleShow(){
this.isEmpty||this.showing(!this.showing())}}
return e.registerComponent((function(){return{viewModel:h,
template:c([n.if("isEmpty",s.buildNA(),c([c({},l({type:"button",
class:"btn btn-default btn-kb-flat",style:{padding:"0px",margin:"0px"},
dataBind:{
click:"function (d,e) {return $component.doToggleShow.call($component,d,e);}"}
},n.if("showing()",u(["hide ",u({class:"fa fa-caret-down"})]),u(["show ",u({
class:"fa fa-caret-right"})])))),n.if("showing",c({dataBind:{text:"value"}
}))]))])}}))}));