define(["require"],e=>{"use strict";return class{
constructor({node:e,runtime:t,panels:r}){this.currentPanel=null,this.hostNode=e,
this.runtime=t,this.panels=r,this.viewMap=new Map}loadModule(t){
return new Promise((r,n)=>{e([t],e=>{r(e)},e=>{n(e)})})}start(){
return Promise.all(this.panels.map(({module:e,view:t,type:r})=>this.loadModule(e).then(e=>({
module:e,view:t,type:r||"es6"})))).then(e=>(e.forEach(e=>{
this.viewMap.set(e.view,e)}),this))}selectView(e){return this.viewMap.get(e)}
unmount(){return this.currentPanel?function(e){return new Promise((t,r)=>{try{
return t(e())}catch(n){r(n)}})
}(()=>this.currentPanel.widget.stop()).then(()=>this.currentPanel.widget.detach()):Promise.resolve()
}dispatch({view:e,path:t,params:r}){const n=this.selectView(e)
;return n&&n.module?this.currentPanel&&this.currentPanel.view===n?this.currentPanel.widget.run(r):this.unmount().then(()=>{
let e;switch(n.type){case"factory":e=n.module.make({runtime:this.runtime});break
;case"es6":e=new n.module({runtime:this.runtime});break;default:
throw new Error("Invalid view type: "+n.type)}return this.currentPanel={view:n,
widget:e},this.currentPanel.widget.attach(this.hostNode)
}).then(()=>this.currentPanel.widget.start(r)).catch(e=>{
console.error("ERROR",e)
}):(console.warn("bad view request",e,t,r),void alert("oops, bad view request: "+n))
}}});