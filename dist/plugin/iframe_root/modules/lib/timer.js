define([],(function(){"use strict";return{make:function(){var t=[],e={};return{
start:function(n){e[n]={start:new Date,stop:null,elapsed:null},t.push(n)},
stop:function(t){var n=e[t]
;n&&(n.stop=new Date,n.elapsed=n.stop.getTime()-n.start.getTime())},
log:function(){t.forEach((function(t){
var n=e[t],o=void 0===n.elapsed?"running":n.elapsed
;console.info("timer: "+t+":"+o)}))}}}}}));