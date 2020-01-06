define(["kb_knockout/registry","kb_lib/html","kb_lib/htmlBuilders"],(function(n,t,r){
"use strict";var i=t.tag,o=i("span"),e=i("div");function u(){return{
funnyPrompt:function(){
var n=["Hunting for data","Looking for stuff","Searching for matching objects","Querying for information","Probing for interesting things"]
;return n[Math.floor(Math.random()*n.length)]}()}}function a(){var n=o({
dataBind:{text:"funnyPrompt"}});return e([r.loading(n)])}
return n.registerComponent((function(){return{viewModel:u,template:a()}}))}));