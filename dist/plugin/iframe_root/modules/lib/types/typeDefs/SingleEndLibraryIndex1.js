define(["../ObjectIndexBase"],(function(e){"use strict";const n=[{
id:"meanInsertSize",label:"Mean Insert Size",type:"number",format:"0,0.00"},{
id:"readCount",label:"Read Length",type:"number",format:"0,0"},{
id:"meanReadLength",label:"Mean Read Length",type:"number",format:"0,0.00"},{
id:"meanQuality",label:"Mean Quality",type:"number",format:"0.000"},{
id:"phredType",label:"Phred Type"},{id:"gcContent",label:"GC Content",
type:"number",format:"%0.00"},{id:"sequencingTechnology",
label:"Sequencing Technology"}],t={technology:{label:"Sequencing Technology",
type:"string"},file:{label:"File",type:"string"},phred_type:{label:"Phred Type",
type:"string"},read_count:{label:"Read Count",type:"integer"},read_length:{
label:"Mean Read Length",type:"integer"},quality:{label:"float",type:"Quality"},
gc_content:{label:"GC Content",type:"float"}},a=[{key:"technology",
label:"Sequencing Technology"},{key:"read_count",label:"Read Count"},{
key:"read_length",label:"Mean Read Length"}];return class extends e{
constructor(e){super(Object.assign({},e,{indexId:"PairedEndLibrary",
indexVersion:1,detailFieldDefs:n,searchFields:t,sortFields:a,
kbaseTypeModule:"KBaseAssembly",kbaseTypeId:"SingleEndLibrary",
label:"Single End Library"}))}objectToData(){const e=this.object.data;return{
sequencingTechnology:e.sequencing_tech,phredType:e.phred_type,
readCount:e.read_count,meanReadLength:e.read_length_mean,
meanInsertSize:e.insert_size_mean,meanQuality:e.qual_mean,gcContent:e.gc_content
}}}}));