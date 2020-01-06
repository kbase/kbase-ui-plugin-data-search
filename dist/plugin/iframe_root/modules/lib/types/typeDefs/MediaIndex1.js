define(["../ObjectIndexBase"],(function(e){"use strict";const i=[{id:"id",
label:"ID"},{id:"name",label:"Name"},{id:"externalSourceId",
label:"External Source ID"},{id:"type",label:"Type"},{id:"modelCompounds",
label:"Model Compounds",type:"number",format:"0,0"},{id:"isDefined",
label:"Defined",type:"boolean",format:"Yes:No"},{id:"isMinimal",label:"Minimal",
type:"boolean",format:"Yes:No"},{id:"isAerobic",label:"Aerobic",type:"boolean",
format:"Yes:No"}],l={id:{label:"ID",type:"string"},name:{label:"Name",
type:"string"},external_source_id:{label:"External Source",type:"string"},type:{
label:"Type",type:"string"},modelcompounds:{label:"Model Compounds",
type:"integer"},isDefined:{label:"Defined",type:"boolean"},isMinimal:{
label:"Minimal",type:"boolean"},isAerobic:{label:"Aerobic",type:"boolean"}},o=[]
;return class extends e{constructor(e){super(Object.assign({},e,{
indexId:"Media",indexVersion:1,detailFieldDefs:i,searchFields:l,sortFields:o,
kbaseTypeModule:"KBaseGenomeAnnotations",kbaseTypeId:"Assembly",label:"Media"}))
}objectToData(){var e=this.object.data;return{id:e.id,name:e.name,
externalSourceId:e.external_source_id,type:e.type,
modelCompounds:e.modelcompounds,isDefined:e.isDefined,isMinimal:e.isMinimal,
isAerobic:e.isAerobic}}}}));