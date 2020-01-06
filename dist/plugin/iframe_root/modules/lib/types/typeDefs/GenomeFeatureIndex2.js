define(["../SubObjectIndexBase","../utils","../components/taxonomy","../components/location","../components/aliases","../components/stringArray"],(function(e,t,n,a,o,i){
"use strict";const l=[{id:"id",label:"Id"},{id:"featureType",label:"Type"},{
id:"aliases",label:"Aliases",component:o.name()},{id:"location",
label:"Location",component:a.name()},{id:"functions",label:"Functions",
component:i.name()},{id:"proteinLength",label:"Protein Length",unit:"aa",
type:"number",format:"0,0"},{id:"proteinTranslation",label:"Protein Translation"
}],s={id:{label:"ID",type:"string"},functions:{label:"Functions",type:"string"},
aliases:{label:"Aliases",type:"string",comment:"list of string"},contig_id:{
label:"Contig ID",type:"string"},start:{label:"Start",type:"integer"},strand:{
label:"Strand",type:"string"},stop:{label:"Stop",type:"integer"},feature_type:{
label:"Feature Type",type:"string"},ontology_terms:{label:"Ontology Terms",
type:"string"},genome_domain:{label:"Genome Domain",type:"string"},
genome_taxonomy:{label:"Genome Taxonomy",type:"string"},genome_scientific_name:{
label:"Genome Scientific Name",type:"string"}},r=[{key:"id",label:"ID"},{
key:"function",label:"Function"},{key:"start",label:"Start"}];function c(e){
return e?e.map((function(e){return{type:e[0],alias:e[1]}})):[]}
return class extends e{constructor(e){super(Object.assign({},e,{
indexId:"GenomeFeature",indexVersion:1,detailFieldDefs:l,searchFields:s,
sortFields:r,kbaseTypeModule:"KBaseGenomes",kbaseTypeId:"GenomeFeature",
label:"Genome Feature"}))}objectToData(){
var e,t=this.object.data,n=t.protein_translation;n&&(e=n.length)
;var a=t.location.map((function(e){var t,n=e[1],a=e[3],o=e[2];switch(o){case"+":
case">":t=n+a-1;break;case"-":case"<":t=n-a+1;break;default:
throw console.error("error: Invalid location direction symbol: "+o,e),
new Error("Invalid location direction symbol: "+o)}return{genome:e[0],start:n,
direction:o,length:a,end:t}}));return{featureType:t.type,id:t.id,
aliases:c(t.aliases),functions:t.functions,location:a,proteinTranslation:n,
proteinLength:e}}}}));