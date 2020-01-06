define(["./rpc"],(function(e){"use strict";return{make:function(t){
var a=t.runtime,i=e.make({runtime:a});return{referenceObjectSearch:function(e){
var t={match_filter:{full_text_in_all:e.query,exclude_subobjects:1,
source_tags:["refdata"],source_tags_blacklist:0},pagination:{
start:e.page*e.pageSize,count:e.pageSize},post_processing:{ids_only:0,
skip_info:0,skip_keys:0,skip_data:0,include_highlight:1},access_filter:{
with_private:0,with_public:1},sorting_rules:[{is_object_property:0,
property:"timestamp",ascending:0}]}
;return i.call("KBaseSearchEngine","search_objects",t).spread((function(e){
return e}))},narrativeObjectSearch:function(e){var t={match_filter:{
full_text_in_all:e.query,exclude_subobjects:1,source_tags:["refdata","noindex"],
source_tags_blacklist:1},pagination:{start:e.page*e.pageSize,count:e.pageSize},
post_processing:{ids_only:0,skip_info:0,skip_keys:0,skip_data:0,
include_highlight:1,add_narrative_info:1},access_filter:{
with_private:e.withPrivateData?1:0,with_public:e.withPublicData?1:0},
sorting_rules:[{is_object_property:0,property:"access_group_id",ascending:0},{
is_object_property:0,property:"type",ascending:1}]}
;return i.call("KBaseSearchEngine","search_objects",t).spread((function(e){
return e}))},referenceObjectSearchTotal:function(e){var t={match_filter:{
full_text_in_all:e.query,exclude_subobjects:1,source_tags:["refdata"],
source_tags_blacklist:0},pagination:{start:0,count:0},post_processing:{
ids_only:1,skip_info:1,skip_keys:1,skip_data:1,include_highlight:1},
access_filter:{with_private:0,with_public:1}}
;return i.call("KBaseSearchEngine","search_objects",t).spread((function(e){
return e.total}))},narrativeObjectSearchTotal:function(e){var t={match_filter:{
full_text_in_all:e.query,exclude_subobjects:1,source_tags:["refdata","noindex"],
source_tags_blacklist:1},pagination:{start:0,count:0},post_processing:{
ids_only:1,skip_info:1,skip_keys:1,skip_data:1,include_highlight:0},
access_filter:{with_private:e.withPrivateData?1:0,
with_public:e.withPublicData?1:0}}
;return i.call("KBaseSearchEngine","search_objects",t).spread((function(e){
return e.total}))},featuresSearch:function(e){
var t=e.query,a=e.page*e.pageSize,r=e.pageSize;let s,c=!1
;e.withReferenceData?s=e.withUserData?[]:["refdata"]:e.withUserData?(s=["refdata"],
c=1):s=["nothing"];var n={object_types:["GenomeFeature"],match_filter:{
full_text_in_all:t,exclude_subobjects:0,source_tags:s,
source_tags_blacklist:c?1:0},pagination:{start:a,count:r},post_processing:{
ids_only:0,skip_info:0,skip_keys:0,skip_data:0,include_highlight:1,
add_access_group_info:1},access_filter:{with_private:e.withPrivateData?1:0,
with_public:e.withPublicData?1:0},sorting_rules:[{is_object_property:1,
property:"genome_scientific_name",ascending:1},{is_object_property:0,
property:"guid",ascending:1},{is_object_property:1,property:"feature_type",
ascending:1},{is_object_property:1,property:"id",ascending:1}]}
;return i.call("KBaseSearchEngine","search_objects",n).spread((function(e){
return e}))},featuresSearchTotal:function(e){var t=e.query;let a,r=!1
;e.withReferenceData?a=e.withUserData?[]:["refdata"]:e.withUserData?(a=["refdata"],
r=1):a=["nothing"];var s={object_types:["GenomeFeature"],match_filter:{
full_text_in_all:t,exclude_subobjects:0,source_tags:a,
source_tags_blacklist:r?1:0},pagination:{start:0,count:0},post_processing:{
ids_only:1,skip_info:1,skip_keys:1,skip_data:1,include_highlight:0,
add_access_group_info:0},access_filter:{with_private:e.withPrivateData?1:0,
with_public:e.withPublicData?1:0}}
;return i.call("KBaseSearchEngine","search_objects",s).spread((function(e){
return e.total}))},typeSearch:function(e){var t={match_filter:{
full_text_in_all:e.query,exclude_subobjects:1,source_tags:null,
source_tags_blacklist:null},access_filter:{with_private:e.withPrivateData?1:0,
with_public:e.withPublicData?1:0}};switch(e.dataSource){case"narratives":
t.match_filter.source_tags=["refdata","noindex"],
t.match_filter.source_tags_blacklist=1;break;case"referenceData":
t.match_filter.source_tags=["refdata"],t.match_filter.source_tags_blacklist=0
;break;default:throw new Error("Invalid data source: "+e.dataSource)}
return i.call("KBaseSearchEngine","search_types",t).spread((function(e){return e
}))}}}}}));