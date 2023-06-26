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
function wuxRegister(t,e){if(t){var r
if(r="string"==typeof t?0==t.indexOf("#")?t.substring(1):t:t.id,!e)return wuxRegistry[r]
if("string"==typeof e){var n=wuxRegistry[r]
return n&&delete wuxRegistry[r],n}return wuxRegistry[r]=e,e}}var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r]
for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},__assign.apply(this,arguments)},__spreadArray=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,i=0,o=e.length;i<o;i++)!n&&i in e||(n||(n=Array.prototype.slice.call(e,0,i)),n[i]=e[i])
return t.concat(n||Array.prototype.slice.call(e))},__extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(e,r)}
return function(e,r){function n(){this.constructor=e}if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null")
t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),wuxRegistry={},WuxDOM=function(){function t(){}return t.onRender=function(e){t.onRenderHandlers.push(e)},t.onUnmount=function(e){t.onUnmountHandlers.push(e)},t.render=function(e,r,n,i){WUX.debug&&console.log("WuxDOM.render "+WUX.str(e)+" on "+WUX.str(r)+"..."),WUX.global.init(function(){r||(r=t.lastCtx?t.lastCtx:document.getElementById("view-root")),n&&n(r)
var o=t.mount(e,r)
if(t.lastCtx=o,i&&i(r),t.onRenderHandlers.length>0){for(var s=e instanceof WUX.WComponent?e:null,a={component:s,element:o,target:o.firstChild,type:"render"},u=0,h=t.onRenderHandlers;u<h.length;u++){(0,h[u])(a)}t.onRenderHandlers=[]}})},t.mount=function(e,r){if(r||(r=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(r)+"..."),null==e)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(r)+" -> invalid component")
var n="string"==typeof r?0==r.indexOf("#")?document.getElementById(r.substring(1)):document.getElementById(r):r
if(!n)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(r)+" -> context unavailable")
if(t.lastCtx=n,e instanceof WUX.WComponent)e.mount(n),wuxRegister(n,e)
else if(e instanceof Element)n.append(e)
else{var i=document.createElement("template")
i.innerHTML=e,n.append(i.content.firstElementChild)}return WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(r)+" completed."),n},t.unmount=function(e){e||(e=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+"...")
var r="string"==typeof e?0==e.indexOf("#")?document.getElementById(e.substring(1)):document.getElementById(e):e
if(!r)return void console.error("WuxDOM.unmount "+WUX.str(e)+" -> node unavailable")
var n=wuxRegister(r,"delete")
if(n&&n.unmount(),r.remove(),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+" completed."),t.onUnmountHandlers.length>0){for(var i={component:n,element:r,target:r.firstChild,type:"unmount"},o=0,s=t.onUnmountHandlers;o<s.length;o++){(0,s[o])(i)}t.onUnmountHandlers=[]}return r},t.replace=function(e,r){var n
if(r||(r=e,e=void 0),e)if("string"==typeof e){var i=WUX.getComponent(e)
i||(n=i.getContext(),i.unmount())}else e instanceof WUX.WComponent?(n=e.getContext(),e.unmount()):(n=e.parentElement)&&(n.innerHTML="")
else n=t.unmount()
return n||(n=document.getElementById("#view-root")),n?t.mount(r,n):void console.error("WuxDOM.replace "+WUX.str(n)+" -> node unavailable")},t.onRenderHandlers=[],t.onUnmountHandlers=[],t}(),WUX
!function(t){function e(t){if(t)return t instanceof Element?t.id:t instanceof T?t.id:"string"==typeof t&&t.indexOf("<")<0?0==t.indexOf("#")?t.substring(1):t:"object"!=typeof t||t.id?"":""+t.id}function r(t,r){var n=e(t)
if(!n)return""
var i=n.indexOf("-")
return i<0?n:r?n.substring(i+1):n.substring(0,i)}function n(t){var r=e(t)
if(!r)return""
var n=r.lastIndexOf("-")
if(n<0)return r
if(n>0){if("-"==r.charAt(n-1))return r.substring(n)}return r.substring(n+1)}function i(t){if(t)return wuxRegistry[t]}function o(t){return t&&t.parent?o(t.parent):t}function s(t,e){if(t){var r=wuxRegistry[t]
if(r)return r.setProps(e),r}}function a(t,e){if(!t)return e
var r=wuxRegistry[t]
if(!r)return e
var n=r.getProps()
return null==n?e:n}function u(t,e){if(t){var r=wuxRegistry[t]
if(r)return r.setState(e),r}}function h(t,e){if(!t)return e
var r=wuxRegistry[t]
if(!r)return e
var n=r.getState()
return null==n?e:n}function l(t){if(!t)return null
var e=t.lastIndexOf(".")
if(e>0){var r=t.substring(0,e)
if(window[r]){var n=t.substring(e+1)
for(var i in window[r])if(i==n)return new window[r][i]
return null}}var o=window[t]
return o&&o.prototype?Object.create(o.prototype):null}function p(t,r){if("string"==typeof t&&"string"==typeof r)return t==r
if("string"==typeof t||"string"==typeof r)return!1
var n=e(t),i=e(r)
return n&&i&&n==i}function f(t){if(!t)return["","",""]
if(" "==t)return["","&nbsp;",""]
var e=" "==t.charAt(0)?"&nbsp;":"",r=t.length>1&&" "==t.charAt(t.length-1)?"&nbsp;":"",n=t.trim().split("<>")
return!n||n.length<2?[e,t.trim(),r]:(e+=n[0],2==n.length?[e,n[1],""]:(r+=n[2],[e,n[1],r]))}function c(t){if(t instanceof T){var e=t.name,r=t.id
return e||(e="WComponent"),r?e+"("+r+")":e}return t instanceof Element?"Element#"+t.id:"object"==typeof t?JSON.stringify(t):t+""}function d(e){if(!e)return""
if(e instanceof T){var r=e.rootTag
if(r)return r.toLowerCase()
var n=e.getRoot()
return n?"":t.getTagName(n)}if(e instanceof Element)return e.tagName.toLowerCase()
var i=""+e
if("<"==i.charAt(0)){var o=i.indexOf(" ")
if(o<0&&(o=i.indexOf(">")),o>0){var r=i.substring(1,o).toLowerCase()
return"/"==r.charAt(r.length-1)?r.substring(0,r.length-1):r}return""}return"#"==i.charAt(0)?t.getTagName(document.getElementById(i.substring(1))):t.getTagName(document.getElementById(i))}function g(t){var e=""
return t?"string"==typeof t?t.indexOf(":")<=0?"":";"!=t.charAt(t.length-1)?t+";":t:(t.s&&(e+=y(t.s)),t.fs&&(e+="font-style:"+t.fs+";"),t.fw&&(e+="font-weight:"+t.fw+";"),t.tt&&(e+="text-transform:"+t.tt+";"),t.tr&&(e+="transform:"+t.tr+";"),t.fl&&(e+="float:"+t.fl+";"),t.cl&&(e+="clear:"+t.cl+";"),t.a&&(e+="text-align:"+t.a+";"),t.c&&(e+="color:"+t.c+";"),t.v&&(e+="vertical-align:"+t.v+";"),t.d&&(e+="display:"+t.d+";"),t.z&&(e+="z-index:"+t.z+";"),t.lh&&(e+="line-height:"+t.lh+";"),t.ps&&(e+="position:"+t.ps+";"),t.o&&(e+="overflow:"+t.o+";"),t.ox&&(e+="overflow-x:"+t.ox+";"),t.oy&&(e+="overflow-y:"+t.oy+";"),null!=t.op&&(e+="opacity:"+t.op+";"),null!=t.ol&&(e+="outline:"+t.ol+";"),t.cr&&(e+="cursor:"+t.cr+";"),t.cn&&(e+="content:"+t.cn+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-webkit"+t.k+";":"-webkit-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-moz"+t.k+";":"-moz-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-o"+t.k+";":"-o-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-ms"+t.k+";":"-ms-"+t.k+";"),t.bs&&(e+="box-shadow:"+t.bs+";"),t.bz&&(e+="box-sizing:"+t.bz+";"),t.b&&(e+=t.b.indexOf(":")>0?y("border"+t.b):t.b.match(/^(|none|inherit|initial|unset)$/)?"border:"+t.b+";":t.b.indexOf(" ")>0?"border:"+t.b+";":"border:1px solid "+t.b+";"),t.bc&&(e+="border-collapse:"+t.bc+";"),null!=t.br&&(e+="number"==typeof t.br?"border-radius:"+t.br+"px;":"border-radius:"+t.br+";"),null!=t.bsp&&(e+="number"==typeof t.bsp?"border-spacing:"+t.bsp+"px;":"border-spacing:"+t.bsp+";"),null!=t.m&&(e+="number"==typeof t.m?"margin:"+t.m+"px;":t.m.indexOf(":")>0?y("margin"+t.m):"margin:"+t.m+";"),null!=t.mt&&(e+="number"==typeof t.mt?"margin-top:"+t.mt+"px;":"margin-top:"+t.mt+";"),null!=t.mr&&(e+="number"==typeof t.mr?"margin-right:"+t.mr+"px;":"margin-right:"+t.mr+";"),null!=t.mb&&(e+="number"==typeof t.mb?"margin-bottom:"+t.mb+"px;":"margin-bottom:"+t.mb+";"),null!=t.ml&&(e+="number"==typeof t.ml?"margin-left:"+t.ml+"px;":"margin-left:"+t.ml+";"),null!=t.p&&(e+="number"==typeof t.p?"padding:"+t.p+"px;":t.p.indexOf(":")>0?y("padding"+t.p):"padding:"+t.p+";"),null!=t.pt&&(e+="number"==typeof t.pt?"padding-top:"+t.pt+"px;":"padding-top:"+t.pt+";"),null!=t.pr&&(e+="number"==typeof t.pr?"padding-right:"+t.pr+"px;":"padding-right:"+t.pr+";"),null!=t.pb&&(e+="number"==typeof t.pb?"padding-bottom:"+t.pb+"px;":"padding-bottom:"+t.pb+";"),null!=t.pl&&(e+="number"==typeof t.pl?"padding-left:"+t.pl+"px;":"padding-left:"+t.pl+";"),null!=t.f&&(e+="number"==typeof t.f?"font-size:"+t.f+"px;":t.f.indexOf(":")>0?y("font"+t.f):"font-size:"+t.f+";"),t.bg&&(e+=t.bg.indexOf(":")>0?y("background"+t.bg):t.bg.indexOf("url")>=0?"background:"+t.bg+";":"background-color:"+t.bg+";"),t.bgi&&(e+="background-image:"+t.bgi+";"),t.bgp&&(e+="background-position:"+t.bgp+";"),t.bgr&&(e+="background-repeat:"+t.bgr+";"),t.text&&(e+=t.text.indexOf(":")>0?y("text"+t.text):"text-decoration:"+t.text+";"),null!=t.l&&(e+="number"==typeof t.l?"left:"+t.l+"px;":"left:"+t.l+";"),null!=t.r&&(e+="number"==typeof t.r?"right:"+t.r+"px;":"right:"+t.r+";"),null!=t.t&&(e+="number"==typeof t.t?"top:"+t.t+"px;":"top:"+t.t+";"),null!=t.bt&&(e+="number"==typeof t.bt?"bottom:"+t.bt+"px;":"bottom:"+t.bt+";"),t.w&&(e+="number"==typeof t.w?"width:"+t.w+"px;":"width:"+t.w+";"),t.h&&(e+="number"==typeof t.h?"height:"+t.h+"px;":"height:"+t.h+";"),t.minw&&(e+="number"==typeof t.minw?"min-width:"+t.minw+"px;":"min-width:"+t.minw+";"),t.maxw&&(e+="number"==typeof t.maxw?"max-width:"+t.maxw+"px;":"max-width:"+t.maxw+";"),t.minh&&(e+="number"==typeof t.minh?"min-height:"+t.minh+"px;":"min-height:"+t.minh+";"),t.maxh&&(e+="number"==typeof t.maxh?"max-height:"+t.maxh+"px;":"max-height:"+t.maxh+";"),t.ws&&(e+="white-space:"+t.ws+";"),e):e}function m(t,e,r,n){return e&&r?t?n&&t.indexOf(e+":")>=0?y(t):y(t)+e+":"+r+";":e+":"+r+";":y(t)}function y(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return""
for(var r="",n={},i=!0,o=0;o<t.length;o++){var s=t[o]
s&&("string"==typeof s?(i||(r+=g(n),n={},i=!0),s.indexOf(":")>0&&(r+=s,";"!=s.charAt(s.length-1)&&(r+=";"))):(n=__assign(__assign({},n),s),i=!1))}return i||(r+=g(n)),r}function b(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
for(var r="",n=0;n<t.length;n++){var i=t[n]
if(i){var o="string"==typeof i?i:i.n
o&&(o.indexOf(":")>0||(r+=o+" "))}}return r.trim()}function v(t){if(!t)return""
if("string"==typeof t)return t
if("object"==typeof t){var e=""
for(var r in t)e+=r+'="'+t[r]+'" '
return e.trim()}return""}function x(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
var r=b.apply(void 0,t),n=y.apply(void 0,t),i=""
return r&&(i+=' class="'+r+'"'),n&&(i+=' style="'+n+'"'),i}function w(t,e){if(!t)return e
if(!e)return t
for(var r=t.split(" "),n=0,i=r;n<i.length;n++){if(i[n]==e)return t}return t+" "+e}function S(t,e){if(!t||!e)return t
for(var r=t.split(" "),n="",i=0,o=r;i<o.length;i++){var s=o[i]
s!=e&&(n+=s+" ")}return n.trim()}function _(t,e){if(!t)return e
if(!e)return t
for(var r=t.split(" "),n=!1,i="",o=0,s=r;o<s.length;o++){var a=s[o]
a!=e?i+=a+" ":n=!0}return n?i.trim():i.trim()+" "+e}function D(t,e){t&&t.setAttribute("class",w(t.getAttribute("class"),e))}function O(t,e){t&&t.setAttribute("class",S(t.getAttribute("class"),e))}function M(t,e){t&&t.setAttribute("class",_(t.getAttribute("class"),e))}function C(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r]
if(!t||!e||!e.length)return t
if(t instanceof T)t.css.apply(t,e)
else if(t instanceof Element){var n=y.apply(void 0,e),i=b.apply(void 0,e)
i&&D(t,i),n&&t.setAttribute("style",g(n))}return t}function I(e,r,n,i,o,s){if(!e)return""
r||(r=""),n||(n="")
var a=t.CSS.ICON?' style="'+t.CSS.ICON+'"':"",u=s?' title="'+s+'"':""
return o=o?" "+o:"",e.indexOf(".")>0?r+'<img src="'+e+'"'+u+a+">"+n:!i||i<2?r+'<i class="fa '+e+o+'"'+u+a+"></i>"+n:(i>5&&(i=5),r+'<i class="fa '+e+" fa-"+i+"x"+o+'"'+u+a+"></i>"+n)}function W(e,r,n,i,o,s){e||(e="div")
var a,u
"string"==typeof n?n.indexOf(":")>0?u=n:a=n:n&&(n.n&&(a=n.n),u=t.style(n)),s&&(a?a+=" "+s:a=s)
var h="<"+e
o&&(h+=' id="'+o+'"'),a&&(h+=' class="'+a+'"'),u&&(h+=' style="'+u+'"')
var l=t.attributes(i)
l&&(h+=" "+l),h+=">"
var p=f(r)
return h+=p[1],"input"==e?p[0]+h+p[2]:(h+="</"+e+">",p[0]+h+p[2])}t.debug=!1,t.registry=[],t.version="1.0.0"
var T=function(){function e(e,r,n,i,o,s){if(this.mounted=!1,this.debug=t.debug,this.forceOnChange=!1,this.rootTag="div",this.subSeq=0,this.dontTrigger=!1,this._visible=!0,this._enabled=!0,this.handlers={},this.cuid=Math.floor(1e9*Math.random()),e instanceof Element)this.root=e,this.root&&(this.mounted=!0),this.debug&&console.log("["+c(this)+"] new wrapper root="+c(this.root))
else{"string"==typeof e&&(this.id="*"==e?"w"+this.cuid:e),this.name=r||"WComponent",this._classStyle=i
var a=t.cls(o)
a&&(this._classStyle=this._classStyle?this._classStyle+" "+a:a),this._style=t.style(o),this._attributes=t.attributes(s),this.debug&&console.log("["+c(this)+"] new"),this.debug&&console.log("["+c(this)+"] updateProps",n),this.updateProps(n)}}return Object.defineProperty(e.prototype,"visible",{get:function(){return this.internal?this.internal.visible:this._visible},set:function(t){this._visible=t,this.internal&&(this.internal.visible=t),this.root instanceof HTMLElement&&(this._visible?this.root.style.display="block":this.root.style.display="none")},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return this.internal?this.internal.enabled:this._enabled},set:function(t){this._enabled=t,this.internal&&(this.internal.enabled=t),this.root&&(this._enabled?this.root.removeAttribute("disabled"):this.root.setAttribute("disabled",""))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"style",{get:function(){return this.internal?this.internal.style:this._style},set:function(e){this._style=t.css(this._baseStyle,e),this.internal&&(this.internal.style=e),this.root&&this.root.setAttribute("style",this._style)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classStyle",{get:function(){return this.internal?this.internal.classStyle:this._classStyle},set:function(e){this.internal&&(this.internal.classStyle=e)
var r=!1,n=!1
e&&e.length>1&&"!"==e.charAt(0)?(e=e.substring(1),r=!0):e&&e.length>1&&"?"==e.charAt(0)&&(e=e.substring(1),n=!0),this._classStyle=r?t.removeClass(this._classStyle,e):n?t.toggleClass(this._classStyle,e):t.cls(this._baseClass,e),this.root&&(r?O(this.root,e):n?M(this.root,e):this.root.setAttribute("class",this._classStyle))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"attributes",{get:function(){return this.internal?this.internal.attributes:this._attributes},set:function(t){this._attributes=t,this.internal&&(this.internal.attributes=t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"tooltip",{get:function(){return this.internal?this.internal.tooltip:this._tooltip},set:function(t){this._tooltip=t,this.internal&&(this.internal.tooltip=t),this.root&&this.root.setAttribute("title",this._tooltip)},enumerable:!1,configurable:!0}),e.prototype.css=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return this
var r=b.apply(void 0,t)
r&&(this.classStyle=r)
var n=y.apply(void 0,t)
return n&&(this.style=n),this},e.prototype.focus=function(){return this.internal&&this.internal.focus(),this.root instanceof HTMLElement&&this.root.focus(),this},e.prototype.blur=function(){return this.internal&&this.internal.blur(),this.root instanceof HTMLElement&&this.root.blur(),this},e.prototype.forceUpdate=function(t){return this.update(this.props,this.state,!1,!1,!0,t),this},e.prototype.getContext=function(){return this.context},e.prototype.getRoot=function(){if(!this.root&&this.internal)return this.internal.getRoot()
if(!this.root){if(this.id){var t=document.getElementById(this.id)
if(t)return t}return this.context}return this.root},e.prototype.getState=function(){return this.state},e.prototype.setState=function(t,e,r){return this.debug&&console.log("["+c(this)+"] setState",t),this.update(this.props,t,!1,!0,this.forceOnChange||e,r),this},e.prototype.getProps=function(){return this.props},e.prototype.setProps=function(t,e,r){return this.debug&&console.log("["+c(this)+"] setProps",t),this.update(t,this.state,!0,!1,this.forceOnChange||e,r),this},e.prototype.on=function(t,e){if(!t)return this
for(var r=t.split(" "),n=0,i=r;n<i.length;n++){var o=i[n]
this.handlers[o]||(this.handlers[o]=[]),this.handlers[o].push(e),"_"!=o.charAt(0)&&"mount"!=o&&"unmount"!=o&&"statechange"!=o&&"propschange"!=o&&(this.root&&this.root.addEventListener(o,e))}return this.internal&&this.internal.on(t,e),this},e.prototype.off=function(t){if(t)for(var e=t.split(" "),r=0,n=e;r<n.length;r++){var i=n[r]
if(this.root)for(var o=this.handlers[i],s=0,a=o;s<a.length;s++){var u=a[s]
this.root.removeEventListener(i,u)}delete this.handlers[i]}else this.handlers={}
return this.internal&&this.internal.off(t),this},e.prototype.trigger=function(t){for(var e,r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n]
if(this.debug&&console.log("["+c(this)+"] trigger",t,r),t){var i=r&&r.length>0?r[0]:void 0
if("_"==t.charAt(0)||"mount"==t||"unmount"==t||"statechange"==t||"propschange"==t){if(void 0!==i&&("statechange"==t?this.state!=r[0]&&(this.state=r[0],this.debug&&console.log("["+c(this)+"] trigger set state",this.state)):"propschange"==t&&this.props!=r[0]&&(this.props=r[0],this.debug&&console.log("["+c(this)+"] trigger set props",this.props))),!this.handlers||!this.handlers[t])return this
for(var o=this.createEvent(t,i),s=0,a=this.handlers[t];s<a.length;s++){(0,a[s])(o)}}else if(this.root){this.debug&&console.log("["+c(this)+"] trigger "+t+" on root="+c(this.root))
var u=new Event(t)
u=__assign(__assign({},u),r),this.root.dispatchEvent(u)}return this.internal&&(this.debug&&console.log("["+c(this)+"] trigger "+t+" on internal="+c(this.internal)),(e=this.internal).trigger.apply(e,__spreadArray([t],r,!1))),this}},e.prototype.unmount=function(){if(this.debug&&console.log("["+c(this)+"] unmount ctx="+c(this.context)+" root="+c(this.root),this.state,this.props),this.componentWillUnmount(),this.internal&&this.internal.unmount(),this.internal=void 0,this.root&&this.root.remove(),this.root=void 0,this.id){var e=t.registry.indexOf(this.id)
e>=0&&t.registry.splice(e,1)}return this.mounted=!1,wuxRegister(this.id,"delete"),this.trigger("unmount"),this},e.prototype.mount=function(r){this.debug&&console.log("["+c(this)+"] mount ctx="+c(r)+" root="+c(this.root),this.state,this.props),this.id||this.root&&(this.id=this.root.id),r&&(this.context=r),this.context||this.root&&(this.context=this.root.parentElement,this.context||(this.context=this.root))
try{if(this.mounted&&this.unmount(),this.mounted=!1,!this.context){var n=document.getElementById(this.id)
n&&(this.context=n)}if(this.debug&&console.log("["+c(this)+"] componentWillMount ctx="+c(r)+" root="+c(this.root)),this.componentWillMount(),this.context){this.debug&&console.log("["+c(this)+"] render ctx="+c(r)+" root="+c(this.root))
var i=this.render()
if(void 0!==i&&null!==i)if(i instanceof e){if(this.debug&&console.log("["+c(this)+"] render -> "+c(i)),this.internal=i,i.parent||(i.parent=this),i.mount(this.context),!this.root)if(this.id){var n=document.getElementById(this.id)
this.root=n||this.internal.getRoot()}else this.root=this.context}else if(i instanceof Element)this.context.append(i),this.root||(this.root=i)
else{var o=document.createElement("template")
o.innerHTML=i,this.context.append(o.content.firstElementChild)
var s=this.context.lastChild
s instanceof Element&&(this.root=s),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}else this.internal&&this.internal.mount(this.context),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}if(this._visible||(this.internal?this.internal.visible=!1:this.root instanceof HTMLElement&&(this.root.style.display="none")),this._enabled||(this.internal?this.internal.enabled=!1:this.root.setAttribute("disabled","")),this.debug&&console.log("["+c(this)+"] componentDidMount ctx="+c(r)+" root="+c(this.root)),this.componentDidMount(),this.root)for(var a in this.handlers)if(a&&"_"!=a.charAt(0)&&"mount"!=a&&"unmount"!=a&&"statechange"!=a&&"propschange"!=a)for(var u=0,h=this.handlers[a];u<h.length;u++){var l=h[u]
this.root.addEventListener(a,l)}if(wuxRegister(this.root,this),this.mounted=!0,this.id&&(!this.internal||this.internal.id!=this.id)){if(t.registry.indexOf(this.id)>=0){var p=t.getComponent(this.id)
p&&p.cuid!=this.cuid&&console.error("["+c(this)+"] id already used by "+c(p))}else t.registry.push(this.id)}this.trigger("mount")}catch(t){var f=c(this)+" "+c(this.context)
console.error("["+c(this)+"] mount error "+f,t),this.componentDidCatch(t,f)}return this},e.prototype.componentWillUnmount=function(){},e.prototype.componentWillMount=function(){},e.prototype.render=function(){return this.buildRoot(this.rootTag)},e.prototype.componentDidMount=function(){},e.prototype.componentDidCatch=function(t,e){},e.prototype.shouldComponentUpdate=function(t,e){return"object"==typeof t||"object"==typeof e||(this.props!=t||this.state!=e)},e.prototype.componentWillUpdate=function(t,e){},e.prototype.componentDidUpdate=function(t,e){},e.prototype.updateProps=function(t){this.props=t},e.prototype.updateState=function(t){this.state=t},e.prototype.update=function(t,e,r,n,i,o){void 0===i&&(i=!1),this.debug&&console.log("["+c(this)+"] update",t,e,"propsChange="+r+",stateChange="+n+",force="+i),t=void 0===t?this.props:t
var s=this.props,a=this.state
if(this.dontTrigger=!1,this.mounted){if(i||this.shouldComponentUpdate(t,e)){try{this.debug&&console.log("["+c(this)+"] componentWillUpdate",t,e),this.componentWillUpdate(t,e),r&&(this.debug&&console.log("["+c(this)+"] updateProps",t),this.updateProps(t)),n&&(this.debug&&console.log("["+c(this)+"] updateState",e),this.updateState(e)),i&&this.mount(),this.debug&&console.log("["+c(this)+"] componentDidUpdate",s,a),this.componentDidUpdate(s,a),r&&!this.dontTrigger&&this.trigger("propschange"),n&&!this.dontTrigger&&this.trigger("statechange")}catch(t){return this.componentDidCatch(t,c(this)+"|"+c(this.context)),!1}o&&o()}}else r&&(this.debug&&console.log("["+c(this)+"] updateProps",t),this.updateProps(t),this.dontTrigger||this.trigger("propschange")),n&&(this.debug&&console.log("["+c(this)+"] updateState",e),this.updateState(e),this.dontTrigger||this.trigger("statechange"))
return!0},e.prototype.createEvent=function(t,e){var r=this.root?this.root.firstChild:this.root
return{component:this,element:this.root,target:r,type:t,data:e}},e.prototype.shouldBuildRoot=function(){if(this.internal)return!1
if(this.root)return!1
if(this.context){var t=this.context.id
if(!t&&t==this.id)return!1}return!0},e.prototype.buildRoot=function(t,e,r,n,i,o,s){return this.debug&&console.log("["+c(this)+"] buildRoot",t,e,r,n,i,o,s),this.shouldBuildRoot()?(this.debug&&console.log("["+c(this)+"] shouldBuildRoot() -> true"),this.build(t,e,r,n,i,o,s)):void(this.debug&&console.log("["+c(this)+"] shouldBuildRoot() -> false"))},e.prototype.build=function(e,r,n,i,o,s,a){e||(e="div"),void 0===i&&(i=this._classStyle),void 0===o&&(o=this._style),void 0===s&&(s=this._attributes),void 0===a&&(a=this.id)
var u="<"+e
a&&(u+=' id="'+a+'"'),i&&(u+=' class="'+i+'"'),o&&(u+=' style="'+o+'"')
var h=t.attributes(s)
h&&(u+=" "+h)
var l=t.attributes(n)
l&&(u+=" "+l),u+=">"
var p=f(null==r?this.make():r)
return u+=p[1],"input"==e?p[0]+u+p[2]:(u+="</"+e+">",p[0]+u+p[2])},e.prototype.make=function(){return""},e.prototype.subId=function(t,r){if(t instanceof e){var n=t.id
return n&&this.id?0!=n.indexOf(this.id+"-")?n:n.substring(this.id.length+1):n}return this.id&&"*"!=this.id||(this.id="w"+this.cuid),t&&"*"!=t||(t=(this.subSeq++).toString()),r||0==r?this.id+"-"+t+"-"+r:this.id+"-"+t},e.prototype.ripId=function(t){return t&&this.id&&0==t.indexOf(this.id)&&t.length>this.id.length+1?t.substring(this.id.length+1):t},e.prototype.transferTo=function(t,e,r){return this.debug&&console.log("["+c(this)+"] transferTo "+c(t)),!!t&&(t.setState(this.getState(),e,r),!0)},e}()
t.WComponent=T,t.getId=e,t.firstSub=r,t.lastSub=n,t.getComponent=i,t.getRootComponent=o,t.setProps=s,t.getProps=a,t.setState=u,t.getState=h,t.newInstance=l,t.same=p,t.divide=f,t.str=c,t.getTagName=d,t.style=g,t.addStyle=m,t.css=y,t.cls=b,t.attributes=v,t.buildCss=x,t.addClass=w,t.removeClass=S,t.toggleClass=_,t.addClassOf=D,t.removeClassOf=O,t.toggleClassOf=M,t.setCss=C,t.buildIcon=I,t.build=W
var A=function(){function e(){}return e.toArray=function(t){if(t instanceof T&&(t=t.getState()),null==t)return[]
if(Array.isArray(t))return t
var e=[]
return e.push(t),e},e.toArrayNumber=function(t,r){if(t instanceof T&&(t=t.getState()),null==t)return[]
var n=[]
if(Array.isArray(t))for(var i=0,o=t;i<o.length;i++){var s=o[i],a=e.toNumber(s)
r&&!a||n.push(a)}else{var a=e.toNumber(t)
if(r&&!a)return n
n.push(a)}return n},e.toArrayString=function(t,r){if(t instanceof T&&(t=t.getState()),null==t)return[]
var n=[]
if(Array.isArray(t))for(var i=0,o=t;i<o.length;i++){var s=o[i],a=e.toString(s)
r&&!a||n.push(a)}else{var a=e.toString(t)
if(r&&!a)return n
n.push(e.toString(t))}return n},e.splitNumbers=function(t,r){if(!t)return[]
for(var n=e.toString(t),i=n.split(r),o=[],s=0,a=i;s<a.length;s++){var u=a[s]
o.push(e.toNumber(u))}return o},e.toObject=function(t,e){return t instanceof T&&(t=t.getState()),null==t?e:"object"==typeof t?t:e},e.toString=function(r,n){return void 0===n&&(n=""),r instanceof T&&(r=r.getState()),null==r?n:"string"==typeof r?r:r instanceof Date?t.formatDate(r):"object"==typeof r&&void 0!=r.id?e.toString(r.id,n):Array.isArray(r)&&r.length?e.toString(r[0],n):""+r},e.toText=function(t,r){return void 0===r&&(r=""),e.toString(t,r).replace("<","&lt;").replace(">","&gt;")},e.toNumber=function(t,r){if(void 0===r&&(r=0),t instanceof T&&(t=t.getState()),null==t)return r
if("number"==typeof t)return t
if(t instanceof Date)return 1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()
if("object"==typeof t&&void 0!=t.id)return e.toNumber(t.id,r)
if(Array.isArray(t)&&t.length)return e.toNumber(t[0],r)
var n=(""+t).trim()
n.indexOf(".")>=0&&n.indexOf(",")>=0&&(n=n.replace(".","")),n=n.replace(",",".")
var i=n.indexOf(".")>=r?parseFloat(n):parseInt(n)
return isNaN(i)?r:i},e.toInt=function(t,r){if(void 0===r&&(r=0),t instanceof T&&(t=t.getState()),null==t)return r
if("number"==typeof t)return Math.floor(t)
if(t instanceof Date)return 1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()
if("object"==typeof t&&void 0!=t.id)return e.toInt(t.id,r)
if(Array.isArray(t)&&t.length)return e.toInt(t[0],r)
var n=(""+t).replace(",","."),i=parseInt(n)
return isNaN(i)?r:i},e.toIntTime=function(t,r){if(void 0===r&&(r=0),t instanceof T&&(t=t.getState()),null==t)return r
if(t instanceof Date)return 100*t.getHours()+t.getMinutes()
if(Array.isArray(t)&&t.length)return e.toIntTime(t[0],r)
var n=(""+t).replace(":","").replace(".","").replace(",",""),i=parseInt(n)
return isNaN(i)?r:i},e.isNumeric=function(t){return!isNaN(t)},e.checkEmail=function(t){if(!t)return""
var r=e.toString(t)
if(!r)return""
if(r.length<5)return""
var n=r.indexOf("@")
return n<=0?"":r.lastIndexOf(".")<n?"":r.trim().toLowerCase()},e.starts=function(t,r){return!(!t||null==r)&&0==e.toString(t).indexOf(r)},e.ends=function(t,r){if(!t||null==r)return!1
var n=e.toString(t),i=n.lastIndexOf(r)
return!(i<0)&&i==n.length-r.length},e.isEmpty=function(t){if(!t)return!0
if(Array.isArray(t)&&!t.length)return!0
if("object"==typeof t){for(var e in t)if(t.hasOwnProperty(e))return!1
return!0}return!1},e.toBoolean=function(t,e){return void 0===e&&(e=!1),t instanceof T&&(t=t.getState()),null==t?e:"boolean"==typeof t?t:"string"==typeof t&&t.length?"1YyTtSs".indexOf(t.charAt(0))>=0:!!e},e.toDate=function(t,e){if(t instanceof T&&(t=t.getState()),null==t)return e
if(t instanceof Date)return t
if("number"==typeof t)return t<10000101?e:new Date(t/1e4,t%1e4/100-1,t%1e4%100)
if("string"==typeof t){if(t.length<8)return e
var r=t.indexOf(",")
if(r>=0&&(t=t.substring(r+1)),t.indexOf("-")>3)return new Date(t.trim())
if(this.isNumeric(t)){var n=parseInt(t)
return n<10000101?e:new Date(n/1e4,n%1e4/100-1,n%1e4%100)}return new Date(t.trim().replace(/(\d{1,2}).(\d{1,2}).(\d{4})/,"$3-$2-$1"))}return e},e.getWeek=function(t){var r
r=t instanceof Date?new Date(t.getTime()):e.toDate(t),r||(r=new Date),r.setHours(0,0,0,0),r.setDate(r.getDate()+3-(r.getDay()+6)%7)
var n=new Date(r.getFullYear(),0,4)
return 1+Math.round(((r.getTime()-n.getTime())/864e5-3+(n.getDay()+6)%7)/7)},e.getParam=function(t,e){e||(e=window.location.href),t=t.replace(/[\[\]]/g,"\\$&")
var r=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)"),n=r.exec(e)
return n&&n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):""},e.size=function(t){if(!t)return 0
if(Array.isArray(t))return t.length
if("object"==typeof t){var e=0
for(var r in t)t.hasOwnProperty(r)&&e++
return e}return 0},e.setValue=function(t,e,r){return"object"==typeof t&&(t[e]=r),t},e.getValue=function(t,r,n){if(!r)return n
if(Array.isArray(t)&&t.length)return"-1"==r?e.getLast(t,n):e.isNumeric(r)?e.getItem(t,e.toInt(r),n):e.getValue(t[0],r,n)
if("object"==typeof t){var i=r.indexOf(".")
if(null==t[r]&&i>0){var o=r.substring(0,i)
return null==t[o]?n:e.getValue(t[o],r.substring(i+1),n)}return null==t[r]?n:t[r]}return n},e.getItem=function(t,e,r){if(e<0)return r
if(Array.isArray(t)){if(t.length>e){var n=t[e]
return null==n?r:n}return r}return r},e.getFirst=function(t,e){if(Array.isArray(t)){if(t.length>0){var r=t[0]
return null==r?e:r}return e}return e},e.getLast=function(t,e){if(Array.isArray(t)){if(t.length>0){var r=t[t.length-1]
return null==r?e:r}return e}return e},e.getNumber=function(t,r,n){return e.toNumber(e.getValue(t,r,n))},e.getInt=function(t,r,n){return e.toInt(e.getValue(t,r,n))},e.getString=function(r,n,i,o){var s=e.getValue(r,n)
return null==s?i:o?"?"==o?"number"==typeof s?t.formatNum(s):e.toString(s):"c"==o?t.formatCurr(s):"c5"==o?t.formatCurr5(s):"n"==o?t.formatNum(s):"n2"==o?t.formatNum2(s):"m"==o?t.formatMonth(s):"d"==o?t.formatDate(s):"dt"==o?t.formatDateTime(s):"t"==o?t.formatTime(s):e.toString(s):e.toString(s)},e.getText=function(t,r,n){return e.toText(e.getValue(t,r,n))},e.getBoolean=function(t,r,n){return e.toBoolean(e.getValue(t,r,n))},e.getDate=function(t,r,n){return e.toDate(e.getValue(t,r,n))},e.getArray=function(t,r){return e.toArray(e.getValue(t,r))},e.getArrayNumber=function(t,r,n){return e.toArrayNumber(e.getValue(t,r),n)},e.getArrayString=function(t,r,n){return e.toArrayString(e.getValue(t,r),n)},e.getObject=function(t,r,n){var i=e.toObject(e.getValue(t,r))
return!i&&n?{}:i},e.sort=function(t,r,n){if(void 0===r&&(r=!0),!t)return[]
var i=e.toArray(t)
if(!n){var o=i.sort()
return r?o:o.reverse()}var s=i.sort(function(t,r){var i=e.getValue(t,n),o=e.getValue(r,n)
return i<o?-1:i>o?1:0})
return r?s:s.reverse()},e.find=function(t,r,n){if(!t||!r)return null
for(var i=e.toArray(t),o=0,s=i;o<s.length;o++){var a=s[o],u=e.getValue(a,r)
if(u instanceof Date&&n instanceof Date&&u.getTime()==n.getTime())return a
if(u==n)return a}return null},e.indexOf=function(t,r,n){if(!t||!r)return-1
for(var i=e.toArray(t),o=0;o<i.length;o++){var s=e.getValue(i[o],r)
if(s instanceof Date&&n instanceof Date&&s.getTime()==n.getTime())return o
if(s==n)return o}return-1},e.isSameDate=function(t,e){return this.toNumber(t)==this.toNumber(e)},e.indexOfDate=function(t,r){if(!t||!r)return-1
for(var n=e.toNumber(r),i=0;i<t.length;i++)if(t[i]){var o=e.toNumber(t[i])
if(o==n)return i}return-1},e.round2=function(t){if(null==t)return 0
var r=e.toNumber(t)
return Math.round(100*r)/100},e.floor2=function(t){if(null==t)return 0
var r=e.toNumber(t)
return Math.floor(100*r)/100},e.ceil2=function(t){if(null==t)return 0
var r=e.toNumber(t)
return Math.ceil(100*r)/100},e.compare2=function(t,r){if(!t&&!r)return 0
var n=Math.round(100*e.toNumber(t)),i=Math.round(100*e.toNumber(r))
return n==i?0:n>i?1:-1},e.compare5=function(t,r){if(!t&&!r)return 0
var n=Math.round(1e4*e.toNumber(t)),i=Math.round(1e4*e.toNumber(r))
return n==i?0:n>i?1:-1},e.getCurrDate=function(t,e,r,n,i){var o=new Date
return o.setHours(0,0,0,0),t&&o.setDate(o.getDate()+t),e&&o.setMonth(o.getMonth()+e),r&&o.setFullYear(o.getFullYear()+r),n&&o.setDate(1),i&&(o.setMonth(o.getMonth()+1),o.setDate(0)),o},e.calcDate=function(t,e,r,n,i,o){return t=t?new Date(t.getTime()):new Date,t.setHours(0,0,0,0),e&&t.setDate(t.getDate()+e),r&&t.setMonth(t.getMonth()+r),n&&t.setFullYear(t.getFullYear()+n),i&&t.setDate(1),o&&(t.setMonth(t.getMonth()+1),t.setDate(0)),t},e.timestamp=function(t){var r=t?e.toDate(t):new Date
r||(r=new Date)
var n=""+r.getFullYear(),i=r.getMonth()+1,o=i<10?"0"+i:""+i,s=r.getDate(),a=s<10?"0"+s:""+s,u=r.getHours(),h=u<10?"0"+u:""+u,l=r.getMinutes(),p=l<10?"0"+l:""+l,f=r.getSeconds()
return n+o+a+h+p+(f<10?"0"+f:""+f)},e.nvl=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(t&&t){for(var r=0,n=t;r<n.length;r++){var i=n[r]
if(!i)return i}return t[0]}},e.eqValues=function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n]
if(!t&&!e)return!0
if(!t||!e)return!1
for(var i=0,o=r;i<o.length;i++){var s=o[i]
if(t[s]!=e[s])return!1}return!0},e.col=function(t,r,n){var i=[]
if(!t||!t.length)return i
for(var o=0,s=t;o<s.length;o++){var a=s[o]
i.push(e.getItem(a,r,n))}return i},e.getSortedKeys=function(t){if(!t)return[]
var e=[]
for(var r in t)t.hasOwnProperty(r)&&e.push(r)
return e.sort()},e.diffMinutes=function(t,r){var n=e.toDate(t),i=e.toDate(r)
return n||(n=new Date),i||(i=new Date),(n.getTime()-i.getTime())/6e4},e.diffHours=function(t,r){var n=e.toDate(t),i=e.toDate(r)
return n||(n=new Date),i||(i=new Date),(n.getTime()-i.getTime())/36e5},e.diffDays=function(t,r){var n=e.toDate(t),i=e.toDate(r)
n||(n=new Date),i||(i=new Date)
var o=n.getTime()-i.getTime(),s=o/864e5,a=o%864e5,u=a/6e4,h=s
return u>12&&h++,h},e}()
t.WUtil=A}(WUX||(WUX={}))
var WUX
!function(t){function e(e,r,n){if(void 0===r&&(r=!1),void 0===n&&(n=!1),!e)return""
var i=t.WUtil.toDate(e)
if(!i)return""
var o=i.getMonth()+1,s=o<10?"0"+o:""+o,a=i.getDate()<10?"0"+i.getDate():""+i.getDate()
return r?t.formatDay(i.getDay(),n)+", "+a+"/"+s+"/"+i.getFullYear():a+"/"+s+"/"+i.getFullYear()}function r(e){if(!e)return""
var r=t.WUtil.toDate(e)
if(!r)return""
var n=r.getMonth()+1,i=n<10?"0"+n:""+n,o=r.getDate()<10?"0"+r.getDate():""+r.getDate()
return r.getFullYear()+"-"+i+"-"+o}function n(e,r,n,i){if(void 0===r&&(r=!1),void 0===n&&(n=!1),void 0===i&&(i=!1),!e)return""
var o=t.WUtil.toDate(e)
if(!o)return""
var s=o.getMonth()+1,a=s<10?"0"+s:""+s,u=o.getDate()<10?"0"+o.getDate():""+o.getDate(),h=o.getHours()<10?"0"+o.getHours():""+o.getHours(),l=o.getMinutes()<10?"0"+o.getMinutes():""+o.getMinutes()
if(r){var p=o.getSeconds()<10?"0"+o.getSeconds():""+o.getSeconds()
return n?t.formatDay(o.getDay(),i)+", "+u+"/"+a+"/"+o.getFullYear()+" "+h+":"+l+":"+p:u+"/"+a+"/"+o.getFullYear()+" "+h+":"+l+":"+p}return n?t.formatDay(o.getDay(),i)+", "+u+"/"+a+"/"+o.getFullYear()+" "+h+":"+l:u+"/"+a+"/"+o.getFullYear()+" "+h+":"+l}function i(t,e){if(void 0===e&&(e=!1),null==t)return""
if("number"==typeof t){if(e){t<1e4&&(t*=100)
var r=Math.floor(t/1e4),n=Math.floor(t%1e4/100),o=t%1e4%100,s=n<10?"0"+n:""+n,a=o<10?"0"+o:""+o
return r+":"+s+":"+a}t>9999&&(t=Math.floor(t/100))
var r=Math.floor(t/100),n=t%100,s=n<10?"0"+n:""+n
return r+":"+s}if("string"==typeof t){var u=t.indexOf("T")
u<0&&(u=t.indexOf(" ")),u>=0&&(t=t.substring(u+1)),u=t.indexOf("+"),u<0&&(u=t.indexOf("-")),u<0&&(u=t.indexOf("Z")),u>=0&&(t=t.substring(0,u))
return i(parseInt(t.replace(":","").replace(".","")))}if(t instanceof Date){var h=t.getHours()<10?"0"+t.getHours():""+t.getHours(),l=t.getMinutes()<10?"0"+t.getMinutes():""+t.getMinutes()
if(e){var a=t.getSeconds()<10?"0"+t.getSeconds():""+t.getSeconds()
return h+":"+l+":"+a}return h+":"+l}return""}function o(e,r,n,i){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+Math.round(100*o)/100).replace(".",",")
return null!=r&&0!=o?null!=i&&o<0?i.replace("$",s):r.replace("$",s):null!=n&&0==o?n.replace("$",s):s}function s(e,r,n,i){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+o).replace(".",",")
return null!=r&&0!=o?null!=i&&o<0?"l"==i?o.toLocaleString("it-IT"):i.replace("$",s):"l"==r?o.toLocaleString("it-IT"):r.replace("$",s):null!=n&&0==o?n.replace("$",s):s}function a(e,r,n,i){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(Math.round(100*o)/100).toLocaleString("it-IT"),a=s.indexOf(",")
return a<0&&(s+=",00"),a==s.length-2&&(s+="0"),null!=r&&0!=o?null!=i&&o<0?i.replace("$",s):r.replace("$",s):null!=n&&0==o?n.replace("$",s):s}function u(e,r,n,i){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+Math.round(1e5*o)/1e5).replace(".",","),a=s.indexOf(",")
if(a<0&&(s+=",00"),a==s.length-2&&(s+="0"),a>0){for(var u=s.substring(0,a),h=s.substring(a),l="",p=1;p<=u.length;p++)p>3&&(p-1)%3==0&&(l="."+l),l=u.charAt(u.length-p)+l
s=l+h}return null!=r&&0!=o?null!=i&&o<0?i.replace("$",s):r.replace("$",s):null!=n&&0==o?n.replace("$",s):s}function h(t){return null==t?"":t?"S":"N"}function l(e){if(null==e)return""
if("string"==typeof e)return e
if("boolean"==typeof e)return t.formatBoolean(e)
if("number"==typeof e){return(""+e).indexOf(".")>=0?t.formatCurr(e):t.formatNum(e)}return e instanceof Date?t.formatDate(e):e instanceof t.WComponent?t.format(e.getState()):""+e}function p(t,e){switch(t){case 0:return e?"Domenica":"Dom"
case 1:return e?"Luned&igrave;":"Lun"
case 2:return e?"Marted&igrave;":"Mar"
case 3:return e?"Mercoled&igrave;":"Mer"
case 4:return e?"Giove&igrave;":"Gio"
case 5:return e?"Venerd&igrave;":"Ven"
case 6:return e?"Sabato":"Sab"}return""}function f(t,e,r){switch(t>100&&(r=Math.floor(t/100),t%=100),r=r?" "+r:"",t){case 1:return e?"Gennaio"+r:"Gen"+r
case 2:return e?"Febbraio"+r:"Feb"+r
case 3:return e?"Marzo"+r:"Mar"+r
case 4:return e?"Aprile"+r:"Apr"+r
case 5:return e?"Maggio"+r:"Mag"+r
case 6:return e?"Giugno"+r:"Giu"+r
case 7:return e?"Luglio"+r:"Lug"+r
case 8:return e?"Agosto"+r:"Ago"+r
case 9:return e?"Settembre"+r:"Set"+r
case 10:return e?"Ottobre"+r:"Ott"+r
case 11:return e?"Novembre"+r:"Nov"+r
case 12:return e?"Dicembre"+r:"Dic"+r}return""}var c={},d={}
t.global={locale:"it",init:function(e){t.debug&&console.log("[WUX] global.init..."),t.debug&&console.log("[WUX] global.init completed"),e&&e()},setData:function(t,e,r){if(void 0===r&&(r=!1),t||(t="global"),c[t]=e,!r&&d[t])for(var n=0,i=d[t];n<i.length;n++){var o=i[n]
o(e)}},getData:function(t,e){t||(t="global")
var r=c[t]
return null==r?e:r},onDataChanged:function(t,e){t||(t="global"),d[t]||(d[t]=[]),d[t].push(e)}}
var g=function(){function t(){}return t.FORM="padding-top:16px;",t.FORM_GROUP="form-group",t.FORM_CTRL="form-control",t.ICON="margin-right:8px;",t}()
t.CSS=g,t.formatDate=e,t.isoDate=r,t.formatDateTime=n,t.formatTime=i,t.formatNum2=o,t.formatNum=s,t.formatCurr=a,t.formatCurr5=u,t.formatBoolean=h,t.format=l,t.formatDay=p,t.formatMonth=f}(WUX||(WUX={}))
var WUX
!function(t){var e=function(t){function e(e){return t.call(this,null,"Wrapp",e)||this}return __extends(e,t),e.prototype.render=function(){return this.isText=!1,"string"==typeof this.props&&(!this.props||this.props.indexOf("<")<0)?(this.isText=!0,this.buildRoot(this.rootTag,this.props)):this.props},e.prototype.componentDidMount=function(){this.root&&!this.isText&&(this.rootTag=this.root.tagName,this.id=this.root.getAttribute("id"),this._classStyle=this.root.getAttribute("class"),this._style=this.root.getAttribute("style"))},e}(t.WComponent)
t.Wrapp=e
var r=function(r){function n(e,n,i,o,s,a){var u=r.call(this,e||"*","WContainer",a,n,t.style(i),o)||this
return u.cint=[],u.comp=[],u.sr_c=[],u.grid=[],u.rootTag=s?"span":"div",u}return __extends(n,r),n.prototype.wrapp=function(t,e){return this.w0=t,this.w1=e,this},n.prototype.addRow=function(e,r){e||(e="row")
var n=[],i=t.style(r)
return i&&(e+="^"+i),n.push(e),this.grid.push(n),this},n.prototype.addCol=function(e,r){e||(e="col-12"),isNaN(parseInt(e))||(e="col-"+e),this.grid.length||this.addRow()
var n=this.grid[this.grid.length-1],i=t.style(r)
return i&&(e+="^"+i),n.push(e),this},n.prototype.add=function(t,r){if(!t)return this
if("string"==typeof t)return this.add(new e(t),r),this
if(t instanceof Element)return this.add(new e(t),r),this
if(t.parent||(t.parent=this),!this.grid.length)return this.cint.push(t),this
if("push"==r)return this.cint.push(t),this
if("unshift"==r)return this.cint.unshift(t),this
var n=this.grid.length-1
if(r){var i=parseInt(r)
if(!isNaN(i)){if(i<0)return this.cint.push(t),this
n=i}}var o=this.grid[n],s=o.length-1
return this.comp.push(t),this.sr_c.push(this.subId(n+"_"+s)),this},n.prototype.addGroup=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r]
if(t){var n=this.addContainer(t)
if(!e||!e.length)return this
for(var i=0,o=e;i<o.length;i++){var s=o[i]
s&&n.add(s)}return this}if(!e||!e.length)return this
for(var a=0,u=e;a<u.length;a++){var s=u[a]
s&&this.add(s)}return this},n.prototype.addLine=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r]
var i=new n
if(i.addRow(),e){var o="1"
"string"!=typeof t&&((o=t.n)||(o="1"))
for(var s=0,a=e;s<a.length;s++){var u=a[s]
u&&i.addCol(o,t).add(u)}}return this.add(i),this},n.prototype.addStack=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r]
var i=new n
if(e){var o="12"
"string"!=typeof t&&((o=t.n)||(o="12"))
for(var s=0,a=e;s<a.length;s++){var u=a[s]
u&&i.addRow().addCol(o,t).add(u)}}return this.add(i),this},n.prototype.addContainer=function(e,r,i,o,s,a){var u
return"string"==typeof e?(u=new n(e,r,i,o,s,a),this.add(u)):e instanceof n?(e.parent=this,this.add(e,r)):(u=new n,e&&(u.classStyle=t.cls(e.classStyle,e.style),u.style=t.style(e.style),u.attributes=e.attributes),this.add(u,r)),u},n.prototype.end=function(){return this.parent instanceof n?this.parent.end():this},n.prototype.render=function(){var t="",e=this.grid.length
if(e)for(var r=0;r<e;r++){var n=this.grid[r],i=n.length
if(i){t+="<div "+this.cs(n[0])+' id="'+this.subId(r+"_0")+'">'
for(var o=1;o<i;o++)t+='<div id="'+this.subId(r+"_"+o)+'" '+this.cs(n[o])+"></div>"
t+="</div>"}}return this.w0||(this.w0=""),this.w1||(this.w1=""),this.w0+this.buildRoot(this.rootTag,t)+this.w1},n.prototype.componentDidMount=function(){for(var t=0;t<this.cint.length;t++){var e=this.cint[t]
e.mount(this.root)}for(var t=0;t<this.comp.length;t++){var e=this.comp[t],r=document.getElementById(this.sr_c[t])
r&&e.mount(r)}},n.prototype.componentWillUnmount=function(){for(var t=0,e=this.comp;t<e.length;t++){e[t].unmount()}},n.prototype.cs=function(t){if(!t)return""
var e=t.indexOf("^")
return e<0?'class="'+t+'"':'class="'+t.substring(0,e)+'" style="'+t.substring(e+1)+'"'},n.prototype.getElement=function(t,e){if(!this.grid||!this.grid.length)return null
if(t<0&&(t=this.grid.length+t)<0&&(t=0),this.grid.length<=t)return null
if(null==e)return document.getElementById(this.subId(t+"_0"))
var r=this.grid[t]
return!r||r.length<2?null:(e<0&&(e=r.length-1+e)<0&&(e=0),e++,document.getElementById(this.subId(t+"_"+e)))},n}(t.WComponent)
t.WContainer=r
var n=function(e){function r(t,r,n,i,o,s,a,u){var h=e.call(this,t||"*","WLink",n,i,o,s)||this
return h.updateState(r),h.rootTag="a",h._href=a,h._target=u,h}return __extends(r,e),Object.defineProperty(r.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"href",{get:function(){return this._href},set:function(t){this._href=t,this.root&&(t?this.root.setAttribute("href",t):this.root.removeAttribute("href"))},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"target",{get:function(){return this._target},set:function(t){this._target=t,this.root&&(t?this.root.setAttribute("target",t):this.root.removeAttribute("target"))},enumerable:!1,configurable:!0}),r.prototype.render=function(){var e=""
this._href&&(e+='href="'+this._href+'"'),this._target&&(e&&(e+=" "),e+='target="'+this._target+'"')
var r=""
return this.state?r+=t.buildIcon(this.icon,""," ")+this.state:r+=t.buildIcon(this.icon),this.build(this.rootTag,r,e)},r.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},r.prototype.componentWillUpdate=function(e,r){var n=""
n+=r?t.buildIcon(this.icon,""," ")+r:t.buildIcon(this.icon),this.root.innerHTML=n},r}(t.WComponent)
t.WLink=n
var i=function(e){function r(t,r,n,i,o,s){var a=e.call(this,t||"*","WLabel",n,i,o,s)||this
return a.rootTag="span",a.updateState(r),a}return __extends(r,e),Object.defineProperty(r.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),r.prototype.updateState=function(r){r||(r=""),e.prototype.updateState.call(this,r),this.root&&(this.root.innerHTML=t.buildIcon(this.props,""," ")+r)},r.prototype.for=function(e){return this.forId=t.getId(e),this},r.prototype.render=function(){var e=this.state?this.state:""
return this.forId?this.buildRoot("label",t.buildIcon(this.props,""," ")+e,'for="'+this.forId+'"',this._classStyle):this.buildRoot(this.rootTag,t.buildIcon(this.props,""," ")+e,null,this._classStyle)},r.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},r}(t.WComponent)
t.WLabel=i
var o=function(t){function e(e,r,n,i,o,s){var a=t.call(this,e||"*","WInput",r,i,o,s)||this
return a.rootTag="input",a.size=n,a}return __extends(e,t),e.prototype.updateState=function(e){e||(e=""),t.prototype.updateState.call(this,e),this.root&&(this.root.value=e)},e.prototype.getState=function(){return this.root&&(this.state=this.root.value),this.state},e.prototype.render=function(){var t=""
if(this.label){t=this.id?'<label for="'+this.id+'">':"<label>"
var e=this.label.lastIndexOf("<br")
e>0?(t+=this.label.substring(0,e).replace("<","&lt;").replace(">","&gt;"),t+="</label><br>"):(t+=this.label.replace("<","&lt;").replace(">","&gt;"),t+="</label> ")}if("static"==this.props)return t+this.build("span",this.state)
var r='name="'+this.id+'"'
return r+=this.props?' type="'+this.props+'"':' type="text"',this.size&&(r+=' size="'+this.size+'"'),this.state&&(r+=' value="'+this.state+'"'),this.placeHolder&&(r+=' placeholder="'+this.placeHolder+'"'),t+this.build(this.rootTag,"",r)},e}(t.WComponent)
t.WInput=o
var s=function(e){function r(t,r,n,i,o){var s=e.call(this,t||"*","WTextArea",r,n,i,o)||this
return s.rootTag="textarea",r||(s.props=5),s}return __extends(r,e),r.prototype.updateState=function(t){t||(t=""),e.prototype.updateState.call(this,t),this.root&&(this.root.value=t)},r.prototype.getState=function(){return this.root&&(this.state=this.root.value),this.state},r.prototype.render=function(){return this.props||(this.props=1),this._style?this._style.indexOf("width")<0&&(this._style+=";width:100%"):this._style="width:100%",this._attributes?this._style.indexOf("rows=")<0&&(this._attributes+=' rows="'+this.props+'"'):this._attributes='rows="'+this.props+'"',t.build("textarea","",this._style,this._attributes,this.id,this._classStyle)},r.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip),this.state&&this.root.setAttribute("value",this.state)},r}(t.WComponent)
t.WTextArea=s
var a=function(e){function r(t,r,n,i,o,s,a){var u=e.call(this,t||"*","WButton",n,i,o,s)||this
return u.updateState(r),u.rootTag="button",u.type=a||"button",u}return __extends(r,e),Object.defineProperty(r.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),r.prototype.setText=function(t,e){null!=e&&(this.props=e),this.setState(t)},r.prototype.render=function(){var e=this.type?'type="'+this.type+'"':"",r=""
return this.state?r+=t.buildIcon(this.props,""," ")+this.state:r+=t.buildIcon(this.props),this.build(this.rootTag,r,e)},r.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},r.prototype.componentWillUpdate=function(e,r){var n=""
null==e&&(e=this.props),n+=r?t.buildIcon(e,""," ")+r:t.buildIcon(e),this.root.innerHTML=n},r}(t.WComponent)
t.WButton=a
var u=function(t){function e(e,r,n,i,o,s,a){var u=t.call(this,e||"*","WCheck",i,o,s,a)||this
return u.rootTag="input",u.value=n||"1",i&&u.updateState(n),u._text=r,u}return __extends(e,t),Object.defineProperty(e.prototype,"text",{get:function(){return this._text},set:function(t){this._text=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"checked",{get:function(){return this.root&&(this.props=!!this.root.checked),this.state=this.props?this.value:void 0,this.props},set:function(t){this.setProps(t)},enumerable:!1,configurable:!0}),e.prototype.getState=function(){return this.root&&(this.props=!!this.root.checked),this.state=this.props?this.value:void 0,this.state},e.prototype.updateProps=function(e){t.prototype.updateProps.call(this,e),this.state=this.props?this.value:void 0,this.root&&(this.props?this.root.setAttribute("checked","checked"):this.root.removeAttribute("checked"))},e.prototype.updateState=function(e){"boolean"==typeof e&&(e=e?this.value:void 0),t.prototype.updateState.call(this,e),this.props=void 0!=this.state,this.root&&(this.props?this.root.setAttribute("checked","checked"):this.root.removeAttribute("checked"))},e.prototype.render=function(){var t='name="'+this.id+'" type="checkbox"'
t+=this.props?' checked="checked"':""
var e=this._text?"&nbsp;"+this._text:""
return this.build(this.rootTag,e,t)},e.prototype.componentDidMount=function(){var t=this
this._tooltip&&this.root.setAttribute("title",this._tooltip),this._obs=new MutationObserver(function(){t.props=!!t.root.checked,t.trigger("propschange",t.props),t.trigger("statechange",t.props?t.value:void 0)})},e}(t.WComponent)
t.WCheck=u
var h=function(e){function r(t,r,n,i,o,s){var a=e.call(this,t||"*","WSelect",null,i,o,s)||this
return a.rootTag="select",a.options=r,a.multiple=n,a}return __extends(r,e),r.prototype.getProps=function(){if(!this.root)return this.props
this.props=[]
var e=this.root.options
if(e&&e.length){var r=t.WUtil.toNumber(this.root.selectedIndex,-1)
r>=0&&e.length>r&&this.props.push(e[r].text)}return this.props},r.prototype.select=function(t){return this.root&&this.options?(this.setState(this.options.length>t?this.options[t]:null),this):this},r.prototype.addOption=function(t,e){if(!t)return this
if(this.options||(this.options=[]),this.options.push(t),!this.mounted)return this
var r=this.buildOptions()
return this.root.innerHTML=r,e&&this.updateState(t),this},r.prototype.remOption=function(t){if(!t||!this.options)return this
for(var e=-1,r=0;r<this.options.length;r++){var n=this.options[r]
if(n)if("string"==typeof t){if("string"==typeof n){if(n==t){e=r
break}}else if(n.id==t){e=r
break}}else if("string"==typeof n){if(n==t.id){e=r
break}}else if(n.id==t.id){e=r
break}}if(e>=0){if(this.options.splice(e,1),!this.mounted)return this
var i=this.buildOptions()
this.root.innerHTML=i}return this},r.prototype.setOptions=function(e,r){if(this.options=e,!this.mounted)return this
var n=this.root.value,i=this.buildOptions()
return this.root.innerHTML=i,r?this.root.value=n:e&&e.length&&("string"==typeof e[0]?this.trigger("statechange",e[0]):this.trigger("statechange",t.WUtil.getString(e[0],"id"))),this},r.prototype.updateState=function(t){e.prototype.updateState.call(this,t),this.root&&(null==this.state?this.root.value="":"string"==typeof this.state||"number"==typeof this.state?this.root.value=""+this.state:this.root.value=this.state.id)},r.prototype.render=function(){var t=this.buildOptions(),e='name="'+this.id+'"'
return this.multiple&&(e+=' multiple="multiple"'),this.buildRoot("select",t,e)},r.prototype.componentDidMount=function(){var t=this
this._tooltip&&this.root.setAttribute("title",this._tooltip),this.state&&(this.root.value=this.state),this.root.addEventListener("change",function(){t.trigger("statechange",t.root.value)})},r.prototype.buildOptions=function(){var t=""
this.options||(this.options=[])
for(var e=0,r=this.options;e<r.length;e++){var n=r[e]
t+="string"==typeof n?"<option>"+n+"</option>":'<option value="'+n.id+'">'+n.text+"</option>"}return t},r}(t.WComponent)
t.WSelect=h
var l=function(e){function r(t,r,n,i,o,s,a){var u=e.call(this,t||"*","WTable",a,i,o,s)||this
if(u.rootTag="table",u.header=r,n&&n.length)u.keys=n
else if(u.keys=[],u.header)for(var h=0;h<u.header.length;h++)u.keys.push(h)
return u.widths=[],u}return __extends(r,e),r.prototype.render=function(){if(this.sortable&&this.sortable.length){this.soId=[],this.sortBy=[]
for(var e=0;e<this.sortable.length;e++)this.sortBy.push(0)}var r="table"
this._classStyle&&(r=this._classStyle.indexOf("table ")>=0?this._classStyle:r+" "+this._classStyle)
var n=this.style?' style="'+this.style+'"':"",i=""
if(this.div&&(i+='<div id="'+this.id+'-c" class="'+this.div+'">'),i+='<table id="'+this.id+'" class="'+r+'"'+n+">",this.header&&this.header.length){var o=!1
if("string"==typeof this.headStyle?this.headStyle.indexOf("text-align")>0&&(o=!0):this.headStyle&&this.headStyle.a&&(o=!0),!this.hideHeader){i+=o?'<thead id="'+this.id+'-h"><tr>':'<thead id="'+this.id+'-h"><tr'+t.buildCss(this.headStyle)+">"
for(var s=-1,a=0,u=this.header;a<u.length;a++){var h=u[a]
s++
var l=void 0
l=0==s?this.col0Style?this.col0Style:this.colStyle:s==this.header.length-1?this.colLStyle?this.colLStyle:this.colStyle:o?this.headStyle:this.colStyle
var p=this.widths&&this.widths.length>s?this.widths[s]:0,f={}
p&&(f.w=this.widthsPerc?p+"%":p)
"w"==this.getType(s)&&(f.a="center")
if(this.sortable&&this.sortable.indexOf(s)>=0){var c=this.subId("sort_"+s)
this.soId.push(c),i+="<th"+t.buildCss(l,f)+'><a style="cursor:pointer;text-decoration:none !important;" id="'+c+'">'+h+' &nbsp;<i class="fa fa-unsorted"></i></a></th>'}else i+="<th"+t.buildCss(l,f)+">"+h+"</th>"}i+="</tr></thead>"}}return i+='<tbody id="'+this.id+'-b"></tbody>',i+="</table>",this.div&&(i+="</div>"),i},r.prototype.componentDidMount=function(){var e=this
if(this.buildBody(),this.soId)for(var r=0,n=this.soId;r<n.length;r++){var i=n[r]
!function(r){var n=document.getElementById(r)
n&&(n.onclick=function(r){var i=t.lastSub(t.getId(r.currentTarget)),o=i.indexOf("_")
if(!(o<=0)){var s=t.WUtil.toNumber(i.substring(o+1),-1)
if(s>=0&&e.keys.length>s){var a=e.header?e.header[s]:"",u=e.sortBy[s]
if(u?1==u?(e.sortBy[s]=-1,a&&(n.innerHTML=a+' &nbsp;<i class="fa fa-sort-desc"></i>')):-1==u&&(e.sortBy[s]=0,a&&(n.innerHTML=a+' &nbsp;<i class="fa fa-unsorted"></i>')):(e.sortBy[s]=1,a&&(n.innerHTML=a+' &nbsp;<i class="fa fa-sort-asc"></i>')),e.handlers._sort)for(var h=0,l=e.handlers._sort;h<l.length;h++){var p=l[h]
p(e.createEvent("_sort",e.sortBy))}}}})}(i)}},r.prototype.componentDidUpdate=function(t,e){this.buildBody()},r.prototype.getType=function(t){return this.types?this.types.length<=t?"":this.types[t]:""},r.prototype.buildBody=function(){var e=document.getElementById(this.id+"-b")
if(e){if(!this.state||!this.state.length)return void(e.innerHTML="")
if(!this.keys||!this.keys.length)return void(e.innerHTML="")
for(var r="",n=-1,i=0,o=this.state;i<o.length;i++){var s=o[i]
n++
var a=""
a=n==this.state.length-1&&this.footerStyle?"<tr"+t.buildCss(this.footerStyle)+">":"<tr"+t.buildCss(this.rowStyle)+">",r+=a
for(var u=-1,h=0,l=this.keys;h<l.length;h++){var p=l[h],f=s[p],c=""
null==f&&(f=""),u++
switch(this.getType(u)){case"w":c="text-center"
break
case"c":case"c5":case"i":case"n":c="text-right"
break
case"b":f=f?"&check;":""
break
default:f instanceof Date&&(f=f.toLocaleDateString()),"boolean"==typeof f&&(f=f?"&check;":""),"number"==typeof f&&(c="text-right")}var d=void 0
d=0==u?this.col0Style?this.col0Style:this.colStyle:u==this.header.length-1&&this.colLStyle?this.colLStyle:this.colStyle,"string"==typeof d?d.indexOf("text-align")>0&&(c=""):d&&d.a&&(c="")
var g=this.widths&&this.widths.length>u?this.widths[u]:0
r+="<td"+t.buildCss(d,c,{w:g})+">"+f+"</td>"}if(this.header&&this.header.length>this.keys.length)for(var m=0;m<this.header.length-this.keys.length;m++)r+="<td"+t.buildCss(this.colStyle)+"></td>"
r+="</tr>",e.innerHTML=r}}},r.prototype.onSort=function(t){this.handlers._sort||(this.handlers._sort=[]),this.handlers._sort.push(t)},r}(t.WComponent)
t.WTable=l
var p=function(e){function n(r,n,i){var o=e.call(this,r||"*","WFormPanel")||this
return o.rootTag="form",o._attributes=i?'role="form" name="'+o.id+'" action="'+i+'"':'role="form" name="'+o.id+'" action="javascript:void(0);"',o.title=n,t.CSS.FORM&&(t.CSS.FORM.indexOf(":")>0?o.style=t.CSS.FORM:o.classStyle=t.CSS.FORM),o.init(),o}return __extends(n,e),n.prototype.init=function(){return this.rows=[],this.roww=[],this.currRow=null,this.footer=[],this.addRow(),this},n.prototype.focus=function(){if(!this.mounted)return this
var t=this.first(!0)
return t&&(t.component?t.component.focus():t.element instanceof HTMLElement&&t.element.focus()),this},n.prototype.first=function(t){if(!this.rows)return null
for(var e=0,r=this.rows;e<r.length;e++)for(var n=r[e],i=0,o=n;i<o.length;i++){var s=o[i]
if(!t)return s
if((null==s.enabled||s.enabled)&&(null==s.readonly||!s.readonly))return s}return null},n.prototype.focusOn=function(t){if(!this.mounted)return this
var e=this.getField(t)
return e?(e.component?e.component.focus():e.element instanceof HTMLElement&&e.element.focus(),this):this},n.prototype.getField=function(t){if(t)for(var e=0==t.indexOf(this.id+"-")?t:this.subId(t),r=0;r<this.rows.length;r++)for(var n=this.rows[r],i=0;i<n.length;i++){var o=n[i]
if(o.id==e)return o}},n.prototype.addRow=function(e,r,n,i,o){return void 0===o&&(o="row"),this.currRow&&!this.currRow.length?(this.roww[this.roww.length-1]={classStyle:e,style:r,id:n,attributes:t.attributes(i),type:o},this):(this.currRow=[],this.rows.push(this.currRow),this.roww.push({classStyle:e,style:r,id:n,attributes:t.attributes(i),type:o}),this)},n.prototype.addTextField=function(e,r,n){var i=this.subId(e),s=new o(i,"text",0,t.CSS.FORM_CTRL)
return this.currRow.push({id:i,label:r,component:s,readonly:n,type:"text"}),this},n.prototype.addNoteField=function(e,r,n,i){n||(n=3)
var o=this.subId(e),a=new s(o,n,t.CSS.FORM_CTRL)
return this.currRow.push({id:o,label:r,component:a,readonly:i,type:"note"}),this},n.prototype.addDateField=function(e,r,n){var i=this.subId(e),s=new o(i,"date",0,t.CSS.FORM_CTRL)
return this.currRow.push({id:i,label:r,component:s,readonly:n,type:"date"}),this},n.prototype.addTimeField=function(e,r,n){var i=this.subId(e),s=new o(i,"time",0,t.CSS.FORM_CTRL)
return this.currRow.push({id:i,label:r,component:s,readonly:n,type:"time"}),this},n.prototype.addEmailField=function(e,r,n){var i=this.subId(e),s=new o(i,"email",0,t.CSS.FORM_CTRL)
return this.currRow.push({id:i,label:r,component:s,readonly:n,type:"email"}),this},n.prototype.addOptionsField=function(e,r,n,i,o){var s=this.subId(e),a=new h(s,n,!1,t.CSS.FORM_CTRL,"",i)
return this.currRow.push({id:s,label:r,component:a,readonly:o,type:"select"}),this},n.prototype.addBooleanField=function(e,r){var n=this.subId(e),i=new u(n,"")
return i.classStyle=t.CSS.FORM_CTRL,this.currRow.push({id:n,label:r,component:i,type:"boolean"}),this},n.prototype.addBlankField=function(t,e,n){var i=new r("",e,n)
return this.currRow.push({id:"",label:t,component:i,classStyle:e,style:n,type:"blank"}),this},n.prototype.addInternalField=function(t,e){return void 0===e&&(e=null),this.currRow.push({id:this.subId(t),value:e,type:"internal"}),this},n.prototype.addComponent=function(t,e,r){return r?(t?(r.id=this.subId(t),this.currRow.push({id:this.subId(t),label:e,component:r,type:"component"})):(r.id="",this.currRow.push({id:"",label:e,component:r,type:"component"})),this):this},n.prototype.addToFooter=function(t){return t||this.footer?(this.footer.push(t),this):this},n.prototype.componentDidMount=function(){this.main=new r(this.id+"-c")
for(var e=0;e<this.rows.length;e++){var n=this.roww[e]
this.main.addRow(t.cls(n.type,n.classStyle,n.style),t.style(n.style))
for(var o=this.rows[e],s=0,a=0;a<o.length;a++){var h=o[a]
h.component&&(s+=h.span&&h.span>0?h.span:1)}for(var l=!!t.CSS.FORM_GROUP,a=0;a<o.length;a++){var h=o[a]
if(h.component){var p=Math.floor(12/s)
if(p<1&&(p=1),1==p&&s<11&&(0==a||a==s-1)&&(p=2),h.span&&h.span>0&&(p*=h.span),this.main.addCol(""+p),h.component.setState(h.value),h.component instanceof u){if(!this.checkboxStyle){var f=getComputedStyle(this.context).getPropertyValue("font-size"),c=Math.round(.8*parseInt(f));(isNaN(c)||c<18)&&(c=18),this.checkboxStyle="height:"+c+"px;"}h.component.style=this.checkboxStyle}if(h.label&&!h.labelComp){var d=new i(h.id+"-l",h.label,"",h.classStyle)
h.labelComp=d.for(h.id)}l?this.main.addGroup({classStyle:t.CSS.FORM_GROUP},h.labelComp,h.component):(this.main.add(h.labelComp),this.main.add(h.component))}}}if(this.footer&&this.footer.length){this.foot=new r(this.subId("__foot"),this.footerClass,this.footerStyle)
for(var g=0,m=this.footer;g<m.length;g++){var h=m[g]
this.foot.addRow().addCol("12").add(h,"push")}this.main.addRow().addCol("12").add(this.foot)}this.main.mount(this.root)},n.prototype.componentWillUnmount=function(){this.main||this.main.unmount()},n.prototype.clear=function(){for(var t=0;t<this.rows.length;t++)for(var e=this.rows[t],r=0;r<e.length;r++){var n=e[r]
n.component&&n.component.setState(null),n.value=null}return this},n.prototype.setValue=function(e,r,n){void 0===n&&(n=!0)
var i=this.getField(e)
return i?("date"==i.type&&(r=t.isoDate(r)),"time"==i.type&&(r=t.formatTime(r,!1)),i.component&&i.component.setState(r),i.value=r,n&&(this.state||(this.state={}),this.state[e]=r),this):this},n.prototype.getValue=function(t){var e="string"==typeof t?this.getField(t):t
return e?e.component?e.component.getState():e.value:null},n.prototype.getValues=function(){for(var t={},e=0;e<this.rows.length;e++)for(var r=this.rows[e],n=0;n<r.length;n++){var i=r[n]
t[this.ripId(i.id)]=i.component?i.component.getState():i.value}return t},n.prototype.getState=function(){return this.state=this.getValues(),this.state},n.prototype.updateState=function(r){e.prototype.updateState.call(this,r),!r||t.WUtil.isEmpty(r)?this.clear():this.updateView()},n.prototype.updateView=function(){if(!this.state)return void this.clear()
for(var t in this.state)this.setValue(t,this.state[t],!1)},n}(t.WComponent)
t.WFormPanel=p}(WUX||(WUX={}))
var WUX
!function(t){var e=function(e){function r(t,r,n,i){var o=e.call(this,t||"*","WCalendar",1,r,n,i)||this
return o.am=[],o.mt={},o.ct="table",o.cd="table-responsive",o.ct="table",o.sp="padding:1rem;text-align:center;font-weight:bold;background-color:#eeeeee;",o.sm=o.sp,o.sn=o.sp,o.sw="text-align:center;",o.sd="text-align:center;",o.so="text-align:center;background-color:#f6f6f6;cursor:pointer;",o.ss="text-align:center;background-color:#d9e2f3;",o.sk="text-align:center;background-color:#ffe66d;",o.se="background-color:#f0f0f0;",o.st="font-weight:bold;",o.td=o.str(new Date),o}return __extends(r,e),r.prototype.onDoubleClick=function(t){this.handlers._doubleclick||(this.handlers._doubleclick=[]),this.handlers._doubleclick.push(t)},r.prototype.updateState=function(t){this.state=t,this.state||(this.state=new Date)
var e=this.state.getDate(),r=this.state.getMonth(),n=this.state.getFullYear()
this.ls=1e4*n+100*(r+1)+e+""},r.prototype.render=function(){this.state||(this.state=new Date)
for(var e='<div class="'+this.cd+'"><table id="'+this.subId("t")+'" class="'+this.ct+'"><thead><tr>',r=0;r<7;r++){var n=6==r?0:r+1
e+='<th id="'+this.subId(n+"")+'" style="'+this.sw+'">'+t.formatDay(n,!1)+"</th>"}e+='</tr></thead><tbody id="'+this.subId("b")+'">',e+=this.body(),e+="</tbody></table></div>"
var i=this.state.getMonth(),o=this.state.getFullYear(),s=100*o+i+1,a='<a id="'+this.subId("p")+'" title="Mese precedente"><i class="fa fa-arrow-circle-left"></i></a>',u='<a id="'+this.subId("n")+'" title="Mese successivo"><i class="fa fa-arrow-circle-right"></i></a>',h='<div class="row"><div class="col-2" style="'+this.sp+'">'+a+'</div><div id="'+this.subId("m")+'" class="col-8" style="'+this.sm+'">'+t.formatMonth(s,!0,!0)+'</div><div class="col-2" style="'+this.sn+'">'+u+"</div></div>"
return h+='<div class="row"><div class="col-12">'+e+"</div></div>",this.buildRoot(this.rootTag,h)},r.prototype.add=function(e){this.state||(this.state=new Date)
var r=this.state.getDate(),n=this.state.getMonth(),i=this.state.getFullYear(),o=n+e,s=new Date(i,o,r),a=s.getMonth()
a!=o&&(s=new Date(i,o+1,0),a=s.getMonth())
var u=s.getFullYear()
if(this.setState(s),this.eb&&(this.eb.innerHTML=this.body()),this.em){var h=100*u+a+1
this.em.innerText=t.formatMonth(h,!0,!0)}return s},r.prototype.mark=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r]
if(!e||!e.length)return this
for(var n=0,i=e;n<i.length;n++){var o=i[n],s=t.WUtil.toDate(o)
if(s){var a=this.str(s)
if(this.am.push(a),a!=this.ls){var u=document.getElementById(this.subId(a))
u&&u.setAttribute("style",this.sk)}}}return this},r.prototype.unmark=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r]
if(!e||!e.length)return this
for(var n=0,i=e;n<i.length;n++){var o=i[n],s=t.WUtil.toDate(o)
if(s){var a=this.str(s)
this.unm(this.am.indexOf(a))}}return this},r.prototype.title=function(e,r){var n=t.WUtil.toDate(e)
if(!n)return this
var i=this.str(n)
this.mt[i]=r
var o=document.getElementById(this.subId(i))
return o&&o.setAttribute("title",r),this},r.prototype.unm=function(t,e){if(void 0===e&&(e=!0),!(t<0)){var r=this.am[t]
if(r){e&&this.am.splice(t,1)
var n=document.getElementById(this.subId(r))
if(n){this.str(this.state)==r?n.setAttribute("style",this.ss):n.setAttribute("style",this.sd)}}}},r.prototype.clear=function(){if(this.am&&this.am.length){for(var t=0;t<this.am.length;t++)this.unm(t,!1)
this.am=[]}if(this.mt){for(var e in this.mt){var r=document.getElementById(this.subId(e))
r&&r.setAttribute("title",null)}this.mt={}}return this},r.prototype.prev=function(){return this.add(-1)},r.prototype.next=function(){return this.add(1)},r.prototype.ele=function(t){return t?document.getElementById(this.subId(this.str(t))):null},r.prototype.str=function(t){return t?1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()+"":null},r.prototype.from=function(){this.state||(this.state=new Date)
var t=this.state.getMonth()
return 1e4*this.state.getFullYear()+100*(t+1)+1+""},r.prototype.to=function(){this.state||(this.state=new Date)
var t=this.state.getMonth(),e=this.state.getFullYear()
return 1e4*e+100*(t+1)+new Date(e,t+1,0).getDate()+""},r.prototype.body=function(){this.state||(this.state=new Date)
var t="",e=this.state.getDate(),r=this.state.getMonth(),n=this.state.getFullYear()
this.ls=1e4*n+100*(r+1)+e+""
var i=new Date(n,r,1),o=i.getDay()
0==o&&(o=7)
for(var s=new Date(n,r+1,0),a=s.getDate(),u=1,h=1;h<=6;h++){t+="<tr>"
for(var l=1;l<=7;l++)if(1==h&&l<o)t+='<td style="'+this.se+'"></td>'
else if(u>a)t+='<td style="'+this.se+'"></td>'
else{var p=1e4*n+100*(r+1)+u+"",f=p==this.td?this.st:"",c=this.mt[p]
c=c?' title="'+c+'"':"",p==this.ls?t+='<td id="'+this.subId(p)+'" style="'+this.ss+f+'"'+c+">"+u+"</td>":this.am.indexOf(p)>=0?t+='<td id="'+this.subId(p)+'" style="'+this.sk+f+'"'+c+">"+u+"</td>":t+='<td id="'+this.subId(p)+'" style="'+this.sd+f+'"'+c+">"+u+"</td>",u++}if(t+="</tr>",u>a)break}return t},r.prototype.componentDidMount=function(){var e=this
this.ep=document.getElementById(this.subId("p")),this.em=document.getElementById(this.subId("m")),this.en=document.getElementById(this.subId("n")),this.et=document.getElementById(this.subId("t")),this.eb=document.getElementById(this.subId("b")),this.ep&&this.ep.addEventListener("click",function(t){e.prev()}),this.en&&this.en.addEventListener("click",function(t){e.next()}),this.root.addEventListener("click",function(r){var n=t.lastSub(r.target)
if(n&&8==n.length){var i=parseInt(n),o=n==e.td?e.st:"",s=e.ele(e.state)
if(s){var a=e.str(e.state),u=a==e.td?e.st:""
e.am.indexOf(a)>=0?s.setAttribute("style",e.sk+u):s.setAttribute("style",e.sd+u)}if(r.target.style=e.ss+o,e.ls==n)return
e.setState(new Date(i/1e4,i%1e4/100-1,i%1e4%100))}}),this.root.addEventListener("dblclick",function(r){var n=t.lastSub(r.target)
n&&8==n.length&&e.trigger("_doubleclick",n)}),this.root.addEventListener("mouseover",function(r){var n=t.lastSub(r.target)
if(n&&8==n.length){var i=n==e.td?e.st:""
r.target.style=e.so+i}}),this.root.addEventListener("mouseout",function(r){var n=t.lastSub(r.target)
if(n&&8==n.length){var i=n==e.td?e.st:""
n==e.str(e.state)?r.target.style=e.ss+i:e.am.indexOf(n)>=0?r.target.style=e.sk+i:r.target.style=e.sd+i}})},r}(t.WComponent)
t.WCalendar=e}(WUX||(WUX={}))
var APP
!function(n){var t=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.render=function(){return"<div>Hello World.</div>"},t}(WUX.WComponent)
n.Main=t}(APP||(APP={}))
