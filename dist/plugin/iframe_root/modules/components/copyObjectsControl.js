define(["knockout","kb_knockout/registry","kb_lib/html","./dialogs/copyObjects"],(function(e,t,o,n){
"use strict";var c=o.tag,l=c("button"),s=c("span"),i=c("div");function a(t){
var o=e.pureComputed((function(){
return t.selectedObjects().length>0?"Click me to open a window allowing you to copy the objects you have selected":"When you have selected objects (via the checkbox to the left of them), clicking me will allow you to copy them"
}));return{doCopyObjects:function(){t.overlayComponent({name:n.name(),
viewModel:{objectsToCopy:t.selectedObjects}})},
selectedObjects:t.selectedObjects,buttonTitle:o}}function r(){return i({style:{
textAlign:"center"}},l({class:"btn",dataBind:{click:"doCopyObjects",
enable:"selectedObjects().length > 0",
class:'selectedObjects().length === 0 ? "btn-default" : "btn-primary"',attr:{
title:"buttonTitle"}}},[s({class:"fa fa-clone",style:{marginRight:"6px"}
}),"Copy Selected..."]))}return t.registerComponent((function(){return{
viewModel:a,template:r()}}))}));