define(["bluebird","require","./types/typeDefs/DefaultObjectIndex","yaml!./types/typeIndex.yml"],(function(e,t,n,r){
"use strict";return{make:function(u){var o,i,p=u.runtime;function c(){
return e.all(r.map((function(n){return function(n){
return e.all(n.map((function(n){return new e((function(e,r){t([n],(function(t){
e(t)}),(function(e){r(e)}))}))})))
}([["./types/typeDefs",n.module].join("/")]).spread((function(e){return{type:n,
moduleClass:e}}))}))).then((function(e){var t={};return e.forEach((function(e){
t[e.type.id+"."+e.type.version]=e})),{types:e,typeMap:t}}))}return{
start:function(){return c().then((function(e){o=e.types,i=e.typeMap}))},types:o,
typesMap:i,getTypeForObject:function(e){
const t=[e.type.toLowerCase(),e.type_ver].join("."),r=i[t]
;return r?new r.moduleClass({runtime:p,object:e}):new n({runtime:p,object:e})},
getType:function(e){return i[e]},getLookup:function(){return o.map((function(e){
return{id:e.id,label:e.label}}))}}}}}));