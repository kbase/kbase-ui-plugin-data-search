/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */
!function(e,t){
"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){
if(!e.document)throw new Error("jQuery requires a window with a document")
;return t(e)}:t(e)}("undefined"!=typeof window?window:this,(function(e,t){
var n=[],r=e.document,i=n.slice,o=n.concat,s=n.push,a=n.indexOf,u={},l=u.toString,c=u.hasOwnProperty,f={},p=function(e,t){
return new p.fn.init(e,t)
},d=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,h=/^-ms-/,g=/-([\da-z])/gi,v=function(e,t){
return t.toUpperCase()};function m(e){
var t=!!e&&"length"in e&&e.length,n=p.type(e)
;return"function"!==n&&!p.isWindow(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)
}p.fn=p.prototype={jquery:"2.2.4",constructor:p,selector:"",length:0,
toArray:function(){return i.call(this)},get:function(e){
return null!=e?e<0?this[e+this.length]:this[e]:i.call(this)},
pushStack:function(e){var t=p.merge(this.constructor(),e)
;return t.prevObject=this,t.context=this.context,t},each:function(e){
return p.each(this,e)},map:function(e){
return this.pushStack(p.map(this,(function(t,n){return e.call(t,n,t)})))},
slice:function(){return this.pushStack(i.apply(this,arguments))},
first:function(){return this.eq(0)},last:function(){return this.eq(-1)},
eq:function(e){var t=this.length,n=+e+(e<0?t:0)
;return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){
return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},
p.extend=p.fn.extend=function(){
var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1
;for("boolean"==typeof s&&(l=s,
s=arguments[a]||{},a++),"object"==typeof s||p.isFunction(s)||(s={}),
a===u&&(s=this,
a--);a<u;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],s!==(r=e[t])&&(l&&r&&(p.isPlainObject(r)||(i=p.isArray(r)))?(i?(i=!1,
o=n&&p.isArray(n)?n:[]):o=n&&p.isPlainObject(n)?n:{},
s[t]=p.extend(l,o,r)):void 0!==r&&(s[t]=r));return s},p.extend({
expando:"jQuery"+("2.2.4"+Math.random()).replace(/\D/g,""),isReady:!0,
error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){
return"function"===p.type(e)},isArray:Array.isArray,isWindow:function(e){
return null!=e&&e===e.window},isNumeric:function(e){var t=e&&e.toString()
;return!p.isArray(e)&&t-parseFloat(t)+1>=0},isPlainObject:function(e){var t
;if("object"!==p.type(e)||e.nodeType||p.isWindow(e))return!1
;if(e.constructor&&!c.call(e,"constructor")&&!c.call(e.constructor.prototype||{},"isPrototypeOf"))return!1
;for(t in e);return void 0===t||c.call(e,t)},isEmptyObject:function(e){var t
;for(t in e)return!1;return!0},type:function(e){
return null==e?e+"":"object"==typeof e||"function"==typeof e?u[l.call(e)]||"object":typeof e
},globalEval:function(e){var t,n=eval
;(e=p.trim(e))&&(1===e.indexOf("use strict")?((t=r.createElement("script")).text=e,
r.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){
return e.replace(h,"ms-").replace(g,v)},nodeName:function(e,t){
return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},
each:function(e,t){var n,r=0
;if(m(e))for(n=e.length;r<n&&!1!==t.call(e[r],r,e[r]);r++);else for(r in e)if(!1===t.call(e[r],r,e[r]))break
;return e},trim:function(e){return null==e?"":(e+"").replace(d,"")},
makeArray:function(e,t){var n=t||[]
;return null!=e&&(m(Object(e))?p.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),
n},inArray:function(e,t,n){return null==t?-1:a.call(t,e,n)},merge:function(e,t){
for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},
grep:function(e,t,n){
for(var r=[],i=0,o=e.length,s=!n;i<o;i++)!t(e[i],i)!==s&&r.push(e[i]);return r},
map:function(e,t,n){var r,i,s=0,a=[]
;if(m(e))for(r=e.length;s<r;s++)null!=(i=t(e[s],s,n))&&a.push(i);else for(s in e)null!=(i=t(e[s],s,n))&&a.push(i)
;return o.apply([],a)},guid:1,proxy:function(e,t){var n,r,o
;if("string"==typeof t&&(n=e[t],
t=e,e=n),p.isFunction(e))return r=i.call(arguments,2),(o=function(){
return e.apply(t||this,r.concat(i.call(arguments)))
}).guid=e.guid=e.guid||p.guid++,o},now:Date.now,support:f
}),"function"==typeof Symbol&&(p.fn[Symbol.iterator]=n[Symbol.iterator]),
p.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),(function(e,t){
u["[object "+t+"]"]=t.toLowerCase()}));var y=
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
function(e){
var t,n,r,i,o,s,a,u,l,c,f,p,d,h,g,v,m,y,x,b="sizzle"+1*new Date,w=e.document,T=0,C=0,k=ie(),E=ie(),N=ie(),S=function(e,t){
return e===t&&(f=!0),0
},j={}.hasOwnProperty,D=[],A=D.pop,q=D.push,L=D.push,H=D.slice,O=function(e,t){
for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1
},F="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M="\\["+P+"*("+R+")(?:"+P+"*([*^$|!~]?=)"+P+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+P+"*\\]",I=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",W=new RegExp(P+"+","g"),$=new RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),B=new RegExp("^"+P+"*,"+P+"*"),_=new RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),X=new RegExp("="+P+"*([^\\]'\"]*?)"+P+"*\\]","g"),z=new RegExp(I),U=new RegExp("^"+R+"$"),V={
ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),
TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+I),
CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),
bool:new RegExp("^(?:"+F+")$","i"),
needsContext:new RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")
},Y=/^(?:input|select|textarea|button)$/i,G=/^h\d$/i,Q=/^[^{]+\{\s*\[native \w/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/[+~]/,Z=/'|\\/g,ee=new RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),te=function(e,t,n){
var r="0x"+t-65536
;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)
},ne=function(){p()};try{
L.apply(D=H.call(w.childNodes),w.childNodes),D[w.childNodes.length].nodeType
}catch(be){L={apply:D.length?function(e,t){q.apply(e,H.call(t))}:function(e,t){
for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}function re(e,t,r,i){
var o,a,l,c,f,h,m,y,T=t&&t.ownerDocument,C=t?t.nodeType:9
;if(r=r||[],"string"!=typeof e||!e||1!==C&&9!==C&&11!==C)return r
;if(!i&&((t?t.ownerDocument||t:w)!==d&&p(t),t=t||d,g)){
if(11!==C&&(h=J.exec(e)))if(o=h[1]){if(9===C){
if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r
}else if(T&&(l=T.getElementById(o))&&x(t,l)&&l.id===o)return r.push(l),r}else{
if(h[2])return L.apply(r,t.getElementsByTagName(e)),r
;if((o=h[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(r,t.getElementsByClassName(o)),
r}if(n.qsa&&!N[e+" "]&&(!v||!v.test(e))){
if(1!==C)T=t,y=e;else if("object"!==t.nodeName.toLowerCase()){
for((c=t.getAttribute("id"))?c=c.replace(Z,"\\$&"):t.setAttribute("id",c=b),
a=(m=s(e)).length,f=U.test(c)?"#"+c:"[id='"+c+"']";a--;)m[a]=f+" "+he(m[a])
;y=m.join(","),T=K.test(e)&&pe(t.parentNode)||t}if(y)try{
return L.apply(r,T.querySelectorAll(y)),r}catch(k){}finally{
c===b&&t.removeAttribute("id")}}}return u(e.replace($,"$1"),t,r,i)}
function ie(){var e=[];return function t(n,i){
return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}}
function oe(e){return e[b]=!0,e}function se(e){var t=d.createElement("div");try{
return!!e(t)}catch(be){return!1}finally{
t.parentNode&&t.parentNode.removeChild(t),t=null}}function ae(e,t){
for(var n=e.split("|"),i=n.length;i--;)r.attrHandle[n[i]]=t}function ue(e,t){
var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||1<<31)-(~e.sourceIndex||1<<31)
;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}
function le(e){return function(t){
return"input"===t.nodeName.toLowerCase()&&t.type===e}}function ce(e){
return function(t){var n=t.nodeName.toLowerCase()
;return("input"===n||"button"===n)&&t.type===e}}function fe(e){
return oe((function(t){return t=+t,oe((function(n,r){
for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))}))
}))}function pe(e){return e&&void 0!==e.getElementsByTagName&&e}
for(t in n=re.support={},o=re.isXML=function(e){
var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName
},p=re.setDocument=function(e){var t,i,s=e?e.ownerDocument||e:w
;return s!==d&&9===s.nodeType&&s.documentElement?(h=(d=s).documentElement,
g=!o(d),
(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",ne,!1):i.attachEvent&&i.attachEvent("onunload",ne)),
n.attributes=se((function(e){return e.className="i",!e.getAttribute("className")
})),n.getElementsByTagName=se((function(e){
return e.appendChild(d.createComment("")),!e.getElementsByTagName("*").length
})),
n.getElementsByClassName=Q.test(d.getElementsByClassName),n.getById=se((function(e){
return h.appendChild(e).id=b,
!d.getElementsByName||!d.getElementsByName(b).length
})),n.getById?(r.find.ID=function(e,t){if(void 0!==t.getElementById&&g){
var n=t.getElementById(e);return n?[n]:[]}},r.filter.ID=function(e){
var t=e.replace(ee,te);return function(e){return e.getAttribute("id")===t}
}):(delete r.find.ID,r.filter.ID=function(e){var t=e.replace(ee,te)
;return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id")
;return n&&n.value===t}}),r.find.TAG=n.getElementsByTagName?function(e,t){
return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0
}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){
for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o
},r.find.CLASS=n.getElementsByClassName&&function(e,t){
if(void 0!==t.getElementsByClassName&&g)return t.getElementsByClassName(e)
},m=[],v=[],(n.qsa=Q.test(d.querySelectorAll))&&(se((function(e){
h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",
e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+P+"*(?:''|\"\")"),
e.querySelectorAll("[selected]").length||v.push("\\["+P+"*(?:value|"+F+")"),
e.querySelectorAll("[id~="+b+"-]").length||v.push("~="),
e.querySelectorAll(":checked").length||v.push(":checked"),
e.querySelectorAll("a#"+b+"+*").length||v.push(".#.+[+~]")})),se((function(e){
var t=d.createElement("input")
;t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),
e.querySelectorAll("[name=d]").length&&v.push("name"+P+"*[*^$|!~]?="),
e.querySelectorAll(":enabled").length||v.push(":enabled",":disabled"),
e.querySelectorAll("*,:x"),v.push(",.*:")
}))),(n.matchesSelector=Q.test(y=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&se((function(e){
n.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)
})),v=v.length&&new RegExp(v.join("|")),
m=m.length&&new RegExp(m.join("|")),t=Q.test(h.compareDocumentPosition),
x=t||Q.test(h.contains)?function(e,t){
var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode
;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))
}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1
},S=t?function(e,t){if(e===t)return f=!0,0
;var r=!e.compareDocumentPosition-!t.compareDocumentPosition
;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===d||e.ownerDocument===w&&x(w,e)?-1:t===d||t.ownerDocument===w&&x(w,t)?1:c?O(c,e)-O(c,t):0:4&r?-1:1)
}:function(e,t){if(e===t)return f=!0,0
;var n,r=0,i=e.parentNode,o=t.parentNode,s=[e],a=[t]
;if(!i||!o)return e===d?-1:t===d?1:i?-1:o?1:c?O(c,e)-O(c,t):0
;if(i===o)return ue(e,t);for(n=e;n=n.parentNode;)s.unshift(n)
;for(n=t;n=n.parentNode;)a.unshift(n);for(;s[r]===a[r];)r++
;return r?ue(s[r],a[r]):s[r]===w?-1:a[r]===w?1:0},d):d
},re.matches=function(e,t){return re(e,null,null,t)
},re.matchesSelector=function(e,t){
if((e.ownerDocument||e)!==d&&p(e),t=t.replace(X,"='$1']"),
n.matchesSelector&&g&&!N[t+" "]&&(!m||!m.test(t))&&(!v||!v.test(t)))try{
var r=y.call(e,t)
;if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r
}catch(be){}return re(t,d,null,[e]).length>0},re.contains=function(e,t){
return(e.ownerDocument||e)!==d&&p(e),x(e,t)},re.attr=function(e,t){
(e.ownerDocument||e)!==d&&p(e)
;var i=r.attrHandle[t.toLowerCase()],o=i&&j.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0
;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null
},re.error=function(e){
throw new Error("Syntax error, unrecognized expression: "+e)
},re.uniqueSort=function(e){var t,r=[],i=0,o=0
;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(S),f){
for(;t=e[o++];)t===e[o]&&(i=r.push(o));for(;i--;)e.splice(r[i],1)}return c=null,
e},i=re.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){
if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent
;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)
}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r++];)n+=i(t);return n
},(r=re.selectors={cacheLength:50,createPseudo:oe,match:V,attrHandle:{},find:{},
relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{
dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{
ATTR:function(e){
return e[1]=e[1].replace(ee,te),e[3]=(e[3]||e[4]||e[5]||"").replace(ee,te),
"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){
return e[1]=e[1].toLowerCase(),
"nth"===e[1].slice(0,3)?(e[3]||re.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),
e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&re.error(e[0]),e},PSEUDO:function(e){
var t,n=!e[6]&&e[2]
;return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&z.test(n)&&(t=s(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),
e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){
var t=e.replace(ee,te).toLowerCase();return"*"===e?function(){return!0
}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},
CLASS:function(e){var t=k[e+" "]
;return t||(t=new RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&k(e,(function(e){
return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")
}))},ATTR:function(e,t,n){return function(r){var i=re.attr(r,e)
;return null==i?"!="===t:!t||(i+="",
"="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace(W," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))
}},CHILD:function(e,t,n,r,i){
var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t
;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){
var l,c,f,p,d,h,g=o!==s?"nextSibling":"previousSibling",v=t.parentNode,m=a&&t.nodeName.toLowerCase(),y=!u&&!a,x=!1
;if(v){if(o){for(;g;){
for(p=t;p=p[g];)if(a?p.nodeName.toLowerCase()===m:1===p.nodeType)return!1
;h=g="only"===e&&!h&&"nextSibling"}return!0}
if(h=[s?v.firstChild:v.lastChild],s&&y){
for(x=(d=(l=(c=(f=(p=v)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1])&&l[2],
p=d&&v.childNodes[d];p=++d&&p&&p[g]||(x=d=0)||h.pop();)if(1===p.nodeType&&++x&&p===t){
c[e]=[T,d,x];break}
}else if(y&&(x=d=(l=(c=(f=(p=t)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1]),
!1===x)for(;(p=++d&&p&&p[g]||(x=d=0)||h.pop())&&((a?p.nodeName.toLowerCase()!==m:1!==p.nodeType)||!++x||(y&&((c=(f=p[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[T,x]),
p!==t)););return(x-=i)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){
var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||re.error("unsupported pseudo: "+e)
;return i[b]?i(t):i.length>1?(n=[e,e,"",t],
r.setFilters.hasOwnProperty(e.toLowerCase())?oe((function(e,n){
for(var r,o=i(e,t),s=o.length;s--;)e[r=O(e,o[s])]=!(n[r]=o[s])})):function(e){
return i(e,0,n)}):i}},pseudos:{not:oe((function(e){
var t=[],n=[],r=a(e.replace($,"$1"));return r[b]?oe((function(e,t,n,i){
for(var o,s=r(e,null,i,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))
})):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}})),
has:oe((function(e){return function(t){return re(e,t).length>0}})),
contains:oe((function(e){return e=e.replace(ee,te),function(t){
return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}})),lang:oe((function(e){
return U.test(e||"")||re.error("unsupported lang: "+e),
e=e.replace(ee,te).toLowerCase(),function(t){var n;do{
if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")
}while((t=t.parentNode)&&1===t.nodeType);return!1}})),target:function(t){
var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){
return e===h},focus:function(e){
return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)
},enabled:function(e){return!1===e.disabled},disabled:function(e){
return!0===e.disabled},checked:function(e){var t=e.nodeName.toLowerCase()
;return"input"===t&&!!e.checked||"option"===t&&!!e.selected},
selected:function(e){
return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},
empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1
;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){
return G.test(e.nodeName)},input:function(e){return Y.test(e.nodeName)},
button:function(e){var t=e.nodeName.toLowerCase()
;return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t
;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())
},first:fe((function(){return[0]})),last:fe((function(e,t){return[t-1]})),
eq:fe((function(e,t,n){return[n<0?n+t:n]})),even:fe((function(e,t){
for(var n=0;n<t;n+=2)e.push(n);return e})),odd:fe((function(e,t){
for(var n=1;n<t;n+=2)e.push(n);return e})),lt:fe((function(e,t,n){
for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e})),gt:fe((function(e,t,n){
for(var r=n<0?n+t:n;++r<t;)e.push(r);return e}))}}).pseudos.nth=r.pseudos.eq,{
radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=le(t);for(t in{
submit:!0,reset:!0})r.pseudos[t]=ce(t);function de(){}function he(e){
for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function ge(e,t,n){
var r=t.dir,i=n&&"parentNode"===r,o=C++;return t.first?function(t,n,o){
for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,s){
var a,u,l,c=[T,o];if(s){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,s))return!0
}else for(;t=t[r];)if(1===t.nodeType||i){
if((a=(u=(l=t[b]||(t[b]={}))[t.uniqueID]||(l[t.uniqueID]={}))[r])&&a[0]===T&&a[1]===o)return c[2]=a[2]
;if(u[r]=c,c[2]=e(t,n,s))return!0}}}function ve(e){
return e.length>1?function(t,n,r){
for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}
function me(e,t,n,r,i){
for(var o,s=[],a=0,u=e.length,l=null!=t;a<u;a++)(o=e[a])&&(n&&!n(o,r,i)||(s.push(o),
l&&t.push(a)));return s}function ye(e,t,n,r,i,o){
return r&&!r[b]&&(r=ye(r)),i&&!i[b]&&(i=ye(i,o)),oe((function(o,s,a,u){
var l,c,f,p=[],d=[],h=s.length,g=o||function(e,t,n){
for(var r=0,i=t.length;r<i;r++)re(e,t[r],n);return n
}(t||"*",a.nodeType?[a]:a,[]),v=!e||!o&&t?g:me(g,p,e,a,u),m=n?i||(o?e:h||r)?[]:s:v
;if(n&&n(v,m,a,u),
r)for(l=me(m,d),r(l,[],a,u),c=l.length;c--;)(f=l[c])&&(m[d[c]]=!(v[d[c]]=f))
;if(o){if(i||e){if(i){for(l=[],c=m.length;c--;)(f=m[c])&&l.push(v[c]=f)
;i(null,m=[],l,u)}
for(c=m.length;c--;)(f=m[c])&&(l=i?O(o,f):p[c])>-1&&(o[l]=!(s[l]=f))}
}else m=me(m===s?m.splice(h,m.length):m),i?i(null,s,m,u):L.apply(s,m)}))}
function xe(e){
for(var t,n,i,o=e.length,s=r.relative[e[0].type],a=s||r.relative[" "],u=s?1:0,c=ge((function(e){
return e===t}),a,!0),f=ge((function(e){return O(t,e)>-1
}),a,!0),p=[function(e,n,r){
var i=!s&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i
}];u<o;u++)if(n=r.relative[e[u].type])p=[ge(ve(p),n)];else{
if((n=r.filter[e[u].type].apply(null,e[u].matches))[b]){
for(i=++u;i<o&&!r.relative[e[i].type];i++);
return ye(u>1&&ve(p),u>1&&he(e.slice(0,u-1).concat({
value:" "===e[u-2].type?"*":""
})).replace($,"$1"),n,u<i&&xe(e.slice(u,i)),i<o&&xe(e=e.slice(i)),i<o&&he(e))}
p.push(n)}return ve(p)}
return de.prototype=r.filters=r.pseudos,r.setFilters=new de,
s=re.tokenize=function(e,t){var n,i,o,s,a,u,l,c=E[e+" "]
;if(c)return t?0:c.slice(0);for(a=e,u=[],l=r.preFilter;a;){
for(s in n&&!(i=B.exec(a))||(i&&(a=a.slice(i[0].length)||a),
u.push(o=[])),n=!1,(i=_.exec(a))&&(n=i.shift(),o.push({value:n,
type:i[0].replace($," ")
}),a=a.slice(n.length)),r.filter)!(i=V[s].exec(a))||l[s]&&!(i=l[s](i))||(n=i.shift(),
o.push({value:n,type:s,matches:i}),a=a.slice(n.length));if(!n)break}
return t?a.length:a?re.error(e):E(e,u).slice(0)},a=re.compile=function(e,t){
var n,i=[],o=[],a=N[e+" "];if(!a){
for(t||(t=s(e)),n=t.length;n--;)(a=xe(t[n]))[b]?i.push(a):o.push(a)
;(a=N(e,function(e,t){var n=t.length>0,i=e.length>0,o=function(o,s,a,u,c){
var f,h,v,m=0,y="0",x=o&&[],b=[],w=l,C=o||i&&r.find.TAG("*",c),k=T+=null==w?1:Math.random()||.1,E=C.length
;for(c&&(l=s===d||s||c);y!==E&&null!=(f=C[y]);y++){if(i&&f){
for(h=0,s||f.ownerDocument===d||(p(f),a=!g);v=e[h++];)if(v(f,s||d,a)){u.push(f)
;break}c&&(T=k)}n&&((f=!v&&f)&&m--,o&&x.push(f))}if(m+=y,n&&y!==m){
for(h=0;v=t[h++];)v(x,b,s,a);if(o){if(m>0)for(;y--;)x[y]||b[y]||(b[y]=A.call(u))
;b=me(b)}L.apply(u,b),c&&!o&&b.length>0&&m+t.length>1&&re.uniqueSort(u)}
return c&&(T=k,l=w),x};return n?oe(o):o}(o,i))).selector=e}return a
},u=re.select=function(e,t,i,o){
var u,l,c,f,p,d="function"==typeof e&&e,h=!o&&s(e=d.selector||e)
;if(i=i||[],1===h.length){
if((l=h[0]=h[0].slice(0)).length>2&&"ID"===(c=l[0]).type&&n.getById&&9===t.nodeType&&g&&r.relative[l[1].type]){
if(!(t=(r.find.ID(c.matches[0].replace(ee,te),t)||[])[0]))return i
;d&&(t=t.parentNode),e=e.slice(l.shift().value.length)}
for(u=V.needsContext.test(e)?0:l.length;u--&&(c=l[u],
!r.relative[f=c.type]);)if((p=r.find[f])&&(o=p(c.matches[0].replace(ee,te),K.test(l[0].type)&&pe(t.parentNode)||t))){
if(l.splice(u,1),!(e=o.length&&he(l)))return L.apply(i,o),i;break}}
return(d||a(e,h))(o,t,!g,i,!t||K.test(e)&&pe(t.parentNode)||t),i
},n.sortStable=b.split("").sort(S).join("")===b,
n.detectDuplicates=!!f,p(),n.sortDetached=se((function(e){
return 1&e.compareDocumentPosition(d.createElement("div"))})),se((function(e){
return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")
}))||ae("type|href|height|width",(function(e,t,n){
if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)
})),n.attributes&&se((function(e){
return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),
""===e.firstChild.getAttribute("value")}))||ae("value",(function(e,t,n){
if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue
})),se((function(e){return null==e.getAttribute("disabled")
}))||ae(F,(function(e,t,n){var r
;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null
})),re}(e)
;p.find=y,p.expr=y.selectors,p.expr[":"]=p.expr.pseudos,p.uniqueSort=p.unique=y.uniqueSort,
p.text=y.getText,p.isXMLDoc=y.isXML,p.contains=y.contains;var x=function(e,t,n){
for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){
if(i&&p(e).is(n))break;r.push(e)}return r},b=function(e,t){
for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n
},w=p.expr.match.needsContext,T=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,C=/^.[^:#\[\.,]*$/
;function k(e,t,n){if(p.isFunction(t))return p.grep(e,(function(e,r){
return!!t.call(e,r,e)!==n}));if(t.nodeType)return p.grep(e,(function(e){
return e===t!==n}));if("string"==typeof t){if(C.test(t))return p.filter(t,e,n)
;t=p.filter(t,e)}return p.grep(e,(function(e){return a.call(t,e)>-1!==n}))}
p.filter=function(e,t,n){var r=t[0]
;return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?p.find.matchesSelector(r,e)?[r]:[]:p.find.matches(e,p.grep(t,(function(e){
return 1===e.nodeType})))},p.fn.extend({find:function(e){
var t,n=this.length,r=[],i=this
;if("string"!=typeof e)return this.pushStack(p(e).filter((function(){
for(t=0;t<n;t++)if(p.contains(i[t],this))return!0})))
;for(t=0;t<n;t++)p.find(e,i[t],r)
;return(r=this.pushStack(n>1?p.unique(r):r)).selector=this.selector?this.selector+" "+e:e,
r},filter:function(e){return this.pushStack(k(this,e||[],!1))},not:function(e){
return this.pushStack(k(this,e||[],!0))},is:function(e){
return!!k(this,"string"==typeof e&&w.test(e)?p(e):e||[],!1).length}})
;var E,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;(p.fn.init=function(e,t,n){
var i,o;if(!e)return this;if(n=n||E,"string"==typeof e){
if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:N.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e)
;if(i[1]){
if(t=t instanceof p?t[0]:t,p.merge(this,p.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:r,!0)),
T.test(i[1])&&p.isPlainObject(t))for(i in t)p.isFunction(this[i])?this[i](t[i]):this.attr(i,t[i])
;return this}
return(o=r.getElementById(i[2]))&&o.parentNode&&(this.length=1,this[0]=o),
this.context=r,this.selector=e,this}
return e.nodeType?(this.context=this[0]=e,this.length=1,
this):p.isFunction(e)?void 0!==n.ready?n.ready(e):e(p):(void 0!==e.selector&&(this.selector=e.selector,
this.context=e.context),p.makeArray(e,this))}).prototype=p.fn,E=p(r)
;var S=/^(?:parents|prev(?:Until|All))/,j={children:!0,contents:!0,next:!0,
prev:!0};function D(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}p.fn.extend({
has:function(e){var t=p(e,this),n=t.length;return this.filter((function(){
for(var e=0;e<n;e++)if(p.contains(this,t[e]))return!0}))},closest:function(e,t){
for(var n,r=0,i=this.length,o=[],s=w.test(e)||"string"!=typeof e?p(e,t||this.context):0;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&p.find.matchesSelector(n,e))){
o.push(n);break}return this.pushStack(o.length>1?p.uniqueSort(o):o)},
index:function(e){
return e?"string"==typeof e?a.call(p(e),this[0]):a.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1
},add:function(e,t){
return this.pushStack(p.uniqueSort(p.merge(this.get(),p(e,t))))},
addBack:function(e){
return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),p.each({
parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},
parents:function(e){return x(e,"parentNode")},parentsUntil:function(e,t,n){
return x(e,"parentNode",n)},next:function(e){return D(e,"nextSibling")},
prev:function(e){return D(e,"previousSibling")},nextAll:function(e){
return x(e,"nextSibling")},prevAll:function(e){return x(e,"previousSibling")},
nextUntil:function(e,t,n){return x(e,"nextSibling",n)},
prevUntil:function(e,t,n){return x(e,"previousSibling",n)},siblings:function(e){
return b((e.parentNode||{}).firstChild,e)},children:function(e){
return b(e.firstChild)},contents:function(e){
return e.contentDocument||p.merge([],e.childNodes)}},(function(e,t){
p.fn[e]=function(n,r){var i=p.map(this,t,n)
;return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=p.filter(r,i)),
this.length>1&&(j[e]||p.uniqueSort(i),S.test(e)&&i.reverse()),this.pushStack(i)}
}));var A,q=/\S+/g;function L(){
r.removeEventListener("DOMContentLoaded",L),e.removeEventListener("load",L),
p.ready()}p.Callbacks=function(e){e="string"==typeof e?function(e){var t={}
;return p.each(e.match(q)||[],(function(e,n){t[n]=!0})),t}(e):p.extend({},e)
;var t,n,r,i,o=[],s=[],a=-1,u=function(){
for(i=e.once,r=t=!0;s.length;a=-1)for(n=s.shift();++a<o.length;)!1===o[a].apply(n[0],n[1])&&e.stopOnFalse&&(a=o.length,
n=!1);e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},l={add:function(){
return o&&(n&&!t&&(a=o.length-1,s.push(n)),function t(n){
p.each(n,(function(n,r){
p.isFunction(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&"string"!==p.type(r)&&t(r)
}))}(arguments),n&&!t&&u()),this},remove:function(){
return p.each(arguments,(function(e,t){
for(var n;(n=p.inArray(t,o,n))>-1;)o.splice(n,1),n<=a&&a--})),this},
has:function(e){return e?p.inArray(e,o)>-1:o.length>0},empty:function(){
return o&&(o=[]),this},disable:function(){return i=s=[],o=n="",this},
disabled:function(){return!o},lock:function(){return i=s=[],n||(o=n=""),this},
locked:function(){return!!i},fireWith:function(e,n){
return i||(n=[e,(n=n||[]).slice?n.slice():n],s.push(n),t||u()),this},
fire:function(){return l.fireWith(this,arguments),this},fired:function(){
return!!r}};return l},p.extend({Deferred:function(e){
var t=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],n="pending",r={
state:function(){return n},always:function(){
return i.done(arguments).fail(arguments),this},then:function(){var e=arguments
;return p.Deferred((function(n){p.each(t,(function(t,o){
var s=p.isFunction(e[t])&&e[t];i[o[1]]((function(){
var e=s&&s.apply(this,arguments)
;e&&p.isFunction(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[o[0]+"With"](this===r?n.promise():this,s?[e]:arguments)
}))})),e=null})).promise()},promise:function(e){return null!=e?p.extend(e,r):r}
},i={};return r.pipe=r.then,p.each(t,(function(e,o){var s=o[2],a=o[3]
;r[o[1]]=s.add,a&&s.add((function(){n=a
}),t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){
return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith
})),r.promise(i),e&&e.call(i,i),i},when:function(e){
var t,n,r,o=0,s=i.call(arguments),a=s.length,u=1!==a||e&&p.isFunction(e.promise)?a:0,l=1===u?e:p.Deferred(),c=function(e,n,r){
return function(o){
n[e]=this,r[e]=arguments.length>1?i.call(arguments):o,r===t?l.notifyWith(n,r):--u||l.resolveWith(n,r)
}}
;if(a>1)for(t=new Array(a),n=new Array(a),r=new Array(a);o<a;o++)s[o]&&p.isFunction(s[o].promise)?s[o].promise().progress(c(o,n,t)).done(c(o,r,s)).fail(l.reject):--u
;return u||l.resolveWith(r,s),l.promise()}}),p.fn.ready=function(e){
return p.ready.promise().done(e),this},p.extend({isReady:!1,readyWait:1,
holdReady:function(e){e?p.readyWait++:p.ready(!0)},ready:function(e){
(!0===e?--p.readyWait:p.isReady)||(p.isReady=!0,
!0!==e&&--p.readyWait>0||(A.resolveWith(r,[p]),
p.fn.triggerHandler&&(p(r).triggerHandler("ready"),p(r).off("ready"))))}
}),p.ready.promise=function(t){
return A||(A=p.Deferred(),"complete"===r.readyState||"loading"!==r.readyState&&!r.documentElement.doScroll?e.setTimeout(p.ready):(r.addEventListener("DOMContentLoaded",L),
e.addEventListener("load",L))),A.promise(t)},p.ready.promise()
;var H=function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n
;if("object"===p.type(n))for(a in i=!0,
n)H(e,t,a,n[a],!0,o,s);else if(void 0!==r&&(i=!0,
p.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){
return l.call(p(e),n)})),t))for(;a<u;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)))
;return i?e:l?t.call(e):u?t(e[0],n):o},O=function(e){
return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function F(){
this.expando=p.expando+F.uid++}F.uid=1,F.prototype={register:function(e,t){
var n=t||{}
;return e.nodeType?e[this.expando]=n:Object.defineProperty(e,this.expando,{
value:n,writable:!0,configurable:!0}),e[this.expando]},cache:function(e){
if(!O(e))return{};var t=e[this.expando]
;return t||(t={},O(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{
value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e)
;if("string"==typeof t)i[t]=n;else for(r in t)i[r]=t[r];return i},
get:function(e,t){
return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][t]},
access:function(e,t,n){var r
;return void 0===t||t&&"string"==typeof t&&void 0===n?void 0!==(r=this.get(e,t))?r:this.get(e,p.camelCase(t)):(this.set(e,t,n),
void 0!==n?n:t)},remove:function(e,t){var n,r,i,o=e[this.expando]
;if(void 0!==o){if(void 0===t)this.register(e);else{
p.isArray(t)?r=t.concat(t.map(p.camelCase)):(i=p.camelCase(t),
r=t in o?[t,i]:(r=i)in o?[r]:r.match(q)||[]),n=r.length;for(;n--;)delete o[r[n]]
}
(void 0===t||p.isEmptyObject(o))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])
}},hasData:function(e){var t=e[this.expando]
;return void 0!==t&&!p.isEmptyObject(t)}}
;var P=new F,R=new F,M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,I=/[A-Z]/g
;function W(e,t,n){var r
;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(I,"-$&").toLowerCase(),
"string"==typeof(n=e.getAttribute(r))){try{
n="true"===n||"false"!==n&&("null"===n?null:+n+""===n?+n:M.test(n)?p.parseJSON(n):n)
}catch(i){}R.set(e,t,n)}else n=void 0;return n}p.extend({hasData:function(e){
return R.hasData(e)||P.hasData(e)},data:function(e,t,n){return R.access(e,t,n)},
removeData:function(e,t){R.remove(e,t)},_data:function(e,t,n){
return P.access(e,t,n)},_removeData:function(e,t){P.remove(e,t)}}),p.fn.extend({
data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;if(void 0===e){
if(this.length&&(i=R.get(o),1===o.nodeType&&!P.get(o,"hasDataAttrs"))){
for(n=s.length;n--;)s[n]&&0===(r=s[n].name).indexOf("data-")&&(r=p.camelCase(r.slice(5)),
W(o,r,i[r]));P.set(o,"hasDataAttrs",!0)}return i}
return"object"==typeof e?this.each((function(){R.set(this,e)
})):H(this,(function(t){var n,r
;if(o&&void 0===t)return void 0!==(n=R.get(o,e)||R.get(o,e.replace(I,"-$&").toLowerCase()))?n:(r=p.camelCase(e),
void 0!==(n=R.get(o,r))?n:void 0!==(n=W(o,r,void 0))?n:void 0);r=p.camelCase(e),
this.each((function(){var n=R.get(this,r)
;R.set(this,r,t),e.indexOf("-")>-1&&void 0!==n&&R.set(this,e,t)}))
}),null,t,arguments.length>1,null,!0)},removeData:function(e){
return this.each((function(){R.remove(this,e)}))}}),p.extend({
queue:function(e,t,n){var r
;if(e)return t=(t||"fx")+"queue",r=P.get(e,t),n&&(!r||p.isArray(n)?r=P.access(e,t,p.makeArray(n)):r.push(n)),
r||[]},dequeue:function(e,t){t=t||"fx"
;var n=p.queue(e,t),r=n.length,i=n.shift(),o=p._queueHooks(e,t)
;"inprogress"===i&&(i=n.shift(),
r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,(function(){
p.dequeue(e,t)}),o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){
var n=t+"queueHooks";return P.get(e,n)||P.access(e,n,{
empty:p.Callbacks("once memory").add((function(){P.remove(e,[t+"queue",n])}))})}
}),p.fn.extend({queue:function(e,t){var n=2
;return"string"!=typeof e&&(t=e,e="fx",
n--),arguments.length<n?p.queue(this[0],e):void 0===t?this:this.each((function(){
var n=p.queue(this,e,t)
;p._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&p.dequeue(this,e)}))},
dequeue:function(e){return this.each((function(){p.dequeue(this,e)}))},
clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){
var n,r=1,i=p.Deferred(),o=this,s=this.length,a=function(){
--r||i.resolveWith(o,[o])}
;for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)(n=P.get(o[s],e+"queueHooks"))&&n.empty&&(r++,
n.empty.add(a));return a(),i.promise(t)}})
;var $=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,B=new RegExp("^(?:([+-])=|)("+$+")([a-z%]*)$","i"),_=["Top","Right","Bottom","Left"],X=function(e,t){
return e=t||e,"none"===p.css(e,"display")||!p.contains(e.ownerDocument,e)}
;function z(e,t,n,r){var i,o=1,s=20,a=r?function(){return r.cur()}:function(){
return p.css(e,t,"")
},u=a(),l=n&&n[3]||(p.cssNumber[t]?"":"px"),c=(p.cssNumber[t]||"px"!==l&&+u)&&B.exec(p.css(e,t))
;if(c&&c[3]!==l){l=l||c[3],n=n||[],c=+u||1;do{c/=o=o||".5",p.style(e,t,c+l)
}while(o!==(o=a()/u)&&1!==o&&--s)}
return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],
r&&(r.unit=l,r.start=c,r.end=i)),i}
var U=/^(?:checkbox|radio)$/i,V=/<([\w:-]+)/,Y=/^$|\/(?:java|ecma)script/i,G={
option:[1,"<select multiple='multiple'>","</select>"],
thead:[1,"<table>","</table>"],
col:[2,"<table><colgroup>","</colgroup></table>"],
tr:[2,"<table><tbody>","</tbody></table>"],
td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]}
;function Q(e,t){
var n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[]
;return void 0===t||t&&p.nodeName(e,t)?p.merge([e],n):n}function J(e,t){
for(var n=0,r=e.length;n<r;n++)P.set(e[n],"globalEval",!t||P.get(t[n],"globalEval"))
}G.optgroup=G.option,G.tbody=G.tfoot=G.colgroup=G.caption=G.thead,G.th=G.td
;var K=/<|&#?\w+;/;function Z(e,t,n,r,i){
for(var o,s,a,u,l,c,f=t.createDocumentFragment(),d=[],h=0,g=e.length;h<g;h++)if((o=e[h])||0===o)if("object"===p.type(o))p.merge(d,o.nodeType?[o]:o);else if(K.test(o)){
for(s=s||f.appendChild(t.createElement("div")),
a=(V.exec(o)||["",""])[1].toLowerCase(),
u=G[a]||G._default,s.innerHTML=u[1]+p.htmlPrefilter(o)+u[2],
c=u[0];c--;)s=s.lastChild
;p.merge(d,s.childNodes),(s=f.firstChild).textContent=""
}else d.push(t.createTextNode(o))
;for(f.textContent="",h=0;o=d[h++];)if(r&&p.inArray(o,r)>-1)i&&i.push(o);else if(l=p.contains(o.ownerDocument,o),
s=Q(f.appendChild(o),"script"),
l&&J(s),n)for(c=0;o=s[c++];)Y.test(o.type||"")&&n.push(o);return f}!function(){
var e=r.createDocumentFragment().appendChild(r.createElement("div")),t=r.createElement("input")
;t.setAttribute("type","radio"),
t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),
f.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,
e.innerHTML="<textarea>x</textarea>",
f.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}()
;var ee=/^key/,te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ne=/^([^.]*)(?:\.(.+)|)/
;function re(){return!0}function ie(){return!1}function oe(){try{
return r.activeElement}catch(e){}}function se(e,t,n,r,i,o){var s,a
;if("object"==typeof t){
for(a in"string"!=typeof n&&(r=r||n,n=void 0),t)se(e,a,n,r,t[a],o);return e}
if(null==r&&null==i?(i=n,
r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,
r=n,n=void 0)),!1===i)i=ie;else if(!i)return e
;return 1===o&&(s=i,(i=function(e){return p().off(e),s.apply(this,arguments)
}).guid=s.guid||(s.guid=p.guid++)),e.each((function(){p.event.add(this,t,i,r,n)
}))}p.event={global:{},add:function(e,t,n,r,i){
var o,s,a,u,l,c,f,d,h,g,v,m=P.get(e)
;if(m)for(n.handler&&(n=(o=n).handler,i=o.selector),
n.guid||(n.guid=p.guid++),(u=m.events)||(u=m.events={}),
(s=m.handle)||(s=m.handle=function(t){
return void 0!==p&&p.event.triggered!==t.type?p.event.dispatch.apply(e,arguments):void 0
}),
l=(t=(t||"").match(q)||[""]).length;l--;)h=v=(a=ne.exec(t[l])||[])[1],g=(a[2]||"").split(".").sort(),
h&&(f=p.event.special[h]||{},
h=(i?f.delegateType:f.bindType)||h,f=p.event.special[h]||{},c=p.extend({type:h,
origType:v,data:r,handler:n,guid:n.guid,selector:i,
needsContext:i&&p.expr.match.needsContext.test(i),namespace:g.join(".")
},o),(d=u[h])||((d=u[h]=[]).delegateCount=0,
f.setup&&!1!==f.setup.call(e,r,g,s)||e.addEventListener&&e.addEventListener(h,s)),
f.add&&(f.add.call(e,c),
c.handler.guid||(c.handler.guid=n.guid)),i?d.splice(d.delegateCount++,0,c):d.push(c),
p.event.global[h]=!0)},remove:function(e,t,n,r,i){
var o,s,a,u,l,c,f,d,h,g,v,m=P.hasData(e)&&P.get(e);if(m&&(u=m.events)){
for(l=(t=(t||"").match(q)||[""]).length;l--;)if(h=v=(a=ne.exec(t[l])||[])[1],
g=(a[2]||"").split(".").sort(),h){
for(f=p.event.special[h]||{},d=u[h=(r?f.delegateType:f.bindType)||h]||[],
a=a[2]&&new RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"),
s=o=d.length;o--;)c=d[o],
!i&&v!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(d.splice(o,1),
c.selector&&d.delegateCount--,f.remove&&f.remove.call(e,c))
;s&&!d.length&&(f.teardown&&!1!==f.teardown.call(e,g,m.handle)||p.removeEvent(e,h,m.handle),
delete u[h])}else for(h in u)p.event.remove(e,h+t[l],n,r,!0)
;p.isEmptyObject(u)&&P.remove(e,"handle events")}},dispatch:function(e){
e=p.event.fix(e)
;var t,n,r,o,s,a=[],u=i.call(arguments),l=(P.get(this,"events")||{})[e.type]||[],c=p.event.special[e.type]||{}
;if(u[0]=e,
e.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,e)){
for(a=p.event.handlers.call(this,e,l),
t=0;(o=a[t++])&&!e.isPropagationStopped();)for(e.currentTarget=o.elem,
n=0;(s=o.handlers[n++])&&!e.isImmediatePropagationStopped();)e.rnamespace&&!e.rnamespace.test(s.namespace)||(e.handleObj=s,
e.data=s.data,
void 0!==(r=((p.event.special[s.origType]||{}).handle||s.handler).apply(o.elem,u))&&!1===(e.result=r)&&(e.preventDefault(),
e.stopPropagation()))
;return c.postDispatch&&c.postDispatch.call(this,e),e.result}},
handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target
;if(a&&u.nodeType&&("click"!==e.type||isNaN(e.button)||e.button<1))for(;u!==this;u=u.parentNode||this)if(1===u.nodeType&&(!0!==u.disabled||"click"!==e.type)){
for(r=[],
n=0;n<a;n++)void 0===r[i=(o=t[n]).selector+" "]&&(r[i]=o.needsContext?p(i,this).index(u)>-1:p.find(i,this,null,[u]).length),
r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}
return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},
props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),
filter:function(e,t){
return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},
mouseHooks:{
props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter:function(e,t){var n,i,o,s=t.button
;return null==e.pageX&&null!=t.clientX&&(i=(n=e.target.ownerDocument||r).documentElement,
o=n.body,
e.pageX=t.clientX+(i&&i.scrollLeft||o&&o.scrollLeft||0)-(i&&i.clientLeft||o&&o.clientLeft||0),
e.pageY=t.clientY+(i&&i.scrollTop||o&&o.scrollTop||0)-(i&&i.clientTop||o&&o.clientTop||0)),
e.which||void 0===s||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){
if(e[p.expando])return e;var t,n,i,o=e.type,s=e,a=this.fixHooks[o]
;for(a||(this.fixHooks[o]=a=te.test(o)?this.mouseHooks:ee.test(o)?this.keyHooks:{}),
i=a.props?this.props.concat(a.props):this.props,
e=new p.Event(s),t=i.length;t--;)e[n=i[t]]=s[n]
;return e.target||(e.target=r),3===e.target.nodeType&&(e.target=e.target.parentNode),
a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){
if(this!==oe()&&this.focus)return this.focus(),!1},delegateType:"focusin"},
blur:{trigger:function(){if(this===oe()&&this.blur)return this.blur(),!1},
delegateType:"focusout"},click:{trigger:function(){
if("checkbox"===this.type&&this.click&&p.nodeName(this,"input"))return this.click(),
!1},_default:function(e){return p.nodeName(e.target,"a")}},beforeunload:{
postDispatch:function(e){
void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}
},p.removeEvent=function(e,t,n){
e.removeEventListener&&e.removeEventListener(t,n)},p.Event=function(e,t){
if(!(this instanceof p.Event))return new p.Event(e,t)
;e&&e.type?(this.originalEvent=e,
this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?re:ie):this.type=e,
t&&p.extend(this,t),this.timeStamp=e&&e.timeStamp||p.now(),this[p.expando]=!0
},p.Event.prototype={constructor:p.Event,isDefaultPrevented:ie,
isPropagationStopped:ie,isImmediatePropagationStopped:ie,isSimulated:!1,
preventDefault:function(){var e=this.originalEvent
;this.isDefaultPrevented=re,e&&!this.isSimulated&&e.preventDefault()},
stopPropagation:function(){var e=this.originalEvent
;this.isPropagationStopped=re,e&&!this.isSimulated&&e.stopPropagation()},
stopImmediatePropagation:function(){var e=this.originalEvent
;this.isImmediatePropagationStopped=re,
e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}
},p.each({mouseenter:"mouseover",mouseleave:"mouseout",
pointerenter:"pointerover",pointerleave:"pointerout"},(function(e,t){
p.event.special[e]={delegateType:t,bindType:t,handle:function(e){
var n,r=this,i=e.relatedTarget,o=e.handleObj
;return i&&(i===r||p.contains(r,i))||(e.type=o.origType,
n=o.handler.apply(this,arguments),e.type=t),n}}})),p.fn.extend({
on:function(e,t,n,r){return se(this,e,t,n,r)},one:function(e,t,n,r){
return se(this,e,t,n,r,1)},off:function(e,t,n){var r,i
;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,
p(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),
this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}
return!1!==t&&"function"!=typeof t||(n=t,
t=void 0),!1===n&&(n=ie),this.each((function(){p.event.remove(this,e,n,t)}))}})
;var ae=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,ue=/<script|<style|<link/i,le=/checked\s*(?:[^=]|=\s*.checked.)/i,ce=/^true\/(.*)/,fe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
;function pe(e,t){
return p.nodeName(e,"table")&&p.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e
}function de(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}
function he(e){var t=ce.exec(e.type)
;return t?e.type=t[1]:e.removeAttribute("type"),e}function ge(e,t){
var n,r,i,o,s,a,u,l;if(1===t.nodeType){
if(P.hasData(e)&&(o=P.access(e),s=P.set(t,o),
l=o.events))for(i in delete s.handle,
s.events={},l)for(n=0,r=l[i].length;n<r;n++)p.event.add(t,i,l[i][n])
;R.hasData(e)&&(a=R.access(e),u=p.extend({},a),R.set(t,u))}}function ve(e,t){
var n=t.nodeName.toLowerCase()
;"input"===n&&U.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)
}function me(e,t,n,r){t=o.apply([],t)
;var i,s,a,u,l,c,d=0,h=e.length,g=h-1,v=t[0],m=p.isFunction(v)
;if(m||h>1&&"string"==typeof v&&!f.checkClone&&le.test(v))return e.each((function(i){
var o=e.eq(i);m&&(t[0]=v.call(this,i,o.html())),me(o,t,n,r)}))
;if(h&&(s=(i=Z(t,e[0].ownerDocument,!1,e,r)).firstChild,
1===i.childNodes.length&&(i=s),s||r)){
for(u=(a=p.map(Q(i,"script"),de)).length;d<h;d++)l=i,d!==g&&(l=p.clone(l,!0,!0),
u&&p.merge(a,Q(l,"script"))),n.call(e[d],l,d)
;if(u)for(c=a[a.length-1].ownerDocument,
p.map(a,he),d=0;d<u;d++)l=a[d],Y.test(l.type||"")&&!P.access(l,"globalEval")&&p.contains(c,l)&&(l.src?p._evalUrl&&p._evalUrl(l.src):p.globalEval(l.textContent.replace(fe,"")))
}return e}function ye(e,t,n){
for(var r,i=t?p.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||p.cleanData(Q(r)),
r.parentNode&&(n&&p.contains(r.ownerDocument,r)&&J(Q(r,"script")),
r.parentNode.removeChild(r));return e}p.extend({htmlPrefilter:function(e){
return e.replace(ae,"<$1></$2>")},clone:function(e,t,n){
var r,i,o,s,a=e.cloneNode(!0),u=p.contains(e.ownerDocument,e)
;if(!(f.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||p.isXMLDoc(e)))for(s=Q(a),
r=0,i=(o=Q(e)).length;r<i;r++)ve(o[r],s[r])
;if(t)if(n)for(o=o||Q(e),s=s||Q(a),r=0,
i=o.length;r<i;r++)ge(o[r],s[r]);else ge(e,a)
;return(s=Q(a,"script")).length>0&&J(s,!u&&Q(e,"script")),a},
cleanData:function(e){
for(var t,n,r,i=p.event.special,o=0;void 0!==(n=e[o]);o++)if(O(n)){
if(t=n[P.expando]){
if(t.events)for(r in t.events)i[r]?p.event.remove(n,r):p.removeEvent(n,r,t.handle)
;n[P.expando]=void 0}n[R.expando]&&(n[R.expando]=void 0)}}}),p.fn.extend({
domManip:me,detach:function(e){return ye(this,e,!0)},remove:function(e){
return ye(this,e)},text:function(e){return H(this,(function(e){
return void 0===e?p.text(this):this.empty().each((function(){
1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)
}))}),null,e,arguments.length)},append:function(){
return me(this,arguments,(function(e){
1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||pe(this,e).appendChild(e)
}))},prepend:function(){return me(this,arguments,(function(e){
if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pe(this,e)
;t.insertBefore(e,t.firstChild)}}))},before:function(){
return me(this,arguments,(function(e){
this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){
return me(this,arguments,(function(e){
this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},
empty:function(){
for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(p.cleanData(Q(e,!1)),
e.textContent="");return this},clone:function(e,t){
return e=null!=e&&e,t=null==t?e:t,this.map((function(){return p.clone(this,e,t)
}))},html:function(e){return H(this,(function(e){
var t=this[0]||{},n=0,r=this.length
;if(void 0===e&&1===t.nodeType)return t.innerHTML
;if("string"==typeof e&&!ue.test(e)&&!G[(V.exec(e)||["",""])[1].toLowerCase()]){
e=p.htmlPrefilter(e);try{
for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(p.cleanData(Q(t,!1)),t.innerHTML=e)
;t=0}catch(i){}}t&&this.empty().append(e)}),null,e,arguments.length)},
replaceWith:function(){var e=[];return me(this,arguments,(function(t){
var n=this.parentNode
;p.inArray(this,e)<0&&(p.cleanData(Q(this)),n&&n.replaceChild(t,this))}),e)}
}),p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",
insertAfter:"after",replaceAll:"replaceWith"},(function(e,t){
p.fn[e]=function(e){
for(var n,r=[],i=p(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),
p(i[a])[t](n),s.apply(r,n.get());return this.pushStack(r)}}));var xe,be={
HTML:"block",BODY:"block"};function we(e,t){
var n=p(t.createElement(e)).appendTo(t.body),r=p.css(n[0],"display")
;return n.detach(),r}function Te(e){var t=r,n=be[e]
;return n||("none"!==(n=we(e,t))&&n||((t=(xe=(xe||p("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(),
t.close(),n=we(e,t),xe.detach()),be[e]=n),n}
var Ce=/^margin/,ke=new RegExp("^("+$+")(?!px)[a-z%]+$","i"),Ee=function(t){
var n=t.ownerDocument.defaultView
;return n&&n.opener||(n=e),n.getComputedStyle(t)},Ne=function(e,t,n,r){
var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o]
;for(o in i=n.apply(e,r||[]),t)e.style[o]=s[o];return i},Se=r.documentElement
;function je(e,t,n){var r,i,o,s,a=e.style
;return""!==(s=(n=n||Ee(e))?n.getPropertyValue(t)||n[t]:void 0)&&void 0!==s||p.contains(e.ownerDocument,e)||(s=p.style(e,t)),
n&&!f.pixelMarginRight()&&ke.test(s)&&Ce.test(t)&&(r=a.width,
i=a.minWidth,o=a.maxWidth,
a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=r,a.minWidth=i,
a.maxWidth=o),void 0!==s?s+"":s}function De(e,t){return{get:function(){
if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){
var t,n,i,o,s=r.createElement("div"),a=r.createElement("div");function u(){
a.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
a.innerHTML="",Se.appendChild(s);var r=e.getComputedStyle(a)
;t="1%"!==r.top,o="2px"===r.marginLeft,
n="4px"===r.width,a.style.marginRight="50%",
i="4px"===r.marginRight,Se.removeChild(s)}
a.style&&(a.style.backgroundClip="content-box",
a.cloneNode(!0).style.backgroundClip="",
f.clearCloneStyle="content-box"===a.style.backgroundClip,
s.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
s.appendChild(a),p.extend(f,{pixelPosition:function(){return u(),t},
boxSizingReliable:function(){return null==n&&u(),n},pixelMarginRight:function(){
return null==n&&u(),i},reliableMarginLeft:function(){return null==n&&u(),o},
reliableMarginRight:function(){var t,n=a.appendChild(r.createElement("div"))
;return n.style.cssText=a.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
n.style.marginRight=n.style.width="0",
a.style.width="1px",Se.appendChild(s),t=!parseFloat(e.getComputedStyle(n).marginRight),
Se.removeChild(s),a.removeChild(n),t}}))}()
;var Ae=/^(none|table(?!-c[ea]).+)/,qe={position:"absolute",visibility:"hidden",
display:"block"},Le={letterSpacing:"0",fontWeight:"400"
},He=["Webkit","O","Moz","ms"],Oe=r.createElement("div").style;function Fe(e){
if(e in Oe)return e
;for(var t=e[0].toUpperCase()+e.slice(1),n=He.length;n--;)if((e=He[n]+t)in Oe)return e
}function Pe(e,t,n){var r=B.exec(t)
;return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Re(e,t,n,r,i){
for(var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;o<4;o+=2)"margin"===n&&(s+=p.css(e,n+_[o],!0,i)),
r?("content"===n&&(s-=p.css(e,"padding"+_[o],!0,i)),
"margin"!==n&&(s-=p.css(e,"border"+_[o]+"Width",!0,i))):(s+=p.css(e,"padding"+_[o],!0,i),
"padding"!==n&&(s+=p.css(e,"border"+_[o]+"Width",!0,i)));return s}
function Me(e,t,n){
var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Ee(e),s="border-box"===p.css(e,"boxSizing",!1,o)
;if(i<=0||null==i){
if(((i=je(e,t,o))<0||null==i)&&(i=e.style[t]),ke.test(i))return i
;r=s&&(f.boxSizingReliable()||i===e.style[t]),i=parseFloat(i)||0}
return i+Re(e,t,n||(s?"border":"content"),r,o)+"px"}function Ie(e,t){
for(var n,r,i,o=[],s=0,a=e.length;s<a;s++)(r=e[s]).style&&(o[s]=P.get(r,"olddisplay"),
n=r.style.display,
t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&X(r)&&(o[s]=P.access(r,"olddisplay",Te(r.nodeName)))):(i=X(r),
"none"===n&&i||P.set(r,"olddisplay",i?n:p.css(r,"display"))))
;for(s=0;s<a;s++)(r=e[s]).style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"))
;return e}function We(e,t,n,r,i){return new We.prototype.init(e,t,n,r,i)}
p.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=je(e,"opacity")
;return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,
fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,
order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:"cssFloat"},
style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){
var i,o,s,a=p.camelCase(t),u=e.style
;if(t=p.cssProps[a]||(p.cssProps[a]=Fe(a)||a),
s=p.cssHooks[t]||p.cssHooks[a],void 0===n)return s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:u[t]
;"string"===(o=typeof n)&&(i=B.exec(n))&&i[1]&&(n=z(e,t,i),
o="number"),null!=n&&n==n&&("number"===o&&(n+=i&&i[3]||(p.cssNumber[a]?"":"px")),
f.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),
s&&"set"in s&&void 0===(n=s.set(e,n,r))||(u[t]=n))}},css:function(e,t,n,r){
var i,o,s,a=p.camelCase(t)
;return t=p.cssProps[a]||(p.cssProps[a]=Fe(a)||a),(s=p.cssHooks[t]||p.cssHooks[a])&&"get"in s&&(i=s.get(e,!0,n)),
void 0===i&&(i=je(e,t,r)),
"normal"===i&&t in Le&&(i=Le[t]),""===n||n?(o=parseFloat(i),
!0===n||isFinite(o)?o||0:i):i}}),p.each(["height","width"],(function(e,t){
p.cssHooks[t]={get:function(e,n,r){
if(n)return Ae.test(p.css(e,"display"))&&0===e.offsetWidth?Ne(e,qe,(function(){
return Me(e,t,r)})):Me(e,t,r)},set:function(e,n,r){
var i,o=r&&Ee(e),s=r&&Re(e,t,r,"border-box"===p.css(e,"boxSizing",!1,o),o)
;return s&&(i=B.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,
n=p.css(e,t)),Pe(0,n,s)}}
})),p.cssHooks.marginLeft=De(f.reliableMarginLeft,(function(e,t){
if(t)return(parseFloat(je(e,"marginLeft"))||e.getBoundingClientRect().left-Ne(e,{
marginLeft:0},(function(){return e.getBoundingClientRect().left})))+"px"
})),p.cssHooks.marginRight=De(f.reliableMarginRight,(function(e,t){
if(t)return Ne(e,{display:"inline-block"},je,[e,"marginRight"])})),p.each({
margin:"",padding:"",border:"Width"},(function(e,t){p.cssHooks[e+t]={
expand:function(n){
for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+_[r]+t]=o[r]||o[r-2]||o[0]
;return i}},Ce.test(e)||(p.cssHooks[e+t].set=Pe)})),p.fn.extend({
css:function(e,t){return H(this,(function(e,t,n){var r,i,o={},s=0
;if(p.isArray(t)){for(r=Ee(e),i=t.length;s<i;s++)o[t[s]]=p.css(e,t[s],!1,r)
;return o}return void 0!==n?p.style(e,t,n):p.css(e,t)}),e,t,arguments.length>1)
},show:function(){return Ie(this,!0)},hide:function(){return Ie(this)},
toggle:function(e){
return"boolean"==typeof e?e?this.show():this.hide():this.each((function(){
X(this)?p(this).show():p(this).hide()}))}}),p.Tween=We,We.prototype={
constructor:We,init:function(e,t,n,r,i,o){
this.elem=e,this.prop=n,this.easing=i||p.easing._default,
this.options=t,this.start=this.now=this.cur(),
this.end=r,this.unit=o||(p.cssNumber[n]?"":"px")},cur:function(){
var e=We.propHooks[this.prop]
;return e&&e.get?e.get(this):We.propHooks._default.get(this)},run:function(e){
var t,n=We.propHooks[this.prop]
;return this.options.duration?this.pos=t=p.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,
this.now=(this.end-this.start)*t+this.start,
this.options.step&&this.options.step.call(this.elem,this.now,this),
n&&n.set?n.set(this):We.propHooks._default.set(this),this}
},We.prototype.init.prototype=We.prototype,We.propHooks={_default:{
get:function(e){var t
;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=p.css(e.elem,e.prop,""))&&"auto"!==t?t:0
},set:function(e){
p.fx.step[e.prop]?p.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[p.cssProps[e.prop]]&&!p.cssHooks[e.prop]?e.elem[e.prop]=e.now:p.style(e.elem,e.prop,e.now+e.unit)
}}},We.propHooks.scrollTop=We.propHooks.scrollLeft={set:function(e){
e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},p.easing={
linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},
_default:"swing"},p.fx=We.prototype.init,p.fx.step={}
;var $e,Be,_e=/^(?:toggle|show|hide)$/,Xe=/queueHooks$/;function ze(){
return e.setTimeout((function(){$e=void 0})),$e=p.now()}function Ue(e,t){
var n,r=0,i={height:e}
;for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=_[r])]=i["padding"+n]=e
;return t&&(i.opacity=i.width=e),i}function Ve(e,t,n){
for(var r,i=(Ye.tweeners[t]||[]).concat(Ye.tweeners["*"]),o=0,s=i.length;o<s;o++)if(r=i[o].call(n,t,e))return r
}function Ye(e,t,n){
var r,i,o=0,s=Ye.prefilters.length,a=p.Deferred().always((function(){
delete u.elem})),u=function(){if(i)return!1
;for(var t=$e||ze(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,s=l.tweens.length;o<s;o++)l.tweens[o].run(r)
;return a.notifyWith(e,[l,r,n]),r<1&&s?n:(a.resolveWith(e,[l]),!1)
},l=a.promise({elem:e,props:p.extend({},t),opts:p.extend(!0,{specialEasing:{},
easing:p.easing._default},n),originalProperties:t,originalOptions:n,
startTime:$e||ze(),duration:n.duration,tweens:[],createTween:function(t,n){
var r=p.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing)
;return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0
;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1)
;return t?(a.notifyWith(e,[l,1,0]),
a.resolveWith(e,[l,t])):a.rejectWith(e,[l,t]),this}}),c=l.props
;for(!function(e,t){var n,r,i,o,s
;for(n in e)if(i=t[r=p.camelCase(n)],o=e[n],p.isArray(o)&&(i=o[1],
o=e[n]=o[0]),n!==r&&(e[r]=o,
delete e[n]),(s=p.cssHooks[r])&&"expand"in s)for(n in o=s.expand(o),delete e[r],
o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i
}(c,l.opts.specialEasing);o<s;o++)if(r=Ye.prefilters[o].call(l,e,c,l.opts))return p.isFunction(r.stop)&&(p._queueHooks(l.elem,l.opts.queue).stop=p.proxy(r.stop,r)),
r
;return p.map(c,Ve,l),p.isFunction(l.opts.start)&&l.opts.start.call(e,l),p.fx.timer(p.extend(u,{
elem:e,anim:l,queue:l.opts.queue
})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)
}p.Animation=p.extend(Ye,{tweeners:{"*":[function(e,t){
var n=this.createTween(e,t);return z(n.elem,e,B.exec(t),n),n}]},
tweener:function(e,t){p.isFunction(e)?(t=e,e=["*"]):e=e.match(q)
;for(var n,r=0,i=e.length;r<i;r++)n=e[r],
Ye.tweeners[n]=Ye.tweeners[n]||[],Ye.tweeners[n].unshift(t)},
prefilters:[function(e,t,n){
var r,i,o,s,a,u,l,c=this,f={},d=e.style,h=e.nodeType&&X(e),g=P.get(e,"fxshow")
;for(r in n.queue||(null==(a=p._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,
u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()
}),a.unqueued++,c.always((function(){c.always((function(){
a.unqueued--,p.queue(e,"fx").length||a.empty.fire()}))
}))),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],
"inline"===("none"===(l=p.css(e,"display"))?P.get(e,"olddisplay")||Te(e.nodeName):l)&&"none"===p.css(e,"float")&&(d.display="inline-block")),
n.overflow&&(d.overflow="hidden",c.always((function(){
d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]
}))),t)if(i=t[r],_e.exec(i)){
if(delete t[r],o=o||"toggle"===i,i===(h?"hide":"show")){
if("show"!==i||!g||void 0===g[r])continue;h=!0}f[r]=g&&g[r]||p.style(e,r)
}else l=void 0
;if(p.isEmptyObject(f))"inline"===("none"===l?Te(e.nodeName):l)&&(d.display=l);else for(r in g?"hidden"in g&&(h=g.hidden):g=P.access(e,"fxshow",{}),
o&&(g.hidden=!h),h?p(e).show():c.done((function(){p(e).hide()
})),c.done((function(){var t;for(t in P.remove(e,"fxshow"),f)p.style(e,t,f[t])
})),
f)s=Ve(h?g[r]:0,r,c),r in g||(g[r]=s.start,h&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))
}],prefilter:function(e,t){t?Ye.prefilters.unshift(e):Ye.prefilters.push(e)}
}),p.speed=function(e,t,n){var r=e&&"object"==typeof e?p.extend({},e):{
complete:n||!n&&t||p.isFunction(e)&&e,duration:e,
easing:n&&t||t&&!p.isFunction(t)&&t}
;return r.duration=p.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in p.fx.speeds?p.fx.speeds[r.duration]:p.fx.speeds._default,
null!=r.queue&&!0!==r.queue||(r.queue="fx"),
r.old=r.complete,r.complete=function(){
p.isFunction(r.old)&&r.old.call(this),r.queue&&p.dequeue(this,r.queue)},r
},p.fn.extend({fadeTo:function(e,t,n,r){
return this.filter(X).css("opacity",0).show().end().animate({opacity:t},e,n,r)},
animate:function(e,t,n,r){
var i=p.isEmptyObject(e),o=p.speed(t,n,r),s=function(){
var t=Ye(this,p.extend({},e),o);(i||P.get(this,"finish"))&&t.stop(!0)}
;return s.finish=s,i||!1===o.queue?this.each(s):this.queue(o.queue,s)},
stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)}
;return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),
this.each((function(){
var t=!0,i=null!=e&&e+"queueHooks",o=p.timers,s=P.get(this)
;if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Xe.test(i)&&r(s[i])
;for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),
t=!1,o.splice(i,1));!t&&n||p.dequeue(this,e)}))},finish:function(e){
return!1!==e&&(e=e||"fx"),this.each((function(){
var t,n=P.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=p.timers,s=r?r.length:0
;for(n.finish=!0,
p.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),
o.splice(t,1));for(t=0;t<s;t++)r[t]&&r[t].finish&&r[t].finish.call(this)
;delete n.finish}))}}),p.each(["toggle","show","hide"],(function(e,t){
var n=p.fn[t];p.fn[t]=function(e,r,i){
return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(Ue(t,!0),e,r,i)
}})),p.each({slideDown:Ue("show"),slideUp:Ue("hide"),slideToggle:Ue("toggle"),
fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}
},(function(e,t){p.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}
})),p.timers=[],p.fx.tick=function(){var e,t=0,n=p.timers
;for($e=p.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1)
;n.length||p.fx.stop(),$e=void 0},p.fx.timer=function(e){
p.timers.push(e),e()?p.fx.start():p.timers.pop()
},p.fx.interval=13,p.fx.start=function(){
Be||(Be=e.setInterval(p.fx.tick,p.fx.interval))},p.fx.stop=function(){
e.clearInterval(Be),Be=null},p.fx.speeds={slow:600,fast:200,_default:400
},p.fn.delay=function(t,n){
return t=p.fx&&p.fx.speeds[t]||t,n=n||"fx",this.queue(n,(function(n,r){
var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}}))},function(){
var e=r.createElement("input"),t=r.createElement("select"),n=t.appendChild(r.createElement("option"))
;e.type="checkbox",
f.checkOn=""!==e.value,f.optSelected=n.selected,t.disabled=!0,
f.optDisabled=!n.disabled,(e=r.createElement("input")).value="t",e.type="radio",
f.radioValue="t"===e.value}();var Ge,Qe=p.expr.attrHandle;p.fn.extend({
attr:function(e,t){return H(this,p.attr,e,t,arguments.length>1)},
removeAttr:function(e){return this.each((function(){p.removeAttr(this,e)}))}
}),p.extend({attr:function(e,t,n){var r,i,o=e.nodeType
;if(3!==o&&8!==o&&2!==o)return void 0===e.getAttribute?p.prop(e,t,n):(1===o&&p.isXMLDoc(e)||(t=t.toLowerCase(),
i=p.attrHooks[t]||(p.expr.match.bool.test(t)?Ge:void 0)),
void 0!==n?null===n?void p.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),
n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=p.find.attr(e,t))?void 0:r)},
attrHooks:{type:{set:function(e,t){
if(!f.radioValue&&"radio"===t&&p.nodeName(e,"input")){var n=e.value
;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){
var n,r,i=0,o=t&&t.match(q)
;if(o&&1===e.nodeType)for(;n=o[i++];)r=p.propFix[n]||n,
p.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)}}),Ge={
set:function(e,t,n){return!1===t?p.removeAttr(e,n):e.setAttribute(n,n),n}
},p.each(p.expr.match.bool.source.match(/\w+/g),(function(e,t){
var n=Qe[t]||p.find.attr;Qe[t]=function(e,t,r){var i,o
;return r||(o=Qe[t],Qe[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,Qe[t]=o),i}}))
;var Je=/^(?:input|select|textarea|button)$/i,Ke=/^(?:a|area)$/i;p.fn.extend({
prop:function(e,t){return H(this,p.prop,e,t,arguments.length>1)},
removeProp:function(e){return this.each((function(){delete this[p.propFix[e]||e]
}))}}),p.extend({prop:function(e,t,n){var r,i,o=e.nodeType
;if(3!==o&&8!==o&&2!==o)return 1===o&&p.isXMLDoc(e)||(t=p.propFix[t]||t,
i=p.propHooks[t]),
void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]
},propHooks:{tabIndex:{get:function(e){var t=p.find.attr(e,"tabindex")
;return t?parseInt(t,10):Je.test(e.nodeName)||Ke.test(e.nodeName)&&e.href?0:-1}}
},propFix:{for:"htmlFor",class:"className"}
}),f.optSelected||(p.propHooks.selected={get:function(e){var t=e.parentNode
;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){
var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)
}
}),p.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],(function(){
p.propFix[this.toLowerCase()]=this}));var Ze=/[\t\r\n\f]/g;function et(e){
return e.getAttribute&&e.getAttribute("class")||""}p.fn.extend({
addClass:function(e){var t,n,r,i,o,s,a,u=0
;if(p.isFunction(e))return this.each((function(t){
p(this).addClass(e.call(this,t,et(this)))}))
;if("string"==typeof e&&e)for(t=e.match(q)||[];n=this[u++];)if(i=et(n),
r=1===n.nodeType&&(" "+i+" ").replace(Ze," ")){
for(s=0;o=t[s++];)r.indexOf(" "+o+" ")<0&&(r+=o+" ")
;i!==(a=p.trim(r))&&n.setAttribute("class",a)}return this},
removeClass:function(e){var t,n,r,i,o,s,a,u=0
;if(p.isFunction(e))return this.each((function(t){
p(this).removeClass(e.call(this,t,et(this)))}))
;if(!arguments.length)return this.attr("class","")
;if("string"==typeof e&&e)for(t=e.match(q)||[];n=this[u++];)if(i=et(n),
r=1===n.nodeType&&(" "+i+" ").replace(Ze," ")){
for(s=0;o=t[s++];)for(;r.indexOf(" "+o+" ")>-1;)r=r.replace(" "+o+" "," ")
;i!==(a=p.trim(r))&&n.setAttribute("class",a)}return this},
toggleClass:function(e,t){var n=typeof e
;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):p.isFunction(e)?this.each((function(n){
p(this).toggleClass(e.call(this,n,et(this),t),t)})):this.each((function(){
var t,r,i,o
;if("string"===n)for(r=0,i=p(this),o=e.match(q)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else void 0!==e&&"boolean"!==n||((t=et(this))&&P.set(this,"__className__",t),
this.setAttribute&&this.setAttribute("class",t||!1===e?"":P.get(this,"__className__")||""))
}))},hasClass:function(e){var t,n,r=0
;for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&(" "+et(n)+" ").replace(Ze," ").indexOf(t)>-1)return!0
;return!1}});var tt=/\r/g,nt=/[\x20\t\r\n\f]+/g;p.fn.extend({val:function(e){
var t,n,r,i=this[0]
;return arguments.length?(r=p.isFunction(e),this.each((function(n){var i
;1===this.nodeType&&(null==(i=r?e.call(this,n,p(this).val()):e)?i="":"number"==typeof i?i+="":p.isArray(i)&&(i=p.map(i,(function(e){
return null==e?"":e+""
}))),(t=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))
}))):i?(t=p.valHooks[i.type]||p.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(tt,""):null==n?"":n:void 0
}}),p.extend({valHooks:{option:{get:function(e){var t=p.find.attr(e,"value")
;return null!=t?t:p.trim(p.text(e)).replace(nt," ")}},select:{get:function(e){
for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||i<0,s=o?null:[],a=o?i+1:r.length,u=i<0?a:o?i:0;u<a;u++)if(((n=r[u]).selected||u===i)&&(f.optDisabled?!n.disabled:null===n.getAttribute("disabled"))&&(!n.parentNode.disabled||!p.nodeName(n.parentNode,"optgroup"))){
if(t=p(n).val(),o)return t;s.push(t)}return s},set:function(e,t){
for(var n,r,i=e.options,o=p.makeArray(t),s=i.length;s--;)((r=i[s]).selected=p.inArray(p.valHooks.option.get(r),o)>-1)&&(n=!0)
;return n||(e.selectedIndex=-1),o}}}}),p.each(["radio","checkbox"],(function(){
p.valHooks[this]={set:function(e,t){
if(p.isArray(t))return e.checked=p.inArray(p(e).val(),t)>-1}
},f.checkOn||(p.valHooks[this].get=function(e){
return null===e.getAttribute("value")?"on":e.value})}))
;var rt=/^(?:focusinfocus|focusoutblur)$/;p.extend(p.event,{
trigger:function(t,n,i,o){
var s,a,u,l,f,d,h,g=[i||r],v=c.call(t,"type")?t.type:t,m=c.call(t,"namespace")?t.namespace.split("."):[]
;if(a=u=i=i||r,
3!==i.nodeType&&8!==i.nodeType&&!rt.test(v+p.event.triggered)&&(v.indexOf(".")>-1&&(m=v.split("."),
v=m.shift(),
m.sort()),f=v.indexOf(":")<0&&"on"+v,(t=t[p.expando]?t:new p.Event(v,"object"==typeof t&&t)).isTrigger=o?2:3,
t.namespace=m.join("."),
t.rnamespace=t.namespace?new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,
t.result=void 0,
t.target||(t.target=i),n=null==n?[t]:p.makeArray(n,[t]),h=p.event.special[v]||{},
o||!h.trigger||!1!==h.trigger.apply(i,n))){if(!o&&!h.noBubble&&!p.isWindow(i)){
for(l=h.delegateType||v,
rt.test(l+v)||(a=a.parentNode);a;a=a.parentNode)g.push(a),u=a
;u===(i.ownerDocument||r)&&g.push(u.defaultView||u.parentWindow||e)}
for(s=0;(a=g[s++])&&!t.isPropagationStopped();)t.type=s>1?l:h.bindType||v,
(d=(P.get(a,"events")||{})[t.type]&&P.get(a,"handle"))&&d.apply(a,n),
(d=f&&a[f])&&d.apply&&O(a)&&(t.result=d.apply(a,n),
!1===t.result&&t.preventDefault())
;return t.type=v,o||t.isDefaultPrevented()||h._default&&!1!==h._default.apply(g.pop(),n)||!O(i)||f&&p.isFunction(i[v])&&!p.isWindow(i)&&((u=i[f])&&(i[f]=null),
p.event.triggered=v,i[v](),p.event.triggered=void 0,u&&(i[f]=u)),t.result}},
simulate:function(e,t,n){var r=p.extend(new p.Event,n,{type:e,isSimulated:!0})
;p.event.trigger(r,null,t)}}),p.fn.extend({trigger:function(e,t){
return this.each((function(){p.event.trigger(e,t,this)}))},
triggerHandler:function(e,t){var n=this[0];if(n)return p.event.trigger(e,t,n,!0)
}
}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),(function(e,t){
p.fn[t]=function(e,n){
return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}})),p.fn.extend({
hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}
}),f.focusin="onfocusin"in e,f.focusin||p.each({focus:"focusin",blur:"focusout"
},(function(e,t){var n=function(e){p.event.simulate(t,e.target,p.event.fix(e))}
;p.event.special[t]={setup:function(){
var r=this.ownerDocument||this,i=P.access(r,t)
;i||r.addEventListener(e,n,!0),P.access(r,t,(i||0)+1)},teardown:function(){
var r=this.ownerDocument||this,i=P.access(r,t)-1
;i?P.access(r,t,i):(r.removeEventListener(e,n,!0),P.remove(r,t))}}}))
;var it=e.location,ot=p.now(),st=/\?/;p.parseJSON=function(e){
return JSON.parse(e+"")},p.parseXML=function(t){var n
;if(!t||"string"!=typeof t)return null;try{
n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(r){n=void 0}
return n&&!n.getElementsByTagName("parsererror").length||p.error("Invalid XML: "+t),
n}
;var at=/#.*$/,ut=/([?&])_=[^&]*/,lt=/^(.*?):[ \t]*([^\r\n]*)$/gm,ct=/^(?:GET|HEAD)$/,ft=/^\/\//,pt={},dt={},ht="*/".concat("*"),gt=r.createElement("a")
;function vt(e){return function(t,n){"string"!=typeof t&&(n=t,t="*")
;var r,i=0,o=t.toLowerCase().match(q)||[]
;if(p.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",
(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function mt(e,t,n,r){
var i={},o=e===dt;function s(a){var u
;return i[a]=!0,p.each(e[a]||[],(function(e,a){var l=a(t,n,r)
;return"string"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),s(l),
!1)})),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function yt(e,t){
var n,r,i=p.ajaxSettings.flatOptions||{}
;for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n])
;return r&&p.extend(!0,e,r),e}gt.href=it.href,p.extend({active:0,
lastModified:{},etag:{},ajaxSettings:{url:it.href,type:"GET",
isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(it.protocol),
global:!0,processData:!0,async:!0,
contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ht,
text:"text/plain",html:"text/html",xml:"application/xml, text/xml",
json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,
json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",
json:"responseJSON"},converters:{"* text":String,"text html":!0,
"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{url:!0,context:!0}},
ajaxSetup:function(e,t){return t?yt(yt(e,p.ajaxSettings),t):yt(p.ajaxSettings,e)
},ajaxPrefilter:vt(pt),ajaxTransport:vt(dt),ajax:function(t,n){
"object"==typeof t&&(n=t,t=void 0),n=n||{}
;var i,o,s,a,u,l,c,f,d=p.ajaxSetup({},n),h=d.context||d,g=d.context&&(h.nodeType||h.jquery)?p(h):p.event,v=p.Deferred(),m=p.Callbacks("once memory"),y=d.statusCode||{},x={},b={},w=0,T="canceled",C={
readyState:0,getResponseHeader:function(e){var t;if(2===w){
if(!a)for(a={};t=lt.exec(s);)a[t[1].toLowerCase()]=t[2];t=a[e.toLowerCase()]}
return null==t?null:t},getAllResponseHeaders:function(){return 2===w?s:null},
setRequestHeader:function(e,t){var n=e.toLowerCase()
;return w||(e=b[n]=b[n]||e,x[e]=t),this},overrideMimeType:function(e){
return w||(d.mimeType=e),this},statusCode:function(e){var t
;if(e)if(w<2)for(t in e)y[t]=[y[t],e[t]];else C.always(e[C.status]);return this
},abort:function(e){var t=e||T;return i&&i.abort(t),k(0,t),this}}
;if(v.promise(C).complete=m.add,
C.success=C.done,C.error=C.fail,d.url=((t||d.url||it.href)+"").replace(at,"").replace(ft,it.protocol+"//"),
d.type=n.method||n.type||d.method||d.type,
d.dataTypes=p.trim(d.dataType||"*").toLowerCase().match(q)||[""],
null==d.crossDomain){l=r.createElement("a");try{
l.href=d.url,l.href=l.href,d.crossDomain=gt.protocol+"//"+gt.host!=l.protocol+"//"+l.host
}catch(E){d.crossDomain=!0}}
if(d.data&&d.processData&&"string"!=typeof d.data&&(d.data=p.param(d.data,d.traditional)),
mt(pt,d,n,C),2===w)return C
;for(f in(c=p.event&&d.global)&&0==p.active++&&p.event.trigger("ajaxStart"),
d.type=d.type.toUpperCase(),
d.hasContent=!ct.test(d.type),o=d.url,d.hasContent||(d.data&&(o=d.url+=(st.test(o)?"&":"?")+d.data,
delete d.data),
!1===d.cache&&(d.url=ut.test(o)?o.replace(ut,"$1_="+ot++):o+(st.test(o)?"&":"?")+"_="+ot++)),
d.ifModified&&(p.lastModified[o]&&C.setRequestHeader("If-Modified-Since",p.lastModified[o]),
p.etag[o]&&C.setRequestHeader("If-None-Match",p.etag[o])),
(d.data&&d.hasContent&&!1!==d.contentType||n.contentType)&&C.setRequestHeader("Content-Type",d.contentType),
C.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+ht+"; q=0.01":""):d.accepts["*"]),
d.headers)C.setRequestHeader(f,d.headers[f])
;if(d.beforeSend&&(!1===d.beforeSend.call(h,C,d)||2===w))return C.abort()
;for(f in T="abort",{success:1,error:1,complete:1})C[f](d[f])
;if(i=mt(dt,d,n,C)){
if(C.readyState=1,c&&g.trigger("ajaxSend",[C,d]),2===w)return C
;d.async&&d.timeout>0&&(u=e.setTimeout((function(){C.abort("timeout")
}),d.timeout));try{w=1,i.send(x,k)}catch(E){if(!(w<2))throw E;k(-1,E)}
}else k(-1,"No Transport");function k(t,n,r,a){var l,f,x,b,T,k=n
;2!==w&&(w=2,u&&e.clearTimeout(u),
i=void 0,s=a||"",C.readyState=t>0?4:0,l=t>=200&&t<300||304===t,
r&&(b=function(e,t,n){
for(var r,i,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),
void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"))
;if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}
if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i
;break}s||(s=i)}o=o||s}if(o)return o!==u[0]&&u.unshift(o),n[o]
}(d,C,r)),b=function(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice()
;if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s]
;for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),
!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),
u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){
if(!(s=l[u+" "+o]||l["* "+o]))for(i in l)if((a=i.split(" "))[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){
!0===s?s=l[i]:!0!==l[i]&&(o=a[0],c.unshift(a[1]));break}
if(!0!==s)if(s&&e.throws)t=s(t);else try{t=s(t)}catch(E){return{
state:"parsererror",error:s?E:"No conversion from "+u+" to "+o}}}return{
state:"success",data:t}
}(d,b,C,l),l?(d.ifModified&&((T=C.getResponseHeader("Last-Modified"))&&(p.lastModified[o]=T),
(T=C.getResponseHeader("etag"))&&(p.etag[o]=T)),
204===t||"HEAD"===d.type?k="nocontent":304===t?k="notmodified":(k=b.state,
f=b.data,
l=!(x=b.error))):(x=k,!t&&k||(k="error",t<0&&(t=0))),C.status=t,C.statusText=(n||k)+"",
l?v.resolveWith(h,[f,k,C]):v.rejectWith(h,[C,k,x]),
C.statusCode(y),y=void 0,c&&g.trigger(l?"ajaxSuccess":"ajaxError",[C,d,l?f:x]),
m.fireWith(h,[C,k]),
c&&(g.trigger("ajaxComplete",[C,d]),--p.active||p.event.trigger("ajaxStop")))}
return C},getJSON:function(e,t,n){return p.get(e,t,n,"json")},
getScript:function(e,t){return p.get(e,void 0,t,"script")}
}),p.each(["get","post"],(function(e,t){p[t]=function(e,n,r,i){
return p.isFunction(n)&&(i=i||r,r=n,n=void 0),p.ajax(p.extend({url:e,type:t,
dataType:i,data:n,success:r},p.isPlainObject(e)&&e))}})),p._evalUrl=function(e){
return p.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,throws:!0})
},p.fn.extend({wrapAll:function(e){var t
;return p.isFunction(e)?this.each((function(t){p(this).wrapAll(e.call(this,t))
})):(this[0]&&(t=p(e,this[0].ownerDocument).eq(0).clone(!0),
this[0].parentNode&&t.insertBefore(this[0]),t.map((function(){
for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e
})).append(this)),this)},wrapInner:function(e){
return p.isFunction(e)?this.each((function(t){p(this).wrapInner(e.call(this,t))
})):this.each((function(){var t=p(this),n=t.contents()
;n.length?n.wrapAll(e):t.append(e)}))},wrap:function(e){var t=p.isFunction(e)
;return this.each((function(n){p(this).wrapAll(t?e.call(this,n):e)}))},
unwrap:function(){return this.parent().each((function(){
p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)})).end()}
}),p.expr.filters.hidden=function(e){return!p.expr.filters.visible(e)
},p.expr.filters.visible=function(e){
return e.offsetWidth>0||e.offsetHeight>0||e.getClientRects().length>0}
;var xt=/%20/g,bt=/\[\]$/,wt=/\r?\n/g,Tt=/^(?:submit|button|image|reset|file)$/i,Ct=/^(?:input|select|textarea|keygen)/i
;function kt(e,t,n,r){var i;if(p.isArray(t))p.each(t,(function(t,i){
n||bt.test(e)?r(e,i):kt(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)
}));else if(n||"object"!==p.type(t))r(e,t);else for(i in t)kt(e+"["+i+"]",t[i],n,r)
}p.param=function(e,t){var n,r=[],i=function(e,t){
t=p.isFunction(t)?t():null==t?"":t,
r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)}
;if(void 0===t&&(t=p.ajaxSettings&&p.ajaxSettings.traditional),
p.isArray(e)||e.jquery&&!p.isPlainObject(e))p.each(e,(function(){
i(this.name,this.value)}));else for(n in e)kt(n,e[n],t,i)
;return r.join("&").replace(xt,"+")},p.fn.extend({serialize:function(){
return p.param(this.serializeArray())},serializeArray:function(){
return this.map((function(){var e=p.prop(this,"elements")
;return e?p.makeArray(e):this})).filter((function(){var e=this.type
;return this.name&&!p(this).is(":disabled")&&Ct.test(this.nodeName)&&!Tt.test(e)&&(this.checked||!U.test(e))
})).map((function(e,t){var n=p(this).val()
;return null==n?null:p.isArray(n)?p.map(n,(function(e){return{name:t.name,
value:e.replace(wt,"\r\n")}})):{name:t.name,value:n.replace(wt,"\r\n")}})).get()
}}),p.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(t){}}
;var Et={0:200,1223:204},Nt=p.ajaxSettings.xhr()
;f.cors=!!Nt&&"withCredentials"in Nt,
f.ajax=Nt=!!Nt,p.ajaxTransport((function(t){var n,r
;if(f.cors||Nt&&!t.crossDomain)return{send:function(i,o){var s,a=t.xhr()
;if(a.open(t.type,t.url,t.async,t.username,t.password),
t.xhrFields)for(s in t.xhrFields)a[s]=t.xhrFields[s]
;for(s in t.mimeType&&a.overrideMimeType&&a.overrideMimeType(t.mimeType),
t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest"),
i)a.setRequestHeader(s,i[s]);n=function(e){return function(){
n&&(n=r=a.onload=a.onerror=a.onabort=a.onreadystatechange=null,
"abort"===e?a.abort():"error"===e?"number"!=typeof a.status?o(0,"error"):o(a.status,a.statusText):o(Et[a.status]||a.status,a.statusText,"text"!==(a.responseType||"text")||"string"!=typeof a.responseText?{
binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}
},a.onload=n(),
r=a.onerror=n("error"),void 0!==a.onabort?a.onabort=r:a.onreadystatechange=function(){
4===a.readyState&&e.setTimeout((function(){n&&r()}))},n=n("abort");try{
a.send(t.hasContent&&t.data||null)}catch(u){if(n)throw u}},abort:function(){
n&&n()}}})),p.ajaxSetup({accepts:{
script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},contents:{script:/\b(?:java|ecma)script\b/},converters:{
"text script":function(e){return p.globalEval(e),e}}
}),p.ajaxPrefilter("script",(function(e){
void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")
})),p.ajaxTransport("script",(function(e){var t,n;if(e.crossDomain)return{
send:function(i,o){t=p("<script>").prop({charset:e.scriptCharset,src:e.url
}).on("load error",n=function(e){
t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)
}),r.head.appendChild(t[0])},abort:function(){n&&n()}}}))
;var St=[],jt=/(=)\?(?=&|$)|\?\?/;p.ajaxSetup({jsonp:"callback",
jsonpCallback:function(){var e=St.pop()||p.expando+"_"+ot++;return this[e]=!0,e}
}),p.ajaxPrefilter("json jsonp",(function(t,n,r){
var i,o,s,a=!1!==t.jsonp&&(jt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&jt.test(t.data)&&"data")
;if(a||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=p.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,
a?t[a]=t[a].replace(jt,"$1"+i):!1!==t.jsonp&&(t.url+=(st.test(t.url)?"&":"?")+t.jsonp+"="+i),
t.converters["script json"]=function(){
return s||p.error(i+" was not called"),s[0]
},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments
},r.always((function(){
void 0===o?p(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,
St.push(i)),s&&p.isFunction(o)&&o(s[0]),s=o=void 0})),"script"
})),p.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null
;"boolean"==typeof t&&(n=t,t=!1),t=t||r;var i=T.exec(e),o=!n&&[]
;return i?[t.createElement(i[1])]:(i=Z([e],t,o),
o&&o.length&&p(o).remove(),p.merge([],i.childNodes))};var Dt=p.fn.load
;function At(e){return p.isWindow(e)?e:9===e.nodeType&&e.defaultView}
p.fn.load=function(e,t,n){
if("string"!=typeof e&&Dt)return Dt.apply(this,arguments)
;var r,i,o,s=this,a=e.indexOf(" ")
;return a>-1&&(r=p.trim(e.slice(a)),e=e.slice(0,a)),
p.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),
s.length>0&&p.ajax({url:e,type:i||"GET",dataType:"html",data:t
}).done((function(e){
o=arguments,s.html(r?p("<div>").append(p.parseHTML(e)).find(r):e)
})).always(n&&function(e,t){s.each((function(){
n.apply(this,o||[e.responseText,t,e])}))}),this
},p.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],(function(e,t){
p.fn[t]=function(e){return this.on(t,e)}})),p.expr.filters.animated=function(e){
return p.grep(p.timers,(function(t){return e===t.elem})).length},p.offset={
setOffset:function(e,t,n){var r,i,o,s,a,u,l=p.css(e,"position"),c=p(e),f={}
;"static"===l&&(e.style.position="relative"),
a=c.offset(),o=p.css(e,"top"),u=p.css(e,"left"),
("absolute"===l||"fixed"===l)&&(o+u).indexOf("auto")>-1?(s=(r=c.position()).top,
i=r.left):(s=parseFloat(o)||0,
i=parseFloat(u)||0),p.isFunction(t)&&(t=t.call(e,n,p.extend({},a))),
null!=t.top&&(f.top=t.top-a.top+s),
null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):c.css(f)}},
p.fn.extend({offset:function(e){
if(arguments.length)return void 0===e?this:this.each((function(t){
p.offset.setOffset(this,e,t)}));var t,n,r=this[0],i={top:0,left:0
},o=r&&r.ownerDocument
;return o?(t=o.documentElement,p.contains(t,r)?(i=r.getBoundingClientRect(),
n=At(o),{top:i.top+n.pageYOffset-t.clientTop,
left:i.left+n.pageXOffset-t.clientLeft}):i):void 0},position:function(){
if(this[0]){var e,t,n=this[0],r={top:0,left:0}
;return"fixed"===p.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),
t=this.offset(),
p.nodeName(e[0],"html")||(r=e.offset()),r.top+=p.css(e[0],"borderTopWidth",!0),
r.left+=p.css(e[0],"borderLeftWidth",!0)),{
top:t.top-r.top-p.css(n,"marginTop",!0),
left:t.left-r.left-p.css(n,"marginLeft",!0)}}},offsetParent:function(){
return this.map((function(){
for(var e=this.offsetParent;e&&"static"===p.css(e,"position");)e=e.offsetParent
;return e||Se}))}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"
},(function(e,t){var n="pageYOffset"===t;p.fn[e]=function(r){
return H(this,(function(e,r,i){var o=At(e);if(void 0===i)return o?o[t]:e[r]
;o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i
}),e,r,arguments.length)}})),p.each(["top","left"],(function(e,t){
p.cssHooks[t]=De(f.pixelPosition,(function(e,n){
if(n)return n=je(e,t),ke.test(n)?p(e).position()[t]+"px":n}))})),p.each({
Height:"height",Width:"width"},(function(e,t){p.each({padding:"inner"+e,
content:t,"":"outer"+e},(function(n,r){p.fn[r]=function(r,i){
var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(!0===r||!0===i?"margin":"border")
;return H(this,(function(t,n,r){var i
;return p.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,
Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===r?p.css(t,n,s):p.style(t,n,r,s)
}),t,o?r:void 0,o,null)}}))})),p.fn.extend({bind:function(e,t,n){
return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},
delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){
return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},
size:function(){return this.length}
}),p.fn.andSelf=p.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],(function(){
return p}));var qt=e.jQuery,Lt=e.$;return p.noConflict=function(t){
return e.$===p&&(e.$=Lt),t&&e.jQuery===p&&(e.jQuery=qt),p},t||(e.jQuery=e.$=p),p
}));