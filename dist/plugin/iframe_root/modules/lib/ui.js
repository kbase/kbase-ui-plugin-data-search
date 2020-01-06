define(["kb_lib/html"],(function(e){"use strict"
;const a=e.tag,t=a("button"),l=a("span"),o=a("div");return{
buildDialog:function(e){let a,n,r;switch(e.type||"default"){case"warning":
n="exclamation-triangle",a="#8a6d3b";break;case"danger":case"error":n="frown-o",
a="#a94442";break;case"succcess":n="thumbs-up-o",a="##3c763d;";break;case"info":
n="info",a="#2e618d";break;case"primary":n=null,a="#2e618d";break;case"default":
default:n=null,a="#000"}r=n?l({class:"fa fa-"+n,style:{marginRight:"4px",
fontWeight:"bold",fontSize:"120%"}}):e.icon?l({class:"fa fa-"+e.icon,style:{
marginRight:"4px",fontWeight:"bold",fontSize:"120%"}}):"";const i=(e.buttons||[{
label:"Close",onClick:"onClose"}]).map((function(e){const a={click:e.onClick}
;return e.enable&&(a.enable=e.enable),e.disable&&(a.disable=e.disable),t({
type:"button",class:"btn btn-"+(e.type||"default"),dataBind:a},e.label)
})).join(" ");return o({},[o({style:{color:a,
backgroundColor:"rgba(255,255,255,1)",fontSize:"130%",fontWeight:"bold",
padding:"15px",borderBottom:"1px solid #e5e5e5"}},[r,e.title]),o({style:{
padding:"15px",minHeight:"10em",maxHeight:"85vh",overflowY:"auto",
backgroundColor:"rgba(255,255,255,1)"}},e.body),o({class:"clearfix",style:{
padding:"15px",textAlign:"right",backgroundColor:"rgba(255,255,255,1)",
borderTop:"1px solid #e5e5e5"}},o({class:"btn-toolbar pull-right",style:{
textAlign:"right"}},i))])},buildFullHeightDialog:function(e){let a,n,r
;switch(e.type||"default"){case"warning":n="exclamation-triangle",a="#8a6d3b"
;break;case"danger":case"error":n="frown-o",a="#a94442";break;case"succcess":
n="thumbs-up-o",a="##3c763d;";break;case"info":n="info",a="#2e618d";break
;case"primary":n=null,a="#2e618d";break;case"default":default:a="#000"}r=n?l({
class:"fa fa-"+n,style:{marginRight:"4px"}}):"";const i=(e.buttons||[{
label:"Close",onClick:"onClose"}]).map((function(e){return t({type:"button",
class:"btn btn-"+(e.type||"default"),dataBind:{click:e.onClick}},e.label)
})).join(" ");return o({style:{flex:"1 1 0px",display:"flex",
flexDirection:"column"}},[o({style:{color:a,
backgroundColor:"rgba(255,255,255,1)",fontSize:"130%",fontWeight:"bold",
padding:"15px",borderBottom:"1px solid #e5e5e5"}},[r,e.title]),o({style:{
padding:"15px",minHeight:"10em",backgroundColor:"rgba(255,255,255,1)",
overflowY:"auto",flex:"1 1 0px",display:"flex",flexDirection:"column"}
},e.body),o({class:"clearfix",style:{padding:"15px",textAlign:"right",
backgroundColor:"rgba(255,255,255,1)",borderTop:"1px solid #e5e5e5"}},o({
class:"btn-toolbar pull-right",style:{textAlign:"right"}},i))])},
bootstrapTextColor:function(e){let a;switch(e=e||"default"){case"warning":
a="#8a6d3b";break;case"danger":case"error":a="#a94442";break;case"succcess":
a="##3c763d;";break;case"primary":a="#2e618d";break;case"muted":a="#777";break
;case"default":default:a="#000"}return a},buildNA:function(){return l({style:{
fontStyle:"italic",color:"#AAA"}},"n/a")}}}));