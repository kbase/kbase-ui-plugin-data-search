require.config({baseUrl:"./modules",paths:{bluebird:"vendor/bluebird/bluebird",
bootstrap:"vendor/bootstrap/bootstrap",
bootstrap_css:"vendor/bootstrap/css/bootstrap",css:"vendor/require-css/css",
datatables:"vendor/datatables/jquery.dataTables",
datatables_css:"vendor/datatables/jquery.dataTables",
datatables_bootstrap_css:"vendor/datatables-bootstrap3-plugin/datatables-bootstrap3",
datatables_bootstrap:"vendor/datatables-bootstrap3-plugin/datatables-bootstrap3",
font_awesome:"vendor/font-awesome/css/font-awesome",
highlight_css:"vendor/highlightjs/default",
highlight:"vendor/highlightjs/highlight.pack",jquery:"vendor/jquery/jquery",
"js-yaml":"vendor/js-yaml/js-yaml",kb_common:"vendor/kbase-common-js",
kb_common_ts:"vendor/kbase-common-ts",kb_lib:"vendor/kbase-common-es6",
kb_service:"vendor/kbase-service-clients-js",
kb_knockout:"vendor/kbase-knockout-extensions-es6",
"knockout-arraytransforms":"vendor/knockout-arraytransforms/knockout-arraytransforms",
"knockout-projections":"vendor/knockout-projections/knockout-projections",
"knockout-switch-case":"vendor/knockout-switch-case/knockout-switch-case",
"knockout-validation":"vendor/knockout-validation/knockout.validation",
"knockout-mapping":"vendor/bower-knockout-mapping/knockout.mapping",
knockout:"vendor/knockout/knockout",marked:"vendor/marked/marked",
moment:"vendor/moment/moment",numeral:"vendor/numeral/numeral",
md5:"vendor/spark-md5/spark-md5",text:"vendor/requirejs-text/text",
yaml:"vendor/requirejs-yaml/yaml",uuid:"vendor/pure-uuid/uuid",
lodash:"vendor/lodash/lodash"},shim:{bootstrap:{
deps:["jquery","css!bootstrap_css"]},highlight:{deps:["css!highlight_css"]}},
map:{"*":{underscore:"lodash"}}
}),require(["bluebird","kbaseUI/integration","kbaseUI/dispatcher","kb_knockout/load","yaml!./config.yml","bootstrap","css!font_awesome"],(o,e,t,a,s)=>{
"use strict";o.try(()=>{const o=new e({rootWindow:window
}),r=document.getElementById("root");let n=null;return a.load().then(o=>{
o.options.deferUpdates=!0}).then(()=>o.start()).then(()=>{
s.install.widgets.forEach(e=>{o.runtime.widgetManager.addWidget(e)})
}).then(()=>(n=new t({runtime:o.runtime,node:r,panels:[{module:"panel",
view:"search",type:"factory"}]}),n.start())).then(e=>{
o.onNavigate(({path:o,params:t})=>{let a
;t.view&&(a=t.view),o&&o.length&&(a=o[0]),e.dispatch({view:a,path:o,params:t})
}),o.started()})}).catch(o=>{console.error("ERROR",o)})});