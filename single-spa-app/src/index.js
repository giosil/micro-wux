import singleSpaHtml from "single-spa-html";

const htmlLifecycles = singleSpaHtml({
  template: '<div id="view-root"></div>'
});
export const bootstrap = htmlLifecycles.bootstrap;
export const mount = async (props) => {
	await htmlLifecycles.mount(props);
	WuxDOM.render(new APP.Main(), 'view-root');
};
export const unmount = async (props) => {
	await htmlLifecycles.unmount(props);
	WuxDOM.unmount('view-root');
};
function wuxRegister(t,e){if(t){var n
if(n="string"==typeof t?0==t.indexOf("#")?t.substring(1):t:t.id,!e)return wuxRegistry[n]
if("string"==typeof e){var i=wuxRegistry[n]
return i&&delete wuxRegistry[n],i}return wuxRegistry[n]=e,e}}var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++){e=arguments[n]
for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},__assign.apply(this,arguments)},__spreadArray=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var i,r=0,o=e.length;r<o;r++)!i&&r in e||(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r])
return t.concat(i||Array.prototype.slice.call(e))},__extends=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)}
return function(e,n){function i(){this.constructor=e}if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null")
t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),wuxRegistry={},WuxDOM=function(){function t(){}return t.onRender=function(e){t.onRenderHandlers.push(e)},t.onUnmount=function(e){t.onUnmountHandlers.push(e)},t.render=function(e,n,i,r){WUX.debug&&console.log("WuxDOM.render "+WUX.str(e)+" on "+WUX.str(n)+"..."),WUX.global.init(function(){n||(n=t.lastCtx?t.lastCtx:document.getElementById("view-root")),i&&i(n)
var o=t.mount(e,n)
if(t.lastCtx=o,r&&r(n),t.onRenderHandlers.length>0){for(var s=e instanceof WUX.WComponent?e:null,l={component:s,element:o,target:o.firstChild,type:"render"},u=0,h=t.onRenderHandlers;u<h.length;u++){(0,h[u])(l)}t.onRenderHandlers=[]}})},t.mount=function(e,n){if(n||(n=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(n)+"..."),null==e)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(n)+" -> invalid component")
var i="string"==typeof n?0==n.indexOf("#")?document.getElementById(n.substring(1)):document.getElementById(n):n
if(!i)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(n)+" -> context unavailable")
if(t.lastCtx=i,e instanceof WUX.WComponent)e.mount(i),wuxRegister(i,e)
else if(e instanceof HTMLElement)i.append(e)
else{var r=i.innerHTML
r||(r=""),i.innerHTML=r+e}return WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(n)+" completed."),i},t.unmount=function(e){e||(e=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+"...")
var n="string"==typeof e?0==e.indexOf("#")?document.getElementById(e.substring(1)):document.getElementById(e):e
if(!n)return void console.error("WuxDOM.unmount "+WUX.str(e)+" -> node unavailable")
var i=wuxRegister(n,"delete")
if(i&&i.unmount(),n.remove(),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+" completed."),t.onUnmountHandlers.length>0){for(var r={component:i,element:n,target:n.firstChild,type:"unmount"},o=0,s=t.onUnmountHandlers;o<s.length;o++){(0,s[o])(r)}t.onUnmountHandlers=[]}return n},t.replace=function(e,n){var i
if(n||(n=e,e=void 0),e)if("string"==typeof e){var r=WUX.getComponent(e)
r||(i=r.getContext(),r.unmount())}else e instanceof WUX.WComponent?(i=e.getContext(),e.unmount()):(i=e.parentElement)&&(i.innerHTML="")
else i=t.unmount()
return i||(i=document.getElementById("#view-root")),i?t.mount(n,i):void console.error("WuxDOM.replace "+WUX.str(i)+" -> node unavailable")},t.onRenderHandlers=[],t.onUnmountHandlers=[],t}(),WUX
!function(t){function e(t){if(t)return t instanceof HTMLElement?t.id:t instanceof A?t.id:"string"==typeof t&&t.indexOf("<")<0?0==t.indexOf("#")?t.substring(1):t:"object"!=typeof t||t.id?"":""+t.id}function n(t,n){var i=e(t)
if(!i)return""
var r=i.indexOf("-")
return r<0?i:n?i.substring(r+1):i.substring(0,r)}function i(t){var n=e(t)
if(!n)return""
var i=n.lastIndexOf("-")
if(i<0)return n
if(i>0){if("-"==n.charAt(i-1))return n.substring(i)}return n.substring(i+1)}function r(t){if(t)return wuxRegistry[t]}function o(t){return t&&t.parent?o(t.parent):t}function s(t,e){if(t){var n=wuxRegistry[t]
if(n)return n.setProps(e),n}}function l(t,e){if(!t)return e
var n=wuxRegistry[t]
if(!n)return e
var i=n.getProps()
return null==i?e:i}function u(t,e){if(t){var n=wuxRegistry[t]
if(n)return n.setState(e),n}}function h(t,e){if(!t)return e
var n=wuxRegistry[t]
if(!n)return e
var i=n.getState()
return null==i?e:i}function a(t){if(!t)return null
var e=t.lastIndexOf(".")
if(e>0){var n=t.substring(0,e)
if(window[n]){var i=t.substring(e+1)
for(var r in window[n])if(r==i)return new window[n][r]
return null}}var o=window[t]
return o&&o.prototype?Object.create(o.prototype):null}function p(t,n){if("string"==typeof t&&"string"==typeof n)return t==n
if("string"==typeof t||"string"==typeof n)return!1
var i=e(t),r=e(n)
return i&&r&&i==r}function d(t){if(!t)return["","",""]
if(" "==t)return["","&nbsp;",""]
var e=" "==t.charAt(0)?"&nbsp;":"",n=t.length>1&&" "==t.charAt(t.length-1)?"&nbsp;":"",i=t.trim().split("<>")
return!i||i.length<2?[e,t.trim(),n]:(e+=i[0],2==i.length?[e,i[1],""]:(n+=i[2],[e,i[1],n]))}function c(t){if(t instanceof A){var e=t.name,n=t.id
return e||(e="WComponent"),n?e+"("+n+")":e}return t instanceof HTMLElement?"HTMLElement#"+t.id:"object"==typeof t?JSON.stringify(t):t+""}function f(e){if(!e)return""
if(e instanceof A){var n=e.rootTag
if(n)return n.toLowerCase()
var i=e.getRoot()
return i?"":t.getTagName(i)}if(e instanceof HTMLElement)return e.tagName
var r=""+e
if("<"==r.charAt(0)){var o=r.indexOf(" ")
if(o<0&&(o=r.indexOf(">")),o>0){var n=r.substring(1,o).toLowerCase()
return"/"==n.charAt(n.length-1)?n.substring(0,n.length-1):n}return""}return"#"==r.charAt(0)?t.getTagName(document.getElementById(r.substring(1))):t.getTagName(document.getElementById(r))}function g(t){var e=""
return t?"string"==typeof t?t.indexOf(":")<=0?"":";"!=t.charAt(t.length-1)?t+";":t:(t.s&&(e+=b(t.s)),t.fs&&(e+="font-style:"+t.fs+";"),t.fw&&(e+="font-weight:"+t.fw+";"),t.tt&&(e+="text-transform:"+t.tt+";"),t.tr&&(e+="transform:"+t.tr+";"),t.fl&&(e+="float:"+t.fl+";"),t.cl&&(e+="clear:"+t.cl+";"),t.a&&(e+="text-align:"+t.a+";"),t.c&&(e+="color:"+t.c+";"),t.v&&(e+="vertical-align:"+t.v+";"),t.d&&(e+="display:"+t.d+";"),t.z&&(e+="z-index:"+t.z+";"),t.lh&&(e+="line-height:"+t.lh+";"),t.ps&&(e+="position:"+t.ps+";"),t.o&&(e+="overflow:"+t.o+";"),t.ox&&(e+="overflow-x:"+t.ox+";"),t.oy&&(e+="overflow-y:"+t.oy+";"),null!=t.op&&(e+="opacity:"+t.op+";"),null!=t.ol&&(e+="outline:"+t.ol+";"),t.cr&&(e+="cursor:"+t.cr+";"),t.cn&&(e+="content:"+t.cn+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-webkit"+t.k+";":"-webkit-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-moz"+t.k+";":"-moz-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-o"+t.k+";":"-o-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-ms"+t.k+";":"-ms-"+t.k+";"),t.bs&&(e+="box-shadow:"+t.bs+";"),t.bz&&(e+="box-sizing:"+t.bz+";"),t.b&&(e+=t.b.indexOf(":")>0?b("border"+t.b):t.b.match(/^(|none|inherit|initial|unset)$/)?"border:"+t.b+";":t.b.indexOf(" ")>0?"border:"+t.b+";":"border:1px solid "+t.b+";"),t.bc&&(e+="border-collapse:"+t.bc+";"),null!=t.br&&(e+="number"==typeof t.br?"border-radius:"+t.br+"px;":"border-radius:"+t.br+";"),null!=t.bsp&&(e+="number"==typeof t.bsp?"border-spacing:"+t.bsp+"px;":"border-spacing:"+t.bsp+";"),null!=t.m&&(e+="number"==typeof t.m?"margin:"+t.m+"px;":t.m.indexOf(":")>0?b("margin"+t.m):"margin:"+t.m+";"),null!=t.mt&&(e+="number"==typeof t.mt?"margin-top:"+t.mt+"px;":"margin-top:"+t.mt+";"),null!=t.mr&&(e+="number"==typeof t.mr?"margin-right:"+t.mr+"px;":"margin-right:"+t.mr+";"),null!=t.mb&&(e+="number"==typeof t.mb?"margin-bottom:"+t.mb+"px;":"margin-bottom:"+t.mb+";"),null!=t.ml&&(e+="number"==typeof t.ml?"margin-left:"+t.ml+"px;":"margin-left:"+t.ml+";"),null!=t.p&&(e+="number"==typeof t.p?"padding:"+t.p+"px;":t.p.indexOf(":")>0?b("padding"+t.p):"padding:"+t.p+";"),null!=t.pt&&(e+="number"==typeof t.pt?"padding-top:"+t.pt+"px;":"padding-top:"+t.pt+";"),null!=t.pr&&(e+="number"==typeof t.pr?"padding-right:"+t.pr+"px;":"padding-right:"+t.pr+";"),null!=t.pb&&(e+="number"==typeof t.pb?"padding-bottom:"+t.pb+"px;":"padding-bottom:"+t.pb+";"),null!=t.pl&&(e+="number"==typeof t.pl?"padding-left:"+t.pl+"px;":"padding-left:"+t.pl+";"),null!=t.f&&(e+="number"==typeof t.f?"font-size:"+t.f+"px;":t.f.indexOf(":")>0?b("font"+t.f):"font-size:"+t.f+";"),t.bg&&(e+=t.bg.indexOf(":")>0?b("background"+t.bg):t.bg.indexOf("url")>=0?"background:"+t.bg+";":"background-color:"+t.bg+";"),t.bgi&&(e+="background-image:"+t.bgi+";"),t.bgp&&(e+="background-position:"+t.bgp+";"),t.bgr&&(e+="background-repeat:"+t.bgr+";"),t.text&&(e+=t.text.indexOf(":")>0?b("text"+t.text):"text-decoration:"+t.text+";"),null!=t.l&&(e+="number"==typeof t.l?"left:"+t.l+"px;":"left:"+t.l+";"),null!=t.r&&(e+="number"==typeof t.r?"right:"+t.r+"px;":"right:"+t.r+";"),null!=t.t&&(e+="number"==typeof t.t?"top:"+t.t+"px;":"top:"+t.t+";"),null!=t.bt&&(e+="number"==typeof t.bt?"bottom:"+t.bt+"px;":"bottom:"+t.bt+";"),t.w&&(e+="number"==typeof t.w?"width:"+t.w+"px;":"width:"+t.w+";"),t.h&&(e+="number"==typeof t.h?"height:"+t.h+"px;":"height:"+t.h+";"),t.minw&&(e+="number"==typeof t.minw?"min-width:"+t.minw+"px;":"min-width:"+t.minw+";"),t.maxw&&(e+="number"==typeof t.maxw?"max-width:"+t.maxw+"px;":"max-width:"+t.maxw+";"),t.minh&&(e+="number"==typeof t.minh?"min-height:"+t.minh+"px;":"min-height:"+t.minh+";"),t.maxh&&(e+="number"==typeof t.maxh?"max-height:"+t.maxh+"px;":"max-height:"+t.maxh+";"),t.ws&&(e+="white-space:"+t.ws+";"),e):e}function m(t,e,n,i){return e&&n?t?i&&t.indexOf(e+":")>=0?b(t):b(t)+e+":"+n+";":e+":"+n+";":b(t)}function b(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return""
for(var n="",i={},r=!0,o=0;o<t.length;o++){var s=t[o]
s&&("string"==typeof s?(r||(n+=g(i),i={},r=!0),s.indexOf(":")>0&&(n+=s,";"!=s.charAt(s.length-1)&&(n+=";"))):(i=__assign(__assign({},i),s),r=!1))}return r||(n+=g(i)),n}function y(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
for(var n="",i=0;i<t.length;i++){var r=t[i]
if(r){var o="string"==typeof r?r:r.n
o&&(o.indexOf(":")>0||(n+=o+" "))}}return n.trim()}function v(t){if(!t)return""
if("string"==typeof t)return t
if("object"==typeof t){var e=""
for(var n in t)e+=n+'="'+t[n]+'" '
return e.trim()}return""}function x(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
var n=y.apply(void 0,t),i=b.apply(void 0,t),r=""
return n&&(r+=' class="'+n+'"'),i&&(r+=' style="'+i+'"'),r}function w(t,e){if(!t)return e
if(!e)return t
for(var n=t.split(" "),i=0,r=n;i<r.length;i++){if(r[i]==e)return t}return t+" "+e}function _(t,e){if(!t||!e)return t
for(var n=t.split(" "),i="",r=0,o=n;r<o.length;r++){var s=o[r]
s!=e&&(i+=s+" ")}return i.trim()}function W(t,e){if(!t)return e
if(!e)return t
for(var n=t.split(" "),i=!1,r="",o=0,s=n;o<s.length;o++){var l=s[o]
l!=e?r+=l+" ":i=!0}return i?r.trim():r.trim()+" "+e}function O(t,e){t&&t.setAttribute("class",w(t.getAttribute("class"),e))}function C(t,e){t&&t.setAttribute("class",_(t.getAttribute("class"),e))}function U(t,e){t&&t.setAttribute("class",W(t.getAttribute("class"),e))}function R(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n]
if(!t||!e||!e.length)return t
if(t instanceof A)t.css.apply(t,e)
else if(t instanceof HTMLElement){var i=b.apply(void 0,e),r=y.apply(void 0,e)
r&&O(t,r),i&&t.setAttribute("style",g(i))}return t}function S(e,n,i,r,o,s){e||(e="div")
var l,u
"string"==typeof i?i.indexOf(":")>0?u=i:l=i:i&&(i.n&&(l=i.n),u=t.style(i)),s&&(l?l+=" "+s:l=s)
var h="<"+e
o&&(h+=' id="'+o+'"'),l&&(h+=' class="'+l+'"'),u&&(h+=' style="'+u+'"')
var a=t.attributes(r)
a&&(h+=" "+a),h+=">"
var p=d(n)
return h+=p[1],"input"==e?p[0]+h+p[2]:(h+="</"+e+">",p[0]+h+p[2])}t.debug=!1,t.registry=[],t.version="1.0.0"
var A=function(){function e(e,n,i,r,o,s){if(this.mounted=!1,this.debug=t.debug,this.forceOnChange=!1,this.rootTag="div",this.subSeq=0,this.dontTrigger=!1,this._visible=!0,this._enabled=!0,this.handlers={},this.cuid=Math.floor(1e9*Math.random()),e instanceof HTMLElement)this.root=e,this.root&&(this.mounted=!0),this.debug&&console.log("["+c(this)+"] new wrapper root="+c(this.root))
else{"string"==typeof e&&(this.id="*"==e?"w"+this.cuid:e),this.name=n||"WComponent",this._classStyle=r
var l=t.cls(o)
l&&(this._classStyle=this._classStyle?this._classStyle+" "+l:l),this._style=t.style(o),this._attributes=t.attributes(s),this.debug&&console.log("["+c(this)+"] new"),this.debug&&console.log("["+c(this)+"] updateProps",i),this.updateProps(i)}}return Object.defineProperty(e.prototype,"visible",{get:function(){return this.internal?this.internal.visible:this._visible},set:function(t){this._visible=t,this.internal&&(this.internal.visible=t),this.root&&(this._visible?this.root.style.display="block":this.root.style.display="none")},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return this.internal?this.internal.enabled:this._enabled},set:function(t){this._enabled=t,this.internal&&(this.internal.enabled=t),this.root&&(this._enabled?this.root.removeAttribute("disabled"):this.root.setAttribute("disabled",""))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"style",{get:function(){return this.internal?this.internal.style:this._style},set:function(e){this._style=t.css(this._baseStyle,e),this.internal&&(this.internal.style=e),this.root&&this.root.setAttribute("style",this._style)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classStyle",{get:function(){return this.internal?this.internal.classStyle:this._classStyle},set:function(e){this.internal&&(this.internal.classStyle=e)
var n=!1,i=!1
e&&e.length>1&&"!"==e.charAt(0)?(e=e.substring(1),n=!0):e&&e.length>1&&"?"==e.charAt(0)&&(e=e.substring(1),i=!0),this._classStyle=n?t.removeClass(this._classStyle,e):i?t.toggleClass(this._classStyle,e):t.cls(this._baseClass,e),this.root&&(n?C(this.root,e):i?U(this.root,e):this.root.setAttribute("class",this._classStyle))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"attributes",{get:function(){return this.internal?this.internal.attributes:this._attributes},set:function(t){this._attributes=t,this.internal&&(this.internal.attributes=t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"tooltip",{get:function(){return this.internal?this.internal.tooltip:this._tooltip},set:function(t){this._tooltip=t,this.internal&&(this.internal.tooltip=t),this.root&&this.root.setAttribute("title",this._tooltip)},enumerable:!1,configurable:!0}),e.prototype.css=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return this
var n=y.apply(void 0,t)
n&&(this.classStyle=n)
var i=b.apply(void 0,t)
return i&&(this.style=i),this},e.prototype.focus=function(){return this.internal&&this.internal.focus(),this.root&&this.root.focus(),this},e.prototype.blur=function(){return this.internal&&this.internal.blur(),this.root&&this.root.blur(),this},e.prototype.forceUpdate=function(t){return this.update(this.props,this.state,!1,!1,!0,t),this},e.prototype.getContext=function(){return this.context},e.prototype.getRoot=function(){if(!this.root&&this.internal)return this.internal.getRoot()
if(!this.root){if(this.id){var t=document.getElementById(this.id)
if(t)return t}return this.context}return this.root},e.prototype.getState=function(){return this.state},e.prototype.setState=function(t,e,n){return this.debug&&console.log("["+c(this)+"] setState",t),this.update(this.props,t,!1,!0,this.forceOnChange||e,n),this},e.prototype.getProps=function(){return this.props},e.prototype.setProps=function(t,e,n){return this.debug&&console.log("["+c(this)+"] setProps",t),this.update(t,this.state,!0,!1,this.forceOnChange||e,n),this},e.prototype.on=function(t,e){if(!t)return this
for(var n=t.split(" "),i=0,r=n;i<r.length;i++){var o=r[i]
this.handlers[o]||(this.handlers[o]=[]),this.handlers[o].push(e)}return this.internal&&this.internal.on(t,e),this.root&&this.root.addEventListener(t,e),this},e.prototype.off=function(t){if(t)for(var e=t.split(" "),n=0,i=e;n<i.length;n++){var r=i[n]
if(this.root)for(var o=this.handlers[r],s=0,l=o;s<l.length;s++){var u=l[s]
this.root.removeEventListener(r,u)}delete this.handlers[r]}else this.handlers={}
return this.internal&&this.internal.off(t),this},e.prototype.trigger=function(t){for(var e,n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i]
if(this.debug&&console.log("["+c(this)+"] trigger",t,n),t){var r=n&&n.length>0?n[0]:void 0
if("_"==t.charAt(0)||"mount"==t||"unmount"==t||"statechange"==t||"propschange"==t){if(void 0!==r&&("statechange"==t?this.state!=n[0]&&(this.state=n[0],this.debug&&console.log("["+c(this)+"] trigger set state",this.state)):"propschange"==t&&this.props!=n[0]&&(this.props=n[0],this.debug&&console.log("["+c(this)+"] trigger set props",this.props))),!this.handlers||!this.handlers[t])return this
for(var o=this.createEvent(t,r),s=0,l=this.handlers[t];s<l.length;s++){(0,l[s])(o)}}else if(this.root){this.debug&&console.log("["+c(this)+"] trigger "+t+" on root="+c(this.root))
var u=new Event(t)
u=__assign(__assign({},u),n),this.root.dispatchEvent(u)}return this.internal&&(this.debug&&console.log("["+c(this)+"] trigger "+t+" on internal="+c(this.internal)),(e=this.internal).trigger.apply(e,__spreadArray([t],n,!1))),this}},e.prototype.unmount=function(){if(this.debug&&console.log("["+c(this)+"] unmount ctx="+c(this.context)+" root="+c(this.root),this.state,this.props),this.componentWillUnmount(),this.internal&&this.internal.unmount(),this.internal=void 0,this.root&&this.root.remove(),this.root=void 0,this.id){var e=t.registry.indexOf(this.id)
e>=0&&t.registry.splice(e,1)}return this.mounted=!1,wuxRegister(this.id,"delete"),this.trigger("unmount"),this},e.prototype.mount=function(n){this.debug&&console.log("["+c(this)+"] mount ctx="+c(n)+" root="+c(this.root),this.state,this.props),this.id||this.root&&(this.id=this.root.id),n&&(this.context=n),this.context||this.root&&(this.context=this.root.parentElement,this.context||(this.context=this.root))
try{if(this.mounted&&this.unmount(),this.mounted=!1,!this.context){var i=document.getElementById(this.id)
i&&(this.context=i)}if(this.debug&&console.log("["+c(this)+"] componentWillMount ctx="+c(n)+" root="+c(this.root)),this.componentWillMount(),this.context){this.debug&&console.log("["+c(this)+"] render ctx="+c(n)+" root="+c(this.root))
var r=this.render()
if(void 0!==r&&null!==r)if(r instanceof e){if(this.debug&&console.log("["+c(this)+"] render -> "+c(r)),this.internal=r,r.parent||(r.parent=this),r.mount(this.context),!this.root)if(this.id){var i=document.getElementById(this.id)
this.root=i||this.internal.getRoot()}else this.root=this.context}else if(r instanceof HTMLElement)this.context.append(r),this.root||(this.root=r)
else{var o=this.context.innerHTML
o||(o=""),this.context.innerHTML=o+r
var s=this.context.lastChild
s instanceof HTMLElement&&(this.root=s),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}else this.internal&&this.internal.mount(this.context),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}if(this._visible||(this.internal?this.internal.visible=!1:this.root.style.display="none"),this._enabled||(this.internal?this.internal.enabled=!1:this.root.setAttribute("disabled","")),this.debug&&console.log("["+c(this)+"] componentDidMount ctx="+c(n)+" root="+c(this.root)),this.componentDidMount(),this.root)for(var l in this.handlers)if(l&&"_"!=l.charAt(0)&&"mount"!=l&&"unmount"!=l&&"statechange"!=l&&"propschange"!=l)for(var u=0,h=this.handlers[l];u<h.length;u++){var a=h[u]
this.root.addEventListener(l,a)}if(wuxRegister(this.root,this),this.mounted=!0,this.id&&(!this.internal||this.internal.id!=this.id)){if(t.registry.indexOf(this.id)>=0){var p=t.getComponent(this.id)
p&&p.cuid!=this.cuid&&console.error("["+c(this)+"] id already used by "+c(p))}else t.registry.push(this.id)}this.trigger("mount")}catch(t){var d=c(this)+" "+c(this.context)
console.error("["+c(this)+"] mount error "+d,t),this.componentDidCatch(t,d)}return this},e.prototype.componentWillUnmount=function(){},e.prototype.componentWillMount=function(){},e.prototype.render=function(){return this.buildRoot(this.rootTag)},e.prototype.componentDidMount=function(){},e.prototype.componentDidCatch=function(t,e){},e.prototype.shouldComponentUpdate=function(t,e){return"object"==typeof t||"object"==typeof e||(this.props!=t||this.state!=e)},e.prototype.componentWillUpdate=function(t,e){},e.prototype.componentDidUpdate=function(t,e){},e.prototype.updateProps=function(t){this.props=t},e.prototype.updateState=function(t){this.state=t},e.prototype.update=function(t,e,n,i,r,o){void 0===r&&(r=!1),this.debug&&console.log("["+c(this)+"] update",t,e,"propsChange="+n+",stateChange="+i+",force="+r),t=void 0===t?this.props:t
var s=this.props,l=this.state
if(this.dontTrigger=!1,this.mounted){if(r||this.shouldComponentUpdate(t,e)){try{this.debug&&console.log("["+c(this)+"] componentWillUpdate",t,e),this.componentWillUpdate(t,e),n&&(this.debug&&console.log("["+c(this)+"] updateProps",t),this.updateProps(t)),i&&(this.debug&&console.log("["+c(this)+"] updateState",e),this.updateState(e)),r&&this.mount(),this.debug&&console.log("["+c(this)+"] componentDidUpdate",s,l),this.componentDidUpdate(s,l),n&&!this.dontTrigger&&this.trigger("propschange"),i&&!this.dontTrigger&&this.trigger("statechange")}catch(t){return this.componentDidCatch(t,c(this)+"|"+c(this.context)),!1}o&&o()}}else n&&(this.debug&&console.log("["+c(this)+"] updateProps",t),this.updateProps(t),this.dontTrigger||this.trigger("propschange")),i&&(this.debug&&console.log("["+c(this)+"] updateState",e),this.updateState(e),this.dontTrigger||this.trigger("statechange"))
return!0},e.prototype.createEvent=function(t,e){var n=this.root?this.root.firstChild:this.root
return{component:this,element:this.root,target:n,type:t,data:e}},e.prototype.shouldBuildRoot=function(){if(this.internal)return!1
if(this.root)return!1
if(this.context){var t=this.context.id
if(!t&&t==this.id)return!1}return!0},e.prototype.buildRoot=function(t,e,n,i,r,o,s){return this.debug&&console.log("["+c(this)+"] buildRoot",t,e,n,i,r,o,s),this.shouldBuildRoot()?(this.debug&&console.log("["+c(this)+"] shouldBuildRoot() -> true"),this.build(t,e,n,i,r,o,s)):void(this.debug&&console.log("["+c(this)+"] shouldBuildRoot() -> false"))},e.prototype.build=function(e,n,i,r,o,s,l){e||(e="div"),void 0===r&&(r=this._classStyle),void 0===o&&(o=this._style),void 0===s&&(s=this._attributes),void 0===l&&(l=this.id)
var u="<"+e
l&&(u+=' id="'+l+'"'),r&&(u+=' class="'+r+'"'),o&&(u+=' style="'+o+'"')
var h=t.attributes(s)
h&&(u+=" "+h)
var a=t.attributes(i)
a&&(u+=" "+a),u+=">"
var p=d(null==n?this.make():n)
return u+=p[1],"input"==e?p[0]+u+p[2]:(u+="</"+e+">",p[0]+u+p[2])},e.prototype.make=function(){return""},e.prototype.subId=function(t,n){if(t instanceof e){var i=t.id
return i&&this.id?0!=i.indexOf(this.id+"-")?i:i.substring(this.id.length+1):i}return this.id&&"*"!=this.id||(this.id="w"+this.cuid),t&&"*"!=t||(t=(this.subSeq++).toString()),n||0==n?this.id+"-"+t+"-"+n:this.id+"-"+t},e.prototype.ripId=function(t){return t&&this.id&&0==t.indexOf(this.id)&&t.length>this.id.length+1?t.substring(this.id.length+1):t},e.prototype.transferTo=function(t,e,n){return this.debug&&console.log("["+c(this)+"] transferTo "+c(t)),!!t&&(t.setState(this.getState(),e,n),!0)},e}()
t.WComponent=A,t.getId=e,t.firstSub=n,t.lastSub=i,t.getComponent=r,t.getRootComponent=o,t.setProps=s,t.getProps=l,t.setState=u,t.getState=h,t.newInstance=a,t.same=p,t.divide=d,t.str=c,t.getTagName=f,t.style=g,t.addStyle=m,t.css=b,t.cls=y,t.attributes=v,t.buildCss=x,t.addClass=w,t.removeClass=_,t.toggleClass=W,t.addClassOf=O,t.removeClassOf=C,t.toggleClassOf=U,t.setCss=R,t.build=S}(WUX||(WUX={}))
var WUX
!function(t){var e={},n={}
t.global={locale:"it",init:function(e){t.debug&&console.log("[WUX] global.init..."),t.debug&&console.log("[WUX] global.init completed"),e&&e()},setData:function(t,i,r){if(void 0===r&&(r=!1),t||(t="global"),e[t]=i,!r&&n[t])for(var o=0,s=n[t];o<s.length;o++){var l=s[o]
l(i)}},getData:function(t,n){t||(t="global")
var i=e[t]
return null==i?n:i},onDataChanged:function(t,e){t||(t="global"),n[t]||(n[t]=[]),n[t].push(e)}}}(WUX||(WUX={}))
var WUX
!function(t){var e=function(t){function e(e){return t.call(this,null,"WHtml",e)||this}return __extends(e,t),e.prototype.render=function(){return this.props?("<"!=this.props.charAt(0)&&(this.props="<span>"+this.props+"</span>"),this.props):"<span></span>"},e}(t.WComponent)
t.WHtml=e
var n=function(e){function n(n,i,r,o,s,l){var u=e.call(this,n||"*","WContainer",l,i,t.style(r),o)||this
return u.comp=[],u.corc=[],u.grid=[],u.rootTag=s?"span":"div",u}return __extends(n,e),n.prototype.addRow=function(e,n){e||(e="row")
var i=[],r=t.style(n)
return r&&(e+="^"+r),i.push(e),this.grid.push(i),this},n.prototype.addCol=function(e,n){e||(e="col-12"),isNaN(parseInt(e))||(e="col-"+e),this.grid.length||this.addRow()
var i=this.grid[this.grid.length-1],r=t.style(n)
return r&&(e+="^"+r),i.push(e),this},n.prototype.add=function(t){if(this.grid.length||this.addRow().addCol(),!t)return this
var e=this.grid.length-1,n=this.grid[e],i=n.length-1
return this.comp.push(t),this.corc.push(this.subId(e+"_"+i)),this},n.prototype.render=function(){var t="",e=this.grid.length
if(e)for(var n=0;n<e;n++){var i=this.grid[n],r=i.length
if(r){t+="<div "+this.cs(i[0])+">"
for(var o=1;o<r;o++)t+='<div id="'+this.subId(n+"_"+o)+'" '+this.cs(i[o])+"></div>"
t+="</div>"}}return this.buildRoot(this.rootTag,t)},n.prototype.componentDidMount=function(){for(var t=0;t<this.comp.length;t++){var e=this.comp[t],n=document.getElementById(this.corc[t])
n&&e.mount(n)}},n.prototype.componentWillUnmount=function(){for(var t=0,e=this.comp;t<e.length;t++){e[t].unmount()}},n.prototype.cs=function(t){if(!t)return""
var e=t.indexOf("^")
return e<0?'class="'+t+'"':'class="'+t.substring(0,e)+'" style="'+t.substring(e+1)+'"'},n}(t.WComponent)
t.WContainer=n}(WUX||(WUX={}))
var APP
!function(n){var t=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.render=function(){return"<div>Hello World.</div>"},t}(WUX.WComponent)
n.Main=t}(APP||(APP={}))
