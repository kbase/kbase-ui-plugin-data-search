define(["../SubObjectIndexBase","../utils","../components/taxonomy","../components/location","../components/aliases","../components/stringArray","../components/proteinTranslation"],(function(e,t,n,a,i,o,s){
"use strict";const l=[{id:"id",label:"Id"},{id:"featureType",label:"Type"},{
id:"aliases",label:"Aliases",component:i.name()},{id:"location",
label:"Location",component:a.name()},{id:"functions",label:"Functions",
component:o.name()},{id:"proteinLength",label:"Protein Length",unit:"aa",
type:"number",format:"0,0"},{id:"proteinTranslation",
label:"Protein Translation",component:s.name()}],r={id:{label:"ID",type:"string"
},function:{label:"Function",type:"string"},aliases:{label:"Aliases",
type:"string",comment:"list of string"},contig_id:{label:"Contig ID",
type:"string"},start:{label:"Start",type:"integer"},strand:{label:"Strand",
type:"string"},stop:{label:"Stop",type:"integer"},feature_type:{
label:"Feature Type",type:"string"},ontology_terms:{label:"Ontology Terms",
type:"string"},genome_domain:{label:"Genome Domain",type:"string"},
genome_taxonomy:{label:"Genome Taxonomy",type:"string"},genome_scientific_name:{
label:"Genome Scientific Name",type:"string"}},c=[{isObjectName:!1,
isTimestamp:!1,key:"id",label:"ID"},{isObjectName:!1,isTimestamp:!1,
key:"function",label:"Function"},{isObjectName:!1,isTimestamp:!1,key:"start",
label:"Start"}];function m(e){return e?e.map((function(e){return{type:null,
alias:e}})):[]}return class extends e{constructor(e){super(Object.assign({},e,{
indexId:"GenomeFeature",indexVersion:1,detailFieldDefs:l,searchFields:r,
sortFields:c,kbaseTypeModule:"KBaseGenomes",kbaseTypeId:"GenomeFeature",
label:"Genome Feature"}))}objectToData(){
var e,t=this.object.data,n=t.protein_translation;n&&(e=n.length)
;var a=t.location.map((function(e){var t,n=e[1],a=e[3],i=e[2];switch(i){case"+":
case">":t=n+a-1;break;case"-":case"<":t=n-a+1;break;default:
throw console.error("error: Invalid location direction symbol: "+i,e),
new Error("Invalid location direction symbol: "+i)}return{genome:e[0],start:n,
direction:i,length:a,end:t}}));return{featureType:t.type,id:t.id,
aliases:m(t.aliases),functions:[t.function],location:a,proteinTranslation:n,
proteinLength:e}}}}));