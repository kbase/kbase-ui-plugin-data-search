define(["kb_common/props","../utils","../ObjectIndexBase","../components/taxonomy"],(function(e,n,t,i){
"use strict";const o=[{id:"id",label:"KBase ID"},{id:"scientificName",
label:"Scientific name"},{id:"domain",label:"Domain"},{id:"taxonomy",
label:"Lineage",component:i.name()},{id:"featureCount",label:" # Features",
type:"number",format:"0,0"},{id:"cdsCount",label:"# CDSs",type:"number",
format:"0,0"},{id:"mrnaCount",label:"# mRNAs",type:"number",format:"0,0"},{
id:"contigCount",label:"# Contigs",type:"number",format:"0,0"},{id:"source",
label:"Source",type:"string"},{id:"sourceId",label:"Source ID",type:"string"
}],a={id:{label:"ID",type:"string"},domain:{label:"Domain",type:"string"},
taxonomy:{label:"Lineage",type:"string"},scientific_name:{
label:"Scientific Name",type:"string"},feature_count:{label:"Feature Count",
type:"integer"},cds_count:{label:"CDS Count",type:"integer"},mrna_count:{
label:"mRNA Count",type:"integer"},contigs:{label:"Contig Count",type:"integer"
},source:{label:"Source",type:"string"},source_id:{label:"Source ID",
type:"string"}},s=[{key:"id",label:"ID"},{key:"domain",label:"Domain"},{
key:"scientific_name",label:"Scientific name"}];return class extends t{
constructor(e){super(Object.assign({},e,{indexId:"Genome",indexVersion:1,
detailFieldDefs:o,searchFields:a,sortFields:s,kbaseTypeModule:"KBaseGenomes",
kbaseTypeId:"Genome",label:"Genome"}))}objectToData(){const e=this.object.data
;return{id:e.id,domain:e.domain,taxonomy:n.parseTaxonomy(e.taxonomy),
scientificName:e.scientific_name,featureCount:e.features,mrnaCount:e.mrnas,
cdsCount:e.cdss,contigCount:e.num_contigs,source:e.source,sourceId:e.source_id}}
}}));