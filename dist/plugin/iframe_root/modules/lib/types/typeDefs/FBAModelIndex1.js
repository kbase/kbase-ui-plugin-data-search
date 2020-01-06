define(["../ObjectIndexBase","../components/taxonomy","../utils"],(function(e,o,t){
"use strict";const n=[{id:"id",label:"ID"},{id:"name",label:"Name"},{
id:"source",label:"Source"},{id:"type",label:"Type"},{id:"modelCompartments",
label:"Model Compartments",type:"number",format:"0,0"},{id:"modelCompounds",
label:"Model Compounds",type:"number",format:"0,0"},{id:"modelReactions",
label:"Model Reactions",type:"number",format:"0,0"},{id:"genomeRef",
label:"Genome Reference"},{id:"scientificName",label:"Scientific name"},{
id:"taxonomy",label:"Taxonomy",component:o.name()},{id:"genomeName",
label:"Genome Name"}],a={id:{label:"ID",type:"string"},name:{label:"Name",
type:"string"},source:{label:"Source",type:"string"},type:{label:"Type",
type:"string"},modelcompartments:{label:"Model Compartments",type:"integer"},
modelcompounds:{label:"Model Compounds",type:"integer"},modelreactions:{
label:"Model Reactions",type:"integer"},genome_ref:{label:"Genome Ref",
type:"string"},scientific_name:{label:"Scientific Name",type:"string"},
taxonomy:{label:"Taxonomy",type:"string"},genome_name:{label:"Genome",
type:"string"}},m=[];return class extends e{constructor(e){
super(Object.assign({},e,{indexId:"FBAModel",indexVersion:1,detailFieldDefs:n,
searchFields:a,sortFields:m,kbaseTypeModule:"KBaseFBA",kbaseTypeId:"FBAModel",
label:"FBA Model"}))}objectToData(){var e=this.object.data;return{id:e.id,
name:e.name,source:e.source,type:e.type,modelCompartments:e.modelcompartments,
modelCompounds:e.modelcompounds,modelReactions:e.modelreactions,
genomeRef:e.genome_ref,scientificName:this.object.key_props.scientific_name,
taxonomy:t.parseTaxonomy(this.object.key_props.taxonomy),
genomeName:this.object.key_props.genome_name}}}}));