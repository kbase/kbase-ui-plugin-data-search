define(["kb_knockout/registry","kb_lib/html"],(function(e,t){"use strict"
;var n=t.tag,o=n("div"),c=n("span");function s(e){return{
typeCounts:e.typeCounts,resultCount:e.resultCount,searchStatus:e.searchStatus}}
return e.registerComponent((function(){return{viewModel:s,template:o({},[o({
style:{flex:"1",display:"flex",alignItems:"center"}},o({style:{
display:"inline-block"}
},["\x3c!-- ko switch: searchStatus() --\x3e",'\x3c!-- ko case: "none" --\x3e',"","\x3c!-- /ko --\x3e",'\x3c!-- ko case: "notfound" --\x3e',"","\x3c!-- /ko --\x3e",'\x3c!-- ko case: "success" --\x3e',"Found ","\x3c!-- ko foreach: typeCounts --\x3e",c({
dataBind:{typedText:{value:"count",type:'"number"',format:'"0,0"'}}})," ",c({
dataBind:{labelText:{label:"id",quantity:"count",labels:"$root.labels"}}
}),"\x3c!-- ko if: $index() !== $parent.typeCounts().length - 1 --\x3e",", ","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"]))])
}}))}));