define(["knockout","kb_knockout/registry","kb_lib/html"],(function(e,t,o){
"use strict";var n=o.tag,u=n("div"),c=n("span");function a(t){return{
typeCounts:e.pureComputed((function(){
return t.typeCounts()?t.typeCounts().sort((function(e,t){return t.count-e.count
})):[]})),resultCount:t.resultCount,searchSpaceCount:t.searchSpaceCount,
searchStatus:t.searchStatus}}return t.registerComponent((function(){return{
viewModel:a,template:u({style:{flex:"1 1 0px",display:"flex",flexDirection:"row"
}},[u({style:{display:"inline-block"}
},["\x3c!-- ko switch: searchStatus() --\x3e",'\x3c!-- ko case: "none" --\x3e',"","\x3c!-- /ko --\x3e",'\x3c!-- ko case: "notfound" --\x3e',"","\x3c!-- /ko --\x3e",'\x3c!-- ko case: "success" --\x3e',"Found ",c({
dataBind:{typedText:{value:"searchSpaceCount",type:'"number"',format:'"0,0"'}}
})," total","\x3c!-- ko if: resultCount() < searchSpaceCount() --\x3e"," (truncated to ",c({
dataBind:{typedText:{value:"resultCount",type:'"number"',format:'"0,0"'}}
}),")","\x3c!-- /ko --\x3e",": ","\x3c!-- ko foreach: typeCounts --\x3e",c({
dataBind:{typedText:{value:"count",type:'"number"',format:'"0,0"'}}})," ",c({
dataBind:{labelText:{label:"id",quantity:"count",labels:"$root.labels"}}
}),"\x3c!-- ko if: $index() !== $parent.typeCounts().length - 1 --\x3e",", ","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e","\x3c!-- /ko --\x3e"])])
}}))}));