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
function wuxRegister(t,e){if(t){var i
if(i="string"==typeof t?0==t.indexOf("#")?t.substring(1):t:t.id,!e)return wuxRegistry[i]
if("string"==typeof e){var n=wuxRegistry[i]
return n&&delete wuxRegistry[i],n}return wuxRegistry[i]=e,e}}var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++){e=arguments[i]
for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},__assign.apply(this,arguments)},__spreadArray=this&&this.__spreadArray||function(t,e,i){if(i||2===arguments.length)for(var n,r=0,o=e.length;r<o;r++)!n&&r in e||(n||(n=Array.prototype.slice.call(e,0,r)),n[r]=e[r])
return t.concat(n||Array.prototype.slice.call(e))},__extends=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)}
return function(e,i){function n(){this.constructor=e}if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null")
t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),wuxRegistry={},WuxDOM=function(){function t(){}return t.onRender=function(e){t.onRenderHandlers.push(e)},t.onUnmount=function(e){t.onUnmountHandlers.push(e)},t.render=function(e,i,n,r){WUX.debug&&console.log("WuxDOM.render "+WUX.str(e)+" on "+WUX.str(i)+"..."),WUX.global.init(function(){i||(i=t.lastCtx?t.lastCtx:document.getElementById("view-root")),n&&n(i)
var o=t.mount(e,i)
if(t.lastCtx=o,r&&r(i),t.onRenderHandlers.length>0){for(var s=e instanceof WUX.WComponent?e:null,h={component:s,element:o,target:o.firstChild,type:"render"},l=0,a=t.onRenderHandlers;l<a.length;l++){(0,a[l])(h)}t.onRenderHandlers=[]}})},t.mount=function(e,i){if(i||(i=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(i)+"..."),null==e)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(i)+" -> invalid component")
var n="string"==typeof i?0==i.indexOf("#")?document.getElementById(i.substring(1)):document.getElementById(i):i
if(!n)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(i)+" -> context unavailable")
if(t.lastCtx=n,e instanceof WUX.WComponent)e.mount(n),wuxRegister(n,e)
else if(e instanceof HTMLElement)n.append(e)
else{var r=n.innerHTML
r||(r=""),n.innerHTML=r+e}return WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(i)+" completed."),n},t.unmount=function(e){e||(e=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+"...")
var i="string"==typeof e?0==e.indexOf("#")?document.getElementById(e.substring(1)):document.getElementById(e):e
if(!i)return void console.error("WuxDOM.unmount "+WUX.str(e)+" -> node unavailable")
var n=wuxRegister(i,"delete")
if(n&&n.unmount(),i.remove(),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+" completed."),t.onUnmountHandlers.length>0){for(var r={component:n,element:i,target:i.firstChild,type:"unmount"},o=0,s=t.onUnmountHandlers;o<s.length;o++){(0,s[o])(r)}t.onUnmountHandlers=[]}return i},t.replace=function(e,i){var n
if(i||(i=e,e=void 0),e)if("string"==typeof e){var r=WUX.getComponent(e)
r||(n=r.getContext(),r.unmount())}else e instanceof WUX.WComponent?(n=e.getContext(),e.unmount()):(n=e.parentElement)&&(n.innerHTML="")
else n=t.unmount()
return n||(n=document.getElementById("#view-root")),n?t.mount(i,n):void console.error("WuxDOM.replace "+WUX.str(n)+" -> node unavailable")},t.onRenderHandlers=[],t.onUnmountHandlers=[],t}(),WUX
!function(t){function e(t){if(t)return t instanceof HTMLElement?t.id:t instanceof A?t.id:"string"==typeof t&&t.indexOf("<")<0?0==t.indexOf("#")?t.substring(1):t:"object"!=typeof t||t.id?"":""+t.id}function i(t,i){var n=e(t)
if(!n)return""
var r=n.indexOf("-")
return r<0?n:i?n.substring(r+1):n.substring(0,r)}function n(t){var i=e(t)
if(!i)return""
var n=i.lastIndexOf("-")
if(n<0)return i
if(n>0){if("-"==i.charAt(n-1))return i.substring(n)}return i.substring(n+1)}function r(t){if(t)return wuxRegistry[t]}function o(t){return t&&t.parent?o(t.parent):t}function s(t,e){if(t){var i=wuxRegistry[t]
if(i)return i.setProps(e),i}}function h(t,e){if(!t)return e
var i=wuxRegistry[t]
if(!i)return e
var n=i.getProps()
return null==n?e:n}function l(t,e){if(t){var i=wuxRegistry[t]
if(i)return i.setState(e),i}}function a(t,e){if(!t)return e
var i=wuxRegistry[t]
if(!i)return e
var n=i.getState()
return null==n?e:n}function u(t){if(!t)return null
var e=t.lastIndexOf(".")
if(e>0){var i=t.substring(0,e)
if(window[i]){var n=t.substring(e+1)
for(var r in window[i])if(r==n)return new window[i][r]
return null}}var o=window[t]
return o&&o.prototype?Object.create(o.prototype):null}function d(t,i){if("string"==typeof t&&"string"==typeof i)return t==i
if("string"==typeof t||"string"==typeof i)return!1
var n=e(t),r=e(i)
return n&&r&&n==r}function c(t){if(!t)return["","",""]
if(" "==t)return["","&nbsp;",""]
var e=" "==t.charAt(0)?"&nbsp;":"",i=t.length>1&&" "==t.charAt(t.length-1)?"&nbsp;":"",n=t.trim().split("<>")
return!n||n.length<2?[e,t.trim(),i]:(e+=n[0],2==n.length?[e,n[1],""]:(i+=n[2],[e,n[1],i]))}function p(t){if(t instanceof A){var e=t.name,i=t.id
return e||(e="WComponent"),i?e+"("+i+")":e}return t instanceof HTMLElement?"HTMLElement#"+t.id:"object"==typeof t?JSON.stringify(t):t+""}function f(e){if(!e)return""
if(e instanceof A){var i=e.rootTag
if(i)return i.toLowerCase()
var n=e.getRoot()
return n?"":t.getTagName(n)}if(e instanceof HTMLElement)return e.tagName
var r=""+e
if("<"==r.charAt(0)){var o=r.indexOf(" ")
if(o<0&&(o=r.indexOf(">")),o>0){var i=r.substring(1,o).toLowerCase()
return"/"==i.charAt(i.length-1)?i.substring(0,i.length-1):i}return""}return"#"==r.charAt(0)?t.getTagName(document.getElementById(r.substring(1))):t.getTagName(document.getElementById(r))}function g(t){var e=""
return t?"string"==typeof t?t.indexOf(":")<=0?"":";"!=t.charAt(t.length-1)?t+";":t:(t.s&&(e+=y(t.s)),t.fs&&(e+="font-style:"+t.fs+";"),t.fw&&(e+="font-weight:"+t.fw+";"),t.tt&&(e+="text-transform:"+t.tt+";"),t.tr&&(e+="transform:"+t.tr+";"),t.fl&&(e+="float:"+t.fl+";"),t.cl&&(e+="clear:"+t.cl+";"),t.a&&(e+="text-align:"+t.a+";"),t.c&&(e+="color:"+t.c+";"),t.v&&(e+="vertical-align:"+t.v+";"),t.d&&(e+="display:"+t.d+";"),t.z&&(e+="z-index:"+t.z+";"),t.lh&&(e+="line-height:"+t.lh+";"),t.ps&&(e+="position:"+t.ps+";"),t.o&&(e+="overflow:"+t.o+";"),t.ox&&(e+="overflow-x:"+t.ox+";"),t.oy&&(e+="overflow-y:"+t.oy+";"),null!=t.op&&(e+="opacity:"+t.op+";"),null!=t.ol&&(e+="outline:"+t.ol+";"),t.cr&&(e+="cursor:"+t.cr+";"),t.cn&&(e+="content:"+t.cn+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-webkit"+t.k+";":"-webkit-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-moz"+t.k+";":"-moz-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-o"+t.k+";":"-o-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-ms"+t.k+";":"-ms-"+t.k+";"),t.bs&&(e+="box-shadow:"+t.bs+";"),t.bz&&(e+="box-sizing:"+t.bz+";"),t.b&&(e+=t.b.indexOf(":")>0?y("border"+t.b):t.b.match(/^(|none|inherit|initial|unset)$/)?"border:"+t.b+";":t.b.indexOf(" ")>0?"border:"+t.b+";":"border:1px solid "+t.b+";"),t.bc&&(e+="border-collapse:"+t.bc+";"),null!=t.br&&(e+="number"==typeof t.br?"border-radius:"+t.br+"px;":"border-radius:"+t.br+";"),null!=t.bsp&&(e+="number"==typeof t.bsp?"border-spacing:"+t.bsp+"px;":"border-spacing:"+t.bsp+";"),null!=t.m&&(e+="number"==typeof t.m?"margin:"+t.m+"px;":t.m.indexOf(":")>0?y("margin"+t.m):"margin:"+t.m+";"),null!=t.mt&&(e+="number"==typeof t.mt?"margin-top:"+t.mt+"px;":"margin-top:"+t.mt+";"),null!=t.mr&&(e+="number"==typeof t.mr?"margin-right:"+t.mr+"px;":"margin-right:"+t.mr+";"),null!=t.mb&&(e+="number"==typeof t.mb?"margin-bottom:"+t.mb+"px;":"margin-bottom:"+t.mb+";"),null!=t.ml&&(e+="number"==typeof t.ml?"margin-left:"+t.ml+"px;":"margin-left:"+t.ml+";"),null!=t.p&&(e+="number"==typeof t.p?"padding:"+t.p+"px;":t.p.indexOf(":")>0?y("padding"+t.p):"padding:"+t.p+";"),null!=t.pt&&(e+="number"==typeof t.pt?"padding-top:"+t.pt+"px;":"padding-top:"+t.pt+";"),null!=t.pr&&(e+="number"==typeof t.pr?"padding-right:"+t.pr+"px;":"padding-right:"+t.pr+";"),null!=t.pb&&(e+="number"==typeof t.pb?"padding-bottom:"+t.pb+"px;":"padding-bottom:"+t.pb+";"),null!=t.pl&&(e+="number"==typeof t.pl?"padding-left:"+t.pl+"px;":"padding-left:"+t.pl+";"),null!=t.f&&(e+="number"==typeof t.f?"font-size:"+t.f+"px;":t.f.indexOf(":")>0?y("font"+t.f):"font-size:"+t.f+";"),t.bg&&(e+=t.bg.indexOf(":")>0?y("background"+t.bg):t.bg.indexOf("url")>=0?"background:"+t.bg+";":"background-color:"+t.bg+";"),t.bgi&&(e+="background-image:"+t.bgi+";"),t.bgp&&(e+="background-position:"+t.bgp+";"),t.bgr&&(e+="background-repeat:"+t.bgr+";"),t.text&&(e+=t.text.indexOf(":")>0?y("text"+t.text):"text-decoration:"+t.text+";"),null!=t.l&&(e+="number"==typeof t.l?"left:"+t.l+"px;":"left:"+t.l+";"),null!=t.r&&(e+="number"==typeof t.r?"right:"+t.r+"px;":"right:"+t.r+";"),null!=t.t&&(e+="number"==typeof t.t?"top:"+t.t+"px;":"top:"+t.t+";"),null!=t.bt&&(e+="number"==typeof t.bt?"bottom:"+t.bt+"px;":"bottom:"+t.bt+";"),t.w&&(e+="number"==typeof t.w?"width:"+t.w+"px;":"width:"+t.w+";"),t.h&&(e+="number"==typeof t.h?"height:"+t.h+"px;":"height:"+t.h+";"),t.minw&&(e+="number"==typeof t.minw?"min-width:"+t.minw+"px;":"min-width:"+t.minw+";"),t.maxw&&(e+="number"==typeof t.maxw?"max-width:"+t.maxw+"px;":"max-width:"+t.maxw+";"),t.minh&&(e+="number"==typeof t.minh?"min-height:"+t.minh+"px;":"min-height:"+t.minh+";"),t.maxh&&(e+="number"==typeof t.maxh?"max-height:"+t.maxh+"px;":"max-height:"+t.maxh+";"),t.ws&&(e+="white-space:"+t.ws+";"),e):e}function b(t,e,i,n){return e&&i?t?n&&t.indexOf(e+":")>=0?y(t):y(t)+e+":"+i+";":e+":"+i+";":y(t)}function y(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return""
for(var i="",n={},r=!0,o=0;o<t.length;o++){var s=t[o]
s&&("string"==typeof s?(r||(i+=g(n),n={},r=!0),s.indexOf(":")>0&&(i+=s,";"!=s.charAt(s.length-1)&&(i+=";"))):(n=__assign(__assign({},n),s),r=!1))}return r||(i+=g(n)),i}function m(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
for(var i="",n=0;n<t.length;n++){var r=t[n]
if(r){var o="string"==typeof r?r:r.n
o&&(o.indexOf(":")>0||(i+=o+" "))}}return i.trim()}function v(t){if(!t)return""
if("string"==typeof t)return t
if("object"==typeof t){var e=""
for(var i in t)e+=i+'="'+t[i]+'" '
return e.trim()}return""}function x(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
var i=m.apply(void 0,t),n=y.apply(void 0,t),r=""
return i&&(r+=' class="'+i+'"'),n&&(r+=' style="'+n+'"'),r}function _(t,e){if(!t)return e
if(!e)return t
for(var i=t.split(" "),n=0,r=i;n<r.length;n++){if(r[n]==e)return t}return t+" "+e}function w(t,e){if(!t||!e)return t
for(var i=t.split(" "),n="",r=0,o=i;r<o.length;r++){var s=o[r]
s!=e&&(n+=s+" ")}return n.trim()}function O(t,e){if(!t)return e
if(!e)return t
for(var i=t.split(" "),n=!1,r="",o=0,s=i;o<s.length;o++){var h=s[o]
h!=e?r+=h+" ":n=!0}return n?r.trim():r.trim()+" "+e}function W(t,e){t&&t.setAttribute("class",_(t.getAttribute("class"),e))}function S(t,e){t&&t.setAttribute("class",w(t.getAttribute("class"),e))}function C(t,e){t&&t.setAttribute("class",O(t.getAttribute("class"),e))}function U(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i]
if(!t||!e||!e.length)return t
if(t instanceof A)t.css.apply(t,e)
else if(t instanceof HTMLElement){var n=y.apply(void 0,e),r=m.apply(void 0,e)
r&&W(t,r),n&&t.setAttribute("style",g(n))}return t}function k(t,e,i,n,r,o){if(!t)return""
e||(e=""),i||(i="")
var s=o?' title="'+o+'"':""
return r=r?" "+r:"",t.indexOf(".")>0?e+'<img src="'+t+'"'+s+">"+i:!n||n<2?e+'<i class="fa '+t+r+'"'+s+"></i>"+i:(n>5&&(n=5),e+'<i class="fa '+t+" fa-"+n+"x"+r+'"'+s+"></i>"+i)}function T(e,i,n,r,o,s){e||(e="div")
var h,l
"string"==typeof n?n.indexOf(":")>0?l=n:h=n:n&&(n.n&&(h=n.n),l=t.style(n)),s&&(h?h+=" "+s:h=s)
var a="<"+e
o&&(a+=' id="'+o+'"'),h&&(a+=' class="'+h+'"'),l&&(a+=' style="'+l+'"')
var u=t.attributes(r)
u&&(a+=" "+u),a+=">"
var d=c(i)
return a+=d[1],"input"==e?d[0]+a+d[2]:(a+="</"+e+">",d[0]+a+d[2])}t.debug=!1,t.registry=[],t.version="1.0.0"
var A=function(){function e(e,i,n,r,o,s){if(this.mounted=!1,this.debug=t.debug,this.forceOnChange=!1,this.rootTag="div",this.subSeq=0,this.dontTrigger=!1,this._visible=!0,this._enabled=!0,this.handlers={},this.cuid=Math.floor(1e9*Math.random()),e instanceof HTMLElement)this.root=e,this.root&&(this.mounted=!0),this.debug&&console.log("["+p(this)+"] new wrapper root="+p(this.root))
else{"string"==typeof e&&(this.id="*"==e?"w"+this.cuid:e),this.name=i||"WComponent",this._classStyle=r
var h=t.cls(o)
h&&(this._classStyle=this._classStyle?this._classStyle+" "+h:h),this._style=t.style(o),this._attributes=t.attributes(s),this.debug&&console.log("["+p(this)+"] new"),this.debug&&console.log("["+p(this)+"] updateProps",n),this.updateProps(n)}}return Object.defineProperty(e.prototype,"visible",{get:function(){return this.internal?this.internal.visible:this._visible},set:function(t){this._visible=t,this.internal&&(this.internal.visible=t),this.root&&(this._visible?this.root.style.display="block":this.root.style.display="none")},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return this.internal?this.internal.enabled:this._enabled},set:function(t){this._enabled=t,this.internal&&(this.internal.enabled=t),this.root&&(this._enabled?this.root.removeAttribute("disabled"):this.root.setAttribute("disabled",""))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"style",{get:function(){return this.internal?this.internal.style:this._style},set:function(e){this._style=t.css(this._baseStyle,e),this.internal&&(this.internal.style=e),this.root&&this.root.setAttribute("style",this._style)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classStyle",{get:function(){return this.internal?this.internal.classStyle:this._classStyle},set:function(e){this.internal&&(this.internal.classStyle=e)
var i=!1,n=!1
e&&e.length>1&&"!"==e.charAt(0)?(e=e.substring(1),i=!0):e&&e.length>1&&"?"==e.charAt(0)&&(e=e.substring(1),n=!0),this._classStyle=i?t.removeClass(this._classStyle,e):n?t.toggleClass(this._classStyle,e):t.cls(this._baseClass,e),this.root&&(i?S(this.root,e):n?C(this.root,e):this.root.setAttribute("class",this._classStyle))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"attributes",{get:function(){return this.internal?this.internal.attributes:this._attributes},set:function(t){this._attributes=t,this.internal&&(this.internal.attributes=t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"tooltip",{get:function(){return this.internal?this.internal.tooltip:this._tooltip},set:function(t){this._tooltip=t,this.internal&&(this.internal.tooltip=t),this.root&&this.root.setAttribute("title",this._tooltip)},enumerable:!1,configurable:!0}),e.prototype.css=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return this
var i=m.apply(void 0,t)
i&&(this.classStyle=i)
var n=y.apply(void 0,t)
return n&&(this.style=n),this},e.prototype.focus=function(){return this.internal&&this.internal.focus(),this.root&&this.root.focus(),this},e.prototype.blur=function(){return this.internal&&this.internal.blur(),this.root&&this.root.blur(),this},e.prototype.forceUpdate=function(t){return this.update(this.props,this.state,!1,!1,!0,t),this},e.prototype.getContext=function(){return this.context},e.prototype.getRoot=function(){if(!this.root&&this.internal)return this.internal.getRoot()
if(!this.root){if(this.id){var t=document.getElementById(this.id)
if(t)return t}return this.context}return this.root},e.prototype.getState=function(){return this.state},e.prototype.setState=function(t,e,i){return this.debug&&console.log("["+p(this)+"] setState",t),this.update(this.props,t,!1,!0,this.forceOnChange||e,i),this},e.prototype.getProps=function(){return this.props},e.prototype.setProps=function(t,e,i){return this.debug&&console.log("["+p(this)+"] setProps",t),this.update(t,this.state,!0,!1,this.forceOnChange||e,i),this},e.prototype.on=function(t,e){if(!t)return this
for(var i=t.split(" "),n=0,r=i;n<r.length;n++){var o=r[n]
this.handlers[o]||(this.handlers[o]=[]),this.handlers[o].push(e)}return this.internal&&this.internal.on(t,e),this.root&&this.root.addEventListener(t,e),this},e.prototype.off=function(t){if(t)for(var e=t.split(" "),i=0,n=e;i<n.length;i++){var r=n[i]
if(this.root)for(var o=this.handlers[r],s=0,h=o;s<h.length;s++){var l=h[s]
this.root.removeEventListener(r,l)}delete this.handlers[r]}else this.handlers={}
return this.internal&&this.internal.off(t),this},e.prototype.trigger=function(t){for(var e,i=[],n=1;n<arguments.length;n++)i[n-1]=arguments[n]
if(this.debug&&console.log("["+p(this)+"] trigger",t,i),t){var r=i&&i.length>0?i[0]:void 0
if("_"==t.charAt(0)||"mount"==t||"unmount"==t||"statechange"==t||"propschange"==t){if(void 0!==r&&("statechange"==t?this.state!=i[0]&&(this.state=i[0],this.debug&&console.log("["+p(this)+"] trigger set state",this.state)):"propschange"==t&&this.props!=i[0]&&(this.props=i[0],this.debug&&console.log("["+p(this)+"] trigger set props",this.props))),!this.handlers||!this.handlers[t])return this
for(var o=this.createEvent(t,r),s=0,h=this.handlers[t];s<h.length;s++){(0,h[s])(o)}}else if(this.root){this.debug&&console.log("["+p(this)+"] trigger "+t+" on root="+p(this.root))
var l=new Event(t)
l=__assign(__assign({},l),i),this.root.dispatchEvent(l)}return this.internal&&(this.debug&&console.log("["+p(this)+"] trigger "+t+" on internal="+p(this.internal)),(e=this.internal).trigger.apply(e,__spreadArray([t],i,!1))),this}},e.prototype.unmount=function(){if(this.debug&&console.log("["+p(this)+"] unmount ctx="+p(this.context)+" root="+p(this.root),this.state,this.props),this.componentWillUnmount(),this.internal&&this.internal.unmount(),this.internal=void 0,this.root&&this.root.remove(),this.root=void 0,this.id){var e=t.registry.indexOf(this.id)
e>=0&&t.registry.splice(e,1)}return this.mounted=!1,wuxRegister(this.id,"delete"),this.trigger("unmount"),this},e.prototype.mount=function(i){this.debug&&console.log("["+p(this)+"] mount ctx="+p(i)+" root="+p(this.root),this.state,this.props),this.id||this.root&&(this.id=this.root.id),i&&(this.context=i),this.context||this.root&&(this.context=this.root.parentElement,this.context||(this.context=this.root))
try{if(this.mounted&&this.unmount(),this.mounted=!1,!this.context){var n=document.getElementById(this.id)
n&&(this.context=n)}if(this.debug&&console.log("["+p(this)+"] componentWillMount ctx="+p(i)+" root="+p(this.root)),this.componentWillMount(),this.context){this.debug&&console.log("["+p(this)+"] render ctx="+p(i)+" root="+p(this.root))
var r=this.render()
if(void 0!==r&&null!==r)if(r instanceof e){if(this.debug&&console.log("["+p(this)+"] render -> "+p(r)),this.internal=r,r.parent||(r.parent=this),r.mount(this.context),!this.root)if(this.id){var n=document.getElementById(this.id)
this.root=n||this.internal.getRoot()}else this.root=this.context}else if(r instanceof HTMLElement)this.context.append(r),this.root||(this.root=r)
else{var o=this.context.innerHTML
o||(o=""),this.context.innerHTML=o+r
var s=this.context.lastChild
s instanceof HTMLElement&&(this.root=s),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}else this.internal&&this.internal.mount(this.context),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}if(this._visible||(this.internal?this.internal.visible=!1:this.root.style.display="none"),this._enabled||(this.internal?this.internal.enabled=!1:this.root.setAttribute("disabled","")),this.debug&&console.log("["+p(this)+"] componentDidMount ctx="+p(i)+" root="+p(this.root)),this.componentDidMount(),this.root)for(var h in this.handlers)if(h&&"_"!=h.charAt(0)&&"mount"!=h&&"unmount"!=h&&"statechange"!=h&&"propschange"!=h)for(var l=0,a=this.handlers[h];l<a.length;l++){var u=a[l]
this.root.addEventListener(h,u)}if(wuxRegister(this.root,this),this.mounted=!0,this.id&&(!this.internal||this.internal.id!=this.id)){if(t.registry.indexOf(this.id)>=0){var d=t.getComponent(this.id)
d&&d.cuid!=this.cuid&&console.error("["+p(this)+"] id already used by "+p(d))}else t.registry.push(this.id)}this.trigger("mount")}catch(t){var c=p(this)+" "+p(this.context)
console.error("["+p(this)+"] mount error "+c,t),this.componentDidCatch(t,c)}return this},e.prototype.componentWillUnmount=function(){},e.prototype.componentWillMount=function(){},e.prototype.render=function(){return this.buildRoot(this.rootTag)},e.prototype.componentDidMount=function(){},e.prototype.componentDidCatch=function(t,e){},e.prototype.shouldComponentUpdate=function(t,e){return"object"==typeof t||"object"==typeof e||(this.props!=t||this.state!=e)},e.prototype.componentWillUpdate=function(t,e){},e.prototype.componentDidUpdate=function(t,e){},e.prototype.updateProps=function(t){this.props=t},e.prototype.updateState=function(t){this.state=t},e.prototype.update=function(t,e,i,n,r,o){void 0===r&&(r=!1),this.debug&&console.log("["+p(this)+"] update",t,e,"propsChange="+i+",stateChange="+n+",force="+r),t=void 0===t?this.props:t
var s=this.props,h=this.state
if(this.dontTrigger=!1,this.mounted){if(r||this.shouldComponentUpdate(t,e)){try{this.debug&&console.log("["+p(this)+"] componentWillUpdate",t,e),this.componentWillUpdate(t,e),i&&(this.debug&&console.log("["+p(this)+"] updateProps",t),this.updateProps(t)),n&&(this.debug&&console.log("["+p(this)+"] updateState",e),this.updateState(e)),r&&this.mount(),this.debug&&console.log("["+p(this)+"] componentDidUpdate",s,h),this.componentDidUpdate(s,h),i&&!this.dontTrigger&&this.trigger("propschange"),n&&!this.dontTrigger&&this.trigger("statechange")}catch(t){return this.componentDidCatch(t,p(this)+"|"+p(this.context)),!1}o&&o()}}else i&&(this.debug&&console.log("["+p(this)+"] updateProps",t),this.updateProps(t),this.dontTrigger||this.trigger("propschange")),n&&(this.debug&&console.log("["+p(this)+"] updateState",e),this.updateState(e),this.dontTrigger||this.trigger("statechange"))
return!0},e.prototype.createEvent=function(t,e){var i=this.root?this.root.firstChild:this.root
return{component:this,element:this.root,target:i,type:t,data:e}},e.prototype.shouldBuildRoot=function(){if(this.internal)return!1
if(this.root)return!1
if(this.context){var t=this.context.id
if(!t&&t==this.id)return!1}return!0},e.prototype.buildRoot=function(t,e,i,n,r,o,s){return this.debug&&console.log("["+p(this)+"] buildRoot",t,e,i,n,r,o,s),this.shouldBuildRoot()?(this.debug&&console.log("["+p(this)+"] shouldBuildRoot() -> true"),this.build(t,e,i,n,r,o,s)):void(this.debug&&console.log("["+p(this)+"] shouldBuildRoot() -> false"))},e.prototype.build=function(e,i,n,r,o,s,h){e||(e="div"),void 0===r&&(r=this._classStyle),void 0===o&&(o=this._style),void 0===s&&(s=this._attributes),void 0===h&&(h=this.id)
var l="<"+e
h&&(l+=' id="'+h+'"'),r&&(l+=' class="'+r+'"'),o&&(l+=' style="'+o+'"')
var a=t.attributes(s)
a&&(l+=" "+a)
var u=t.attributes(n)
u&&(l+=" "+u),l+=">"
var d=c(null==i?this.make():i)
return l+=d[1],"input"==e?d[0]+l+d[2]:(l+="</"+e+">",d[0]+l+d[2])},e.prototype.make=function(){return""},e.prototype.subId=function(t,i){if(t instanceof e){var n=t.id
return n&&this.id?0!=n.indexOf(this.id+"-")?n:n.substring(this.id.length+1):n}return this.id&&"*"!=this.id||(this.id="w"+this.cuid),t&&"*"!=t||(t=(this.subSeq++).toString()),i||0==i?this.id+"-"+t+"-"+i:this.id+"-"+t},e.prototype.ripId=function(t){return t&&this.id&&0==t.indexOf(this.id)&&t.length>this.id.length+1?t.substring(this.id.length+1):t},e.prototype.transferTo=function(t,e,i){return this.debug&&console.log("["+p(this)+"] transferTo "+p(t)),!!t&&(t.setState(this.getState(),e,i),!0)},e}()
t.WComponent=A,t.getId=e,t.firstSub=i,t.lastSub=n,t.getComponent=r,t.getRootComponent=o,t.setProps=s,t.getProps=h,t.setState=l,t.getState=a,t.newInstance=u,t.same=d,t.divide=c,t.str=p,t.getTagName=f,t.style=g,t.addStyle=b,t.css=y,t.cls=m,t.attributes=v,t.buildCss=x,t.addClass=_,t.removeClass=w,t.toggleClass=O,t.addClassOf=W,t.removeClassOf=S,t.toggleClassOf=C,t.setCss=U,t.buildIcon=k,t.build=T}(WUX||(WUX={}))
var WUX
!function(t){var e={},i={}
t.global={locale:"it",init:function(e){t.debug&&console.log("[WUX] global.init..."),t.debug&&console.log("[WUX] global.init completed"),e&&e()},setData:function(t,n,r){if(void 0===r&&(r=!1),t||(t="global"),e[t]=n,!r&&i[t])for(var o=0,s=i[t];o<s.length;o++){var h=s[o]
h(n)}},getData:function(t,i){t||(t="global")
var n=e[t]
return null==n?i:n},onDataChanged:function(t,e){t||(t="global"),i[t]||(i[t]=[]),i[t].push(e)}}}(WUX||(WUX={}))
var WUX
!function(t){var e=function(e){function i(i,n,r,o,s,h){var l=e.call(this,i||"*","WContainer",h,n,t.style(r),o)||this
return l.comp=[],l.corc=[],l.grid=[],l.rootTag=s?"span":"div",l}return __extends(i,e),i.prototype.addRow=function(e,i){e||(e="row")
var n=[],r=t.style(i)
return r&&(e+="^"+r),n.push(e),this.grid.push(n),this},i.prototype.addCol=function(e,i){e||(e="col-12"),isNaN(parseInt(e))||(e="col-"+e),this.grid.length||this.addRow()
var n=this.grid[this.grid.length-1],r=t.style(i)
return r&&(e+="^"+r),n.push(e),this},i.prototype.add=function(t){if(this.grid.length||this.addRow().addCol(),!t)return this
var e=this.grid.length-1,i=this.grid[e],n=i.length-1
return this.comp.push(t),this.corc.push(this.subId(e+"_"+n)),this},i.prototype.render=function(){var t="",e=this.grid.length
if(e)for(var i=0;i<e;i++){var n=this.grid[i],r=n.length
if(r){t+="<div "+this.cs(n[0])+">"
for(var o=1;o<r;o++)t+='<div id="'+this.subId(i+"_"+o)+'" '+this.cs(n[o])+"></div>"
t+="</div>"}}return this.buildRoot(this.rootTag,t)},i.prototype.componentDidMount=function(){for(var t=0;t<this.comp.length;t++){var e=this.comp[t],i=document.getElementById(this.corc[t])
i&&e.mount(i)}},i.prototype.componentWillUnmount=function(){for(var t=0,e=this.comp;t<e.length;t++){e[t].unmount()}},i.prototype.cs=function(t){if(!t)return""
var e=t.indexOf("^")
return e<0?'class="'+t+'"':'class="'+t.substring(0,e)+'" style="'+t.substring(e+1)+'"'},i}(t.WComponent)
t.WContainer=e
var i=function(e){function i(t,i,n,r,o,s,h,l){var a=e.call(this,t||"*","WLink",n,r,o,s)||this
return a.updateState(i),a.rootTag="a",a._href=h,a._target=l,a}return __extends(i,e),Object.defineProperty(i.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"href",{get:function(){return this._href},set:function(t){this._href=t,this.root&&(t?this.root.setAttribute("href",t):this.root.removeAttribute("href"))},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"target",{get:function(){return this._target},set:function(t){this._target=t,this.root&&(t?this.root.setAttribute("target",t):this.root.removeAttribute("target"))},enumerable:!1,configurable:!0}),i.prototype.render=function(){var e=""
this._href&&(e+='href="'+this._href+'"'),this._target&&(e&&(e+=" "),e+='target="'+this._target+'"')
var i=""
return this.state?i+=t.buildIcon(this.icon,""," ")+this.state:i+=t.buildIcon(this.icon),this.build(this.rootTag,i,e)},i.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},i.prototype.componentWillUpdate=function(e,i){var n=""
n+=i?t.buildIcon(this.icon,""," ")+i:t.buildIcon(this.icon),this.root.innerHTML=n},i}(t.WComponent)
t.WLink=i
var n=function(e){function i(t,i,n,r,o,s,h){var l=e.call(this,t||"*","WTable",h,r,o,s)||this
if(l.rootTag="table",l.header=i,n&&n.length)l.keys=n
else if(l.keys=[],l.header)for(var a=0;a<l.header.length;a++)l.keys.push(a)
return l.widths=[],l}return __extends(i,e),i.prototype.render=function(){if(this.shouldBuildRoot()){var e="table"
this._classStyle&&(e=this._classStyle.indexOf("table ")>=0?this._classStyle:e+" "+this._classStyle)
var i=this.style?' style="'+this.style+'"':"",n=""
if(this.div&&(n+='<div id="'+this.id+'-c" class="'+this.div+'">'),n+='<table id="'+this.id+'" class="'+e+'"'+i+">",this.header&&this.header.length){var r=!1
if("string"==typeof this.headStyle?this.headStyle.indexOf("text-align")>0&&(r=!0):this.headStyle&&this.headStyle.a&&(r=!0),!this.hideHeader){n+=r?'<thead id="'+this.id+'-h"><tr>':'<thead id="'+this.id+'-h"><tr'+t.buildCss(this.headStyle)+">"
for(var o=-1,s=0,h=this.header;s<h.length;s++){var l=h[s]
o++
var a=void 0
a=0==o?this.col0Style?this.col0Style:this.colStyle:o==this.header.length-1?this.colLStyle?this.colLStyle:this.colStyle:r?this.headStyle:this.colStyle
var u=this.widths&&this.widths.length>o?this.widths[o]:0,d={}
u&&(d.w=this.widthsPerc?u+"%":u)
"w"==this.getType(o)&&(d.a="center"),n+="<th"+t.buildCss(a,d)+">"+l+"</th>"}n+="</tr></thead>"}}return n+='<tbody id="'+this.id+'-b"></tbody>',n+="</table>",this.div&&(n+="</div>"),n}},i.prototype.componentDidMount=function(){this.buildBody()},i.prototype.componentDidUpdate=function(t,e){this.buildBody()},i.prototype.getType=function(t){return this.types?this.types.length<=t?"":this.types[t]:""},i.prototype.buildBody=function(){var e=document.getElementById(this.id+"-b")
if(e){if(!this.state||!this.state.length)return void(e.innerHTML="")
if(!this.keys||!this.keys.length)return void(e.innerHTML="")
for(var i="",n=-1,r=0,o=this.state;r<o.length;r++){var s=o[r]
n++
var h=""
h=n==this.state.length-1&&this.footerStyle?"<tr"+t.buildCss(this.footerStyle)+">":"<tr"+t.buildCss(this.rowStyle)+">",i+=h
for(var l=-1,a=0,u=this.keys;a<u.length;a++){var d=u[a],c=s[d],p=""
null==c&&(c=""),l++
switch(this.getType(l)){case"w":p="text-center"
break
case"c":case"c5":case"i":case"n":p="text-right"
break
case"b":c=c?"&check;":""
break
default:c instanceof Date&&(c=c.toLocaleDateString()),"boolean"==typeof c&&(c=c?"&check;":""),"number"==typeof c&&(p="text-right")}var f=void 0
f=0==l?this.col0Style?this.col0Style:this.colStyle:l==this.header.length-1&&this.colLStyle?this.colLStyle:this.colStyle,"string"==typeof f?f.indexOf("text-align")>0&&(p=""):f&&f.a&&(p="")
var g=this.widths&&this.widths.length>l?this.widths[l]:0
i+="<td"+t.buildCss(f,p,{w:g})+">"+c+"</td>"}if(this.header&&this.header.length>this.keys.length)for(var b=0;b<this.header.length-this.keys.length;b++)i+="<td"+t.buildCss(this.colStyle)+"></td>"
i+="</tr>",e.innerHTML=i}}},i}(t.WComponent)
t.WTable=n}(WUX||(WUX={}))
var APP
!function(n){var t=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.render=function(){return"<div>Hello World.</div>"},t}(WUX.WComponent)
n.Main=t}(APP||(APP={}))
