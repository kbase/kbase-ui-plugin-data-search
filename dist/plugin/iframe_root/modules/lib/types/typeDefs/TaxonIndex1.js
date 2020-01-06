define(["../ObjectIndexBase","../utils","../components/stringArray","../components/taxonomy"],(function(e,i,n,a){
"use strict";const s=[{id:"scientificName",label:"Scientific Name"},{
id:"scientificLineage",label:"Lineage",component:a.name()},{id:"domain",
label:"Domain"},{id:"aliases",label:"Aliases",component:n.name()}],t={
scientific_name:{label:"Scientific Name",type:"string"},scientific_lineage:{
label:"Scientific Lineage",type:"string"},domain:{label:"Domain",type:"string"},
aliases:{label:"Aliases",type:"string"}},c=[{key:"scientific_name",
label:"Scientific Name"},{key:"domain",label:"Domain"}];return class extends e{
constructor(e){super(Object.assign({},e,{indexId:"Taxon",indexVersion:1,
detailFieldDefs:s,searchFields:t,sortFields:c,
kbaseTypeModule:"KBaseGenomeAnnotations",kbaseTypeId:"Taxon",label:"Taxon"}))}
objectToData(){const e=this.object.data;return{scientificName:e.scientific_name,
scientificLineage:i.parseTaxonomy(e.scientific_lineage),domain:e.domain,
aliases:e.aliases}}}}));