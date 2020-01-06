define(["../ObjectIndexBase"],(function(e){"use strict";const n=[{id:"name",
label:"Name"},{id:"type",label:"Pangenome Type"},{id:"genomeCount",
label:"Genome Count",type:"number",format:"0,0"},{id:"orthologCount",
label:"Ortholog Count",type:"number",format:"0,0"}],o={name:{label:"Name",
type:"string"},type:{label:"Pangenome Type",type:"string"},genomes:{
label:"Genomes",type:"integer"},orhtologs:{label:"Orthologs",type:"integer"}
},t=[{key:"name",label:"Name Name"},{key:"type",label:"Pangenome Type"}]
;return class extends e{constructor(e){super(Object.assign({},e,{
indexId:"Pangenome",indexVersion:1,detailFieldDefs:n,searchFields:o,
sortFields:t,kbaseTypeModule:"KBaseGenomes",kbaseTypeId:"Pangenome",
label:"Pangenome"}))}objectToData(){const e=this.object.data;return{name:e.name,
type:e.type,genomeCount:e.genome_refs,orthologCount:e.orthologs}}}}));