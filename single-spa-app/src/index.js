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
if(t.lastCtx=o,r&&r(n),t.onRenderHandlers.length>0){for(var s=e instanceof WUX.WComponent?e:null,a={component:s,element:o,target:o.firstChild,type:"render"},h=0,l=t.onRenderHandlers;h<l.length;h++){(0,l[h])(a)}t.onRenderHandlers=[]}})},t.mount=function(e,n){if(n||(n=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(n)+"..."),null==e)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(n)+" -> invalid component")
var i="string"==typeof n?0==n.indexOf("#")?document.getElementById(n.substring(1)):document.getElementById(n):n
if(!i)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(n)+" -> context unavailable")
if(t.lastCtx=i,e instanceof WUX.WComponent)e.mount(i),wuxRegister(i,e)
else if(e instanceof Element)i.append(e)
else{var r=document.createElement("template")
r.innerHTML=e,i.append(r.content.firstElementChild)}return WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(n)+" completed."),i},t.unmount=function(e){e||(e=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+"...")
var n="string"==typeof e?0==e.indexOf("#")?document.getElementById(e.substring(1)):document.getElementById(e):e
if(!n)return void console.error("WuxDOM.unmount "+WUX.str(e)+" -> node unavailable")
var i=wuxRegister(n,"delete")
if(i&&i.unmount(),n.remove(),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+" completed."),t.onUnmountHandlers.length>0){for(var r={component:i,element:n,target:n.firstChild,type:"unmount"},o=0,s=t.onUnmountHandlers;o<s.length;o++){(0,s[o])(r)}t.onUnmountHandlers=[]}return n},t.replace=function(e,n){var i
if(n||(n=e,e=void 0),e)if("string"==typeof e){var r=WUX.getComponent(e)
r||(i=r.getContext(),r.unmount())}else e instanceof WUX.WComponent?(i=e.getContext(),e.unmount()):(i=e.parentElement)&&(i.innerHTML="")
else i=t.unmount()
return i||(i=document.getElementById("#view-root")),i?t.mount(n,i):void console.error("WuxDOM.replace "+WUX.str(i)+" -> node unavailable")},t.onRenderHandlers=[],t.onUnmountHandlers=[],t}(),WUX
!function(t){function e(t){if(t)return t instanceof Element?t.id:t instanceof T?t.id:"string"==typeof t&&t.indexOf("<")<0?0==t.indexOf("#")?t.substring(1):t:"object"!=typeof t||t.id?"":""+t.id}function n(t,n){var i=e(t)
if(!i)return""
var r=i.indexOf("-")
return r<0?i:n?i.substring(r+1):i.substring(0,r)}function i(t){var n=e(t)
if(!n)return""
var i=n.lastIndexOf("-")
if(i<0)return n
if(i>0){if("-"==n.charAt(i-1))return n.substring(i)}return n.substring(i+1)}function r(t){if(t)return wuxRegistry[t]}function o(t){return t&&t.parent?o(t.parent):t}function s(t,e){if(t){var n=wuxRegistry[t]
if(n)return n.setProps(e),n}}function a(t,e){if(!t)return e
var n=wuxRegistry[t]
if(!n)return e
var i=n.getProps()
return null==i?e:i}function h(t,e){if(t){var n=wuxRegistry[t]
if(n)return n.setState(e),n}}function l(t,e){if(!t)return e
var n=wuxRegistry[t]
if(!n)return e
var i=n.getState()
return null==i?e:i}function u(t){if(!t)return null
var e=t.lastIndexOf(".")
if(e>0){var n=t.substring(0,e)
if(window[n]){var i=t.substring(e+1)
for(var r in window[n])if(r==i)return new window[n][r]
return null}}var o=window[t]
return o&&o.prototype?Object.create(o.prototype):null}function d(t,n){if("string"==typeof t&&"string"==typeof n)return t==n
if("string"==typeof t||"string"==typeof n)return!1
var i=e(t),r=e(n)
return i&&r&&i==r}function c(t){if(!t)return["","",""]
if(" "==t)return["","&nbsp;",""]
var e=" "==t.charAt(0)?"&nbsp;":"",n=t.length>1&&" "==t.charAt(t.length-1)?"&nbsp;":"",i=t.trim().split("<>")
return!i||i.length<2?[e,t.trim(),n]:(e+=i[0],2==i.length?[e,i[1],""]:(n+=i[2],[e,i[1],n]))}function f(t){if(t instanceof T){var e=t.name,n=t.id
return e||(e="WComponent"),n?e+"("+n+")":e}return t instanceof Element?"Element#"+t.id:"object"==typeof t?JSON.stringify(t):t+""}function p(e){if(!e)return""
if(e instanceof T){var n=e.rootTag
if(n)return n.toLowerCase()
var i=e.getRoot()
return i?"":t.getTagName(i)}if(e instanceof Element)return e.tagName.toLowerCase()
var r=""+e
if("<"==r.charAt(0)){var o=r.indexOf(" ")
if(o<0&&(o=r.indexOf(">")),o>0){var n=r.substring(1,o).toLowerCase()
return"/"==n.charAt(n.length-1)?n.substring(0,n.length-1):n}return""}return"#"==r.charAt(0)?t.getTagName(document.getElementById(r.substring(1))):t.getTagName(document.getElementById(r))}function g(t){var e=""
return t?"string"==typeof t?t.indexOf(":")<=0?"":";"!=t.charAt(t.length-1)?t+";":t:(t.s&&(e+=y(t.s)),t.fs&&(e+="font-style:"+t.fs+";"),t.fw&&(e+="font-weight:"+t.fw+";"),t.tt&&(e+="text-transform:"+t.tt+";"),t.tr&&(e+="transform:"+t.tr+";"),t.fl&&(e+="float:"+t.fl+";"),t.cl&&(e+="clear:"+t.cl+";"),t.a&&(e+="text-align:"+t.a+";"),t.c&&(e+="color:"+t.c+";"),t.v&&(e+="vertical-align:"+t.v+";"),t.d&&(e+="display:"+t.d+";"),t.z&&(e+="z-index:"+t.z+";"),t.lh&&(e+="line-height:"+t.lh+";"),t.ps&&(e+="position:"+t.ps+";"),t.o&&(e+="overflow:"+t.o+";"),t.ox&&(e+="overflow-x:"+t.ox+";"),t.oy&&(e+="overflow-y:"+t.oy+";"),null!=t.op&&(e+="opacity:"+t.op+";"),null!=t.ol&&(e+="outline:"+t.ol+";"),t.cr&&(e+="cursor:"+t.cr+";"),t.cn&&(e+="content:"+t.cn+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-webkit"+t.k+";":"-webkit-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-moz"+t.k+";":"-moz-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-o"+t.k+";":"-o-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-ms"+t.k+";":"-ms-"+t.k+";"),t.bs&&(e+="box-shadow:"+t.bs+";"),t.bz&&(e+="box-sizing:"+t.bz+";"),t.b&&(e+=t.b.indexOf(":")>0?y("border"+t.b):t.b.match(/^(|none|inherit|initial|unset)$/)?"border:"+t.b+";":t.b.indexOf(" ")>0?"border:"+t.b+";":"border:1px solid "+t.b+";"),t.bc&&(e+="border-collapse:"+t.bc+";"),null!=t.br&&(e+="number"==typeof t.br?"border-radius:"+t.br+"px;":"border-radius:"+t.br+";"),null!=t.bsp&&(e+="number"==typeof t.bsp?"border-spacing:"+t.bsp+"px;":"border-spacing:"+t.bsp+";"),null!=t.m&&(e+="number"==typeof t.m?"margin:"+t.m+"px;":t.m.indexOf(":")>0?y("margin"+t.m):"margin:"+t.m+";"),null!=t.mt&&(e+="number"==typeof t.mt?"margin-top:"+t.mt+"px;":"margin-top:"+t.mt+";"),null!=t.mr&&(e+="number"==typeof t.mr?"margin-right:"+t.mr+"px;":"margin-right:"+t.mr+";"),null!=t.mb&&(e+="number"==typeof t.mb?"margin-bottom:"+t.mb+"px;":"margin-bottom:"+t.mb+";"),null!=t.ml&&(e+="number"==typeof t.ml?"margin-left:"+t.ml+"px;":"margin-left:"+t.ml+";"),null!=t.p&&(e+="number"==typeof t.p?"padding:"+t.p+"px;":t.p.indexOf(":")>0?y("padding"+t.p):"padding:"+t.p+";"),null!=t.pt&&(e+="number"==typeof t.pt?"padding-top:"+t.pt+"px;":"padding-top:"+t.pt+";"),null!=t.pr&&(e+="number"==typeof t.pr?"padding-right:"+t.pr+"px;":"padding-right:"+t.pr+";"),null!=t.pb&&(e+="number"==typeof t.pb?"padding-bottom:"+t.pb+"px;":"padding-bottom:"+t.pb+";"),null!=t.pl&&(e+="number"==typeof t.pl?"padding-left:"+t.pl+"px;":"padding-left:"+t.pl+";"),null!=t.f&&(e+="number"==typeof t.f?"font-size:"+t.f+"px;":t.f.indexOf(":")>0?y("font"+t.f):"font-size:"+t.f+";"),t.bg&&(e+=t.bg.indexOf(":")>0?y("background"+t.bg):t.bg.indexOf("url")>=0?"background:"+t.bg+";":"background-color:"+t.bg+";"),t.bgi&&(e+="background-image:"+t.bgi+";"),t.bgp&&(e+="background-position:"+t.bgp+";"),t.bgr&&(e+="background-repeat:"+t.bgr+";"),t.text&&(e+=t.text.indexOf(":")>0?y("text"+t.text):"text-decoration:"+t.text+";"),null!=t.l&&(e+="number"==typeof t.l?"left:"+t.l+"px;":"left:"+t.l+";"),null!=t.r&&(e+="number"==typeof t.r?"right:"+t.r+"px;":"right:"+t.r+";"),null!=t.t&&(e+="number"==typeof t.t?"top:"+t.t+"px;":"top:"+t.t+";"),null!=t.bt&&(e+="number"==typeof t.bt?"bottom:"+t.bt+"px;":"bottom:"+t.bt+";"),t.w&&(e+="number"==typeof t.w?"width:"+t.w+"px;":"width:"+t.w+";"),t.h&&(e+="number"==typeof t.h?"height:"+t.h+"px;":"height:"+t.h+";"),t.minw&&(e+="number"==typeof t.minw?"min-width:"+t.minw+"px;":"min-width:"+t.minw+";"),t.maxw&&(e+="number"==typeof t.maxw?"max-width:"+t.maxw+"px;":"max-width:"+t.maxw+";"),t.minh&&(e+="number"==typeof t.minh?"min-height:"+t.minh+"px;":"min-height:"+t.minh+";"),t.maxh&&(e+="number"==typeof t.maxh?"max-height:"+t.maxh+"px;":"max-height:"+t.maxh+";"),t.ws&&(e+="white-space:"+t.ws+";"),e):e}function m(t,e,n,i){return e&&n?t?i&&t.indexOf(e+":")>=0?y(t):y(t)+e+":"+n+";":e+":"+n+";":y(t)}function y(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return""
for(var n="",i={},r=!0,o=0;o<t.length;o++){var s=t[o]
s&&("string"==typeof s?(r||(n+=g(i),i={},r=!0),s.indexOf(":")>0&&(n+=s,";"!=s.charAt(s.length-1)&&(n+=";"))):(i=__assign(__assign({},i),s),r=!1))}return r||(n+=g(i)),n}function b(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
for(var n="",i=0;i<t.length;i++){var r=t[i]
if(r){var o="string"==typeof r?r:r.n
o&&(o.indexOf(":")>0||(n+=o+" "))}}return n.trim()}function v(t){if(!t)return""
if("string"==typeof t)return t
if("object"==typeof t){var e=""
for(var n in t)e+=n+'="'+t[n]+'" '
return e.trim()}return""}function w(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
var n=b.apply(void 0,t),i=y.apply(void 0,t),r=""
return n&&(r+=' class="'+n+'"'),i&&(r+=' style="'+i+'"'),r}function x(t,e){if(!t)return e
if(!e)return t
for(var n=t.split(" "),i=0,r=n;i<r.length;i++){if(r[i]==e)return t}return t+" "+e}function _(t,e){if(!t||!e)return t
for(var n=t.split(" "),i="",r=0,o=n;r<o.length;r++){var s=o[r]
s!=e&&(i+=s+" ")}return i.trim()}function S(t,e){if(!t)return e
if(!e)return t
for(var n=t.split(" "),i=!1,r="",o=0,s=n;o<s.length;o++){var a=s[o]
a!=e?r+=a+" ":i=!0}return i?r.trim():r.trim()+" "+e}function C(t,e){t&&t.setAttribute("class",x(t.getAttribute("class"),e))}function O(t,e){if(t){t.getAttribute("class")&&t.setAttribute("class",_(t.getAttribute("class"),e))}}function D(t,e){t&&t.setAttribute("class",S(t.getAttribute("class"),e))}function M(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n]
if(!t||!e||!e.length)return t
if(t instanceof T)t.css.apply(t,e)
else if(t instanceof Element){var i=y.apply(void 0,e),r=b.apply(void 0,e)
r&&C(t,r),i&&t.setAttribute("style",g(i))}return t}function W(e,n,i,r,o,s){if(!e)return""
n||(n=""),i||(i="")
var a=t.CSS.ICON?' style="'+t.CSS.ICON+'"':"",h=s?' title="'+s+'"':""
return o=o?" "+o:"",e.indexOf(".")>0?n+'<img src="'+e+'"'+h+a+">"+i:!r||r<2?n+'<i class="fa '+e+o+'"'+h+a+"></i>"+i:(r>5&&(r=5),n+'<i class="fa '+e+" fa-"+r+"x"+o+'"'+h+a+"></i>"+i)}function I(e,n,i,r,o,s){e||(e="div")
var a,h
"string"==typeof i?i.indexOf(":")>0?h=i:a=i:i&&(i.n&&(a=i.n),h=t.style(i)),s&&(a?a+=" "+s:a=s)
var l="<"+e
o&&(l+=' id="'+o+'"'),a&&(l+=' class="'+a+'"'),h&&(l+=' style="'+h+'"')
var u=t.attributes(r)
u&&(l+=" "+u),l+=">"
var d=c(n)
return l+=d[1],"input"==e?d[0]+l+d[2]:(l+="</"+e+">",d[0]+l+d[2])}t.debug=!1,t.registry=[],t.version="1.0.0"
var T=function(){function e(e,n,i,r,o,s){if(this.mounted=!1,this.debug=t.debug,this.forceOnChange=!1,this.rootTag="div",this.subSeq=0,this.dontTrigger=!1,this._visible=!0,this._enabled=!0,this.handlers={},this.cuid=Math.floor(1e9*Math.random()),e instanceof Element)this.root=e,this.root&&(this.mounted=!0),this.debug&&console.log("["+f(this)+"] new wrapper root="+f(this.root))
else{"string"==typeof e&&(this.id="*"==e?"w"+this.cuid:e),this.name=n||"WComponent",this._classStyle=r
var a=t.cls(o)
a&&(this._classStyle=this._classStyle?this._classStyle+" "+a:a),this._style=t.style(o),this._attributes=t.attributes(s),this.debug&&console.log("["+f(this)+"] new"),this.debug&&console.log("["+f(this)+"] updateProps",i),this.updateProps(i)}}return Object.defineProperty(e.prototype,"visible",{get:function(){return this.internal?this.internal.visible:this._visible},set:function(t){this._visible=t,this.internal&&(this.internal.visible=t),this.root instanceof HTMLElement&&(this._visible?this.root.style.display="block":this.root.style.display="none")},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return this.internal?this.internal.enabled:this._enabled},set:function(t){this._enabled=t,this.internal&&(this.internal.enabled=t),this.root&&(this._enabled?this.root.removeAttribute("disabled"):this.root.setAttribute("disabled",""))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"style",{get:function(){return this.internal?this.internal.style:this._style},set:function(e){this._style=t.css(this._baseStyle,e),this.internal&&(this.internal.style=e),this.root&&this.root.setAttribute("style",this._style)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classStyle",{get:function(){return this.internal?this.internal.classStyle:this._classStyle},set:function(e){this.internal&&(this.internal.classStyle=e)
var n=!1,i=!1
e&&e.length>1&&"!"==e.charAt(0)?(e=e.substring(1),n=!0):e&&e.length>1&&"?"==e.charAt(0)&&(e=e.substring(1),i=!0),this._classStyle=n?t.removeClass(this._classStyle,e):i?t.toggleClass(this._classStyle,e):t.cls(this._baseClass,e),this.root&&(n?O(this.root,e):i?D(this.root,e):this.root.setAttribute("class",this._classStyle))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"attributes",{get:function(){return this.internal?this.internal.attributes:this._attributes},set:function(t){this._attributes=t,this.internal&&(this.internal.attributes=t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"tooltip",{get:function(){return this.internal?this.internal.tooltip:this._tooltip},set:function(t){this._tooltip=t,this.internal&&(this.internal.tooltip=t),this.root&&this.root.setAttribute("title",this._tooltip)},enumerable:!1,configurable:!0}),e.prototype.css=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return this
var n=b.apply(void 0,t)
n&&(this.classStyle=n)
var i=y.apply(void 0,t)
return i&&(this.style=i),this},e.prototype.focus=function(){return this.internal&&this.internal.focus(),this.root instanceof HTMLElement&&this.root.focus(),this},e.prototype.blur=function(){return this.internal&&this.internal.blur(),this.root instanceof HTMLElement&&this.root.blur(),this},e.prototype.forceUpdate=function(t){return this.update(this.props,this.state,!1,!1,!0,t),this},e.prototype.getContext=function(){return this.context},e.prototype.getRoot=function(){if(!this.root&&this.internal)return this.internal.getRoot()
if(!this.root){if(this.id){var t=document.getElementById(this.id)
if(t)return t}return this.context}return this.root},e.prototype.getState=function(){return this.state},e.prototype.setState=function(t,e,n){return this.debug&&console.log("["+f(this)+"] setState",t),this.update(this.props,t,!1,!0,this.forceOnChange||e,n),this},e.prototype.getProps=function(){return this.props},e.prototype.setProps=function(t,e,n){return this.debug&&console.log("["+f(this)+"] setProps",t),this.update(t,this.state,!0,!1,this.forceOnChange||e,n),this},e.prototype.on=function(t,e){if(!t)return this
for(var n=t.split(" "),i=0,r=n;i<r.length;i++){var o=r[i]
this.handlers[o]||(this.handlers[o]=[]),this.handlers[o].push(e),"_"!=o.charAt(0)&&"mount"!=o&&"unmount"!=o&&"statechange"!=o&&"propschange"!=o&&(this.root&&this.root.addEventListener(o,e))}return this.internal&&this.internal.on(t,e),this},e.prototype.off=function(t){if(t)for(var e=t.split(" "),n=0,i=e;n<i.length;n++){var r=i[n]
if(this.root)for(var o=this.handlers[r],s=0,a=o;s<a.length;s++){var h=a[s]
this.root.removeEventListener(r,h)}delete this.handlers[r]}else this.handlers={}
return this.internal&&this.internal.off(t),this},e.prototype.trigger=function(t){for(var e,n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i]
if(this.debug&&console.log("["+f(this)+"] trigger",t,n),t){var r=n&&n.length>0?n[0]:void 0
if("_"==t.charAt(0)||"mount"==t||"unmount"==t||"statechange"==t||"propschange"==t){if(void 0!==r&&("statechange"==t?this.state!=n[0]&&(this.state=n[0],this.debug&&console.log("["+f(this)+"] trigger set state",this.state)):"propschange"==t&&this.props!=n[0]&&(this.props=n[0],this.debug&&console.log("["+f(this)+"] trigger set props",this.props))),!this.handlers||!this.handlers[t])return this
for(var o=this.createEvent(t,r),s=0,a=this.handlers[t];s<a.length;s++){(0,a[s])(o)}}else if(this.root){this.debug&&console.log("["+f(this)+"] trigger "+t+" on root="+f(this.root))
var h=new Event(t)
h=__assign(__assign({},h),n),this.root.dispatchEvent(h)}return this.internal&&(this.debug&&console.log("["+f(this)+"] trigger "+t+" on internal="+f(this.internal)),(e=this.internal).trigger.apply(e,__spreadArray([t],n,!1))),this}},e.prototype.unmount=function(){if(this.debug&&console.log("["+f(this)+"] unmount ctx="+f(this.context)+" root="+f(this.root),this.state,this.props),this.componentWillUnmount(),this.internal&&this.internal.unmount(),this.internal=void 0,this.root&&this.root.remove(),this.root=void 0,this.id){var e=t.registry.indexOf(this.id)
e>=0&&t.registry.splice(e,1)}return this.mounted=!1,wuxRegister(this.id,"delete"),this.trigger("unmount"),this},e.prototype.mount=function(n){this.debug&&console.log("["+f(this)+"] mount ctx="+f(n)+" root="+f(this.root),this.state,this.props),this.id||this.root&&(this.id=this.root.id),n&&(this.context=n),this.context||this.root&&(this.context=this.root.parentElement,this.context||(this.context=this.root))
try{if(this.mounted&&this.unmount(),this.mounted=!1,!this.context){var i=document.getElementById(this.id)
i&&(this.context=i)}if(this.debug&&console.log("["+f(this)+"] componentWillMount ctx="+f(n)+" root="+f(this.root)),this.componentWillMount(),this.context){this.debug&&console.log("["+f(this)+"] render ctx="+f(n)+" root="+f(this.root))
var r=this.render()
if(void 0!==r&&null!==r)if(r instanceof e){if(this.debug&&console.log("["+f(this)+"] render -> "+f(r)),this.internal=r,r.parent||(r.parent=this),r.mount(this.context),!this.root)if(this.id){var i=document.getElementById(this.id)
this.root=i||this.internal.getRoot()}else this.root=this.context}else if(r instanceof Element)this.context.append(r),this.root||(this.root=r)
else{var o=document.createElement("template")
o.innerHTML=r,this.context.append(o.content.firstElementChild)
var s=this.context.lastChild
s instanceof Element&&(this.root=s),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}else this.internal&&this.internal.mount(this.context),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}if(this._visible||(this.internal?this.internal.visible=!1:this.root instanceof HTMLElement&&(this.root.style.display="none")),this._enabled||(this.internal?this.internal.enabled=!1:this.root.setAttribute("disabled","")),this.debug&&console.log("["+f(this)+"] componentDidMount ctx="+f(n)+" root="+f(this.root)),this.componentDidMount(),this.root)for(var a in this.handlers)if(a&&"_"!=a.charAt(0)&&"mount"!=a&&"unmount"!=a&&"statechange"!=a&&"propschange"!=a)for(var h=0,l=this.handlers[a];h<l.length;h++){var u=l[h]
this.root.addEventListener(a,u)}if(wuxRegister(this.root,this),this.mounted=!0,this.id&&(!this.internal||this.internal.id!=this.id)){if(t.registry.indexOf(this.id)>=0){var d=t.getComponent(this.id)
d&&d.cuid!=this.cuid&&console.error("["+f(this)+"] id already used by "+f(d))}else t.registry.push(this.id)}this.trigger("mount")}catch(t){var c=f(this)+" "+f(this.context)
console.error("["+f(this)+"] mount error "+c,t),this.componentDidCatch(t,c)}return this},e.prototype.componentWillUnmount=function(){},e.prototype.componentWillMount=function(){},e.prototype.render=function(){return this.buildRoot(this.rootTag)},e.prototype.componentDidMount=function(){},e.prototype.componentDidCatch=function(t,e){},e.prototype.shouldComponentUpdate=function(t,e){return"object"==typeof t||"object"==typeof e||(this.props!=t||this.state!=e)},e.prototype.componentWillUpdate=function(t,e){},e.prototype.componentDidUpdate=function(t,e){},e.prototype.updateProps=function(t){this.props=t},e.prototype.updateState=function(t){this.state=t},e.prototype.update=function(t,e,n,i,r,o){void 0===r&&(r=!1),this.debug&&console.log("["+f(this)+"] update",t,e,"propsChange="+n+",stateChange="+i+",force="+r),t=void 0===t?this.props:t
var s=this.props,a=this.state
if(this.dontTrigger=!1,this.mounted){if(r||this.shouldComponentUpdate(t,e)){try{this.debug&&console.log("["+f(this)+"] componentWillUpdate",t,e),this.componentWillUpdate(t,e),n&&(this.debug&&console.log("["+f(this)+"] updateProps",t),this.updateProps(t)),i&&(this.debug&&console.log("["+f(this)+"] updateState",e),this.updateState(e)),r&&this.mount(),this.debug&&console.log("["+f(this)+"] componentDidUpdate",s,a),this.componentDidUpdate(s,a),n&&!this.dontTrigger&&this.trigger("propschange"),i&&!this.dontTrigger&&this.trigger("statechange")}catch(t){return this.componentDidCatch(t,f(this)+"|"+f(this.context)),!1}o&&o()}}else n&&(this.debug&&console.log("["+f(this)+"] updateProps",t),this.updateProps(t),this.dontTrigger||this.trigger("propschange")),i&&(this.debug&&console.log("["+f(this)+"] updateState",e),this.updateState(e),this.dontTrigger||this.trigger("statechange"))
return!0},e.prototype.createEvent=function(t,e){var n=this.root?this.root.firstChild:this.root
return{component:this,element:this.root,target:n,type:t,data:e}},e.prototype.shouldBuildRoot=function(){if(this.internal)return!1
if(this.root)return!1
if(this.context){var t=this.context.id
if(!t&&t==this.id)return!1}return!0},e.prototype.buildRoot=function(t,e,n,i,r,o,s){return this.debug&&console.log("["+f(this)+"] buildRoot",t,e,n,i,r,o,s),this.shouldBuildRoot()?(this.debug&&console.log("["+f(this)+"] shouldBuildRoot() -> true"),this.build(t,e,n,i,r,o,s)):void(this.debug&&console.log("["+f(this)+"] shouldBuildRoot() -> false"))},e.prototype.build=function(e,n,i,r,o,s,a){e||(e="div"),void 0===r&&(r=this._classStyle),void 0===o&&(o=this._style),void 0===s&&(s=this._attributes),void 0===a&&(a=this.id)
var h="<"+e
a&&(h+=' id="'+a+'"'),r&&(h+=' class="'+r+'"'),o&&(h+=' style="'+o+'"')
var l=t.attributes(s)
l&&(h+=" "+l)
var u=t.attributes(i)
u&&(h+=" "+u),h+=">"
var d=c(null==n?this.make():n)
return h+=d[1],"input"==e?d[0]+h+d[2]:(h+="</"+e+">",d[0]+h+d[2])},e.prototype.make=function(){return""},e.prototype.subId=function(t,n){if(t instanceof e){var i=t.id
return i&&this.id?0!=i.indexOf(this.id+"-")?i:i.substring(this.id.length+1):i}return this.id&&"*"!=this.id||(this.id="w"+this.cuid),t&&"*"!=t||(t=(this.subSeq++).toString()),n||0==n?this.id+"-"+t+"-"+n:this.id+"-"+t},e.prototype.ripId=function(t){return t&&this.id&&0==t.indexOf(this.id)&&t.length>this.id.length+1?t.substring(this.id.length+1):t},e.prototype.transferTo=function(t,e,n){return this.debug&&console.log("["+f(this)+"] transferTo "+f(t)),!!t&&(t.setState(this.getState(),e,n),!0)},e}()
t.WComponent=T,t.getId=e,t.firstSub=n,t.lastSub=i,t.getComponent=r,t.getRootComponent=o,t.setProps=s,t.getProps=a,t.setState=h,t.getState=l,t.newInstance=u,t.same=d,t.divide=c,t.str=f,t.getTagName=p,t.style=g,t.addStyle=m,t.css=y,t.cls=b,t.attributes=v,t.buildCss=w,t.addClass=x,t.removeClass=_,t.toggleClass=S,t.addClassOf=C,t.removeClassOf=O,t.toggleClassOf=D,t.setCss=M,t.buildIcon=W,t.build=I
var k=function(){function e(){}return e.toArray=function(t){if(t instanceof T&&(t=t.getState()),null==t)return[]
if(Array.isArray(t))return t
var e=[]
return e.push(t),e},e.toArrayNumber=function(t,n){if(t instanceof T&&(t=t.getState()),null==t)return[]
var i=[]
if(Array.isArray(t))for(var r=0,o=t;r<o.length;r++){var s=o[r],a=e.toNumber(s)
n&&!a||i.push(a)}else{var a=e.toNumber(t)
if(n&&!a)return i
i.push(a)}return i},e.toArrayString=function(t,n){if(t instanceof T&&(t=t.getState()),null==t)return[]
var i=[]
if(Array.isArray(t))for(var r=0,o=t;r<o.length;r++){var s=o[r],a=e.toString(s)
n&&!a||i.push(a)}else{var a=e.toString(t)
if(n&&!a)return i
i.push(e.toString(t))}return i},e.splitNumbers=function(t,n){if(!t)return[]
for(var i=e.toString(t),r=i.split(n),o=[],s=0,a=r;s<a.length;s++){var h=a[s]
o.push(e.toNumber(h))}return o},e.toObject=function(t,e){return t instanceof T&&(t=t.getState()),null==t?e:"object"==typeof t?t:e},e.toString=function(n,i){return void 0===i&&(i=""),n instanceof T&&(n=n.getState()),null==n?i:"string"==typeof n?n:n instanceof Date?t.formatDate(n):"object"==typeof n&&void 0!=n.id?e.toString(n.id,i):Array.isArray(n)&&n.length?e.toString(n[0],i):""+n},e.toText=function(t,n){return void 0===n&&(n=""),e.toString(t,n).replace("<","&lt;").replace(">","&gt;")},e.toNumber=function(t,n){if(void 0===n&&(n=0),t instanceof T&&(t=t.getState()),null==t)return n
if("number"==typeof t)return t
if(t instanceof Date)return 1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()
if("object"==typeof t&&void 0!=t.id)return e.toNumber(t.id,n)
if(Array.isArray(t)&&t.length)return e.toNumber(t[0],n)
var i=(""+t).trim()
i.indexOf(".")>=0&&i.indexOf(",")>=0&&(i=i.replace(".","")),i=i.replace(",",".")
var r=i.indexOf(".")>=n?parseFloat(i):parseInt(i)
return isNaN(r)?n:r},e.toInt=function(t,n){if(void 0===n&&(n=0),t instanceof T&&(t=t.getState()),null==t)return n
if("number"==typeof t)return Math.floor(t)
if(t instanceof Date)return 1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()
if("object"==typeof t&&void 0!=t.id)return e.toInt(t.id,n)
if(Array.isArray(t)&&t.length)return e.toInt(t[0],n)
var i=(""+t).replace(",","."),r=parseInt(i)
return isNaN(r)?n:r},e.toIntTime=function(t,n){if(void 0===n&&(n=0),t instanceof T&&(t=t.getState()),null==t)return n
if(t instanceof Date)return 100*t.getHours()+t.getMinutes()
if(Array.isArray(t)&&t.length)return e.toIntTime(t[0],n)
var i=(""+t).replace(":","").replace(".","").replace(",",""),r=parseInt(i)
return isNaN(r)?n:r},e.isNumeric=function(t){return!isNaN(t)},e.checkEmail=function(t){if(!t)return""
var n=e.toString(t)
if(!n)return""
if(n.length<5)return""
var i=n.indexOf("@")
return i<=0?"":n.lastIndexOf(".")<i?"":n.trim().toLowerCase()},e.starts=function(t,n){return!(!t||null==n)&&0==e.toString(t).indexOf(n)},e.ends=function(t,n){if(!t||null==n)return!1
var i=e.toString(t),r=i.lastIndexOf(n)
return!(r<0)&&r==i.length-n.length},e.isEmpty=function(t){if(!t)return!0
if(Array.isArray(t)&&!t.length)return!0
if("object"==typeof t){for(var e in t)if(t.hasOwnProperty(e))return!1
return!0}return!1},e.toBoolean=function(t,e){return void 0===e&&(e=!1),t instanceof T&&(t=t.getState()),null==t?e:"boolean"==typeof t?t:"string"==typeof t&&t.length?"1YyTtSs".indexOf(t.charAt(0))>=0:!!e},e.toDate=function(t,e){if(t instanceof T&&(t=t.getState()),null==t)return e
if(t instanceof Date)return t
if("number"==typeof t)return t<10000101?e:new Date(t/1e4,t%1e4/100-1,t%1e4%100)
if("string"==typeof t){if(t.length<8)return e
var n=t.indexOf(",")
if(n>=0&&(t=t.substring(n+1)),t.indexOf("-")>3)return new Date(t.trim())
if(this.isNumeric(t)){var i=parseInt(t)
return i<10000101?e:new Date(i/1e4,i%1e4/100-1,i%1e4%100)}return new Date(t.trim().replace(/(\d{1,2}).(\d{1,2}).(\d{4})/,"$3-$2-$1"))}return e},e.getWeek=function(t){var n
n=t instanceof Date?new Date(t.getTime()):e.toDate(t),n||(n=new Date),n.setHours(0,0,0,0),n.setDate(n.getDate()+3-(n.getDay()+6)%7)
var i=new Date(n.getFullYear(),0,4)
return 1+Math.round(((n.getTime()-i.getTime())/864e5-3+(i.getDay()+6)%7)/7)},e.getParam=function(t,e){e||(e=window.location.href),t=t.replace(/[\[\]]/g,"\\$&")
var n=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)"),i=n.exec(e)
return i&&i[2]?decodeURIComponent(i[2].replace(/\+/g," ")):""},e.size=function(t){if(!t)return 0
if(Array.isArray(t))return t.length
if("object"==typeof t){var e=0
for(var n in t)t.hasOwnProperty(n)&&e++
return e}return 0},e.setValue=function(t,e,n){return"object"==typeof t&&(t[e]=n),t},e.getValue=function(t,n,i){if(!n)return i
if(Array.isArray(t)&&t.length)return"-1"==n?e.getLast(t,i):e.isNumeric(n)?e.getItem(t,e.toInt(n),i):e.getValue(t[0],n,i)
if("object"==typeof t){var r=n.indexOf(".")
if(null==t[n]&&r>0){var o=n.substring(0,r)
return null==t[o]?i:e.getValue(t[o],n.substring(r+1),i)}return null==t[n]?i:t[n]}return i},e.getItem=function(t,e,n){if(e<0)return n
if(Array.isArray(t)){if(t.length>e){var i=t[e]
return null==i?n:i}return n}return n},e.getFirst=function(t,e){if(Array.isArray(t)){if(t.length>0){var n=t[0]
return null==n?e:n}return e}return e},e.getLast=function(t,e){if(Array.isArray(t)){if(t.length>0){var n=t[t.length-1]
return null==n?e:n}return e}return e},e.getNumber=function(t,n,i){return e.toNumber(e.getValue(t,n,i))},e.getInt=function(t,n,i){return e.toInt(e.getValue(t,n,i))},e.getString=function(n,i,r,o){var s=e.getValue(n,i)
return null==s?r:o?"?"==o?"number"==typeof s?t.formatNum(s):e.toString(s):"c"==o?t.formatCurr(s):"c5"==o?t.formatCurr5(s):"n"==o?t.formatNum(s):"n2"==o?t.formatNum2(s):"m"==o?t.formatMonth(s):"d"==o?t.formatDate(s):"dt"==o?t.formatDateTime(s):"t"==o?t.formatTime(s):e.toString(s):e.toString(s)},e.getText=function(t,n,i){return e.toText(e.getValue(t,n,i))},e.getBoolean=function(t,n,i){return e.toBoolean(e.getValue(t,n,i))},e.getDate=function(t,n,i){return e.toDate(e.getValue(t,n,i))},e.getArray=function(t,n){return e.toArray(e.getValue(t,n))},e.getArrayNumber=function(t,n,i){return e.toArrayNumber(e.getValue(t,n),i)},e.getArrayString=function(t,n,i){return e.toArrayString(e.getValue(t,n),i)},e.getObject=function(t,n,i){var r=e.toObject(e.getValue(t,n))
return!r&&i?{}:r},e.sort=function(t,n,i){if(void 0===n&&(n=!0),!t)return[]
var r=e.toArray(t)
if(!i){var o=r.sort()
return n?o:o.reverse()}var s=r.sort(function(t,n){var r=e.getValue(t,i),o=e.getValue(n,i)
return r<o?-1:r>o?1:0})
return n?s:s.reverse()},e.find=function(t,n,i){if(!t||!n)return null
for(var r=e.toArray(t),o=0,s=r;o<s.length;o++){var a=s[o],h=e.getValue(a,n)
if(h instanceof Date&&i instanceof Date&&h.getTime()==i.getTime())return a
if(h==i)return a}return null},e.indexOf=function(t,n,i){if(!t||!n)return-1
for(var r=e.toArray(t),o=0;o<r.length;o++){var s=e.getValue(r[o],n)
if(s instanceof Date&&i instanceof Date&&s.getTime()==i.getTime())return o
if(s==i)return o}return-1},e.isSameDate=function(t,e){return this.toNumber(t)==this.toNumber(e)},e.indexOfDate=function(t,n){if(!t||!n)return-1
for(var i=e.toNumber(n),r=0;r<t.length;r++)if(t[r]){var o=e.toNumber(t[r])
if(o==i)return r}return-1},e.round2=function(t){if(null==t)return 0
var n=e.toNumber(t)
return Math.round(100*n)/100},e.floor2=function(t){if(null==t)return 0
var n=e.toNumber(t)
return Math.floor(100*n)/100},e.ceil2=function(t){if(null==t)return 0
var n=e.toNumber(t)
return Math.ceil(100*n)/100},e.compare2=function(t,n){if(!t&&!n)return 0
var i=Math.round(100*e.toNumber(t)),r=Math.round(100*e.toNumber(n))
return i==r?0:i>r?1:-1},e.compare5=function(t,n){if(!t&&!n)return 0
var i=Math.round(1e4*e.toNumber(t)),r=Math.round(1e4*e.toNumber(n))
return i==r?0:i>r?1:-1},e.getCurrDate=function(t,e,n,i,r){var o=new Date
return o.setHours(0,0,0,0),t&&o.setDate(o.getDate()+t),e&&o.setMonth(o.getMonth()+e),n&&o.setFullYear(o.getFullYear()+n),i&&o.setDate(1),r&&(o.setMonth(o.getMonth()+1),o.setDate(0)),o},e.calcDate=function(t,e,n,i,r,o){return t=t?new Date(t.getTime()):new Date,t.setHours(0,0,0,0),e&&t.setDate(t.getDate()+e),n&&t.setMonth(t.getMonth()+n),i&&t.setFullYear(t.getFullYear()+i),r&&t.setDate(1),o&&(t.setMonth(t.getMonth()+1),t.setDate(0)),t},e.timestamp=function(t){var n=t?e.toDate(t):new Date
n||(n=new Date)
var i=""+n.getFullYear(),r=n.getMonth()+1,o=r<10?"0"+r:""+r,s=n.getDate(),a=s<10?"0"+s:""+s,h=n.getHours(),l=h<10?"0"+h:""+h,u=n.getMinutes(),d=u<10?"0"+u:""+u,c=n.getSeconds()
return i+o+a+l+d+(c<10?"0"+c:""+c)},e.nvl=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(t&&t){for(var n=0,i=t;n<i.length;n++){var r=i[n]
if(!r)return r}return t[0]}},e.eqValues=function(t,e){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i]
if(!t&&!e)return!0
if(!t||!e)return!1
for(var r=0,o=n;r<o.length;r++){var s=o[r]
if(t[s]!=e[s])return!1}return!0},e.col=function(t,n,i){var r=[]
if(!t||!t.length)return r
for(var o=0,s=t;o<s.length;o++){var a=s[o]
r.push(e.getItem(a,n,i))}return r},e.getSortedKeys=function(t){if(!t)return[]
var e=[]
for(var n in t)t.hasOwnProperty(n)&&e.push(n)
return e.sort()},e.diffMinutes=function(t,n){var i=e.toDate(t),r=e.toDate(n)
return i||(i=new Date),r||(r=new Date),(i.getTime()-r.getTime())/6e4},e.diffHours=function(t,n){var i=e.toDate(t),r=e.toDate(n)
return i||(i=new Date),r||(r=new Date),(i.getTime()-r.getTime())/36e5},e.diffDays=function(t,n){var i=e.toDate(t),r=e.toDate(n)
i||(i=new Date),r||(r=new Date)
var o=i.getTime()-r.getTime(),s=o/864e5,a=o%864e5,h=a/6e4,l=s
return h>12&&l++,l},e}()
t.WUtil=k}(WUX||(WUX={}))
var WUX
!function(t){function e(e,n,i){if(void 0===n&&(n=!1),void 0===i&&(i=!1),!e)return""
var r=t.WUtil.toDate(e)
if(!r)return""
var o=r.getMonth()+1,s=o<10?"0"+o:""+o,a=r.getDate()<10?"0"+r.getDate():""+r.getDate()
return n?t.formatDay(r.getDay(),i)+", "+a+"/"+s+"/"+r.getFullYear():a+"/"+s+"/"+r.getFullYear()}function n(e){if(!e)return""
var n=t.WUtil.toDate(e)
if(!n)return""
var i=n.getMonth()+1,r=i<10?"0"+i:""+i,o=n.getDate()<10?"0"+n.getDate():""+n.getDate()
return n.getFullYear()+"-"+r+"-"+o}function i(e,n,i,r){if(void 0===n&&(n=!1),void 0===i&&(i=!1),void 0===r&&(r=!1),!e)return""
var o=t.WUtil.toDate(e)
if(!o)return""
var s=o.getMonth()+1,a=s<10?"0"+s:""+s,h=o.getDate()<10?"0"+o.getDate():""+o.getDate(),l=o.getHours()<10?"0"+o.getHours():""+o.getHours(),u=o.getMinutes()<10?"0"+o.getMinutes():""+o.getMinutes()
if(n){var d=o.getSeconds()<10?"0"+o.getSeconds():""+o.getSeconds()
return i?t.formatDay(o.getDay(),r)+", "+h+"/"+a+"/"+o.getFullYear()+" "+l+":"+u+":"+d:h+"/"+a+"/"+o.getFullYear()+" "+l+":"+u+":"+d}return i?t.formatDay(o.getDay(),r)+", "+h+"/"+a+"/"+o.getFullYear()+" "+l+":"+u:h+"/"+a+"/"+o.getFullYear()+" "+l+":"+u}function r(t,e){if(void 0===e&&(e=!1),null==t)return""
if("number"==typeof t){if(e){t<1e4&&(t*=100)
var n=Math.floor(t/1e4),i=Math.floor(t%1e4/100),o=t%1e4%100,s=i<10?"0"+i:""+i,a=o<10?"0"+o:""+o
return n+":"+s+":"+a}t>9999&&(t=Math.floor(t/100))
var n=Math.floor(t/100),i=t%100,s=i<10?"0"+i:""+i
return n+":"+s}if("string"==typeof t){var h=t.indexOf("T")
h<0&&(h=t.indexOf(" ")),h>=0&&(t=t.substring(h+1)),h=t.indexOf("+"),h<0&&(h=t.indexOf("-")),h<0&&(h=t.indexOf("Z")),h>=0&&(t=t.substring(0,h))
return r(parseInt(t.replace(":","").replace(".","")))}if(t instanceof Date){var l=t.getHours()<10?"0"+t.getHours():""+t.getHours(),u=t.getMinutes()<10?"0"+t.getMinutes():""+t.getMinutes()
if(e){var a=t.getSeconds()<10?"0"+t.getSeconds():""+t.getSeconds()
return l+":"+u+":"+a}return l+":"+u}return""}function o(e,n,i,r){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+Math.round(100*o)/100).replace(".",",")
return null!=n&&0!=o?null!=r&&o<0?r.replace("$",s):n.replace("$",s):null!=i&&0==o?i.replace("$",s):s}function s(e,n,i,r){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+o).replace(".",",")
return null!=n&&0!=o?null!=r&&o<0?"l"==r?o.toLocaleString("it-IT"):r.replace("$",s):"l"==n?o.toLocaleString("it-IT"):n.replace("$",s):null!=i&&0==o?i.replace("$",s):s}function a(e,n,i,r){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(Math.round(100*o)/100).toLocaleString("it-IT"),a=s.indexOf(",")
return a<0&&(s+=",00"),a==s.length-2&&(s+="0"),null!=n&&0!=o?null!=r&&o<0?r.replace("$",s):n.replace("$",s):null!=i&&0==o?i.replace("$",s):s}function h(e,n,i,r){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+Math.round(1e5*o)/1e5).replace(".",","),a=s.indexOf(",")
if(a<0&&(s+=",00"),a==s.length-2&&(s+="0"),a>0){for(var h=s.substring(0,a),l=s.substring(a),u="",d=1;d<=h.length;d++)d>3&&(d-1)%3==0&&(u="."+u),u=h.charAt(h.length-d)+u
s=u+l}return null!=n&&0!=o?null!=r&&o<0?r.replace("$",s):n.replace("$",s):null!=i&&0==o?i.replace("$",s):s}function l(t){return null==t?"":t?"S":"N"}function u(e){if(null==e)return""
if("string"==typeof e)return e
if("boolean"==typeof e)return t.formatBoolean(e)
if("number"==typeof e){return(""+e).indexOf(".")>=0?t.formatCurr(e):t.formatNum(e)}return e instanceof Date?t.formatDate(e):e instanceof t.WComponent?t.format(e.getState()):""+e}function d(t,e){switch(t){case 0:return e?"Domenica":"Dom"
case 1:return e?"Luned&igrave;":"Lun"
case 2:return e?"Marted&igrave;":"Mar"
case 3:return e?"Mercoled&igrave;":"Mer"
case 4:return e?"Giove&igrave;":"Gio"
case 5:return e?"Venerd&igrave;":"Ven"
case 6:return e?"Sabato":"Sab"}return""}function c(t,e,n){switch(t>100&&(n=Math.floor(t/100),t%=100),n=n?" "+n:"",t){case 1:return e?"Gennaio"+n:"Gen"+n
case 2:return e?"Febbraio"+n:"Feb"+n
case 3:return e?"Marzo"+n:"Mar"+n
case 4:return e?"Aprile"+n:"Apr"+n
case 5:return e?"Maggio"+n:"Mag"+n
case 6:return e?"Giugno"+n:"Giu"+n
case 7:return e?"Luglio"+n:"Lug"+n
case 8:return e?"Agosto"+n:"Ago"+n
case 9:return e?"Settembre"+n:"Set"+n
case 10:return e?"Ottobre"+n:"Ott"+n
case 11:return e?"Novembre"+n:"Nov"+n
case 12:return e?"Dicembre"+n:"Dic"+n}return""}var f={},p={}
t.global={locale:"it",init:function(e){t.debug&&console.log("[WUX] global.init..."),t.debug&&console.log("[WUX] global.init completed"),e&&e()},setData:function(t,e,n){if(void 0===n&&(n=!1),t||(t="global"),f[t]=e,!n&&p[t])for(var i=0,r=p[t];i<r.length;i++){var o=r[i]
o(e)}},getData:function(t,e){t||(t="global")
var n=f[t]
return null==n?e:n},onDataChanged:function(t,e){t||(t="global"),p[t]||(p[t]=[]),p[t].push(e)}}
var g=function(){function t(){}return t.FORM="padding-top:16px;",t.FORM_GROUP="form-group",t.FORM_CTRL="form-control",t.ICON="margin-right:8px;",t.SEL_ROW="primary-bg-a2",t}()
t.CSS=g
var m=function(){function t(){}return t.OK="OK",t.CLOSE="Chiudi",t.CANCEL="Annulla",t}()
t.RES=m,t.formatDate=e,t.isoDate=n,t.formatDateTime=i,t.formatTime=r,t.formatNum2=o,t.formatNum=s,t.formatCurr=a,t.formatCurr5=h,t.formatBoolean=l,t.format=u,t.formatDay=d,t.formatMonth=c}(WUX||(WUX={}))
var WUX
!function(t){var e=function(t){function e(e){return t.call(this,null,"Wrapp",e)||this}return __extends(e,t),e.prototype.render=function(){return this.isText=!1,"string"==typeof this.props&&(!this.props||this.props.indexOf("<")<0)?(this.isText=!0,this.buildRoot(this.rootTag,this.props)):this.props},e.prototype.componentDidMount=function(){this.root&&!this.isText&&(this.rootTag=this.root.tagName,this.id=this.root.getAttribute("id"),this._classStyle=this.root.getAttribute("class"),this._style=this.root.getAttribute("style"))},e}(t.WComponent)
t.Wrapp=e
var n=function(n){function i(e,i,r,o,s,a){var h=n.call(this,e||"*","WContainer",a,i,t.style(r),o)||this
return h.cint=[],h.comp=[],h.sr_c=[],h.grid=[],h.rootTag=s?"span":"div",h}return __extends(i,n),i.prototype.addRow=function(e,n){e||(e="row")
var i=[],r=t.style(n)
return r&&(e+="^"+r),i.push(e),this.grid.push(i),this},i.prototype.addCol=function(e,n){e||(e="col-12"),isNaN(parseInt(e))||(e="col-"+e),this.grid.length||this.addRow()
var i=this.grid[this.grid.length-1],r=t.style(n)
return r&&(e+="^"+r),i.push(e),this},i.prototype.add=function(t,n){if(!t)return this
if("string"==typeof t)return this.add(new e(t),n),this
if(t instanceof Element)return this.add(new e(t),n),this
if(t.parent||(t.parent=this),!this.grid.length)return this.cint.push(t),this
if("push"==n)return this.cint.push(t),this
if("unshift"==n)return this.cint.unshift(t),this
if(0==this.grid.length)return this.cint.push(t),this
var i=this.grid.length-1
if(n){var r=parseInt(n)
if(!isNaN(r)){if(r<0)return this.cint.push(t),this
i=r}}var o=this.grid[i],s=o.length-1
return this.comp.push(t),this.sr_c.push(this.subId(i+"_"+s)),this},i.prototype.addGroup=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n]
if(t){var i=this.addContainer(t)
if(!e||!e.length)return this
for(var r=0,o=e;r<o.length;r++){var s=o[r]
s&&i.add(s)}return this}if(!e||!e.length)return this
for(var a=0,h=e;a<h.length;a++){var s=h[a]
s&&this.add(s)}return this},i.prototype.addLine=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n]
var r=new i
if(r.addRow(),e){var o="1"
"string"!=typeof t&&((o=t.n)||(o="1"))
for(var s=0,a=e;s<a.length;s++){var h=a[s]
h&&r.addCol(o,t).add(h)}}return this.add(r),this},i.prototype.addStack=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n]
var r=new i
if(e){var o="12"
"string"!=typeof t&&((o=t.n)||(o="12"))
for(var s=0,a=e;s<a.length;s++){var h=a[s]
h&&r.addRow().addCol(o,t).add(h)}}return this.add(r),this},i.prototype.addContainer=function(e,n,r,o,s,a){var h
return"string"==typeof e?(h=new i(e,n,r,o,s,a),this.add(h)):e instanceof i?(e.parent=this,this.add(e,n)):(h=new i,e&&(h.classStyle=t.cls(e.classStyle,e.style),h.style=t.style(e.style),h.attributes=e.attributes),this.add(h,n)),h},i.prototype.addDiv=function(e,n,i,r){if("number"==typeof e){if(e<1)return this
var o=t.build("div",n,{h:e,n:i})
return this.add(o)}var o=t.build("div",n,e,i,r)
return this.add(o)},i.prototype.end=function(){return this.parent instanceof i?this.parent.end():this},i.prototype.render=function(){var t="",e=this.grid.length
if(e)for(var n=0;n<e;n++){var i=this.grid[n],r=i.length
if(r){t+="<div "+this.cs(i[0])+' id="'+this.subId(n+"_0")+'">'
for(var o=1;o<r;o++)t+='<div id="'+this.subId(n+"_"+o)+'" '+this.cs(i[o])+"></div>"
t+="</div>"}}return this.w0||(this.w0=""),this.w1||(this.w1=""),this.w0+this.buildRoot(this.rootTag,t)+this.w1},i.prototype.componentDidMount=function(){for(var t=0;t<this.cint.length;t++){var e=this.cint[t]
e.mount(this.root)}for(var t=0;t<this.comp.length;t++){var e=this.comp[t],n=document.getElementById(this.sr_c[t])
n&&e.mount(n)}},i.prototype.componentWillUnmount=function(){for(var t=0,e=this.cint;t<e.length;t++){var n=e[t]
n.unmount()}for(var i=0,r=this.comp;i<r.length;i++){var n=r[i]
n.unmount()}},i.prototype.cs=function(t){if(!t)return""
var e=t.indexOf("^")
return e<0?'class="'+t+'"':'class="'+t.substring(0,e)+'" style="'+t.substring(e+1)+'"'},i.prototype.getElement=function(t,e){if(!this.grid||!this.grid.length)return null
if(t<0&&(t=this.grid.length+t)<0&&(t=0),this.grid.length<=t)return null
if(null==e)return document.getElementById(this.subId(t+"_0"))
var n=this.grid[t]
return!n||n.length<2?null:(e<0&&(e=n.length-1+e)<0&&(e=0),e++,document.getElementById(this.subId(t+"_"+e)))},i}(t.WComponent)
t.WContainer=n
var i=function(e){function n(t,n,i,r,o,s,a,h){var l=e.call(this,t||"*","WLink",i,r,o,s)||this
return l.updateState(n),l.rootTag="a",l._href=a,l._target=h,l}return __extends(n,e),Object.defineProperty(n.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"href",{get:function(){return this._href},set:function(t){this._href=t,this.root&&(t?this.root.setAttribute("href",t):this.root.removeAttribute("href"))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"target",{get:function(){return this._target},set:function(t){this._target=t,this.root&&(t?this.root.setAttribute("target",t):this.root.removeAttribute("target"))},enumerable:!1,configurable:!0}),n.prototype.render=function(){var e=""
this._href&&(e+='href="'+this._href+'"'),this._target&&(e&&(e+=" "),e+='target="'+this._target+'"')
var n=""
return this.state?n+=t.buildIcon(this.icon,""," ")+this.state:n+=t.buildIcon(this.icon),this.build(this.rootTag,n,e)},n.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},n.prototype.componentWillUpdate=function(e,n){var i=""
i+=n?t.buildIcon(this.icon,""," ")+n:t.buildIcon(this.icon),this.root.innerHTML=i},n}(t.WComponent)
t.WLink=i
var r=function(e){function n(t,n,i,r,o,s){var a=e.call(this,t||"*","WLabel",i,r,o,s)||this
return a.rootTag="span",a.updateState(n),a}return __extends(n,e),Object.defineProperty(n.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),n.prototype.updateState=function(n){n||(n=""),e.prototype.updateState.call(this,n),this.root&&(this.root.innerHTML=t.buildIcon(this.props,""," ")+n)},n.prototype.for=function(e){return this.forId=t.getId(e),this},n.prototype.render=function(){var e=this.state?this.state:""
return this.forId?this.buildRoot("label",t.buildIcon(this.props,""," ")+e,'for="'+this.forId+'"',this._classStyle):this.buildRoot(this.rootTag,t.buildIcon(this.props,""," ")+e,null,this._classStyle)},n.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},n}(t.WComponent)
t.WLabel=r
var o=function(t){function e(e,n,i,r,o,s){var a=t.call(this,e||"*","WInput",n,r,o,s)||this
return a.rootTag="input",a.size=i,a}return __extends(e,t),e.prototype.updateState=function(e){e||(e=""),t.prototype.updateState.call(this,e),this.root&&(this.root.value=e)},e.prototype.getState=function(){return this.root&&(this.state=this.root.value),this.state},e.prototype.render=function(){var t=""
if(this.label){t=this.id?'<label for="'+this.id+'">':"<label>"
var e=this.label.lastIndexOf("<br")
e>0?(t+=this.label.substring(0,e).replace("<","&lt;").replace(">","&gt;"),t+="</label><br>"):(t+=this.label.replace("<","&lt;").replace(">","&gt;"),t+="</label> ")}if("static"==this.props)return t+this.build("span",this.state)
var n='name="'+this.id+'"'
return n+=this.props?' type="'+this.props+'"':' type="text"',this.size&&(n+=' size="'+this.size+'"'),this.state&&(n+=' value="'+this.state+'"'),this.placeHolder&&(n+=' placeholder="'+this.placeHolder+'"'),this.readonly&&(n+=" readonly"),t+this.build(this.rootTag,"",n)},e}(t.WComponent)
t.WInput=o
var s=function(e){function n(t,n,i,r,o){var s=e.call(this,t||"*","WTextArea",n,i,r,o)||this
return s.rootTag="textarea",n||(s.props=5),s}return __extends(n,e),n.prototype.updateState=function(t){t||(t=""),e.prototype.updateState.call(this,t),this.root&&(this.root.value=t)},n.prototype.getState=function(){return this.root&&(this.state=this.root.value),this.state},n.prototype.render=function(){return this.props||(this.props=1),this._style?this._style.indexOf("width")<0&&(this._style+=";width:100%"):this._style="width:100%",this._attributes?this._style.indexOf("rows=")<0&&(this._attributes+=' rows="'+this.props+'"'):this._attributes='rows="'+this.props+'"',this.readonly?this._attributes?this._attributes.indexOf("readonly")<0&&(this._attributes+=" readonly"):this._attributes="readonly":this._attributes&&this._attributes.indexOf("readonly")>=0&&this._attributes.replace("readonly",""),t.build("textarea","",this._style,this._attributes,this.id,this._classStyle)},n.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip),this.state&&this.root.setAttribute("value",this.state)},n}(t.WComponent)
t.WTextArea=s
var a=function(e){function n(t,n,i,r,o,s,a){var h=e.call(this,t||"*","WButton",i,r,o,s)||this
return h.updateState(n),h.rootTag="button",h.type=a||"button",h}return __extends(n,e),Object.defineProperty(n.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),n.prototype.setText=function(t,e){null!=e&&(this.props=e),this.setState(t)},n.prototype.render=function(){var e=this.type?'type="'+this.type+'"':"",n=""
return this.state?n+=t.buildIcon(this.props,""," ")+this.state:n+=t.buildIcon(this.props),this.build(this.rootTag,n,e)},n.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},n.prototype.componentWillUpdate=function(e,n){var i=""
null==e&&(e=this.props),i+=n?t.buildIcon(e,""," ")+n:t.buildIcon(e),this.root.innerHTML=i},n}(t.WComponent)
t.WButton=a
var h=function(t){function e(e,n,i,r,o,s,a){var h=t.call(this,e||"*","WCheck",r,o,s,a)||this
return h.rootTag="input",h.value=i||"1",r&&h.updateState(i),h._text=n,h}return __extends(e,t),Object.defineProperty(e.prototype,"text",{get:function(){return this._text},set:function(t){this._text=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"checked",{get:function(){return this.root&&(this.props=!!this.root.checked),this.state=this.props?this.value:void 0,this.props},set:function(t){this.setProps(t)},enumerable:!1,configurable:!0}),e.prototype.getState=function(){return this.root&&(this.props=!!this.root.checked),this.state=this.props?this.value:void 0,this.state},e.prototype.updateProps=function(e){t.prototype.updateProps.call(this,e),this.state=this.props?this.value:void 0,this.root&&(this.props?this.root.setAttribute("checked","checked"):this.root.removeAttribute("checked"))},e.prototype.updateState=function(e){"boolean"==typeof e&&(e=e?this.value:void 0),t.prototype.updateState.call(this,e),this.props=void 0!=this.state,this.root&&(this.props?this.root.setAttribute("checked","checked"):this.root.removeAttribute("checked"))},e.prototype.render=function(){var t='name="'+this.id+'" type="checkbox"'
t+=this.props?' checked="checked"':""
var e=this._text?"&nbsp;"+this._text:""
return this.build(this.rootTag,e,t)},e.prototype.componentDidMount=function(){var t=this
this._tooltip&&this.root.setAttribute("title",this._tooltip),this._obs=new MutationObserver(function(){t.props=!!t.root.checked,t.trigger("propschange",t.props),t.trigger("statechange",t.props?t.value:void 0)})},e}(t.WComponent)
t.WCheck=h
var l=function(e){function n(t,n,i,r,o,s){var a=e.call(this,t||"*","WSelect",null,r,o,s)||this
return a.rootTag="select",a.options=n,a.multiple=i,a}return __extends(n,e),n.prototype.getProps=function(){if(!this.root)return this.props
this.props=[]
var e=this.root.options
if(e&&e.length){var n=t.WUtil.toNumber(this.root.selectedIndex,-1)
n>=0&&e.length>n&&this.props.push(e[n].text)}return this.props},n.prototype.select=function(t){return this.root&&this.options?(this.setState(this.options.length>t?this.options[t]:null),this):this},n.prototype.addOption=function(t,e){if(!t)return this
if(this.options||(this.options=[]),this.options.push(t),!this.mounted)return this
var n=this.buildOptions()
return this.root.innerHTML=n,e&&this.updateState(t),this},n.prototype.remOption=function(t){if(!t||!this.options)return this
for(var e=-1,n=0;n<this.options.length;n++){var i=this.options[n]
if(i)if("string"==typeof t){if("string"==typeof i){if(i==t){e=n
break}}else if(i.id==t){e=n
break}}else if("string"==typeof i){if(i==t.id){e=n
break}}else if(i.id==t.id){e=n
break}}if(e>=0){if(this.options.splice(e,1),!this.mounted)return this
var r=this.buildOptions()
this.root.innerHTML=r}return this},n.prototype.setOptions=function(e,n){if(this.options=e,!this.mounted)return this
var i=this.root.value,r=this.buildOptions()
return this.root.innerHTML=r,n?this.root.value=i:e&&e.length&&("string"==typeof e[0]?this.trigger("statechange",e[0]):this.trigger("statechange",t.WUtil.getString(e[0],"id"))),this},n.prototype.updateState=function(t){e.prototype.updateState.call(this,t),this.root&&(null==this.state?this.root.value="":"string"==typeof this.state||"number"==typeof this.state?this.root.value=""+this.state:this.root.value=this.state.id)},n.prototype.render=function(){var t=this.buildOptions(),e='name="'+this.id+'"'
return this.multiple&&(e+=' multiple="multiple"'),this.buildRoot("select",t,e)},n.prototype.componentDidMount=function(){var t=this
this._tooltip&&this.root.setAttribute("title",this._tooltip),this.state&&(this.root.value=this.state),this.root.addEventListener("change",function(){t.trigger("statechange",t.root.value)})},n.prototype.buildOptions=function(){var t=""
this.options||(this.options=[])
for(var e=0,n=this.options;e<n.length;e++){var i=n[e]
t+="string"==typeof i?"<option>"+i+"</option>":'<option value="'+i.id+'">'+i.text+"</option>"}return t},n}(t.WComponent)
t.WSelect=l
var u=function(e){function n(n,i,r,o,s,a,h){var l=e.call(this,n||"*","WTable",h,o,s,a)||this
if(l.selectedRow=-1,l.rootTag="table",l.header=i,r&&r.length)l.keys=r
else if(l.keys=[],l.header)for(var u=0;u<l.header.length;u++)l.keys.push(u)
return l.widths=[],l.selClass=t.CSS.SEL_ROW,l}return __extends(n,e),n.prototype.onSelectionChanged=function(t){this.handlers._selectionchanged||(this.handlers._selectionchanged=[]),this.handlers._selectionchanged.push(t)},n.prototype.onDoubleClick=function(t){this.handlers._doubleclick||(this.handlers._doubleclick=[]),this.handlers._doubleclick.push(t)},n.prototype.onRowPrepared=function(t){this.handlers._rowprepared||(this.handlers._rowprepared=[]),this.handlers._rowprepared.push(t)},n.prototype.clearSelection=function(){if(this.selectedRow=-1,!this.mounted)return this
var e=document.getElementById(this.id+"-b")
if(e&&this.selClass)for(var n=e.childNodes,i=0;i<e.childElementCount;i++)t.removeClassOf(n[i],this.selClass)
if(!this.handlers._selectionchanged)return this
for(var r=0,o=this.handlers._selectionchanged;r<o.length;r++){(0,o[r])({element:this.root,selectedRowsData:[]})}return this},n.prototype.select=function(e){if(e||(e=[]),this.selectedRow=e.length?e[0]:-1,!this.mounted)return this
var n=document.getElementById(this.id+"-b")
if(n&&this.selClass)for(var i=n.childNodes,r=0;r<n.childElementCount;r++)e.indexOf(r)>=0?t.addClassOf(i[r],this.selClass):t.removeClassOf(i[r],this.selClass)
if(!this.handlers._selectionchanged)return this
for(var o=[],s=0,a=e;s<a.length;s++){var h=a[s]
this.state&&this.state.length>h&&o.push(this.state[h])}for(var l=0,u=this.handlers._selectionchanged;l<u.length;l++){(0,u[l])({element:this.root,selectedRowsData:o})}return this},n.prototype.selectAll=function(e){if(!this.mounted)return this
if(e&&this.selectedRow>=0)return this.clearSelection()
this.selectedRow=-1,this.state&&this.state.length&&(this.selectedRow=0)
var n=document.getElementById(this.id+"-b")
if(n&&this.selClass)for(var i=n.childNodes,r=0;r<n.childElementCount;r++)t.addClassOf(i[r],this.selClass)
if(!this.handlers._selectionchanged)return this
for(var o=0,s=this.handlers._selectionchanged;o<s.length;o++){(0,s[o])({element:this.root,selectedRowsData:this.state})}return this},n.prototype.getSelectedRows=function(){return this.mounted?this.selectedRow<0?[]:[this.selectedRow]:[]},n.prototype.getSelectedRowsData=function(){return this.mounted?this.selectedRow<0?[]:this.state&&this.state.length?this.state.length<=this.selectedRow?[]:[this.state[this.selectedRow]]:[]:[]},n.prototype.render=function(){if(this.sortable&&this.sortable.length){this.soId=[],this.sortBy=[]
for(var e=0;e<this.sortable.length;e++)this.sortBy.push(0)}var n="table"
this._classStyle&&(n=this._classStyle.indexOf("table ")>=0?this._classStyle:n+" "+this._classStyle)
var i=this.style?' style="'+this.style+'"':"",r=""
if(this.div&&(r+='<div id="'+this.id+'-c" class="'+this.div+'">'),r+='<table id="'+this.id+'" class="'+n+'"'+i+">",this.header&&this.header.length){var o=!1
if("string"==typeof this.headStyle?this.headStyle.indexOf("text-align")>0&&(o=!0):this.headStyle&&this.headStyle.a&&(o=!0),!this.hideHeader){r+=o?'<thead id="'+this.id+'-h"><tr>':'<thead id="'+this.id+'-h"><tr'+t.buildCss(this.headStyle)+">"
for(var s=-1,a=0,h=this.header;a<h.length;a++){var l=h[a]
s++
var u=void 0
u=0==s?this.col0Style?this.col0Style:this.colStyle:s==this.header.length-1?this.colLStyle?this.colLStyle:this.colStyle:o?this.headStyle:this.colStyle
var d=this.widths&&this.widths.length>s?this.widths[s]:0,c={}
d&&(c.w=this.widthsPerc?d+"%":d)
"w"==this.getType(s)&&(c.a="center")
if(this.sortable&&this.sortable.indexOf(s)>=0){var f=this.subId("sort_"+s)
this.soId.push(f),r+="<th"+t.buildCss(u,c)+'><a style="cursor:pointer;text-decoration:none !important;" id="'+f+'">'+l+' &nbsp;<i class="fa fa-unsorted"></i></a></th>'}else r+="<th"+t.buildCss(u,c)+">"+l+"</th>"}r+="</tr></thead>"}}return r+='<tbody id="'+this.id+'-b"></tbody>',r+="</table>",this.div&&(r+="</div>"),r},n.prototype.componentDidMount=function(){var e=this
if(this.buildBody(),this.soId)for(var n=0,i=this.soId;n<i.length;n++){var r=i[n]
!function(n){var i=document.getElementById(n)
i&&i.addEventListener("click",function(n){var r=t.lastSub(t.getId(n.currentTarget)),o=r.indexOf("_")
if(!(o<=0)){var s=t.WUtil.toNumber(r.substring(o+1),-1)
if(s>=0&&e.header&&e.header.length>s){var a=e.handlers._sort,h=!(a&&a.length)&&e.keys&&e.keys.length>s,l=e.header[s],u=e.sortBy[s]
if(u?1==u?(e.sortBy[s]=-1,l&&(i.innerHTML=l+' &nbsp;<i class="fa fa-sort-desc"></i>'),h&&e.setState(t.WUtil.sort(e.state,!1,e.keys[s]))):-1==u&&(e.sortBy[s]=0,l&&(i.innerHTML=l+' &nbsp;<i class="fa fa-unsorted"></i>')):(e.sortBy[s]=1,l&&(i.innerHTML=l+' &nbsp;<i class="fa fa-sort-asc"></i>'),h&&e.setState(t.WUtil.sort(e.state,!0,e.keys[s]))),a)for(var d=0,c=a;d<c.length;d++){var f=c[d]
f(e.createEvent("_sort",e.sortBy))}}}})}(r)}var o=document.getElementById(this.id+"-b")
o&&(o.addEventListener("click",function(n){if(e.selectionMode&&"none"!=e.selectionMode&&e.handlers._selectionchanged){var i=n.target
if(i){var r=i.closest("tr")
if(r){var o=t.WUtil.toNumber(t.lastSub(r),-1)
o<0||e.select([o])}}}}),o.addEventListener("dblclick",function(n){if(e.handlers._doubleclick){var i=n.target
if(i){var r=i.closest("tr")
if(r){var o=t.WUtil.toNumber(t.lastSub(r),-1)
if(!(o<0))for(var s=e.state&&e.state.length>o?e.state[o]:null,a=0,h=e.handlers._doubleclick;a<h.length;a++){var l=h[a]
l({element:e.root,rowElement:r,data:s,rowIndex:o})}}}}}))},n.prototype.componentDidUpdate=function(t,e){this.buildBody()},n.prototype.getType=function(t){return this.types?this.types.length<=t?"":this.types[t]:""},n.prototype.buildBody=function(){var e=document.getElementById(this.id+"-b")
if(e){if(!this.state||!this.state.length)return void(e.innerHTML="")
if(!this.keys||!this.keys.length)return void(e.innerHTML="")
for(var n="",i=-1,r=0,o=this.state;r<o.length;r++){var s=o[r]
i++
var a=""
a=i==this.state.length-1&&this.footerStyle?"<tr"+t.buildCss(this.footerStyle)+' id="'+this.id+"-"+i+'">':"<tr"+t.buildCss(this.rowStyle)+' id="'+this.id+"-"+i+'">'
for(var h=-1,l=0,u=this.keys;l<u.length;l++){var d=u[l],c=s[d],f=""
null==c&&(c=""),h++
var p=this.getType(h)
switch(p){case"w":f="text-center"
break
case"c":case"c5":case"i":case"n":f="text-right"
break
case"b":c=c?"&check;":""
break
default:c instanceof Date&&(c=c.toLocaleDateString()),"boolean"==typeof c&&(c=c?"&check;":""),"number"==typeof c&&(f="text-right")}var g=void 0
g=0==h?this.col0Style?this.col0Style:this.colStyle:h==this.header.length-1&&this.colLStyle?this.colLStyle:this.colStyle,"string"==typeof g?g.indexOf("text-align")>0&&(f=""):g&&g.a&&(f="")
var m=this.widths&&this.widths.length>h?this.widths[h]:0
a+="<td"+t.buildCss(g,f,{w:m})+">"+c+"</td>"}if(this.header&&this.header.length>this.keys.length)for(var y=0;y<this.header.length-this.keys.length;y++)a+="<td"+t.buildCss(this.colStyle)+"></td>"
if(a+="</tr>",this.handlers._rowprepared){var p=document.createElement("template")
p.innerHTML=a
for(var b={element:this.root,rowElement:p.content.firstElementChild,data:s,rowIndex:i},v=0,w=this.handlers._rowprepared;v<w.length;v++){(0,w[v])(b)}a=p.innerHTML}n+=a}e.innerHTML=n}},n.prototype.onSort=function(t){this.handlers._sort||(this.handlers._sort=[]),this.handlers._sort.push(t)},n}(t.WComponent)
t.WTable=u
var d=function(e){function i(n,i,r){var o=e.call(this,n||"*","WFormPanel")||this
return o.rootTag="form",o._attributes=r?'role="form" name="'+o.id+'" action="'+r+'"':'role="form" name="'+o.id+'" action="javascript:void(0);"',o.title=i,t.CSS.FORM&&(t.CSS.FORM.indexOf(":")>0?o.style=t.CSS.FORM:o.classStyle=t.CSS.FORM),o.init(),o}return __extends(i,e),i.prototype.init=function(){return this.rows=[],this.roww=[],this.currRow=null,this.footer=[],this.addRow(),this},i.prototype.focus=function(){if(!this.mounted)return this
var t=this.first(!0)
return t&&(t.component?t.component.focus():t.element instanceof HTMLElement&&t.element.focus()),this},i.prototype.first=function(t){if(!this.rows)return null
for(var e=0,n=this.rows;e<n.length;e++)for(var i=n[e],r=0,o=i;r<o.length;r++){var s=o[r]
if(!t)return s
if((null==s.enabled||s.enabled)&&(null==s.readonly||!s.readonly))return s}return null},i.prototype.focusOn=function(t){if(!this.mounted)return this
var e=this.getField(t)
return e?(e.component?e.component.focus():e.element instanceof HTMLElement&&e.element.focus(),this):this},i.prototype.getField=function(t){if(t)for(var e=0==t.indexOf(this.id+"-")?t:this.subId(t),n=0;n<this.rows.length;n++)for(var i=this.rows[n],r=0;r<i.length;r++){var o=i[r]
if(o.id==e)return o}},i.prototype.addRow=function(e,n,i,r,o){return void 0===o&&(o="row"),this.currRow&&!this.currRow.length?(this.roww[this.roww.length-1]={classStyle:e,style:n,id:i,attributes:t.attributes(r),type:o},this):(this.currRow=[],this.rows.push(this.currRow),this.roww.push({classStyle:e,style:n,id:i,attributes:t.attributes(r),type:o}),this)},i.prototype.addTextField=function(e,n,i){var r=this.subId(e),s=new o(r,"text",0,t.CSS.FORM_CTRL)
return s.readonly=i,this.currRow.push({id:r,label:n,component:s,readonly:i,type:"text"}),this},i.prototype.addNoteField=function(e,n,i,r){i||(i=3)
var o=this.subId(e),a=new s(o,i,t.CSS.FORM_CTRL)
return a.readonly=r,this.currRow.push({id:o,label:n,component:a,readonly:r,type:"note"}),this},i.prototype.addDateField=function(e,n,i){var r=this.subId(e),s=new o(r,"date",0,t.CSS.FORM_CTRL)
return s.readonly=i,this.currRow.push({id:r,label:n,component:s,readonly:i,type:"date"}),this},i.prototype.addTimeField=function(e,n,i){var r=this.subId(e),s=new o(r,"time",0,t.CSS.FORM_CTRL)
return s.readonly=i,this.currRow.push({id:r,label:n,component:s,readonly:i,type:"time"}),this},i.prototype.addEmailField=function(e,n,i){var r=this.subId(e),s=new o(r,"email",0,t.CSS.FORM_CTRL)
return s.readonly=i,this.currRow.push({id:r,label:n,component:s,readonly:i,type:"email"}),this},i.prototype.addOptionsField=function(e,n,i,r,o){var s=this.subId(e),a=new l(s,i,!1,t.CSS.FORM_CTRL,"",r)
return this.currRow.push({id:s,label:n,component:a,readonly:o,type:"select"}),this},i.prototype.addBooleanField=function(e,n){var i=this.subId(e),r=new h(i,"")
return r.classStyle=t.CSS.FORM_CTRL,this.currRow.push({id:i,label:n,component:r,type:"boolean"}),this},i.prototype.addBlankField=function(t,e,i){var r=new n("",e,i)
return this.currRow.push({id:"",label:t,component:r,classStyle:e,style:i,type:"blank"}),this},i.prototype.addInternalField=function(t,e){return void 0===e&&(e=null),this.currRow.push({id:this.subId(t),value:e,type:"internal"}),this},i.prototype.addComponent=function(t,e,n){return n?(t?(n.id=this.subId(t),this.currRow.push({id:this.subId(t),label:e,component:n,type:"component"})):(n.id="",this.currRow.push({id:"",label:e,component:n,type:"component"})),this):this},i.prototype.addToFooter=function(t){return t||this.footer?(this.footer.push(t),this):this},i.prototype.componentDidMount=function(){this.main=new n(this.id+"-c")
for(var e=0;e<this.rows.length;e++){var i=this.roww[e]
this.main.addRow(t.cls(i.type,i.classStyle,i.style),t.style(i.style))
for(var o=this.rows[e],s=0,a=0;a<o.length;a++){var l=o[a]
l.component&&(s+=l.span&&l.span>0?l.span:1)}for(var u=!!t.CSS.FORM_GROUP,a=0;a<o.length;a++){var l=o[a]
if(l.component){var d=Math.floor(12/s)
if(d<1&&(d=1),1==d&&s<11&&(0==a||a==s-1)&&(d=2),l.span&&l.span>0&&(d*=l.span),this.main.addCol(""+d),l.component.setState(l.value),l.component instanceof h){if(!this.checkboxStyle){var c=getComputedStyle(this.context).getPropertyValue("font-size"),f=Math.round(.8*parseInt(c));(isNaN(f)||f<18)&&(f=18),this.checkboxStyle="height:"+f+"px;"}l.component.style=this.checkboxStyle}if(l.label&&!l.labelComp){var p=new r(l.id+"-l",l.label,"",l.classStyle)
l.labelComp=p.for(l.id)}u?this.main.addGroup({classStyle:t.CSS.FORM_GROUP},l.labelComp,l.component):(this.main.add(l.labelComp),this.main.add(l.component))}}}if(this.footer&&this.footer.length){this.foot=new n(this.subId("__foot"),this.footerClass,this.footerStyle)
for(var g=0,m=this.footer;g<m.length;g++){var l=m[g]
this.foot.addRow().addCol("12").add(l,"push")}this.main.addRow().addCol("12").add(this.foot)}this.main.mount(this.root)},i.prototype.componentWillUnmount=function(){this.main||this.main.unmount()},i.prototype.clear=function(){for(var t=0;t<this.rows.length;t++)for(var e=this.rows[t],n=0;n<e.length;n++){var i=e[n]
i.component&&i.component.setState(null),i.value=null}return this},i.prototype.setValue=function(e,n,i){void 0===i&&(i=!0)
var r=this.getField(e)
return r?("date"==r.type&&(n=t.isoDate(n)),"time"==r.type&&(n=t.formatTime(n,!1)),r.component&&r.component.setState(n),r.value=n,i&&(this.state||(this.state={}),this.state[e]=n),this):this},i.prototype.getValue=function(t){var e="string"==typeof t?this.getField(t):t
return e?e.component?e.component.getState():e.value:null},i.prototype.getValues=function(){for(var t={},e=0;e<this.rows.length;e++)for(var n=this.rows[e],i=0;i<n.length;i++){var r=n[i]
t[this.ripId(r.id)]=r.component?r.component.getState():r.value}return t},i.prototype.getState=function(){return this.state=this.getValues(),this.state},i.prototype.updateState=function(n){e.prototype.updateState.call(this,n),!n||t.WUtil.isEmpty(n)?this.clear():this.updateView()},i.prototype.updateView=function(){if(!this.state)return void this.clear()
for(var t in this.state)this.setValue(t,this.state[t],!1)},i}(t.WComponent)
t.WFormPanel=d}(WUX||(WUX={}))
var WUX
!function(t){function e(t){var e=window.jQuery?window.jQuery:null
if(!e)return console.error("[WUX] jQuery is not available"),null
var n=e(t)
return n.length?n:(console.error("[WUX] !jQuery("+t+").length==true"),null)}t.JQ=e
var n=function(n){function i(e,i,r,o,s,a,h){void 0===i&&(i="WDialog"),void 0===r&&(r=!0),void 0===o&&(o=!0)
var l=n.call(this,e,i,void 0,s,a,h)||this
if(l.buttons=[],l.tagTitle="h5",o&&(r||(l.txtCancel=t.RES.CLOSE),l.buttonCancel()),r&&l.buttonOk(),l.ok=!1,l.cancel=!1,l.isShown=!1,l.id&&"*"!=l.id){var u=document.getElementById(l.id)
u&&u.remove()}return WuxDOM.onRender(function(t){l.mounted||l.mount(t.element)}),l}return __extends(i,n),i.prototype.makeUp=function(t,e,n){return this.title=t,this.body.addRow().addCol("12").add(e),n&&(this.hh=n),this},i.prototype.onShownModal=function(t){this.sh=t},i.prototype.onHiddenModal=function(t){this.hh=t},Object.defineProperty(i.prototype,"header",{get:function(){return this.cntHeader?this.cntHeader:(this.cntHeader=new t.WContainer("","modal-header"),this.cntHeader)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"body",{get:function(){return this.cntBody?this.cntBody:(this.cntBody=new t.WContainer("",t.cls("modal-body",this._classStyle),"",this._attributes),this.cntBody)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"footer",{get:function(){return this.cntFooter?this.cntFooter:(this.cntFooter=new t.WContainer("","modal-footer"),this.cntFooter)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"title",{get:function(){return this._title},set:function(e){var n=this
this._title=e
var i=document.getElementById(this.subId("title"))
i?i.innerText=e:(this.btnClose=new t.WButton(this.subId("bhc"),'<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>',void 0,"close","",'data-dismiss="modal"'),this.btnClose.on("click",function(t){n.close()}),this.header.add(this.buildTitle()).add(this.btnClose))},enumerable:!1,configurable:!0}),i.prototype.onClickOk=function(){return!0},i.prototype.onClickCancel=function(){return!0},i.prototype.buildBtnOK=function(){return new t.WButton(this.subId("bfo"),t.RES.OK,"","btn btn-primary button-sm","","")},i.prototype.buildBtnCancel=function(){return this.txtCancel?new t.WButton(this.subId("bfc"),this.txtCancel,"","btn btn-secondary button-sm","",""):new t.WButton(this.subId("bfc"),t.RES.CANCEL,"","btn btn-secondary button-sm","","")},i.prototype.buttonOk=function(){var t=this
if(this.btnOK)return this.btnOK
this.btnOK=this.buildBtnOK(),this.btnOK.on("click",function(e){t.onClickOk()&&(t.ok=!0,t.cancel=!1,t.$r&&t.$r.modal("hide"))}),this.buttons.push(this.btnOK)},i.prototype.buttonCancel=function(){var t=this
if(this.btnCancel)return this.btnCancel
this.btnCancel=this.buildBtnCancel(),this.btnCancel.on("click",function(e){t.onClickCancel()&&(t.ok=!1,t.cancel=!0,t.$r&&t.$r.modal("hide"))}),this.buttons.push(this.btnCancel)},i.prototype.show=function(t,e){this.beforeShow()&&(this.ok=!1,this.cancel=!1,this.parent=t,this.ph=e,this.mounted||WuxDOM.mount(this),this.$r&&(this.$r.modal({backdrop:"static",keyboard:!1,show:!1}),this.$r.modal("show")))},i.prototype.hide=function(){this.$r&&this.$r.modal("hide")},i.prototype.close=function(){this.ok=!1,this.cancel=!1,this.$r&&this.$r.modal("hide")},i.prototype.beforeShow=function(){return!0},i.prototype.onShown=function(){},i.prototype.onHidden=function(){},i.prototype.render=function(){this.isShown=!1,this.cntRoot=new t.WContainer(this.id,"modal inmodal fade","",'role="dialog" aria-hidden="true"'),this.cntMain=this.cntRoot.addContainer("","modal-dialog modal-lg",this._style),this.cntContent=this.cntMain.addContainer("","modal-content"),this.cntHeader&&this.cntContent.addContainer(this.cntHeader),this.cntBody&&this.cntContent.addContainer(this.cntBody)
for(var e=0,n=this.buttons;e<n.length;e++){var i=n[e]
this.footer.add(i)}return this.cntFooter&&this.cntContent.addContainer(this.cntFooter),this.cntRoot},i.prototype.componentDidMount=function(){var t=this
this.root&&(this.$r=e(this.root),this.$r&&(this.$r.on("shown.bs.modal",function(e){t.isShown=!0,t.onShown(),t.sh&&t.sh(e)}),this.$r.on("hidden.bs.modal",function(e){t.isShown=!1,t.onHidden(),t.hh&&t.hh(e),t.ph&&(t.ph(e),t.ph=null)})))},i.prototype.componentWillUnmount=function(){this.isShown=!1,this.btnClose&&this.btnClose.unmount(),this.btnCancel&&this.btnCancel.unmount(),this.cntFooter&&this.cntFooter.unmount(),this.cntBody&&this.cntBody.unmount(),this.cntHeader&&this.cntHeader.unmount(),this.cntContent&&this.cntContent.unmount(),this.cntMain&&this.cntMain.unmount(),this.cntRoot&&this.cntRoot.unmount()},i.prototype.buildTitle=function(){return this.tagTitle||(this.tagTitle="h3"),"<"+this.tagTitle+' class="modal-title" id="'+this.subId("title")+'">'+t.WUtil.toText(this._title)+"</"+this.tagTitle+">"},i}(t.WComponent)
t.WDialog=n
var i=function(e){function n(t,n,i,r){var o=e.call(this,t||"*","WCalendar",1,n,i,r)||this
return o.am=[],o.mt={},o.ct="table",o.cd="table-responsive",o.ct="table",o.sp="padding:1rem;text-align:center;font-weight:bold;background-color:#eeeeee;",o.sm=o.sp,o.sn=o.sp,o.sw="text-align:center;",o.sd="text-align:center;",o.so="text-align:center;background-color:#f6f6f6;cursor:pointer;",o.ss="text-align:center;background-color:#d3e5f5;",o.sk="text-align:center;background-color:#ffea8e;",o.se="background-color:#f0f0f0;",o.st="font-weight:bold;",o.td=o.str(new Date),o}return __extends(n,e),n.prototype.onDoubleClick=function(t){this.handlers._doubleclick||(this.handlers._doubleclick=[]),this.handlers._doubleclick.push(t)},n.prototype.updateState=function(t){this.state=t,this.state||(this.state=new Date)
var e=this.state.getDate(),n=this.state.getMonth(),i=this.state.getFullYear()
this.ls=1e4*i+100*(n+1)+e+""},n.prototype.render=function(){this.state||(this.state=new Date)
for(var e='<table id="'+this.subId("t")+'" class="'+this.ct+'"><thead><tr>',n=0;n<7;n++){var i=6==n?0:n+1
e+='<th id="'+this.subId(i+"")+'" style="'+this.sw+'">'+t.formatDay(i,!1)+"</th>"}e+='</tr></thead><tbody id="'+this.subId("b")+'">',e+=this.body(),e+="</tbody></table>"
var r=this.state.getMonth(),o=this.state.getFullYear(),s=100*o+r+1,a='<a id="'+this.subId("p")+'" title="Mese precedente"><i class="fa fa-arrow-circle-left"></i></a>',h='<a id="'+this.subId("n")+'" title="Mese successivo"><i class="fa fa-arrow-circle-right"></i></a>',l='<div class="row"><div class="col-2" style="'+this.sp+'">'+a+'</div><div id="'+this.subId("m")+'" class="col-8" style="'+this.sm+'">'+t.formatMonth(s,!0,!0)+'</div><div class="col-2" style="'+this.sn+'">'+h+"</div></div>"
return this.cd?l+='<div class="row"><div class="'+this.cd+'">'+e+"</div></div>":l+='<div class="row"><div class="col-12">'+e+"</div></div>",this.buildRoot(this.rootTag,l)},n.prototype.add=function(e){this.state||(this.state=new Date)
var n=this.state.getDate(),i=this.state.getMonth(),r=this.state.getFullYear(),o=i+e,s=new Date(r,o,n),a=s.getMonth()
a!=o&&(s=new Date(r,o+1,0),a=s.getMonth())
var h=s.getFullYear()
if(this.setState(s),this.eb&&(this.eb.innerHTML=this.body()),this.em){var l=100*h+a+1
this.em.innerText=t.formatMonth(l,!0,!0)}return s},n.prototype.mark=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n]
if(!e||!e.length)return this
for(var i=0,r=e;i<r.length;i++){var o=r[i],s=t.WUtil.toDate(o)
if(s){var a=this.str(s)
if(this.am.push(a),a!=this.ls){var h=document.getElementById(this.subId(a))
h&&h.setAttribute("style",this.sk)}}}return this},n.prototype.unmark=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n]
if(!e||!e.length)return this
for(var i=0,r=e;i<r.length;i++){var o=r[i],s=t.WUtil.toDate(o)
if(s){var a=this.str(s)
this.unm(this.am.indexOf(a))}}return this},n.prototype.title=function(e,n){var i=t.WUtil.toDate(e)
if(!i)return this
var r=this.str(i)
this.mt[r]=n
var o=document.getElementById(this.subId(r))
return o&&o.setAttribute("title",n),this},n.prototype.unm=function(t,e){if(void 0===e&&(e=!0),!(t<0)){var n=this.am[t]
if(n){e&&this.am.splice(t,1)
var i=document.getElementById(this.subId(n))
if(i){this.str(this.state)==n?i.setAttribute("style",this.ss):i.setAttribute("style",this.sd)}}}},n.prototype.clear=function(){if(this.am&&this.am.length){for(var t=0;t<this.am.length;t++)this.unm(t,!1)
this.am=[]}if(this.mt){for(var e in this.mt){var n=document.getElementById(this.subId(e))
n&&n.setAttribute("title",null)}this.mt={}}return this},n.prototype.prev=function(){return this.add(-1)},n.prototype.next=function(){return this.add(1)},n.prototype.ele=function(t){return t?document.getElementById(this.subId(this.str(t))):null},n.prototype.str=function(t){return t?1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()+"":null},n.prototype.from=function(){this.state||(this.state=new Date)
var t=this.state.getMonth()
return 1e4*this.state.getFullYear()+100*(t+1)+1+""},n.prototype.to=function(){this.state||(this.state=new Date)
var t=this.state.getMonth(),e=this.state.getFullYear()
return 1e4*e+100*(t+1)+new Date(e,t+1,0).getDate()+""},n.prototype.body=function(){this.state||(this.state=new Date)
var t="",e=this.state.getDate(),n=this.state.getMonth(),i=this.state.getFullYear()
this.ls=1e4*i+100*(n+1)+e+""
var r=new Date(i,n,1),o=r.getDay()
0==o&&(o=7)
for(var s=new Date(i,n+1,0),a=s.getDate(),h=1,l=1;l<=6;l++){t+="<tr>"
for(var u=1;u<=7;u++)if(1==l&&u<o)t+='<td style="'+this.se+'"></td>'
else if(h>a)t+='<td style="'+this.se+'"></td>'
else{var d=1e4*i+100*(n+1)+h+"",c=d==this.td?this.st:"",f=this.mt[d]
f=f?' title="'+f+'"':"",d==this.ls?t+='<td id="'+this.subId(d)+'" style="'+this.ss+c+'"'+f+">"+h+"</td>":this.am.indexOf(d)>=0?t+='<td id="'+this.subId(d)+'" style="'+this.sk+c+'"'+f+">"+h+"</td>":t+='<td id="'+this.subId(d)+'" style="'+this.sd+c+'"'+f+">"+h+"</td>",h++}if(t+="</tr>",h>a)break}return t},n.prototype.componentDidMount=function(){var e=this
this.ep=document.getElementById(this.subId("p")),this.em=document.getElementById(this.subId("m")),this.en=document.getElementById(this.subId("n")),this.et=document.getElementById(this.subId("t")),this.eb=document.getElementById(this.subId("b")),this.ep&&this.ep.addEventListener("click",function(t){e.prev()}),this.en&&this.en.addEventListener("click",function(t){e.next()}),this.root.addEventListener("click",function(n){var i=t.lastSub(n.target)
if(i&&8==i.length){var r=parseInt(i),o=i==e.td?e.st:"",s=e.ele(e.state)
if(s){var a=e.str(e.state),h=a==e.td?e.st:""
e.am.indexOf(a)>=0?s.setAttribute("style",e.sk+h):s.setAttribute("style",e.sd+h)}if(n.target.style=e.ss+o,e.ls==i)return
e.setState(new Date(r/1e4,r%1e4/100-1,r%1e4%100))}}),this.root.addEventListener("dblclick",function(n){var i=t.lastSub(n.target)
i&&8==i.length&&e.trigger("_doubleclick",i)}),this.root.addEventListener("mouseover",function(n){var i=t.lastSub(n.target)
if(i&&8==i.length){var r=i==e.td?e.st:""
n.target.style=e.so+r}}),this.root.addEventListener("mouseout",function(n){var i=t.lastSub(n.target)
if(i&&8==i.length){var r=i==e.td?e.st:""
i==e.str(e.state)?n.target.style=e.ss+r:e.am.indexOf(i)>=0?n.target.style=e.sk+r:n.target.style=e.sd+r}})},n}(t.WComponent)
t.WCalendar=i
var r=function(t){function e(e,n,i){var r=t.call(this,e||"*","WLineChart","",n,i)||this
r.rootTag="canvas",r.forceOnChange=!0
var o=window.innerWidth
return r._w=750,r._h=370,(o<900||o>1920)&&(r._w=Math.round(750*o/1400),r._h=Math.round(370*r._w/750)),r._attributes='width="'+r._w+'" height="'+r._h+'"',r.fontSize=14,r.fontName="Arial",r.axis="#808080",r.grid="#a0a0a0",r.line="#e23222",r.offx=30,r.offy=30,r}return __extends(e,t),e.prototype.size=function(t,e){return this._w=t,this._h=e,this._w<40&&(this._w=40),this._h<40&&(this._h=40),this._attributes='width="'+this._w+'" height="'+this._h+'"',this},Object.defineProperty(e.prototype,"width",{get:function(){return this._w},set:function(t){this._w=t,this._w<40&&(this._w=40),this._attributes='width="'+this._w+'" height="'+this._h+'"'},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._h},set:function(t){this._h=t,this._h<40&&(this._h=40),this._attributes='width="'+this._w+'" height="'+this._h+'"'},enumerable:!1,configurable:!0}),e.prototype.componentDidMount=function(){if(this.state){var t=this.state.series
if(t&&t.length){var e=t[0]
if(e&&!(e.length<2)){var n=this.state.styles,i=this.root,r=i.getContext("2d")
if(r){var o=this.state.labels,s=0,a=0,h=!1
if(o&&o.length==e.length){var l=o[0],u=l?l.length:0,d=u>4?Math.ceil(u/2):2
s=this.fontSize*d+4,a=2*this.fontSize+4,h=!0}var c=i.width-this.offx-a,f=i.height-this.offy-s,p=c/(e.length-1),g=Math.max.apply(Math,e)
g||(g=4),this.maxy&&this.maxy>g&&(g=this.maxy)
for(var m=[Math.round(g/4),Math.round(g/2),Math.round(3*g/4)],y=f/g,b=0;b<t.length;b++){var v=t[b]
if(!v||v.length<e.length)return
var w=this.line
n&&n.length>b&&((w=n[b])||(w=this.line)),r.beginPath(),r.lineWidth=2,r.strokeStyle=w,r.moveTo(this.offx,i.height-s-v[0]*y)
for(var x=1;x<e.length;x++){var _=this.offx+x*p,S=i.height-s-v[x]*y
r.lineTo(_,S)}r.stroke()}r.beginPath(),r.lineWidth=1,r.strokeStyle=this.axis,r.moveTo(this.offx,this.offy),r.lineTo(this.offx,i.height-s),r.lineTo(i.width-a,i.height-s),r.stroke(),r.beginPath(),r.setLineDash([4,8]),r.lineWidth=1,r.strokeStyle=this.grid
for(var x=1;x<e.length;x++){var _=this.offx+x*p
r.moveTo(_,this.offy),r.lineTo(_,i.height-s)}r.moveTo(this.offx,this.offy),r.lineTo(i.width-a,this.offy)
for(var C=0,O=m;C<O.length;C++){var D=O[C]
r.moveTo(this.offx,i.height-s-D*y),r.lineTo(i.width-a,i.height-s-D*y)}r.stroke(),r.fillStyle=this.axis,r.font=this.fontSize+"px "+this.fontName,r.fillText("0",0,i.height-s)
for(var M=0,W=m;M<W.length;M++){var D=W[M]
r.fillText(""+D,0,i.height-s-D*y)}if(r.fillText(""+g,0,this.offy),h)for(var x=0;x<o.length;x++){var _=this.offx+x*p
r.save(),r.translate(_-this.fontSize,i.height),r.rotate(-Math.PI/3),r.fillStyle=this.axis,r.fillText(o[x],0,0),r.restore()}}}}}},e}(t.WComponent)
t.WLineChart=r}(WUX||(WUX={}))
var APP
!function(n){var t=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.render=function(){return"<div>Hello World.</div>"},t}(WUX.WComponent)
n.Main=t}(APP||(APP={}))
