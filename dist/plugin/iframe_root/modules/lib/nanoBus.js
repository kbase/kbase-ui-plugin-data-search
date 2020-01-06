define([],(function(){"use strict";return{make:function(){var n=[],o={}
;function t(){0!==n.length&&window.requestAnimationFrame((function(){
!function(){var t=n;n=[],t.forEach((function(n){var t=o[n.id]
;t&&t.forEach((function(o){try{o(n.payload)}catch(t){
console.error("Error processing message: "+t.message,t)}}))}))
}(),n.length>0&&t()}))}return{start:function(){},stop:function(){},
send:function(o,r){n.push({id:o,payload:r}),t()},on:function(n,t){
o[n]||(o[n]=[]),o[n].push(t)}}}}}));