define(["kb_common_ts/Auth2"],t=>{"use strict";return class{
constructor({runtime:e}){
this.runtime=e,this.auth2Root=null,this.serverTime=null,
this.auth2Client=new t.Auth2({baseUrl:e.config("services.auth.url")})}
getAuthToken(){return this.runtime.token}getUsername(){
return this.runtime.username}isLoggedIn(){return!!this.runtime.token}
isAuthorized(){return!!this.runtime.token}getClient(){return this.auth2Session}
serverTimeOffset(){return Date.now()-this.serverTime}start(){
return this.auth2Client.root().then(t=>{
this.auth2Root=t,this.serverTime=t.servertime})}stop(){
return new Promise.resolve}}});