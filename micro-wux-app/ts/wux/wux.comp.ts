namespace WUX {

	export class Wrapp extends WComponent<WElement, any> {
		isText: boolean;
		constructor(props: WElement) {
			super(null, 'Wrapp', props);
		}

		protected render() {
			this.isText = false;
			if(typeof this.props == 'string') {
				if(!this.props || this.props.indexOf('<') < 0) {
					this.isText = true;
					return this.buildRoot(this.rootTag, this.props);
				}
			}
			return this.props;
		}

		protected componentDidMount(): void {
			if(this.root && !this.isText) {
				this.rootTag = this.root.tagName;
				this.id = this.root.getAttribute('id');
				this._classStyle = this.root.getAttribute('class');
				this._style = this.root.getAttribute('style'); 
			}
		}
	}

	export class WContainer extends WComponent<string, any> {
		cbef: WElement[];   // Before elements 
		caft: WElement[];   // After elements
		cint: WComponent[]; // internal components
		comp: WComponent[];
		sr_c: string[];
		grid: string[][];

		constructor(id?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object, inline?: boolean, type?: string) {
			// WComponent init
			super(id ? id : '*', 'WContainer', type, classStyle, WUX.style(style), attributes);
			// WContainer init
			this.cbef = [];
			this.caft = [];
			this.cint = [];
			this.comp = [];
			this.sr_c = [];
			this.grid = [];
			this.rootTag = inline ? 'span' : 'div';
		}

		addRow(classStyle?: string, style?: string | WStyle): this {
			if(classStyle == null) classStyle = 'row';
			let g: string[] = [];
			let s = WUX.style(style);
			if(s) classStyle += '^' + s;
			g.push(classStyle);
			this.grid.push(g);
			return this;
		}

		addCol(classStyle?: string, style?: string | WStyle): this {
			if(!classStyle) classStyle = 'col-12';
			if(!isNaN(parseInt(classStyle))) classStyle = 'col-' + classStyle;
			if(!this.grid.length) this.addRow();
			let g = this.grid[this.grid.length - 1];
			let s = WUX.style(style);
			if(s) classStyle += '^' + s;
			g.push(classStyle);
			return this;
		}

		before(...items: WElement[]): this {
			if(!items) return this;
			this.cbef = items;
			return this;
		}

		after(...items: WElement[]): this {
			if(!items) return this;
			this.caft = items;
			return this;
		}

		add(component: WElement, constraints?: string): this {
			if(!component) return this;
			if(typeof component == 'string') {
				this.add(new Wrapp(component), constraints);
				return this;
			}
			else if(component instanceof Element) {
				this.add(new Wrapp(component), constraints);
				return this;
			}
			else {
				if(!component.parent) component.parent = this;
				if(!this.grid.length) {
					this.cint.push(component);
					return this;
				}
				if(constraints == 'internal') {
					this.cint.push(component);
					return this;
				}
				if(constraints == 'before') {
					this.cbef.push(component);
					return this;
				}
				if(constraints == 'after') {
					this.caft.push(component);
					return this;
				}
				let r = this.grid.length - 1;
				if(constraints) {
					let x = parseInt(constraints);
					if(!isNaN(x)) {
						if(x < 0) {
							this.cint.push(component);
							return this;
						}
						else {
							r = x;
						}
					}
				}
				let g = this.grid[r];
				let c = g.length - 1;
				this.comp.push(component);
				this.sr_c.push(this.subId(r + '_' + c));
				return this;
			}
		}

		addGroup(w: WWrapper, ...ac: WElement[]): this {
			if (w) {
				let cnt = this.addContainer(w);
				if (!ac || !ac.length) return this;
				for (let c of ac) {
					if(c) cnt.add(c);
				}
				return this;
			}
			if (!ac || !ac.length) return this;
			for (let c of ac) {
				if(c) this.add(c);
			}
			return this;
		}

		addLine(style: string | WStyle, ...ac: WElement[]): this {
			let w = new WContainer();
			w.addRow();
			if(ac) {
				let n = '1';
				if(typeof style != 'string') {
					n = style.n;
					if(!n) n = '1';
				}
				for (let c of ac) {
					if(c) w.addCol(n, style).add(c);
				}
			}
			this.add(w);
			return this;
		}

		addStack(style: string | WStyle, ...ac: WElement[]): this {
			let w = new WContainer();
			if(ac) {
				let n = '12';
				if(typeof style != 'string') {
					n = style.n;
					if(!n) n = '12';
				}
				for (let c of ac) {
					if(c) w.addRow().addCol(n, style).add(c);
				}
			}
			this.add(w);
			return this;
		}

		addContainer(c: WUX.WContainer, constraints?: string): WContainer;
		addContainer(w: WWrapper, constraints?: string): WContainer;
		addContainer(i: string, classStyle?: string, style?: string, attributes?: string | object, inline?: boolean, type?: string): WContainer;
		addContainer(c_w_i: WUX.WContainer | WWrapper | string , con_cls?: string, style?: string, attributes?: string | object, inline?: boolean, type?: string): WContainer {
			let c: WContainer;
			if(typeof c_w_i == 'string') {
				c = new WContainer(c_w_i, con_cls, style, attributes, inline, type);
				this.add(c);
			}
			else if(c_w_i instanceof WContainer) {
				c_w_i.parent = this;
				this.add(c_w_i, con_cls);
			}
			else {
				c = new WContainer();
				if(c_w_i) {
					c.classStyle = WUX.cls(c_w_i.classStyle, c_w_i.style)
					c.style = WUX.style(c_w_i.style);
					c.attributes = c_w_i.attributes;
				}
				this.add(c, con_cls);
			}
			return c;
		}

		addDiv(height: number, inner?: string, classStyle?: string): WContainer;
		addDiv(css: string | WStyle, inner?: string, attributes?: string, id?: string): WContainer;
		addDiv(hcss: number | string | WStyle, inner?: string, cls_att?: string, id?: string): WContainer {
			if (typeof hcss == 'number') {
				if (hcss < 1) return this;
				let r = WUX.build('div', inner, { h: hcss, n: cls_att });
				return this.add(r);
			}
			else {
				let r = WUX.build('div', inner, hcss, cls_att, id);
				return this.add(r);
			}
		}

		end(): WContainer {
			if (this.parent instanceof WContainer) return this.parent.end();
			return this;
		}

		protected componentWillMount(): void {
			for(let e of this.cbef) {
				if(typeof e == 'string') {
					// string (see render)
				}
				else if(e instanceof Element) {
					// Element
					if(this.context) this.context.append(e);
				}
				else {
					// WComponent
					e.mount(this.context);
				}
			}
		}

		protected render(): any {
			let inner = '';
			let rm = this.grid.length;
			if(rm) {
				for(let r = 0; r < rm; r++) {
					let g = this.grid[r];
					let cm = g.length;
					if(!cm) continue;
					inner += '<div ' + this.cs(g[0]) + ' id="' + this.subId(r + '_0') + '">';
					for(let c = 1; c < cm; c++) {
						inner += '<div id="' + this.subId(r + '_' + c) + '" ' + this.cs(g[c]) + '></div>';
					}
					inner += "</div>";
				}
			}
			let s0 = '';
			let s1 = '';
			// Before
			for(let e of this.cbef) {
				if(typeof e == 'string') s0 += e;
			}
			// After
			for(let e of this.caft) {
				if(typeof e == 'string') s1 += e;
			}
			return s0 + this.buildRoot(this.rootTag, inner) + s1;
		}

		protected componentDidMount(): void {
			for(let i = 0; i < this.cint.length; i++) {
				this.cint[i].mount(this.root);
			}
			for(let i = 0; i < this.comp.length; i++) {
				let c = this.comp[i];
				let e = document.getElementById(this.sr_c[i]);
				if(!e) continue;
				c.mount(e);
			}
			for(let e of this.caft) {
				if(typeof e == 'string') {
					// string (see render)
				}
				else if(e instanceof Element) {
					// Element
					if(this.context) this.context.append(e);
				}
				else {
					// WComponent
					e.mount(this.context);
				}
			}
		}

		componentWillUnmount(): void {
			for(let e of this.cbef) {
				if(e instanceof WComponent) e.unmount();
			}
			for(let c of this.cint) c.unmount();
			for(let c of this.comp) c.unmount();
			for(let e of this.caft) {
				if(e instanceof WComponent) e.unmount();
			}
		}

		protected cs(cs: string) {
			if(!cs) return '';
			let x = cs.indexOf('^');
			if(x < 0) return 'class="' + cs + '"';
			let c = cs.substring(0, x);
			let s = cs.substring(x + 1);
			return 'class="' + c + '" style="' + s + '"';
		}

		getElement(r: number, c?: number): HTMLElement {
			if(!this.grid || !this.grid.length) {
				return null;
			}
			if(r < 0) {
				r = this.grid.length + r;
				if(r < 0) r = 0;
			}
			if(this.grid.length <= r) {
				return null;
			}
			if(c == null) {
				return document.getElementById(this.subId(r + '_0'));
			}
			let g = this.grid[r];
			// g = columns + row
			if(!g || g.length < 2) {
				return null;
			}
			if(c < 0) {
				c = g.length - 1 + c;
				if(c < 0) c = 0;
			}
			// c in id starts at 1
			c++;
			return document.getElementById(this.subId(r + '_' + c));
		}
	}

	export class WLink extends WComponent<string, string> {
		protected _href: string;
		protected _target: string;

		constructor(id?: string, text?: string, icon?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object, href?: string, target?: string) {
			// WComponent init
			super(id ? id : '*', 'WLink', icon, classStyle, style, attributes);
			this.updateState(text);
			this.rootTag = 'a';
			// WLink init
			this._href = href;
			this._target = target;
		}

		get icon(): string {
			return this.props;
		}
		set icon(s: string) {
			this.update(s, this.state, true, false, false);
		}

		get href(): string {
			return this._href;
		}
		set href(s: string) {
			this._href = s;
			if (this.root) {
				if (s) {
					this.root.setAttribute('href', s);
				}
				else {
					this.root.removeAttribute('href');
				}
			}
		}

		get target(): string {
			return this._target;
		}
		set target(s: string) {
			this._target = s;
			if (this.root) {
				if (s) {
					this.root.setAttribute('target', s);
				}
				else {
					this.root.removeAttribute('target');
				}
			}
		}

		protected render() {
			let addAttributes = '';
			if (this._href) addAttributes += 'href="' + this._href + '"';
			if (this._target) {
				if (addAttributes) addAttributes += ' ';
				addAttributes += 'target="' + this._target + '"';
			}
			let html = '';
			if (this.state) {
				html += WUX.buildIcon(this.icon, '', ' ') + this.state;
			}
			else {
				html += WUX.buildIcon(this.icon);
			}
			return this.build(this.rootTag, html, addAttributes);
		}

		protected componentDidMount(): void {
			if (this._tooltip) this.root.setAttribute('title', this._tooltip);
		}

		protected componentWillUpdate(nextProps: any, nextState: any): void {
			let html = '';
			if (nextState) {
				html += WUX.buildIcon(this.icon, '', ' ') + nextState;
			}
			else {
				html += WUX.buildIcon(this.icon);
			}
			this.root.innerHTML = html;
		}
	}

	export class WLabel extends WComponent<string, string> {
		forId: string;

		constructor(id?: string, text?: string, icon?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object) {
			// WComponent init
			super(id ? id : '*', 'WLabel', icon, classStyle, style, attributes);
			this.rootTag = 'span';
			this.updateState(text);
		}

		get icon(): string {
			return this.props;
		}
		set icon(i: string) {
			this.update(i, this.state, true, false, false);
		}

		protected updateState(nextState: string): void {
			if (!nextState) nextState = '';
			super.updateState(nextState);
			if (this.root) this.root.innerHTML = WUX.buildIcon(this.props, '', ' ') + nextState;
		}

		for(e: WElement): this {
			this.forId = WUX.getId(e);
			return this;
		}

		protected render() {
			let text = this.state ? this.state : '';
			if (this.forId) return this.buildRoot('label', WUX.buildIcon(this.props, '', ' ') + text, 'for="' + this.forId + '"', this._classStyle);
			return this.buildRoot(this.rootTag, WUX.buildIcon(this.props, '', ' ') + text, null, this._classStyle);
		}

		protected componentDidMount(): void {
			if (this._tooltip) this.root.setAttribute('title', this._tooltip);
		}
	}

	export class WInput extends WComponent<string, string> {
		size: number;
		label: string;
		placeHolder: string;
		readonly: boolean;

		constructor(id?: string, type?: string, size?: number, classStyle?: string, style?: string | WStyle, attributes?: string | object) {
			// WComponent init
			super(id ? id : '*', 'WInput', type, classStyle, style, attributes);
			this.rootTag = 'input';
			// WInput init
			this.size = size;
		}

		protected updateState(nextState: string) {
			if (!nextState) nextState = '';
			super.updateState(nextState);
			if (this.root) this.root['value'] = nextState;
		}

		getState(): string {
			if(this.root) {
				this.state = this.root['value'];
			}
			return this.state;
		}

		protected render() {
			let l = '';
			if (this.label) {
				l = this.id ? '<label for="' + this.id + '">' : '<label>'
				let br = this.label.lastIndexOf('<br');
				if (br > 0) {
					l += this.label.substring(0, br).replace('<', '&lt;').replace('>', '&gt;')
					l += '</label><br>';
				}
				else {
					l += this.label.replace('<', '&lt;').replace('>', '&gt;')
					l += '</label> ';
				}
			}
			if (this.props == 'static') {
				return l + this.build('span', this.state);
			}
			else {
				let addAttributes = 'name="' + this.id + '"';
				addAttributes += this.props ? ' type="' + this.props + '"' : ' type="text"';
				if (this.size) addAttributes += ' size="' + this.size + '"';
				if (this.state) addAttributes += ' value="' + this.state + '"';
				if (this.placeHolder) addAttributes += ' placeholder="' + this.placeHolder + '"';
				if (this.readonly) addAttributes += ' readonly';
				return l + this.build(this.rootTag, '', addAttributes);
			}
		}
	}

	export class WTextArea extends WComponent<number, string> {
		readonly: boolean;

		constructor(id?: string, rows?: number, classStyle?: string, style?: string | WStyle, attributes?: string | object) {
			// WComponent init
			super(id ? id : '*', 'WTextArea', rows, classStyle, style, attributes);
			this.rootTag = 'textarea';
			if (!rows) this.props = 5;
		}

		protected updateState(nextState: string) {
			if (!nextState) nextState = '';
			super.updateState(nextState);
			if (this.root) this.root['value'] = nextState;
		}

		getState(): string {
			if(this.root) {
				this.state = this.root['value'];
			}
			return this.state;
		}

		protected render() {
			if (!this.props) this.props = 1;
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
			if(this.readonly) {
				if(!this._attributes) {
					this._attributes = 'readonly';
				}
				else if(this._attributes.indexOf('readonly') < 0) {
					this._attributes += ' readonly';
				}
			}
			else {
				if(this._attributes && this._attributes.indexOf('readonly') >= 0) {
					this._attributes.replace('readonly', '');
				}
			}
			return WUX.build('textarea', '', this._style, this._attributes, this.id, this._classStyle);
		}

		protected componentDidMount(): void {
			if (this._tooltip) this.root.setAttribute('title', this._tooltip);
			if (this.state) this.root.setAttribute('value', this.state);
		}
	}
	
	export class WButton extends WComponent<string, string> {
		public readonly type: string;

		constructor(id?: string, text?: string, icon?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object, type?: string) {
			// WComponent init
			super(id ? id : '*', 'WButton', icon, classStyle, style, attributes);
			this.updateState(text);
			this.rootTag = 'button';
			// WButton init
			this.type = type ? type : 'button';
		}

		get icon(): string {
			return this.props;
		}
		set icon(i: string) {
			this.update(i, this.state, true, false, false);
		}

		setText(text?: string, icon?: string) {
			if (icon != null) this.props = icon;
			this.setState(text);
		}

		protected render() {
			let addAttributes = this.type ? 'type="' + this.type + '"' : '';
			let html = '';
			if (this.state) {
				html += WUX.buildIcon(this.props, '', ' ') + this.state;
			}
			else {
				html += WUX.buildIcon(this.props);
			}
			return this.build(this.rootTag, html, addAttributes);
		}

		protected componentDidMount(): void {
			if (this._tooltip) this.root.setAttribute('title', this._tooltip);
		}

		protected componentWillUpdate(nextProps: any, nextState: any): void {
			let html = '';
			if(nextProps == null) nextProps = this.props;
			if (nextState) {
				html += WUX.buildIcon(nextProps, '', ' ') + nextState;
			}
			else {
				html += WUX.buildIcon(nextProps);
			}
			this.root.innerHTML = html;
		}
	}
	
	export class WCheck extends WComponent<boolean, any> {
		wrapper: WUX.WContainer;
		value: any;
		protected _text: string;
		protected _obs: MutationObserver;

		constructor(id?: string, text?: string, value?: any, checked?: boolean, classStyle?: string, style?: string | WStyle, attributes?: string | object) {
			// WComponent init
			super(id ? id : '*', 'WCheck', checked, classStyle, style, attributes);
			this.rootTag = 'input';
			// WCheck init
			this.value = value ? value : '1';
			if (checked) this.updateState(value);
			this._text = text;
		}

		get text(): string {
			return this._text;
		}
		set text(s: string) {
			this._text = s;
		}

		get checked(): boolean {
			if(this.root) this.props = !!this.root['checked'];
			this.state = this.props ? this.value : undefined;
			return this.props;
		}
		set checked(b: boolean) {
			this.setProps(b);
		}

		getState(): any {
			if(this.root) this.props = !!this.root['checked'];
			this.state = this.props ? this.value : undefined;
			return this.state;
		}

		protected updateProps(nextProps: boolean) {
			super.updateProps(nextProps);
			this.state = this.props ? this.value : undefined;
			if (this.root) {
				if(this.props) {
					this.root.setAttribute('checked', 'checked');
				}
				else {
					this.root.removeAttribute('checked');
				}
			}
		}

		protected updateState(nextState: any) {
			if (typeof nextState == 'boolean') {
				nextState = nextState ? this.value : undefined;
			}
			super.updateState(nextState);
			this.props = this.state != undefined;
			if (this.root) {
				if(this.props) {
					this.root.setAttribute('checked', 'checked');
				}
				else {
					this.root.removeAttribute('checked');
				}
			}
		}

		protected render() {
			let addAttributes = 'name="' + this.id + '" type="checkbox"';
			addAttributes += this.props ? ' checked="checked"' : '';
			let inner = this._text ? '&nbsp;' + this._text : '';
			return this.build(this.rootTag, inner, addAttributes);
		}

		protected componentDidMount(): void {
			if (this._tooltip) this.root.setAttribute('title', this._tooltip);
			this._obs = new MutationObserver(() => {
				this.props = !!this.root['checked'];
				this.trigger('propschange', this.props);
				this.trigger('statechange', this.props ? this.value : undefined);
			});
		}
	}
	
	export class WSelect extends WComponent implements WISelectable {
		options: Array<string | WEntity>;
		multiple: boolean;

		constructor(id?: string, options?: Array<string | WEntity>, multiple?: boolean, classStyle?: string, style?: string | WStyle, attributes?: string | object) {
			// WComponent init
			super(id ? id : '*', 'WSelect', null, classStyle, style, attributes);
			// WSelect init
			this.rootTag = 'select';
			this.options = options;
			this.multiple = multiple;
		}

		getProps(): any {
			if (!this.root) return this.props;
			this.props = [];
			let options = this.root["options"] as HTMLOptionElement[];
			if(options && options.length) {
				let s = WUtil.toNumber(this.root["selectedIndex"], -1);
				if(s >= 0 && options.length > s) {
					this.props.push(options[s].text);
				}
			}
			return this.props;
		}

		select(i: number): this {
			if (!this.root || !this.options) return this;
			this.setState(this.options.length > i ? this.options[i] : null);
			return this;
		}

		addOption(e: string | WEntity, sel?: boolean): this {
			if (!e) return this;
			if (!this.options) this.options = [];
			this.options.push(e);
			if (!this.mounted) return this;
			let o = this.buildOptions();
			this.root.innerHTML = o;
			if (sel) this.updateState(e);
			return this;
		}

		remOption(e: string | WEntity): this {
			if (!e || !this.options) return this;
			let x = -1;
			for (let i = 0; i < this.options.length; i++) {
				let s = this.options[i];
				if (!s) continue;
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
				if (!this.mounted) return this;
				let o = this.buildOptions();
				this.root.innerHTML = o;
			}
			return this;
		}

		setOptions(options: Array<string | WEntity>, prevVal?: boolean): this {
			this.options = options;
			if (!this.mounted) return this;
			let pv = this.root["value"]
			let o = this.buildOptions();
			this.root.innerHTML = o;
			if (prevVal) {
				this.root["value"] = pv;
			}
			else if (options && options.length) {
				if (typeof options[0] == 'string') {
					this.trigger('statechange', options[0]);
				}
				else {
					this.trigger('statechange', WUtil.getString(options[0], 'id'));
				}
			}
			return this;
		}

		protected updateState(nextState: any) {
			super.updateState(nextState);
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
		}

		protected render() {
			let o = this.buildOptions();
			let addAttributes = 'name="' + this.id + '"';
			if (this.multiple) addAttributes += ' multiple="multiple"';
			return this.buildRoot('select', o, addAttributes);
		}

		protected componentDidMount(): void {
			if (this._tooltip) this.root.setAttribute('title', this._tooltip);
			if (this.state) this.root["value"] = this.state;
			this.root.addEventListener('change', () => {
				this.trigger('statechange', this.root["value"]);
			});
		}

		protected buildOptions(): string {
			let r = '';
			if (!this.options) this.options = [];
			for (let opt of this.options) {
				if (typeof opt == 'string') {
					r += '<option>' + opt + '</option>';
				}
				else {
					r += '<option value="' + opt.id + '">' + opt.text + '</option>';
				}
			}
			return r;
		}
	}
	
	export class WTable extends WComponent<any, any[]> {
		header: string[];
		keys: any[];
		types: string[];
		widths: number[];
		widthsPerc: boolean;
		hideHeader: boolean;
		div: string; 

		colStyle: string | WStyle;
		rowStyle: string | WStyle;
		headStyle: string | WStyle;
		footerStyle: string | WStyle;
		/** First col style */
		col0Style: string | WStyle;
		/** Last col style */
		colLStyle: string | WStyle;

		sortable: number[];
		soId: string[];
		sortBy: number[];

		selClass: string;
		selectionMode: 'single' | 'multiple' | 'none';
		selectedRow: number = -1;

		constructor(id: string, header: string[], keys?: any[], classStyle?: string, style?: string | WStyle, attributes?: string | object, props?: any) {
			super(id ? id : '*', 'WTable', props, classStyle, style, attributes);
			this.rootTag = 'table';
			this.header = header;
			if (keys && keys.length) {
				this.keys = keys;
			}
			else {
				this.keys = [];
				if (this.header) for (let i = 0; i < this.header.length; i++) this.keys.push(i);
			}
			this.widths = [];
			this.selClass = CSS.SEL_ROW;
		}

		onSelectionChanged(handler: (e: {element?: Element, selectedRowsData?: any[]}) => any): void {
			if (!this.handlers['_selectionchanged']) this.handlers['_selectionchanged'] = [];
			this.handlers['_selectionchanged'].push(handler);
		}

		onDoubleClick(handler: (e: {element?: Element, rowElement?: Element, data?: any, rowIndex?: number}) => any): void {
			if (!this.handlers['_doubleclick']) this.handlers['_doubleclick'] = [];
			this.handlers['_doubleclick'].push(handler);
		}

		onRowPrepared(handler: (e: {element?: Element, rowElement?: Element, data?: any, rowIndex?: number}) => any) {
			if (!this.handlers['_rowprepared']) this.handlers['_rowprepared'] = [];
			this.handlers['_rowprepared'].push(handler);
		}

		clearSelection(): this {
			this.selectedRow = -1;
			if (!this.mounted) return this;
			let b = document.getElementById(this.id + '-b');
			if(b && this.selClass) {
				let an = b.childNodes as any;
				for(let i = 0; i < b.childElementCount; i++) {
					WUX.removeClassOf(an[i], this.selClass);
				}
			}
			if (!this.handlers['_selectionchanged']) return this;
			for (let handler of this.handlers['_selectionchanged']) {
				handler({ element: this.root, selectedRowsData: [] });
			}
			return this;
		}

		select(idxs: number[]): this {
			if(!idxs) idxs = [];
			this.selectedRow = idxs.length ? idxs[0] : -1;
			if (!this.mounted) return this;
			let b = document.getElementById(this.id + '-b');
			if(b && this.selClass) {
				let an = b.childNodes as any;
				for(let i = 0; i < b.childElementCount; i++) {
					if(idxs.indexOf(i) >= 0) {
						WUX.addClassOf(an[i], this.selClass);
					}
					else {
						WUX.removeClassOf(an[i], this.selClass);
					}
				}
			}
			if (!this.handlers['_selectionchanged']) return this;
			let srd = [];
			for (let idx of idxs) {
				if(this.state && this.state.length > idx) {
					srd.push(this.state[idx]);
				}
			}
			for (let handler of this.handlers['_selectionchanged']) {
				handler({ element: this.root, selectedRowsData: srd });
			}
			return this;
		}

		selectAll(toggle?: boolean): this {
			if (!this.mounted) return this;
			if(toggle && this.selectedRow >= 0) {
				return this.clearSelection();
			}
			this.selectedRow = -1;
			if(this.state && this.state.length) {
				this.selectedRow = 0;
			}
			let b = document.getElementById(this.id + '-b');
			if(b && this.selClass) {
				let an = b.childNodes as any;
				for(let i = 0; i < b.childElementCount; i++) {
					WUX.addClassOf(an[i], this.selClass);
				}
			}
			if (!this.handlers['_selectionchanged']) return this;
			for (let handler of this.handlers['_selectionchanged']) {
				handler({ element: this.root, selectedRowsData: this.state });
			}
			return this;
		}

		getSelectedRows(): number[] {
			if (!this.mounted) return [];
			if (this.selectedRow < 0) return [];
			return [this.selectedRow];
		}

		getSelectedRowsData(): any[] {
			if (!this.mounted) return [];
			if (this.selectedRow < 0) return [];
			if (!this.state || !this.state.length) return [];
			if (this.state.length <= this.selectedRow) return [];
			return [this.state[this.selectedRow]];
		}

		protected render() {
			if (this.sortable && this.sortable.length) {
				this.soId = [];
				this.sortBy = [];
				for(let i = 0; i < this.sortable.length; i++) {
					this.sortBy.push(0);
				}
			}
			let tableClass = 'table';
			if (this._classStyle) tableClass = this._classStyle.indexOf('table ') >= 0 ? this._classStyle : tableClass + ' ' + this._classStyle;
			let ts = this.style ? ' style="' + this.style + '"' : '';
			let r = '';
			if(this.div) r += '<div id="' + this.id + '-c" class="' + this.div + '">';
			r += '<table id="' + this.id + '" class="' + tableClass + '"' + ts + '>';
			if (this.header && this.header.length) {
				let ths = false;
				if (typeof this.headStyle == 'string') {
					if (this.headStyle.indexOf('text-align') > 0) ths = true;
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
					let j = -1;
					for (let h of this.header) {
						j++;
						let s: string | WStyle;
						if (j == 0) {
							s = this.col0Style ? this.col0Style : this.colStyle;
						}
						else if (j == this.header.length - 1) {
							s = this.colLStyle ? this.colLStyle : this.colStyle;
						}
						else {
							s = ths ? this.headStyle : this.colStyle;
						}
						let w = this.widths && this.widths.length > j ? this.widths[j] : 0;
						let x: WStyle = {};
						if (w) x.w = this.widthsPerc ? w + '%' : w; 
						let t = this.getType(j);
						if(t == 'w') x.a = 'center';
						
						let so = this.sortable && this.sortable.indexOf(j) >= 0;
						if(so) {
							let aid = this.subId('sort_' + j);
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
			if(this.div) r += '</div>';
			return r;
		}

		protected componentDidMount(): void {
			this.buildBody();
			if(this.soId) {
				for(let aid of this.soId) {
					let a = document.getElementById(aid);
					if(a) {
						a.addEventListener('click', (e: PointerEvent) => {
							let i = WUX.lastSub(WUX.getId(e.currentTarget));
							let x = i.indexOf('_');
							if(x <= 0) return;
							let c = WUtil.toNumber(i.substring(x + 1), -1);
							if(c >= 0 && this.header && this.header.length > c) {
								// Default sort?
								let hs = this.handlers['_sort'];
								let ds = !(hs && hs.length) && this.keys && this.keys.length > c;
								let h = this.header[c];
								let v = this.sortBy[c];
								if(!v) {
									this.sortBy[c] = 1;
									if(h) a.innerHTML = h + ' &nbsp;<i class="fa fa-sort-asc"></i>';
									if(ds) this.setState(WUtil.sort(this.state, true, this.keys[c]));
								}
								else if(v == 1) {
									this.sortBy[c] = -1;
									if(h) a.innerHTML = h + ' &nbsp;<i class="fa fa-sort-desc"></i>';
									if(ds) this.setState(WUtil.sort(this.state, false, this.keys[c]));
								}
								else if(v == -1) {
									this.sortBy[c] = 0;
									if(h) a.innerHTML = h + ' &nbsp;<i class="fa fa-unsorted"></i>';
								}
								if(hs) {
									for (let hr of hs) hr(this.createEvent('_sort', this.sortBy));
								}
							}
						});
					}
				}
			}
			let b = document.getElementById(this.id + '-b');
			if(b) {
				b.addEventListener('click', (e: PointerEvent) => {
					if(!this.selectionMode || this.selectionMode == 'none') return;
					if(!this.handlers['_selectionchanged']) return;
					let t = e.target as HTMLElement;
					if(!t) return;
					let tr = t.closest('tr');
					if(!tr) return;
					let i = WUtil.toNumber(WUX.lastSub(tr), -1);
					if(i < 0) return;
					this.select([i]);
				});
				b.addEventListener('dblclick', (e: PointerEvent) => {
					if(!this.handlers['_doubleclick']) return;
					let t = e.target as HTMLElement;
					if(!t) return;
					let tr = t.closest('tr');
					if(!tr) return;
					let i = WUtil.toNumber(WUX.lastSub(tr), -1);
					if(i < 0) return;
					let d = this.state && this.state.length > i ? this.state[i] : null;
					for (let h of this.handlers['_doubleclick']) {
						h({ element: this.root, rowElement: tr, data: d, rowIndex: i });
					}
				});
			}
		}

		protected componentDidUpdate(prevProps: any, prevState: any): void {
			this.buildBody();
		}

		protected getType(i: number): string {
			if(!this.types) return '';
			if(this.types.length <= i) return '';
			return this.types[i];
		}

		protected buildBody(): void {
			let tbody = document.getElementById(this.id + "-b")
			if(!tbody) return;
			if (!this.state || !this.state.length) {
				tbody.innerHTML = '';
				return;
			}
			if (!this.keys || !this.keys.length) {
				tbody.innerHTML = '';
				return;
			}
			let b = '';
			let i = -1;
			for (let row of this.state) {
				i++;
				let r: string = '';
				if (i == this.state.length - 1) {
					if (this.footerStyle) {
						r = '<tr' + buildCss(this.footerStyle) + ' id="' + this.id + '-' + i + '">';
					}
					else {
						r = '<tr' + buildCss(this.rowStyle) + ' id="' + this.id + '-' + i + '">';
					}
				}
				else {
					r = '<tr' + buildCss(this.rowStyle) + ' id="' + this.id + '-' + i + '">';
				}
				let j = -1;
				for (let key of this.keys) {
					let v = row[key];
					let align = '';
					if (v == null) v = '';
					j++;
					let t = this.getType(j);
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
							if (v instanceof Date) v = v.toLocaleDateString();
							if (typeof v == 'boolean') v = v ? '&check;' : '';
							if (typeof v == 'number') {
								align = 'text-right';
							}
					}
					let s: string | WStyle;
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
						if (s.indexOf('text-align') > 0) align = '';
					}
					else if (s && s.a) {
						align = '';
					}
					let w = this.widths && this.widths.length > j ? this.widths[j] : 0;
					r += '<td' + WUX.buildCss(s, align, { w: w }) + '>' + v + '</td>';
				}
				if (this.header && this.header.length > this.keys.length) {
					for (let i = 0; i < this.header.length - this.keys.length; i++) {
						r += '<td' + WUX.buildCss(this.colStyle) + '></td>';
					}
				}
				r += '</tr>';
				if (this.handlers['_rowprepared']) {
					let t = document.createElement("template");
					t.innerHTML = r;
					let e = { element: this.root, rowElement: t.content.firstElementChild, data: row, rowIndex: i };
					for (let handler of this.handlers['_rowprepared']) handler(e);
					r = t.innerHTML;
				}
				b += r;
			}
			tbody.innerHTML = b;
		}

		onSort(h: (e: WEvent) => any): void {
			if (!this.handlers['_sort']) this.handlers['_sort'] = [];
			this.handlers['_sort'].push(h);
		}
	}

	export class WFormPanel extends WComponent<WField[][], any> {
		protected title: string;
		protected rows: WField[][];
		protected roww: WWrapper[];
		protected currRow: WField[];
		protected main: WContainer;
		protected foot: WContainer;
		protected checkboxStyle: string;
		protected footer: WElement[];
		protected footerClass: string;
		protected footerStyle: string | WStyle;

		constructor(id?: string, title?: string, action?: string) {
			// WComponent init
			super(id ? id : '*', 'WFormPanel');
			this.rootTag = 'form';
			if (action) {
				this._attributes = 'role="form" name="' + this.id + '" action="' + action + '"';
			}
			else {
				this._attributes = 'role="form" name="' + this.id + '" action="javascript:void(0);"';
			}
			// WFormPanel init
			this.title = title;
			if(CSS.FORM) {
				if(CSS.FORM.indexOf(':') > 0) {
					this.style = CSS.FORM;
				}
				else {
					this.classStyle = CSS.FORM;
				}
			}
			this.init();
		}

		init(): this {
			this.rows = [];
			this.roww = [];
			this.currRow = null;
			this.footer = [];
			this.addRow();
			return this;
		}

		focus(): this {
			if (!this.mounted) return this;
			let f = this.first(true);
			if (f) {
				if (f.component) {
					f.component.focus();
				}
				else if (f.element instanceof HTMLElement) {
					f.element.focus();
				}
			}
			return this;
		}

		first(enabled?: boolean): WField {
			if (!this.rows) return null;
			for (let row of this.rows) {
				for (let f of row) {
					if (enabled) {
						if (f.enabled == null || f.enabled) {
							if (f.readonly == null || !f.readonly) return f;
						}
					}
					else {
						return f;
					}
				}
			}
			return null;
		}

		focusOn(fieldId: string): this {
			if (!this.mounted) return this;
			let f = this.getField(fieldId);
			if (!f) return this;
			if (f.component) {
				f.component.focus();
			}
			else if (f.element instanceof HTMLElement) {
				f.element.focus();
			}
			return this;
		}

		getField(fid: string): WField {
			if (!fid) return;
			let sid = fid.indexOf(this.id + '-') == 0 ? fid : this.subId(fid);
			for (let i = 0; i < this.rows.length; i++) {
				let row = this.rows[i];
				for (let j = 0; j < row.length; j++) {
					let f = row[j];
					if (f.id == sid) return f;
				}
			}
			return;
		}

		addRow(classStyle?: string, style?: string | WStyle, id?: string, attributes?: string | object, type: string = 'row'): this {
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
		}

		addTextField(fieldId: string, label: string, readonly?: boolean): this {
			let id = this.subId(fieldId);
			let co = new WInput(id, 'text', 0, CSS.FORM_CTRL);
			co.readonly = readonly;
			this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'text' });
			return this;
		}

		addNoteField(fieldId: string, label: string, rows: number, readonly?: boolean): this {
			if (!rows) rows = 3;
			let id = this.subId(fieldId);
			let co = new WTextArea(id, rows, CSS.FORM_CTRL);
			co.readonly = readonly;
			this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'note' });
			return this;
		}

		addDateField(fieldId: string, label: string, readonly?: boolean): this {
			let id = this.subId(fieldId);
			let co = new WInput(id, 'date', 0, CSS.FORM_CTRL);
			co.readonly = readonly;
			this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'date' });
			return this;
		}

		addTimeField(fieldId: string, label: string, readonly?: boolean): this {
			let id = this.subId(fieldId);
			let co = new WInput(id, 'time', 0, CSS.FORM_CTRL);
			co.readonly = readonly;
			this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'time' });
			return this;
		}

		addEmailField(fieldId: string, label: string, readonly?: boolean): this {
			let id = this.subId(fieldId);
			let co = new WInput(id, 'email', 0, CSS.FORM_CTRL);
			co.readonly = readonly;
			this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'email' });
			return this;
		}

		addOptionsField(fieldId: string, label: string, options?: (string | WEntity)[], attributes?: string | object, readonly?: boolean): this {
			let id = this.subId(fieldId);
			let co = new WSelect(id, options, false, CSS.FORM_CTRL, '', attributes);
			this.currRow.push({ id: id, label: label, component: co, readonly: readonly, type: 'select' });
			return this;
		}

		addBooleanField(fieldId: string, label: string): this {
			let id = this.subId(fieldId);
			let co = new WCheck(id, '');
			co.classStyle = CSS.FORM_CTRL;
			this.currRow.push({ id: id, label: label, component: co, 'type': 'boolean'});
			return this;
		}

		addBlankField(label?: string, classStyle?: string, style?: string | WStyle): this {
			let co = new WContainer('', classStyle, style);
			this.currRow.push({ id: '', label: label, component: co, classStyle: classStyle, style: style, type: 'blank' });
			return this;
		}

		addInternalField(fieldId: string, value?: any): this {
			if (value === undefined) value = null;
			this.currRow.push({ id: this.subId(fieldId), value: value, type: 'internal'});
			return this;
		}

		addComponent(fieldId: string, label: string, component: WComponent): this {
			if (!component) return this;
			if (fieldId) {
				component.id = this.subId(fieldId);
				this.currRow.push({ id: this.subId(fieldId), label: label, component: component, type: 'component' });
			}
			else {
				component.id = '';
				this.currRow.push({ id: '', label: label, component: component, type: 'component' });
			}
			return this;
		}

		addToFooter(c: WElement): this {
			if (!c && !this.footer) return this;
			this.footer.push(c)
			return this;
		}

		protected componentDidMount(): void {
			this.main = new WContainer(this.id + '-c');
			for (let i = 0; i < this.rows.length; i++) {
				let w = this.roww[i];
				this.main.addRow(WUX.cls(w.type, w.classStyle, w.style), WUX.style(w.style));
				
				let row = this.rows[i];
				
				// Calcolo colonne effettive
				let cols = 0;
				for (let j = 0; j < row.length; j++) {
					let f = row[j];
					if(!f.component) continue;
					cols += f.span && f.span > 0 ? f.span : 1;
				}
				let g = !!CSS.FORM_GROUP;
				for (let j = 0; j < row.length; j++) {
					let f = row[j];
					if(!f.component) continue;
					
					let cs = Math.floor(12 / cols);
					if (cs < 1) cs = 1;
					if ((cs == 1 && cols < 11) && (j == 0 || j == cols - 1)) cs = 2;
					if (f.span && f.span > 0) cs = cs * f.span;
					this.main.addCol('' + cs);
					
					f.component.setState(f.value);
					if(f.component instanceof WCheck) {
						if (!this.checkboxStyle) {
							let s = getComputedStyle(this.context).getPropertyValue('font-size');
							let ch = Math.round(0.8 * parseInt(s));
							if(isNaN(ch) || ch < 18) ch = 18;
							this.checkboxStyle = 'height:' + ch + 'px;';
						}
						f.component.style = this.checkboxStyle;
					}
					
					if(f.label && !f.labelComp) {
						let l = new WLabel(f.id + '-l', f.label, '', f.classStyle);
						f.labelComp = l.for(f.id);
					}
					
					if(g) {
						this.main.addGroup({classStyle: CSS.FORM_GROUP}, f.labelComp, f.component);
					}
					else {
						this.main.add(f.labelComp);
						this.main.add(f.component);
					}
				}
			}
			if (this.footer && this.footer.length) {
				this.foot = new WContainer(this.subId('__foot'), this.footerClass, this.footerStyle);
				for(let f of this.footer) {
					this.foot.addRow().addCol('12').add(f, 'push');
				}
				this.main.addRow().addCol('12').add(this.foot);
			}
			this.main.mount(this.root);
		}

		componentWillUnmount(): void {
			if(!this.main) this.main.unmount();
		}

		clear(): this {
			for (let i = 0; i < this.rows.length; i++) {
				let row = this.rows[i];
				for (let j = 0; j < row.length; j++) {
					let f = row[j];
					if(f.component) f.component.setState(null);
					f.value = null;
				}
			}
			return this;
		}

		setValue(fid: string, v: any, updState: boolean = true): this {
			let f = this.getField(fid);
			if(!f) return this;
			if(f.type == 'date') v = isoDate(v);
			if(f.type == 'time') v = formatTime(v, false);
			if(f.component) f.component.setState(v);
			f.value = v;
			if (updState) {
				if (!this.state) this.state = {};
				this.state[fid] = v;
			}
			return this;
		}

		getValue(fid: string | WField): any {
			let f = typeof fid == 'string' ? this.getField(fid) : fid;
			if(!f) return null;
			if(f.component) return f.component.getState();
			return f.value;
		}

		getValues(): any {
			let r = {};
			for (let i = 0; i < this.rows.length; i++) {
				let row = this.rows[i];
				for (let j = 0; j < row.length; j++) {
					let f = row[j];
					r[this.ripId(f.id)] = f.component ? f.component.getState() : f.value;
				}
			}
			return r;
		}

		getState() {
			this.state = this.getValues();
			return this.state;
		}

		protected updateState(nextState: any): void {
			super.updateState(nextState);
			if (!nextState || WUtil.isEmpty(nextState)) {
				this.clear();
			}
			else {
				this.updateView();
			}
		}

		protected updateView() {
			if (!this.state) {
				this.clear();
				return;
			}
			for (let id in this.state) {
				this.setValue(id, this.state[id], false);
			}
		}
	}
}