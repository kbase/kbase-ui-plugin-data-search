define(["kb_common/jsonRpc/genericClient","kb_common/props"],(function(e,r){
"use strict";return Object.freeze({make:function(t){var n=t.runtime,o=new e({
url:n.config("services.UserProfile.url"),
token:n.service("session").getAuthToken(),module:"UserProfile"})
;return Object.freeze({getHistory:function(e){
var t=n.service("session").getUsername(),s=["profile","plugins","data-search","settings","history",e]
;return o.callFunc("get_user_profile",[[t]]).spread((function(e){var t=r.make({
data:e[0]}),n=function(e,r){for(var t=0;t<e.length;t+=1){var n=r(e[t])
;if(n)return n}}([s],(function(e){return t.getItem(e)}))
;return n&&n.history instanceof Array||(n={history:[],time:(new Date).getTime()
}),[n.history,null]})).catch((function(e){return[null,{
source:"ProfileService:get_user_profile",code:"error-getting-user-profile",
message:"An error occurred attempting to get the user preferences: "+e.message,
errors:[e],info:{username:t}}]}))},saveHistory:function(e,t){
var s=n.service("session").getUsername(),i=["data-search","settings","history",e]
;return o.callFunc("get_user_profile",[[s]]).spread((function(e){var n=r.make({
data:e[0]}),s=r.make({data:n.getItem("profile.plugins",{})})
;return s.hasItem(i)&&function(e,r){if(e.length!==r.length)return!1
;for(var t=0;t<e.length;t+=1)if(e[t]!==r[t])return!1;return!0
}(s.getItem(i).history,t)?[!0,null]:(s.setItem(i,{history:t,
time:(new Date).getTime()}),function(e){
return o.callFunc("update_user_profile",[e]).then((function(){return[!0,null]
})).catch((function(r){return[null,{source:"ProfileService:update_user_profile",
code:"error-in-call",
message:"An error occurred attempting to update the user profile: "+r.message,
errors:[r],info:{profileUpdate:e}}]}))}({profile:{profile:{plugins:s.debug()},
user:n.getItem("user")}}))})).catch((function(e){return[null,{
source:"ProfileService:get_user_profile",code:"error-getting-user-profile",
message:"An error occurred attempting to save the user preferences: "+e.message,
errors:[e],info:{username:s}}]}))}})}})}));