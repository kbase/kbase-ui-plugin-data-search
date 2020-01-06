/**
 * @license SWITCH/CASE binding for Knockout http://knockoutjs.com/
 * (c) Michael Best
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 * Version 2.1.0
 */
!function(e,i){
"function"==typeof define&&define.amd?define(["knockout"],i):i(e.ko)
}(this,(function(e){
if(!e.virtualElements)throw Error("Switch-case requires at least Knockout 2.1")
;var i=e.virtualElements,n=e.bindingFlags||{},t=e.bindingRewriteValidators||e.jsonExpressionRewriting.bindingRewriteValidators,s=e.utils.unwrapObservable,a=e.bindingHandlers,r={}
;function o(i,n){var t=s(n.$switchValueAccessor())
;return"boolean"==typeof t?i?t:!t:"boolean"==typeof i?i:i instanceof Array?-1!==e.utils.arrayIndexOf(i,t):i==t
}function c(e,i){return!o(e,i)}function u(e){return function(){return e}}
function l(i,n,t){var r=n?c:o;return i||(i="if"),t||(t=u),{flags:a[i].flags,
init:function(n,o,c,u,l){
if(!l.$switchSkipNextArray)throw Error("case binding must only be used with a switch binding")
;if(void 0!==l.$switchIndex)throw Error("case binding cannot be nested")
;if(l.$switchIndex=l.$switchSkipNextArray.push(e.observable(!1))-1,
l.$caseValue=e.observable(),e.computed((function(){
var e,i,n,t=l.$switchIndex,a=t===l.$switchSkipNextArray.length-1
;if(t&&l.$switchSkipNextArray[t-1]())e=!1,i=!0;else{var c=s(o())
;c===l.$else?(e=l.$switchDefault()||a,i=!1):n=i=e=r(c,l)}
l.$caseValue(e),l.$switchSkipNextArray[t](i),
n?l.$switchDefault(!1):!i&&a&&l.$switchDefault(!0)}),null,{
disposeWhenNodeIsRemoved:n}),a[i].init)return a[i].init(n,t(l.$caseValue),c,u,l)
},update:function(e,n,s,r,o){
if(a[i].update)return a[i].update(e,t(o.$caseValue),s,r,o)}}}function d(e,n,t){
return i.allowedBindings[e]&&(i.allowedBindings[t]=!0),l(e,"casenot"===n)}
function f(e,i,n){return d(i,e,n)}function h(e,n){
a[e]=l("if",n),t[e]=!1,i.allowedBindings[e]=!0,
a[e].makeSubkeyHandler=f,a[e].getNamespacedHandler=d}a.switch={
flags:n.contentBind|n.canUseVirtual|n.noValue,init:function(n,t,a,o,c){var u={
$switchSkipNextArray:[],$switchValueAccessor:t,$switchDefault:e.observable(!0),
$default:r,$else:r},l=[];e.computed((function(){var i=s(t())
;u.$value=i,e.utils.arrayForEach(l,(function(e){e.$value=i}))}),null,{
disposeWhenNodeIsRemoved:n})
;for(var d,f=i.firstChild(n);d=f;)switch(f=i.nextSibling(d),d.nodeType){case 1:
case 8:var h=c.extend(u)
;h.$switchIndex=void 0,e.applyBindings(h,d),void 0!==h.$switchIndex&&l.push(h)}
return{controlsDescendantBindings:!0}},preprocess:function(e){return e||"true"}
},
t.switch=!1,i.allowedBindings.switch=!0,h("case"),h("casenot",!0),a["case.visible"]=l("visible"),
a["casenot.visible"]=l("visible",!0),a.switch.makeCaseHandler=l}));