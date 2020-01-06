define([],(function(){"use strict";return{make:function(){var n=null,e=null
;return Object.freeze({started:function(){e="started"},running:function(c){
n=c,e="running"},cancel:function(){if("running"===e&&n){try{n.cancel()}catch(c){
console.error("Error canceling search",c)}e="canceled"}},finished:function(){
n=null,e="finished"},isCanceled:function(){return"canceled"===e}})}}}));