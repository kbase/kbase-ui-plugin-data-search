define(["../SubObjectIndexBase"],(function(e){"use strict";const t=[{
id:"contigId",label:"Contig ID"},{id:"description",label:"Description"},{
id:"length",label:"Length",type:"number",format:"0,0"},{id:"gcContent",
label:"GC Content",type:"number",format:"0.000%"}],n={contig_id:{
label:"Contig Id",type:"string"},description:{label:"Description",type:"string"
},gc_content:{label:"GC Content",type:"float"},length:{label:"Length",
type:"integer"}},i=[{key:"contig_id",label:"Contig ID"},{key:"gc_content",
label:"GC Content"},{key:"length",label:"Length"}];return class extends e{
constructor(e){super(Object.assign({},e,{indexId:"AssemblyContig",
indexVersion:1,detailFieldDefs:t,searchFields:n,sortFields:i,
kbaseTypeModule:"KBaseGenomeAnnotations",kbaseTypeId:"AssemblyContig",
label:"Assembly Contig"}))}objectToData(){const e=this.object.data;return{
description:e.description,contigId:e.contig_id,length:e.value,
gcContent:e.gc_content}}}}));