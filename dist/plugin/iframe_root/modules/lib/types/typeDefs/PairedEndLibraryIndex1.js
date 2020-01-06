define(["../ObjectIndexBase"],(function(e){"use strict";const n=[{
id:"scientificName",label:"Scientific Name"},{id:"insertSize",
label:"Insert Size",type:"number",format:"0,0"},{id:"readCount",
label:"Read Length",type:"number",format:"0,0"},{id:"meanReadLength",
label:"Mean Read Length",type:"number",format:"0,0.00"},{id:"quality",
label:"Quality",type:"number",format:"0.000"},{id:"phredType",label:"Phred Type"
},{id:"files",label:"Files"},{id:"gcContent",label:"GC Content",type:"number",
format:"0.000"},{id:"sequencingTechnology",label:"Sequencing Technology"}],t={
technology:{label:"Sequencing Technology",type:"string"},files:{label:"Files",
type:"string"},phred_type:{label:"Phred Type",type:"string"},read_count:{
label:"Read Count",type:"integer"},read_length:{label:"Mean Read Length",
type:"integer"},insert_size:{label:"Mean Insert Size",type:"integer"},quality:{
label:"Quality",type:"float"},gc_content:{label:"GC Content",type:"float"}},a=[{
key:"technology",label:"Sequencing Technology"},{key:"read_count",
label:"Read Count"},{key:"read_length",label:"Mean Read Length"}]
;return class extends e{constructor(e){super(Object.assign({},e,{
indexId:"PairedEndLibrary",indexVersion:1,detailFieldDefs:n,searchFields:t,
sortFields:a,kbaseTypeModule:"KBaseAssembly",kbaseTypeId:"PairedEndLibrary",
label:"Paired End Library"}))}objectToData(){var e=this.object.data;return{
scientificName:e.scientific_name,gcContent:e.gc_content,
meanInsertSize:e.insert_size_mean,phredType:e.phred_type,
meanQuality:e.qual_mean,readCount:e.read_count,
meanReadLength:e.read_length_mean,sequencingTechnology:e.sequencing_tech}}}}));