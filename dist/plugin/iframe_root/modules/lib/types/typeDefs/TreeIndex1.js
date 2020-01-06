define(["../ObjectIndexBase","../components/keyValueList"],(function(e,l){
"use strict";const t=[{id:"labels",label:"Labels",component:l.name(),params:{
col1:"type",col2:"label"}},{id:"type",label:"Tree Type"}],s={
default_node_labels:{label:"Labels",type:"string"},type:{label:"Type",
type:"string"}},a=[{key:"type",label:"Type"}];return class extends e{
constructor(e){super(Object.assign({},e,{indexId:"Tree",indexVersion:1,
detailFieldDefs:t,searchFields:s,sortFields:a,kbaseTypeModule:"KBaseTrees",
kbaseTypeId:"Tree",label:"Tree"}))}objectToData(){const e=this.object.data
;return{labels:Object.keys(e.default_node_labels).map((function(l){return{key:l,
value:e.default_node_labels[l]}})),type:e.type}}}}));