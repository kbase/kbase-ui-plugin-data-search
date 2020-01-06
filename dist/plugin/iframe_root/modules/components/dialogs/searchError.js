define(["knockout","kb_knockout/registry","kb_knockout/components/error","kb_lib/html","../../lib/ui"],(function(e,o,t,r,n){
"use strict";var a=r.tag,c=a("div"),i=a("span");function s(o){
var t=e.unwrap(o.error),r=t.source,n=t.code,a=t.message,c=t.detail,i=t.info,s=t.stackTrace
;function l(){o.onClose()}return{title:"Search Error",buttons:[{title:"Close",
action:l}],error:t,close:close,onClose:l,source:r,code:n,message:a,detail:c,
info:i,stackTrace:s}}return o.registerComponent((function(){return{viewModel:s,
template:n.buildDialog({type:"error",title:i({dataBind:{text:"title"}}),body:c({
dataBind:{component:{name:t.quotedName(),params:{source:"source",code:"code",
message:"message",detail:"detail",info:"info",stackTrace:"stackTrace"}}}})})}}))
}));