define(["kb_knockout/registry","kb_lib/html"],(function(t,n){"use strict"
;var o=(0,n.tag)("span");function e(t){return{count:t.count}}
return t.registerComponent((function(){return{viewModel:e,template:o({style:{
margin:"2px",padding:"2px",backgroundColor:"rgba(220,220,220,0.5)",
border:"0.5px solid rgba(200,200,200,0.5)",borderRadius:"3px"},dataBind:{
typedText:{value:"count",type:'"number"',format:'"0,0"'},style:{
"font-weight":'count() ? "bold" : "normal"'},
visible:'typeof count() === "number"'},dataKBTesthookComponent:"tab-total-count"
})}}))}));