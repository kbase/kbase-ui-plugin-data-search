define(["kb_knockout/registry","kb_knockout/lib/viewModelBase","kb_lib/html","../../ui"],(function(e,t,a,i){
"use strict"
;const l=a.tag,o=l("div"),n=l("span"),c=l("table"),x=l("thead"),d=l("tbody"),u=l("tr"),k=l("th"),s=l("td")
;class b extends t{constructor(e){super(e),this.value=e.value}}
return e.registerComponent((function(){return{viewModel:b,
template:o(["\x3c!-- ko if: value && value.length > 0 --\x3e",c({
class:"table table-kb-compact table-kb-plain"},[x(u([k("type"),k("id")])),d({
dataBind:{foreach:"value"}
},[u([s(["\x3c!-- ko ifnot: type --\x3e",i.buildNA(),n({dataBind:{text:"type"}
}),"\x3c!-- /ko --\x3e","\x3c!-- ko if: type --\x3e",n({dataBind:{text:"type"}
}),"\x3c!-- /ko --\x3e"]),s({dataBind:{text:"alias"}
})])])]),"\x3c!-- /ko --\x3e","\x3c!-- ko if: !value ||  value.length === 0 --\x3e",i.buildNA(),"\x3c!-- /ko --\x3e"])
}}))}));