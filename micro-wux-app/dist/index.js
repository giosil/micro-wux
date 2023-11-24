// Build at 24/11/2023, 17:53:55
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
/**
    Micro WRAPPED USER EXPERIENCE - WUX
*/
var WuxDOM = /** @class */ (function () {
    function WuxDOM() {
    }
    WuxDOM.onRender = function (handler) {
        WuxDOM.renderHandlers.push(handler);
    };
    WuxDOM.onUnmount = function (handler) {
        WuxDOM.unmountHandlers.push(handler);
    };
    WuxDOM.getLastContext = function () {
        return WuxDOM.lastCtx;
    };
    WuxDOM.register = function (node, c) {
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
            return WuxDOM.components[id];
        if (typeof c == 'string') {
            var r = WuxDOM.components[id];
            if (r)
                delete WuxDOM.components[id];
            return r;
        }
        WuxDOM.components[id] = c;
        return c;
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
            if (WuxDOM.renderHandlers.length > 0) {
                var c = component instanceof WUX.WComponent ? component : null;
                var e = { component: c, element: context, target: context.firstChild, type: 'render' };
                for (var _i = 0, _a = WuxDOM.renderHandlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler(e);
                }
                WuxDOM.renderHandlers = [];
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
            WuxDOM.register(ctx, e);
        }
        else if (e instanceof Element) {
            ctx.append(e);
        }
        else {
            var t = document.createElement("template");
            t.innerHTML = e;
            ctx.append(t.content.firstElementChild);
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
        var wcomp = WuxDOM.register(ctx, 'delete');
        if (wcomp)
            wcomp.unmount();
        ctx.remove();
        if (WUX.debug)
            console.log('WuxDOM.unmount ' + WUX.str(node) + ' completed.');
        if (WuxDOM.unmountHandlers.length > 0) {
            var e = { component: wcomp, element: ctx, target: ctx.firstChild, type: 'unmount' };
            for (var _i = 0, _a = WuxDOM.unmountHandlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler(e);
            }
            WuxDOM.unmountHandlers = [];
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
    WuxDOM.components = {};
    WuxDOM.renderHandlers = [];
    WuxDOM.unmountHandlers = [];
    return WuxDOM;
}());
// WUX Base
var WUX;
(function (WUX) {
    WUX.debug = false;
    WUX.registry = [];
    WUX.version = '1.0.0';
    /**
     * Base class of a WUX component.
     */
    var WComponent = /** @class */ (function () {
        function WComponent(id, name, props, classStyle, style, attributes) {
            this.mounted = false;
            this.debug = WUX.debug;
            this.forceOnChange = false;
            this.rootTag = 'div';
            this.subSeq = 0;
            this.dontTrigger = false;
            // View attributes
            this._visible = true;
            this._enabled = true;
            // Event handlers
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
                // Do not use WUX.cls(classStyle, style): it never returns undefined.
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
                if (event_1.charAt(0) == '_' || event_1 == 'mount' || event_1 == 'unmount' || event_1 == 'statechange' || event_1 == 'propschange')
                    continue;
                if (this.root)
                    this.root.addEventListener(event_1, handler);
            }
            if (this.internal)
                this.internal.on(events, handler);
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
            WuxDOM.register(this.id, 'delete');
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
                    if (r) {
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
                            var t = document.createElement("template");
                            t.innerHTML = r;
                            this.context.append(t.content.firstElementChild);
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
                WuxDOM.register(this.root, this);
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
    /* Global functions */
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
        return WuxDOM.components[id];
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
        var c = WuxDOM.components[id];
        if (!c)
            return;
        c.setProps(p);
        return c;
    }
    WUX.setProps = setProps;
    function getProps(id, d) {
        if (!id)
            return d;
        var c = WuxDOM.components[id];
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
        var c = WuxDOM.components[id];
        if (!c)
            return;
        c.setState(s);
        return c;
    }
    WUX.setState = setState;
    function getState(id, d) {
        if (!id)
            return d;
        var c = WuxDOM.components[id];
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
    function match(i, o) {
        if (!o)
            return !i;
        if (i == null)
            return typeof o == 'string' ? o == '' : !o.id;
        if (typeof i == 'object')
            return typeof o == 'string' ? o == i.id : o.id == i.id;
        return typeof o == 'string' ? o == i : o.id == i;
    }
    WUX.match = match;
    /**
     * Split content "before<>content<>after" -> ["before", "content", "after"]
     * As well " content " -> ["&nbsp;", "content", "&nbsp;"]
     *
     * @param s content
     */
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
    /**
     * Convert to string for log trace.
     *
     * @param a any
     */
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
        var c = e.getAttribute('class');
        if (!c)
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
        var s = WUX.CSS.ICON ? ' style="' + WUX.CSS.ICON + '"' : '';
        var t = title ? ' title="' + title + '"' : '';
        cls = cls ? ' ' + cls : '';
        if (icon.indexOf('.') > 0)
            return before + '<img src="' + icon + '"' + t + s + '>' + after;
        if (!size || size < 2)
            return before + '<i class="fa ' + icon + cls + '"' + t + s + '></i>' + after;
        if (size > 5)
            size = 5;
        return before + '<i class="fa ' + icon + ' fa-' + size + 'x' + cls + '"' + t + s + '></i>' + after;
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
    /**
     * Utilities
     */
    var WUtil = /** @class */ (function () {
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
                // WDD, DD/MM/YYYY
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
                // Clonare la data altrimenti verra' modificata
                d = new Date(a.getTime());
            }
            else {
                d = WUtil.toDate(a);
            }
            if (!d)
                d = new Date();
            d.setHours(0, 0, 0, 0);
            // Thursday in current week decides the year.
            d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
            // January 4 is always in week 1.
            var w1 = new Date(d.getFullYear(), 0, 4);
            // Adjust to Thursday in week 1 and count number of weeks from date to week1.
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
            if (rh > 12) { // Passaggio dall'ora solare all'ora legale...
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
    /** Shared data */
    var _data = {};
    /** DataChanged callbacks */
    var _dccb = {};
    WUX.global = {
        locale: 'it',
        init: function _init(callback) {
            if (WUX.debug)
                console.log('[WUX] global.init...');
            // Initialization code
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
    var CSS = /** @class */ (function () {
        function CSS() {
        }
        CSS.FORM = 'padding-top:16px;';
        CSS.FORM_GROUP = 'form-group';
        CSS.FORM_CTRL = 'form-control';
        CSS.FORM_CHECK = 'form-check form-check-inline';
        CSS.CHECK_STYLE = 'padding-top:1.5rem;';
        CSS.ICON = 'margin-right:8px;';
        CSS.SEL_ROW = 'primary-bg-a2';
        CSS.PRIMARY = { bg: '#b8d4f1' };
        CSS.SECONDARY = { bg: '#d1d7dc' };
        CSS.SUCCESS = { bg: '#b8ddd0' };
        CSS.DANGER = { bg: '#f4c7ce' };
        CSS.WARNING = { bg: '#e6d3b8' };
        CSS.INFO = { bg: '#e2e2e2' };
        CSS.LIGHT = { bg: '#f9f8fb' };
        return CSS;
    }());
    WUX.CSS = CSS;
    var RES = /** @class */ (function () {
        function RES() {
        }
        RES.OK = 'OK';
        RES.CLOSE = 'Chiudi';
        RES.CANCEL = 'Annulla';
        return RES;
    }());
    WUX.RES = RES;
    // Data format utilities
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
    function isoDate(a) {
        if (!a)
            return '';
        var d = WUX.WUtil.toDate(a);
        if (!d)
            return '';
        var m = d.getMonth() + 1;
        var sm = m < 10 ? '0' + m : '' + m;
        var sd = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return d.getFullYear() + '-' + sm + '-' + sd;
    }
    WUX.isoDate = isoDate;
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
                if (a < 10000)
                    a = a * 100;
                var hh = Math.floor(a / 10000);
                var mm = Math.floor((a % 10000) / 100);
                var is = (a % 10000) % 100;
                var sm = mm < 10 ? '0' + mm : '' + mm;
                var ss = is < 10 ? '0' + is : '' + is;
                return hh + ':' + sm + ':' + ss;
            }
            else {
                if (a > 9999)
                    a = Math.floor(a / 100);
                var hh = Math.floor(a / 100);
                var mm = a % 100;
                var sm = mm < 10 ? '0' + mm : '' + mm;
                return hh + ':' + sm;
            }
        }
        if (typeof a == 'string') {
            var s = a.indexOf('T');
            if (s < 0)
                s = a.indexOf(' ');
            if (s >= 0)
                a = a.substring(s + 1);
            s = a.indexOf('+');
            if (s < 0)
                s = a.indexOf('-');
            if (s < 0)
                s = a.indexOf('Z');
            if (s >= 0)
                a = a.substring(0, s);
            var n = parseInt(a.replace(':', '').replace('.', ''));
            return formatTime(n);
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
    /**
     * Formatta numero alla 2a cifra decimale SENZA separatore migliaia.
     */
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
    /**
     * Formatta numero di default SENZA separatore migliaia. Specificare 'l' per la rappresentazione locale.
     */
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
    /**
     * Formatta numero alla 2a cifra decimale CON separatore migliaia e riportando SEMPRE le cifre decimali.
     */
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
    /**
     * Formatta numero alla 5a cifra decimale CON separatore migliaia e riportando SEMPRE le cifre decimali (massimo 2).
     */
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
            // YYYYMM
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
    function saveFile(base64, fileName, mimeType) {
        if (mimeType === void 0) { mimeType = 'application/octet-stream'; }
        var ab = atob(base64);
        var an = new Array(ab.length);
        for (var i = 0; i < ab.length; i++) {
            an[i] = ab.charCodeAt(i);
        }
        var ui8a = new Uint8Array(an);
        var blob = new Blob([ui8a], { type: mimeType });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }
    WUX.saveFile = saveFile;
    function viewFile(base64, fileName, mimeType) {
        if (mimeType === void 0) { mimeType = 'application/octet-stream'; }
        var ab = atob(base64);
        var an = new Array(ab.length);
        for (var i = 0; i < ab.length; i++) {
            an[i] = ab.charCodeAt(i);
        }
        var ui8a = new Uint8Array(an);
        var blob = new Blob([ui8a], { type: mimeType });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = fileName;
        link.click();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }
    WUX.viewFile = viewFile;
    function getAction(ie, c, tag) {
        if (!ie)
            return null;
        if (typeof ie == 'string') {
            var s = WUX.lastSub(ie);
            if (!s)
                return null;
            var x = s.indexOf('_');
            if (x <= 0)
                return null;
            var n = s.substring(0, x);
            var r = s.substring(x + 1).replace(/\$/g, '-');
            if (tag)
                tag = tag.toLowerCase();
            return { name: n, ref: r, idx: WUX.WUtil.toNumber(r, -1), tag: tag, comp: c };
        }
        else {
            var t = ie.target;
            if (!t)
                return null;
            var n = t.tagName;
            if (!n)
                return null;
            if (tag && tag.toLowerCase() != n.toLowerCase())
                return null;
            var i = WUX.getId(t);
            if (i) {
                var a = getAction(i, c, n);
                if (a)
                    return a;
            }
            var p = t["parentElement"];
            if (p) {
                n = p.tagName;
                if (!n)
                    return null;
                if (tag && tag.toLowerCase() != n.toLowerCase())
                    return null;
            }
            i = WUX.getId(p);
            return getAction(i, c, n);
        }
    }
    WUX.getAction = getAction;
    function action(name, ref, ele, comp, inner, cls) {
        if (typeof ref == 'string')
            ref = ref.replace(/\-/g, '$');
        if (!ele)
            ele = 'a';
        var id = comp ? comp.subId(name + '_' + ref) : name + '_' + ref;
        if (ele.indexOf('-') > 0) {
            // icon
            return '<i id="' + id + '" class="fa ' + ele + '" style="cursor:pointer;width:100%;"></i>';
        }
        else {
            // tag
            if (!inner)
                inner = '';
            if (cls) {
                if (cls.indexOf(':') > 0) {
                    return '<' + ele + ' id="' + id + '" style="' + cls + '">' + inner + '</' + ele + '>';
                }
                return '<' + ele + ' id="' + id + '" class="' + cls + '">' + inner + '</' + ele + '>';
            }
            return '<' + ele + ' id="' + id + '" style="cursor:pointer;">' + inner + '</' + ele + '>';
        }
    }
    WUX.action = action;
})(WUX || (WUX = {}));
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
var WUX;
(function (WUX) {
    var Wrapp = /** @class */ (function (_super) {
        __extends(Wrapp, _super);
        function Wrapp(props, tag, id, classStyle, style, attributes) {
            var _this = _super.call(this, id, 'Wrapp', props, classStyle, style, attributes) || this;
            if (tag)
                _this.rootTag = tag;
            return _this;
        }
        Wrapp.prototype.render = function () {
            this.isText = false;
            if (typeof this.props == 'string') {
                if (!this.props || this.props.indexOf('<') < 0) {
                    this.isText = true;
                    return this.buildRoot(this.rootTag, this.props);
                }
            }
            return this.props;
        };
        Wrapp.prototype.componentDidMount = function () {
            if (this.root && !this.isText) {
                this.rootTag = this.root.tagName;
                this.id = this.root.getAttribute('id');
                this._classStyle = this.root.getAttribute('class');
                this._style = this.root.getAttribute('style');
            }
        };
        return Wrapp;
    }(WUX.WComponent));
    WUX.Wrapp = Wrapp;
    var WContainer = /** @class */ (function (_super) {
        __extends(WContainer, _super);
        function WContainer(id, classStyle, style, attributes, inline, type) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WContainer', type, classStyle, WUX.style(style), attributes) || this;
            // WContainer init
            _this.cbef = [];
            _this.caft = [];
            _this.cint = [];
            _this.comp = [];
            _this.sr_c = [];
            _this.grid = [];
            _this.rootTag = inline ? 'span' : 'div';
            return _this;
        }
        WContainer.prototype.addRow = function (classStyle, style) {
            if (classStyle == null)
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
        WContainer.prototype.before = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            if (!items)
                return this;
            this.cbef = items;
            return this;
        };
        WContainer.prototype.after = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            if (!items)
                return this;
            this.caft = items;
            return this;
        };
        WContainer.prototype.add = function (component, constraints) {
            if (!component)
                return this;
            if (typeof component == 'string') {
                this.add(new Wrapp(component), constraints);
                return this;
            }
            else if (component instanceof Element) {
                this.add(new Wrapp(component), constraints);
                return this;
            }
            else {
                if (!component.parent)
                    component.parent = this;
                if (!this.grid.length) {
                    this.cint.push(component);
                    return this;
                }
                if (constraints == 'internal') {
                    this.cint.push(component);
                    return this;
                }
                if (constraints == 'before') {
                    this.cbef.push(component);
                    return this;
                }
                if (constraints == 'after') {
                    this.caft.push(component);
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
            }
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
        WContainer.prototype.addLine = function (style) {
            var ac = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                ac[_i - 1] = arguments[_i];
            }
            var w = new WContainer();
            w.addRow();
            if (ac) {
                var n = '1';
                if (typeof style != 'string') {
                    n = style.n;
                    if (!n)
                        n = '1';
                }
                for (var _a = 0, ac_3 = ac; _a < ac_3.length; _a++) {
                    var c = ac_3[_a];
                    if (c)
                        w.addCol(n, style).add(c);
                }
            }
            this.add(w);
            return this;
        };
        WContainer.prototype.addStack = function (style) {
            var ac = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                ac[_i - 1] = arguments[_i];
            }
            var w = new WContainer();
            if (ac) {
                var n = '12';
                if (typeof style != 'string') {
                    n = style.n;
                    if (!n)
                        n = '12';
                }
                for (var _a = 0, ac_4 = ac; _a < ac_4.length; _a++) {
                    var c = ac_4[_a];
                    if (c)
                        w.addRow().addCol(n, style).add(c);
                }
            }
            this.add(w);
            return this;
        };
        WContainer.prototype.addContainer = function (c_w_i, con_cls, style, attributes, inline, type) {
            var c;
            if (typeof c_w_i == 'string') {
                c = new WContainer(c_w_i, con_cls, style, attributes, inline, type);
                this.add(c);
            }
            else if (c_w_i instanceof WContainer) {
                c_w_i.parent = this;
                this.add(c_w_i, con_cls);
            }
            else {
                c = new WContainer();
                if (c_w_i) {
                    c.classStyle = WUX.cls(c_w_i.classStyle, c_w_i.style);
                    c.style = WUX.style(c_w_i.style);
                    c.attributes = c_w_i.attributes;
                }
                this.add(c, con_cls);
            }
            return c;
        };
        WContainer.prototype.addDiv = function (hcss, inner, cls_att, id) {
            if (typeof hcss == 'number') {
                if (hcss < 1)
                    return this;
                var r = WUX.build('div', inner, { h: hcss, n: cls_att });
                return this.add(r);
            }
            else {
                var r = WUX.build('div', inner, hcss, cls_att, id);
                return this.add(r);
            }
        };
        WContainer.prototype.end = function () {
            if (this.parent instanceof WContainer)
                return this.parent.end();
            return this;
        };
        WContainer.prototype.componentWillMount = function () {
            for (var _i = 0, _a = this.cbef; _i < _a.length; _i++) {
                var e = _a[_i];
                if (typeof e == 'string') {
                    // string (see render)
                }
                else if (e instanceof Element) {
                    // Element
                    if (this.context)
                        this.context.append(e);
                }
                else {
                    // WComponent
                    e.mount(this.context);
                }
            }
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
                    inner += '<div ' + this.cs(g[0]) + ' id="' + this.subId(r + '_0') + '">';
                    for (var c = 1; c < cm; c++) {
                        inner += '<div id="' + this.subId(r + '_' + c) + '" ' + this.cs(g[c]) + '></div>';
                    }
                    inner += "</div>";
                }
            }
            var s0 = '';
            var s1 = '';
            // Before
            for (var _i = 0, _a = this.cbef; _i < _a.length; _i++) {
                var e = _a[_i];
                if (typeof e == 'string')
                    s0 += e;
            }
            // After
            for (var _b = 0, _c = this.caft; _b < _c.length; _b++) {
                var e = _c[_b];
                if (typeof e == 'string')
                    s1 += e;
            }
            return s0 + this.buildRoot(this.rootTag, inner) + s1;
        };
        WContainer.prototype.componentDidMount = function () {
            for (var i = 0; i < this.cint.length; i++) {
                this.cint[i].mount(this.root);
            }
            for (var i = 0; i < this.comp.length; i++) {
                var c = this.comp[i];
                var e = document.getElementById(this.sr_c[i]);
                if (!e)
                    continue;
                c.mount(e);
            }
            for (var _i = 0, _a = this.caft; _i < _a.length; _i++) {
                var e = _a[_i];
                if (typeof e == 'string') {
                    // string (see render)
                }
                else if (e instanceof Element) {
                    // Element
                    if (this.context)
                        this.context.append(e);
                }
                else {
                    // WComponent
                    e.mount(this.context);
                }
            }
        };
        WContainer.prototype.componentWillUnmount = function () {
            for (var _i = 0, _a = this.cbef; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e instanceof WUX.WComponent)
                    e.unmount();
            }
            for (var _b = 0, _c = this.cint; _b < _c.length; _b++) {
                var c = _c[_b];
                c.unmount();
            }
            for (var _d = 0, _e = this.comp; _d < _e.length; _d++) {
                var c = _e[_d];
                c.unmount();
            }
            for (var _f = 0, _g = this.caft; _f < _g.length; _f++) {
                var e = _g[_f];
                if (e instanceof WUX.WComponent)
                    e.unmount();
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
        WContainer.prototype.getElement = function (r, c) {
            if (!this.grid || !this.grid.length) {
                return null;
            }
            if (r < 0) {
                r = this.grid.length + r;
                if (r < 0)
                    r = 0;
            }
            if (this.grid.length <= r) {
                return null;
            }
            if (c == null) {
                return document.getElementById(this.subId(r + '_0'));
            }
            var g = this.grid[r];
            // g = columns + row
            if (!g || g.length < 2) {
                return null;
            }
            if (c < 0) {
                c = g.length - 1 + c;
                if (c < 0)
                    c = 0;
            }
            // c in id starts at 1
            c++;
            return document.getElementById(this.subId(r + '_' + c));
        };
        return WContainer;
    }(WUX.WComponent));
    WUX.WContainer = WContainer;
    var WLink = /** @class */ (function (_super) {
        __extends(WLink, _super);
        function WLink(id, text, icon, classStyle, style, attributes, href, target) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WLink', icon, classStyle, style, attributes) || this;
            _this.updateState(text);
            _this.rootTag = 'a';
            // WLink init
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
    var WLabel = /** @class */ (function (_super) {
        __extends(WLabel, _super);
        function WLabel(id, text, icon, classStyle, style, attributes) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WLabel', icon, classStyle, style, attributes) || this;
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
    var WInput = /** @class */ (function (_super) {
        __extends(WInput, _super);
        function WInput(id, type, size, classStyle, style, attributes) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WInput', type, classStyle, style, attributes) || this;
            _this.rootTag = 'input';
            // WInput init
            _this.size = size;
            return _this;
        }
        Object.defineProperty(WInput.prototype, "readonly", {
            get: function () {
                return this._ro;
            },
            set: function (v) {
                this._ro = v;
                if (this.mounted) {
                    if (v) {
                        this.root.setAttribute('readonly', '');
                    }
                    else {
                        this.root.removeAttribute('readonly');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
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
                if (this._ro)
                    addAttributes += ' readonly';
                return l + this.build(this.rootTag, '', addAttributes);
            }
        };
        return WInput;
    }(WUX.WComponent));
    WUX.WInput = WInput;
    var WTextArea = /** @class */ (function (_super) {
        __extends(WTextArea, _super);
        function WTextArea(id, rows, classStyle, style, attributes) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WTextArea', rows, classStyle, style, attributes) || this;
            _this.rootTag = 'textarea';
            if (!rows)
                _this.props = 5;
            return _this;
        }
        Object.defineProperty(WTextArea.prototype, "readonly", {
            get: function () {
                return this._ro;
            },
            set: function (v) {
                this._ro = v;
                if (this.mounted) {
                    if (v) {
                        this.root.setAttribute('readonly', '');
                    }
                    else {
                        this.root.removeAttribute('readonly');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
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
            if (this._ro) {
                if (!this._attributes) {
                    this._attributes = 'readonly';
                }
                else if (this._attributes.indexOf('readonly') < 0) {
                    this._attributes += ' readonly';
                }
            }
            else {
                if (this._attributes && this._attributes.indexOf('readonly') >= 0) {
                    this._attributes.replace('readonly', '');
                }
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
    var WButton = /** @class */ (function (_super) {
        __extends(WButton, _super);
        function WButton(id, text, icon, classStyle, style, attributes, type) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WButton', icon, classStyle, style, attributes) || this;
            _this.updateState(text);
            _this.rootTag = 'button';
            // WButton init
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
            if (nextProps == null)
                nextProps = this.props;
            if (nextState) {
                html += WUX.buildIcon(nextProps, '', ' ') + nextState;
            }
            else {
                html += WUX.buildIcon(nextProps);
            }
            this.root.innerHTML = html;
        };
        return WButton;
    }(WUX.WComponent));
    WUX.WButton = WButton;
    var WCheck = /** @class */ (function (_super) {
        __extends(WCheck, _super);
        function WCheck(id, text, value, checked, classStyle, style, attributes) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WCheck', checked, classStyle, style, attributes) || this;
            _this.rootTag = 'input';
            // WCheck init
            _this.value = value ? value : '1';
            if (checked)
                _this.updateState(value);
            _this.text = text;
            return _this;
        }
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
        Object.defineProperty(WCheck.prototype, "tooltip", {
            set: function (s) {
                this._tooltip = s;
                var l = document.getElementById(this.id + '-l');
                if (l) {
                    l.setAttribute('title', this._tooltip);
                }
                else if (this.root) {
                    this.root.setAttribute('title', this._tooltip);
                }
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
            if (this.props == null)
                this.props = false;
            this.state = this.props ? this.value : undefined;
            if (this.root)
                this.root['checked'] = this.props;
        };
        WCheck.prototype.updateState = function (nextState) {
            _super.prototype.updateState.call(this, nextState);
            if (typeof this.state == 'boolean') {
                this.props = this.state;
                this.state = this.props ? this.value : undefined;
            }
            else {
                this.props = !this.state && this.state == this.value;
            }
            if (this.root)
                this.root['checked'] = this.props;
        };
        WCheck.prototype.render = function () {
            var addAttributes = 'name="' + this.id + '" type="checkbox"';
            addAttributes += this.props ? ' checked="checked"' : '';
            var inner = this.text ? '&nbsp;' + this.text : '';
            var r0 = '';
            var r1 = '';
            if (this.divClass || this.divStyle) {
                r0 += '<div ';
                if (this.divClass)
                    r0 += ' class="' + this.divClass + '"';
                if (this.divStyle)
                    r0 += ' style="' + this.divStyle + '"';
                r0 += '>';
            }
            if (this.label) {
                r1 += '<label id="' + this.id + '-l" for="' + this.id + '"';
                if (this._tooltip) {
                    r1 += ' title="' + this._tooltip + '"';
                }
                r1 += '>' + this.label + '</label>';
            }
            else {
                if (this._tooltip) {
                    addAttributes += ' title="' + this._tooltip + '"';
                }
            }
            if (r0)
                r1 += '</div>';
            return r0 + this.build(this.rootTag, inner, addAttributes) + r1;
        };
        WCheck.prototype.componentDidMount = function () {
            var _this = this;
            if (this.id) {
                // The component may be wrapped...
                this.root = document.getElementById(this.id);
            }
            if (this.root) {
                this.root.addEventListener("change", function (e) {
                    _this.props = !!_this.root['checked'];
                    _this.state = _this.props ? _this.value : undefined;
                });
            }
        };
        return WCheck;
    }(WUX.WComponent));
    WUX.WCheck = WCheck;
    var WRadio = /** @class */ (function (_super) {
        __extends(WRadio, _super);
        function WRadio(id, options, classStyle, style, attributes, props) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WRadio', props, classStyle, style, attributes) || this;
            // WRadio init 
            _this.options = options;
            return _this;
        }
        Object.defineProperty(WRadio.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (b) {
                this._enabled = b;
                if (this.mounted) {
                    for (var i = 0; i < this.options.length; i++) {
                        var item = document.getElementById(this.id + '-' + i);
                        if (!item)
                            continue;
                        if (b) {
                            item.removeAttribute('disabled');
                        }
                        else {
                            item.setAttribute('disabled', '');
                        }
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WRadio.prototype, "tooltip", {
            set: function (s) {
                this._tooltip = s;
                if (!this.mounted)
                    return;
                if (this.internal)
                    this.internal.tooltip = s;
                if (!this.options || !this.options.length)
                    return;
                for (var i = 0; i < this.options.length; i++) {
                    var item = document.getElementById(this.id + '-' + i);
                    if (!item)
                        continue;
                    item.setAttribute('title', this._tooltip);
                }
            },
            enumerable: false,
            configurable: true
        });
        WRadio.prototype.select = function (i) {
            if (!this.root || !this.options)
                return this;
            this.setState(this.options.length > i ? this.options[i] : null);
            return this;
        };
        WRadio.prototype.getProps = function () {
            if (!this.options || !this.options.length)
                return null;
            for (var i = 0; i < this.options.length; i++) {
                var rid = this.id + '-' + i;
                var item = document.getElementById(rid);
                if (!item)
                    continue;
                if (item['checked']) {
                    var lbl = document.getElementById(rid + '-l');
                    if (lbl)
                        return lbl.innerText;
                }
            }
            return WUX.WUtil.toString(this.state);
        };
        WRadio.prototype.updateState = function (nextState) {
            _super.prototype.updateState.call(this, nextState);
            if (typeof this.state == 'object') {
                if ("id" in this.state) {
                    this.state = this.state["id"];
                }
            }
        };
        WRadio.prototype.render = function () {
            var r = '';
            if (this.label) {
                r += this.id ? '<label for="' + this.id + '">' : '<label>';
                r += this.label.replace('<', '&lt;').replace('>', '&gt;');
                r += '</label> ';
            }
            var d = '';
            if (this._enabled != null && !this._enabled)
                d = ' disabled';
            if (!this.options)
                this.options = [];
            var l = this.options.length;
            if (this.state === undefined && l)
                this.state = this.options[0];
            for (var i = 0; i < l; i++) {
                r += '<div class="form-check form-check-inline">';
                var opt = this.options[i];
                var rid = this.id + '-' + i;
                if (typeof opt == "string") {
                    if (WUX.match(this.state, opt)) {
                        r += '<input type="radio" value="' + opt + '" name="' + this.id + '" id="' + rid + '" checked' + d + '>';
                    }
                    else {
                        r += '<input type="radio" value="' + opt + '" name="' + this.id + '" id="' + rid + '"' + d + '>';
                    }
                    r += '<label id="' + rid + '-l" for="' + rid + '">' + opt + '</label>';
                }
                else {
                    if (WUX.match(this.state, opt)) {
                        r += '<input type="radio" value="' + opt.id + '" name="' + this.id + '" id="' + rid + '" checked' + d + '>';
                    }
                    else {
                        r += '<input type="radio" value="' + opt.id + '" name="' + this.id + '" id="' + rid + '"' + d + '>';
                    }
                    r += '<label id="' + rid + '-l" for="' + rid + '">' + opt.text + '</label>';
                }
                r += '</div>';
            }
            return WUX.build('div', r, this._style, this._attributes, this.id, this._classStyle);
        };
        WRadio.prototype.componentDidMount = function () {
            var _this = this;
            if (!this.options || !this.options.length)
                return;
            var _loop_1 = function (i) {
                var item = document.getElementById(this_1.id + '-' + i);
                if (!item)
                    return "continue";
                if (this_1._tooltip)
                    item.setAttribute('title', this_1._tooltip);
                var opt = this_1.options[i];
                item.addEventListener('change', function (e) {
                    _this.setState(opt);
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.options.length; i++) {
                _loop_1(i);
            }
        };
        WRadio.prototype.componentDidUpdate = function (prevProps, prevState) {
            var idx = -1;
            if (this.state) {
                for (var i = 0; i < this.options.length; i++) {
                    if (WUX.match(this.state, this.options[i])) {
                        idx = i;
                        break;
                    }
                }
            }
            else {
                idx = 0;
            }
            if (idx >= 0) {
                var item = document.getElementById(this.id + '-' + idx);
                if (item)
                    item['checked'] = true;
            }
        };
        return WRadio;
    }(WUX.WComponent));
    WUX.WRadio = WRadio;
    var WSelect = /** @class */ (function (_super) {
        __extends(WSelect, _super);
        function WSelect(id, options, multiple, classStyle, style, attributes) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WSelect', null, classStyle, style, attributes) || this;
            // WSelect init
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
            var d = '';
            if (this._enabled != null && !this._enabled)
                d = ' disabled';
            addAttributes += d;
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
    var WTable = /** @class */ (function (_super) {
        __extends(WTable, _super);
        function WTable(id, header, keys, classStyle, style, attributes, props) {
            var _this = _super.call(this, id ? id : '*', 'WTable', props, classStyle, style, attributes) || this;
            _this.selectedRow = -1;
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
            _this.selClass = WUX.CSS.SEL_ROW;
            return _this;
        }
        WTable.prototype.onSelectionChanged = function (handler) {
            if (!this.handlers['_selectionchanged'])
                this.handlers['_selectionchanged'] = [];
            this.handlers['_selectionchanged'].push(handler);
        };
        WTable.prototype.onDoubleClick = function (handler) {
            if (!this.handlers['_doubleclick'])
                this.handlers['_doubleclick'] = [];
            this.handlers['_doubleclick'].push(handler);
        };
        WTable.prototype.onRowPrepared = function (handler) {
            if (!this.handlers['_rowprepared'])
                this.handlers['_rowprepared'] = [];
            this.handlers['_rowprepared'].push(handler);
        };
        WTable.prototype.clearSelection = function () {
            this.selectedRow = -1;
            if (!this.mounted)
                return this;
            var b = document.getElementById(this.id + '-b');
            if (b && this.selClass) {
                var an = b.childNodes;
                for (var i = 0; i < b.childElementCount; i++) {
                    WUX.removeClassOf(an[i], this.selClass);
                }
            }
            if (!this.handlers['_selectionchanged'])
                return this;
            for (var _i = 0, _a = this.handlers['_selectionchanged']; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler({ element: this.root, selectedRowsData: [] });
            }
            return this;
        };
        WTable.prototype.select = function (idxs) {
            if (!idxs)
                idxs = [];
            this.selectedRow = idxs.length ? idxs[0] : -1;
            if (!this.mounted)
                return this;
            var b = document.getElementById(this.id + '-b');
            if (b && this.selClass) {
                var an = b.childNodes;
                for (var i = 0; i < b.childElementCount; i++) {
                    if (idxs.indexOf(i) >= 0) {
                        WUX.addClassOf(an[i], this.selClass);
                    }
                    else {
                        WUX.removeClassOf(an[i], this.selClass);
                    }
                }
            }
            if (!this.handlers['_selectionchanged'])
                return this;
            var srd = [];
            for (var _i = 0, idxs_1 = idxs; _i < idxs_1.length; _i++) {
                var idx = idxs_1[_i];
                if (this.state && this.state.length > idx) {
                    srd.push(this.state[idx]);
                }
            }
            for (var _a = 0, _b = this.handlers['_selectionchanged']; _a < _b.length; _a++) {
                var handler = _b[_a];
                handler({ element: this.root, selectedRowsData: srd });
            }
            return this;
        };
        WTable.prototype.selectAll = function (toggle) {
            if (!this.mounted)
                return this;
            if (toggle && this.selectedRow >= 0) {
                return this.clearSelection();
            }
            this.selectedRow = -1;
            if (this.state && this.state.length) {
                this.selectedRow = 0;
            }
            var b = document.getElementById(this.id + '-b');
            if (b && this.selClass) {
                var an = b.childNodes;
                for (var i = 0; i < b.childElementCount; i++) {
                    WUX.addClassOf(an[i], this.selClass);
                }
            }
            if (!this.handlers['_selectionchanged'])
                return this;
            for (var _i = 0, _a = this.handlers['_selectionchanged']; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler({ element: this.root, selectedRowsData: this.state });
            }
            return this;
        };
        WTable.prototype.getSelectedRows = function () {
            if (!this.mounted)
                return [];
            if (this.selectedRow < 0)
                return [];
            return [this.selectedRow];
        };
        WTable.prototype.getSelectedRowsData = function () {
            if (!this.mounted)
                return [];
            if (this.selectedRow < 0)
                return [];
            if (!this.state || !this.state.length)
                return [];
            if (this.state.length <= this.selectedRow)
                return [];
            return [this.state[this.selectedRow]];
        };
        WTable.prototype.render = function () {
            if (this.sortable && this.sortable.length) {
                this.soId = [];
                this.sortBy = [];
                for (var i = 0; i < this.sortable.length; i++) {
                    this.sortBy.push(0);
                }
            }
            var tableClass = 'table';
            if (this._classStyle)
                tableClass = this._classStyle.indexOf('table ') >= 0 ? this._classStyle : tableClass + ' ' + this._classStyle;
            var ts = this.style ? ' style="' + this.style + '"' : '';
            var r = '';
            if (this.div)
                r += '<div id="' + this.id + '-c" class="' + this.div + '">';
            var sm = this.selectionMode;
            if (sm && sm != 'none') {
                if (tableClass.indexOf('table-hover') < 0) {
                    tableClass += ' table-hover';
                }
            }
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
                        var so = this.sortable && this.sortable.indexOf(j) >= 0;
                        if (so) {
                            var aid = this.subId('sort_' + j);
                            this.soId.push(aid);
                            r += '<th' + WUX.buildCss(s, x) + '><a style="cursor:pointer;text-decoration:none !important;" id="' + aid + '">' + h + ' &nbsp;<i class="fa fa-unsorted"></i></a></th>';
                        }
                        else {
                            r += '<th' + WUX.buildCss(s, x) + '>' + h + '</th>';
                        }
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
            var _this = this;
            this.buildBody();
            if (this.soId) {
                var _loop_2 = function (aid) {
                    var a = document.getElementById(aid);
                    if (a) {
                        a.addEventListener('click', function (e) {
                            var i = WUX.lastSub(WUX.getId(e.currentTarget));
                            var x = i.indexOf('_');
                            if (x <= 0)
                                return;
                            var c = WUX.WUtil.toNumber(i.substring(x + 1), -1);
                            if (c >= 0 && _this.header && _this.header.length > c) {
                                // Default sort?
                                var hs = _this.handlers['_sort'];
                                var ds = !(hs && hs.length) && _this.keys && _this.keys.length > c;
                                var h = _this.header[c];
                                var v = _this.sortBy[c];
                                if (!v) {
                                    _this.sortBy[c] = 1;
                                    if (h)
                                        a.innerHTML = h + ' &nbsp;<i class="fa fa-sort-asc"></i>';
                                    if (ds)
                                        _this.setState(WUX.WUtil.sort(_this.state, true, _this.keys[c]));
                                }
                                else if (v == 1) {
                                    _this.sortBy[c] = -1;
                                    if (h)
                                        a.innerHTML = h + ' &nbsp;<i class="fa fa-sort-desc"></i>';
                                    if (ds)
                                        _this.setState(WUX.WUtil.sort(_this.state, false, _this.keys[c]));
                                }
                                else if (v == -1) {
                                    _this.sortBy[c] = 0;
                                    if (h)
                                        a.innerHTML = h + ' &nbsp;<i class="fa fa-unsorted"></i>';
                                }
                                if (hs) {
                                    for (var _i = 0, hs_2 = hs; _i < hs_2.length; _i++) {
                                        var hr = hs_2[_i];
                                        hr(_this.createEvent('_sort', _this.sortBy));
                                    }
                                }
                            }
                        });
                    }
                };
                for (var _i = 0, _a = this.soId; _i < _a.length; _i++) {
                    var aid = _a[_i];
                    _loop_2(aid);
                }
            }
            var b = document.getElementById(this.id + '-b');
            if (b) {
                b.addEventListener('click', function (e) {
                    if (!_this.selectionMode || _this.selectionMode == 'none')
                        return;
                    var t = e.target;
                    if (!t)
                        return;
                    var tr = t.closest('tr');
                    if (!tr)
                        return;
                    var i = WUX.WUtil.toNumber(WUX.lastSub(tr), -1);
                    if (i < 0)
                        return;
                    _this.select([i]);
                });
                b.addEventListener('dblclick', function (e) {
                    if (!_this.handlers['_doubleclick'])
                        return;
                    var t = e.target;
                    if (!t)
                        return;
                    var tr = t.closest('tr');
                    if (!tr)
                        return;
                    var i = WUX.WUtil.toNumber(WUX.lastSub(tr), -1);
                    if (i < 0)
                        return;
                    var d = _this.state && _this.state.length > i ? _this.state[i] : null;
                    for (var _i = 0, _a = _this.handlers['_doubleclick']; _i < _a.length; _i++) {
                        var h = _a[_i];
                        h({ element: _this.root, rowElement: tr, data: d, rowIndex: i });
                    }
                });
            }
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
            var sr = this.selectionMode && this.selectionMode != 'none' ? ' style="cursor:pointer;"' : '';
            var b = '';
            var i = -1;
            for (var _i = 0, _a = this.state; _i < _a.length; _i++) {
                var row = _a[_i];
                i++;
                var r = '';
                if (i == this.state.length - 1) {
                    if (this.footerStyle) {
                        r = '<tr' + WUX.buildCss(this.footerStyle) + ' id="' + this.id + '-' + i + '"' + sr + '>';
                    }
                    else {
                        r = '<tr' + WUX.buildCss(this.rowStyle) + ' id="' + this.id + '-' + i + '"' + sr + '>';
                    }
                }
                else {
                    r = '<tr' + WUX.buildCss(this.rowStyle) + ' id="' + this.id + '-' + i + '"' + sr + '>';
                }
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
                    r += '<td' + WUX.buildCss(s, align, { w: w }) + '>' + v + '</td>';
                }
                if (this.header && this.header.length > this.keys.length) {
                    for (var i_1 = 0; i_1 < this.header.length - this.keys.length; i_1++) {
                        r += '<td' + WUX.buildCss(this.colStyle) + '></td>';
                    }
                }
                r += '</tr>';
                if (this.handlers['_rowprepared']) {
                    var t = document.createElement("template");
                    t.innerHTML = r;
                    var e = { element: this.root, rowElement: t.content.firstElementChild, data: row, rowIndex: i };
                    for (var _d = 0, _e = this.handlers['_rowprepared']; _d < _e.length; _d++) {
                        var handler = _e[_d];
                        handler(e);
                    }
                    r = t.innerHTML;
                }
                b += r;
            }
            tbody.innerHTML = b;
        };
        WTable.prototype.onSort = function (h) {
            if (!this.handlers['_sort'])
                this.handlers['_sort'] = [];
            this.handlers['_sort'].push(h);
        };
        return WTable;
    }(WUX.WComponent));
    WUX.WTable = WTable;
    var WFormPanel = /** @class */ (function (_super) {
        __extends(WFormPanel, _super);
        function WFormPanel(id, title, action) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WFormPanel') || this;
            _this.rootTag = 'form';
            if (action) {
                _this._attributes = 'role="form" name="' + _this.id + '" action="' + action + '"';
            }
            else {
                _this._attributes = 'role="form" name="' + _this.id + '" action="javascript:void(0);"';
            }
            // WFormPanel init
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
            this.footer = [];
            this.captions = [];
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
        WFormPanel.prototype.getComponent = function (fid, def) {
            var f = this.getField(fid);
            if (!f) {
                console.error('[' + WUX.str(this) + '] Field ' + fid + ' not found.');
                return def;
            }
            var c = f.component;
            if (!c) {
                console.error('[' + WUX.str(this) + '] Field ' + fid + ' has no components.');
                return def;
            }
            return c;
        };
        WFormPanel.prototype.onField = function (fid, events, handler) {
            var c = this.getComponent(fid);
            if (!c)
                return;
            c.on(events, handler);
            return this;
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
            co.readonly = readonly;
            this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'text' });
            return this;
        };
        WFormPanel.prototype.addNoteField = function (fieldId, label, rows, readonly) {
            if (!rows)
                rows = 3;
            var id = this.subId(fieldId);
            var co = new WTextArea(id, rows, WUX.CSS.FORM_CTRL);
            co.readonly = readonly;
            this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'note' });
            return this;
        };
        WFormPanel.prototype.addDateField = function (fieldId, label, readonly) {
            var id = this.subId(fieldId);
            var co = new WInput(id, 'date', 0, WUX.CSS.FORM_CTRL);
            co.readonly = readonly;
            this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'date' });
            return this;
        };
        WFormPanel.prototype.addTimeField = function (fieldId, label, readonly) {
            var id = this.subId(fieldId);
            var co = new WInput(id, 'time', 0, WUX.CSS.FORM_CTRL);
            co.readonly = readonly;
            this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'time' });
            return this;
        };
        WFormPanel.prototype.addEmailField = function (fieldId, label, readonly) {
            var id = this.subId(fieldId);
            var co = new WInput(id, 'email', 0, WUX.CSS.FORM_CTRL);
            co.readonly = readonly;
            this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'email' });
            return this;
        };
        WFormPanel.prototype.addOptionsField = function (fieldId, label, options, attributes, readonly) {
            var id = this.subId(fieldId);
            var co = new WSelect(id, options, false, WUX.CSS.FORM_CTRL, '', attributes);
            co.enabled = !readonly;
            this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'select' });
            return this;
        };
        WFormPanel.prototype.addRadioField = function (fieldId, label, options, attributes, readonly) {
            var id = this.subId(fieldId);
            var co = new WRadio(id, options, WUX.CSS.FORM_CTRL, WUX.CSS.CHECK_STYLE, attributes);
            co.enabled = !readonly;
            this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'select' });
            return this;
        };
        WFormPanel.prototype.addBooleanField = function (fieldId, label, labelCheck, tooltip) {
            var id = this.subId(fieldId);
            var co = new WCheck(id, '');
            co.divClass = WUX.CSS.FORM_CHECK;
            co.divStyle = WUX.CSS.CHECK_STYLE;
            co.classStyle = WUX.CSS.FORM_CTRL;
            co.label = labelCheck;
            co.tooltip = tooltip;
            this.currRow.push({ id: id, label: label, component: co, 'type': 'boolean' });
            return this;
        };
        WFormPanel.prototype.addBlankField = function (label, classStyle, style) {
            var co = new WContainer('', classStyle, style);
            this.currRow.push({ id: '', label: label, component: co, classStyle: classStyle, style: style, type: 'blank' });
            return this;
        };
        WFormPanel.prototype.addInternalField = function (fieldId, value) {
            if (value === undefined)
                value = null;
            this.currRow.push({ id: this.subId(fieldId), value: value, type: 'internal' });
            return this;
        };
        WFormPanel.prototype.addCaption = function (text, icon, classStyle, style) {
            if (!text)
                return this;
            var co = new WLabel('', text, icon, classStyle, style);
            this.currRow.push({ id: '', label: '', component: co, readonly: true, type: 'caption' });
            this.captions.push(co);
            return this;
        };
        WFormPanel.prototype.addComponent = function (fieldId, label, component) {
            if (!component)
                return this;
            if (fieldId) {
                component.id = this.subId(fieldId);
                this.currRow.push({ id: this.subId(fieldId), label: label, component: component, type: 'component' });
            }
            else {
                component.id = '';
                this.currRow.push({ id: '', label: label, component: component, type: 'component' });
            }
            return this;
        };
        WFormPanel.prototype.addToFooter = function (c) {
            if (!c && !this.footer)
                return this;
            this.footer.push(c);
            return this;
        };
        WFormPanel.prototype.componentDidMount = function () {
            this.main = new WContainer(this.id + '-c');
            for (var i = 0; i < this.rows.length; i++) {
                var w = this.roww[i];
                this.main.addRow(WUX.cls(w.type, w.classStyle, w.style), WUX.style(w.style));
                var row = this.rows[i];
                // Calcolo colonne effettive
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
                    if (f.type != 'caption')
                        f.component.setState(f.value);
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
            if (this.footer && this.footer.length) {
                this.foot = new WContainer(this.subId('__foot'), this.footerClass, this.footerStyle);
                for (var _i = 0, _a = this.footer; _i < _a.length; _i++) {
                    var f = _a[_i];
                    this.foot.addRow().addCol('12').add(f, 'push');
                }
                this.main.addRow().addCol('12').add(this.foot);
            }
            this.main.mount(this.root);
        };
        WFormPanel.prototype.componentWillUnmount = function () {
            if (!this.main)
                this.main.unmount();
        };
        WFormPanel.prototype.clear = function () {
            for (var i = 0; i < this.rows.length; i++) {
                var row = this.rows[i];
                for (var j = 0; j < row.length; j++) {
                    var f = row[j];
                    if (f.type == 'caption')
                        continue;
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
            if (f.type == 'date')
                v = WUX.isoDate(v);
            if (f.type == 'time')
                v = WUX.formatTime(v, false);
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
var WUX;
(function (WUX) {
    function JQ(e) {
        var jq = window['jQuery'] ? window['jQuery'] : null;
        if (!jq) {
            console.error('[WUX] jQuery is not available');
            return null;
        }
        var r = jq(e);
        if (!r.length) {
            console.error('[WUX] !jQuery(' + e + ').length==true');
            return null;
        }
        return r;
    }
    WUX.JQ = JQ;
    // Bootstrap / JQuery
    var WDialog = /** @class */ (function (_super) {
        __extends(WDialog, _super);
        function WDialog(id, name, btnOk, btnClose, classStyle, style, attributes) {
            if (name === void 0) { name = 'WDialog'; }
            if (btnOk === void 0) { btnOk = true; }
            if (btnClose === void 0) { btnClose = true; }
            var _this = _super.call(this, id, name, undefined, classStyle, style, attributes) || this;
            _this.buttons = [];
            _this.tagTitle = 'h5';
            if (btnClose) {
                if (!btnOk)
                    _this.txtCancel = WUX.RES.CLOSE;
                _this.buttonCancel();
            }
            if (btnOk)
                _this.buttonOk();
            _this.ok = false;
            _this.cancel = false;
            _this.isShown = false;
            // Auto-mount
            if (_this.id && _this.id != '*') {
                var e = document.getElementById(_this.id);
                if (e)
                    e.remove();
            }
            WuxDOM.onRender(function (e) {
                if (_this.mounted)
                    return;
                _this.mount(e.element);
            });
            return _this;
        }
        WDialog.prototype.makeUp = function (title, body, onHidden) {
            this.title = title;
            this.body.addRow().addCol('12').add(body);
            if (onHidden)
                this.hh = onHidden;
            return this;
        };
        WDialog.prototype.onShownModal = function (handler) {
            this.sh = handler;
        };
        WDialog.prototype.onHiddenModal = function (handler) {
            this.hh = handler;
        };
        Object.defineProperty(WDialog.prototype, "header", {
            get: function () {
                if (this.cntHeader)
                    return this.cntHeader;
                this.cntHeader = new WUX.WContainer('', 'modal-header');
                return this.cntHeader;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WDialog.prototype, "body", {
            get: function () {
                if (this.cntBody)
                    return this.cntBody;
                this.cntBody = new WUX.WContainer('', WUX.cls('modal-body', this._classStyle), '', this._attributes);
                return this.cntBody;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WDialog.prototype, "footer", {
            get: function () {
                if (this.cntFooter)
                    return this.cntFooter;
                this.cntFooter = new WUX.WContainer('', 'modal-footer');
                return this.cntFooter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WDialog.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (s) {
                var _this = this;
                this._title = s;
                var te = document.getElementById(this.subId('title'));
                if (te) {
                    te.innerText = s;
                }
                else {
                    this.btnClose = new WUX.WButton(this.subId('bhc'), '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>', undefined, 'close', '', 'data-dismiss="modal"');
                    this.btnClose.on('click', function (e) {
                        _this.close();
                    });
                    this.header.add(this.buildTitle()).add(this.btnClose);
                }
            },
            enumerable: false,
            configurable: true
        });
        WDialog.prototype.onClickOk = function () {
            return true;
        };
        WDialog.prototype.onClickCancel = function () {
            return true;
        };
        WDialog.prototype.buildBtnOK = function () {
            return new WUX.WButton(this.subId('bfo'), WUX.RES.OK, '', 'btn btn-primary button-sm', '', '');
        };
        WDialog.prototype.buildBtnCancel = function () {
            if (this.txtCancel) {
                return new WUX.WButton(this.subId('bfc'), this.txtCancel, '', 'btn btn-secondary button-sm', '', '');
            }
            return new WUX.WButton(this.subId('bfc'), WUX.RES.CANCEL, '', 'btn btn-secondary button-sm', '', '');
        };
        WDialog.prototype.buttonOk = function () {
            var _this = this;
            if (this.btnOK)
                return this.btnOK;
            this.btnOK = this.buildBtnOK();
            this.btnOK.on('click', function (e) {
                if (_this.onClickOk()) {
                    _this.ok = true;
                    _this.cancel = false;
                    if (_this.$r)
                        _this.$r.modal('hide');
                }
            });
            this.buttons.push(this.btnOK);
        };
        WDialog.prototype.buttonCancel = function () {
            var _this = this;
            if (this.btnCancel)
                return this.btnCancel;
            this.btnCancel = this.buildBtnCancel();
            this.btnCancel.on('click', function (e) {
                if (_this.onClickCancel()) {
                    _this.ok = false;
                    _this.cancel = true;
                    if (_this.$r)
                        _this.$r.modal('hide');
                }
            });
            this.buttons.push(this.btnCancel);
        };
        WDialog.prototype.show = function (parent, handler) {
            if (!this.beforeShow())
                return;
            this.ok = false;
            this.cancel = false;
            this.parent = parent;
            this.ph = handler;
            if (!this.mounted)
                WuxDOM.mount(this);
            if (!this.$r)
                return;
            this.$r.modal({ backdrop: 'static', keyboard: false, show: false });
            this.$r.modal('show');
        };
        WDialog.prototype.hide = function () {
            if (this.$r)
                this.$r.modal('hide');
        };
        WDialog.prototype.close = function () {
            this.ok = false;
            this.cancel = false;
            if (this.$r)
                this.$r.modal('hide');
        };
        WDialog.prototype.beforeShow = function () {
            return true;
        };
        WDialog.prototype.onShown = function () {
        };
        WDialog.prototype.onHidden = function () {
        };
        WDialog.prototype.render = function () {
            this.isShown = false;
            this.cntRoot = new WUX.WContainer(this.id, 'modal inmodal fade', '', 'role="dialog" aria-hidden="true"');
            this.cntMain = this.cntRoot.addContainer('', 'modal-dialog modal-lg', this._style);
            this.cntContent = this.cntMain.addContainer('', 'modal-content');
            if (this.cntHeader)
                this.cntContent.addContainer(this.cntHeader);
            if (this.cntBody)
                this.cntContent.addContainer(this.cntBody);
            for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
                var btn = _a[_i];
                this.footer.add(btn);
            }
            if (this.cntFooter)
                this.cntContent.addContainer(this.cntFooter);
            return this.cntRoot;
        };
        WDialog.prototype.componentDidMount = function () {
            var _this = this;
            if (!this.root)
                return;
            this.$r = JQ(this.root);
            if (!this.$r)
                return;
            this.$r.on('shown.bs.modal', function (e) {
                _this.isShown = true;
                _this.onShown();
                if (_this.sh)
                    _this.sh(e);
            });
            this.$r.on('hidden.bs.modal', function (e) {
                _this.isShown = false;
                _this.onHidden();
                if (_this.hh)
                    _this.hh(e);
                if (_this.ph) {
                    _this.ph(e);
                    _this.ph = null;
                }
            });
        };
        WDialog.prototype.componentWillUnmount = function () {
            this.isShown = false;
            if (this.btnClose)
                this.btnClose.unmount();
            if (this.btnCancel)
                this.btnCancel.unmount();
            if (this.cntFooter)
                this.cntFooter.unmount();
            if (this.cntBody)
                this.cntBody.unmount();
            if (this.cntHeader)
                this.cntHeader.unmount();
            if (this.cntContent)
                this.cntContent.unmount();
            if (this.cntMain)
                this.cntMain.unmount();
            if (this.cntRoot)
                this.cntRoot.unmount();
        };
        WDialog.prototype.buildTitle = function () {
            if (!this.tagTitle)
                this.tagTitle = 'h3';
            return '<' + this.tagTitle + ' class="modal-title" id="' + this.subId('title') + '">' + WUX.WUtil.toText(this._title) + '</' + this.tagTitle + '>';
        };
        return WDialog;
    }(WUX.WComponent));
    WUX.WDialog = WDialog;
    var WTab = /** @class */ (function (_super) {
        __extends(WTab, _super);
        function WTab(id, classStyle, style, attributes, props) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WTab', props, classStyle, style, attributes) || this;
            // WTab init
            _this.tabs = [];
            return _this;
        }
        WTab.prototype.addTab = function (title, icon) {
            var tab = new WUX.WContainer('', 'panel-body');
            tab.name = WUX.buildIcon(icon, '', ' ') + title;
            this.tabs.push(tab);
            return tab;
        };
        WTab.prototype.render = function () {
            if (this.state == null)
                this.state = 0;
            var r = '<div';
            if (this._classStyle) {
                r += ' class="tabs-container ' + this._classStyle + '"';
            }
            else {
                r += ' class="tabs-container"';
            }
            r += ' id="' + this.id + '"';
            if (this._style)
                r += ' style="' + this._style + '"';
            if (this.attributes)
                r += ' ' + this.attributes;
            r += '>';
            r += '<ul class="nav nav-tabs auto" role="tablist">';
            for (var i = 0; i < this.tabs.length; i++) {
                var tab = this.tabs[i];
                if (i == this.state) {
                    r += '<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#' + this.id + '-' + i + '"> ' + tab.name + '</a></li>';
                }
                else {
                    r += '<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#' + this.id + '-' + i + '"> ' + tab.name + '</a></li>';
                }
            }
            r += '</ul>';
            r += '<div class="tab-content">';
            for (var i = 0; i < this.tabs.length; i++) {
                if (i == this.state) {
                    r += '<div id="' + this.id + '-' + i + '" class="tab-pane active"></div>';
                }
                else {
                    r += '<div id="' + this.id + '-' + i + '" class="tab-pane"></div>';
                }
            }
            r += '</div></div>';
            return r;
        };
        WTab.prototype.componentDidUpdate = function (prevProps, prevState) {
            var $t = JQ('.nav-tabs a[href="#' + this.id + '-' + this.state + '"]');
            if (!$t)
                return;
            $t.tab('show');
        };
        WTab.prototype.componentDidMount = function () {
            var _this = this;
            if (!this.tabs.length)
                return;
            for (var i = 0; i < this.tabs.length; i++) {
                var container = this.tabs[i];
                var tabPane = document.getElementById(this.id + '-' + i);
                if (!tabPane)
                    continue;
                container.mount(tabPane);
            }
            var $r = JQ(this.root);
            if (!$r)
                return;
            $r.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var t = e.target;
                var href = '';
                if (t instanceof Element) {
                    href = t.getAttribute('href');
                }
                if (!href)
                    return;
                var sep = href.lastIndexOf('-');
                if (sep >= 0)
                    _this.setState(parseInt(href.substring(sep + 1)));
            });
        };
        WTab.prototype.componentWillUnmount = function () {
            for (var _i = 0, _a = this.tabs; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c)
                    c.unmount();
            }
        };
        return WTab;
    }(WUX.WComponent));
    WUX.WTab = WTab;
    var WCalendar = /** @class */ (function (_super) {
        __extends(WCalendar, _super);
        function WCalendar(id, classStyle, style, attributes) {
            var _this = 
            // WComponent init
            _super.call(this, id ? id : '*', 'WCalendar', 1, classStyle, style, attributes) || this;
            // Array of marker
            _this.am = [];
            // Map date - title
            _this.mt = {};
            // Prev month
            _this.pm = 'Mese precedente';
            // Next month
            _this.nm = 'Mese successivo';
            // Class table
            _this.ct = 'table table-sm';
            // Class div table
            _this.cd = 'table-responsive';
            // Style previous
            _this.sp = 'padding:1rem;text-align:center;font-weight:bold;background-color:#eeeeee;';
            // Style month
            _this.sm = _this.sp;
            // Style next
            _this.sn = _this.sp;
            // Row (<tr>) style
            _this.tr = 'height:3rem;';
            // Style week day
            _this.sw = 'text-align:center;';
            // Style day
            _this.sd = 'text-align:center;vertical-align:middle;';
            // Style day over
            _this.so = 'text-align:center;vertical-align:middle;background-color:#f6f6f6;cursor:pointer;';
            // Style day selected (table-primary)
            _this.ss = 'text-align:center;vertical-align:middle;background-color:#b8d4f1;';
            // Style day marked (table-warning)
            _this.sk = 'text-align:center;vertical-align:middle;background-color:#e6d3b8;';
            // Style empty
            _this.se = 'background-color:#f0f0f0;';
            // Style today
            _this.st = 'font-weight:bold;';
            // Today
            _this.td = _this.str(new Date());
            return _this;
        }
        WCalendar.prototype.onDoubleClick = function (handler) {
            if (!this.handlers['_doubleclick'])
                this.handlers['_doubleclick'] = [];
            this.handlers['_doubleclick'].push(handler);
        };
        WCalendar.prototype.updateState = function (nextState) {
            this.state = nextState;
            if (!this.state)
                this.state = new Date();
            var d = this.state.getDate();
            var m = this.state.getMonth();
            var y = this.state.getFullYear();
            this.ls = (y * 10000 + (m + 1) * 100 + d) + '';
        };
        WCalendar.prototype.render = function () {
            if (!this.state)
                this.state = new Date();
            // Build table
            var t = '<table id="' + this.subId('t') + '" class="' + this.ct + '"><thead><tr>';
            for (var x = 0; x < 7; x++) {
                var k_1 = x == 6 ? 0 : x + 1;
                t += '<th id="' + this.subId(k_1 + '') + '" style="' + this.sw + '">' + WUX.formatDay(k_1, false) + '</th>';
            }
            t += '</tr></thead><tbody id="' + this.subId('b') + '">';
            t += this.body();
            t += '</tbody></table>';
            // Build component
            var m = this.state.getMonth();
            var y = this.state.getFullYear();
            var k = y * 100 + m + 1;
            var p = '<a id="' + this.subId('p') + '" title="' + this.pm + '"><i class="fa fa-arrow-circle-left"></i></a>';
            var n = '<a id="' + this.subId('n') + '" title="' + this.nm + '"><i class="fa fa-arrow-circle-right"></i></a>';
            var i = '<div class="row"><div class="col-2" style="' + this.sp + '">' + p + '</div><div id="' + this.subId('m') + '" class="col-8" style="' + this.sm + '">' + WUX.formatMonth(k, true, true) + '</div><div class="col-2" style="' + this.sn + '">' + n + '</div></div>';
            if (this.cd) {
                i += '<div class="row"><div class="' + this.cd + '">' + t + '</div></div>';
            }
            else {
                i += '<div class="row"><div class="col-12">' + t + '</div></div>';
            }
            return this.buildRoot(this.rootTag, i);
        };
        WCalendar.prototype.add = function (a) {
            if (!this.state)
                this.state = new Date();
            var d = this.state.getDate();
            var m = this.state.getMonth();
            var y = this.state.getFullYear();
            var r = m + a;
            var n = new Date(y, r, d);
            var nm = n.getMonth();
            if (nm != r) {
                n = new Date(y, r + 1, 0);
                nm = n.getMonth();
            }
            var ny = n.getFullYear();
            // Invocare prima del metodo body
            this.setState(n);
            if (this.eb) {
                this.eb.innerHTML = this.body();
            }
            if (this.em) {
                var w = ny * 100 + nm + 1;
                this.em.innerText = WUX.formatMonth(w, true, true);
            }
            return n;
        };
        WCalendar.prototype.mark = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (!p || !p.length)
                return this;
            for (var _a = 0, p_1 = p; _a < p_1.length; _a++) {
                var o = p_1[_a];
                var dt = WUX.WUtil.toDate(o);
                if (!dt)
                    continue;
                var k = this.str(dt);
                this.am.push(k);
                if (k == this.ls)
                    continue;
                var e = document.getElementById(this.subId(k));
                if (e)
                    e.setAttribute('style', this.sk);
            }
            return this;
        };
        WCalendar.prototype.unmark = function () {
            var p = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                p[_i] = arguments[_i];
            }
            if (!p || !p.length)
                return this;
            for (var _a = 0, p_2 = p; _a < p_2.length; _a++) {
                var o = p_2[_a];
                var dt = WUX.WUtil.toDate(o);
                if (!dt)
                    continue;
                var k = this.str(dt);
                this.unm(this.am.indexOf(k));
            }
            return this;
        };
        WCalendar.prototype.title = function (d, t) {
            var dt = WUX.WUtil.toDate(d);
            if (!dt)
                return this;
            var k = this.str(dt);
            this.mt[k] = t;
            var e = document.getElementById(this.subId(k));
            if (e)
                e.setAttribute('title', t);
            return this;
        };
        WCalendar.prototype.unm = function (i, r) {
            if (r === void 0) { r = true; }
            if (i < 0)
                return;
            var k = this.am[i];
            if (!k)
                return;
            if (r)
                this.am.splice(i, 1);
            var e = document.getElementById(this.subId(k));
            if (e) {
                var s = this.str(this.state);
                if (s == k) {
                    e.setAttribute('style', this.ss);
                }
                else {
                    e.setAttribute('style', this.sd);
                }
            }
        };
        WCalendar.prototype.clear = function () {
            if (this.am && this.am.length) {
                for (var i = 0; i < this.am.length; i++) {
                    this.unm(i, false);
                }
                this.am = [];
            }
            if (this.mt) {
                for (var k in this.mt) {
                    var e = document.getElementById(this.subId(k));
                    if (e)
                        e.setAttribute('title', null);
                }
                this.mt = {};
            }
            return this;
        };
        WCalendar.prototype.prev = function () {
            return this.add(-1);
        };
        WCalendar.prototype.next = function () {
            return this.add(1);
        };
        WCalendar.prototype.ele = function (dt) {
            if (!dt)
                return null;
            return document.getElementById(this.subId(this.str(dt)));
        };
        WCalendar.prototype.str = function (dt) {
            if (!dt)
                return null;
            return (dt.getFullYear() * 10000 + (dt.getMonth() + 1) * 100 + dt.getDate()) + '';
        };
        WCalendar.prototype.from = function () {
            if (!this.state)
                this.state = new Date();
            var m = this.state.getMonth();
            var y = this.state.getFullYear();
            return (y * 10000 + (m + 1) * 100 + 1) + '';
        };
        WCalendar.prototype.to = function () {
            if (!this.state)
                this.state = new Date();
            var m = this.state.getMonth();
            var y = this.state.getFullYear();
            // Last day
            var n = new Date(y, m + 1, 0);
            var d = n.getDate();
            return (y * 10000 + (m + 1) * 100 + d) + '';
        };
        WCalendar.prototype.body = function () {
            if (!this.state)
                this.state = new Date();
            var b = '';
            // Current state
            var d = this.state.getDate();
            var m = this.state.getMonth();
            var y = this.state.getFullYear();
            this.ls = (y * 10000 + (m + 1) * 100 + d) + '';
            // First day of month
            var h = new Date(y, m, 1);
            var w = h.getDay();
            if (w == 0)
                w = 7;
            // Last day of month
            var j = new Date(y, m + 1, 0);
            var l = j.getDate();
            var z = 1;
            for (var r = 1; r <= 6; r++) {
                if (this.tr) {
                    b += '<tr style="' + this.tr + '">';
                }
                else {
                    b += '<tr>';
                }
                // rows
                for (var c = 1; c <= 7; c++) {
                    // cols
                    if (r == 1 && c < w) {
                        // empty cell in first row
                        b += '<td style="' + this.se + '"></td>';
                    }
                    else if (z > l) {
                        // empty cell in last row
                        b += '<td style="' + this.se + '"></td>';
                    }
                    else {
                        var k = (y * 10000 + (m + 1) * 100 + z) + '';
                        var t = k == this.td ? this.st : '';
                        var a = this.mt[k];
                        a = a ? ' title="' + a + '"' : '';
                        if (k == this.ls) {
                            b += '<td id="' + this.subId(k) + '" style="' + this.ss + t + '"' + a + '>' + z + '</td>';
                        }
                        else {
                            if (this.am.indexOf(k) >= 0) {
                                b += '<td id="' + this.subId(k) + '" style="' + this.sk + t + '"' + a + '>' + z + '</td>';
                            }
                            else {
                                b += '<td id="' + this.subId(k) + '" style="' + this.sd + t + '"' + a + '>' + z + '</td>';
                            }
                        }
                        z++;
                    }
                }
                b += '</tr>';
                if (z > l)
                    break;
            }
            return b;
        };
        WCalendar.prototype.componentDidMount = function () {
            var _this = this;
            this.ep = document.getElementById(this.subId('p'));
            this.em = document.getElementById(this.subId('m'));
            this.en = document.getElementById(this.subId('n'));
            this.et = document.getElementById(this.subId('t'));
            this.eb = document.getElementById(this.subId('b'));
            if (this.ep) {
                this.ep.addEventListener('click', function (e) {
                    _this.prev();
                });
            }
            if (this.en) {
                this.en.addEventListener('click', function (e) {
                    _this.next();
                });
            }
            this.root.addEventListener('click', function (e) {
                var s = WUX.lastSub(e.target);
                if (!s)
                    return;
                if (s.length == 8) {
                    var n = parseInt(s);
                    var t = s == _this.td ? _this.st : '';
                    // Date
                    var se = _this.ele(_this.state);
                    if (se) {
                        var p = _this.str(_this.state);
                        var q = p == _this.td ? _this.st : '';
                        if (_this.am.indexOf(p) >= 0) {
                            se.setAttribute('style', _this.sk + q);
                        }
                        else {
                            se.setAttribute('style', _this.sd + q);
                        }
                    }
                    e.target['style'] = _this.ss + t;
                    if (_this.ls == s)
                        return;
                    _this.setState(new Date(n / 10000, ((n % 10000) / 100) - 1, (n % 10000) % 100));
                }
            });
            this.root.addEventListener('dblclick', function (e) {
                var s = WUX.lastSub(e.target);
                if (!s)
                    return;
                if (s.length == 8) {
                    _this.trigger('_doubleclick', s);
                }
            });
            this.root.addEventListener('mouseover', function (e) {
                var s = WUX.lastSub(e.target);
                if (!s)
                    return;
                if (s.length == 8) {
                    var t = s == _this.td ? _this.st : '';
                    // Over date
                    e.target['style'] = _this.so + t;
                }
            });
            this.root.addEventListener('mouseout', function (e) {
                var s = WUX.lastSub(e.target);
                if (!s)
                    return;
                if (s.length == 8) {
                    var t = s == _this.td ? _this.st : '';
                    var i = _this.str(_this.state);
                    if (s == i) {
                        // Selected date
                        e.target['style'] = _this.ss + t;
                    }
                    else {
                        if (_this.am.indexOf(s) >= 0) {
                            // Marked date
                            e.target['style'] = _this.sk + t;
                        }
                        else {
                            // Normal date
                            e.target['style'] = _this.sd + t;
                        }
                    }
                }
            });
        };
        return WCalendar;
    }(WUX.WComponent));
    WUX.WCalendar = WCalendar;
    /**
        Chart Component.
        P: string - Chart type (bar, line)
        S: WChartData - Chart data
    */
    var WChart = /** @class */ (function (_super) {
        __extends(WChart, _super);
        function WChart(id, type, classStyle, style) {
            var _this = _super.call(this, id ? id : '*', 'WChart', type, classStyle, style) || this;
            _this.rootTag = 'canvas';
            _this.forceOnChange = true;
            var iw = window.innerWidth;
            _this._w = 750;
            _this._h = 370;
            if (iw < 900 || iw > 1920) {
                _this._w = Math.round(750 * iw / 1400);
                _this._h = Math.round(370 * _this._w / 750);
            }
            _this._attributes = 'width="' + _this._w + '" height="' + _this._h + '"';
            _this.fontSize = 14;
            _this.fontName = 'Arial';
            _this.axis = '#808080';
            _this.grid = '#a0a0a0';
            _this.line = '#e23222';
            _this.offx = 30;
            _this.offy = 30;
            _this.barw = 16;
            return _this;
        }
        WChart.prototype.size = function (width, height) {
            this._w = width;
            this._h = height;
            if (this._w < 40)
                this._w = 40;
            if (this._h < 40)
                this._h = 40;
            this._attributes = 'width="' + this._w + '" height="' + this._h + '"';
            return this;
        };
        Object.defineProperty(WChart.prototype, "width", {
            get: function () {
                return this._w;
            },
            set: function (v) {
                this._w = v;
                if (this._w < 40)
                    this._w = 40;
                this._attributes = 'width="' + this._w + '" height="' + this._h + '"';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WChart.prototype, "height", {
            get: function () {
                return this._h;
            },
            set: function (v) {
                this._h = v;
                if (this._h < 40)
                    this._h = 40;
                this._attributes = 'width="' + this._w + '" height="' + this._h + '"';
            },
            enumerable: false,
            configurable: true
        });
        WChart.prototype.componentDidMount = function () {
            // Get data
            if (!this.state)
                return;
            var s = this.state.series;
            if (!s || !s.length)
                return;
            var d0 = s[0];
            if (!d0 || d0.length < 2)
                return;
            var cs = this.state.styles;
            // Get Context
            var r = this.root;
            var ctx = r.getContext('2d');
            if (!ctx)
                return;
            // Check labels (arguments)
            var labels = this.state.labels;
            var pady = 0;
            var padx = 0;
            var drawL = false;
            if (labels && labels.length == d0.length) {
                var t0 = labels[0];
                var l0 = t0 ? t0.length : 0;
                var dl = l0 > 4 ? Math.ceil(l0 / 2) : 2;
                pady = this.fontSize * dl + 4;
                padx = this.fontSize * 2 + 4;
                drawL = true;
            }
            // Boundary
            var cw = r.width - this.offx - padx;
            var ch = r.height - this.offy - pady;
            var bw = cw / (d0.length - 1);
            // Max Y
            var my = Math.max.apply(Math, d0);
            if (!my)
                my = 4;
            if (this.maxy && this.maxy > my) {
                my = this.maxy;
            }
            // Intermediate Y
            var iy = [Math.round(my / 4), Math.round(my / 2), Math.round(my * 3 / 4)];
            // Step Y
            var sy = ch / my;
            // Axis
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.axis;
            // Origin
            ctx.moveTo(this.offx, this.offy);
            // Y
            ctx.lineTo(this.offx, r.height - pady);
            // X
            ctx.lineTo(r.width - padx, r.height - pady);
            ctx.stroke();
            // Grid
            ctx.beginPath();
            ctx.setLineDash([4, 8]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.grid;
            for (var i = 1; i < d0.length; i++) {
                var x = this.offx + i * bw;
                // X
                ctx.moveTo(x, this.offy);
                ctx.lineTo(x, r.height - pady);
            }
            // Max Y
            ctx.moveTo(this.offx, this.offy);
            ctx.lineTo(r.width - padx, this.offy);
            // Intermediate Y
            for (var _i = 0, iy_1 = iy; _i < iy_1.length; _i++) {
                var vy = iy_1[_i];
                ctx.moveTo(this.offx, r.height - pady - (vy * sy));
                ctx.lineTo(r.width - padx, r.height - pady - (vy * sy));
            }
            ctx.stroke();
            // Labels
            ctx.fillStyle = this.axis;
            ctx.font = this.fontSize + 'px ' + this.fontName;
            ctx.fillText('0', 0, r.height - pady);
            for (var _a = 0, iy_2 = iy; _a < iy_2.length; _a++) {
                var vy = iy_2[_a];
                ctx.fillText('' + vy, 0, r.height - pady - (vy * sy));
            }
            ctx.fillText('' + my, 0, this.offy);
            if (drawL) {
                for (var i = 0; i < labels.length; i++) {
                    var x = this.offx + i * bw;
                    // Etichetta inclinata sull'asse X
                    ctx.save();
                    ctx.translate(x - this.fontSize, r.height);
                    ctx.rotate(-Math.PI / 3);
                    ctx.fillStyle = this.axis;
                    ctx.fillText(labels[i], 0, 0);
                    ctx.restore();
                }
            }
            // Chart
            var type = this.props;
            if (!type)
                type = this.state.type;
            if (!type)
                type = 'line';
            if (type != 'bar') {
                ctx.setLineDash([]);
                for (var j = 0; j < s.length; j++) {
                    var dj = s[j];
                    // Mind this: < d0.length
                    if (!dj || dj.length < d0.length)
                        return;
                    var sl = this.line;
                    if (cs && cs.length > j) {
                        sl = cs[j];
                        if (!sl)
                            sl = this.line;
                    }
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = sl;
                    ctx.moveTo(this.offx, r.height - pady - (dj[0] * sy));
                    // Mind this: < d0.length
                    for (var i = 1; i < d0.length; i++) {
                        var x = this.offx + i * bw;
                        var y = r.height - pady - (dj[i] * sy);
                        ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }
            }
            else {
                if (this.barw < 4)
                    this.barw = 4;
                for (var j = 0; j < s.length; j++) {
                    var dj = s[j];
                    // Mind this: < d0.length
                    if (!dj || dj.length < d0.length)
                        return;
                    var sl = this.line;
                    if (cs && cs.length > j) {
                        sl = cs[j];
                        if (!sl)
                            sl = this.line;
                    }
                    ctx.fillStyle = sl;
                    var sx = j * (this.barw + 1);
                    // Mind this: < d0.length
                    for (var i = 0; i < d0.length; i++) {
                        var x = this.offx + i * bw;
                        var y = r.height - pady - (dj[i] * sy);
                        if (i == 0) {
                            // Review first bar drawing!
                            ctx.fillRect(x + sx, y, this.barw, dj[i] * sy);
                        }
                        else if (s.length < 3) {
                            ctx.fillRect(x + sx - (this.barw / 2), y, this.barw, dj[i] * sy);
                        }
                        else {
                            ctx.fillRect(x + sx - (this.barw / 2) - ((this.barw + 1) * (s.length - 2)), y, this.barw, dj[i] * sy);
                        }
                    }
                }
            }
        };
        return WChart;
    }(WUX.WComponent));
    WUX.WChart = WChart;
})(WUX || (WUX = {}));

var APP;
(function (APP) {
    var Main = /** @class */ (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.render = function () {
            return '<div>Hello World!</div>';
        };
        return Main;
    }(WUX.WComponent));
    APP.Main = Main;
})(APP || (APP = {}));

export {WuxDOM, WUX};
export default APP;
