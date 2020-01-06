define(["kb_common/jsonRpc/dynamicServiceClient","kb_common/jsonRpc/genericClient","kb_common/jsonRpc/exceptions","./errors"],(function(r,e,n,o){
"use strict";return{make:function(c){var i=c.runtime;return{
call:function(c,t,a){
var s=i.config(["services",c,"url"].join(".")),l=i.service("session").getAuthToken()
;return(s?new e({module:c,url:s,token:l}):new r({
url:i.config("services.service_wizard.url"),token:l,module:c
})).callFunc(t,[a]).catch((function(r){
if(r instanceof n.AjaxError)throw console.error("AJAX Error",r),
new o.DataSearchError("AJAX Error: "+r.name,r.code,r.message,null,{
originalError:r});if(r instanceof n.RpcError){console.error("RPC Error",r)
;const e="An error was encountered running an rpc method",n='The module is "'+r.module+'", the method "'+r.func+'", the error returned from the service is "'+(r.message||"unknown")+'"'
;throw new o.DataSearchError("service-call-error",r.name,e,n,{originalError:r})}
throw new o.DataSearchError("rpc-call",r.name,r.message,null,{originalError:r})
}))}}}}}));