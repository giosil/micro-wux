﻿/** 
	Micro WRAPPED USER EXPERIENCE - WUX
*/
class WuxDOM {
	public static components: { [id: string]: WUX.WComponent } = {};

	private static renderHandlers: ((e: WUX.WEvent) => any)[] = [];
	private static unmountHandlers: ((e: WUX.WEvent) => any)[] = [];
	private static lastCtx: Element;

	static onRender(handler: (e: WUX.WEvent) => any) {
		WuxDOM.renderHandlers.push(handler);
	}
	static onUnmount(handler: (e: WUX.WEvent) => any) {
		WuxDOM.unmountHandlers.push(handler);
	}
	static getLastContext(): Element {
		return WuxDOM.lastCtx;
	}

	static register(node: WUX.WNode, c?: WUX.WComponent | 'delete'): WUX.WComponent {
		if (!node) return;
		let id: string;
		if (typeof node == 'string') {
			id = node.indexOf('#') == 0 ? node.substring(1) : node;
		}
		else {
			id = node.id;
		}
		if (!c) return WuxDOM.components[id];
		if (typeof c == 'string') {
			let r = WuxDOM.components[id];
			if (r) delete WuxDOM.components[id];
			return r;
		}
		WuxDOM.components[id] = c;
		return c;
	}
	static render(component: WUX.WElement, node?: WUX.WNode, before?: (n?: WUX.WNode) => any, after?: (n?: WUX.WNode) => any): void {
		if (WUX.debug) console.log('WuxDOM.render ' + WUX.str(component) + ' on ' + WUX.str(node) + '...');
		WUX.global.init(() => {
			if (!node) node = WuxDOM.lastCtx ? WuxDOM.lastCtx : document.getElementById('view-root');
			if (before) before(node);
			let ctx = WuxDOM.mount(component, node);
			WuxDOM.lastCtx = ctx;
			if (after) after(node);
			if (WuxDOM.renderHandlers.length > 0) {
				let c: WUX.WComponent = component instanceof WUX.WComponent ? component : null;
				let e: WUX.WEvent = { component: c, element: ctx, target: ctx.firstChild, type: 'render' };
				for (let handler of WuxDOM.renderHandlers) handler(e);
				WuxDOM.renderHandlers = [];
			}
		})
	}
	static mount(e: WUX.WElement, node?: WUX.WNode): Element {
		if (!node) node = WuxDOM.lastCtx ? WuxDOM.lastCtx : document.getElementById('view-root');
		if (WUX.debug) console.log('WuxDOM.mount ' + WUX.str(e) + ' on ' + WUX.str(node) + '...');
		if (e == null) {
			console.error('WuxDOM.mount ' + WUX.str(e) + ' on ' + WUX.str(node) + ' -> invalid component');
			return;
		}
		let ctx: Element;
		if (typeof node == 'string') {
			ctx = document.getElementById(node);
			if(!ctx) ctx = document.querySelector(node);
		}
		else {
			ctx = node;
		}
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
			let t = document.createElement("template");
			t.innerHTML = e;
			ctx.append(t.content.firstElementChild);
		}
		if (WUX.debug) console.log('WuxDOM.mount ' + WUX.str(e) + ' on ' + WUX.str(node) + ' completed.');
		return ctx;
	};
	static unmount(node?: WUX.WNode): Element {
		if (!node) node = WuxDOM.lastCtx ? WuxDOM.lastCtx : document.getElementById('view-root');
		if (WUX.debug) console.log('WuxDOM.unmount ' + WUX.str(node) + '...');
		let ctx: Element;
		if (typeof node == 'string') {
			ctx = document.getElementById(node);
			if(!ctx) ctx = document.querySelector(node);
		}
		else {
			ctx = node;
		}
		if (!ctx) {
			console.error('WuxDOM.unmount ' + WUX.str(node) + ' -> node unavailable');
			return;
		}
		let wcomp = WuxDOM.register(ctx, 'delete');
		if (wcomp) wcomp.unmount();
		ctx.remove();
		if (WUX.debug) console.log('WuxDOM.unmount ' + WUX.str(node) + ' completed.');
		if (WuxDOM.unmountHandlers.length > 0) {
			let e: WUX.WEvent = { component: wcomp, element: ctx, target: ctx.firstChild, type: 'unmount' };
			for (let handler of WuxDOM.unmountHandlers) handler(e);
			WuxDOM.unmountHandlers = [];
		}
		return ctx;
	}
	static replace(o: WUX.WElement, e?: WUX.WElement): Element {
		let node: Element;
		if (!e) {
			e = o;
			o = undefined;
		}
		if (!o) {
			node = WuxDOM.unmount();
		}
		else if (typeof o == 'string') {
			let wcomp = WUX.getComponent(o);
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
			if (node) node.innerHTML = '';
		}
		if (!node) node = document.getElementById('view-root');
		if (!node) {
			console.error('WuxDOM.replace ' + WUX.str(node) + ' -> node unavailable');
			return;
		}
		return WuxDOM.mount(e, node);
	}
	static create(node: WUX.WNode, tag?: string, id?: string, cs?: string, st?: string, inner?: WUX.WNode): Element {
		if (!tag) tag = 'div';
		if (id) {
			let c = document.getElementById(id);
			if(c) return c;
		}
		let n: Element;
		if (typeof node == 'string') {
			n = document.getElementById(node);
			if (!n) n = document.querySelector(node);
		}
		else {
			n = node;
		}
		if (!n) {
			console.error('WuxDOM.create ' + tag + ' with id=' + id + ' on ' + WUX.str(node) + ' -> node unavailable');
			return null;
		}
		let e = document.createElement(tag);
		if (id) e.setAttribute('id', id);
		if (cs) e.setAttribute('class', cs);
		if (st) e.setAttribute('style', st);
		if (inner) {
			if(typeof inner == 'string') {
				e.innerHTML = inner;
			}
			else {
				e.append(inner);
			}
		}
		n.append(e);
		return e;
	}
}
// WUX Base
namespace WUX {

	export type WElement = string | Element | WComponent;

	export type WNode = string | Element;

	export let debug: boolean = false;

	export let registry: string[] = [];

	export const version = '1.0.0';

	/** Global settings */
	export interface WGlobal {
		/** Locale setting */
		locale: string;
		/** Global init function */
		init(callback: () => any): void;
		/** Shared data */
		setData(key: string, data: any, dontTrigger?: boolean): void;
		getData(key: string, def?: any): any;
		onDataChanged(key: string, callback: (data: any) => any): void;
	}

	/** Event interface */
	export interface WEvent {
		component: WComponent;
		element: Element
		target: any;
		type: string;
		data?: any;
	}

	/** WWrapper interface */
	export interface WWrapper {
		id?: string;
		type?: string;
		classStyle?: string;
		style?: string | WStyle;
		attributes?: string;
		begin?: string;
		wrapper?: WWrapper;
		end?: string;
		title?: string;
		icon?: string;
		element?: Element;
	}

	/** WField interface */
	export interface WField {
		id?: string;
		label?: string;
		classStyle?: string;
		style?: string | WStyle;
		attributes?: string;
		span?: number;
		value?: any;
		type?: string;
		key?: string;
		icon?: string;
		tooltip?: string;
		element?: WElement;
		labelCss?: string;
		labelComp?: WComponent;
		colClass?: string;
		colStyle?: string | WStyle;
		component?: WComponent;
		required?: boolean;
		readonly?: boolean;
		autofocus?: boolean;
		enabled?: boolean;
		visible?: boolean;
		build?: (container: any, data: any) => void;
	}

	/** WEntity interface */
	export interface WEntity {
		id: any;
		text?: string;
		code?: string;
		group?: any;
		type?: any;
		reference?: any;
		enabled?: boolean;
		marked?: boolean;
		date?: Date;
		notBefore?: Date;
		expires?: Date;
		icon?: string;
		color?: string;
		value?: number;
	}

	/** WAction interface */
	export interface WAction {
		/** Action name */
		name: string; 
		/** Reference */
		ref?: string;
		/** Reference number (index) */
		idx?: number;
		/** Reference object  */
		obj?: any;
		/** Tag element of action */
		tag?: string;
		/** Component */
		comp?: WComponent;
	}

	/** WISelectable interface */
	export interface WISelectable extends WComponent {
		options: Array<string | WEntity>;
		select(i: number): this;
	}

	/**
	 * Base class of a WUX component.
	 */
	export class WComponent<P = any, S = any> {
		// Base public attributes
		id: string;
		name: string;
		mounted: boolean = false;
		parent: WComponent;
		debug: boolean = WUX.debug;
		forceOnChange: boolean = false;
		data: any;
		cuid: number;
		rootTag = 'div';

		// Internal attributes
		protected context: Element;
		protected root: Element;
		protected $r: JQuery;
		protected internal: WComponent;
		protected props: P;
		protected state: S;
		protected subSeq = 0;
		protected dontTrigger = false;

		// View attributes
		protected _visible: boolean = true;
		protected _enabled: boolean = true;
		protected _style: string;
		protected _baseStyle: string;
		protected _classStyle: string;
		protected _baseClass: string;
		protected _attributes: string;
		protected _tooltip: string;

		// Event handlers
		protected handlers: { [event: string]: ((e?: any) => any)[] } = {};

		constructor(he?: Element);
		constructor(id?: string, name?: string, props?: P, classStyle?: string, style?: string | WStyle, attributes?: string | object);
		constructor(id?: string | Element, name?: string, props?: P, classStyle?: string, style?: string | WStyle, attributes?: string | object) {
			this.cuid = Math.floor(Math.random() * 1000000000);
			if (id instanceof Element) {
				this.root = id as Element;
				if (this.root) this.mounted = true;
				if (this.debug) console.log('[' + str(this) + '] new wrapper root=' + str(this.root));
			}
			else {
				if (typeof id == 'string') this.id = id == '*' ? 'w' + this.cuid : id;
				this.name = name ? name : 'WComponent';
				// Do not use WUX.cls(classStyle, style): it never returns undefined.
				this._classStyle = classStyle;
				let cls = WUX.cls(style);
				if (cls) this._classStyle = this._classStyle ? this._classStyle + ' ' + cls : cls;
				this._style = WUX.style(style);
				this._attributes = WUX.attributes(attributes);
				if (this.debug) console.log('[' + str(this) + '] new');

				if (this.debug) console.log('[' + str(this) + '] updateProps', props);
				this.updateProps(props);
			}
		}

		get visible(): boolean {
			if (this.internal) return this.internal.visible;
			return this._visible;
		}
		set visible(b: boolean) {
			this._visible = b;
			if (this.internal) this.internal.visible = b;
			if (this.root instanceof HTMLElement) {
				if (this._visible) this.root.style.display = "block"; else this.root.style.display = "none";
			}
		}
		get enabled(): boolean {
			if (this.internal) return this.internal.enabled;
			return this._enabled;
		}
		set enabled(b: boolean) {
			this._enabled = b;
			if (this.internal) this.internal.enabled = b;
			if (this.root) {
				if (this._enabled) {
					this.root.removeAttribute('disabled');
				}
				else {
					this.root.setAttribute('disabled', '');
				}
			}
		}
		get style(): string {
			if (this.internal) return this.internal.style;
			return this._style;
		}
		set style(s: string) {
			this._style = WUX.css(this._baseStyle, s);
			if (this.internal) this.internal.style = s;
			if (this.root) this.root.setAttribute('style', this._style);
		}
		get classStyle(): string {
			if (this.internal) return this.internal.classStyle;
			return this._classStyle;
		}
		set classStyle(s: string) {
			if (this.internal) this.internal.classStyle = s;
			let remove = false;
			let toggle = false;
			if (s && s.length > 1 && s.charAt(0) == '!') {
				s = s.substring(1)
				remove = true;
			}
			else if (s && s.length > 1 && s.charAt(0) == '?') {
				s = s.substring(1)
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
		}
		get attributes(): string {
			if (this.internal) return this.internal.attributes;
			return this._attributes;
		}
		set attributes(s: string) {
			this._attributes = s;
			if (this.internal) this.internal.attributes = s;
		}
		get tooltip(): string {
			if (this.internal) return this.internal.tooltip;
			return this._tooltip;
		}
		set tooltip(s: string) {
			this._tooltip = s;
			if (this.internal) this.internal.tooltip = s;
			if (this.root) this.root.setAttribute('title', this._tooltip);
		}

		css(...items: (string | WStyle)[]): this {
			if (!items || items.length == 0) return this;
			let c = cls(...items);
			if (c) this.classStyle = c;
			let s = css(...items);
			if (s) this.style = s;
			return this;
		}

		focus(): this {
			if (this.internal) this.internal.focus();
			if (this.root instanceof HTMLElement) this.root.focus();
			return this;
		}

		blur(): this {
			if (this.internal) this.internal.blur();
			if (this.root instanceof HTMLElement) this.root.blur();
			return this;
		}

		forceUpdate(callback?: () => any): this {
			this.update(this.props, this.state, false, false, true, callback);
			return this;
		}

		getContext(): Element {
			return this.context;
		}
		getRoot(): Element {
			if (!this.root && this.internal) return this.internal.getRoot();
			if (!this.root) {
				if (this.id) {
					let he = document.getElementById(this.id);
					if (he) return he;
				}
				return this.context;
			}
			return this.root;
		}

		getState(): S {
			return this.state;
		}
		setState(nextState: S, force?: boolean, callback?: () => any): this {
			if (this.debug) console.log('[' + str(this) + '] setState', nextState);
			this.update(this.props, nextState, false, true, this.forceOnChange || force, callback);
			return this;
		}

		getProps(): P {
			return this.props;
		}
		setProps(nextProps: P, force?: boolean, callback?: () => any): this {
			if (this.debug) console.log('[' + str(this) + '] setProps', nextProps);
			this.update(nextProps, this.state, true, false, this.forceOnChange || force, callback);
			return this;
		}

		on(events: 'mount' | 'unmount' | 'statechange' | 'propschange', handler: (e: WEvent) => any): this;
		on(events: 'click' | 'dblclick' | 'mouseenter' | 'mouseleave' | 'keypress' | 'keydown' | 'keyup' | 'submit' | 'change' | 'focus' | 'blur' | 'resize', handler: (e: Event) => any): this;
		on(events: string, handler: (e: any) => any): this;
		on(events: string, handler: (e: any) => any): this {
			if (!events) return this;
			let arrayEvents = events.split(' ');
			for (let event of arrayEvents) {
				if (!this.handlers[event]) this.handlers[event] = [];
				this.handlers[event].push(handler);
				if (event.charAt(0) == '_' || event == 'mount' || event == 'unmount' || event == 'statechange' || event == 'propschange') continue;
				if (this.root) this.root.addEventListener(event, handler);
			}
			if (this.internal) this.internal.on(events, handler);
			return this;
		}

		off(events?: 'mount' | 'unmount' | 'statechange' | 'propschange'): this;
		off(events?: 'click' | 'dblclick' | 'mouseenter' | 'mouseleave' | 'keypress' | 'keydown' | 'keyup' | 'submit' | 'change' | 'focus' | 'blur' | 'resize'): this;
		off(events?: string): this;
		off(events?: string): this {
			if (!events) {
				this.handlers = {};
			}
			else {
				let arrayEvents = events.split(' ');
				for (let event of arrayEvents) {
					if (this.root) {
						let hs = this.handlers[event];
						for (let h of hs) {
							this.root.removeEventListener(event, h);
						}
					}
					delete this.handlers[event];
				}
			}
			if (this.internal) this.internal.off(events);
			return this;
		}

		trigger(eventType: 'mount' | 'unmount', data?: any): this;
		trigger(eventType: 'statechange', nextState?: S): this;
		trigger(eventType: 'propschange', nextProps?: P): this;
		trigger(eventType: 'click' | 'dblclick' | 'mouseenter' | 'mouseleave' | 'keypress' | 'keydown' | 'keyup' | 'blur' | 'submit' | 'change' | 'focus' | 'resize', ...extraParameters: any[]): this;
		trigger(eventType: string, ...extParams: any[]): this;
		trigger(eventType: string, ...extParams: any[]): this {
			if (this.debug) console.log('[' + str(this) + '] trigger', eventType, extParams);
			if (!eventType) return;
			let ep0 = extParams && extParams.length > 0 ? extParams[0] : undefined;
			if (eventType.charAt(0) == '_' || eventType == 'mount' || eventType == 'unmount' || eventType == 'statechange' || eventType == 'propschange') {
				if (ep0 !== undefined) {
					if (eventType == 'statechange') {
						if (this.state != extParams[0]) {
							this.state = extParams[0];
							if (this.debug) console.log('[' + str(this) + '] trigger set state', this.state);
						}
					}
					else if (eventType == 'propschange') {
						if (this.props != extParams[0]) {
							this.props = extParams[0];
							if (this.debug) console.log('[' + str(this) + '] trigger set props', this.props);
						}
					}
				}
				if (!this.handlers || !this.handlers[eventType]) return this;
				let event = this.createEvent(eventType, ep0);
				for (let handler of this.handlers[eventType]) handler(event);
			}
			else if (this.root) {
				if (this.debug) console.log('[' + str(this) + '] trigger ' + eventType + ' on root=' + str(this.root));
				this.root.dispatchEvent(new Event(eventType, ep0));
			}
			if (this.internal) {
				if (this.debug) console.log('[' + str(this) + '] trigger ' + eventType + ' on internal=' + str(this.internal));
				this.internal.trigger(eventType, ...extParams);
			}
			return this;
		}

		unmount(): this {
			if (this.debug) console.log('[' + str(this) + '] unmount ctx=' + str(this.context) + ' root=' + str(this.root), this.state, this.props);
			this.componentWillUnmount();
			if (this.internal) this.internal.unmount();
			this.internal = undefined;
			if (this.root) {
				this.root.remove();
			}
			this.root = undefined;
			this.$r = undefined;
			if (this.id) {
				let idx = registry.indexOf(this.id);
				if (idx >= 0) registry.splice(idx, 1);
			}
			this.mounted = false;
			WuxDOM.register(this.id, 'delete');
			this.trigger('unmount');
			return this;
		}

		mount(context?: Element): this {
			if (this.debug) console.log('[' + str(this) + '] mount ctx=' + str(context) + ' root=' + str(this.root), this.state, this.props);
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
					if (!this.context) this.context = this.root;
				}
			}
			try {
				if (this.mounted) this.unmount();
				this.mounted = false;
				if (!(this.context)) {
					let he = document.getElementById(this.id);
					if (he) this.context = he;
				}
				if (this.debug) console.log('[' + str(this) + '] componentWillMount ctx=' + str(context) + ' root=' + str(this.root));
				this.componentWillMount();
				if (this.context) {
					if (this.debug) console.log('[' + str(this) + '] render ctx=' + str(context) + ' root=' + str(this.root));
					let r = this.render();
					if (r) {
						if (r instanceof WComponent) {
							if (this.debug) console.log('[' + str(this) + '] render -> ' + str(r));
							this.internal = r;
							if (!r.parent) r.parent = this;
							r.mount(this.context);
							if (!this.root) {
								if (this.id) {
									let he = document.getElementById(this.id);
									this.root = he ? he : this.internal.getRoot();
								}
								else {
									this.root = this.context;
								}
							}
						}
						else if (r instanceof Element) {
							this.context.append(r);
							if (!this.root) this.root = r as Element;
						}
						else {
							let t = document.createElement("template");
							t.innerHTML = r;
							this.context.append(t.content.firstElementChild);
							let lc = this.context.lastChild;
							if (lc instanceof Element) {
								this.root = lc as Element;
							}
							if (!this.root) this.root = this.id ? document.getElementById(this.id) : this.context;
						}
					}
					else {
						if (this.internal) this.internal.mount(this.context);
						if (!this.root) this.root = this.id ? document.getElementById(this.id) : this.context;
					}
				}
				if (!this._visible) {
					if (this.internal) {
						this.internal.visible = false;
					}
					else {
						if(this.root instanceof HTMLElement) this.root.style.display = 'none';
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
				if (this.debug) console.log('[' + str(this) + '] componentDidMount ctx=' + str(context) + ' root=' + str(this.root));
				let jq = window['jQuery'] ? window['jQuery'] as JQueryStatic : null;
				if(jq) this.$r = jq(this.root as HTMLElement);
				this.componentDidMount();
				if (this.root) {
					for (let event in this.handlers) {
						if (!event || event.charAt(0) == '_') continue;
						if (event == 'mount' || event == 'unmount' || event == 'statechange' || event == 'propschange') continue;
						for (let handler of this.handlers[event]) {
							this.root.addEventListener(event, handler);
						}
					}
				}
				WuxDOM.register(this.root, this)
				this.mounted = true;
				if (this.id) {
					if (!this.internal || this.internal.id != this.id) {
						let idx = registry.indexOf(this.id);
						if (idx >= 0) {
							let wci = WUX.getComponent(this.id);
							if (wci && wci.cuid != this.cuid) {
								console.error('[' + str(this) + '] id already used by ' + str(wci));
							}
						}
						else {
							registry.push(this.id);
						}
					}
				}
				this.trigger('mount');
			}
			catch (e) {
				let errorInfo = str(this) + ' ' + str(this.context);
				console.error('[' + str(this) + '] mount error ' + errorInfo, e);
				this.componentDidCatch(e, errorInfo);
			}
			return this;
		}

		componentWillUnmount(): void {
		}

		protected componentWillMount(): void {
		}

		protected render(): WElement {
			return this.buildRoot(this.rootTag);
		}

		protected componentDidMount(): void {
		}

		protected componentDidCatch?(error: Error, errorInfo: string): void {
		}

		protected shouldComponentUpdate(nextProps: P, nextState: S): boolean {
			if (typeof nextProps == 'object' || typeof nextState == 'object') return true;
			return this.props != nextProps || this.state != nextState;
		}

		protected componentWillUpdate(nextProps: P, nextState: S): void {
		}

		protected componentDidUpdate(prevProps: P, prevState: S): void {
		}

		protected updateProps(nextProps: P): void {
			this.props = nextProps;
		}

		protected updateState(nextState: S): void {
			this.state = nextState;
		}

		protected update(nextProps: P, nextState: S, propsChange: boolean, stateChange: boolean, force: boolean = false, callback?: () => any): boolean {
			if (this.debug) console.log('[' + str(this) + '] update', nextProps, nextState, 'propsChange=' + propsChange + ',stateChange=' + stateChange + ',force=' + force);
			nextProps = nextProps === undefined ? this.props : nextProps;
			let prevProps = this.props;
			let prevState = this.state;
			this.dontTrigger = false;
			if (this.mounted) {
				if (force || this.shouldComponentUpdate(nextProps, nextState)) {
					try {
						if (this.debug) console.log('[' + str(this) + '] componentWillUpdate', nextProps, nextState);
						this.componentWillUpdate(nextProps, nextState);

						if (propsChange) {
							if (this.debug) console.log('[' + str(this) + '] updateProps', nextProps);
							this.updateProps(nextProps);
						}
						if (stateChange) {
							if (this.debug) console.log('[' + str(this) + '] updateState', nextState);
							this.updateState(nextState);
						}

						if (force) this.mount();

						if (this.debug) console.log('[' + str(this) + '] componentDidUpdate', prevProps, prevState);
						this.componentDidUpdate(prevProps, prevState);

						if (propsChange && !this.dontTrigger) this.trigger('propschange');
						if (stateChange && !this.dontTrigger) this.trigger('statechange');
					}
					catch (e) {
						this.componentDidCatch(e, str(this) + '|' + str(this.context));
						return false;
					}
					if (callback) callback();
				}
			}
			else {
				if (propsChange) {
					if (this.debug) console.log('[' + str(this) + '] updateProps', nextProps);
					this.updateProps(nextProps);
					if (!this.dontTrigger) this.trigger('propschange');
				}
				if (stateChange) {
					if (this.debug) console.log('[' + str(this) + '] updateState', nextState);
					this.updateState(nextState);
					if (!this.dontTrigger) this.trigger('statechange');
				}
			}
			return true;
		}

		protected createEvent(type: string, data?: any): WEvent {
			let target = this.root ? this.root.firstChild : this.root;
			return { component: this, element: this.root, target: target, type: type, data: data };
		}

		protected shouldBuildRoot(): boolean {
			if (this.internal) return false;
			if (this.root) return false;
			if (this.context) {
				let ctxId = this.context.id;
				if (!ctxId && ctxId == this.id) return false;
			}
			return true;
		}

		protected buildRoot(tagName?: string, inner?: string, baseAttribs?: string | object, classStyle?: string, style?: string, attributes?: string | object, id?: string): string {
			if (this.debug) console.log('[' + str(this) + '] buildRoot', tagName, inner, baseAttribs, classStyle, style, attributes, id);
			if (!this.shouldBuildRoot()) {
				if (this.debug) console.log('[' + str(this) + '] shouldBuildRoot() -> false');
				return undefined;
			}
			else {
				if (this.debug) console.log('[' + str(this) + '] shouldBuildRoot() -> true');
			}
			return this.build(tagName, inner, baseAttribs, classStyle, style, attributes, id);
		}

		protected build(tagName?: string, inner?: string, baseAttribs?: string | object, classStyle?: string, style?: string, attributes?: string | object, id?: string): string {
			if (!tagName) tagName = 'div';
			if (classStyle === undefined) classStyle = this._classStyle;
			if (style === undefined) style = this._style;
			if (attributes === undefined) attributes = this._attributes;
			if (id === undefined) id = this.id;
			let r = '<' + tagName;
			if (id) r += ' id="' + id + '"';
			if (classStyle) r += ' class="' + classStyle + '"';
			if (style) r += ' style="' + style + '"';
			let a = WUX.attributes(attributes);
			if (a) r += ' ' + a;
			let ba = WUX.attributes(baseAttribs);
			if (ba) r += ' ' + ba;
			r += '>';
			let bca = inner == null ? divide(this.make()) : divide(inner);
			r += bca[1];
			if (tagName == 'input') return bca[0] + r + bca[2];
			r += '</' + tagName + '>';
			return bca[0] + r + bca[2];
		}

		protected make(): string {
			return '';
		}

		subId(wc?: WComponent): string;
		subId(id?: string, s?: any): string;
		subId(id?: string | WComponent, s?: any): string {
			if (id instanceof WComponent) {
				let cid = id.id;
				if (!cid || !this.id) return cid;
				if (cid.indexOf(this.id + '-') != 0) return cid;
				return cid.substring(this.id.length + 1);
			}
			else {
				if (!this.id || this.id == '*') this.id = 'w' + this.cuid;
				if (!id || id == '*') id = (this.subSeq++).toString();
				if (!s && s != 0) return this.id + '-' + id;
				return this.id + '-' + id + '-' + s;
			}
		}

		ripId(sid: string): string {
			if (!sid || !this.id) return sid;
			if (sid.indexOf(this.id) == 0 && sid.length > this.id.length + 1) {
				return sid.substring(this.id.length + 1);
			}
			return sid;
		}

		transferTo(dest: WComponent, force?: boolean, callback?: () => any): boolean {
			if (this.debug) console.log('[' + str(this) + '] transferTo ' + str(dest));
			if (dest) {
				dest.setState(this.getState(), force, callback);
				return true;
			}
			return false;
		}
	}

	/* Global functions */

	export function getId(e: any): string {
		if (!e) return;
		if (e instanceof Element) return (e as Element).id;
		if (e instanceof WComponent) return (e as WComponent).id;
		if (typeof e == 'string') {
			if (e.indexOf('<') < 0) return e.indexOf('#') == 0 ? e.substring(1) : e;
		}
		if (typeof e == 'object' && !e.id) {
			return '' + e.id;
		}
		return '';
	}

	export function firstSub(e: any, r?: boolean): string {
		let id = getId(e);
		if (!id) return '';
		let s = id.indexOf('-');
		if (s < 0) return id;
		if (r) return id.substring(s + 1);
		return id.substring(0, s);
	}

	export function lastSub(e: any): string {
		let id = getId(e);
		if (!id) return '';
		let s = id.lastIndexOf('-');
		if (s < 0) return id;
		if (s > 0) {
			let p = id.charAt(s - 1);
			if (p == '-') return id.substring(s);
		}
		return id.substring(s + 1);
	}

	export function getComponent(id: string): WUX.WComponent {
		if (!id) return;
		return WuxDOM.components[id];
	}

	export function getRootComponent(c: WUX.WComponent): WUX.WComponent {
		if (!c) return c;
		if (!c.parent) return c;
		return getRootComponent(c.parent);
	}

	export function setProps(id: string, p: any): WUX.WComponent {
		if (!id) return;
		let c = WuxDOM.components[id];
		if (!c) return;
		c.setProps(p);
		return c;
	}

	export function getProps(id: string, d?: any): any {
		if (!id) return d;
		let c = WuxDOM.components[id];
		if (!c) return d;
		let p = c.getProps();
		if (p == null) return d;
		return p;
	}

	export function setState(id: string, s: any): WUX.WComponent {
		if (!id) return;
		let c = WuxDOM.components[id];
		if (!c) return;
		c.setState(s);
		return c;
	}

	export function getState(id: string, d?: any): any {
		if (!id) return d;
		let c = WuxDOM.components[id];
		if (!c) return d;
		let s = c.getState();
		if (s == null) return d;
		return s;
	}

	export function newInstance(n: string): WUX.WComponent {
		if (!n) return null;
		let s = n.lastIndexOf('.');
		if (s > 0) {
			let ns = n.substring(0, s);
			if (window[ns]) {
				let c = n.substring(s + 1);
				for (let i in window[ns]) {
					if (i == c) return new window[ns][i];
				}
				return null;
			}
		}
		let p = window[n];
		return (p && p.prototype) ? Object.create(p.prototype) : null;
	}

	export function same(e1: WElement, e2: WElement): boolean {
		if (typeof e1 == 'string' && typeof e2 == 'string') return e1 == e2;
		if (typeof e1 == 'string' || typeof e2 == 'string') return false;
		let id1 = getId(e1);
		let id2 = getId(e2);
		return id1 && id2 && id1 == id2;
	}

	export function match(i: any, o: string | WEntity): boolean {
		if (!o) return !i;
		if (i == null) return typeof o == 'string' ? o == '' : !o.id;
		if (typeof i == 'object') return typeof o == 'string' ? o == i.id : o.id == i.id;
		return typeof o == 'string' ? o == i : o.id == i;
	}

	/**
	 * Split content "before<>content<>after" -> ["before", "content", "after"] 
	 * As well " content " -> ["&nbsp;", "content", "&nbsp;"]
	 *
	 * @param s content
	 */
	export function divide(s: string): [string, string, string] {
		if (!s) return ['', '', ''];
		if (s == ' ') return ['', '&nbsp;', ''];
		let b = s.charAt(0) == ' ' ? '&nbsp;' : '';
		let a = s.length > 1 && s.charAt(s.length - 1) == ' ' ? '&nbsp;' : '';
		let ss = s.trim().split('<>');
		if (!ss || ss.length < 2) return [b, s.trim(), a];
		b += ss[0];
		if (ss.length == 2) return [b, ss[1], ''];
		a += ss[2];
		return [b, ss[1], a];
	}

	/**
	 * Convert to string for log trace.
	 *
	 * @param a any
	 */
	export function str(a: any): string {
		if (a instanceof WComponent) {
			let wcdn = a.name;
			let wcid = a.id;
			if (!wcdn) wcdn = 'WComponent';
			if (!wcid) return wcdn;
			return wcdn + '(' + wcid + ')';
		}
		if (a instanceof Element) {
			return 'Element#' + a.id;
		}
		if (typeof a == 'object') return JSON.stringify(a);
		return a + '';
	}

	export function getTagName(c: any): string {
		if (!c) return '';
		if (c instanceof WComponent) {
			let r = c.rootTag;
			if (r) return r.toLowerCase();
			let root = c.getRoot();
			if (!root) return WUX.getTagName(root);
			return '';
		}
		else if (c instanceof Element) {
			return c.tagName.toLowerCase();
		}
		else {
			let s = '' + c;
			if (s.charAt(0) == '<') {
				let e = s.indexOf(' ');
				if (e < 0) e = s.indexOf('>');
				if (e > 0) {
					let r = s.substring(1, e).toLowerCase();
					if (r.charAt(r.length - 1) == '/') return r.substring(0, r.length - 1);
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

	export interface WStyle {
		/** border */
		b?: string;
		/** border-collapse */
		bc?: 'separate' | 'collapse' | 'initial' | 'inherit' | 'unset';
		/** border-spacing */
		bsp?: string | number;
		/** border-radius */
		br?: string | number;
		/** box-shadow */
		bs?: string;
		/** box-sizing */
		bz?: 'content-box' | 'border-box';
		/** margin */
		m?: string | number;
		/** margin-top */
		mt?: string | number;
		/** margin-right */
		mr?: string | number;
		/** margin-bottom */
		mb?: string | number;
		/** margin-left */
		ml?: string | number;
		/** padding */
		p?: string | number;
		/** padding-top */
		pt?: string | number;
		/** padding-right */
		pr?: string | number;
		/** padding-bottom */
		pb?: string | number;
		/** padding-left */
		pl?: string | number;
		/** text-align */
		a?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
		/** vertical-align */
		v?: string;
		/** display */
		d?: 'inline' | 'block' | 'flex' | 'inline-block' | 'inline-flex' | 'inline-table' | 'list-item' | 'run-in' | 'table' | 'table-caption' | 'table-column-group' | 'table-header-group' | 'table-footer-group' | 'table-row-group' | 'table-cell' | 'table-column' | 'table-row' | 'none' | 'initial' | 'inherit';
		/** z-index */
		z?: string | number;
		/** color */
		c?: string;
		/** background(-color) */
		bg?: string;
		/** background-image */
		bgi?: string;
		/** background-repeat */
		bgr?: 'repeat' | 'space' | 'round' | 'repeat-x' | 'repeat-y' | 'no-repeat' | 'initial' | 'inherit' | 'unset';
		/** background-position */
		bgp?: string;
		/** cursor */
		cr?: string;
		/** content */
		cn?: string;
		/** font(-size) */
		f?: string | number;
		/** font-style */
		fs?: 'normal' | 'italic' | 'oblique' | 'inherit';
		/** font-weight */
		fw?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'inherit';
		/** text-transform */
		tt?: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | 'initial' | 'inherit';
		/** transform */
		tr?: string;
		/** float */
		fl?: 'left' | 'right' | 'none' | 'initial' | 'inherit';
		/** clear */
		cl?: 'left' | 'right' | 'both' | 'none' | 'initial' | 'inherit';
		/** overflow */
		o?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
		/** overflow-x */
		ox?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
		/** overflow-y */
		oy?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
		/** opacity */
		op?: number;
		/** outline */
		ol?: number;
		/** text(-decoration) */
		text?: string;
		/** -webkit -moz -o -ms */
		k?: string
		/** line-height */
		lh?: string;
		/** position */
		ps?: 'absolute' | 'fixed' | 'inherit' | 'initial' | 'relative' | 'static' | 'sticky' | 'unset';
		/** left */
		l?: string | number;
		/** right */
		r?: string | number;
		/** top */
		t?: string | number;
		/** bottom */
		bt?: string | number;
		/** width */
		w?: string | number;
		/** height */
		h?: string | number;
		/** min-width */
		minw?: string | number;
		/** max-width */
		maxw?: string | number;
		/** min-height */
		minh?: string | number;
		/** max-height */
		maxh?: string | number;
		/** white-space */
		ws?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'initial' | 'inherit';
		/** style */
		s?: string;
		/** class name */
		n?: string;
	}

	export function style(ws: string | WStyle): string {
		let s = '';
		if (!ws) return s;
		if (typeof ws == 'string') {
			if (ws.indexOf(':') <= 0) return '';
			if (ws.charAt(ws.length - 1) != ';') return ws + ';';
			return ws;
		}
		if (ws.s) s += css(ws.s);
		if (ws.fs) s += 'font-style:' + ws.fs + ';';
		if (ws.fw) s += 'font-weight:' + ws.fw + ';';
		if (ws.tt) s += 'text-transform:' + ws.tt + ';';
		if (ws.tr) s += 'transform:' + ws.tr + ';';
		if (ws.fl) s += 'float:' + ws.fl + ';';
		if (ws.cl) s += 'clear:' + ws.cl + ';';
		if (ws.a) s += 'text-align:' + ws.a + ';';
		if (ws.c) s += 'color:' + ws.c + ';';
		if (ws.v) s += 'vertical-align:' + ws.v + ';';
		if (ws.d) s += 'display:' + ws.d + ';';
		if (ws.z) s += 'z-index:' + ws.z + ';';
		if (ws.lh) s += 'line-height:' + ws.lh + ';';
		if (ws.ps) s += 'position:' + ws.ps + ';';
		if (ws.o) s += 'overflow:' + ws.o + ';';
		if (ws.ox) s += 'overflow-x:' + ws.ox + ';';
		if (ws.oy) s += 'overflow-y:' + ws.oy + ';';
		if (ws.op != null) s += 'opacity:' + ws.op + ';';
		if (ws.ol != null) s += 'outline:' + ws.ol + ';';
		if (ws.cr) s += 'cursor:' + ws.cr + ';';
		if (ws.cn) s += 'content:' + ws.cn + ';';
		if (ws.k && ws.k.indexOf(':') > 0) s += ws.k.charAt(0) == '-' ? '-webkit' + ws.k + ';' : '-webkit-' + ws.k + ';';
		if (ws.k && ws.k.indexOf(':') > 0) s += ws.k.charAt(0) == '-' ? '-moz' + ws.k + ';' : '-moz-' + ws.k + ';';
		if (ws.k && ws.k.indexOf(':') > 0) s += ws.k.charAt(0) == '-' ? '-o' + ws.k + ';' : '-o-' + ws.k + ';';
		if (ws.k && ws.k.indexOf(':') > 0) s += ws.k.charAt(0) == '-' ? '-ms' + ws.k + ';' : '-ms-' + ws.k + ';';
		if (ws.bs) s += 'box-shadow:' + ws.bs + ';';
		if (ws.bz) s += 'box-sizing:' + ws.bz + ';';
		if (ws.b) s += ws.b.indexOf(':') > 0 ? css('border' + ws.b) : ws.b.match(/^(|none|inherit|initial|unset)$/) ? 'border:' + ws.b + ';' : ws.b.indexOf(' ') > 0 ? 'border:' + ws.b + ';' : 'border:1px solid ' + ws.b + ';';
		if (ws.bc) s += 'border-collapse:' + ws.bc + ';';
		if (ws.br != null) s += typeof ws.br == 'number' ? 'border-radius:' + ws.br + 'px;' : 'border-radius:' + ws.br + ';'
		if (ws.bsp != null) s += typeof ws.bsp == 'number' ? 'border-spacing:' + ws.bsp + 'px;' : 'border-spacing:' + ws.bsp + ';'
		if (ws.m != null) s += typeof ws.m == 'number' ? 'margin:' + ws.m + 'px;' : ws.m.indexOf(':') > 0 ? css('margin' + ws.m) : 'margin:' + ws.m + ';';
		if (ws.mt != null) s += typeof ws.mt == 'number' ? 'margin-top:' + ws.mt + 'px;' : 'margin-top:' + ws.mt + ';';
		if (ws.mr != null) s += typeof ws.mr == 'number' ? 'margin-right:' + ws.mr + 'px;' : 'margin-right:' + ws.mr + ';';
		if (ws.mb != null) s += typeof ws.mb == 'number' ? 'margin-bottom:' + ws.mb + 'px;' : 'margin-bottom:' + ws.mb + ';';
		if (ws.ml != null) s += typeof ws.ml == 'number' ? 'margin-left:' + ws.ml + 'px;' : 'margin-left:' + ws.ml + ';';
		if (ws.p != null) s += typeof ws.p == 'number' ? 'padding:' + ws.p + 'px;' : ws.p.indexOf(':') > 0 ? css('padding' + ws.p) : 'padding:' + ws.p + ';';
		if (ws.pt != null) s += typeof ws.pt == 'number' ? 'padding-top:' + ws.pt + 'px;' : 'padding-top:' + ws.pt + ';';
		if (ws.pr != null) s += typeof ws.pr == 'number' ? 'padding-right:' + ws.pr + 'px;' : 'padding-right:' + ws.pr + ';';
		if (ws.pb != null) s += typeof ws.pb == 'number' ? 'padding-bottom:' + ws.pb + 'px;' : 'padding-bottom:' + ws.pb + ';';
		if (ws.pl != null) s += typeof ws.pl == 'number' ? 'padding-left:' + ws.pl + 'px;' : 'padding-left:' + ws.pl + ';';
		if (ws.f != null) s += typeof ws.f == 'number' ? 'font-size:' + ws.f + 'px;' : ws.f.indexOf(':') > 0 ? css('font' + ws.f) : 'font-size:' + ws.f + ';';
		if (ws.bg) s += ws.bg.indexOf(':') > 0 ? css('background' + ws.bg) : ws.bg.indexOf('url') >= 0 ? 'background:' + ws.bg + ';' : 'background-color:' + ws.bg + ';';
		if (ws.bgi) s += 'background-image:' + ws.bgi + ';';
		if (ws.bgp) s += 'background-position:' + ws.bgp + ';';
		if (ws.bgr) s += 'background-repeat:' + ws.bgr + ';';
		if (ws.text) s += ws.text.indexOf(':') > 0 ? css('text' + ws.text) : 'text-decoration:' + ws.text + ';';
		if (ws.l != null) s += typeof ws.l == 'number' ? 'left:' + ws.l + 'px;' : 'left:' + ws.l + ';'
		if (ws.r != null) s += typeof ws.r == 'number' ? 'right:' + ws.r + 'px;' : 'right:' + ws.r + ';'
		if (ws.t != null) s += typeof ws.t == 'number' ? 'top:' + ws.t + 'px;' : 'top:' + ws.t + ';'
		if (ws.bt != null) s += typeof ws.bt == 'number' ? 'bottom:' + ws.bt + 'px;' : 'bottom:' + ws.bt + ';'
		if (ws.w) s += typeof ws.w == 'number' ? 'width:' + ws.w + 'px;' : 'width:' + ws.w + ';'
		if (ws.h) s += typeof ws.h == 'number' ? 'height:' + ws.h + 'px;' : 'height:' + ws.h + ';'
		if (ws.minw) s += typeof ws.minw == 'number' ? 'min-width:' + ws.minw + 'px;' : 'min-width:' + ws.minw + ';'
		if (ws.maxw) s += typeof ws.maxw == 'number' ? 'max-width:' + ws.maxw + 'px;' : 'max-width:' + ws.maxw + ';'
		if (ws.minh) s += typeof ws.minh == 'number' ? 'min-height:' + ws.minh + 'px;' : 'min-height:' + ws.minh + ';'
		if (ws.maxh) s += typeof ws.maxh == 'number' ? 'max-height:' + ws.maxh + 'px;' : 'max-height:' + ws.maxh + ';'
		if (ws.ws) s += 'white-space:' + ws.ws + ';';
		return s;
	}

	export function addStyle(s: string, k: string, v: string, n?: boolean): string {
		if (!k || !v) return css(s);
		if (!s) return k + ':' + v + ';';
		if (n) {
			if (s.indexOf(k + ':') >= 0) return css(s);
			return css(s) + k + ':' + v + ';';
		}
		return css(s) + k + ':' + v + ';';
	}

	export function css(...a: (string | WStyle)[]): string {
		if (!a || a.length == 0) return '';
		let s = '';
		let x: WStyle = {};
		let xi = true;
		for (let i = 0; i < a.length; i++) {
			let e = a[i];
			if (!e) continue;
			if (typeof e != 'string') {
				x = { ...x, ...e };
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
				if (e.charAt(e.length - 1) != ';') s += ';'
			}
		}
		if (!xi) s += style(x);
		return s;
	}

	export function cls(...a: (string | WStyle)[]): string {
		if (!a || !a.length) return '';
		let s = '';
		for (let i = 0; i < a.length; i++) {
			let e = a[i];
			if (!e) continue;
			let se = typeof e == 'string' ? e : e.n;
			if (!se) continue;
			if (se.indexOf(':') > 0) continue;
			s += se + ' ';
		}
		return s.trim();
	}

	export function attributes(a: any): string {
		if (!a) return '';
		if (typeof a == 'string') return a;
		if (typeof a == 'object') {
			let r = '';
			for (var k in a) r += k + '="' + a[k] + '" ';
			return r.trim();
		}
		return '';
	}

	export function buildCss(...a: (string | WStyle)[]): string {
		if (!a || !a.length) return '';
		let c = cls(...a);
		let s = css(...a);
		let r = '';
		if (c) r += ' class="' + c + '"';
		if (s) r += ' style="' + s + '"';
		return r;
	}

	export function addClass(css: string, name: string): string {
		if (!css) return name;
		if (!name) return css;
		let classes = css.split(' ');
		for (let c of classes) {
			if (c == name) return css;
		}
		return css + ' ' + name;
	}

	export function removeClass(css: string, name: string): string {
		if (!css || !name) return css;
		let classes = css.split(' ');
		let r = '';
		for (let c of classes) {
			if (c == name) continue;
			r += c + ' ';
		}
		return r.trim();
	}

	export function toggleClass(css: string, name: string): string {
		if (!css) return name;
		if (!name) return css;
		let classes = css.split(' ');
		let f = false;
		let r = '';
		for (let c of classes) {
			if (c == name) {
				f = true;
				continue;
			}
			r += c + ' ';
		}
		if (!f) return r.trim() + ' ' + name;
		return r.trim();
	}

	export function addClassOf(e: Element, name: string) {
		if (!e) return;
		e.setAttribute('class', addClass(e.getAttribute('class'), name));
	}

	export function removeClassOf(e: Element, name: string) {
		if (!e) return;
		let c = e.getAttribute('class');
		if(!c) return;
		e.setAttribute('class', removeClass(e.getAttribute('class'), name));
	}

	export function toggleClassOf(e: Element, name: string) {
		if (!e) return;
		e.setAttribute('class', toggleClass(e.getAttribute('class'), name));
	}

	export function setCss(e: WComponent | Element, ...a: (string | WStyle)[]): WComponent | Element {
		if (!e || !a || !a.length) return e;
		if (e instanceof WComponent) {
			e.css(...a);
		}
		else if (e instanceof Element) {
			let s = css(...a);
			let c = cls(...a);
			if (c) addClassOf(e, c);
			if (s) e.setAttribute('style', style(s));
		}
		return e;
	}

	export function build(tagName: string, inner?: string, css?: string | WStyle, attributes?: string | object, id?: string, classStyle?: string): string {
		if (!tagName) tagName = 'div';
		let clsStyle: string;
		let style: string;
		if (typeof css == 'string') {
			if (css.indexOf(':') > 0) {
				style = css;
			}
			else {
				clsStyle = css;
			}
		}
		else if (css) {
			if (css.n) clsStyle = css.n;
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
		let r = '<' + tagName;
		if (id) r += ' id="' + id + '"';
		if (clsStyle) r += ' class="' + clsStyle + '"';
		if (style) r += ' style="' + style + '"';
		let a = WUX.attributes(attributes);
		if (a) r += ' ' + a;
		r += '>';
		let bca = divide(inner);
		r += bca[1];
		if (tagName == 'input') return bca[0] + r + bca[2];
		r += '</' + tagName + '>';
		return bca[0] + r + bca[2];
	}

	/** Shared data */
	let _data: { [key: string]: any } = {};
	/** DataChanged callbacks */
	let _dccb: { [key: string]: ((e?: any) => any)[] } = {};
	
	/** Internal init */
	export let init0: (callback: () => any) => any;
	/** App init */
	export let initApp: (callback: () => any) => any;
	
	export let global: WGlobal = {
		locale: 'it',

		init: function _init(callback: () => any) {
			if (debug) console.log('[WUX] global.init...');
			if (init0) {
				if (initApp) {
					init0(() => initApp(callback));
				}
				else {
					init0(callback);
				}
			}
			else if (initApp) {
				initApp(callback);
			}
			else {
				if (callback) callback();
			}
		},

		setData(key: string, data: any, dontTrigger: boolean = false): void {
			if (!key) key = 'global';
			_data[key] = data;
			if (dontTrigger) return;
			if (!_dccb[key]) return;
			for (let cb of _dccb[key]) cb(data);
		},

		getData(key: string, def?: any): any {
			if (!key) key = 'global';
			let r = _data[key];
			if (r == null) return def;
			return r;
		},

		onDataChanged(key: string, callback: (data: any) => any) {
			if (!key) key = 'global';
			if (!_dccb[key]) _dccb[key] = [];
			_dccb[key].push(callback);
		}
	}
}