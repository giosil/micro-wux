var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var wuxRegistry = {};
function wuxRegister(node, c) {
    if (!node)
        return;
    var id;
    if (typeof node == 'string') {
        id = node.indexOf('#') == 0 ? node.substring(1) : node;
    }
    else {
        id = node.id;
    }
    if (!c)
        return wuxRegistry[id];
    if (typeof c == 'string') {
        var r = wuxRegistry[id];
        if (r)
            delete wuxRegistry[id];
        return r;
    }
    wuxRegistry[id] = c;
    return c;
}
var WuxDOM = (function () {
    function WuxDOM() {
    }
    WuxDOM.onRender = function (handler) {
        WuxDOM.onRenderHandlers.push(handler);
    };
    WuxDOM.onUnmount = function (handler) {
        WuxDOM.onUnmountHandlers.push(handler);
    };
    WuxDOM.render = function (component, node, before, after) {
        if (WUX.debug)
            console.log('WuxDOM.render ' + WUX.str(component) + ' on ' + WUX.str(node) + '...');
        WUX.global.init(function () {
            if (!node)
                node = WuxDOM.lastCtx ? WuxDOM.lastCtx : document.getElementById('view-root');
            if (before)
                before(node);
            var context = WuxDOM.mount(component, node);
            WuxDOM.lastCtx = context;
            if (after)
                after(node);
            if (WuxDOM.onRenderHandlers.length > 0) {
                var c = component instanceof WUX.WComponent ? component : null;
                var e = { component: c, element: context, target: context.firstChild, type: 'render' };
                for (var _i = 0, _a = WuxDOM.onRenderHandlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler(e);
                }
                WuxDOM.onRenderHandlers = [];
            }
        });
    };
    WuxDOM.mount = function (e, node) {
        if (!node)
            node = WuxDOM.lastCtx ? WuxDOM.lastCtx : document.getElementById('view-root');
        if (WUX.debug)
            console.log('WuxDOM.mount ' + WUX.str(e) + ' on ' + WUX.str(node) + '...');
        if (e == null) {
            console.error('WuxDOM.mount ' + WUX.str(e) + ' on ' + WUX.str(node) + ' -> invalid component');
            return;
        }
        var ctx = typeof node == 'string' ? (node.indexOf('#') == 0) ? document.getElementById(node.substring(1)) : document.getElementById(node) : node;
        if (!ctx) {
            console.error('WuxDOM.mount ' + WUX.str(e) + ' on ' + WUX.str(node) + ' -> context unavailable');
            return;
        }
        WuxDOM.lastCtx = ctx;
        if (e instanceof WUX.WComponent) {
            e.mount(ctx);
            wuxRegister(ctx, e);
        }
        else if (e instanceof Element) {
            ctx.append(e);
        }
        else {
            var p = ctx.innerHTML;
            if (!p)
                p = '';
            ctx.innerHTML = p + e;
        }
        if (WUX.debug)
            console.log('WuxDOM.mount ' + WUX.str(e) + ' on ' + WUX.str(node) + ' completed.');
        return ctx;
    };
    ;
    WuxDOM.unmount = function (node) {
        if (!node)
            node = WuxDOM.lastCtx ? WuxDOM.lastCtx : document.getElementById('view-root');
        if (WUX.debug)
            console.log('WuxDOM.unmount ' + WUX.str(node) + '...');
        var ctx = typeof node == 'string' ? (node.indexOf('#') == 0) ? document.getElementById(node.substring(1)) : document.getElementById(node) : node;
        if (!ctx) {
            console.error('WuxDOM.unmount ' + WUX.str(node) + ' -> node unavailable');
            return;
        }
        var wcomp = wuxRegister(ctx, 'delete');
        if (wcomp)
            wcomp.unmount();
        ctx.remove();
        if (WUX.debug)
            console.log('WuxDOM.unmount ' + WUX.str(node) + ' completed.');
        if (WuxDOM.onUnmountHandlers.length > 0) {
            var e = { component: wcomp, element: ctx, target: ctx.firstChild, type: 'unmount' };
            for (var _i = 0, _a = WuxDOM.onUnmountHandlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler(e);
            }
            WuxDOM.onUnmountHandlers = [];
        }
        return ctx;
    };
    WuxDOM.replace = function (o, e) {
        var node;
        if (!e) {
            e = o;
            o = undefined;
        }
        if (!o) {
            node = WuxDOM.unmount();
        }
        else if (typeof o == 'string') {
            var wcomp = WUX.getComponent(o);
            if (!wcomp) {
                node = wcomp.getContext();
                wcomp.unmount();
            }
        }
        else if (o instanceof WUX.WComponent) {
            node = o.getContext();
            o.unmount();
        }
        else {
            node = o.parentElement;
            if (node)
                node.innerHTML = '';
        }
        if (!node)
            node = document.getElementById('#view-root');
        if (!node) {
            console.error('WuxDOM.replace ' + WUX.str(node) + ' -> node unavailable');
            return;
        }
        return WuxDOM.mount(e, node);
    };
    WuxDOM.onRenderHandlers = [];
    WuxDOM.onUnmountHandlers = [];
    return WuxDOM;
}());
var WUX;
(function (WUX) {
    WUX.debug = false;
    WUX.registry = [];
    WUX.version = '1.0.0';
    var WComponent = (function () {
        function WComponent(id, name, props, classStyle, style, attributes) {
            this.mounted = false;
            this.debug = WUX.debug;
            this.forceOnChange = false;
            this.rootTag = 'div';
            this.subSeq = 0;
            this.dontTrigger = false;
            this._visible = true;
            this._enabled = true;
            this.handlers = {};
            this.cuid = Math.floor(Math.random() * 1000000000);
            if (id instanceof Element) {
                this.root = id;
                if (this.root)
                    this.mounted = true;
                if (this.debug)
                    console.log('[' + str(this) + '] new wrapper root=' + str(this.root));
            }
            else {
                if (typeof id == 'string')
                    this.id = id == '*' ? 'w' + this.cuid : id;
                this.name = name ? name : 'WComponent';
                this._classStyle = classStyle;
                var cls_1 = WUX.cls(style);
                if (cls_1)
                    this._classStyle = this._classStyle ? this._classStyle + ' ' + cls_1 : cls_1;
                this._style = WUX.style(style);
                this._attributes = WUX.attributes(attributes);
                if (this.debug)
                    console.log('[' + str(this) + '] new');
                if (this.debug)
                    console.log('[' + str(this) + '] updateProps', props);
                this.updateProps(props);
            }
        }
        Object.defineProperty(WComponent.prototype, "visible", {
            get: function () {
                if (this.internal)
                    return this.internal.visible;
                return this._visible;
            },
            set: function (b) {
                this._visible = b;
                if (this.internal)
                    this.internal.visible = b;
                if (this.root instanceof HTMLElement) {
                    if (this._visible)
                        this.root.style.display = "block";
                    else
                        this.root.style.display = "none";
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WComponent.prototype, "enabled", {
            get: function () {
                if (this.internal)
                    return this.internal.enabled;
                return this._enabled;
            },
            set: function (b) {
                this._enabled = b;
                if (this.internal)
                    this.internal.enabled = b;
                if (this.root) {
                    if (this._enabled) {
                        this.root.removeAttribute('disabled');
                    }
                    else {
                        this.root.setAttribute('disabled', '');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WComponent.prototype, "style", {
            get: function () {
                if (this.internal)
                    return this.internal.style;
                return this._style;
            },
            set: function (s) {
                this._style = WUX.css(this._baseStyle, s);
                if (this.internal)
                    this.internal.style = s;
                if (this.root)
                    this.root.setAttribute('style', this._style);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WComponent.prototype, "classStyle", {
            get: function () {
                if (this.internal)
                    return this.internal.classStyle;
                return this._classStyle;
            },
            set: function (s) {
                if (this.internal)
                    this.internal.classStyle = s;
                var remove = false;
                var toggle = false;
                if (s && s.length > 1 && s.charAt(0) == '!') {
                    s = s.substring(1);
                    remove = true;
                }
                else if (s && s.length > 1 && s.charAt(0) == '?') {
                    s = s.substring(1);
                    toggle = true;
                }
                if (remove) {
                    this._classStyle = WUX.removeClass(this._classStyle, s);
                }
                else if (toggle) {
                    this._classStyle = WUX.toggleClass(this._classStyle, s);
                }
                else {
                    this._classStyle = WUX.cls(this._baseClass, s);
                }
                if (this.root) {
                    if (remove) {
                        removeClassOf(this.root, s);
                    }
                    else if (toggle) {
                        toggleClassOf(this.root, s);
                    }
                    else {
                        this.root.setAttribute('class', this._classStyle);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WComponent.prototype, "attributes", {
            get: function () {
                if (this.internal)
                    return this.internal.attributes;
                return this._attributes;
            },
            set: function (s) {
                this._attributes = s;
                if (this.internal)
                    this.internal.attributes = s;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WComponent.prototype, "tooltip", {
            get: function () {
                if (this.internal)
                    return this.internal.tooltip;
                return this._tooltip;
            },
            set: function (s) {
                this._tooltip = s;
                if (this.internal)
                    this.internal.tooltip = s;
                if (this.root)
                    this.root.setAttribute('title', this._tooltip);
            },
            enumerable: false,
            configurable: true
        });
        WComponent.prototype.css = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            if (!items || items.length == 0)
                return this;
            var c = cls.apply(void 0, items);
            if (c)
                this.classStyle = c;
            var s = css.apply(void 0, items);
            if (s)
                this.style = s;
            return this;
        };
        WComponent.prototype.focus = function () {
            if (this.internal)
                this.internal.focus();
            if (this.root instanceof HTMLElement)
                this.root.focus();
            return this;
        };
        WComponent.prototype.blur = function () {
            if (this.internal)
                this.internal.blur();
            if (this.root instanceof HTMLElement)
                this.root.blur();
            return this;
        };
        WComponent.prototype.forceUpdate = function (callback) {
            this.update(this.props, this.state, false, false, true, callback);
            return this;
        };
        WComponent.prototype.getContext = function () {
            return this.context;
        };
        WComponent.prototype.getRoot = function () {
            if (!this.root && this.internal)
                return this.internal.getRoot();
            if (!this.root) {
                if (this.id) {
                    var he = document.getElementById(this.id);
                    if (he)
                        return he;
                }
                return this.context;
            }
            return this.root;
        };
        WComponent.prototype.getState = function () {
            return this.state;
        };
        WComponent.prototype.setState = function (nextState, force, callback) {
            if (this.debug)
                console.log('[' + str(this) + '] setState', nextState);
            this.update(this.props, nextState, false, true, this.forceOnChange || force, callback);
            return this;
        };
        WComponent.prototype.getProps = function () {
            return this.props;
        };
        WComponent.prototype.setProps = function (nextProps, force, callback) {
            if (this.debug)
                console.log('[' + str(this) + '] setProps', nextProps);
            this.update(nextProps, this.state, true, false, this.forceOnChange || force, callback);
            return this;
        };
        WComponent.prototype.on = function (events, handler) {
            if (!events)
                return this;
            var arrayEvents = events.split(' ');
            for (var _i = 0, arrayEvents_1 = arrayEvents; _i < arrayEvents_1.length; _i++) {
                var event_1 = arrayEvents_1[_i];
                if (!this.handlers[event_1])
                    this.handlers[event_1] = [];
                this.handlers[event_1].push(handler);
            }
            if (this.internal)
                this.internal.on(events, handler);
            if (this.root)
                this.root.addEventListener(events, handler);
            return this;
        };
        WComponent.prototype.off = function (events) {
            if (!events) {
                this.handlers = {};
            }
            else {
                var arrayEvents = events.split(' ');
                for (var _i = 0, arrayEvents_2 = arrayEvents; _i < arrayEvents_2.length; _i++) {
                    var event_2 = arrayEvents_2[_i];
                    if (this.root) {
                        var hs = this.handlers[event_2];
                        for (var _a = 0, hs_1 = hs; _a < hs_1.length; _a++) {
                            var h = hs_1[_a];
                            this.root.removeEventListener(event_2, h);
                        }
                    }
                    delete this.handlers[event_2];
                }
            }
            if (this.internal)
                this.internal.off(events);
            return this;
        };
        WComponent.prototype.trigger = function (eventType) {
            var _a;
            var extParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                extParams[_i - 1] = arguments[_i];
            }
            if (this.debug)
                console.log('[' + str(this) + '] trigger', eventType, extParams);
            if (!eventType)
                return;
            var ep0 = extParams && extParams.length > 0 ? extParams[0] : undefined;
            if (eventType.charAt(0) == '_' || eventType == 'mount' || eventType == 'unmount' || eventType == 'statechange' || eventType == 'propschange') {
                if (ep0 !== undefined) {
                    if (eventType == 'statechange') {
                        if (this.state != extParams[0]) {
                            this.state = extParams[0];
                            if (this.debug)
                                console.log('[' + str(this) + '] trigger set state', this.state);
                        }
                    }
                    else if (eventType == 'propschange') {
                        if (this.props != extParams[0]) {
                            this.props = extParams[0];
                            if (this.debug)
                                console.log('[' + str(this) + '] trigger set props', this.props);
                        }
                    }
                }
                if (!this.handlers || !this.handlers[eventType])
                    return this;
                var event_3 = this.createEvent(eventType, ep0);
                for (var _b = 0, _c = this.handlers[eventType]; _b < _c.length; _b++) {
                    var handler = _c[_b];
                    handler(event_3);
                }
            }
            else if (this.root) {
                if (this.debug)
                    console.log('[' + str(this) + '] trigger ' + eventType + ' on root=' + str(this.root));
                var he = new Event(eventType);
                he = __assign(__assign({}, he), extParams);
                this.root.dispatchEvent(he);
            }
            if (this.internal) {
                if (this.debug)
                    console.log('[' + str(this) + '] trigger ' + eventType + ' on internal=' + str(this.internal));
                (_a = this.internal).trigger.apply(_a, __spreadArray([eventType], extParams, false));
            }
            return this;
        };
        WComponent.prototype.unmount = function () {
            if (this.debug)
                console.log('[' + str(this) + '] unmount ctx=' + str(this.context) + ' root=' + str(this.root), this.state, this.props);
            this.componentWillUnmount();
            if (this.internal)
                this.internal.unmount();
            this.internal = undefined;
            if (this.root) {
                this.root.remove();
            }
            this.root = undefined;
            if (this.id) {
                var idx = WUX.registry.indexOf(this.id);
                if (idx >= 0)
                    WUX.registry.splice(idx, 1);
            }
            this.mounted = false;
            wuxRegister(this.id, 'delete');
            this.trigger('unmount');
            return this;
        };
        WComponent.prototype.mount = function (context) {
            if (this.debug)
                console.log('[' + str(this) + '] mount ctx=' + str(context) + ' root=' + str(this.root), this.state, this.props);
            if (!this.id) {
                if (this.root) {
                    this.id = this.root.id;
                }
            }
            if (context) {
                this.context = context;
            }
            if (!this.context) {
                if (this.root) {
                    this.context = this.root.parentElement;
                    if (!this.context)
                        this.context = this.root;
                }
            }
            try {
                if (this.mounted)
                    this.unmount();
                this.mounted = false;
                if (!(this.context)) {
                    var he = document.getElementById(this.id);
                    if (he)
                        this.context = he;
                }
                if (this.debug)
                    console.log('[' + str(this) + '] componentWillMount ctx=' + str(context) + ' root=' + str(this.root));
                this.componentWillMount();
                if (this.context) {
                    if (this.debug)
                        console.log('[' + str(this) + '] render ctx=' + str(context) + ' root=' + str(this.root));
                    var r = this.render();
                    if (r !== undefined && r !== null) {
                        if (r instanceof WComponent) {
                            if (this.debug)
                                console.log('[' + str(this) + '] render -> ' + str(r));
                            this.internal = r;
                            if (!r.parent)
                                r.parent = this;
                            r.mount(this.context);
                            if (!this.root) {
                                if (this.id) {
                                    var he = document.getElementById(this.id);
                                    this.root = he ? he : this.internal.getRoot();
                                }
                                else {
                                    this.root = this.context;
                                }
                            }
                        }
                        else if (r instanceof Element) {
                            this.context.append(r);
                            if (!this.root)
                                this.root = r;
                        }
                        else {
                            var p = this.context.innerHTML;
                            if (!p)
                                p = '';
                            this.context.innerHTML = p + r;
                            var lc = this.context.lastChild;
                            if (lc instanceof Element) {
                                this.root = lc;
                            }
                            if (!this.root)
                                this.root = this.id ? document.getElementById(this.id) : this.context;
                        }
                    }
                    else {
                        if (this.internal)
                            this.internal.mount(this.context);
                        if (!this.root)
                            this.root = this.id ? document.getElementById(this.id) : this.context;
                    }
                }
                if (!this._visible) {
                    if (this.internal) {
                        this.internal.visible = false;
                    }
                    else {
                        if (this.root instanceof HTMLElement)
                            this.root.style.display = 'none';
                    }
                }
                if (!this._enabled) {
                    if (this.internal) {
                        this.internal.enabled = false;
                    }
                    else {
                        this.root.setAttribute('disabled', '');
                    }
                }
                if (this.debug)
                    console.log('[' + str(this) + '] componentDidMount ctx=' + str(context) + ' root=' + str(this.root));
                this.componentDidMount();
                if (this.root) {
                    for (var event_4 in this.handlers) {
                        if (!event_4 || event_4.charAt(0) == '_')
                            continue;
                        if (event_4 == 'mount' || event_4 == 'unmount' || event_4 == 'statechange' || event_4 == 'propschange')
                            continue;
                        for (var _i = 0, _a = this.handlers[event_4]; _i < _a.length; _i++) {
                            var handler = _a[_i];
                            this.root.addEventListener(event_4, handler);
                        }
                    }
                }
                wuxRegister(this.root, this);
                this.mounted = true;
                if (this.id) {
                    if (!this.internal || this.internal.id != this.id) {
                        var idx = WUX.registry.indexOf(this.id);
                        if (idx >= 0) {
                            var wci = WUX.getComponent(this.id);
                            if (wci && wci.cuid != this.cuid) {
                                console.error('[' + str(this) + '] id already used by ' + str(wci));
                            }
                        }
                        else {
                            WUX.registry.push(this.id);
                        }
                    }
                }
                this.trigger('mount');
            }
            catch (e) {
                var errorInfo = str(this) + ' ' + str(this.context);
                console.error('[' + str(this) + '] mount error ' + errorInfo, e);
                this.componentDidCatch(e, errorInfo);
            }
            return this;
        };
        WComponent.prototype.componentWillUnmount = function () {
        };
        WComponent.prototype.componentWillMount = function () {
        };
        WComponent.prototype.render = function () {
            return this.buildRoot(this.rootTag);
        };
        WComponent.prototype.componentDidMount = function () {
        };
        WComponent.prototype.componentDidCatch = function (error, errorInfo) {
        };
        WComponent.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            if (typeof nextProps == 'object' || typeof nextState == 'object')
                return true;
            return this.props != nextProps || this.state != nextState;
        };
        WComponent.prototype.componentWillUpdate = function (nextProps, nextState) {
        };
        WComponent.prototype.componentDidUpdate = function (prevProps, prevState) {
        };
        WComponent.prototype.updateProps = function (nextProps) {
            this.props = nextProps;
        };
        WComponent.prototype.updateState = function (nextState) {
            this.state = nextState;
        };
        WComponent.prototype.update = function (nextProps, nextState, propsChange, stateChange, force, callback) {
            if (force === void 0) { force = false; }
            if (this.debug)
                console.log('[' + str(this) + '] update', nextProps, nextState, 'propsChange=' + propsChange + ',stateChange=' + stateChange + ',force=' + force);
            nextProps = nextProps === undefined ? this.props : nextProps;
            var prevProps = this.props;
            var prevState = this.state;
            this.dontTrigger = false;
            if (this.mounted) {
                if (force || this.shouldComponentUpdate(nextProps, nextState)) {
                    try {
                        if (this.debug)
                            console.log('[' + str(this) + '] componentWillUpdate', nextProps, nextState);
                        this.componentWillUpdate(nextProps, nextState);
                        if (propsChange) {
                            if (this.debug)
                                console.log('[' + str(this) + '] updateProps', nextProps);
                            this.updateProps(nextProps);
                        }
                        if (stateChange) {
                            if (this.debug)
                                console.log('[' + str(this) + '] updateState', nextState);
                            this.updateState(nextState);
                        }
                        if (force)
                            this.mount();
                        if (this.debug)
                            console.log('[' + str(this) + '] componentDidUpdate', prevProps, prevState);
                        this.componentDidUpdate(prevProps, prevState);
                        if (propsChange && !this.dontTrigger)
                            this.trigger('propschange');
                        if (stateChange && !this.dontTrigger)
                            this.trigger('statechange');
                    }
                    catch (e) {
                        this.componentDidCatch(e, str(this) + '|' + str(this.context));
                        return false;
                    }
                    if (callback)
                        callback();
                }
            }
            else {
                if (propsChange) {
                    if (this.debug)
                        console.log('[' + str(this) + '] updateProps', nextProps);
                    this.updateProps(nextProps);
                    if (!this.dontTrigger)
                        this.trigger('propschange');
                }
                if (stateChange) {
                    if (this.debug)
                        console.log('[' + str(this) + '] updateState', nextState);
                    this.updateState(nextState);
                    if (!this.dontTrigger)
                        this.trigger('statechange');
                }
            }
            return true;
        };
        WComponent.prototype.createEvent = function (type, data) {
            var target = this.root ? this.root.firstChild : this.root;
            return { component: this, element: this.root, target: target, type: type, data: data };
        };
        WComponent.prototype.shouldBuildRoot = function () {
            if (this.internal)
                return false;
            if (this.root)
                return false;
            if (this.context) {
                var ctxId = this.context.id;
                if (!ctxId && ctxId == this.id)
                    return false;
            }
            return true;
        };
        WComponent.prototype.buildRoot = function (tagName, inner, baseAttribs, classStyle, style, attributes, id) {
            if (this.debug)
                console.log('[' + str(this) + '] buildRoot', tagName, inner, baseAttribs, classStyle, style, attributes, id);
            if (!this.shouldBuildRoot()) {
                if (this.debug)
                    console.log('[' + str(this) + '] shouldBuildRoot() -> false');
                return undefined;
            }
            else {
                if (this.debug)
                    console.log('[' + str(this) + '] shouldBuildRoot() -> true');
            }
            return this.build(tagName, inner, baseAttribs, classStyle, style, attributes, id);
        };
        WComponent.prototype.build = function (tagName, inner, baseAttribs, classStyle, style, attributes, id) {
            if (!tagName)
                tagName = 'div';
            if (classStyle === undefined)
                classStyle = this._classStyle;
            if (style === undefined)
                style = this._style;
            if (attributes === undefined)
                attributes = this._attributes;
            if (id === undefined)
                id = this.id;
            var r = '<' + tagName;
            if (id)
                r += ' id="' + id + '"';
            if (classStyle)
                r += ' class="' + classStyle + '"';
            if (style)
                r += ' style="' + style + '"';
            var a = WUX.attributes(attributes);
            if (a)
                r += ' ' + a;
            var ba = WUX.attributes(baseAttribs);
            if (ba)
                r += ' ' + ba;
            r += '>';
            var bca = inner == null ? divide(this.make()) : divide(inner);
            r += bca[1];
            if (tagName == 'input')
                return bca[0] + r + bca[2];
            r += '</' + tagName + '>';
            return bca[0] + r + bca[2];
        };
        WComponent.prototype.make = function () {
            return '';
        };
        WComponent.prototype.subId = function (id, s) {
            if (id instanceof WComponent) {
                var cid = id.id;
                if (!cid || !this.id)
                    return cid;
                if (cid.indexOf(this.id + '-') != 0)
                    return cid;
                return cid.substring(this.id.length + 1);
            }
            else {
                if (!this.id || this.id == '*')
                    this.id = 'w' + this.cuid;
                if (!id || id == '*')
                    id = (this.subSeq++).toString();
                if (!s && s != 0)
                    return this.id + '-' + id;
                return this.id + '-' + id + '-' + s;
            }
        };
        WComponent.prototype.ripId = function (sid) {
            if (!sid || !this.id)
                return sid;
            if (sid.indexOf(this.id) == 0 && sid.length > this.id.length + 1) {
                return sid.substring(this.id.length + 1);
            }
            return sid;
        };
        WComponent.prototype.transferTo = function (dest, force, callback) {
            if (this.debug)
                console.log('[' + str(this) + '] transferTo ' + str(dest));
            if (dest) {
                dest.setState(this.getState(), force, callback);
                return true;
            }
            return false;
        };
        return WComponent;
    }());
    WUX.WComponent = WComponent;
    function getId(e) {
        if (!e)
            return;
        if (e instanceof Element)
            return e.id;
        if (e instanceof WComponent)
            return e.id;
        if (typeof e == 'string') {
            if (e.indexOf('<') < 0)
                return e.indexOf('#') == 0 ? e.substring(1) : e;
        }
        if (typeof e == 'object' && !e.id) {
            return '' + e.id;
        }
        return '';
    }
    WUX.getId = getId;
    function firstSub(e, r) {
        var id = getId(e);
        if (!id)
            return '';
        var s = id.indexOf('-');
        if (s < 0)
            return id;
        if (r)
            return id.substring(s + 1);
        return id.substring(0, s);
    }
    WUX.firstSub = firstSub;
    function lastSub(e) {
        var id = getId(e);
        if (!id)
            return '';
        var s = id.lastIndexOf('-');
        if (s < 0)
            return id;
        if (s > 0) {
            var p = id.charAt(s - 1);
            if (p == '-')
                return id.substring(s);
        }
        return id.substring(s + 1);
    }
    WUX.lastSub = lastSub;
    function getComponent(id) {
        if (!id)
            return;
        return wuxRegistry[id];
    }
    WUX.getComponent = getComponent;
    function getRootComponent(c) {
        if (!c)
            return c;
        if (!c.parent)
            return c;
        return getRootComponent(c.parent);
    }
    WUX.getRootComponent = getRootComponent;
    function setProps(id, p) {
        if (!id)
            return;
        var c = wuxRegistry[id];
        if (!c)
            return;
        c.setProps(p);
        return c;
    }
    WUX.setProps = setProps;
    function getProps(id, d) {
        if (!id)
            return d;
        var c = wuxRegistry[id];
        if (!c)
            return d;
        var p = c.getProps();
        if (p == null)
            return d;
        return p;
    }
    WUX.getProps = getProps;
    function setState(id, s) {
        if (!id)
            return;
        var c = wuxRegistry[id];
        if (!c)
            return;
        c.setState(s);
        return c;
    }
    WUX.setState = setState;
    function getState(id, d) {
        if (!id)
            return d;
        var c = wuxRegistry[id];
        if (!c)
            return d;
        var s = c.getState();
        if (s == null)
            return d;
        return s;
    }
    WUX.getState = getState;
    function newInstance(n) {
        if (!n)
            return null;
        var s = n.lastIndexOf('.');
        if (s > 0) {
            var ns = n.substring(0, s);
            if (window[ns]) {
                var c = n.substring(s + 1);
                for (var i in window[ns]) {
                    if (i == c)
                        return new window[ns][i];
                }
                return null;
            }
        }
        var p = window[n];
        return (p && p.prototype) ? Object.create(p.prototype) : null;
    }
    WUX.newInstance = newInstance;
    function same(e1, e2) {
        if (typeof e1 == 'string' && typeof e2 == 'string')
            return e1 == e2;
        if (typeof e1 == 'string' || typeof e2 == 'string')
            return false;
        var id1 = getId(e1);
        var id2 = getId(e2);
        return id1 && id2 && id1 == id2;
    }
    WUX.same = same;
    function divide(s) {
        if (!s)
            return ['', '', ''];
        if (s == ' ')
            return ['', '&nbsp;', ''];
        var b = s.charAt(0) == ' ' ? '&nbsp;' : '';
        var a = s.length > 1 && s.charAt(s.length - 1) == ' ' ? '&nbsp;' : '';
        var ss = s.trim().split('<>');
        if (!ss || ss.length < 2)
            return [b, s.trim(), a];
        b += ss[0];
        if (ss.length == 2)
            return [b, ss[1], ''];
        a += ss[2];
        return [b, ss[1], a];
    }
    WUX.divide = divide;
    function str(a) {
        if (a instanceof WComponent) {
            var wcdn = a.name;
            var wcid = a.id;
            if (!wcdn)
                wcdn = 'WComponent';
            if (!wcid)
                return wcdn;
            return wcdn + '(' + wcid + ')';
        }
        if (a instanceof Element) {
            return 'Element#' + a.id;
        }
        if (typeof a == 'object')
            return JSON.stringify(a);
        return a + '';
    }
    WUX.str = str;
    function getTagName(c) {
        if (!c)
            return '';
        if (c instanceof WComponent) {
            var r = c.rootTag;
            if (r)
                return r.toLowerCase();
            var root = c.getRoot();
            if (!root)
                return WUX.getTagName(root);
            return '';
        }
        else if (c instanceof Element) {
            return c.tagName.toLowerCase();
        }
        else {
            var s = '' + c;
            if (s.charAt(0) == '<') {
                var e = s.indexOf(' ');
                if (e < 0)
                    e = s.indexOf('>');
                if (e > 0) {
                    var r = s.substring(1, e).toLowerCase();
                    if (r.charAt(r.length - 1) == '/')
                        return r.substring(0, r.length - 1);
                    return r;
                }
                return '';
            }
            else if (s.charAt(0) == '#') {
                return WUX.getTagName(document.getElementById(s.substring(1)));
            }
            return WUX.getTagName(document.getElementById(s));
        }
    }
    WUX.getTagName = getTagName;
    function style(ws) {
        var s = '';
        if (!ws)
            return s;
        if (typeof ws == 'string') {
            if (ws.indexOf(':') <= 0)
                return '';
            if (ws.charAt(ws.length - 1) != ';')
                return ws + ';';
            return ws;
        }
        if (ws.s)
            s += css(ws.s);
        if (ws.fs)
            s += 'font-style:' + ws.fs + ';';
        if (ws.fw)
            s += 'font-weight:' + ws.fw + ';';
        if (ws.tt)
            s += 'text-transform:' + ws.tt + ';';
        if (ws.tr)
            s += 'transform:' + ws.tr + ';';
        if (ws.fl)
            s += 'float:' + ws.fl + ';';
        if (ws.cl)
            s += 'clear:' + ws.cl + ';';
        if (ws.a)
            s += 'text-align:' + ws.a + ';';
        if (ws.c)
            s += 'color:' + ws.c + ';';
        if (ws.v)
            s += 'vertical-align:' + ws.v + ';';
        if (ws.d)
            s += 'display:' + ws.d + ';';
        if (ws.z)
            s += 'z-index:' + ws.z + ';';
        if (ws.lh)
            s += 'line-height:' + ws.lh + ';';
        if (ws.ps)
            s += 'position:' + ws.ps + ';';
        if (ws.o)
            s += 'overflow:' + ws.o + ';';
        if (ws.ox)
            s += 'overflow-x:' + ws.ox + ';';
        if (ws.oy)
            s += 'overflow-y:' + ws.oy + ';';
        if (ws.op != null)
            s += 'opacity:' + ws.op + ';';
        if (ws.ol != null)
            s += 'outline:' + ws.ol + ';';
        if (ws.cr)
            s += 'cursor:' + ws.cr + ';';
        if (ws.cn)
            s += 'content:' + ws.cn + ';';
        if (ws.k && ws.k.indexOf(':') > 0)
            s += ws.k.charAt(0) == '-' ? '-webkit' + ws.k + ';' : '-webkit-' + ws.k + ';';
        if (ws.k && ws.k.indexOf(':') > 0)
            s += ws.k.charAt(0) == '-' ? '-moz' + ws.k + ';' : '-moz-' + ws.k + ';';
        if (ws.k && ws.k.indexOf(':') > 0)
            s += ws.k.charAt(0) == '-' ? '-o' + ws.k + ';' : '-o-' + ws.k + ';';
        if (ws.k && ws.k.indexOf(':') > 0)
            s += ws.k.charAt(0) == '-' ? '-ms' + ws.k + ';' : '-ms-' + ws.k + ';';
        if (ws.bs)
            s += 'box-shadow:' + ws.bs + ';';
        if (ws.bz)
            s += 'box-sizing:' + ws.bz + ';';
        if (ws.b)
            s += ws.b.indexOf(':') > 0 ? css('border' + ws.b) : ws.b.match(/^(|none|inherit|initial|unset)$/) ? 'border:' + ws.b + ';' : ws.b.indexOf(' ') > 0 ? 'border:' + ws.b + ';' : 'border:1px solid ' + ws.b + ';';
        if (ws.bc)
            s += 'border-collapse:' + ws.bc + ';';
        if (ws.br != null)
            s += typeof ws.br == 'number' ? 'border-radius:' + ws.br + 'px;' : 'border-radius:' + ws.br + ';';
        if (ws.bsp != null)
            s += typeof ws.bsp == 'number' ? 'border-spacing:' + ws.bsp + 'px;' : 'border-spacing:' + ws.bsp + ';';
        if (ws.m != null)
            s += typeof ws.m == 'number' ? 'margin:' + ws.m + 'px;' : ws.m.indexOf(':') > 0 ? css('margin' + ws.m) : 'margin:' + ws.m + ';';
        if (ws.mt != null)
            s += typeof ws.mt == 'number' ? 'margin-top:' + ws.mt + 'px;' : 'margin-top:' + ws.mt + ';';
        if (ws.mr != null)
            s += typeof ws.mr == 'number' ? 'margin-right:' + ws.mr + 'px;' : 'margin-right:' + ws.mr + ';';
        if (ws.mb != null)
            s += typeof ws.mb == 'number' ? 'margin-bottom:' + ws.mb + 'px;' : 'margin-bottom:' + ws.mb + ';';
        if (ws.ml != null)
            s += typeof ws.ml == 'number' ? 'margin-left:' + ws.ml + 'px;' : 'margin-left:' + ws.ml + ';';
        if (ws.p != null)
            s += typeof ws.p == 'number' ? 'padding:' + ws.p + 'px;' : ws.p.indexOf(':') > 0 ? css('padding' + ws.p) : 'padding:' + ws.p + ';';
        if (ws.pt != null)
            s += typeof ws.pt == 'number' ? 'padding-top:' + ws.pt + 'px;' : 'padding-top:' + ws.pt + ';';
        if (ws.pr != null)
            s += typeof ws.pr == 'number' ? 'padding-right:' + ws.pr + 'px;' : 'padding-right:' + ws.pr + ';';
        if (ws.pb != null)
            s += typeof ws.pb == 'number' ? 'padding-bottom:' + ws.pb + 'px;' : 'padding-bottom:' + ws.pb + ';';
        if (ws.pl != null)
            s += typeof ws.pl == 'number' ? 'padding-left:' + ws.pl + 'px;' : 'padding-left:' + ws.pl + ';';
        if (ws.f != null)
            s += typeof ws.f == 'number' ? 'font-size:' + ws.f + 'px;' : ws.f.indexOf(':') > 0 ? css('font' + ws.f) : 'font-size:' + ws.f + ';';
        if (ws.bg)
            s += ws.bg.indexOf(':') > 0 ? css('background' + ws.bg) : ws.bg.indexOf('url') >= 0 ? 'background:' + ws.bg + ';' : 'background-color:' + ws.bg + ';';
        if (ws.bgi)
            s += 'background-image:' + ws.bgi + ';';
        if (ws.bgp)
            s += 'background-position:' + ws.bgp + ';';
        if (ws.bgr)
            s += 'background-repeat:' + ws.bgr + ';';
        if (ws.text)
            s += ws.text.indexOf(':') > 0 ? css('text' + ws.text) : 'text-decoration:' + ws.text + ';';
        if (ws.l != null)
            s += typeof ws.l == 'number' ? 'left:' + ws.l + 'px;' : 'left:' + ws.l + ';';
        if (ws.r != null)
            s += typeof ws.r == 'number' ? 'right:' + ws.r + 'px;' : 'right:' + ws.r + ';';
        if (ws.t != null)
            s += typeof ws.t == 'number' ? 'top:' + ws.t + 'px;' : 'top:' + ws.t + ';';
        if (ws.bt != null)
            s += typeof ws.bt == 'number' ? 'bottom:' + ws.bt + 'px;' : 'bottom:' + ws.bt + ';';
        if (ws.w)
            s += typeof ws.w == 'number' ? 'width:' + ws.w + 'px;' : 'width:' + ws.w + ';';
        if (ws.h)
            s += typeof ws.h == 'number' ? 'height:' + ws.h + 'px;' : 'height:' + ws.h + ';';
        if (ws.minw)
            s += typeof ws.minw == 'number' ? 'min-width:' + ws.minw + 'px;' : 'min-width:' + ws.minw + ';';
        if (ws.maxw)
            s += typeof ws.maxw == 'number' ? 'max-width:' + ws.maxw + 'px;' : 'max-width:' + ws.maxw + ';';
        if (ws.minh)
            s += typeof ws.minh == 'number' ? 'min-height:' + ws.minh + 'px;' : 'min-height:' + ws.minh + ';';
        if (ws.maxh)
            s += typeof ws.maxh == 'number' ? 'max-height:' + ws.maxh + 'px;' : 'max-height:' + ws.maxh + ';';
        if (ws.ws)
            s += 'white-space:' + ws.ws + ';';
        return s;
    }
    WUX.style = style;
    function addStyle(s, k, v, n) {
        if (!k || !v)
            return css(s);
        if (!s)
            return k + ':' + v + ';';
        if (n) {
            if (s.indexOf(k + ':') >= 0)
                return css(s);
            return css(s) + k + ':' + v + ';';
        }
        return css(s) + k + ':' + v + ';';
    }
    WUX.addStyle = addStyle;
    function css() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        if (!a || a.length == 0)
            return '';
        var s = '';
        var x = {};
        var xi = true;
        for (var i = 0; i < a.length; i++) {
            var e = a[i];
            if (!e)
                continue;
            if (typeof e != 'string') {
                x = __assign(__assign({}, x), e);
                xi = false;
                continue;
            }
            if (!xi) {
                s += style(x);
                x = {};
                xi = true;
            }
            if (e.indexOf(':') > 0) {
                s += e;
                if (e.charAt(e.length - 1) != ';')
                    s += ';';
            }
        }
        if (!xi)
            s += style(x);
        return s;
    }
    WUX.css = css;
    function cls() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        if (!a || !a.length)
            return '';
        var s = '';
        for (var i = 0; i < a.length; i++) {
            var e = a[i];
            if (!e)
                continue;
            var se = typeof e == 'string' ? e : e.n;
            if (!se)
                continue;
            if (se.indexOf(':') > 0)
                continue;
            s += se + ' ';
        }
        return s.trim();
    }
    WUX.cls = cls;
    function attributes(a) {
        if (!a)
            return '';
        if (typeof a == 'string')
            return a;
        if (typeof a == 'object') {
            var r = '';
            for (var k in a)
                r += k + '="' + a[k] + '" ';
            return r.trim();
        }
        return '';
    }
    WUX.attributes = attributes;
    function buildCss() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        if (!a || !a.length)
            return '';
        var c = cls.apply(void 0, a);
        var s = css.apply(void 0, a);
        var r = '';
        if (c)
            r += ' class="' + c + '"';
        if (s)
            r += ' style="' + s + '"';
        return r;
    }
    WUX.buildCss = buildCss;
    function addClass(css, name) {
        if (!css)
            return name;
        if (!name)
            return css;
        var classes = css.split(' ');
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var c = classes_1[_i];
            if (c == name)
                return css;
        }
        return css + ' ' + name;
    }
    WUX.addClass = addClass;
    function removeClass(css, name) {
        if (!css || !name)
            return css;
        var classes = css.split(' ');
        var r = '';
        for (var _i = 0, classes_2 = classes; _i < classes_2.length; _i++) {
            var c = classes_2[_i];
            if (c == name)
                continue;
            r += c + ' ';
        }
        return r.trim();
    }
    WUX.removeClass = removeClass;
    function toggleClass(css, name) {
        if (!css)
            return name;
        if (!name)
            return css;
        var classes = css.split(' ');
        var f = false;
        var r = '';
        for (var _i = 0, classes_3 = classes; _i < classes_3.length; _i++) {
            var c = classes_3[_i];
            if (c == name) {
                f = true;
                continue;
            }
            r += c + ' ';
        }
        if (!f)
            return r.trim() + ' ' + name;
        return r.trim();
    }
    WUX.toggleClass = toggleClass;
    function addClassOf(e, name) {
        if (!e)
            return;
        e.setAttribute('class', addClass(e.getAttribute('class'), name));
    }
    WUX.addClassOf = addClassOf;
    function removeClassOf(e, name) {
        if (!e)
            return;
        e.setAttribute('class', removeClass(e.getAttribute('class'), name));
    }
    WUX.removeClassOf = removeClassOf;
    function toggleClassOf(e, name) {
        if (!e)
            return;
        e.setAttribute('class', toggleClass(e.getAttribute('class'), name));
    }
    WUX.toggleClassOf = toggleClassOf;
    function setCss(e) {
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
        if (!e || !a || !a.length)
            return e;
        if (e instanceof WComponent) {
            e.css.apply(e, a);
        }
        else if (e instanceof Element) {
            var s = css.apply(void 0, a);
            var c = cls.apply(void 0, a);
            if (c)
                addClassOf(e, c);
            if (s)
                e.setAttribute('style', style(s));
        }
        return e;
    }
    WUX.setCss = setCss;
    function buildIcon(icon, before, after, size, cls, title) {
        if (!icon)
            return '';
        if (!before)
            before = '';
        if (!after)
            after = '';
        var t = title ? ' title="' + title + '"' : '';
        cls = cls ? ' ' + cls : '';
        if (icon.indexOf('.') > 0)
            return before + '<img src="' + icon + '"' + t + '>' + after;
        if (!size || size < 2)
            return before + '<i class="fa ' + icon + cls + '"' + t + '></i>' + after;
        if (size > 5)
            size = 5;
        return before + '<i class="fa ' + icon + ' fa-' + size + 'x' + cls + '"' + t + '></i>' + after;
    }
    WUX.buildIcon = buildIcon;
    function build(tagName, inner, css, attributes, id, classStyle) {
        if (!tagName)
            tagName = 'div';
        var clsStyle;
        var style;
        if (typeof css == 'string') {
            if (css.indexOf(':') > 0) {
                style = css;
            }
            else {
                clsStyle = css;
            }
        }
        else if (css) {
            if (css.n)
                clsStyle = css.n;
            style = WUX.style(css);
        }
        if (classStyle) {
            if (clsStyle) {
                clsStyle += ' ' + classStyle;
            }
            else {
                clsStyle = classStyle;
            }
        }
        var r = '<' + tagName;
        if (id)
            r += ' id="' + id + '"';
        if (clsStyle)
            r += ' class="' + clsStyle + '"';
        if (style)
            r += ' style="' + style + '"';
        var a = WUX.attributes(attributes);
        if (a)
            r += ' ' + a;
        r += '>';
        var bca = divide(inner);
        r += bca[1];
        if (tagName == 'input')
            return bca[0] + r + bca[2];
        r += '</' + tagName + '>';
        return bca[0] + r + bca[2];
    }
    WUX.build = build;
    var WUtil = (function () {
        function WUtil() {
        }
        WUtil.toArray = function (a) {
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return [];
            if (Array.isArray(a))
                return a;
            var r = [];
            r.push(a);
            return r;
        };
        WUtil.toArrayNumber = function (a, nz) {
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return [];
            var r = [];
            if (Array.isArray(a)) {
                for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
                    var e = a_1[_i];
                    var n = WUtil.toNumber(e);
                    if (nz && !n)
                        continue;
                    r.push(n);
                }
            }
            else {
                var n = WUtil.toNumber(a);
                if (nz && !n)
                    return r;
                r.push(n);
            }
            return r;
        };
        WUtil.toArrayString = function (a, ne) {
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return [];
            var r = [];
            if (Array.isArray(a)) {
                for (var _i = 0, a_2 = a; _i < a_2.length; _i++) {
                    var e = a_2[_i];
                    var s = WUtil.toString(e);
                    if (ne && !s)
                        continue;
                    r.push(s);
                }
            }
            else {
                var s = WUtil.toString(a);
                if (ne && !s)
                    return r;
                r.push(WUtil.toString(a));
            }
            return r;
        };
        WUtil.splitNumbers = function (a, s) {
            if (!a)
                return [];
            var sa = WUtil.toString(a);
            var aos = sa.split(s);
            var r = [];
            for (var _i = 0, aos_1 = aos; _i < aos_1.length; _i++) {
                var e = aos_1[_i];
                r.push(WUtil.toNumber(e));
            }
            return r;
        };
        WUtil.toObject = function (a, d) {
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return d;
            if (typeof a == 'object')
                return a;
            return d;
        };
        WUtil.toString = function (a, d) {
            if (d === void 0) { d = ''; }
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return d;
            if (typeof a == 'string')
                return a;
            if (a instanceof Date)
                return WUX.formatDate(a);
            if (typeof a == 'object' && a.id != undefined)
                return WUtil.toString(a.id, d);
            if (Array.isArray(a) && a.length)
                return WUtil.toString(a[0], d);
            return '' + a;
        };
        WUtil.toText = function (a, d) {
            if (d === void 0) { d = ''; }
            var r = WUtil.toString(a, d);
            return r.replace('<', '&lt;').replace('>', '&gt;');
        };
        WUtil.toNumber = function (a, d) {
            if (d === void 0) { d = 0; }
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return d;
            if (typeof a == 'number')
                return a;
            if (a instanceof Date)
                return a.getFullYear() * 10000 + (a.getMonth() + 1) * 100 + a.getDate();
            if (typeof a == 'object' && a.id != undefined)
                return WUtil.toNumber(a.id, d);
            if (Array.isArray(a) && a.length)
                return WUtil.toNumber(a[0], d);
            var s = ('' + a).trim();
            if (s.indexOf('.') >= 0 && s.indexOf(',') >= 0)
                s = s.replace('.', '');
            s = s.replace(',', '.');
            var n = s.indexOf('.') >= d ? parseFloat(s) : parseInt(s);
            return isNaN(n) ? d : n;
        };
        WUtil.toInt = function (a, d) {
            if (d === void 0) { d = 0; }
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return d;
            if (typeof a == 'number')
                return Math.floor(a);
            if (a instanceof Date)
                return a.getFullYear() * 10000 + (a.getMonth() + 1) * 100 + a.getDate();
            if (typeof a == 'object' && a.id != undefined)
                return WUtil.toInt(a.id, d);
            if (Array.isArray(a) && a.length)
                return WUtil.toInt(a[0], d);
            var s = ('' + a).replace(',', '.');
            var n = parseInt(s);
            return isNaN(n) ? d : n;
        };
        WUtil.toIntTime = function (a, d) {
            if (d === void 0) { d = 0; }
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return d;
            if (typeof a == 'number')
                a;
            if (a instanceof Date)
                return a.getHours() * 100 + a.getMinutes();
            if (Array.isArray(a) && a.length)
                return WUtil.toIntTime(a[0], d);
            var s = ('' + a).replace(':', '').replace('.', '').replace(',', '');
            var n = parseInt(s);
            return isNaN(n) ? d : n;
        };
        WUtil.isNumeric = function (a) {
            return !isNaN(a);
        };
        WUtil.checkEmail = function (e) {
            if (!e)
                return '';
            var s = WUtil.toString(e);
            if (!s)
                return '';
            if (s.length < 5)
                return '';
            var a = s.indexOf('@');
            if (a <= 0)
                return '';
            var d = s.lastIndexOf('.');
            if (d < a)
                return '';
            return s.trim().toLowerCase();
        };
        WUtil.starts = function (a, s) {
            if (!a || s == null)
                return false;
            return WUtil.toString(a).indexOf(s) == 0;
        };
        WUtil.ends = function (a, s) {
            if (!a || s == null)
                return false;
            var t = WUtil.toString(a);
            var i = t.lastIndexOf(s);
            if (i < 0)
                return false;
            return i == t.length - s.length;
        };
        WUtil.isEmpty = function (a) {
            if (!a)
                return true;
            if (Array.isArray(a) && !a.length)
                return true;
            if (typeof a == 'object') {
                var r = 0;
                for (var k in a)
                    if (a.hasOwnProperty(k))
                        return false;
                return true;
            }
            return false;
        };
        WUtil.toBoolean = function (a, d) {
            if (d === void 0) { d = false; }
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return d;
            if (typeof a == 'boolean')
                return a;
            if (typeof a == 'string' && a.length)
                return '1YyTtSs'.indexOf(a.charAt(0)) >= 0;
            return !!d;
        };
        WUtil.toDate = function (a, d) {
            if (a instanceof WComponent)
                a = a.getState();
            if (a == null)
                return d;
            if (a instanceof Date)
                return a;
            if (typeof a == 'number') {
                if (a < 10000101)
                    return d;
                return new Date(a / 10000, ((a % 10000) / 100) - 1, (a % 10000) % 100);
            }
            if (typeof a == 'string') {
                if (a.length < 8)
                    return d;
                var sd = a.indexOf(',');
                if (sd >= 0)
                    a = a.substring(sd + 1);
                if (a.indexOf('-') > 3)
                    return new Date(a.trim());
                if (this.isNumeric(a)) {
                    var n = parseInt(a);
                    if (n < 10000101)
                        return d;
                    return new Date(n / 10000, ((n % 10000) / 100) - 1, (n % 10000) % 100);
                }
                return new Date(a.trim().replace(/(\d{1,2}).(\d{1,2}).(\d{4})/, '$3-$2-$1'));
            }
            return d;
        };
        WUtil.getWeek = function (a) {
            var d;
            if (a instanceof Date) {
                d = new Date(a.getTime());
            }
            else {
                d = WUtil.toDate(a);
            }
            if (!d)
                d = new Date();
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
            var w1 = new Date(d.getFullYear(), 0, 4);
            return 1 + Math.round(((d.getTime() - w1.getTime()) / 86400000 - 3 + (w1.getDay() + 6) % 7) / 7);
        };
        WUtil.getParam = function (name, url) {
            if (!url)
                url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
            if (!results)
                return '';
            if (!results[2])
                return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        };
        WUtil.size = function (a) {
            if (!a)
                return 0;
            if (Array.isArray(a))
                return a.length;
            if (typeof a == 'object') {
                var r = 0;
                for (var k in a)
                    if (a.hasOwnProperty(k))
                        r++;
                return r;
            }
            return 0;
        };
        WUtil.setValue = function (a, k, v) {
            if (typeof a == 'object')
                a[k] = v;
            return a;
        };
        WUtil.getValue = function (a, k, d) {
            if (!k)
                return d;
            if (Array.isArray(a) && a.length) {
                if (k == '-1') {
                    return WUtil.getLast(a, d);
                }
                else if (WUtil.isNumeric(k)) {
                    return WUtil.getItem(a, WUtil.toInt(k), d);
                }
                else {
                    return WUtil.getValue(a[0], k, d);
                }
            }
            if (typeof a == 'object') {
                var sep = k.indexOf('.');
                if (a[k] == null && sep > 0) {
                    var sub = k.substring(0, sep);
                    if (a[sub] == null)
                        return d;
                    return WUtil.getValue(a[sub], k.substring(sep + 1), d);
                }
                return a[k] == null ? d : a[k];
            }
            return d;
        };
        WUtil.getItem = function (a, i, d) {
            if (i < 0)
                return d;
            if (Array.isArray(a)) {
                if (a.length > i) {
                    var r = a[i];
                    return r == null ? d : r;
                }
                return d;
            }
            return d;
        };
        WUtil.getFirst = function (a, d) {
            if (Array.isArray(a)) {
                if (a.length > 0) {
                    var r = a[0];
                    return r == null ? d : r;
                }
                return d;
            }
            return d;
        };
        WUtil.getLast = function (a, d) {
            if (Array.isArray(a)) {
                if (a.length > 0) {
                    var r = a[a.length - 1];
                    return r == null ? d : r;
                }
                return d;
            }
            return d;
        };
        WUtil.getNumber = function (a, k, d) {
            return WUtil.toNumber(WUtil.getValue(a, k, d));
        };
        WUtil.getInt = function (a, k, d) {
            return WUtil.toInt(WUtil.getValue(a, k, d));
        };
        WUtil.getString = function (a, k, d, f) {
            var v = WUtil.getValue(a, k);
            if (v == null)
                return d;
            if (!f)
                return WUtil.toString(v);
            if (f == '?') {
                if (typeof v == 'number') {
                    return WUX.formatNum(v);
                }
                else {
                    return WUtil.toString(v);
                }
            }
            if (f == 'c')
                return WUX.formatCurr(v);
            if (f == 'c5')
                return WUX.formatCurr5(v);
            if (f == 'n')
                return WUX.formatNum(v);
            if (f == 'n2')
                return WUX.formatNum2(v);
            if (f == 'm')
                return WUX.formatMonth(v);
            if (f == 'd')
                return WUX.formatDate(v);
            if (f == 'dt')
                return WUX.formatDateTime(v);
            if (f == 't')
                return WUX.formatTime(v);
            return WUtil.toString(v);
        };
        WUtil.getText = function (a, k, d) {
            return WUtil.toText(WUtil.getValue(a, k, d));
        };
        WUtil.getBoolean = function (a, k, d) {
            return WUtil.toBoolean(WUtil.getValue(a, k, d));
        };
        WUtil.getDate = function (a, k, d) {
            return WUtil.toDate(WUtil.getValue(a, k, d));
        };
        WUtil.getArray = function (a, k) {
            return WUtil.toArray(WUtil.getValue(a, k));
        };
        WUtil.getArrayNumber = function (a, k, nz) {
            return WUtil.toArrayNumber(WUtil.getValue(a, k), nz);
        };
        WUtil.getArrayString = function (a, k, ne) {
            return WUtil.toArrayString(WUtil.getValue(a, k), ne);
        };
        WUtil.getObject = function (a, k, n) {
            var r = WUtil.toObject(WUtil.getValue(a, k));
            if (!r && n)
                return {};
            return r;
        };
        WUtil.sort = function (a, t, k) {
            if (t === void 0) { t = true; }
            if (!a)
                return [];
            var array = WUtil.toArray(a);
            if (!k) {
                var r_1 = array.sort();
                return t ? r_1 : r_1.reverse();
            }
            var r = array.sort(function (a, b) {
                var x = WUtil.getValue(a, k);
                var y = WUtil.getValue(b, k);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            return t ? r : r.reverse();
        };
        WUtil.find = function (a, k, v) {
            if (!a || !k)
                return null;
            var y = WUtil.toArray(a);
            for (var _i = 0, y_1 = y; _i < y_1.length; _i++) {
                var i = y_1[_i];
                var w = WUtil.getValue(i, k);
                if (w instanceof Date && v instanceof Date) {
                    if (w.getTime() == v.getTime())
                        return i;
                }
                if (w == v)
                    return i;
            }
            return null;
        };
        WUtil.indexOf = function (a, k, v) {
            if (!a || !k)
                return -1;
            var y = WUtil.toArray(a);
            for (var i = 0; i < y.length; i++) {
                var w = WUtil.getValue(y[i], k);
                if (w instanceof Date && v instanceof Date) {
                    if (w.getTime() == v.getTime())
                        return i;
                }
                if (w == v)
                    return i;
            }
            return -1;
        };
        WUtil.isSameDate = function (a, b) {
            var na = this.toNumber(a);
            var nb = this.toNumber(b);
            if (na == nb)
                return true;
            return false;
        };
        WUtil.indexOfDate = function (a, v) {
            if (!a || !v)
                return -1;
            var vi = WUtil.toNumber(v);
            for (var i = 0; i < a.length; i++) {
                if (!a[i])
                    continue;
                var ai = WUtil.toNumber(a[i]);
                if (ai == vi)
                    return i;
            }
            return -1;
        };
        WUtil.round2 = function (a) {
            if (a == null)
                return 0;
            var n = WUtil.toNumber(a);
            return (Math.round(n * 100) / 100);
        };
        WUtil.floor2 = function (a) {
            if (a == null)
                return 0;
            var n = WUtil.toNumber(a);
            return (Math.floor(n * 100) / 100);
        };
        WUtil.ceil2 = function (a) {
            if (a == null)
                return 0;
            var n = WUtil.toNumber(a);
            return (Math.ceil(n * 100) / 100);
        };
        WUtil.compare2 = function (a, b) {
            if (!a && !b)
                return 0;
            var n = Math.round(WUtil.toNumber(a) * 100);
            var m = Math.round(WUtil.toNumber(b) * 100);
            if (n == m)
                return 0;
            return n > m ? 1 : -1;
        };
        WUtil.compare5 = function (a, b) {
            if (!a && !b)
                return 0;
            var n = Math.round(WUtil.toNumber(a) * 10000);
            var m = Math.round(WUtil.toNumber(b) * 10000);
            if (n == m)
                return 0;
            return n > m ? 1 : -1;
        };
        WUtil.getCurrDate = function (d, m, y, f, l) {
            var r = new Date();
            r.setHours(0, 0, 0, 0);
            if (d)
                r.setDate(r.getDate() + d);
            if (m)
                r.setMonth(r.getMonth() + m);
            if (y)
                r.setFullYear(r.getFullYear() + y);
            if (f)
                r.setDate(1);
            if (l) {
                r.setMonth(r.getMonth() + 1);
                r.setDate(0);
            }
            return r;
        };
        WUtil.calcDate = function (r, d, m, y, f, l) {
            r = r ? new Date(r.getTime()) : new Date();
            r.setHours(0, 0, 0, 0);
            if (d)
                r.setDate(r.getDate() + d);
            if (m)
                r.setMonth(r.getMonth() + m);
            if (y)
                r.setFullYear(r.getFullYear() + y);
            if (f)
                r.setDate(1);
            if (l) {
                r.setMonth(r.getMonth() + 1);
                r.setDate(0);
            }
            return r;
        };
        WUtil.timestamp = function (dt) {
            var d = dt ? WUtil.toDate(dt) : new Date();
            if (!d)
                d = new Date();
            var sy = '' + d.getFullYear();
            var nm = d.getMonth() + 1;
            var sm = nm < 10 ? '0' + nm : '' + nm;
            var nd = d.getDate();
            var sd = nd < 10 ? '0' + nd : '' + nd;
            var nh = d.getHours();
            var sh = nh < 10 ? '0' + nh : '' + nh;
            var np = d.getMinutes();
            var sp = np < 10 ? '0' + np : '' + np;
            var ns = d.getSeconds();
            var ss = ns < 10 ? '0' + ns : '' + ns;
            return sy + sm + sd + sh + sp + ss;
        };
        WUtil.nvl = function () {
            var v = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                v[_i] = arguments[_i];
            }
            if (!v || !v)
                return;
            for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
                var e = v_1[_a];
                if (!e)
                    return e;
            }
            return v[0];
        };
        WUtil.eqValues = function (o1, o2) {
            var keys = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                keys[_i - 2] = arguments[_i];
            }
            if (!o1 && !o2)
                return true;
            if (!o1 || !o2)
                return false;
            for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                var k = keys_1[_a];
                if (o1[k] != o2[k])
                    return false;
            }
            return true;
        };
        WUtil.col = function (tuples, i, d) {
            var r = [];
            if (!tuples || !tuples.length)
                return r;
            for (var _i = 0, tuples_1 = tuples; _i < tuples_1.length; _i++) {
                var e = tuples_1[_i];
                r.push(WUtil.getItem(e, i, d));
            }
            return r;
        };
        WUtil.getSortedKeys = function (map) {
            if (!map)
                return [];
            var r = [];
            for (var key in map) {
                if (map.hasOwnProperty(key))
                    r.push(key);
            }
            return r.sort();
        };
        WUtil.diffMinutes = function (ah, al) {
            var dh = WUtil.toDate(ah);
            var dl = WUtil.toDate(al);
            if (!dh)
                dh = new Date();
            if (!dl)
                dl = new Date();
            return (dh.getTime() - dl.getTime()) / 60000;
        };
        WUtil.diffHours = function (ah, al) {
            var dh = WUtil.toDate(ah);
            var dl = WUtil.toDate(al);
            if (!dh)
                dh = new Date();
            if (!dl)
                dl = new Date();
            return (dh.getTime() - dl.getTime()) / 3600000;
        };
        WUtil.diffDays = function (ah, al) {
            var dh = WUtil.toDate(ah);
            var dl = WUtil.toDate(al);
            if (!dh)
                dh = new Date();
            if (!dl)
                dl = new Date();
            var dt = dh.getTime() - dl.getTime();
            var dv = dt / (3600000 * 24);
            var rt = dt % (3600000 * 24);
            var rh = rt / 60000;
            var r = dv;
            if (rh > 12) {
                r++;
            }
            return r;
        };
        return WUtil;
    }());
    WUX.WUtil = WUtil;
})(WUX || (WUX = {}));
var WUX;
(function (WUX) {
    var _data = {};
    var _dccb = {};
    WUX.global = {
        locale: 'it',
        init: function _init(callback) {
            if (WUX.debug)
                console.log('[WUX] global.init...');
            if (WUX.debug)
                console.log('[WUX] global.init completed');
            if (callback)
                callback();
        },
        setData: function (key, data, dontTrigger) {
            if (dontTrigger === void 0) { dontTrigger = false; }
            if (!key)
                key = 'global';
            _data[key] = data;
            if (dontTrigger)
                return;
            if (!_dccb[key])
                return;
            for (var _i = 0, _a = _dccb[key]; _i < _a.length; _i++) {
                var cb = _a[_i];
                cb(data);
            }
        },
        getData: function (key, def) {
            if (!key)
                key = 'global';
            var r = _data[key];
            if (r == null)
                return def;
            return r;
        },
        onDataChanged: function (key, callback) {
            if (!key)
                key = 'global';
            if (!_dccb[key])
                _dccb[key] = [];
            _dccb[key].push(callback);
        }
    };
    var CSS = (function () {
        function CSS() {
        }
        CSS.FORM = 'padding-top: 16px';
        CSS.FORM_GROUP = 'form-group';
        CSS.FORM_CTRL = 'form-control';
        return CSS;
    }());
    WUX.CSS = CSS;
    function formatDate(a, withDay, e) {
        if (withDay === void 0) { withDay = false; }
        if (e === void 0) { e = false; }
        if (!a)
            return '';
        var d = WUX.WUtil.toDate(a);
        if (!d)
            return '';
        var m = d.getMonth() + 1;
        var sm = m < 10 ? '0' + m : '' + m;
        var sd = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        if (withDay) {
            return WUX.formatDay(d.getDay(), e) + ', ' + sd + '/' + sm + '/' + d.getFullYear();
        }
        return sd + '/' + sm + '/' + d.getFullYear();
    }
    WUX.formatDate = formatDate;
    function formatDateTime(a, withSec, withDay, e) {
        if (withSec === void 0) { withSec = false; }
        if (withDay === void 0) { withDay = false; }
        if (e === void 0) { e = false; }
        if (!a)
            return '';
        var d = WUX.WUtil.toDate(a);
        if (!d)
            return '';
        var m = d.getMonth() + 1;
        var sm = m < 10 ? '0' + m : '' + m;
        var sd = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        var sh = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
        var sp = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
        if (withSec) {
            var ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
            if (withDay) {
                return WUX.formatDay(d.getDay(), e) + ', ' + sd + '/' + sm + '/' + d.getFullYear() + ' ' + sh + ':' + sp + ':' + ss;
            }
            return sd + '/' + sm + '/' + d.getFullYear() + ' ' + sh + ':' + sp + ':' + ss;
        }
        if (withDay) {
            return WUX.formatDay(d.getDay(), e) + ', ' + sd + '/' + sm + '/' + d.getFullYear() + ' ' + sh + ':' + sp;
        }
        return sd + '/' + sm + '/' + d.getFullYear() + ' ' + sh + ':' + sp;
    }
    WUX.formatDateTime = formatDateTime;
    function formatTime(a, withSec) {
        if (withSec === void 0) { withSec = false; }
        if (a == null)
            return '';
        if (typeof a == 'number') {
            if (withSec) {
                var hh = Math.floor(a / 10000);
                var mm = Math.floor((a % 10000) / 100);
                var is = (a % 10000) % 100;
                var sm = mm < 10 ? '0' + mm : '' + mm;
                var ss = is < 10 ? '0' + is : '' + is;
                return hh + ':' + sm + ':' + ss;
            }
            else {
                var hh = Math.floor(a / 100);
                var mm = a % 100;
                var sm = mm < 10 ? '0' + mm : '' + mm;
                return hh + ':' + sm;
            }
        }
        if (typeof a == 'string') {
            if (a.indexOf(':') > 0)
                return a;
            if (a.length < 3)
                return a + ':00';
            if (a.length >= 5)
                return a.substring(0, 2) + ':' + a.substring(2, 4) + ':' + a.substring(4);
            return a.substring(0, 2) + ':' + a.substring(2);
        }
        if (a instanceof Date) {
            var sh = a.getHours() < 10 ? '0' + a.getHours() : '' + a.getHours();
            var sp = a.getMinutes() < 10 ? '0' + a.getMinutes() : '' + a.getMinutes();
            if (withSec) {
                var ss = a.getSeconds() < 10 ? '0' + a.getSeconds() : '' + a.getSeconds();
                return sh + ':' + sp + ':' + ss;
            }
            return sh + ':' + sp;
        }
        return '';
    }
    WUX.formatTime = formatTime;
    function formatNum2(a, nz, z, neg) {
        if (a === '' || a == null)
            return '';
        var n = WUX.WUtil.toNumber(a);
        var r = ('' + (Math.round(n * 100) / 100)).replace('.', ',');
        if (nz != null && n != 0) {
            if (neg != null && n < 0)
                return neg.replace('$', r);
            return nz.replace('$', r);
        }
        if (z != null && n == 0)
            return z.replace('$', r);
        return r;
    }
    WUX.formatNum2 = formatNum2;
    function formatNum(a, nz, z, neg) {
        if (a === '' || a == null)
            return '';
        var n = WUX.WUtil.toNumber(a);
        var r = ('' + n).replace('.', ',');
        if (nz != null && n != 0) {
            if (neg != null && n < 0) {
                if (neg == 'l')
                    return n.toLocaleString('it-IT');
                return neg.replace('$', r);
            }
            if (nz == 'l')
                return n.toLocaleString('it-IT');
            return nz.replace('$', r);
        }
        if (z != null && n == 0)
            return z.replace('$', r);
        return r;
    }
    WUX.formatNum = formatNum;
    function formatCurr(a, nz, z, neg) {
        if (a === '' || a == null)
            return '';
        var n = WUX.WUtil.toNumber(a);
        var r = (Math.round(n * 100) / 100).toLocaleString('it-IT');
        var d = r.indexOf(',');
        if (d < 0)
            r += ',00';
        if (d == r.length - 2)
            r += '0';
        if (nz != null && n != 0) {
            if (neg != null && n < 0)
                return neg.replace('$', r);
            return nz.replace('$', r);
        }
        if (z != null && n == 0)
            return z.replace('$', r);
        return r;
    }
    WUX.formatCurr = formatCurr;
    function formatCurr5(a, nz, z, neg) {
        if (a === '' || a == null)
            return '';
        var n = WUX.WUtil.toNumber(a);
        var r = ('' + (Math.round(n * 100000) / 100000)).replace('.', ',');
        var d = r.indexOf(',');
        if (d < 0)
            r += ',00';
        if (d == r.length - 2)
            r += '0';
        if (d > 0) {
            var s1 = r.substring(0, d);
            var s2 = r.substring(d);
            var s3 = '';
            for (var i = 1; i <= s1.length; i++) {
                if (i > 3 && (i - 1) % 3 == 0)
                    s3 = '.' + s3;
                s3 = s1.charAt(s1.length - i) + s3;
            }
            r = s3 + s2;
        }
        if (nz != null && n != 0) {
            if (neg != null && n < 0)
                return neg.replace('$', r);
            return nz.replace('$', r);
        }
        if (z != null && n == 0)
            return z.replace('$', r);
        return r;
    }
    WUX.formatCurr5 = formatCurr5;
    function formatBoolean(a) {
        if (a == null)
            return '';
        return a ? 'S' : 'N';
    }
    WUX.formatBoolean = formatBoolean;
    function format(a) {
        if (a == null)
            return '';
        if (typeof a == 'string')
            return a;
        if (typeof a == 'boolean')
            return WUX.formatBoolean(a);
        if (typeof a == 'number') {
            var r = ('' + a);
            if (r.indexOf('.') >= 0)
                return WUX.formatCurr(a);
            return WUX.formatNum(a);
        }
        if (a instanceof Date)
            return WUX.formatDate(a);
        if (a instanceof WUX.WComponent) {
            return WUX.format(a.getState());
        }
        return '' + a;
    }
    WUX.format = format;
    function formatDay(d, e) {
        switch (d) {
            case 0: return e ? 'Domenica' : 'Dom';
            case 1: return e ? 'Luned&igrave;' : 'Lun';
            case 2: return e ? 'Marted&igrave;' : 'Mar';
            case 3: return e ? 'Mercoled&igrave;' : 'Mer';
            case 4: return e ? 'Giove&igrave;' : 'Gio';
            case 5: return e ? 'Venerd&igrave;' : 'Ven';
            case 6: return e ? 'Sabato' : 'Sab';
        }
        return '';
    }
    WUX.formatDay = formatDay;
    function formatMonth(m, e, y) {
        if (m > 100) {
            y = Math.floor(m / 100);
            m = m % 100;
        }
        y = y ? ' ' + y : '';
        switch (m) {
            case 1: return e ? 'Gennaio' + y : 'Gen' + y;
            case 2: return e ? 'Febbraio' + y : 'Feb' + y;
            case 3: return e ? 'Marzo' + y : 'Mar' + y;
            case 4: return e ? 'Aprile' + y : 'Apr' + y;
            case 5: return e ? 'Maggio' + y : 'Mag' + y;
            case 6: return e ? 'Giugno' + y : 'Giu' + y;
            case 7: return e ? 'Luglio' + y : 'Lug' + y;
            case 8: return e ? 'Agosto' + y : 'Ago' + y;
            case 9: return e ? 'Settembre' + y : 'Set' + y;
            case 10: return e ? 'Ottobre' + y : 'Ott' + y;
            case 11: return e ? 'Novembre' + y : 'Nov' + y;
            case 12: return e ? 'Dicembre' + y : 'Dic' + y;
        }
        return '';
    }
    WUX.formatMonth = formatMonth;
})(WUX || (WUX = {}));
var WUX;
(function (WUX) {
    var WContainer = (function (_super) {
        __extends(WContainer, _super);
        function WContainer(id, classStyle, style, attributes, inline, type) {
            var _this = _super.call(this, id ? id : '*', 'WContainer', type, classStyle, WUX.style(style), attributes) || this;
            _this.cint = [];
            _this.comp = [];
            _this.sr_c = [];
            _this.grid = [];
            _this.rootTag = inline ? 'span' : 'div';
            return _this;
        }
        WContainer.prototype.addRow = function (classStyle, style) {
            if (!classStyle)
                classStyle = 'row';
            var g = [];
            var s = WUX.style(style);
            if (s)
                classStyle += '^' + s;
            g.push(classStyle);
            this.grid.push(g);
            return this;
        };
        WContainer.prototype.addCol = function (classStyle, style) {
            if (!classStyle)
                classStyle = 'col-12';
            if (!isNaN(parseInt(classStyle)))
                classStyle = 'col-' + classStyle;
            if (!this.grid.length)
                this.addRow();
            var g = this.grid[this.grid.length - 1];
            var s = WUX.style(style);
            if (s)
                classStyle += '^' + s;
            g.push(classStyle);
            return this;
        };
        WContainer.prototype.add = function (component, constraints) {
            if (!component)
                return this;
            if (!this.grid.length) {
                this.cint.push(component);
                return this;
            }
            if (constraints == 'push') {
                this.cint.push(component);
                return this;
            }
            if (constraints == 'unshift') {
                this.cint.unshift(component);
                return this;
            }
            var r = this.grid.length - 1;
            if (constraints) {
                var x = parseInt(constraints);
                if (!isNaN(x)) {
                    if (x < 0) {
                        this.cint.push(component);
                        return this;
                    }
                    else {
                        r = x;
                    }
                }
            }
            var g = this.grid[r];
            var c = g.length - 1;
            this.comp.push(component);
            this.sr_c.push(this.subId(r + '_' + c));
            return this;
        };
        WContainer.prototype.addGroup = function (w) {
            var ac = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                ac[_i - 1] = arguments[_i];
            }
            if (w) {
                var cnt = this.addContainer(w);
                if (!ac || !ac.length)
                    return this;
                for (var _a = 0, ac_1 = ac; _a < ac_1.length; _a++) {
                    var c = ac_1[_a];
                    if (c)
                        cnt.add(c);
                }
                return this;
            }
            if (!ac || !ac.length)
                return this;
            for (var _b = 0, ac_2 = ac; _b < ac_2.length; _b++) {
                var c = ac_2[_b];
                if (c)
                    this.add(c);
            }
            return this;
        };
        WContainer.prototype.addContainer = function (w, constraints) {
            var c = new WContainer();
            if (w) {
                c.classStyle = WUX.cls(w.classStyle, w.style);
                c.style = WUX.style(w.style);
                c.attributes = w.attributes;
            }
            this.add(c, constraints);
            return c;
        };
        WContainer.prototype.render = function () {
            var inner = '';
            var rm = this.grid.length;
            if (rm) {
                for (var r = 0; r < rm; r++) {
                    var g = this.grid[r];
                    var cm = g.length;
                    if (!cm)
                        continue;
                    inner += '<div ' + this.cs(g[0]) + '>';
                    for (var c = 1; c < cm; c++) {
                        inner += '<div id="' + this.subId(r + '_' + c) + '" ' + this.cs(g[c]) + '></div>';
                    }
                    inner += "</div>";
                }
            }
            return this.buildRoot(this.rootTag, inner);
        };
        WContainer.prototype.componentDidMount = function () {
            for (var i = 0; i < this.cint.length; i++) {
                var c = this.cint[i];
                c.mount(this.root);
            }
            for (var i = 0; i < this.comp.length; i++) {
                var c = this.comp[i];
                var e = document.getElementById(this.sr_c[i]);
                if (!e)
                    continue;
                c.mount(e);
            }
        };
        WContainer.prototype.componentWillUnmount = function () {
            for (var _i = 0, _a = this.comp; _i < _a.length; _i++) {
                var c = _a[_i];
                c.unmount();
            }
        };
        WContainer.prototype.cs = function (cs) {
            if (!cs)
                return '';
            var x = cs.indexOf('^');
            if (x < 0)
                return 'class="' + cs + '"';
            var c = cs.substring(0, x);
            var s = cs.substring(x + 1);
            return 'class="' + c + '" style="' + s + '"';
        };
        return WContainer;
    }(WUX.WComponent));
    WUX.WContainer = WContainer;
    var WLink = (function (_super) {
        __extends(WLink, _super);
        function WLink(id, text, icon, classStyle, style, attributes, href, target) {
            var _this = _super.call(this, id ? id : '*', 'WLink', icon, classStyle, style, attributes) || this;
            _this.updateState(text);
            _this.rootTag = 'a';
            _this._href = href;
            _this._target = target;
            return _this;
        }
        Object.defineProperty(WLink.prototype, "icon", {
            get: function () {
                return this.props;
            },
            set: function (s) {
                this.update(s, this.state, true, false, false);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WLink.prototype, "href", {
            get: function () {
                return this._href;
            },
            set: function (s) {
                this._href = s;
                if (this.root) {
                    if (s) {
                        this.root.setAttribute('href', s);
                    }
                    else {
                        this.root.removeAttribute('href');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WLink.prototype, "target", {
            get: function () {
                return this._target;
            },
            set: function (s) {
                this._target = s;
                if (this.root) {
                    if (s) {
                        this.root.setAttribute('target', s);
                    }
                    else {
                        this.root.removeAttribute('target');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        WLink.prototype.render = function () {
            var addAttributes = '';
            if (this._href)
                addAttributes += 'href="' + this._href + '"';
            if (this._target) {
                if (addAttributes)
                    addAttributes += ' ';
                addAttributes += 'target="' + this._target + '"';
            }
            var html = '';
            if (this.state) {
                html += WUX.buildIcon(this.icon, '', ' ') + this.state;
            }
            else {
                html += WUX.buildIcon(this.icon);
            }
            return this.build(this.rootTag, html, addAttributes);
        };
        WLink.prototype.componentDidMount = function () {
            if (this._tooltip)
                this.root.setAttribute('title', this._tooltip);
        };
        WLink.prototype.componentWillUpdate = function (nextProps, nextState) {
            var html = '';
            if (nextState) {
                html += WUX.buildIcon(this.icon, '', ' ') + nextState;
            }
            else {
                html += WUX.buildIcon(this.icon);
            }
            this.root.innerHTML = html;
        };
        return WLink;
    }(WUX.WComponent));
    WUX.WLink = WLink;
    var WLabel = (function (_super) {
        __extends(WLabel, _super);
        function WLabel(id, text, icon, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'WLabel', icon, classStyle, style, attributes) || this;
            _this.rootTag = 'span';
            _this.updateState(text);
            return _this;
        }
        Object.defineProperty(WLabel.prototype, "icon", {
            get: function () {
                return this.props;
            },
            set: function (i) {
                this.update(i, this.state, true, false, false);
            },
            enumerable: false,
            configurable: true
        });
        WLabel.prototype.updateState = function (nextState) {
            if (!nextState)
                nextState = '';
            _super.prototype.updateState.call(this, nextState);
            if (this.root)
                this.root.innerHTML = WUX.buildIcon(this.props, '', ' ') + nextState;
        };
        WLabel.prototype.for = function (e) {
            this.forId = WUX.getId(e);
            return this;
        };
        WLabel.prototype.render = function () {
            var text = this.state ? this.state : '';
            if (this.forId)
                return this.buildRoot('label', WUX.buildIcon(this.props, '', ' ') + text, 'for="' + this.forId + '"', this._classStyle);
            return this.buildRoot(this.rootTag, WUX.buildIcon(this.props, '', ' ') + text, null, this._classStyle);
        };
        WLabel.prototype.componentDidMount = function () {
            if (this._tooltip)
                this.root.setAttribute('title', this._tooltip);
        };
        return WLabel;
    }(WUX.WComponent));
    WUX.WLabel = WLabel;
    var WInput = (function (_super) {
        __extends(WInput, _super);
        function WInput(id, type, size, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'WInput', type, classStyle, style, attributes) || this;
            _this.rootTag = 'input';
            _this.size = size;
            _this.valueType = 's';
            return _this;
        }
        WInput.prototype.updateState = function (nextState) {
            if (!nextState)
                nextState = '';
            _super.prototype.updateState.call(this, nextState);
            if (this.root)
                this.root['value'] = nextState;
        };
        WInput.prototype.getState = function () {
            if (this.root) {
                this.state = this.root['value'];
            }
            return this.state;
        };
        WInput.prototype.render = function () {
            var l = '';
            if (this.label) {
                l = this.id ? '<label for="' + this.id + '">' : '<label>';
                var br = this.label.lastIndexOf('<br');
                if (br > 0) {
                    l += this.label.substring(0, br).replace('<', '&lt;').replace('>', '&gt;');
                    l += '</label><br>';
                }
                else {
                    l += this.label.replace('<', '&lt;').replace('>', '&gt;');
                    l += '</label> ';
                }
            }
            if (this.props == 'static') {
                return l + this.build('span', this.state);
            }
            else {
                var addAttributes = 'name="' + this.id + '"';
                addAttributes += this.props ? ' type="' + this.props + '"' : ' type="text"';
                if (this.size)
                    addAttributes += ' size="' + this.size + '"';
                if (this.state)
                    addAttributes += ' value="' + this.state + '"';
                if (this.placeHolder)
                    addAttributes += ' placeholder="' + this.placeHolder + '"';
                return l + this.build(this.rootTag, '', addAttributes);
            }
        };
        return WInput;
    }(WUX.WComponent));
    WUX.WInput = WInput;
    var WTextArea = (function (_super) {
        __extends(WTextArea, _super);
        function WTextArea(id, rows, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'WTextArea', rows, classStyle, style, attributes) || this;
            _this.rootTag = 'textarea';
            if (!rows)
                _this.props = 5;
            return _this;
        }
        WTextArea.prototype.updateState = function (nextState) {
            if (!nextState)
                nextState = '';
            _super.prototype.updateState.call(this, nextState);
            if (this.root)
                this.root['value'] = nextState;
        };
        WTextArea.prototype.getState = function () {
            if (this.root) {
                this.state = this.root['value'];
            }
            return this.state;
        };
        WTextArea.prototype.render = function () {
            if (!this.props)
                this.props = 1;
            if (this._style) {
                if (this._style.indexOf('width') < 0) {
                    this._style += ';width:100%';
                }
            }
            else {
                this._style = 'width:100%';
            }
            if (this._attributes) {
                if (this._style.indexOf('rows=') < 0) {
                    this._attributes += ' rows="' + this.props + '"';
                }
            }
            else {
                this._attributes = 'rows="' + this.props + '"';
            }
            return WUX.build('textarea', '', this._style, this._attributes, this.id, this._classStyle);
        };
        WTextArea.prototype.componentDidMount = function () {
            if (this._tooltip)
                this.root.setAttribute('title', this._tooltip);
            if (this.state)
                this.root.setAttribute('value', this.state);
        };
        return WTextArea;
    }(WUX.WComponent));
    WUX.WTextArea = WTextArea;
    var WButton = (function (_super) {
        __extends(WButton, _super);
        function WButton(id, text, icon, classStyle, style, attributes, type) {
            var _this = _super.call(this, id ? id : '*', 'WButton', icon, classStyle, style, attributes) || this;
            _this.updateState(text);
            _this.rootTag = 'button';
            _this.type = type ? type : 'button';
            return _this;
        }
        Object.defineProperty(WButton.prototype, "icon", {
            get: function () {
                return this.props;
            },
            set: function (i) {
                this.update(i, this.state, true, false, false);
            },
            enumerable: false,
            configurable: true
        });
        WButton.prototype.setText = function (text, icon) {
            if (icon != null)
                this.props = icon;
            this.setState(text);
        };
        WButton.prototype.render = function () {
            var addAttributes = this.type ? 'type="' + this.type + '"' : '';
            var html = '';
            if (this.state) {
                html += WUX.buildIcon(this.props, '', ' ') + this.state;
            }
            else {
                html += WUX.buildIcon(this.props);
            }
            return this.build(this.rootTag, html, addAttributes);
        };
        WButton.prototype.componentDidMount = function () {
            if (this._tooltip)
                this.root.setAttribute('title', this._tooltip);
        };
        WButton.prototype.componentWillUpdate = function (nextProps, nextState) {
            var html = '';
            if (nextState) {
                html += WUX.buildIcon(this.props, '', ' ') + nextState;
            }
            else {
                html += WUX.buildIcon(this.props);
            }
            this.root.innerHTML = html;
        };
        return WButton;
    }(WUX.WComponent));
    WUX.WButton = WButton;
    var WCheck = (function (_super) {
        __extends(WCheck, _super);
        function WCheck(id, text, value, checked, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'WCheck', checked, classStyle, style, attributes) || this;
            _this.rootTag = 'input';
            _this.value = value ? value : '1';
            if (checked)
                _this.updateState(value);
            _this._text = text;
            return _this;
        }
        Object.defineProperty(WCheck.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (s) {
                this._text = s;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WCheck.prototype, "checked", {
            get: function () {
                if (this.root)
                    this.props = !!this.root['checked'];
                this.state = this.props ? this.value : undefined;
                return this.props;
            },
            set: function (b) {
                this.setProps(b);
            },
            enumerable: false,
            configurable: true
        });
        WCheck.prototype.getState = function () {
            if (this.root)
                this.props = !!this.root['checked'];
            this.state = this.props ? this.value : undefined;
            return this.state;
        };
        WCheck.prototype.updateProps = function (nextProps) {
            _super.prototype.updateProps.call(this, nextProps);
            this.state = this.props ? this.value : undefined;
            if (this.root) {
                if (this.props) {
                    this.root.setAttribute('checked', 'checked');
                }
                else {
                    this.root.removeAttribute('checked');
                }
            }
        };
        WCheck.prototype.updateState = function (nextState) {
            if (typeof nextState == 'boolean') {
                nextState = nextState ? this.value : undefined;
            }
            _super.prototype.updateState.call(this, nextState);
            this.props = this.state != undefined;
            if (this.root) {
                if (this.props) {
                    this.root.setAttribute('checked', 'checked');
                }
                else {
                    this.root.removeAttribute('checked');
                }
            }
        };
        WCheck.prototype.render = function () {
            var addAttributes = 'name="' + this.id + '" type="checkbox"';
            addAttributes += this.props ? ' checked="checked"' : '';
            var inner = this._text ? '&nbsp;' + this._text : '';
            return this.build(this.rootTag, inner, addAttributes);
        };
        WCheck.prototype.componentDidMount = function () {
            var _this = this;
            if (this._tooltip)
                this.root.setAttribute('title', this._tooltip);
            this._obs = new MutationObserver(function () {
                _this.props = !!_this.root['checked'];
                _this.trigger('propschange', _this.props);
                _this.trigger('statechange', _this.props ? _this.value : undefined);
            });
        };
        return WCheck;
    }(WUX.WComponent));
    WUX.WCheck = WCheck;
    var WSelect = (function (_super) {
        __extends(WSelect, _super);
        function WSelect(id, options, multiple, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'WSelect', null, classStyle, style, attributes) || this;
            _this.rootTag = 'select';
            _this.options = options;
            _this.multiple = multiple;
            return _this;
        }
        WSelect.prototype.getProps = function () {
            if (!this.root)
                return this.props;
            this.props = [];
            var options = this.root["options"];
            if (options && options.length) {
                var s = WUX.WUtil.toNumber(this.root["selectedIndex"], -1);
                if (s >= 0 && options.length > s) {
                    this.props.push(options[s].text);
                }
            }
            return this.props;
        };
        WSelect.prototype.select = function (i) {
            if (!this.root || !this.options)
                return this;
            this.setState(this.options.length > i ? this.options[i] : null);
            return this;
        };
        WSelect.prototype.addOption = function (e, sel) {
            if (!e)
                return this;
            if (!this.options)
                this.options = [];
            this.options.push(e);
            if (!this.mounted)
                return this;
            var o = this.buildOptions();
            this.root.innerHTML = o;
            if (sel)
                this.updateState(e);
            return this;
        };
        WSelect.prototype.remOption = function (e) {
            if (!e || !this.options)
                return this;
            var x = -1;
            for (var i = 0; i < this.options.length; i++) {
                var s = this.options[i];
                if (!s)
                    continue;
                if (typeof e == 'string') {
                    if (typeof s == 'string') {
                        if (s == e) {
                            x = i;
                            break;
                        }
                    }
                    else {
                        if (s.id == e) {
                            x = i;
                            break;
                        }
                    }
                }
                else {
                    if (typeof s == 'string') {
                        if (s == e.id) {
                            x = i;
                            break;
                        }
                    }
                    else {
                        if (s.id == e.id) {
                            x = i;
                            break;
                        }
                    }
                }
            }
            if (x >= 0) {
                this.options.splice(x, 1);
                if (!this.mounted)
                    return this;
                var o = this.buildOptions();
                this.root.innerHTML = o;
            }
            return this;
        };
        WSelect.prototype.setOptions = function (options, prevVal) {
            this.options = options;
            if (!this.mounted)
                return this;
            var pv = this.root["value"];
            var o = this.buildOptions();
            this.root.innerHTML = o;
            if (prevVal) {
                this.root["value"] = pv;
            }
            else if (options && options.length) {
                if (typeof options[0] == 'string') {
                    this.trigger('statechange', options[0]);
                }
                else {
                    this.trigger('statechange', WUX.WUtil.getString(options[0], 'id'));
                }
            }
            return this;
        };
        WSelect.prototype.updateState = function (nextState) {
            _super.prototype.updateState.call(this, nextState);
            if (this.root) {
                if (this.state == null) {
                    this.root["value"] = '';
                }
                else if (typeof this.state == 'string' || typeof this.state == 'number') {
                    this.root["value"] = '' + this.state;
                }
                else {
                    this.root["value"] = this.state.id;
                }
            }
        };
        WSelect.prototype.render = function () {
            var o = this.buildOptions();
            var addAttributes = 'name="' + this.id + '"';
            if (this.multiple)
                addAttributes += ' multiple="multiple"';
            return this.buildRoot('select', o, addAttributes);
        };
        WSelect.prototype.componentDidMount = function () {
            var _this = this;
            if (this._tooltip)
                this.root.setAttribute('title', this._tooltip);
            if (this.state)
                this.root["value"] = this.state;
            this.root.addEventListener('change', function () {
                _this.trigger('statechange', _this.root["value"]);
            });
        };
        WSelect.prototype.buildOptions = function () {
            var r = '';
            if (!this.options)
                this.options = [];
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var opt = _a[_i];
                if (typeof opt == 'string') {
                    r += '<option>' + opt + '</option>';
                }
                else {
                    r += '<option value="' + opt.id + '">' + opt.text + '</option>';
                }
            }
            return r;
        };
        return WSelect;
    }(WUX.WComponent));
    WUX.WSelect = WSelect;
    var WTable = (function (_super) {
        __extends(WTable, _super);
        function WTable(id, header, keys, classStyle, style, attributes, props) {
            var _this = _super.call(this, id ? id : '*', 'WTable', props, classStyle, style, attributes) || this;
            _this.rootTag = 'table';
            _this.header = header;
            if (keys && keys.length) {
                _this.keys = keys;
            }
            else {
                _this.keys = [];
                if (_this.header)
                    for (var i = 0; i < _this.header.length; i++)
                        _this.keys.push(i);
            }
            _this.widths = [];
            return _this;
        }
        WTable.prototype.render = function () {
            if (!this.shouldBuildRoot())
                return undefined;
            var tableClass = 'table';
            if (this._classStyle)
                tableClass = this._classStyle.indexOf('table ') >= 0 ? this._classStyle : tableClass + ' ' + this._classStyle;
            var ts = this.style ? ' style="' + this.style + '"' : '';
            var r = '';
            if (this.div)
                r += '<div id="' + this.id + '-c" class="' + this.div + '">';
            r += '<table id="' + this.id + '" class="' + tableClass + '"' + ts + '>';
            if (this.header && this.header.length) {
                var ths = false;
                if (typeof this.headStyle == 'string') {
                    if (this.headStyle.indexOf('text-align') > 0)
                        ths = true;
                }
                else if (this.headStyle && this.headStyle.a) {
                    ths = true;
                }
                if (!this.hideHeader) {
                    if (ths) {
                        r += '<thead id="' + this.id + '-h"><tr>';
                    }
                    else {
                        r += '<thead id="' + this.id + '-h"><tr' + WUX.buildCss(this.headStyle) + '>';
                    }
                    var j = -1;
                    for (var _i = 0, _a = this.header; _i < _a.length; _i++) {
                        var h = _a[_i];
                        j++;
                        var s = void 0;
                        if (j == 0) {
                            s = this.col0Style ? this.col0Style : this.colStyle;
                        }
                        else if (j == this.header.length - 1) {
                            s = this.colLStyle ? this.colLStyle : this.colStyle;
                        }
                        else {
                            s = ths ? this.headStyle : this.colStyle;
                        }
                        var w = this.widths && this.widths.length > j ? this.widths[j] : 0;
                        var x = {};
                        if (w)
                            x.w = this.widthsPerc ? w + '%' : w;
                        var t = this.getType(j);
                        if (t == 'w')
                            x.a = 'center';
                        r += '<th' + WUX.buildCss(s, x) + '>' + h + '</th>';
                    }
                    r += '</tr></thead>';
                }
            }
            r += '<tbody id="' + this.id + '-b"></tbody>';
            r += '</table>';
            if (this.div)
                r += '</div>';
            return r;
        };
        WTable.prototype.componentDidMount = function () {
            this.buildBody();
        };
        WTable.prototype.componentDidUpdate = function (prevProps, prevState) {
            this.buildBody();
        };
        WTable.prototype.getType = function (i) {
            if (!this.types)
                return '';
            if (this.types.length <= i)
                return '';
            return this.types[i];
        };
        WTable.prototype.buildBody = function () {
            var tbody = document.getElementById(this.id + "-b");
            if (!tbody)
                return;
            if (!this.state || !this.state.length) {
                tbody.innerHTML = '';
                return;
            }
            if (!this.keys || !this.keys.length) {
                tbody.innerHTML = '';
                return;
            }
            var b = '';
            var i = -1;
            for (var _i = 0, _a = this.state; _i < _a.length; _i++) {
                var row = _a[_i];
                i++;
                var r = '';
                if (i == this.state.length - 1) {
                    if (this.footerStyle) {
                        r = '<tr' + WUX.buildCss(this.footerStyle) + '>';
                    }
                    else {
                        r = '<tr' + WUX.buildCss(this.rowStyle) + '>';
                    }
                }
                else {
                    r = '<tr' + WUX.buildCss(this.rowStyle) + '>';
                }
                b += r;
                var j = -1;
                for (var _b = 0, _c = this.keys; _b < _c.length; _b++) {
                    var key = _c[_b];
                    var v = row[key];
                    var align = '';
                    if (v == null)
                        v = '';
                    j++;
                    var t = this.getType(j);
                    switch (t) {
                        case 'w':
                            align = 'text-center';
                            break;
                        case 'c':
                        case 'c5':
                        case 'i':
                        case 'n':
                            align = 'text-right';
                            break;
                        case 'b':
                            v = v ? '&check;' : '';
                            break;
                        default:
                            if (v instanceof Date)
                                v = v.toLocaleDateString();
                            if (typeof v == 'boolean')
                                v = v ? '&check;' : '';
                            if (typeof v == 'number') {
                                align = 'text-right';
                            }
                    }
                    var s = void 0;
                    if (j == 0) {
                        s = this.col0Style ? this.col0Style : this.colStyle;
                    }
                    else if (j == this.header.length - 1) {
                        s = this.colLStyle ? this.colLStyle : this.colStyle;
                    }
                    else {
                        s = this.colStyle;
                    }
                    if (typeof s == 'string') {
                        if (s.indexOf('text-align') > 0)
                            align = '';
                    }
                    else if (s && s.a) {
                        align = '';
                    }
                    var w = this.widths && this.widths.length > j ? this.widths[j] : 0;
                    b += '<td' + WUX.buildCss(s, align, { w: w }) + '>' + v + '</td>';
                }
                if (this.header && this.header.length > this.keys.length) {
                    for (var i_1 = 0; i_1 < this.header.length - this.keys.length; i_1++) {
                        b += '<td' + WUX.buildCss(this.colStyle) + '></td>';
                    }
                }
                b += '</tr>';
                tbody.innerHTML = b;
            }
        };
        return WTable;
    }(WUX.WComponent));
    WUX.WTable = WTable;
    var WFormPanel = (function (_super) {
        __extends(WFormPanel, _super);
        function WFormPanel(id, title, action) {
            var _this = _super.call(this, id ? id : '*', 'WFormPanel') || this;
            _this.rootTag = 'form';
            if (action) {
                _this._attributes = 'role="form" name="' + _this.id + '" action="' + action + '"';
            }
            else {
                _this._attributes = 'role="form" name="' + _this.id + '" action="javascript:void(0);"';
            }
            _this.title = title;
            if (WUX.CSS.FORM) {
                if (WUX.CSS.FORM.indexOf(':') > 0) {
                    _this.style = WUX.CSS.FORM;
                }
                else {
                    _this.classStyle = WUX.CSS.FORM;
                }
            }
            _this.init();
            return _this;
        }
        WFormPanel.prototype.init = function () {
            this.rows = [];
            this.roww = [];
            this.currRow = null;
            this.addRow();
            return this;
        };
        WFormPanel.prototype.focus = function () {
            if (!this.mounted)
                return this;
            var f = this.first(true);
            if (f) {
                if (f.component) {
                    f.component.focus();
                }
                else if (f.element instanceof HTMLElement) {
                    f.element.focus();
                }
            }
            return this;
        };
        WFormPanel.prototype.first = function (enabled) {
            if (!this.rows)
                return null;
            for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
                var row = _a[_i];
                for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                    var f = row_1[_b];
                    if (enabled) {
                        if (f.enabled == null || f.enabled) {
                            if (f.readonly == null || !f.readonly)
                                return f;
                        }
                    }
                    else {
                        return f;
                    }
                }
            }
            return null;
        };
        WFormPanel.prototype.focusOn = function (fieldId) {
            if (!this.mounted)
                return this;
            var f = this.getField(fieldId);
            if (!f)
                return this;
            if (f.component) {
                f.component.focus();
            }
            else if (f.element instanceof HTMLElement) {
                f.element.focus();
            }
            return this;
        };
        WFormPanel.prototype.getField = function (fid) {
            if (!fid)
                return;
            var sid = fid.indexOf(this.id + '-') == 0 ? fid : this.subId(fid);
            for (var i = 0; i < this.rows.length; i++) {
                var row = this.rows[i];
                for (var j = 0; j < row.length; j++) {
                    var f = row[j];
                    if (f.id == sid)
                        return f;
                }
            }
            return;
        };
        WFormPanel.prototype.addRow = function (classStyle, style, id, attributes, type) {
            if (type === void 0) { type = 'row'; }
            if (this.currRow && !this.currRow.length) {
                this.roww[this.roww.length - 1] = {
                    classStyle: classStyle,
                    style: style,
                    id: id,
                    attributes: WUX.attributes(attributes),
                    type: type
                };
                return this;
            }
            this.currRow = [];
            this.rows.push(this.currRow);
            this.roww.push({
                classStyle: classStyle,
                style: style,
                id: id,
                attributes: WUX.attributes(attributes),
                type: type
            });
            return this;
        };
        WFormPanel.prototype.addTextField = function (fieldId, label, readonly) {
            var id = this.subId(fieldId);
            var co = new WInput(id, 'text', 0, WUX.CSS.FORM_CTRL);
            this.currRow.push({ 'id': id, 'label': label, 'component': co, 'readonly': readonly });
            return this;
        };
        WFormPanel.prototype.addNoteField = function (fieldId, label, rows, readonly) {
            if (!rows)
                rows = 3;
            var id = this.subId(fieldId);
            var co = new WTextArea(id, rows, WUX.CSS.FORM_CTRL);
            this.currRow.push({ 'id': id, 'label': label, 'component': co, 'readonly': readonly });
            return this;
        };
        WFormPanel.prototype.addDateField = function (fieldId, label, readonly) {
            var id = this.subId(fieldId);
            var co = new WInput(id, 'date', 0, WUX.CSS.FORM_CTRL);
            this.currRow.push({ 'id': id, 'label': label, 'component': co, 'readonly': readonly });
            return this;
        };
        WFormPanel.prototype.addOptionsField = function (fieldId, label, options, attributes, readonly) {
            var id = this.subId(fieldId);
            var co = new WSelect(id, options, false, WUX.CSS.FORM_CTRL, '', attributes);
            this.currRow.push({ 'id': id, 'label': label, 'component': co, 'readonly': readonly });
            return this;
        };
        WFormPanel.prototype.addBooleanField = function (fieldId, label) {
            var id = this.subId(fieldId);
            var co = new WCheck(id, '');
            co.classStyle = WUX.CSS.FORM_CTRL;
            this.currRow.push({ 'id': id, 'label': label, 'component': co });
            return this;
        };
        WFormPanel.prototype.addBlankField = function (label, classStyle, style) {
            var co = new WContainer('', classStyle, style);
            this.currRow.push({ 'id': '', 'label': label, 'component': co, 'classStyle': classStyle, 'style': style });
            return this;
        };
        WFormPanel.prototype.addInternalField = function (fieldId, value) {
            if (value === undefined)
                value = null;
            this.currRow.push({ 'id': this.subId(fieldId), 'value': value });
            return this;
        };
        WFormPanel.prototype.addComponent = function (fieldId, label, component) {
            if (!component)
                return this;
            if (fieldId) {
                component.id = this.subId(fieldId);
                this.currRow.push({ 'id': this.subId(fieldId), 'label': label, 'component': component });
            }
            else {
                component.id = '';
                this.currRow.push({ 'id': '', 'label': label, 'component': component });
            }
            return this;
        };
        WFormPanel.prototype.componentDidMount = function () {
            this.main = new WContainer(this.id + '-c');
            for (var i = 0; i < this.rows.length; i++) {
                var w = this.roww[i];
                this.main.addRow(WUX.cls(w.type, w.classStyle, w.style), WUX.style(w.style));
                var row = this.rows[i];
                var cols = 0;
                for (var j = 0; j < row.length; j++) {
                    var f = row[j];
                    if (!f.component)
                        continue;
                    cols += f.span && f.span > 0 ? f.span : 1;
                }
                var g = !!WUX.CSS.FORM_GROUP;
                for (var j = 0; j < row.length; j++) {
                    var f = row[j];
                    if (!f.component)
                        continue;
                    var cs = Math.floor(12 / cols);
                    if (cs < 1)
                        cs = 1;
                    if ((cs == 1 && cols < 11) && (j == 0 || j == cols - 1))
                        cs = 2;
                    if (f.span && f.span > 0)
                        cs = cs * f.span;
                    this.main.addCol('' + cs);
                    f.component.setState(f.value);
                    if (f.component instanceof WCheck) {
                        if (!this.checkboxStyle) {
                            var s = getComputedStyle(this.context).getPropertyValue('font-size');
                            var ch = Math.round(0.8 * parseInt(s));
                            if (isNaN(ch) || ch < 18)
                                ch = 18;
                            this.checkboxStyle = 'height:' + ch + 'px;';
                        }
                        f.component.style = this.checkboxStyle;
                    }
                    if (f.label && !f.labelComp) {
                        var l = new WLabel(f.id + '-l', f.label, '', f.classStyle);
                        f.labelComp = l.for(f.id);
                    }
                    if (g) {
                        this.main.addGroup({ classStyle: WUX.CSS.FORM_GROUP }, f.labelComp, f.component);
                    }
                    else {
                        this.main.add(f.labelComp);
                        this.main.add(f.component);
                    }
                }
            }
            this.main.mount(this.root);
        };
        WFormPanel.prototype.componentWillUnmount = function () {
            if (!this.main)
                this.main.unmount();
        };
        WFormPanel.prototype.clear = function () {
            if (this.debug)
                console.log('WUX.WFormPanel.clear');
            for (var i = 0; i < this.rows.length; i++) {
                var row = this.rows[i];
                for (var j = 0; j < row.length; j++) {
                    var f = row[j];
                    if (f.component)
                        f.component.setState(null);
                    f.value = null;
                }
            }
            return this;
        };
        WFormPanel.prototype.setValue = function (fid, v, updState) {
            if (updState === void 0) { updState = true; }
            var f = this.getField(fid);
            if (!f)
                return this;
            if (f.component)
                f.component.setState(v);
            f.value = v;
            if (updState) {
                if (!this.state)
                    this.state = {};
                this.state[fid] = v;
            }
            return this;
        };
        WFormPanel.prototype.getValue = function (fid) {
            var f = typeof fid == 'string' ? this.getField(fid) : fid;
            if (!f)
                return null;
            if (f.component)
                return f.component.getState();
            return f.value;
        };
        WFormPanel.prototype.getValues = function () {
            var r = {};
            for (var i = 0; i < this.rows.length; i++) {
                var row = this.rows[i];
                for (var j = 0; j < row.length; j++) {
                    var f = row[j];
                    r[this.ripId(f.id)] = f.component ? f.component.getState() : f.value;
                }
            }
            return r;
        };
        WFormPanel.prototype.getState = function () {
            this.state = this.getValues();
            return this.state;
        };
        WFormPanel.prototype.updateState = function (nextState) {
            _super.prototype.updateState.call(this, nextState);
            if (!nextState || WUX.WUtil.isEmpty(nextState)) {
                this.clear();
            }
            else {
                this.updateView();
            }
        };
        WFormPanel.prototype.updateView = function () {
            if (this.debug)
                console.log('WUX.WFormPanel.updateView()');
            if (!this.state) {
                this.clear();
                return;
            }
            for (var id in this.state) {
                this.setValue(id, this.state[id], false);
            }
        };
        return WFormPanel;
    }(WUX.WComponent));
    WUX.WFormPanel = WFormPanel;
})(WUX || (WUX = {}));
//# sourceMappingURL=wux.js.map