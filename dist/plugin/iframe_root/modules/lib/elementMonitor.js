define([],(function(){"use strict";return function(n){
var t,e,i=n.element,o=n.getValue,u=n.onUpdate,r=n.interval||100,c=!1
;function f(){var n=o(i);n!==t&&u(t=n)}return{start:function(){
f(),c=!0,function n(){c&&(e=window.setTimeout((function(){e&&(f(),n())}),r))}()
},stop:function(){c=!1,e&&window.clearTimeout(e)}}}}));