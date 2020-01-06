define(["jquery","bluebird","./cookie"],(function(e,n,r){"use strict"
;function t(t){
var s,o=t||{},i=o.cookieName,u=o.cookieMaxAge||36e3,a=o.loginUrl,c=o.extraCookies,l=Object.create(r).init({
doc:document});function f(e){var n,r,t,s,o=e.split("|"),i={}
;for(n=0;n<o.length;n+=1)t=(r=o[n].split("="))[0],s=r[1],i[t]=s;return i}
function m(e){
return void 0===e&&(e=e),!!e&&(!!(e.sessionId&&e.username&&e.token&&e.tokenObject)&&!function(e){
var n=e.tokenObject.expiry
;return!!n&&(n=parseInt(n,10),!isNaN(n)&&new Date(1e3*n)-new Date<=0)}(e))}
function d(){if(s){var e=function(){var e=""
;return e+="un="+s.username,e+="|kbase_sessionid="+s.sessionId,
e+="|user_id="+s.username,
e+="|token="+s.token.replace(/=/g,"EQUALSSIGN").replace(/\|/g,"PIPESIGN")}()
;l.setItem(i,e,u,"/"),c&&c.forEach((function(n){
l.setItem(n.name,e,u,"/",n.domain)})),g().success=1}}function k(){return I(b()),
s}function g(){return s?{un:s.username,user_id:s.username,name:s.realname,
token:s.token,kbase_sessionid:s.sessionId}:null}function p(){
var e=l.getCookies();l.removeItem(i,"/"),c&&c.forEach((function(e){
l.removeItem(e.name,e.path||"/",e.domain)})),e.forEach((function(e){
l.removeItem(e.name,"/")})),s=null}function I(e){s=m(e)?e:null}function b(){
var e=l.getItems(i);if(!e||0===e.length)return null;var n=f(e[0])
;if(!(n.kbase_sessionid&&n.un&&n.user_id&&n.token))return p(),null
;n.token=n.token.replace(/PIPESIGN/g,"|").replace(/EQUALSSIGN/g,"=");var r={
username:n.user_id,token:n.token,tokenObject:f(n.token),
sessionId:n.kbase_sessionid};return m(r)?r:null}return{getVersion:function(){
return"0.2.0"},login:function(r){return new n((function(n,t){
if(r.username&&0!==r.username.length)if(r.password&&0!==r.password.length){
r.username=r.username.toLowerCase();var o={user_id:r.username,
password:r.password,fields:"un,token,user_id,kbase_sessionid,name",status:1}
;e.support.cors=!0,e.ajax({type:"POST",url:a,data:o,dataType:"json",
crossDomain:!0,xhrFields:{withCredentials:!0},beforeSend:function(e){
e.withCredentials=!0},success:function(e){e.kbase_sessionid?(I(function(e){
if(!(e.kbase_sessionid&&e.user_id&&e.token))return p(),null;var n={
username:e.user_id,realname:e.name,token:e.token,tokenObject:f(e.token),
sessionId:e.kbase_sessionid};return m(n)?n:null
}(e)),r.disableCookie||d(),n(g())):t(new Error(e.error_msg))},
error:function(e,n){
var r=n,o="The login attempt failed: Username &amp; Password combination are incorrect"
;e.status&&401===e.status?r=o:e.responseJSON&&(e.responseJSON.error_msg&&(r=e.responseJSON.error_msg),
"LoginFailure: Authentication failed."===r&&(r=o)),
"error"===r&&(r="Internal Error: Error connecting to the login server"),
s=null,t(new Error(r))}})
}else t("Password is empty: It is required for login");else t("Username is empty: It is required for login")
}))},logout:function(){return new n((function(e){p(),e()}))},
getUsername:function(){if(k(),s)return s.username},getRealname:function(){
if(k(),s)return s.realname},getSessionId:function(){if(k(),s)return s.sessionId
},getAuthToken:function(){if(k(),s)return s.token},isLoggedIn:function(){
return k(),!(!s||!s.token)},importFromCookie:b,setSession:I,
getKbaseSession:function(){return k(),s?g():null}}}return{make:function(e){
return t(e)}}}));