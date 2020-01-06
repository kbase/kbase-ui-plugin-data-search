/*!
 * Knockout Mapping plugin v2.6.0
 * (c) 2013 Steven Sanderson, Roy Jacobs - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!function(e){"use strict"
;if("function"==typeof require&&"object"==typeof exports&&"object"==typeof module)e(require("knockout"),exports);else if("function"==typeof define&&define.amd)define(["knockout","exports"],e);else{
if("undefined"==typeof ko)throw new Error("Knockout is required, please ensure it is loaded before loading this mapping plug-in")
;e(ko,ko.mapping={})}}((function(e,r){"use strict";e.mapping=r
;var t,n,a=e.dependentObservable,i=0,o=["create","update","key","arrayChanged"],u={},s={
include:["_destroy"],ignore:[],copy:[],observe:[]},p=s;function l(){
for(var e,r,t,n=arguments,a=n.length,i={},o=[];a--;)for(e=(t=n[a]).length;e--;)i[r=t[e]]||(i[r]=1,
o.push(r));return o}function f(e,t){var n
;for(var a in t)if(t.hasOwnProperty(a)&&t[a])if(n=r.getType(e[a]),
a&&e[a]&&"array"!==n&&"string"!==n)f(e[a],t[a]);else{
var i="array"===r.getType(e[a])&&"array"===r.getType(t[a])
;e[a]=i?l(e[a],t[a]):t[a]}}function c(e,r){var t={};return f(t,e),f(t,r),t}
function v(e,r){for(var t=c({},e),n=o.length-1;n>=0;n--){var a=o[n]
;t[a]&&(t[""]instanceof Object||(t[""]={}),t[""][a]=t[a],delete t[a])}
return r&&(t.ignore=d(r.ignore,t.ignore),
t.include=d(r.include,t.include),t.copy=d(r.copy,t.copy),
t.observe=d(r.observe,t.observe)),
t.ignore=d(t.ignore,p.ignore),t.include=d(t.include,p.include),
t.copy=d(t.copy,p.copy),
t.observe=d(t.observe,p.observe),t.mappedProperties=t.mappedProperties||{},
t.copiedProperties=t.copiedProperties||{},t}function d(t,n){
return void 0===t?t=[]:"array"!==r.getType(t)&&(t=[t]),
void 0===n?n=[]:"array"!==r.getType(n)&&(n=[n]),
e.utils.arrayGetDistinctValues(t.concat(n))}function b(i,o,s,p,l,f,v){
var d="array"===r.getType(e.utils.unwrapObservable(o))
;if(f=f||"",r.isMapped(i)){var g=e.utils.unwrapObservable(i).__ko_mapping__
;s=c(g,s)}var k={data:o,parent:v||l},T=function(){
return s[p]&&s[p].create instanceof Function},x=function(r){
return function(r,t){var n=e.dependentObservable
;e.dependentObservable=function(t,n,i){i=i||{},t&&"object"==typeof t&&(i=t)
;var o=i.deferEvaluation,u=i.pure,s=!1;i.deferEvaluation=!0;var p=a(t,n,i)
;return o||u||(p=function(t){var n=e.dependentObservable;e.dependentObservable=a
;var i=e.isWriteableObservable(t);e.dependentObservable=n;var o=a({
read:function(){
return s||(e.utils.arrayRemoveItem(r,t),s=!0),t.apply(t,arguments)},
write:i&&function(e){return t(e)},deferEvaluation:!0})
;return o._wrapper=!0,o.__DO=t,o}(p),r.push(p)),p
},e.dependentObservable.fn=a.fn,e.computed=e.dependentObservable;var i=t()
;return e.dependentObservable=n,e.computed=e.dependentObservable,i
}(t,(function(){return e.utils.unwrapObservable(l)instanceof Array?s[p].create({
data:r||k.data,parent:k.parent,skip:u}):s[p].create({data:r||k.data,
parent:k.parent})}))},j=function(){return s[p]&&s[p].update instanceof Function
},I=function(r,t){var n={data:t||k.data,parent:k.parent,
target:e.utils.unwrapObservable(r)}
;return e.isWriteableObservable(r)&&(n.observable=r),s[p].update(n)},E=n.get(o)
;if(E)return E;if(p=p||"",d){var P=[],J=!1,W=function(e){return e}
;s[p]&&s[p].key&&(W=s[p].key,
J=!0),e.isObservable(i)||((i=e.observableArray([])).mappedRemove=function(e){
var r="function"==typeof e?e:function(r){return r===W(e)}
;return i.remove((function(e){return r(W(e))}))},i.mappedRemoveAll=function(r){
var t=h(r,W);return i.remove((function(r){
return-1!==e.utils.arrayIndexOf(t,W(r))}))},i.mappedDestroy=function(e){
var r="function"==typeof e?e:function(r){return r===W(e)}
;return i.destroy((function(e){return r(W(e))}))
},i.mappedDestroyAll=function(r){var t=h(r,W);return i.destroy((function(r){
return-1!==e.utils.arrayIndexOf(t,W(r))}))},i.mappedIndexOf=function(r){
var t=h(i(),W),n=W(r);return e.utils.arrayIndexOf(t,n)},i.mappedGet=function(e){
return i()[i.mappedIndexOf(e)]},i.mappedCreate=function(r){
if(-1!==i.mappedIndexOf(r))throw new Error("There already is an object with the key that you specified.")
;var t=T()?x(r):r;if(j()){var n=I(t,r);e.isWriteableObservable(t)?t(n):t=n}
return i.push(t),t});var D=h(e.utils.unwrapObservable(i),W).sort(),S=h(o,W)
;J&&S.sort()
;var A,N,M,C=e.utils.compareArrays(D,S),q={},F=e.utils.unwrapObservable(o),R={},$=!0
;for(A=0,N=F.length;A<N;A++){if(void 0===(M=W(F[A]))||M instanceof Object){$=!1
;break}R[M]=F[A]}var G,K,V=[],z=0;for(A=0,N=C.length;A<N;A++){var B;M=C[A]
;var H=f+"["+_(A)+"]";switch(M.status){case"added":
B=b(void 0,G=$?R[M.value]:O(e.utils.unwrapObservable(o),M.value,W),s,p,i,H,l),
T()||(B=e.utils.unwrapObservable(B)),
K=y(e.utils.unwrapObservable(o),G,q),B===u?z++:V[K-z]=B,q[K]=!0;break
;case"retained":
G=$?R[M.value]:O(e.utils.unwrapObservable(o),M.value,W),b(B=O(i,M.value,W),G,s,p,i,H,l),
V[K=y(e.utils.unwrapObservable(o),G,q)]=B,q[K]=!0;break;case"deleted":
B=O(i,M.value,W)}P.push({event:M.status,item:B})}
i(V),s[p]&&s[p].arrayChanged&&e.utils.arrayForEach(P,(function(e){
s[p].arrayChanged(e.event,e.item)}))}else if(m(o)){
if(!(i=e.utils.unwrapObservable(i))){if(T()){var L=x();return j()&&(L=I(L)),L}
if(j())return I();i={}}if(j()&&(i=I(i)),n.save(o,i),j())return i
;w(o,(function(t){var a=f.length?f+"."+_(t):_(t)
;if(-1===e.utils.arrayIndexOf(s.ignore,a))if(-1===e.utils.arrayIndexOf(s.copy,a)){
if("object"!=typeof o[t]&&"array"!==r.getType(o[t])&&s.observe.length>0&&-1===e.utils.arrayIndexOf(s.observe,a))return i[t]=o[t],
void(s.copiedProperties[a]=!0);var u=n.get(o[t]),p=b(i[t],o[t],s,t,i,a,i),l=u||p
;if(s.observe.length>0&&-1===e.utils.arrayIndexOf(s.observe,a))return i[t]=e.utils.unwrapObservable(l),
void(s.copiedProperties[a]=!0)
;e.isWriteableObservable(i[t])?(l=e.utils.unwrapObservable(l),
i[t]()!==l&&i[t](l)):(l=void 0===i[t]?l:e.utils.unwrapObservable(l),
i[t]=l),s.mappedProperties[a]=!0}else i[t]=o[t]}))}else switch(r.getType(o)){
case"function":j()?e.isWriteableObservable(o)?(o(I(o)),i=o):i=I(o):i=o;break
;default:var Q
;if(e.isWriteableObservable(i))return j()?(Q=I(i),i(Q),Q):(Q=e.utils.unwrapObservable(o),
i(Q),Q);var U=T()||j()
;if(i=T()?x():e.observable(e.utils.unwrapObservable(o)),j()&&i(I(i)),U)return i}
return i}function y(e,r,t){
for(var n=0,a=e.length;n<a;n++)if(!0!==t[n]&&e[n]===r)return n;return null}
function g(t,n){var a
;return n&&(a=n(t)),"undefined"===r.getType(a)&&(a=t),e.utils.unwrapObservable(a)
}function O(r,t,n){
for(var a=0,i=(r=e.utils.unwrapObservable(r)).length;a<i;a++){var o=r[a]
;if(g(o,n)===t)return o}
throw new Error("When calling ko.update*, the key '"+t+"' was not found!")}
function h(r,t){
return e.utils.arrayMap(e.utils.unwrapObservable(r),(function(e){
return t?g(e,t):e}))}function w(e,t){
if("array"===r.getType(e))for(var n=0;n<e.length;n++)t(n);else for(var a in e)e.hasOwnProperty(a)&&t(a)
}function m(e){if(null===e)return!1;var t=r.getType(e)
;return"object"===t||"array"===t}function _(e){
return(""+e).replace(/~/g,"~~").replace(/\[/g,"~[").replace(/]/g,"~]").replace(/\./g,"~.")
}function k(){var r=[],t=[];this.save=function(n,a){
var i=e.utils.arrayIndexOf(r,n);i>=0?t[i]=a:(r.push(n),t.push(a))
},this.get=function(n){var a=e.utils.arrayIndexOf(r,n);return a>=0?t[a]:void 0}}
function T(){var e={},r=function(r){var t;try{t=r}catch(a){t="$$$"}var n=e[t]
;return e.hasOwnProperty(t)||(n=new k,e[t]=n),n};this.save=function(e,t){
r(e).save(e,t)},this.get=function(e){return r(e).get(e)}}r.isMapped=function(r){
var t=e.utils.unwrapObservable(r);return t&&t.__ko_mapping__
},r.fromJS=function(e){
if(0===arguments.length)throw new Error("When calling ko.fromJS, pass the object you want to convert.")
;try{var r,a
;i||(t=[],n=new T),i++,2===arguments.length&&(arguments[1].__ko_mapping__?a=arguments[1]:r=arguments[1]),
3===arguments.length&&(r=arguments[1],
a=arguments[2]),a&&(r=c(r,a.__ko_mapping__));var o=b(a,e,r=v(r))
;if(a&&(o=a),!--i)for(;t.length;){var u=t.pop()
;u&&(u(),u.__DO.throttleEvaluation=u.throttleEvaluation)}
return o.__ko_mapping__=c(o.__ko_mapping__,r),o}catch(s){throw i=0,s}
},r.fromJSON=function(t){var n=Array.prototype.slice.call(arguments,0)
;return n[0]=e.utils.parseJson(t),r.fromJS.apply(this,n)},r.toJS=function(t,n){
if(p||r.resetDefaultOptions(),
0===arguments.length)throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.")
;if("array"!==r.getType(p.ignore))throw new Error("ko.mapping.defaultOptions().ignore should be an array.")
;if("array"!==r.getType(p.include))throw new Error("ko.mapping.defaultOptions().include should be an array.")
;if("array"!==r.getType(p.copy))throw new Error("ko.mapping.defaultOptions().copy should be an array.")
;return n=v(n,t.__ko_mapping__),r.visitModel(t,(function(r){
return e.utils.unwrapObservable(r)}),n)},r.toJSON=function(t,n,a,i){
var o=r.toJS(t,n);return e.utils.stringifyJson(o,a,i)
},r.defaultOptions=function(){if(!(arguments.length>0))return p;p=arguments[0]},
r.resetDefaultOptions=function(){p={include:s.include.slice(0),
ignore:s.ignore.slice(0),copy:s.copy.slice(0),observe:s.observe.slice(0)}
},r.getType=function(e){if(e&&"object"==typeof e){
if(e.constructor===Date)return"date";if(e.constructor===Array)return"array"}
return typeof e},r.visitModel=function(t,n,a){var i
;(a=a||{}).visitedObjects=a.visitedObjects||new T
;var o=e.utils.unwrapObservable(t);if(!m(o))return n(t,a.parentName)
;a=v(a,o.__ko_mapping__),
n(t,a.parentName),i="array"===r.getType(o)?[]:{},a.visitedObjects.save(t,i)
;var u=a.parentName;return w(o,(function(t){var s=_(t)
;if(!a.ignore||-1===e.utils.arrayIndexOf(a.ignore,s)){var p=o[t]
;if(a.parentName=function(e,t,n){var a=e||""
;return"array"===r.getType(t)?e&&(a+="["+_(n)+"]"):(e&&(a+="."),a+=_(n)),a
}(u,o,t),
-1===e.utils.arrayIndexOf(a.copy,s)&&-1===e.utils.arrayIndexOf(a.include,s)){
var l=o.__ko_mapping__;if(l){var f=l.mappedProperties;if(f&&!f[s]){
var c=l.copiedProperties;if(c&&!c[s]&&"array"!==r.getType(o))return}}}
switch(r.getType(e.utils.unwrapObservable(p))){case"object":case"array":
case"undefined":var v=a.visitedObjects.get(p)
;i[t]="undefined"!==r.getType(v)?v:r.visitModel(p,n,a);break;default:
i[t]=n(p,a.parentName)}}})),i}}));