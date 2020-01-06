define(["kb_common/props","../utils","../ObjectIndexBase","../components/taxonomy","../components/featureCounts","../components/stringArray"],(function(e,n,t,o,s,a){
"use strict";const i=[{id:"id",label:"KBase ID"},{id:"scientificName",
label:"Scientific name"},{id:"domain",label:"Domain"},{id:"taxonomy",
label:"Lineage",component:o.name()},{id:"notes",label:"Notes"},{
id:"featureCount",label:" # Features",type:"number",format:"0,0"},{
id:"cdsCount",label:"# CDSs",type:"number",format:"0,0"},{id:"mrnaCount",
label:"# MRNAs",type:"number",format:"0,0"},{id:"nonCodingFeatureCount",
label:"# Non Coding Features",type:"number",format:"0,0"},{id:"featureCounts",
label:"Feature Counts",component:s.name()},{id:"genomeTiers",
label:"Genome Tiers",component:a.name()},{id:"warnings",label:"Warnings",
component:a.name()},{id:"suspect",label:"Suspect",type:"boolean",missing:"n/a"
},{id:"source",label:"Source",type:"string"},{id:"sourceId",label:"Source ID",
type:"string"}],r={id:{label:"ID",type:"string"},domain:{label:"Domain",
type:"string"},taxonomy:{label:"Taxonomy",type:"string"},scientific_name:{
label:"Scientific Name",type:"string"},notes:{label:"Notes",type:"string"},
source:{label:"Source",type:"string"},source_id:{label:"Source ID",type:"string"
},features:{label:"Feature Count",type:"integer"},cdss:{label:"CDS Count",
type:"integer"},mrnas:{label:"MRNA Count",type:"integer"},non_coding_features:{
label:"Non Coding Features",type:"integer"},warnings:{label:"Warnings",
type:"string"},feature_counts:{label:"Feature Counts",type:"string"},
genome_tiers:{label:"Genome Tiers",type:"string"},suspect:{label:"Suspect",
type:"boolean"},assembl_ref:{label:"Asssembly Ref",type:"string"}},l=[{key:"id",
label:"ID"},{key:"domain",label:"Domain"},{key:"scientific_name",
label:"Scientific name"}];return class extends t{constructor(e){
super(Object.assign({},e,{indexId:"Genome",indexVersion:2,detailFieldDefs:i,
searchFields:r,sortFields:l,kbaseTypeModule:"KBaseGenomes",kbaseTypeId:"Genome",
label:"Genome"}))}objectToData(){const e=this.object.data;return{id:e.id,
domain:e.domain,taxonomy:n.parseTaxonomy(e.taxonomy),
scientificName:e.scientific_name,notes:e.notes,featureCount:e.features,
contigCount:e.contigs,cdsCount:e.cdss,mrnaCount:e.mrnas,
nonCodingFeatureCount:e.non_coding_features,warnings:e.warnings,
suspect:n.parseBoolean(e.suspect),featureCounts:e.feature_counts,
genomeTiers:e.genome_tiers,source:e.source,sourceId:e.source_id}}}}));