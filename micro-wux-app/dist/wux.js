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
        else if (e instanceof HTMLElement) {
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
            if (id instanceof HTMLElement) {
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
                if (this.root) {
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
            if (this.root)
                this.root.focus();
            return this;
        };
        WComponent.prototype.blur = function () {
            if (this.internal)
                this.internal.blur();
            if (this.root)
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
            if (this.root)
                this.root.remove();
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
                        else if (r instanceof HTMLElement) {
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
                            if (lc instanceof HTMLElement) {
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
        if (e instanceof HTMLElement)
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
        if (a instanceof HTMLElement) {
            return 'HTMLElement#' + a.id;
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
        else if (c instanceof HTMLElement) {
            return c.tagName;
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
        else if (e instanceof HTMLElement) {
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
})(WUX || (WUX = {}));
var WUX;
(function (WUX) {
    var _data = {};
    var _dccb = {};
    WUX.global = {
        locale: 'it',
        main_class: 'container-fluid',
        con_class: 'container',
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
})(WUX || (WUX = {}));
var WUX;
(function (WUX) {
    var WHtml = (function (_super) {
        __extends(WHtml, _super);
        function WHtml(html) {
            return _super.call(this, null, 'WHtml', html) || this;
        }
        WHtml.prototype.render = function () {
            if (!this.props)
                return "<span></span>";
            if (this.props.charAt(0) != '<') {
                this.props = "<span>" + this.props + "</span>";
            }
            return this.props;
        };
        return WHtml;
    }(WUX.WComponent));
    WUX.WHtml = WHtml;
    var WContainer = (function (_super) {
        __extends(WContainer, _super);
        function WContainer(id, classStyle, style, attributes, inline, type) {
            var _this = _super.call(this, id, 'WContainer', type, classStyle, WUX.style(style), attributes) || this;
            _this.components = [];
            _this.rootTag = inline ? 'span' : 'div';
            if (type == 'aside')
                _this.rootTag = 'aside';
            return _this;
        }
        WContainer.prototype.end = function () {
            if (this.parent instanceof WContainer)
                return this.parent.end();
            return this;
        };
        WContainer.prototype.grid = function () {
            if (this.props == 'row' && this.parent instanceof WContainer)
                return this.parent;
            if (this.parent instanceof WContainer)
                return this.parent.grid();
            return this;
        };
        WContainer.prototype.row = function () {
            if (this.props == 'row')
                return this;
            if (!this.parent) {
                if (!this.components || !this.components.length)
                    return this;
                for (var i = this.components.length - 1; i >= 0; i--) {
                    var c = this.components[i];
                    if (c instanceof WContainer && c.getProps() == 'row')
                        return c;
                }
                return this;
            }
            if (this.parent instanceof WContainer)
                return this.parent.row();
            return this;
        };
        WContainer.prototype.col = function () {
            if (this.props == 'col')
                return this;
            if (this.parent instanceof WContainer)
                return this.parent.col();
            return this;
        };
        WContainer.prototype.add = function (component) {
            if (!component)
                return this;
            if (component instanceof WUX.WComponent) {
                if (!component.parent)
                    component.parent = this;
            }
            var c;
            if (typeof component == 'string' && component.length > 0) {
                if (component.charAt(0) == '<' && component.charAt(component.length - 1) == '>') {
                    c = new WHtml(component);
                }
            }
            if (!c)
                c = component;
            this.components.push(c);
            return this;
        };
        WContainer.prototype.remove = function (index) {
            if (index < 0)
                index = this.components.length + index;
            if (index < 0 || index >= this.components.length)
                return undefined;
            this.components.splice(index, 1);
            return this;
        };
        WContainer.prototype.removeAll = function () {
            if (this.mounted) {
                this.parent = null;
                for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
                    var c = _a[_i];
                    if (c instanceof WUX.WComponent)
                        c.unmount();
                }
            }
            this.components = [];
            return this;
        };
        WContainer.prototype.addRow = function (classStyle, style, id, attributes) {
            var classRow = classStyle == null ? 'row' : classStyle;
            var row = new WContainer(id, classRow, style, attributes, false, 'row');
            row.name = row.name + '_row';
            return this.grid().addContainer(row);
        };
        WContainer.prototype.addCol = function (classStyle, style, id, attributes) {
            if (!isNaN(parseInt(classStyle)))
                classStyle = 'col-md-' + classStyle;
            var classCol = classStyle == null ? 'col' : classStyle;
            var col = new WContainer(id, classCol, style, attributes, false, 'col');
            col.name = col.name + '_col';
            return this.row().addContainer(col);
        };
        WContainer.prototype.addText = function (text, rowTag, classStyle, style, id, attributes) {
            if (!text || !text.length)
                return this;
            var endRow = '';
            if (rowTag) {
                var i = rowTag.indexOf(' ');
                endRow = i > 0 ? rowTag.substring(0, i) : rowTag;
            }
            var s = '';
            for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
                var r = text_1[_i];
                if (r && r.length > 3) {
                    var b = r.substring(0, 3);
                    if (b == '<ul' || b == '<ol' || b == '<li' || b == '<di') {
                        s += r;
                        continue;
                    }
                }
                if (rowTag && rowTag != 'br') {
                    s += '<' + rowTag + '>' + r + '</' + endRow + '>';
                }
                else {
                    s += r + '<br>';
                }
            }
            if (classStyle || style || id || attributes) {
                this.add(WUX.build('div', s, style, attributes, id, classStyle));
            }
            else {
                this.add(s);
            }
            return this;
        };
        WContainer.prototype.addContainer = function (conid, classStyle, style, attributes, inline, props) {
            if (conid instanceof WContainer) {
                if (this._classStyle == null) {
                    if (conid._classStyle && conid._classStyle.indexOf('row') == 0) {
                        if (this.parent instanceof WContainer) {
                            this._classStyle = WUX.global.con_class;
                        }
                        else {
                            this._classStyle = WUX.global.main_class;
                        }
                    }
                }
                conid.parent = this;
                this.components.push(conid);
                return conid;
            }
            else if (typeof conid == 'string') {
                var container = new WContainer(conid, classStyle, style, attributes, inline, props);
                this.components.push(container);
                return container;
            }
        };
        WContainer.prototype.render = function () {
            if (this.parent || this._classStyle || this._style) {
                return this.build(this.rootTag);
            }
            return this.buildRoot(this.rootTag);
        };
        WContainer.prototype.componentDidMount = function () {
            for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
                var element = _a[_i];
                if (element instanceof WUX.WComponent) {
                    element.mount(this.root);
                }
                else {
                    this.root.append(element);
                }
            }
        };
        WContainer.prototype.componentWillUnmount = function () {
            for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c instanceof WUX.WComponent)
                    c.unmount();
            }
        };
        WContainer.prototype.rebuild = function () {
            this.root.innerHTML = '';
            for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
                var element = _a[_i];
                if (element instanceof WUX.WComponent) {
                    element.mount(this.root);
                }
                else {
                    this.root.append(element);
                }
            }
            return this;
        };
        return WContainer;
    }(WUX.WComponent));
    WUX.WContainer = WContainer;
})(WUX || (WUX = {}));
//# sourceMappingURL=wux.js.map