define([],(function(){"use strict";return function(n){
var e=n.element,t=n.onUpdate,i=n.rateLimit||200,o=null;function r(){
return e.clientHeight}function u(){o||(o=window.setTimeout((function(){
o=null,t(r())}),i))}return{start:function(){
t(r()),window.addEventListener("resize",u,!1)},stop:function(){
o&&window.clearTimeout(o),window.removeEventListener("resize",u,!1)}}}}));