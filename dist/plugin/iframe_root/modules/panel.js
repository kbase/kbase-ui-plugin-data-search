define(["knockout","kb_knockout/lib/generators","./components/main","./lib/types","./lib/nanoBus"],(function(e,n,r,a,i){
"use strict";return{make:function(t){var l,u,s,o=t.runtime,d=a.make({runtime:o
}),p=i.make();function m(){return{appBus:p,runtime:o,types:d,initialQuery:s,
labels:{narrative:{singular:"Narrative",plural:"Narratives"},genome:{
singular:"Genome",plural:"Genomes"},assembly:{singular:"Assembly",
plural:"Assemblies"},pairedendlibrary:{singular:"Paired End Library",
plural:"Paired End Libraries"},singleendlibrary:{singular:"Single End Library",
plural:"Single End Libraries"},fbamodel:{singular:"FBA Model",
plural:"FBA Models"},media:{singular:"Media",plural:"Media"},taxon:{
singular:"Taxon",plural:"Taxa"},tree:{singular:"Tree",plural:"Trees"}}}}
return Object.freeze({attach:function(e){
return(u=(l=e).appendChild(document.createElement("div"))).style.flex="1 1 0px",
u.style.display="flex",
u.style["flex-direction"]="column",u.setAttribute("data-k-b-testhook-plugin","data-search"),
null},start:function(a){return s=a.q,d.start().then((function(){return p.start()
})).then((function(){u.innerHTML=n.component({name:r.name(),params:{
initialQuery:"initialQuery"}}).join(""),e.applyBindings(m,u,(function(e){
e.runtime=o})),o.send("ui","setTitle","Data Search (BETA)")}))},stop:function(){
return p.stop()},detach:function(){l&&u&&l.removeChild(u)}})}}}));