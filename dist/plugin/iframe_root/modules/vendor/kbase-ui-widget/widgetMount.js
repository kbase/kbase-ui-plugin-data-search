define(["bluebird"],(function(n){"use strict";return{make:function(t){
return function(t){var r,e,u=t.node,o=t.runtime
;if(!u)throw new Error('Cannot create widget mount without a parent node. Pass it as "node"')
;if(!o)throw new Error("The widget mounter needs a runtime object in order to find and mount widgets.")
;function i(){return n.try((function(){var t
;return e?(e.promise.cancel(),t=e.widget,n.try((function(){
return t.stop&&t.stop()})).then((function(){return t.detach&&t.detach()
})).then((function(){r.innerHTML=""})).then((function(){
return t.destroy&&t.destroy()})).catch((function(n){
return console.error("ERROR unmounting widget"),console.error(n),null
})).finally((function(){e=null}))):null}))}function c(t,u){return(e={mountId:0,
widget:null,container:null}).promise=n.try((function(){
return o.service("widget").makeWidget(t,{})})).then((function(r){
if(!r)throw new Error("Widget could not be created: "+t)
;return e.widget=r,n.all([r,r.init&&r.init()])})).spread((function(t){
return e.container=r,n.all([t,t.attach&&t.attach(e.container)])
})).spread((function(t){return n.all([t,t.start&&t.start(u)])
})).spread((function(t){return n.all([t,t.run&&t.run(u)])
})).spread((function(n){return n})),e.promise}return r=u,{
mountWidget:function(n,t){return i().then((function(){return c(n,t)}))},mount:c,
unmount:i}}(t)}}}));