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
if(t.lastCtx=o,r&&r(i),t.onRenderHandlers.length>0){for(var s=e instanceof WUX.WComponent?e:null,a={component:s,element:o,target:o.firstChild,type:"render"},h=0,l=t.onRenderHandlers;h<l.length;h++){(0,l[h])(a)}t.onRenderHandlers=[]}})},t.mount=function(e,i){if(i||(i=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(i)+"..."),null==e)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(i)+" -> invalid component")
var n="string"==typeof i?0==i.indexOf("#")?document.getElementById(i.substring(1)):document.getElementById(i):i
if(!n)return void console.error("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(i)+" -> context unavailable")
if(t.lastCtx=n,e instanceof WUX.WComponent)e.mount(n),wuxRegister(n,e)
else if(e instanceof Element)n.append(e)
else{var r=document.createElement("template")
r.innerHTML=e,n.append(r.content.firstElementChild)}return WUX.debug&&console.log("WuxDOM.mount "+WUX.str(e)+" on "+WUX.str(i)+" completed."),n},t.unmount=function(e){e||(e=t.lastCtx?t.lastCtx:document.getElementById("view-root")),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+"...")
var i="string"==typeof e?0==e.indexOf("#")?document.getElementById(e.substring(1)):document.getElementById(e):e
if(!i)return void console.error("WuxDOM.unmount "+WUX.str(e)+" -> node unavailable")
var n=wuxRegister(i,"delete")
if(n&&n.unmount(),i.remove(),WUX.debug&&console.log("WuxDOM.unmount "+WUX.str(e)+" completed."),t.onUnmountHandlers.length>0){for(var r={component:n,element:i,target:i.firstChild,type:"unmount"},o=0,s=t.onUnmountHandlers;o<s.length;o++){(0,s[o])(r)}t.onUnmountHandlers=[]}return i},t.replace=function(e,i){var n
if(i||(i=e,e=void 0),e)if("string"==typeof e){var r=WUX.getComponent(e)
r||(n=r.getContext(),r.unmount())}else e instanceof WUX.WComponent?(n=e.getContext(),e.unmount()):(n=e.parentElement)&&(n.innerHTML="")
else n=t.unmount()
return n||(n=document.getElementById("#view-root")),n?t.mount(i,n):void console.error("WuxDOM.replace "+WUX.str(n)+" -> node unavailable")},t.onRenderHandlers=[],t.onUnmountHandlers=[],t}(),WUX
!function(t){function e(t){if(t)return t instanceof Element?t.id:t instanceof R?t.id:"string"==typeof t&&t.indexOf("<")<0?0==t.indexOf("#")?t.substring(1):t:"object"!=typeof t||t.id?"":""+t.id}function i(t,i){var n=e(t)
if(!n)return""
var r=n.indexOf("-")
return r<0?n:i?n.substring(r+1):n.substring(0,r)}function n(t){var i=e(t)
if(!i)return""
var n=i.lastIndexOf("-")
if(n<0)return i
if(n>0){if("-"==i.charAt(n-1))return i.substring(n)}return i.substring(n+1)}function r(t){if(t)return wuxRegistry[t]}function o(t){return t&&t.parent?o(t.parent):t}function s(t,e){if(t){var i=wuxRegistry[t]
if(i)return i.setProps(e),i}}function a(t,e){if(!t)return e
var i=wuxRegistry[t]
if(!i)return e
var n=i.getProps()
return null==n?e:n}function h(t,e){if(t){var i=wuxRegistry[t]
if(i)return i.setState(e),i}}function l(t,e){if(!t)return e
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
return n&&r&&n==r}function c(t,e){return e?null==t?"string"==typeof e?""==e:!e.id:"object"==typeof t?"string"==typeof e?e==t.id:e.id==t.id:"string"==typeof e?e==t:e.id==t:!t}function f(t){if(!t)return 0
var e=""+t,i=0,n=e.length,r=0
if(n>0)for(;r<n;)i=(i<<5)-i+e.charCodeAt(r++)|0
return i}function p(t){if(!t)return["","",""]
if(" "==t)return["","&nbsp;",""]
var e=" "==t.charAt(0)?"&nbsp;":"",i=t.length>1&&" "==t.charAt(t.length-1)?"&nbsp;":"",n=t.trim().split("<>")
return!n||n.length<2?[e,t.trim(),i]:(e+=n[0],2==n.length?[e,n[1],""]:(i+=n[2],[e,n[1],i]))}function g(t){if(t instanceof R){var e=t.name,i=t.id
return e||(e="WComponent"),i?e+"("+i+")":e}return t instanceof Element?"Element#"+t.id:"object"==typeof t?JSON.stringify(t):t+""}function b(e){if(!e)return""
if(e instanceof R){var i=e.rootTag
if(i)return i.toLowerCase()
var n=e.getRoot()
return n?"":t.getTagName(n)}if(e instanceof Element)return e.tagName.toLowerCase()
var r=""+e
if("<"==r.charAt(0)){var o=r.indexOf(" ")
if(o<0&&(o=r.indexOf(">")),o>0){var i=r.substring(1,o).toLowerCase()
return"/"==i.charAt(i.length-1)?i.substring(0,i.length-1):i}return""}return"#"==r.charAt(0)?t.getTagName(document.getElementById(r.substring(1))):t.getTagName(document.getElementById(r))}function m(t){var e=""
return t?"string"==typeof t?t.indexOf(":")<=0?"":";"!=t.charAt(t.length-1)?t+";":t:(t.s&&(e+=v(t.s)),t.fs&&(e+="font-style:"+t.fs+";"),t.fw&&(e+="font-weight:"+t.fw+";"),t.tt&&(e+="text-transform:"+t.tt+";"),t.tr&&(e+="transform:"+t.tr+";"),t.fl&&(e+="float:"+t.fl+";"),t.cl&&(e+="clear:"+t.cl+";"),t.a&&(e+="text-align:"+t.a+";"),t.c&&(e+="color:"+t.c+";"),t.v&&(e+="vertical-align:"+t.v+";"),t.d&&(e+="display:"+t.d+";"),t.z&&(e+="z-index:"+t.z+";"),t.lh&&(e+="line-height:"+t.lh+";"),t.ps&&(e+="position:"+t.ps+";"),t.o&&(e+="overflow:"+t.o+";"),t.ox&&(e+="overflow-x:"+t.ox+";"),t.oy&&(e+="overflow-y:"+t.oy+";"),null!=t.op&&(e+="opacity:"+t.op+";"),null!=t.ol&&(e+="outline:"+t.ol+";"),t.cr&&(e+="cursor:"+t.cr+";"),t.cn&&(e+="content:"+t.cn+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-webkit"+t.k+";":"-webkit-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-moz"+t.k+";":"-moz-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-o"+t.k+";":"-o-"+t.k+";"),t.k&&t.k.indexOf(":")>0&&(e+="-"==t.k.charAt(0)?"-ms"+t.k+";":"-ms-"+t.k+";"),t.bs&&(e+="box-shadow:"+t.bs+";"),t.bz&&(e+="box-sizing:"+t.bz+";"),t.b&&(e+=t.b.indexOf(":")>0?v("border"+t.b):t.b.match(/^(|none|inherit|initial|unset)$/)?"border:"+t.b+";":t.b.indexOf(" ")>0?"border:"+t.b+";":"border:1px solid "+t.b+";"),t.bc&&(e+="border-collapse:"+t.bc+";"),null!=t.br&&(e+="number"==typeof t.br?"border-radius:"+t.br+"px;":"border-radius:"+t.br+";"),null!=t.bsp&&(e+="number"==typeof t.bsp?"border-spacing:"+t.bsp+"px;":"border-spacing:"+t.bsp+";"),null!=t.m&&(e+="number"==typeof t.m?"margin:"+t.m+"px;":t.m.indexOf(":")>0?v("margin"+t.m):"margin:"+t.m+";"),null!=t.mt&&(e+="number"==typeof t.mt?"margin-top:"+t.mt+"px;":"margin-top:"+t.mt+";"),null!=t.mr&&(e+="number"==typeof t.mr?"margin-right:"+t.mr+"px;":"margin-right:"+t.mr+";"),null!=t.mb&&(e+="number"==typeof t.mb?"margin-bottom:"+t.mb+"px;":"margin-bottom:"+t.mb+";"),null!=t.ml&&(e+="number"==typeof t.ml?"margin-left:"+t.ml+"px;":"margin-left:"+t.ml+";"),null!=t.p&&(e+="number"==typeof t.p?"padding:"+t.p+"px;":t.p.indexOf(":")>0?v("padding"+t.p):"padding:"+t.p+";"),null!=t.pt&&(e+="number"==typeof t.pt?"padding-top:"+t.pt+"px;":"padding-top:"+t.pt+";"),null!=t.pr&&(e+="number"==typeof t.pr?"padding-right:"+t.pr+"px;":"padding-right:"+t.pr+";"),null!=t.pb&&(e+="number"==typeof t.pb?"padding-bottom:"+t.pb+"px;":"padding-bottom:"+t.pb+";"),null!=t.pl&&(e+="number"==typeof t.pl?"padding-left:"+t.pl+"px;":"padding-left:"+t.pl+";"),null!=t.f&&(e+="number"==typeof t.f?"font-size:"+t.f+"px;":t.f.indexOf(":")>0?v("font"+t.f):"font-size:"+t.f+";"),t.bg&&(e+=t.bg.indexOf(":")>0?v("background"+t.bg):t.bg.indexOf("url")>=0?"background:"+t.bg+";":"background-color:"+t.bg+";"),t.bgi&&(e+="background-image:"+t.bgi+";"),t.bgp&&(e+="background-position:"+t.bgp+";"),t.bgr&&(e+="background-repeat:"+t.bgr+";"),t.text&&(e+=t.text.indexOf(":")>0?v("text"+t.text):"text-decoration:"+t.text+";"),null!=t.l&&(e+="number"==typeof t.l?"left:"+t.l+"px;":"left:"+t.l+";"),null!=t.r&&(e+="number"==typeof t.r?"right:"+t.r+"px;":"right:"+t.r+";"),null!=t.t&&(e+="number"==typeof t.t?"top:"+t.t+"px;":"top:"+t.t+";"),null!=t.bt&&(e+="number"==typeof t.bt?"bottom:"+t.bt+"px;":"bottom:"+t.bt+";"),t.w&&(e+="number"==typeof t.w?"width:"+t.w+"px;":"width:"+t.w+";"),t.h&&(e+="number"==typeof t.h?"height:"+t.h+"px;":"height:"+t.h+";"),t.minw&&(e+="number"==typeof t.minw?"min-width:"+t.minw+"px;":"min-width:"+t.minw+";"),t.maxw&&(e+="number"==typeof t.maxw?"max-width:"+t.maxw+"px;":"max-width:"+t.maxw+";"),t.minh&&(e+="number"==typeof t.minh?"min-height:"+t.minh+"px;":"min-height:"+t.minh+";"),t.maxh&&(e+="number"==typeof t.maxh?"max-height:"+t.maxh+"px;":"max-height:"+t.maxh+";"),t.ws&&(e+="white-space:"+t.ws+";"),e):e}function y(t,e,i,n){return e&&i?t?n&&t.indexOf(e+":")>=0?v(t):v(t)+e+":"+i+";":e+":"+i+";":v(t)}function v(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return""
for(var i="",n={},r=!0,o=0;o<t.length;o++){var s=t[o]
s&&("string"==typeof s?(r||(i+=m(n),n={},r=!0),s.indexOf(":")>0&&(i+=s,";"!=s.charAt(s.length-1)&&(i+=";"))):(n=__assign(__assign({},n),s),r=!1))}return r||(i+=m(n)),i}function w(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
for(var i="",n=0;n<t.length;n++){var r=t[n]
if(r){var o="string"==typeof r?r:r.n
o&&(o.indexOf(":")>0||(i+=o+" "))}}return i.trim()}function x(t){if(!t)return""
if("string"==typeof t)return t
if("object"==typeof t){var e=""
for(var i in t)e+=i+'="'+t[i]+'" '
return e.trim()}return""}function _(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||!t.length)return""
var i=w.apply(void 0,t),n=v.apply(void 0,t),r=""
return i&&(r+=' class="'+i+'"'),n&&(r+=' style="'+n+'"'),r}function S(t,e){if(!t)return e
if(!e)return t
for(var i=t.split(" "),n=0,r=i;n<r.length;n++){if(r[n]==e)return t}return t+" "+e}function C(t,e){if(!t||!e)return t
for(var i=t.split(" "),n="",r=0,o=i;r<o.length;r++){var s=o[r]
s!=e&&(n+=s+" ")}return n.trim()}function O(t,e){if(!t)return e
if(!e)return t
for(var i=t.split(" "),n=!1,r="",o=0,s=i;o<s.length;o++){var a=s[o]
a!=e?r+=a+" ":n=!0}return n?r.trim():r.trim()+" "+e}function D(t,e){t&&t.setAttribute("class",S(t.getAttribute("class"),e))}function M(t,e){if(t){t.getAttribute("class")&&t.setAttribute("class",C(t.getAttribute("class"),e))}}function W(t,e){t&&t.setAttribute("class",O(t.getAttribute("class"),e))}function I(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i]
if(!t||!e||!e.length)return t
if(t instanceof R)t.css.apply(t,e)
else if(t instanceof Element){var n=v.apply(void 0,e),r=w.apply(void 0,e)
r&&D(t,r),n&&t.setAttribute("style",m(n))}return t}function k(e,i,n,r,o,s){if(!e)return""
i||(i=""),n||(n="")
var a=t.CSS.ICON?' style="'+t.CSS.ICON+'"':"",h=s?' title="'+s+'"':""
return o=o?" "+o:"",e.indexOf(".")>0?i+'<img src="'+e+'"'+h+a+">"+n:!r||r<2?i+'<i class="fa '+e+o+'"'+h+a+"></i>"+n:(r>5&&(r=5),i+'<i class="fa '+e+" fa-"+r+"x"+o+'"'+h+a+"></i>"+n)}function T(e,i,n,r,o,s){e||(e="div")
var a,h
"string"==typeof n?n.indexOf(":")>0?h=n:a=n:n&&(n.n&&(a=n.n),h=t.style(n)),s&&(a?a+=" "+s:a=s)
var l="<"+e
o&&(l+=' id="'+o+'"'),a&&(l+=' class="'+a+'"'),h&&(l+=' style="'+h+'"')
var u=t.attributes(r)
u&&(l+=" "+u),l+=">"
var d=p(i)
return l+=d[1],"input"==e?d[0]+l+d[2]:(l+="</"+e+">",d[0]+l+d[2])}t.debug=!1,t.registry=[],t.version="1.0.0"
var R=function(){function e(e,i,n,r,o,s){if(this.mounted=!1,this.debug=t.debug,this.forceOnChange=!1,this.rootTag="div",this.subSeq=0,this.dontTrigger=!1,this._visible=!0,this._enabled=!0,this.handlers={},this.cuid=Math.floor(1e9*Math.random()),e instanceof Element)this.root=e,this.root&&(this.mounted=!0),this.debug&&console.log("["+g(this)+"] new wrapper root="+g(this.root))
else{"string"==typeof e&&(this.id="*"==e?"w"+this.cuid:e),this.name=i||"WComponent",this._classStyle=r
var a=t.cls(o)
a&&(this._classStyle=this._classStyle?this._classStyle+" "+a:a),this._style=t.style(o),this._attributes=t.attributes(s),this.debug&&console.log("["+g(this)+"] new"),this.debug&&console.log("["+g(this)+"] updateProps",n),this.updateProps(n)}}return Object.defineProperty(e.prototype,"visible",{get:function(){return this.internal?this.internal.visible:this._visible},set:function(t){this._visible=t,this.internal&&(this.internal.visible=t),this.root instanceof HTMLElement&&(this._visible?this.root.style.display="block":this.root.style.display="none")},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return this.internal?this.internal.enabled:this._enabled},set:function(t){this._enabled=t,this.internal&&(this.internal.enabled=t),this.root&&(this._enabled?this.root.removeAttribute("disabled"):this.root.setAttribute("disabled",""))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"style",{get:function(){return this.internal?this.internal.style:this._style},set:function(e){this._style=t.css(this._baseStyle,e),this.internal&&(this.internal.style=e),this.root&&this.root.setAttribute("style",this._style)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"classStyle",{get:function(){return this.internal?this.internal.classStyle:this._classStyle},set:function(e){this.internal&&(this.internal.classStyle=e)
var i=!1,n=!1
e&&e.length>1&&"!"==e.charAt(0)?(e=e.substring(1),i=!0):e&&e.length>1&&"?"==e.charAt(0)&&(e=e.substring(1),n=!0),this._classStyle=i?t.removeClass(this._classStyle,e):n?t.toggleClass(this._classStyle,e):t.cls(this._baseClass,e),this.root&&(i?M(this.root,e):n?W(this.root,e):this.root.setAttribute("class",this._classStyle))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"attributes",{get:function(){return this.internal?this.internal.attributes:this._attributes},set:function(t){this._attributes=t,this.internal&&(this.internal.attributes=t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"tooltip",{get:function(){return this.internal?this.internal.tooltip:this._tooltip},set:function(t){this._tooltip=t,this.internal&&(this.internal.tooltip=t),this.root&&this.root.setAttribute("title",this._tooltip)},enumerable:!1,configurable:!0}),e.prototype.css=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(!t||0==t.length)return this
var i=w.apply(void 0,t)
i&&(this.classStyle=i)
var n=v.apply(void 0,t)
return n&&(this.style=n),this},e.prototype.focus=function(){return this.internal&&this.internal.focus(),this.root instanceof HTMLElement&&this.root.focus(),this},e.prototype.blur=function(){return this.internal&&this.internal.blur(),this.root instanceof HTMLElement&&this.root.blur(),this},e.prototype.forceUpdate=function(t){return this.update(this.props,this.state,!1,!1,!0,t),this},e.prototype.getContext=function(){return this.context},e.prototype.getRoot=function(){if(!this.root&&this.internal)return this.internal.getRoot()
if(!this.root){if(this.id){var t=document.getElementById(this.id)
if(t)return t}return this.context}return this.root},e.prototype.getState=function(){return this.state},e.prototype.setState=function(t,e,i){return this.debug&&console.log("["+g(this)+"] setState",t),this.update(this.props,t,!1,!0,this.forceOnChange||e,i),this},e.prototype.getProps=function(){return this.props},e.prototype.setProps=function(t,e,i){return this.debug&&console.log("["+g(this)+"] setProps",t),this.update(t,this.state,!0,!1,this.forceOnChange||e,i),this},e.prototype.on=function(t,e){if(!t)return this
for(var i=t.split(" "),n=0,r=i;n<r.length;n++){var o=r[n]
this.handlers[o]||(this.handlers[o]=[]),this.handlers[o].push(e),"_"!=o.charAt(0)&&"mount"!=o&&"unmount"!=o&&"statechange"!=o&&"propschange"!=o&&(this.root&&this.root.addEventListener(o,e))}return this.internal&&this.internal.on(t,e),this},e.prototype.off=function(t){if(t)for(var e=t.split(" "),i=0,n=e;i<n.length;i++){var r=n[i]
if(this.root)for(var o=this.handlers[r],s=0,a=o;s<a.length;s++){var h=a[s]
this.root.removeEventListener(r,h)}delete this.handlers[r]}else this.handlers={}
return this.internal&&this.internal.off(t),this},e.prototype.trigger=function(t){for(var e,i=[],n=1;n<arguments.length;n++)i[n-1]=arguments[n]
if(this.debug&&console.log("["+g(this)+"] trigger",t,i),t){var r=i&&i.length>0?i[0]:void 0
if("_"==t.charAt(0)||"mount"==t||"unmount"==t||"statechange"==t||"propschange"==t){if(void 0!==r&&("statechange"==t?this.state!=i[0]&&(this.state=i[0],this.debug&&console.log("["+g(this)+"] trigger set state",this.state)):"propschange"==t&&this.props!=i[0]&&(this.props=i[0],this.debug&&console.log("["+g(this)+"] trigger set props",this.props))),!this.handlers||!this.handlers[t])return this
for(var o=this.createEvent(t,r),s=0,a=this.handlers[t];s<a.length;s++){(0,a[s])(o)}}else if(this.root){this.debug&&console.log("["+g(this)+"] trigger "+t+" on root="+g(this.root))
var h=new Event(t)
h=__assign(__assign({},h),i),this.root.dispatchEvent(h)}return this.internal&&(this.debug&&console.log("["+g(this)+"] trigger "+t+" on internal="+g(this.internal)),(e=this.internal).trigger.apply(e,__spreadArray([t],i,!1))),this}},e.prototype.unmount=function(){if(this.debug&&console.log("["+g(this)+"] unmount ctx="+g(this.context)+" root="+g(this.root),this.state,this.props),this.componentWillUnmount(),this.internal&&this.internal.unmount(),this.internal=void 0,this.root&&this.root.remove(),this.root=void 0,this.id){var e=t.registry.indexOf(this.id)
e>=0&&t.registry.splice(e,1)}return this.mounted=!1,wuxRegister(this.id,"delete"),this.trigger("unmount"),this},e.prototype.mount=function(i){this.debug&&console.log("["+g(this)+"] mount ctx="+g(i)+" root="+g(this.root),this.state,this.props),this.id||this.root&&(this.id=this.root.id),i&&(this.context=i),this.context||this.root&&(this.context=this.root.parentElement,this.context||(this.context=this.root))
try{if(this.mounted&&this.unmount(),this.mounted=!1,!this.context){var n=document.getElementById(this.id)
n&&(this.context=n)}if(this.debug&&console.log("["+g(this)+"] componentWillMount ctx="+g(i)+" root="+g(this.root)),this.componentWillMount(),this.context){this.debug&&console.log("["+g(this)+"] render ctx="+g(i)+" root="+g(this.root))
var r=this.render()
if(r)if(r instanceof e){if(this.debug&&console.log("["+g(this)+"] render -> "+g(r)),this.internal=r,r.parent||(r.parent=this),r.mount(this.context),!this.root)if(this.id){var n=document.getElementById(this.id)
this.root=n||this.internal.getRoot()}else this.root=this.context}else if(r instanceof Element)this.context.append(r),this.root||(this.root=r)
else{var o=document.createElement("template")
o.innerHTML=r,this.context.append(o.content.firstElementChild)
var s=this.context.lastChild
s instanceof Element&&(this.root=s),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}else this.internal&&this.internal.mount(this.context),this.root||(this.root=this.id?document.getElementById(this.id):this.context)}if(this._visible||(this.internal?this.internal.visible=!1:this.root instanceof HTMLElement&&(this.root.style.display="none")),this._enabled||(this.internal?this.internal.enabled=!1:this.root.setAttribute("disabled","")),this.debug&&console.log("["+g(this)+"] componentDidMount ctx="+g(i)+" root="+g(this.root)),this.componentDidMount(),this.root)for(var a in this.handlers)if(a&&"_"!=a.charAt(0)&&"mount"!=a&&"unmount"!=a&&"statechange"!=a&&"propschange"!=a)for(var h=0,l=this.handlers[a];h<l.length;h++){var u=l[h]
this.root.addEventListener(a,u)}if(wuxRegister(this.root,this),this.mounted=!0,this.id&&(!this.internal||this.internal.id!=this.id)){if(t.registry.indexOf(this.id)>=0){var d=t.getComponent(this.id)
d&&d.cuid!=this.cuid&&console.error("["+g(this)+"] id already used by "+g(d))}else t.registry.push(this.id)}this.trigger("mount")}catch(t){var c=g(this)+" "+g(this.context)
console.error("["+g(this)+"] mount error "+c,t),this.componentDidCatch(t,c)}return this},e.prototype.componentWillUnmount=function(){},e.prototype.componentWillMount=function(){},e.prototype.render=function(){return this.buildRoot(this.rootTag)},e.prototype.componentDidMount=function(){},e.prototype.componentDidCatch=function(t,e){},e.prototype.shouldComponentUpdate=function(t,e){return"object"==typeof t||"object"==typeof e||(this.props!=t||this.state!=e)},e.prototype.componentWillUpdate=function(t,e){},e.prototype.componentDidUpdate=function(t,e){},e.prototype.updateProps=function(t){this.props=t},e.prototype.updateState=function(t){this.state=t},e.prototype.update=function(t,e,i,n,r,o){void 0===r&&(r=!1),this.debug&&console.log("["+g(this)+"] update",t,e,"propsChange="+i+",stateChange="+n+",force="+r),t=void 0===t?this.props:t
var s=this.props,a=this.state
if(this.dontTrigger=!1,this.mounted){if(r||this.shouldComponentUpdate(t,e)){try{this.debug&&console.log("["+g(this)+"] componentWillUpdate",t,e),this.componentWillUpdate(t,e),i&&(this.debug&&console.log("["+g(this)+"] updateProps",t),this.updateProps(t)),n&&(this.debug&&console.log("["+g(this)+"] updateState",e),this.updateState(e)),r&&this.mount(),this.debug&&console.log("["+g(this)+"] componentDidUpdate",s,a),this.componentDidUpdate(s,a),i&&!this.dontTrigger&&this.trigger("propschange"),n&&!this.dontTrigger&&this.trigger("statechange")}catch(t){return this.componentDidCatch(t,g(this)+"|"+g(this.context)),!1}o&&o()}}else i&&(this.debug&&console.log("["+g(this)+"] updateProps",t),this.updateProps(t),this.dontTrigger||this.trigger("propschange")),n&&(this.debug&&console.log("["+g(this)+"] updateState",e),this.updateState(e),this.dontTrigger||this.trigger("statechange"))
return!0},e.prototype.createEvent=function(t,e){var i=this.root?this.root.firstChild:this.root
return{component:this,element:this.root,target:i,type:t,data:e}},e.prototype.shouldBuildRoot=function(){if(this.internal)return!1
if(this.root)return!1
if(this.context){var t=this.context.id
if(!t&&t==this.id)return!1}return!0},e.prototype.buildRoot=function(t,e,i,n,r,o,s){return this.debug&&console.log("["+g(this)+"] buildRoot",t,e,i,n,r,o,s),this.shouldBuildRoot()?(this.debug&&console.log("["+g(this)+"] shouldBuildRoot() -> true"),this.build(t,e,i,n,r,o,s)):void(this.debug&&console.log("["+g(this)+"] shouldBuildRoot() -> false"))},e.prototype.build=function(e,i,n,r,o,s,a){e||(e="div"),void 0===r&&(r=this._classStyle),void 0===o&&(o=this._style),void 0===s&&(s=this._attributes),void 0===a&&(a=this.id)
var h="<"+e
a&&(h+=' id="'+a+'"'),r&&(h+=' class="'+r+'"'),o&&(h+=' style="'+o+'"')
var l=t.attributes(s)
l&&(h+=" "+l)
var u=t.attributes(n)
u&&(h+=" "+u),h+=">"
var d=p(null==i?this.make():i)
return h+=d[1],"input"==e?d[0]+h+d[2]:(h+="</"+e+">",d[0]+h+d[2])},e.prototype.make=function(){return""},e.prototype.subId=function(t,i){if(t instanceof e){var n=t.id
return n&&this.id?0!=n.indexOf(this.id+"-")?n:n.substring(this.id.length+1):n}return this.id&&"*"!=this.id||(this.id="w"+this.cuid),t&&"*"!=t||(t=(this.subSeq++).toString()),i||0==i?this.id+"-"+t+"-"+i:this.id+"-"+t},e.prototype.ripId=function(t){return t&&this.id&&0==t.indexOf(this.id)&&t.length>this.id.length+1?t.substring(this.id.length+1):t},e.prototype.transferTo=function(t,e,i){return this.debug&&console.log("["+g(this)+"] transferTo "+g(t)),!!t&&(t.setState(this.getState(),e,i),!0)},e}()
t.WComponent=R,t.getId=e,t.firstSub=i,t.lastSub=n,t.getComponent=r,t.getRootComponent=o,t.setProps=s,t.getProps=a,t.setState=h,t.getState=l,t.newInstance=u,t.same=d,t.match=c,t.hashCode=f,t.divide=p,t.str=g,t.getTagName=b,t.style=m,t.addStyle=y,t.css=v,t.cls=w,t.attributes=x,t.buildCss=_,t.addClass=S,t.removeClass=C,t.toggleClass=O,t.addClassOf=D,t.removeClassOf=M,t.toggleClassOf=W,t.setCss=I,t.buildIcon=k,t.build=T
var A=function(){function e(){}return e.toArray=function(t){if(t instanceof R&&(t=t.getState()),null==t)return[]
if(Array.isArray(t))return t
var e=[]
return e.push(t),e},e.toArrayNumber=function(t,i){if(t instanceof R&&(t=t.getState()),null==t)return[]
var n=[]
if(Array.isArray(t))for(var r=0,o=t;r<o.length;r++){var s=o[r],a=e.toNumber(s)
i&&!a||n.push(a)}else{var a=e.toNumber(t)
if(i&&!a)return n
n.push(a)}return n},e.toArrayString=function(t,i){if(t instanceof R&&(t=t.getState()),null==t)return[]
var n=[]
if(Array.isArray(t))for(var r=0,o=t;r<o.length;r++){var s=o[r],a=e.toString(s)
i&&!a||n.push(a)}else{var a=e.toString(t)
if(i&&!a)return n
n.push(e.toString(t))}return n},e.splitNumbers=function(t,i){if(!t)return[]
for(var n=e.toString(t),r=n.split(i),o=[],s=0,a=r;s<a.length;s++){var h=a[s]
o.push(e.toNumber(h))}return o},e.toObject=function(t,e){return t instanceof R&&(t=t.getState()),null==t?e:"object"==typeof t?t:e},e.toString=function(i,n){return void 0===n&&(n=""),i instanceof R&&(i=i.getState()),null==i?n:"string"==typeof i?i:i instanceof Date?t.formatDate(i):"object"==typeof i&&void 0!=i.id?e.toString(i.id,n):Array.isArray(i)&&i.length?e.toString(i[0],n):""+i},e.toText=function(t,i){return void 0===i&&(i=""),e.toString(t,i).replace("<","&lt;").replace(">","&gt;")},e.toNumber=function(t,i){if(void 0===i&&(i=0),t instanceof R&&(t=t.getState()),null==t)return i
if("number"==typeof t)return t
if(t instanceof Date)return 1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()
if("object"==typeof t&&void 0!=t.id)return e.toNumber(t.id,i)
if(Array.isArray(t)&&t.length)return e.toNumber(t[0],i)
var n=(""+t).trim()
n.indexOf(".")>=0&&n.indexOf(",")>=0&&(n=n.replace(".","")),n=n.replace(",",".")
var r=n.indexOf(".")>=i?parseFloat(n):parseInt(n)
return isNaN(r)?i:r},e.toInt=function(t,i){if(void 0===i&&(i=0),t instanceof R&&(t=t.getState()),null==t)return i
if("number"==typeof t)return Math.floor(t)
if(t instanceof Date)return 1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()
if("object"==typeof t&&void 0!=t.id)return e.toInt(t.id,i)
if(Array.isArray(t)&&t.length)return e.toInt(t[0],i)
var n=(""+t).replace(",","."),r=parseInt(n)
return isNaN(r)?i:r},e.toIntTime=function(t,i){if(void 0===i&&(i=0),t instanceof R&&(t=t.getState()),null==t)return i
if(t instanceof Date)return 100*t.getHours()+t.getMinutes()
if(Array.isArray(t)&&t.length)return e.toIntTime(t[0],i)
var n=(""+t).replace(":","").replace(".","").replace(",",""),r=parseInt(n)
return isNaN(r)?i:r},e.isNumeric=function(t){return!isNaN(t)},e.checkEmail=function(t){if(!t)return""
var i=e.toString(t)
if(!i)return""
if(i.length<5)return""
var n=i.indexOf("@")
return n<=0?"":i.lastIndexOf(".")<n?"":i.trim().toLowerCase()},e.starts=function(t,i){return!(!t||null==i)&&0==e.toString(t).indexOf(i)},e.ends=function(t,i){if(!t||null==i)return!1
var n=e.toString(t),r=n.lastIndexOf(i)
return!(r<0)&&r==n.length-i.length},e.isEmpty=function(t){if(!t)return!0
if(Array.isArray(t)&&!t.length)return!0
if("object"==typeof t){for(var e in t)if(t.hasOwnProperty(e))return!1
return!0}return!1},e.toBoolean=function(t,e){return void 0===e&&(e=!1),t instanceof R&&(t=t.getState()),null==t?e:"boolean"==typeof t?t:"string"==typeof t&&t.length?"1YyTtSs".indexOf(t.charAt(0))>=0:!!e},e.toDate=function(t,e){if(t instanceof R&&(t=t.getState()),null==t)return e
if(t instanceof Date)return t
if("number"==typeof t)return t<10000101?e:new Date(t/1e4,t%1e4/100-1,t%1e4%100)
if("string"==typeof t){if(t.length<8)return e
var i=t.indexOf(",")
if(i>=0&&(t=t.substring(i+1)),t.indexOf("-")>3)return new Date(t.trim())
if(this.isNumeric(t)){var n=parseInt(t)
return n<10000101?e:new Date(n/1e4,n%1e4/100-1,n%1e4%100)}return new Date(t.trim().replace(/(\d{1,2}).(\d{1,2}).(\d{4})/,"$3-$2-$1"))}return e},e.getWeek=function(t){var i
i=t instanceof Date?new Date(t.getTime()):e.toDate(t),i||(i=new Date),i.setHours(0,0,0,0),i.setDate(i.getDate()+3-(i.getDay()+6)%7)
var n=new Date(i.getFullYear(),0,4)
return 1+Math.round(((i.getTime()-n.getTime())/864e5-3+(n.getDay()+6)%7)/7)},e.getParam=function(t,e){e||(e=window.location.href),t=t.replace(/[\[\]]/g,"\\$&")
var i=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)"),n=i.exec(e)
return n&&n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):""},e.size=function(t){if(!t)return 0
if(Array.isArray(t))return t.length
if("object"==typeof t){var e=0
for(var i in t)t.hasOwnProperty(i)&&e++
return e}return 0},e.setValue=function(t,e,i){return"object"==typeof t&&(t[e]=i),t},e.getValue=function(t,i,n){if(!i)return n
if(Array.isArray(t)&&t.length)return"-1"==i?e.getLast(t,n):e.isNumeric(i)?e.getItem(t,e.toInt(i),n):e.getValue(t[0],i,n)
if("object"==typeof t){var r=i.indexOf(".")
if(null==t[i]&&r>0){var o=i.substring(0,r)
return null==t[o]?n:e.getValue(t[o],i.substring(r+1),n)}return null==t[i]?n:t[i]}return n},e.getItem=function(t,e,i){if(e<0)return i
if(Array.isArray(t)){if(t.length>e){var n=t[e]
return null==n?i:n}return i}return i},e.getFirst=function(t,e){if(Array.isArray(t)){if(t.length>0){var i=t[0]
return null==i?e:i}return e}return e},e.getLast=function(t,e){if(Array.isArray(t)){if(t.length>0){var i=t[t.length-1]
return null==i?e:i}return e}return e},e.getNumber=function(t,i,n){return e.toNumber(e.getValue(t,i,n))},e.getInt=function(t,i,n){return e.toInt(e.getValue(t,i,n))},e.getString=function(i,n,r,o){var s=e.getValue(i,n)
return null==s?r:o?"?"==o?"number"==typeof s?t.formatNum(s):e.toString(s):"c"==o?t.formatCurr(s):"c5"==o?t.formatCurr5(s):"n"==o?t.formatNum(s):"n2"==o?t.formatNum2(s):"m"==o?t.formatMonth(s):"d"==o?t.formatDate(s):"dt"==o?t.formatDateTime(s):"t"==o?t.formatTime(s):e.toString(s):e.toString(s)},e.getText=function(t,i,n){return e.toText(e.getValue(t,i,n))},e.getBoolean=function(t,i,n){return e.toBoolean(e.getValue(t,i,n))},e.getDate=function(t,i,n){return e.toDate(e.getValue(t,i,n))},e.getArray=function(t,i){return e.toArray(e.getValue(t,i))},e.getArrayNumber=function(t,i,n){return e.toArrayNumber(e.getValue(t,i),n)},e.getArrayString=function(t,i,n){return e.toArrayString(e.getValue(t,i),n)},e.getObject=function(t,i,n){var r=e.toObject(e.getValue(t,i))
return!r&&n?{}:r},e.sort=function(t,i,n){if(void 0===i&&(i=!0),!t)return[]
var r=e.toArray(t)
if(!n){var o=r.sort()
return i?o:o.reverse()}var s=r.sort(function(t,i){var r=e.getValue(t,n),o=e.getValue(i,n)
return r<o?-1:r>o?1:0})
return i?s:s.reverse()},e.find=function(t,i,n){if(!t||!i)return null
for(var r=e.toArray(t),o=0,s=r;o<s.length;o++){var a=s[o],h=e.getValue(a,i)
if(h instanceof Date&&n instanceof Date&&h.getTime()==n.getTime())return a
if(h==n)return a}return null},e.indexOf=function(t,i,n){if(!t||!i)return-1
for(var r=e.toArray(t),o=0;o<r.length;o++){var s=e.getValue(r[o],i)
if(s instanceof Date&&n instanceof Date&&s.getTime()==n.getTime())return o
if(s==n)return o}return-1},e.isSameDate=function(t,e){return this.toNumber(t)==this.toNumber(e)},e.indexOfDate=function(t,i){if(!t||!i)return-1
for(var n=e.toNumber(i),r=0;r<t.length;r++)if(t[r]){var o=e.toNumber(t[r])
if(o==n)return r}return-1},e.round2=function(t){if(null==t)return 0
var i=e.toNumber(t)
return Math.round(100*i)/100},e.floor2=function(t){if(null==t)return 0
var i=e.toNumber(t)
return Math.floor(100*i)/100},e.ceil2=function(t){if(null==t)return 0
var i=e.toNumber(t)
return Math.ceil(100*i)/100},e.compare2=function(t,i){if(!t&&!i)return 0
var n=Math.round(100*e.toNumber(t)),r=Math.round(100*e.toNumber(i))
return n==r?0:n>r?1:-1},e.compare5=function(t,i){if(!t&&!i)return 0
var n=Math.round(1e4*e.toNumber(t)),r=Math.round(1e4*e.toNumber(i))
return n==r?0:n>r?1:-1},e.getCurrDate=function(t,e,i,n,r){var o=new Date
return o.setHours(0,0,0,0),t&&o.setDate(o.getDate()+t),e&&o.setMonth(o.getMonth()+e),i&&o.setFullYear(o.getFullYear()+i),n&&o.setDate(1),r&&(o.setMonth(o.getMonth()+1),o.setDate(0)),o},e.calcDate=function(t,e,i,n,r,o){return t=t?new Date(t.getTime()):new Date,t.setHours(0,0,0,0),e&&t.setDate(t.getDate()+e),i&&t.setMonth(t.getMonth()+i),n&&t.setFullYear(t.getFullYear()+n),r&&t.setDate(1),o&&(t.setMonth(t.getMonth()+1),t.setDate(0)),t},e.timestamp=function(t){var i=t?e.toDate(t):new Date
i||(i=new Date)
var n=""+i.getFullYear(),r=i.getMonth()+1,o=r<10?"0"+r:""+r,s=i.getDate(),a=s<10?"0"+s:""+s,h=i.getHours(),l=h<10?"0"+h:""+h,u=i.getMinutes(),d=u<10?"0"+u:""+u,c=i.getSeconds()
return n+o+a+l+d+(c<10?"0"+c:""+c)},e.nvl=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
if(t&&t){for(var i=0,n=t;i<n.length;i++){var r=n[i]
if(!r)return r}return t[0]}},e.eqValues=function(t,e){for(var i=[],n=2;n<arguments.length;n++)i[n-2]=arguments[n]
if(!t&&!e)return!0
if(!t||!e)return!1
for(var r=0,o=i;r<o.length;r++){var s=o[r]
if(t[s]!=e[s])return!1}return!0},e.col=function(t,i,n){var r=[]
if(!t||!t.length)return r
for(var o=0,s=t;o<s.length;o++){var a=s[o]
r.push(e.getItem(a,i,n))}return r},e.getSortedKeys=function(t){if(!t)return[]
var e=[]
for(var i in t)t.hasOwnProperty(i)&&e.push(i)
return e.sort()},e.diffMinutes=function(t,i){var n=e.toDate(t),r=e.toDate(i)
return n||(n=new Date),r||(r=new Date),(n.getTime()-r.getTime())/6e4},e.diffHours=function(t,i){var n=e.toDate(t),r=e.toDate(i)
return n||(n=new Date),r||(r=new Date),(n.getTime()-r.getTime())/36e5},e.diffDays=function(t,i){var n=e.toDate(t),r=e.toDate(i)
n||(n=new Date),r||(r=new Date)
var o=n.getTime()-r.getTime(),s=o/864e5,a=o%864e5,h=a/6e4,l=s
return h>12&&l++,l},e}()
t.WUtil=A}(WUX||(WUX={}))
var WUX
!function(t){function e(e,i,n){if(void 0===i&&(i=!1),void 0===n&&(n=!1),!e)return""
var r=t.WUtil.toDate(e)
if(!r)return""
var o=r.getMonth()+1,s=o<10?"0"+o:""+o,a=r.getDate()<10?"0"+r.getDate():""+r.getDate()
return i?t.formatDay(r.getDay(),n)+", "+a+"/"+s+"/"+r.getFullYear():a+"/"+s+"/"+r.getFullYear()}function i(e){if(!e)return""
var i=t.WUtil.toDate(e)
if(!i)return""
var n=i.getMonth()+1,r=n<10?"0"+n:""+n,o=i.getDate()<10?"0"+i.getDate():""+i.getDate()
return i.getFullYear()+"-"+r+"-"+o}function n(e,i,n,r){if(void 0===i&&(i=!1),void 0===n&&(n=!1),void 0===r&&(r=!1),!e)return""
var o=t.WUtil.toDate(e)
if(!o)return""
var s=o.getMonth()+1,a=s<10?"0"+s:""+s,h=o.getDate()<10?"0"+o.getDate():""+o.getDate(),l=o.getHours()<10?"0"+o.getHours():""+o.getHours(),u=o.getMinutes()<10?"0"+o.getMinutes():""+o.getMinutes()
if(i){var d=o.getSeconds()<10?"0"+o.getSeconds():""+o.getSeconds()
return n?t.formatDay(o.getDay(),r)+", "+h+"/"+a+"/"+o.getFullYear()+" "+l+":"+u+":"+d:h+"/"+a+"/"+o.getFullYear()+" "+l+":"+u+":"+d}return n?t.formatDay(o.getDay(),r)+", "+h+"/"+a+"/"+o.getFullYear()+" "+l+":"+u:h+"/"+a+"/"+o.getFullYear()+" "+l+":"+u}function r(t,e){if(void 0===e&&(e=!1),null==t)return""
if("number"==typeof t){if(e){t<1e4&&(t*=100)
var i=Math.floor(t/1e4),n=Math.floor(t%1e4/100),o=t%1e4%100,s=n<10?"0"+n:""+n,a=o<10?"0"+o:""+o
return i+":"+s+":"+a}t>9999&&(t=Math.floor(t/100))
var i=Math.floor(t/100),n=t%100,s=n<10?"0"+n:""+n
return i+":"+s}if("string"==typeof t){var h=t.indexOf("T")
h<0&&(h=t.indexOf(" ")),h>=0&&(t=t.substring(h+1)),h=t.indexOf("+"),h<0&&(h=t.indexOf("-")),h<0&&(h=t.indexOf("Z")),h>=0&&(t=t.substring(0,h))
return r(parseInt(t.replace(":","").replace(".","")))}if(t instanceof Date){var l=t.getHours()<10?"0"+t.getHours():""+t.getHours(),u=t.getMinutes()<10?"0"+t.getMinutes():""+t.getMinutes()
if(e){var a=t.getSeconds()<10?"0"+t.getSeconds():""+t.getSeconds()
return l+":"+u+":"+a}return l+":"+u}return""}function o(e,i,n,r){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+Math.round(100*o)/100).replace(".",",")
return null!=i&&0!=o?null!=r&&o<0?r.replace("$",s):i.replace("$",s):null!=n&&0==o?n.replace("$",s):s}function s(e,i,n,r){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+o).replace(".",",")
return null!=i&&0!=o?null!=r&&o<0?"l"==r?o.toLocaleString("it-IT"):r.replace("$",s):"l"==i?o.toLocaleString("it-IT"):i.replace("$",s):null!=n&&0==o?n.replace("$",s):s}function a(e,i,n,r){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(Math.round(100*o)/100).toLocaleString("it-IT"),a=s.indexOf(",")
return a<0&&(s+=",00"),a==s.length-2&&(s+="0"),null!=i&&0!=o?null!=r&&o<0?r.replace("$",s):i.replace("$",s):null!=n&&0==o?n.replace("$",s):s}function h(e,i,n,r){if(""===e||null==e)return""
var o=t.WUtil.toNumber(e),s=(""+Math.round(1e5*o)/1e5).replace(".",","),a=s.indexOf(",")
if(a<0&&(s+=",00"),a==s.length-2&&(s+="0"),a>0){for(var h=s.substring(0,a),l=s.substring(a),u="",d=1;d<=h.length;d++)d>3&&(d-1)%3==0&&(u="."+u),u=h.charAt(h.length-d)+u
s=u+l}return null!=i&&0!=o?null!=r&&o<0?r.replace("$",s):i.replace("$",s):null!=n&&0==o?n.replace("$",s):s}function l(t){return null==t?"":t?"S":"N"}function u(e){if(null==e)return""
if("string"==typeof e)return e
if("boolean"==typeof e)return t.formatBoolean(e)
if("number"==typeof e){return(""+e).indexOf(".")>=0?t.formatCurr(e):t.formatNum(e)}return e instanceof Date?t.formatDate(e):e instanceof t.WComponent?t.format(e.getState()):""+e}function d(t,e){switch(t){case 0:return e?"Domenica":"Dom"
case 1:return e?"Luned&igrave;":"Lun"
case 2:return e?"Marted&igrave;":"Mar"
case 3:return e?"Mercoled&igrave;":"Mer"
case 4:return e?"Giove&igrave;":"Gio"
case 5:return e?"Venerd&igrave;":"Ven"
case 6:return e?"Sabato":"Sab"}return""}function c(t,e,i){switch(t>100&&(i=Math.floor(t/100),t%=100),i=i?" "+i:"",t){case 1:return e?"Gennaio"+i:"Gen"+i
case 2:return e?"Febbraio"+i:"Feb"+i
case 3:return e?"Marzo"+i:"Mar"+i
case 4:return e?"Aprile"+i:"Apr"+i
case 5:return e?"Maggio"+i:"Mag"+i
case 6:return e?"Giugno"+i:"Giu"+i
case 7:return e?"Luglio"+i:"Lug"+i
case 8:return e?"Agosto"+i:"Ago"+i
case 9:return e?"Settembre"+i:"Set"+i
case 10:return e?"Ottobre"+i:"Ott"+i
case 11:return e?"Novembre"+i:"Nov"+i
case 12:return e?"Dicembre"+i:"Dic"+i}return""}function f(t,e,i){void 0===i&&(i="application/octet-stream")
for(var n=atob(t),r=new Array(n.length),o=0;o<n.length;o++)r[o]=n.charCodeAt(o)
var s=new Uint8Array(r),a=new Blob([s],{type:i}),h=document.createElement("a")
h.href=URL.createObjectURL(a),h.download=e,h.click()}function p(t,e,i){void 0===i&&(i="application/octet-stream")
for(var n=atob(t),r=new Array(n.length),o=0;o<n.length;o++)r[o]=n.charCodeAt(o)
var s=new Uint8Array(r),a=new Blob([s],{type:i}),h=URL.createObjectURL(a),l=document.createElement("a")
l.href=h,l.target="_blank",l.rel="noopener noreferrer",l.title=e,l.click(),setTimeout(function(){URL.revokeObjectURL(h)},1e3)}var g={},b={}
t.global={locale:"it",init:function(e){t.debug&&console.log("[WUX] global.init..."),t.debug&&console.log("[WUX] global.init completed"),e&&e()},setData:function(t,e,i){if(void 0===i&&(i=!1),t||(t="global"),g[t]=e,!i&&b[t])for(var n=0,r=b[t];n<r.length;n++){var o=r[n]
o(e)}},getData:function(t,e){t||(t="global")
var i=g[t]
return null==i?e:i},onDataChanged:function(t,e){t||(t="global"),b[t]||(b[t]=[]),b[t].push(e)}}
var m=function(){function t(){}return t.FORM="padding-top:16px;",t.FORM_GROUP="form-group",t.FORM_CTRL="form-control",t.FORM_CHECK="form-check form-check-inline",t.CHECK_STYLE="padding-top:1.5rem;",t.ICON="margin-right:8px;",t.SEL_ROW="primary-bg-a2",t.PRIMARY={bg:"#b8d4f1"},t.SECONDARY={bg:"#d1d7dc"},t.SUCCESS={bg:"#b8ddd0"},t.DANGER={bg:"#f4c7ce"},t.WARNING={bg:"#e6d3b8"},t.INFO={bg:"#e2e2e2"},t.LIGHT={bg:"#f9f8fb"},t}()
t.CSS=m
var y=function(){function t(){}return t.OK="OK",t.CLOSE="Chiudi",t.CANCEL="Annulla",t}()
t.RES=y,t.formatDate=e,t.isoDate=i,t.formatDateTime=n,t.formatTime=r,t.formatNum2=o,t.formatNum=s,t.formatCurr=a,t.formatCurr5=h,t.formatBoolean=l,t.format=u,t.formatDay=d,t.formatMonth=c,t.saveFile=f,t.viewFile=p}(WUX||(WUX={}))
var WUX
!function(t){var e=function(t){function e(e){return t.call(this,null,"Wrapp",e)||this}return __extends(e,t),e.prototype.render=function(){return this.isText=!1,"string"==typeof this.props&&(!this.props||this.props.indexOf("<")<0)?(this.isText=!0,this.buildRoot(this.rootTag,this.props)):this.props},e.prototype.componentDidMount=function(){this.root&&!this.isText&&(this.rootTag=this.root.tagName,this.id=this.root.getAttribute("id"),this._classStyle=this.root.getAttribute("class"),this._style=this.root.getAttribute("style"))},e}(t.WComponent)
t.Wrapp=e
var i=function(i){function n(e,n,r,o,s,a){var h=i.call(this,e||"*","WContainer",a,n,t.style(r),o)||this
return h.cbef=[],h.caft=[],h.cint=[],h.comp=[],h.sr_c=[],h.grid=[],h.rootTag=s?"span":"div",h}return __extends(n,i),n.prototype.addRow=function(e,i){null==e&&(e="row")
var n=[],r=t.style(i)
return r&&(e+="^"+r),n.push(e),this.grid.push(n),this},n.prototype.addCol=function(e,i){e||(e="col-12"),isNaN(parseInt(e))||(e="col-"+e),this.grid.length||this.addRow()
var n=this.grid[this.grid.length-1],r=t.style(i)
return r&&(e+="^"+r),n.push(e),this},n.prototype.before=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
return t?(this.cbef=t,this):this},n.prototype.after=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]
return t?(this.caft=t,this):this},n.prototype.add=function(t,i){if(!t)return this
if("string"==typeof t)return this.add(new e(t),i),this
if(t instanceof Element)return this.add(new e(t),i),this
if(t.parent||(t.parent=this),!this.grid.length)return this.cint.push(t),this
if("internal"==i)return this.cint.push(t),this
if("before"==i)return this.cbef.push(t),this
if("after"==i)return this.caft.push(t),this
var n=this.grid.length-1
if(i){var r=parseInt(i)
if(!isNaN(r)){if(r<0)return this.cint.push(t),this
n=r}}var o=this.grid[n],s=o.length-1
return this.comp.push(t),this.sr_c.push(this.subId(n+"_"+s)),this},n.prototype.addGroup=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i]
if(t){var n=this.addContainer(t)
if(!e||!e.length)return this
for(var r=0,o=e;r<o.length;r++){var s=o[r]
s&&n.add(s)}return this}if(!e||!e.length)return this
for(var a=0,h=e;a<h.length;a++){var s=h[a]
s&&this.add(s)}return this},n.prototype.addLine=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i]
var r=new n
if(r.addRow(),e){var o="1"
"string"!=typeof t&&((o=t.n)||(o="1"))
for(var s=0,a=e;s<a.length;s++){var h=a[s]
h&&r.addCol(o,t).add(h)}}return this.add(r),this},n.prototype.addStack=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i]
var r=new n
if(e){var o="12"
"string"!=typeof t&&((o=t.n)||(o="12"))
for(var s=0,a=e;s<a.length;s++){var h=a[s]
h&&r.addRow().addCol(o,t).add(h)}}return this.add(r),this},n.prototype.addContainer=function(e,i,r,o,s,a){var h
return"string"==typeof e?(h=new n(e,i,r,o,s,a),this.add(h)):e instanceof n?(e.parent=this,this.add(e,i)):(h=new n,e&&(h.classStyle=t.cls(e.classStyle,e.style),h.style=t.style(e.style),h.attributes=e.attributes),this.add(h,i)),h},n.prototype.addDiv=function(e,i,n,r){if("number"==typeof e){if(e<1)return this
var o=t.build("div",i,{h:e,n:n})
return this.add(o)}var o=t.build("div",i,e,n,r)
return this.add(o)},n.prototype.end=function(){return this.parent instanceof n?this.parent.end():this},n.prototype.componentWillMount=function(){for(var t=0,e=this.cbef;t<e.length;t++){var i=e[t]
"string"==typeof i||(i instanceof Element?this.context&&this.context.append(i):i.mount(this.context))}},n.prototype.render=function(){var t="",e=this.grid.length
if(e)for(var i=0;i<e;i++){var n=this.grid[i],r=n.length
if(r){t+="<div "+this.cs(n[0])+' id="'+this.subId(i+"_0")+'">'
for(var o=1;o<r;o++)t+='<div id="'+this.subId(i+"_"+o)+'" '+this.cs(n[o])+"></div>"
t+="</div>"}}for(var s="",a="",h=0,l=this.cbef;h<l.length;h++){var u=l[h]
"string"==typeof u&&(s+=u)}for(var d=0,c=this.caft;d<c.length;d++){var u=c[d]
"string"==typeof u&&(a+=u)}return s+this.buildRoot(this.rootTag,t)+a},n.prototype.componentDidMount=function(){for(var t=0;t<this.cint.length;t++)this.cint[t].mount(this.root)
for(var t=0;t<this.comp.length;t++){var e=this.comp[t],i=document.getElementById(this.sr_c[t])
i&&e.mount(i)}for(var n=0,r=this.caft;n<r.length;n++){var i=r[n]
"string"==typeof i||(i instanceof Element?this.context&&this.context.append(i):i.mount(this.context))}},n.prototype.componentWillUnmount=function(){for(var e=0,i=this.cbef;e<i.length;e++){var n=i[e]
n instanceof t.WComponent&&n.unmount()}for(var r=0,o=this.cint;r<o.length;r++){var s=o[r]
s.unmount()}for(var a=0,h=this.comp;a<h.length;a++){var s=h[a]
s.unmount()}for(var l=0,u=this.caft;l<u.length;l++){var n=u[l]
n instanceof t.WComponent&&n.unmount()}},n.prototype.cs=function(t){if(!t)return""
var e=t.indexOf("^")
return e<0?'class="'+t+'"':'class="'+t.substring(0,e)+'" style="'+t.substring(e+1)+'"'},n.prototype.getElement=function(t,e){if(!this.grid||!this.grid.length)return null
if(t<0&&(t=this.grid.length+t)<0&&(t=0),this.grid.length<=t)return null
if(null==e)return document.getElementById(this.subId(t+"_0"))
var i=this.grid[t]
return!i||i.length<2?null:(e<0&&(e=i.length-1+e)<0&&(e=0),e++,document.getElementById(this.subId(t+"_"+e)))},n}(t.WComponent)
t.WContainer=i
var n=function(e){function i(t,i,n,r,o,s,a,h){var l=e.call(this,t||"*","WLink",n,r,o,s)||this
return l.updateState(i),l.rootTag="a",l._href=a,l._target=h,l}return __extends(i,e),Object.defineProperty(i.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"href",{get:function(){return this._href},set:function(t){this._href=t,this.root&&(t?this.root.setAttribute("href",t):this.root.removeAttribute("href"))},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"target",{get:function(){return this._target},set:function(t){this._target=t,this.root&&(t?this.root.setAttribute("target",t):this.root.removeAttribute("target"))},enumerable:!1,configurable:!0}),i.prototype.render=function(){var e=""
this._href&&(e+='href="'+this._href+'"'),this._target&&(e&&(e+=" "),e+='target="'+this._target+'"')
var i=""
return this.state?i+=t.buildIcon(this.icon,""," ")+this.state:i+=t.buildIcon(this.icon),this.build(this.rootTag,i,e)},i.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},i.prototype.componentWillUpdate=function(e,i){var n=""
n+=i?t.buildIcon(this.icon,""," ")+i:t.buildIcon(this.icon),this.root.innerHTML=n},i}(t.WComponent)
t.WLink=n
var r=function(e){function i(t,i,n,r,o,s){var a=e.call(this,t||"*","WLabel",n,r,o,s)||this
return a.rootTag="span",a.updateState(i),a}return __extends(i,e),Object.defineProperty(i.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),i.prototype.updateState=function(i){i||(i=""),e.prototype.updateState.call(this,i),this.root&&(this.root.innerHTML=t.buildIcon(this.props,""," ")+i)},i.prototype.for=function(e){return this.forId=t.getId(e),this},i.prototype.render=function(){var e=this.state?this.state:""
return this.forId?this.buildRoot("label",t.buildIcon(this.props,""," ")+e,'for="'+this.forId+'"',this._classStyle):this.buildRoot(this.rootTag,t.buildIcon(this.props,""," ")+e,null,this._classStyle)},i.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},i}(t.WComponent)
t.WLabel=r
var o=function(t){function e(e,i,n,r,o,s){var a=t.call(this,e||"*","WInput",i,r,o,s)||this
return a.rootTag="input",a.size=n,a}return __extends(e,t),Object.defineProperty(e.prototype,"readonly",{get:function(){return this._ro},set:function(t){this._ro=t,this.mounted&&(t?this.root.setAttribute("readonly",""):this.root.removeAttribute("readonly"))},enumerable:!1,configurable:!0}),e.prototype.updateState=function(e){e||(e=""),t.prototype.updateState.call(this,e),this.root&&(this.root.value=e)},e.prototype.getState=function(){return this.root&&(this.state=this.root.value),this.state},e.prototype.render=function(){var t=""
if(this.label){t=this.id?'<label for="'+this.id+'">':"<label>"
var e=this.label.lastIndexOf("<br")
e>0?(t+=this.label.substring(0,e).replace("<","&lt;").replace(">","&gt;"),t+="</label><br>"):(t+=this.label.replace("<","&lt;").replace(">","&gt;"),t+="</label> ")}if("static"==this.props)return t+this.build("span",this.state)
var i='name="'+this.id+'"'
return i+=this.props?' type="'+this.props+'"':' type="text"',this.size&&(i+=' size="'+this.size+'"'),this.state&&(i+=' value="'+this.state+'"'),this.placeHolder&&(i+=' placeholder="'+this.placeHolder+'"'),this._ro&&(i+=" readonly"),t+this.build(this.rootTag,"",i)},e}(t.WComponent)
t.WInput=o
var s=function(e){function i(t,i,n,r,o){var s=e.call(this,t||"*","WTextArea",i,n,r,o)||this
return s.rootTag="textarea",i||(s.props=5),s}return __extends(i,e),Object.defineProperty(i.prototype,"readonly",{get:function(){return this._ro},set:function(t){this._ro=t,this.mounted&&(t?this.root.setAttribute("readonly",""):this.root.removeAttribute("readonly"))},enumerable:!1,configurable:!0}),i.prototype.updateState=function(t){t||(t=""),e.prototype.updateState.call(this,t),this.root&&(this.root.value=t)},i.prototype.getState=function(){return this.root&&(this.state=this.root.value),this.state},i.prototype.render=function(){return this.props||(this.props=1),this._style?this._style.indexOf("width")<0&&(this._style+=";width:100%"):this._style="width:100%",this._attributes?this._style.indexOf("rows=")<0&&(this._attributes+=' rows="'+this.props+'"'):this._attributes='rows="'+this.props+'"',this._ro?this._attributes?this._attributes.indexOf("readonly")<0&&(this._attributes+=" readonly"):this._attributes="readonly":this._attributes&&this._attributes.indexOf("readonly")>=0&&this._attributes.replace("readonly",""),t.build("textarea","",this._style,this._attributes,this.id,this._classStyle)},i.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip),this.state&&this.root.setAttribute("value",this.state)},i}(t.WComponent)
t.WTextArea=s
var a=function(e){function i(t,i,n,r,o,s,a){var h=e.call(this,t||"*","WButton",n,r,o,s)||this
return h.updateState(i),h.rootTag="button",h.type=a||"button",h}return __extends(i,e),Object.defineProperty(i.prototype,"icon",{get:function(){return this.props},set:function(t){this.update(t,this.state,!0,!1,!1)},enumerable:!1,configurable:!0}),i.prototype.setText=function(t,e){null!=e&&(this.props=e),this.setState(t)},i.prototype.render=function(){var e=this.type?'type="'+this.type+'"':"",i=""
return this.state?i+=t.buildIcon(this.props,""," ")+this.state:i+=t.buildIcon(this.props),this.build(this.rootTag,i,e)},i.prototype.componentDidMount=function(){this._tooltip&&this.root.setAttribute("title",this._tooltip)},i.prototype.componentWillUpdate=function(e,i){var n=""
null==e&&(e=this.props),n+=i?t.buildIcon(e,""," ")+i:t.buildIcon(e),this.root.innerHTML=n},i}(t.WComponent)
t.WButton=a
var h=function(t){function e(e,i,n,r,o,s,a){var h=t.call(this,e||"*","WCheck",r,o,s,a)||this
return h.rootTag="input",h.value=n||"1",r&&h.updateState(n),h._text=i,h}return __extends(e,t),Object.defineProperty(e.prototype,"text",{get:function(){return this._text},set:function(t){this._text=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"checked",{get:function(){return this.root&&(this.props=!!this.root.checked),this.state=this.props?this.value:void 0,this.props},set:function(t){this.setProps(t)},enumerable:!1,configurable:!0}),e.prototype.getState=function(){return this.root&&(this.props=!!this.root.checked),this.state=this.props?this.value:void 0,this.state},e.prototype.updateProps=function(e){t.prototype.updateProps.call(this,e),this.state=this.props?this.value:void 0,this.root&&(this.props?this.root.setAttribute("checked","checked"):this.root.removeAttribute("checked"))},e.prototype.updateState=function(e){"boolean"==typeof e&&(e=e?this.value:void 0),t.prototype.updateState.call(this,e),this.props=void 0!=this.state,this.root&&(this.props?this.root.setAttribute("checked","checked"):this.root.removeAttribute("checked"))},e.prototype.render=function(){var t='name="'+this.id+'" type="checkbox"'
t+=this.props?' checked="checked"':""
var e=this._text?"&nbsp;"+this._text:"",i="",n=""
return(this.divClass||this.divStyle)&&(i+="<div ",this.divClass&&(i+=' class="'+this.divClass+'"'),this.divStyle&&(i+=' style="'+this.divStyle+'"'),i+=">"),this.label&&(n+='<label for="'+this.id+'">'+this.label+"</label>"),i&&(n+="</div>"),i+this.build(this.rootTag,e,t)+n},e.prototype.componentDidMount=function(){var t=this
this._tooltip&&this.root.setAttribute("title",this._tooltip),this._obs=new MutationObserver(function(){t.props=!!t.root.checked,t.trigger("propschange",t.props),t.trigger("statechange",t.props?t.value:void 0)})},e}(t.WComponent)
t.WCheck=h
var l=function(e){function i(t,i,n,r,o,s){var a=e.call(this,t||"*","WRadio",s,n,r,o)||this
return a.options=i,a}return __extends(i,e),Object.defineProperty(i.prototype,"enabled",{get:function(){return this._enabled},set:function(t){if(this._enabled=t,this.mounted)for(var e=0;e<this.options.length;e++){var i=document.getElementById(this.id+"-"+e)
i&&(t?i.removeAttribute("disabled"):i.setAttribute("disabled",""))}},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"tooltip",{set:function(t){if(this._tooltip=t,this.mounted&&(this.internal&&(this.internal.tooltip=t),this.options&&this.options.length))for(var e=0;e<this.options.length;e++){var i=document.getElementById(this.id+"-"+e)
i&&i.setAttribute("title",this._tooltip)}},enumerable:!1,configurable:!0}),i.prototype.select=function(t){return this.root&&this.options?(this.setState(this.options.length>t?this.options[t]:null),this):this},i.prototype.render=function(){var e=""
this.label&&(e+=this.id?'<label for="'+this.id+'">':"<label>",e+=this.label.replace("<","&lt;").replace(">","&gt;"),e+="</label> ")
var i=""
null==this._enabled||this._enabled||(i=" disabled"),this.options||(this.options=[])
var n=this.options.length
void 0===this.state&&n&&(this.state=this.options[0])
for(var r=0;r<n;r++){e+='<div class="form-check form-check-inline">'
var o=this.options[r]
"string"==typeof o?(t.match(this.state,o)?e+='<input type="radio" value="'+o+'" name="'+this.id+'" id="'+this.id+"-"+r+'" checked'+i+">":e+='<input type="radio" value="'+o+'" name="'+this.id+'" id="'+this.id+"-"+r+'"'+i+">",e+='<label for="'+this.id+"-"+r+'">'+o+"</label>"):(t.match(this.state,o)?e+='<input type="radio" value="'+o.id+'" name="'+this.id+'" id="'+this.id+"-"+r+'" checked'+i+">":e+='<input type="radio" value="'+o.id+'" name="'+this.id+'" id="'+this.id+"-"+r+'"'+i+">",e+='<label for="'+this.id+"-"+r+'">'+o.text+"</label>"),e+="</div>"}return t.build("div",e,this._style,this._attributes,this.id,this._classStyle)},i.prototype.componentDidMount=function(){var t=this
if(this.options&&this.options.length)for(var e=this,i=0;i<this.options.length;i++)!function(i){var n=document.getElementById(e.id+"-"+i)
if(!n)return"continue"
e._tooltip&&n.setAttribute("title",e._tooltip)
var r=e.options[i]
n.addEventListener("click",function(e){t.setState(r)})}(i)},i.prototype.componentDidUpdate=function(e,i){for(var n=-1,r=0;r<this.options.length;r++)if(t.match(this.state,this.options[r])){n=r
break}if(n>=0){var o=document.getElementById(this.id+"-"+n)
o&&o.setAttribute("checked","true")}},i}(t.WComponent)
t.WRadio=l
var u=function(e){function i(t,i,n,r,o,s){var a=e.call(this,t||"*","WSelect",null,r,o,s)||this
return a.rootTag="select",a.options=i,a.multiple=n,a}return __extends(i,e),i.prototype.getProps=function(){if(!this.root)return this.props
this.props=[]
var e=this.root.options
if(e&&e.length){var i=t.WUtil.toNumber(this.root.selectedIndex,-1)
i>=0&&e.length>i&&this.props.push(e[i].text)}return this.props},i.prototype.select=function(t){return this.root&&this.options?(this.setState(this.options.length>t?this.options[t]:null),this):this},i.prototype.addOption=function(t,e){if(!t)return this
if(this.options||(this.options=[]),this.options.push(t),!this.mounted)return this
var i=this.buildOptions()
return this.root.innerHTML=i,e&&this.updateState(t),this},i.prototype.remOption=function(t){if(!t||!this.options)return this
for(var e=-1,i=0;i<this.options.length;i++){var n=this.options[i]
if(n)if("string"==typeof t){if("string"==typeof n){if(n==t){e=i
break}}else if(n.id==t){e=i
break}}else if("string"==typeof n){if(n==t.id){e=i
break}}else if(n.id==t.id){e=i
break}}if(e>=0){if(this.options.splice(e,1),!this.mounted)return this
var r=this.buildOptions()
this.root.innerHTML=r}return this},i.prototype.setOptions=function(e,i){if(this.options=e,!this.mounted)return this
var n=this.root.value,r=this.buildOptions()
return this.root.innerHTML=r,i?this.root.value=n:e&&e.length&&("string"==typeof e[0]?this.trigger("statechange",e[0]):this.trigger("statechange",t.WUtil.getString(e[0],"id"))),this},i.prototype.updateState=function(t){e.prototype.updateState.call(this,t),this.root&&(null==this.state?this.root.value="":"string"==typeof this.state||"number"==typeof this.state?this.root.value=""+this.state:this.root.value=this.state.id)},i.prototype.render=function(){var t=this.buildOptions(),e='name="'+this.id+'"'
this.multiple&&(e+=' multiple="multiple"')
var i=""
return null==this._enabled||this._enabled||(i=" disabled"),e+=i,this.buildRoot("select",t,e)},i.prototype.componentDidMount=function(){var t=this
this._tooltip&&this.root.setAttribute("title",this._tooltip),this.state&&(this.root.value=this.state),this.root.addEventListener("change",function(){t.trigger("statechange",t.root.value)})},i.prototype.buildOptions=function(){var t=""
this.options||(this.options=[])
for(var e=0,i=this.options;e<i.length;e++){var n=i[e]
t+="string"==typeof n?"<option>"+n+"</option>":'<option value="'+n.id+'">'+n.text+"</option>"}return t},i}(t.WComponent)
t.WSelect=u
var d=function(e){function i(i,n,r,o,s,a,h){var l=e.call(this,i||"*","WTable",h,o,s,a)||this
if(l.selectedRow=-1,l.rootTag="table",l.header=n,r&&r.length)l.keys=r
else if(l.keys=[],l.header)for(var u=0;u<l.header.length;u++)l.keys.push(u)
return l.widths=[],l.selClass=t.CSS.SEL_ROW,l}return __extends(i,e),i.prototype.onSelectionChanged=function(t){this.handlers._selectionchanged||(this.handlers._selectionchanged=[]),this.handlers._selectionchanged.push(t)},i.prototype.onDoubleClick=function(t){this.handlers._doubleclick||(this.handlers._doubleclick=[]),this.handlers._doubleclick.push(t)},i.prototype.onRowPrepared=function(t){this.handlers._rowprepared||(this.handlers._rowprepared=[]),this.handlers._rowprepared.push(t)},i.prototype.clearSelection=function(){if(this.selectedRow=-1,!this.mounted)return this
var e=document.getElementById(this.id+"-b")
if(e&&this.selClass)for(var i=e.childNodes,n=0;n<e.childElementCount;n++)t.removeClassOf(i[n],this.selClass)
if(!this.handlers._selectionchanged)return this
for(var r=0,o=this.handlers._selectionchanged;r<o.length;r++){(0,o[r])({element:this.root,selectedRowsData:[]})}return this},i.prototype.select=function(e){if(e||(e=[]),this.selectedRow=e.length?e[0]:-1,!this.mounted)return this
var i=document.getElementById(this.id+"-b")
if(i&&this.selClass)for(var n=i.childNodes,r=0;r<i.childElementCount;r++)e.indexOf(r)>=0?t.addClassOf(n[r],this.selClass):t.removeClassOf(n[r],this.selClass)
if(!this.handlers._selectionchanged)return this
for(var o=[],s=0,a=e;s<a.length;s++){var h=a[s]
this.state&&this.state.length>h&&o.push(this.state[h])}for(var l=0,u=this.handlers._selectionchanged;l<u.length;l++){(0,u[l])({element:this.root,selectedRowsData:o})}return this},i.prototype.selectAll=function(e){if(!this.mounted)return this
if(e&&this.selectedRow>=0)return this.clearSelection()
this.selectedRow=-1,this.state&&this.state.length&&(this.selectedRow=0)
var i=document.getElementById(this.id+"-b")
if(i&&this.selClass)for(var n=i.childNodes,r=0;r<i.childElementCount;r++)t.addClassOf(n[r],this.selClass)
if(!this.handlers._selectionchanged)return this
for(var o=0,s=this.handlers._selectionchanged;o<s.length;o++){(0,s[o])({element:this.root,selectedRowsData:this.state})}return this},i.prototype.getSelectedRows=function(){return this.mounted?this.selectedRow<0?[]:[this.selectedRow]:[]},i.prototype.getSelectedRowsData=function(){return this.mounted?this.selectedRow<0?[]:this.state&&this.state.length?this.state.length<=this.selectedRow?[]:[this.state[this.selectedRow]]:[]:[]},i.prototype.render=function(){if(this.sortable&&this.sortable.length){this.soId=[],this.sortBy=[]
for(var e=0;e<this.sortable.length;e++)this.sortBy.push(0)}var i="table"
this._classStyle&&(i=this._classStyle.indexOf("table ")>=0?this._classStyle:i+" "+this._classStyle)
var n=this.style?' style="'+this.style+'"':"",r=""
this.div&&(r+='<div id="'+this.id+'-c" class="'+this.div+'">')
var o=this.selectionMode
if(o&&"none"!=o&&i.indexOf("table-hover")<0&&(i+=" table-hover"),r+='<table id="'+this.id+'" class="'+i+'"'+n+">",this.header&&this.header.length){var s=!1
if("string"==typeof this.headStyle?this.headStyle.indexOf("text-align")>0&&(s=!0):this.headStyle&&this.headStyle.a&&(s=!0),!this.hideHeader){r+=s?'<thead id="'+this.id+'-h"><tr>':'<thead id="'+this.id+'-h"><tr'+t.buildCss(this.headStyle)+">"
for(var a=-1,h=0,l=this.header;h<l.length;h++){var u=l[h]
a++
var d=void 0
d=0==a?this.col0Style?this.col0Style:this.colStyle:a==this.header.length-1?this.colLStyle?this.colLStyle:this.colStyle:s?this.headStyle:this.colStyle
var c=this.widths&&this.widths.length>a?this.widths[a]:0,f={}
c&&(f.w=this.widthsPerc?c+"%":c)
"w"==this.getType(a)&&(f.a="center")
if(this.sortable&&this.sortable.indexOf(a)>=0){var p=this.subId("sort_"+a)
this.soId.push(p),r+="<th"+t.buildCss(d,f)+'><a style="cursor:pointer;text-decoration:none !important;" id="'+p+'">'+u+' &nbsp;<i class="fa fa-unsorted"></i></a></th>'}else r+="<th"+t.buildCss(d,f)+">"+u+"</th>"}r+="</tr></thead>"}}return r+='<tbody id="'+this.id+'-b"></tbody>',r+="</table>",this.div&&(r+="</div>"),r},i.prototype.componentDidMount=function(){var e=this
if(this.buildBody(),this.soId)for(var i=0,n=this.soId;i<n.length;i++){var r=n[i]
!function(i){var n=document.getElementById(i)
n&&n.addEventListener("click",function(i){var r=t.lastSub(t.getId(i.currentTarget)),o=r.indexOf("_")
if(!(o<=0)){var s=t.WUtil.toNumber(r.substring(o+1),-1)
if(s>=0&&e.header&&e.header.length>s){var a=e.handlers._sort,h=!(a&&a.length)&&e.keys&&e.keys.length>s,l=e.header[s],u=e.sortBy[s]
if(u?1==u?(e.sortBy[s]=-1,l&&(n.innerHTML=l+' &nbsp;<i class="fa fa-sort-desc"></i>'),h&&e.setState(t.WUtil.sort(e.state,!1,e.keys[s]))):-1==u&&(e.sortBy[s]=0,l&&(n.innerHTML=l+' &nbsp;<i class="fa fa-unsorted"></i>')):(e.sortBy[s]=1,l&&(n.innerHTML=l+' &nbsp;<i class="fa fa-sort-asc"></i>'),h&&e.setState(t.WUtil.sort(e.state,!0,e.keys[s]))),a)for(var d=0,c=a;d<c.length;d++){var f=c[d]
f(e.createEvent("_sort",e.sortBy))}}}})}(r)}var o=document.getElementById(this.id+"-b")
o&&(o.addEventListener("click",function(i){if(e.selectionMode&&"none"!=e.selectionMode){var n=i.target
if(n){var r=n.closest("tr")
if(r){var o=t.WUtil.toNumber(t.lastSub(r),-1)
o<0||e.select([o])}}}}),o.addEventListener("dblclick",function(i){if(e.handlers._doubleclick){var n=i.target
if(n){var r=n.closest("tr")
if(r){var o=t.WUtil.toNumber(t.lastSub(r),-1)
if(!(o<0))for(var s=e.state&&e.state.length>o?e.state[o]:null,a=0,h=e.handlers._doubleclick;a<h.length;a++){var l=h[a]
l({element:e.root,rowElement:r,data:s,rowIndex:o})}}}}}))},i.prototype.componentDidUpdate=function(t,e){this.buildBody()},i.prototype.getType=function(t){return this.types?this.types.length<=t?"":this.types[t]:""},i.prototype.buildBody=function(){var e=document.getElementById(this.id+"-b")
if(e){if(!this.state||!this.state.length)return void(e.innerHTML="")
if(!this.keys||!this.keys.length)return void(e.innerHTML="")
for(var i=this.selectionMode&&"none"!=this.selectionMode?' style="cursor:pointer;"':"",n="",r=-1,o=0,s=this.state;o<s.length;o++){var a=s[o]
r++
var h=""
h=r==this.state.length-1&&this.footerStyle?"<tr"+t.buildCss(this.footerStyle)+' id="'+this.id+"-"+r+'"'+i+">":"<tr"+t.buildCss(this.rowStyle)+' id="'+this.id+"-"+r+'"'+i+">"
for(var l=-1,u=0,d=this.keys;u<d.length;u++){var c=d[u],f=a[c],p=""
null==f&&(f=""),l++
var g=this.getType(l)
switch(g){case"w":p="text-center"
break
case"c":case"c5":case"i":case"n":p="text-right"
break
case"b":f=f?"&check;":""
break
default:f instanceof Date&&(f=f.toLocaleDateString()),"boolean"==typeof f&&(f=f?"&check;":""),"number"==typeof f&&(p="text-right")}var b=void 0
b=0==l?this.col0Style?this.col0Style:this.colStyle:l==this.header.length-1&&this.colLStyle?this.colLStyle:this.colStyle,"string"==typeof b?b.indexOf("text-align")>0&&(p=""):b&&b.a&&(p="")
var m=this.widths&&this.widths.length>l?this.widths[l]:0
h+="<td"+t.buildCss(b,p,{w:m})+">"+f+"</td>"}if(this.header&&this.header.length>this.keys.length)for(var y=0;y<this.header.length-this.keys.length;y++)h+="<td"+t.buildCss(this.colStyle)+"></td>"
if(h+="</tr>",this.handlers._rowprepared){var g=document.createElement("template")
g.innerHTML=h
for(var v={element:this.root,rowElement:g.content.firstElementChild,data:a,rowIndex:r},w=0,x=this.handlers._rowprepared;w<x.length;w++){(0,x[w])(v)}h=g.innerHTML}n+=h}e.innerHTML=n}},i.prototype.onSort=function(t){this.handlers._sort||(this.handlers._sort=[]),this.handlers._sort.push(t)},i}(t.WComponent)
t.WTable=d
var c=function(e){function n(i,n,r){var o=e.call(this,i||"*","WFormPanel")||this
return o.rootTag="form",o._attributes=r?'role="form" name="'+o.id+'" action="'+r+'"':'role="form" name="'+o.id+'" action="javascript:void(0);"',o.title=n,t.CSS.FORM&&(t.CSS.FORM.indexOf(":")>0?o.style=t.CSS.FORM:o.classStyle=t.CSS.FORM),o.init(),o}return __extends(n,e),n.prototype.init=function(){return this.rows=[],this.roww=[],this.currRow=null,this.footer=[],this.addRow(),this},n.prototype.focus=function(){if(!this.mounted)return this
var t=this.first(!0)
return t&&(t.component?t.component.focus():t.element instanceof HTMLElement&&t.element.focus()),this},n.prototype.first=function(t){if(!this.rows)return null
for(var e=0,i=this.rows;e<i.length;e++)for(var n=i[e],r=0,o=n;r<o.length;r++){var s=o[r]
if(!t)return s
if((null==s.enabled||s.enabled)&&(null==s.readonly||!s.readonly))return s}return null},n.prototype.focusOn=function(t){if(!this.mounted)return this
var e=this.getField(t)
return e?(e.component?e.component.focus():e.element instanceof HTMLElement&&e.element.focus(),this):this},n.prototype.getField=function(t){if(t)for(var e=0==t.indexOf(this.id+"-")?t:this.subId(t),i=0;i<this.rows.length;i++)for(var n=this.rows[i],r=0;r<n.length;r++){var o=n[r]
if(o.id==e)return o}},n.prototype.addRow=function(e,i,n,r,o){return void 0===o&&(o="row"),this.currRow&&!this.currRow.length?(this.roww[this.roww.length-1]={classStyle:e,style:i,id:n,attributes:t.attributes(r),type:o},this):(this.currRow=[],this.rows.push(this.currRow),this.roww.push({classStyle:e,style:i,id:n,attributes:t.attributes(r),type:o}),this)},n.prototype.addTextField=function(e,i,n){var r=this.subId(e),s=new o(r,"text",0,t.CSS.FORM_CTRL)
return s.readonly=n,this.currRow.push({id:r,label:i,component:s,readonly:n,type:"text"}),this},n.prototype.addNoteField=function(e,i,n,r){n||(n=3)
var o=this.subId(e),a=new s(o,n,t.CSS.FORM_CTRL)
return a.readonly=r,this.currRow.push({id:o,label:i,component:a,readonly:r,type:"note"}),this},n.prototype.addDateField=function(e,i,n){var r=this.subId(e),s=new o(r,"date",0,t.CSS.FORM_CTRL)
return s.readonly=n,this.currRow.push({id:r,label:i,component:s,readonly:n,type:"date"}),this},n.prototype.addTimeField=function(e,i,n){var r=this.subId(e),s=new o(r,"time",0,t.CSS.FORM_CTRL)
return s.readonly=n,this.currRow.push({id:r,label:i,component:s,readonly:n,type:"time"}),this},n.prototype.addEmailField=function(e,i,n){var r=this.subId(e),s=new o(r,"email",0,t.CSS.FORM_CTRL)
return s.readonly=n,this.currRow.push({id:r,label:i,component:s,readonly:n,type:"email"}),this},n.prototype.addOptionsField=function(e,i,n,r,o){var s=this.subId(e),a=new u(s,n,!1,t.CSS.FORM_CTRL,"",r)
return a.enabled=!o,this.currRow.push({id:s,label:i,component:a,readonly:o,type:"select"}),this},n.prototype.addRadioField=function(e,i,n,r,o){var s=this.subId(e),a=new l(s,n,t.CSS.FORM_CTRL,t.CSS.CHECK_STYLE,r)
return a.enabled=!o,this.currRow.push({id:s,label:i,component:a,readonly:o,type:"select"}),this},n.prototype.addBooleanField=function(e,i,n){var r=this.subId(e),o=new h(r,"")
return o.divClass=t.CSS.FORM_CHECK,o.divStyle=t.CSS.CHECK_STYLE,o.classStyle=t.CSS.FORM_CTRL,o.label=n,this.currRow.push({id:r,label:i,component:o,type:"boolean"}),this},n.prototype.addBlankField=function(t,e,n){var r=new i("",e,n)
return this.currRow.push({id:"",label:t,component:r,classStyle:e,style:n,type:"blank"}),this},n.prototype.addInternalField=function(t,e){return void 0===e&&(e=null),this.currRow.push({id:this.subId(t),value:e,type:"internal"}),this},n.prototype.addComponent=function(t,e,i){return i?(t?(i.id=this.subId(t),this.currRow.push({id:this.subId(t),label:e,component:i,type:"component"})):(i.id="",this.currRow.push({id:"",label:e,component:i,type:"component"})),this):this},n.prototype.addToFooter=function(t){return t||this.footer?(this.footer.push(t),this):this},n.prototype.componentDidMount=function(){this.main=new i(this.id+"-c")
for(var e=0;e<this.rows.length;e++){var n=this.roww[e]
this.main.addRow(t.cls(n.type,n.classStyle,n.style),t.style(n.style))
for(var o=this.rows[e],s=0,a=0;a<o.length;a++){var l=o[a]
l.component&&(s+=l.span&&l.span>0?l.span:1)}for(var u=!!t.CSS.FORM_GROUP,a=0;a<o.length;a++){var l=o[a]
if(l.component){var d=Math.floor(12/s)
if(d<1&&(d=1),1==d&&s<11&&(0==a||a==s-1)&&(d=2),l.span&&l.span>0&&(d*=l.span),this.main.addCol(""+d),l.component.setState(l.value),l.component instanceof h){if(!this.checkboxStyle){var c=getComputedStyle(this.context).getPropertyValue("font-size"),f=Math.round(.8*parseInt(c));(isNaN(f)||f<18)&&(f=18),this.checkboxStyle="height:"+f+"px;"}l.component.style=this.checkboxStyle}if(l.label&&!l.labelComp){var p=new r(l.id+"-l",l.label,"",l.classStyle)
l.labelComp=p.for(l.id)}u?this.main.addGroup({classStyle:t.CSS.FORM_GROUP},l.labelComp,l.component):(this.main.add(l.labelComp),this.main.add(l.component))}}}if(this.footer&&this.footer.length){this.foot=new i(this.subId("__foot"),this.footerClass,this.footerStyle)
for(var g=0,b=this.footer;g<b.length;g++){var l=b[g]
this.foot.addRow().addCol("12").add(l,"push")}this.main.addRow().addCol("12").add(this.foot)}this.main.mount(this.root)},n.prototype.componentWillUnmount=function(){this.main||this.main.unmount()},n.prototype.clear=function(){for(var t=0;t<this.rows.length;t++)for(var e=this.rows[t],i=0;i<e.length;i++){var n=e[i]
n.component&&n.component.setState(null),n.value=null}return this},n.prototype.setValue=function(e,i,n){void 0===n&&(n=!0)
var r=this.getField(e)
return r?("date"==r.type&&(i=t.isoDate(i)),"time"==r.type&&(i=t.formatTime(i,!1)),r.component&&r.component.setState(i),r.value=i,n&&(this.state||(this.state={}),this.state[e]=i),this):this},n.prototype.getValue=function(t){var e="string"==typeof t?this.getField(t):t
return e?e.component?e.component.getState():e.value:null},n.prototype.getValues=function(){for(var t={},e=0;e<this.rows.length;e++)for(var i=this.rows[e],n=0;n<i.length;n++){var r=i[n]
t[this.ripId(r.id)]=r.component?r.component.getState():r.value}return t},n.prototype.getState=function(){return this.state=this.getValues(),this.state},n.prototype.updateState=function(i){e.prototype.updateState.call(this,i),!i||t.WUtil.isEmpty(i)?this.clear():this.updateView()},n.prototype.updateView=function(){if(!this.state)return void this.clear()
for(var t in this.state)this.setValue(t,this.state[t],!1)},n}(t.WComponent)
t.WFormPanel=c}(WUX||(WUX={}))
var WUX
!function(t){function e(t){var e=window.jQuery?window.jQuery:null
if(!e)return console.error("[WUX] jQuery is not available"),null
var i=e(t)
return i.length?i:(console.error("[WUX] !jQuery("+t+").length==true"),null)}t.JQ=e
var i=function(i){function n(e,n,r,o,s,a,h){void 0===n&&(n="WDialog"),void 0===r&&(r=!0),void 0===o&&(o=!0)
var l=i.call(this,e,n,void 0,s,a,h)||this
if(l.buttons=[],l.tagTitle="h5",o&&(r||(l.txtCancel=t.RES.CLOSE),l.buttonCancel()),r&&l.buttonOk(),l.ok=!1,l.cancel=!1,l.isShown=!1,l.id&&"*"!=l.id){var u=document.getElementById(l.id)
u&&u.remove()}return WuxDOM.onRender(function(t){l.mounted||l.mount(t.element)}),l}return __extends(n,i),n.prototype.makeUp=function(t,e,i){return this.title=t,this.body.addRow().addCol("12").add(e),i&&(this.hh=i),this},n.prototype.onShownModal=function(t){this.sh=t},n.prototype.onHiddenModal=function(t){this.hh=t},Object.defineProperty(n.prototype,"header",{get:function(){return this.cntHeader?this.cntHeader:(this.cntHeader=new t.WContainer("","modal-header"),this.cntHeader)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"body",{get:function(){return this.cntBody?this.cntBody:(this.cntBody=new t.WContainer("",t.cls("modal-body",this._classStyle),"",this._attributes),this.cntBody)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"footer",{get:function(){return this.cntFooter?this.cntFooter:(this.cntFooter=new t.WContainer("","modal-footer"),this.cntFooter)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"title",{get:function(){return this._title},set:function(e){var i=this
this._title=e
var n=document.getElementById(this.subId("title"))
n?n.innerText=e:(this.btnClose=new t.WButton(this.subId("bhc"),'<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>',void 0,"close","",'data-dismiss="modal"'),this.btnClose.on("click",function(t){i.close()}),this.header.add(this.buildTitle()).add(this.btnClose))},enumerable:!1,configurable:!0}),n.prototype.onClickOk=function(){return!0},n.prototype.onClickCancel=function(){return!0},n.prototype.buildBtnOK=function(){return new t.WButton(this.subId("bfo"),t.RES.OK,"","btn btn-primary button-sm","","")},n.prototype.buildBtnCancel=function(){return this.txtCancel?new t.WButton(this.subId("bfc"),this.txtCancel,"","btn btn-secondary button-sm","",""):new t.WButton(this.subId("bfc"),t.RES.CANCEL,"","btn btn-secondary button-sm","","")},n.prototype.buttonOk=function(){var t=this
if(this.btnOK)return this.btnOK
this.btnOK=this.buildBtnOK(),this.btnOK.on("click",function(e){t.onClickOk()&&(t.ok=!0,t.cancel=!1,t.$r&&t.$r.modal("hide"))}),this.buttons.push(this.btnOK)},n.prototype.buttonCancel=function(){var t=this
if(this.btnCancel)return this.btnCancel
this.btnCancel=this.buildBtnCancel(),this.btnCancel.on("click",function(e){t.onClickCancel()&&(t.ok=!1,t.cancel=!0,t.$r&&t.$r.modal("hide"))}),this.buttons.push(this.btnCancel)},n.prototype.show=function(t,e){this.beforeShow()&&(this.ok=!1,this.cancel=!1,this.parent=t,this.ph=e,this.mounted||WuxDOM.mount(this),this.$r&&(this.$r.modal({backdrop:"static",keyboard:!1,show:!1}),this.$r.modal("show")))},n.prototype.hide=function(){this.$r&&this.$r.modal("hide")},n.prototype.close=function(){this.ok=!1,this.cancel=!1,this.$r&&this.$r.modal("hide")},n.prototype.beforeShow=function(){return!0},n.prototype.onShown=function(){},n.prototype.onHidden=function(){},n.prototype.render=function(){this.isShown=!1,this.cntRoot=new t.WContainer(this.id,"modal inmodal fade","",'role="dialog" aria-hidden="true"'),this.cntMain=this.cntRoot.addContainer("","modal-dialog modal-lg",this._style),this.cntContent=this.cntMain.addContainer("","modal-content"),this.cntHeader&&this.cntContent.addContainer(this.cntHeader),this.cntBody&&this.cntContent.addContainer(this.cntBody)
for(var e=0,i=this.buttons;e<i.length;e++){var n=i[e]
this.footer.add(n)}return this.cntFooter&&this.cntContent.addContainer(this.cntFooter),this.cntRoot},n.prototype.componentDidMount=function(){var t=this
this.root&&(this.$r=e(this.root),this.$r&&(this.$r.on("shown.bs.modal",function(e){t.isShown=!0,t.onShown(),t.sh&&t.sh(e)}),this.$r.on("hidden.bs.modal",function(e){t.isShown=!1,t.onHidden(),t.hh&&t.hh(e),t.ph&&(t.ph(e),t.ph=null)})))},n.prototype.componentWillUnmount=function(){this.isShown=!1,this.btnClose&&this.btnClose.unmount(),this.btnCancel&&this.btnCancel.unmount(),this.cntFooter&&this.cntFooter.unmount(),this.cntBody&&this.cntBody.unmount(),this.cntHeader&&this.cntHeader.unmount(),this.cntContent&&this.cntContent.unmount(),this.cntMain&&this.cntMain.unmount(),this.cntRoot&&this.cntRoot.unmount()},n.prototype.buildTitle=function(){return this.tagTitle||(this.tagTitle="h3"),"<"+this.tagTitle+' class="modal-title" id="'+this.subId("title")+'">'+t.WUtil.toText(this._title)+"</"+this.tagTitle+">"},n}(t.WComponent)
t.WDialog=i
var n=function(i){function n(t,e,n,r,o){var s=i.call(this,t||"*","WTab",o,e,n,r)||this
return s.tabs=[],s}return __extends(n,i),n.prototype.addTab=function(e,i){var n=new t.WContainer("","panel-body")
return n.name=t.buildIcon(i,""," ")+e,this.tabs.push(n),n},n.prototype.render=function(){null==this.state&&(this.state=0)
var t="<div"
this._classStyle?t+=' class="tabs-container '+this._classStyle+'"':t+=' class="tabs-container"',t+=' id="'+this.id+'"',this._style&&(t+=' style="'+this._style+'"'),this.attributes&&(t+=" "+this.attributes),t+=">",t+='<ul class="nav nav-tabs auto" role="tablist">'
for(var e=0;e<this.tabs.length;e++){var i=this.tabs[e]
e==this.state?t+='<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#'+this.id+"-"+e+'"> '+i.name+"</a></li>":t+='<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#'+this.id+"-"+e+'"> '+i.name+"</a></li>"}t+="</ul>",t+='<div class="tab-content">'
for(var e=0;e<this.tabs.length;e++)e==this.state?t+='<div id="'+this.id+"-"+e+'" class="tab-pane active"></div>':t+='<div id="'+this.id+"-"+e+'" class="tab-pane"></div>'
return t+="</div></div>"},n.prototype.componentDidUpdate=function(t,i){var n=e('.nav-tabs a[href="#'+this.id+"-"+this.state+'"]')
n&&n.tab("show")},n.prototype.componentDidMount=function(){var t=this
if(this.tabs.length){for(var i=0;i<this.tabs.length;i++){var n=this.tabs[i],r=document.getElementById(this.id+"-"+i)
r&&n.mount(r)}var o=e(this.root)
o&&o.find('a[data-toggle="tab"]').on("shown.bs.tab",function(e){var i=e.target,n=""
if(i instanceof Element&&(n=i.getAttribute("href")),n){var r=n.lastIndexOf("-")
r>=0&&t.setState(parseInt(n.substring(r+1)))}})}},n.prototype.componentWillUnmount=function(){for(var t=0,e=this.tabs;t<e.length;t++){var i=e[t]
i&&i.unmount()}},n}(t.WComponent)
t.WTab=n
var r=function(e){function i(t,i,n,r){var o=e.call(this,t||"*","WCalendar",1,i,n,r)||this
return o.am=[],o.mt={},o.pm="Mese precedente",o.nm="Mese successivo",o.ct="table table-sm",o.cd="table-responsive",o.sp="padding:1rem;text-align:center;font-weight:bold;background-color:#eeeeee;",o.sm=o.sp,o.sn=o.sp,o.tr="height:3rem;",o.sw="text-align:center;",o.sd="text-align:center;vertical-align:middle;",o.so="text-align:center;vertical-align:middle;background-color:#f6f6f6;cursor:pointer;",o.ss="text-align:center;vertical-align:middle;background-color:#b8d4f1;",o.sk="text-align:center;vertical-align:middle;background-color:#e6d3b8;",o.se="background-color:#f0f0f0;",o.st="font-weight:bold;",o.td=o.str(new Date),o}return __extends(i,e),i.prototype.onDoubleClick=function(t){this.handlers._doubleclick||(this.handlers._doubleclick=[]),this.handlers._doubleclick.push(t)},i.prototype.updateState=function(t){this.state=t,this.state||(this.state=new Date)
var e=this.state.getDate(),i=this.state.getMonth(),n=this.state.getFullYear()
this.ls=1e4*n+100*(i+1)+e+""},i.prototype.render=function(){this.state||(this.state=new Date)
for(var e='<table id="'+this.subId("t")+'" class="'+this.ct+'"><thead><tr>',i=0;i<7;i++){var n=6==i?0:i+1
e+='<th id="'+this.subId(n+"")+'" style="'+this.sw+'">'+t.formatDay(n,!1)+"</th>"}e+='</tr></thead><tbody id="'+this.subId("b")+'">',e+=this.body(),e+="</tbody></table>"
var r=this.state.getMonth(),o=this.state.getFullYear(),s=100*o+r+1,a='<a id="'+this.subId("p")+'" title="'+this.pm+'"><i class="fa fa-arrow-circle-left"></i></a>',h='<a id="'+this.subId("n")+'" title="'+this.nm+'"><i class="fa fa-arrow-circle-right"></i></a>',l='<div class="row"><div class="col-2" style="'+this.sp+'">'+a+'</div><div id="'+this.subId("m")+'" class="col-8" style="'+this.sm+'">'+t.formatMonth(s,!0,!0)+'</div><div class="col-2" style="'+this.sn+'">'+h+"</div></div>"
return this.cd?l+='<div class="row"><div class="'+this.cd+'">'+e+"</div></div>":l+='<div class="row"><div class="col-12">'+e+"</div></div>",this.buildRoot(this.rootTag,l)},i.prototype.add=function(e){this.state||(this.state=new Date)
var i=this.state.getDate(),n=this.state.getMonth(),r=this.state.getFullYear(),o=n+e,s=new Date(r,o,i),a=s.getMonth()
a!=o&&(s=new Date(r,o+1,0),a=s.getMonth())
var h=s.getFullYear()
if(this.setState(s),this.eb&&(this.eb.innerHTML=this.body()),this.em){var l=100*h+a+1
this.em.innerText=t.formatMonth(l,!0,!0)}return s},i.prototype.mark=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i]
if(!e||!e.length)return this
for(var n=0,r=e;n<r.length;n++){var o=r[n],s=t.WUtil.toDate(o)
if(s){var a=this.str(s)
if(this.am.push(a),a!=this.ls){var h=document.getElementById(this.subId(a))
h&&h.setAttribute("style",this.sk)}}}return this},i.prototype.unmark=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i]
if(!e||!e.length)return this
for(var n=0,r=e;n<r.length;n++){var o=r[n],s=t.WUtil.toDate(o)
if(s){var a=this.str(s)
this.unm(this.am.indexOf(a))}}return this},i.prototype.title=function(e,i){var n=t.WUtil.toDate(e)
if(!n)return this
var r=this.str(n)
this.mt[r]=i
var o=document.getElementById(this.subId(r))
return o&&o.setAttribute("title",i),this},i.prototype.unm=function(t,e){if(void 0===e&&(e=!0),!(t<0)){var i=this.am[t]
if(i){e&&this.am.splice(t,1)
var n=document.getElementById(this.subId(i))
if(n){this.str(this.state)==i?n.setAttribute("style",this.ss):n.setAttribute("style",this.sd)}}}},i.prototype.clear=function(){if(this.am&&this.am.length){for(var t=0;t<this.am.length;t++)this.unm(t,!1)
this.am=[]}if(this.mt){for(var e in this.mt){var i=document.getElementById(this.subId(e))
i&&i.setAttribute("title",null)}this.mt={}}return this},i.prototype.prev=function(){return this.add(-1)},i.prototype.next=function(){return this.add(1)},i.prototype.ele=function(t){return t?document.getElementById(this.subId(this.str(t))):null},i.prototype.str=function(t){return t?1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate()+"":null},i.prototype.from=function(){this.state||(this.state=new Date)
var t=this.state.getMonth()
return 1e4*this.state.getFullYear()+100*(t+1)+1+""},i.prototype.to=function(){this.state||(this.state=new Date)
var t=this.state.getMonth(),e=this.state.getFullYear()
return 1e4*e+100*(t+1)+new Date(e,t+1,0).getDate()+""},i.prototype.body=function(){this.state||(this.state=new Date)
var t="",e=this.state.getDate(),i=this.state.getMonth(),n=this.state.getFullYear()
this.ls=1e4*n+100*(i+1)+e+""
var r=new Date(n,i,1),o=r.getDay()
0==o&&(o=7)
for(var s=new Date(n,i+1,0),a=s.getDate(),h=1,l=1;l<=6;l++){this.tr?t+='<tr style="'+this.tr+'">':t+="<tr>"
for(var u=1;u<=7;u++)if(1==l&&u<o)t+='<td style="'+this.se+'"></td>'
else if(h>a)t+='<td style="'+this.se+'"></td>'
else{var d=1e4*n+100*(i+1)+h+"",c=d==this.td?this.st:"",f=this.mt[d]
f=f?' title="'+f+'"':"",d==this.ls?t+='<td id="'+this.subId(d)+'" style="'+this.ss+c+'"'+f+">"+h+"</td>":this.am.indexOf(d)>=0?t+='<td id="'+this.subId(d)+'" style="'+this.sk+c+'"'+f+">"+h+"</td>":t+='<td id="'+this.subId(d)+'" style="'+this.sd+c+'"'+f+">"+h+"</td>",h++}if(t+="</tr>",h>a)break}return t},i.prototype.componentDidMount=function(){var e=this
this.ep=document.getElementById(this.subId("p")),this.em=document.getElementById(this.subId("m")),this.en=document.getElementById(this.subId("n")),this.et=document.getElementById(this.subId("t")),this.eb=document.getElementById(this.subId("b")),this.ep&&this.ep.addEventListener("click",function(t){e.prev()}),this.en&&this.en.addEventListener("click",function(t){e.next()}),this.root.addEventListener("click",function(i){var n=t.lastSub(i.target)
if(n&&8==n.length){var r=parseInt(n),o=n==e.td?e.st:"",s=e.ele(e.state)
if(s){var a=e.str(e.state),h=a==e.td?e.st:""
e.am.indexOf(a)>=0?s.setAttribute("style",e.sk+h):s.setAttribute("style",e.sd+h)}if(i.target.style=e.ss+o,e.ls==n)return
e.setState(new Date(r/1e4,r%1e4/100-1,r%1e4%100))}}),this.root.addEventListener("dblclick",function(i){var n=t.lastSub(i.target)
n&&8==n.length&&e.trigger("_doubleclick",n)}),this.root.addEventListener("mouseover",function(i){var n=t.lastSub(i.target)
if(n&&8==n.length){var r=n==e.td?e.st:""
i.target.style=e.so+r}}),this.root.addEventListener("mouseout",function(i){var n=t.lastSub(i.target)
if(n&&8==n.length){var r=n==e.td?e.st:""
n==e.str(e.state)?i.target.style=e.ss+r:e.am.indexOf(n)>=0?i.target.style=e.sk+r:i.target.style=e.sd+r}})},i}(t.WComponent)
t.WCalendar=r
var o=function(t){function e(e,i,n,r){var o=t.call(this,e||"*","WChart",i,n,r)||this
o.rootTag="canvas",o.forceOnChange=!0
var s=window.innerWidth
return o._w=750,o._h=370,(s<900||s>1920)&&(o._w=Math.round(750*s/1400),o._h=Math.round(370*o._w/750)),o._attributes='width="'+o._w+'" height="'+o._h+'"',o.fontSize=14,o.fontName="Arial",o.axis="#808080",o.grid="#a0a0a0",o.line="#e23222",o.offx=30,o.offy=30,o.barw=16,o}return __extends(e,t),e.prototype.size=function(t,e){return this._w=t,this._h=e,this._w<40&&(this._w=40),this._h<40&&(this._h=40),this._attributes='width="'+this._w+'" height="'+this._h+'"',this},Object.defineProperty(e.prototype,"width",{get:function(){return this._w},set:function(t){this._w=t,this._w<40&&(this._w=40),this._attributes='width="'+this._w+'" height="'+this._h+'"'},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._h},set:function(t){this._h=t,this._h<40&&(this._h=40),this._attributes='width="'+this._w+'" height="'+this._h+'"'},enumerable:!1,configurable:!0}),e.prototype.componentDidMount=function(){if(this.state){var t=this.state.series
if(t&&t.length){var e=t[0]
if(e&&!(e.length<2)){var i=this.state.styles,n=this.root,r=n.getContext("2d")
if(r){var o=this.state.labels,s=0,a=0,h=!1
if(o&&o.length==e.length){var l=o[0],u=l?l.length:0,d=u>4?Math.ceil(u/2):2
s=this.fontSize*d+4,a=2*this.fontSize+4,h=!0}var c=n.width-this.offx-a,f=n.height-this.offy-s,p=c/(e.length-1),g=Math.max.apply(Math,e)
g||(g=4),this.maxy&&this.maxy>g&&(g=this.maxy)
var b=[Math.round(g/4),Math.round(g/2),Math.round(3*g/4)],m=f/g
r.beginPath(),r.lineWidth=1,r.strokeStyle=this.axis,r.moveTo(this.offx,this.offy),r.lineTo(this.offx,n.height-s),r.lineTo(n.width-a,n.height-s),r.stroke(),r.beginPath(),r.setLineDash([4,8]),r.lineWidth=1,r.strokeStyle=this.grid
for(var y=1;y<e.length;y++){var v=this.offx+y*p
r.moveTo(v,this.offy),r.lineTo(v,n.height-s)}r.moveTo(this.offx,this.offy),r.lineTo(n.width-a,this.offy)
for(var w=0,x=b;w<x.length;w++){var _=x[w]
r.moveTo(this.offx,n.height-s-_*m),r.lineTo(n.width-a,n.height-s-_*m)}r.stroke(),r.fillStyle=this.axis,r.font=this.fontSize+"px "+this.fontName,r.fillText("0",0,n.height-s)
for(var S=0,C=b;S<C.length;S++){var _=C[S]
r.fillText(""+_,0,n.height-s-_*m)}if(r.fillText(""+g,0,this.offy),h)for(var y=0;y<o.length;y++){var v=this.offx+y*p
r.save(),r.translate(v-this.fontSize,n.height),r.rotate(-Math.PI/3),r.fillStyle=this.axis,r.fillText(o[y],0,0),r.restore()}var O=this.props
if(O||(O=this.state.type),O||(O="line"),"bar"!=O){r.setLineDash([])
for(var D=0;D<t.length;D++){var M=t[D]
if(!M||M.length<e.length)return
var W=this.line
i&&i.length>D&&((W=i[D])||(W=this.line)),r.beginPath(),r.lineWidth=2,r.strokeStyle=W,r.moveTo(this.offx,n.height-s-M[0]*m)
for(var y=1;y<e.length;y++){var v=this.offx+y*p,I=n.height-s-M[y]*m
r.lineTo(v,I)}r.stroke()}}else{this.barw<4&&(this.barw=4)
for(var D=0;D<t.length;D++){var M=t[D]
if(!M||M.length<e.length)return
var W=this.line
i&&i.length>D&&((W=i[D])||(W=this.line)),r.fillStyle=W
for(var k=D*(this.barw+1),y=0;y<e.length;y++){var v=this.offx+y*p,I=n.height-s-M[y]*m
0==y?r.fillRect(v+k,I,this.barw,M[y]*m):t.length<3?r.fillRect(v+k-this.barw/2,I,this.barw,M[y]*m):r.fillRect(v+k-this.barw/2-(this.barw+1)*(t.length-2),I,this.barw,M[y]*m)}}}}}}}},e}(t.WComponent)
t.WChart=o}(WUX||(WUX={}))
var APP
!function(n){var t=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype.render=function(){return"<div>Hello World.</div>"},t}(WUX.WComponent)
n.Main=t}(APP||(APP={}))
