define(["bluebird","kb_service/utils","./rpc","yaml!../data/stopWords.yml"],(function(e,r,t,n){
"use strict";return{make:function(o){var a=o.runtime,c=t.make({runtime:a})
;function i(t){return c.call("Workspace","get_object_info3",{objects:[{
wsid:t.workspaceId,objid:t.objectId}],ignoreErrors:1}).spread((function(n){
if(0===n.infos.length)throw new Error("No Narrative found with reference "+t.workspaceId+"/"+t.objectId)
;if(n.infos.length>1)throw new Error("Too many Narratives found with reference "+t.workspaceId+"/"+t.objectId)
;var o=r.objectInfoToObject(n.infos[0])
;return e.all([o,c.call("Workspace","get_workspace_info",{id:o.wsid
}).spread((function(e){return e}))])})).spread((function(e,t){return{
objectInfo:e,workspaceInfo:r.workspaceInfoToObject(t)}}))}function s(t){
return c.call("Workspace","get_object_info3",{objects:[{wsid:t.workspaceId,
objid:t.objectId,ver:t.version}],ignoreErrors:1}).spread((function(n){
if(0===n.infos.length)throw new Error("No object found with reference "+t)
;if(n.infos.length>1)throw new Error("Too many objects found with reference "+t)
;var o=r.objectInfoToObject(n.infos[0])
;return e.all([o,c.call("Workspace","get_workspace_info",{id:o.wsid})])
})).spread((function(e,t){return{objectInfo:e,
workspaceInfo:r.workspaceInfoToObject(t[0])}}))}function f(e){
return c.call("NarrativeService","copy_object",{ref:e.sourceObjectRef,
target_ws_id:e.targetWorkspaceId}).spread((function(e){return e}))}return{
getNarrative:i,getObjectInfo:s,getObjectsInfo:function(r){
var t=r.map((function(e){if("string"==typeof e){
var r=e.split("/").map((function(e){return parseInt(e,10)}));return{
workspaceId:r[0],objectId:r[1],version:r[2]}}}))
;return e.all(t.map((function(e){return s(e)})))},
getWritableNarratives:function(){
return c.call("Workspace","list_workspace_info",{perm:"w"}).spread((function(e){
return e.map((function(e){return r.workspace_metadata_to_object(e)
})).filter((function(e){
return!(!e.metadata.narrative||isNaN(parseInt(e.metadata.narrative,10))||!e.metadata.narrative_nice_name||!e.metadata.is_temporary||"true"===e.metadata.is_temporary)
}))})).then((function(e){var r=Object.keys(e.reduce((function(e,r){
return e[r.owner]=!0,e}),{}))
;return c.call("UserProfile","get_user_profile",r).spread((function(r){
var t=r.reduce((function(e,r){return e[r.user.username]=r,e}),{})
;return e.forEach((function(e){e.ownerRealName=t[e.owner].user.realname})),e}))
}))},copyObject:f,copyObjects:function(r){
return e.all(r.sourceObjectRefs.map((function(e){return f({sourceObjectRef:e,
targetWorkspaceId:r.targetWorkspaceId})})))},createNarrative:function(e){
var r=["# "+e.title,"",'This narrative was created by the "Copy Object" dialog in the "Data Search" web app.',"","You will find your copied data in the Data panel on the left-hand side of the Narrative."].join("\n")
;return c.call("NarrativeService","create_new_narrative",{title:e.title,
includeIntroCell:0,markdown:r}).spread((function(e){return{
workspaceInfo:e.workspaceInfo,objectInfo:e.narrativeInfo}}))},
copyNarrative:function(e){return c.call("NarrativeService","copy_narrative",{
workspaceRef:[e.workspaceId,e.objectId].join("/"),newName:e.name
}).spread((function(e){return i({workspaceId:e.newWsId,objectId:e.newNarId})}))
},isStopWord:function(e){return n.warn.indexOf(e)>=0||n.ignore.indexOf(e)>=0}}}}
}));