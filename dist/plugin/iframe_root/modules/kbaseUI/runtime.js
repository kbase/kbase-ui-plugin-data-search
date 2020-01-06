define(["bluebird","kb_lib/props","kb_lib/messenger","./widget/manager","./session"],(e,t,s,i,r)=>{
"use strict";return class{constructor({token:e,username:n,config:a}){
this.token=e,this.username=n,this.widgetManager=new i({baseWidgetConfig:{
runtime:this}}),this.configDb=new t.Props({data:a
}),this.pluginPath="/modules/plugins/auth2-client/iframe_root",
this.pluginResourcePath=this.pluginPath+"/resources",
this.messenger=new s,this.heartbeatTimer=null,this.services={session:new r({
runtime:this})
},this.featureSwitches={},this.configDb.getItem("ui.featureSwitches.available",[]).forEach(e=>{
this.featureSwitches[e.id]=e})}config(e,t){return this.configDb.getItem(e,t)}
getConfig(e,t){return this.config(e,t)}service(e){switch(e){case"session":
return this.services.session}}getService(e){return this.service(e)}send(e,t,s){
this.messenger.send({channel:e,message:t,data:s})}receive(e,t,s){
return this.messenger.receive({channel:e,message:t,handler:s})}recv(e,t,s){
return this.receive(e,t,s)}drop(e){this.messenger.unreceive(e)}
featureEnabled(e,t=!1){
if(!this.featureSwitches[e])throw new Error('Feature switch "'+e+'" not defined')
;return this.configDb.getItem("ui.featureSwitches.enabled").includes(e)||t}
start(){return e.try(()=>(this.heartbeatTimer=window.setInterval(()=>{
this.send("app","heartbeat",{time:(new Date).getTime()})
},1e3),this.services.session.start()))}stop(){
return e.try(()=>(window.clearInterval(this.heartbeatTimer),
this.services.session.stop()))}}});