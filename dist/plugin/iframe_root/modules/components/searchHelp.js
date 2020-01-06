define(["kb_knockout/registry","kb_lib/html","../lib/ui","yaml!../data/help.yml"],(function(e,t,o,n){
"use strict";var i=t.tag,l=i("div"),a=i("span"),r=t.makeStyles({markdown:{
css:{},inner:{blockquote:{fontSize:"inherit",marginLeft:"1em",paddingLeft:"1em",
borderLeft:"3px silver solid"},p:{maxWidth:"50em"},h1:{marginTop:"0",
marginBottom:"0",fontWeight:"bold",fontSize:"150%"},h2:{marginTop:"1em",
marginBottom:"0",fontWeight:"bold",fontSize:"133%"},h3:{marginTop:"1em",
marginBottom:"0",fontWeight:"bold",fontSize:"120%"},h4:{marginTop:"1em",
marginBottom:"0",fontWeight:"bold",textDecoration:"underline",fontSize:"100%"},
h5:{marginTop:"1em",marginBottom:"0",fontWeight:"bold",fontSize:"100%"}}}})
;function m(e){return{title:"Search Help",buttons:[{title:"Close",
action:function(){e.onClose()}}],helpDb:n,onClose:e.onClose}}
return e.registerComponent((function(){return{viewModel:m,
template:o.buildDialog({title:a({dataBind:{text:"title"}}),
icon:"question-circle",body:l({class:r.classes.markdown,dataBind:{component:{
name:'"generic/help"',params:{helpDb:"helpDb",onClose:"onClose"}}}})}),
stylesheet:r.sheet}}))}));