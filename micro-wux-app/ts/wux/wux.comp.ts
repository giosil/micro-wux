namespace WUX {
	
	export class WContainer extends WComponent<string, any> {
		comp: WComponent[];
		corc: string[];
		grid: string[][];
		
		constructor(id?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object, inline?: boolean, type?: string) {
			// WComponent init
			super(id ? id : '*', 'WContainer', type, classStyle, WUX.style(style), attributes);
			// WContainer init
			this.comp = [];
			this.corc = [];
			this.grid = [];
			this.rootTag = inline ? 'span' : 'div';
		}

		addRow(classStyle?: string, style?: string | WStyle): WContainer {
			if(!classStyle) classStyle = 'row';
			let g: string[] = [];
			let s = WUX.style(style);
			if(s) classStyle += '^' + s;
			g.push(classStyle);
			this.grid.push(g);
			return this;
		}

		addCol(classStyle?: string, style?: string | WStyle): WContainer {
			if(!classStyle) classStyle = 'col-12';
			if(!isNaN(parseInt(classStyle))) classStyle = 'col-' + classStyle;
			if(!this.grid.length) this.addRow();
			let g = this.grid[this.grid.length - 1];
			let s = WUX.style(style);
			if(s) classStyle += '^' + s;
			g.push(classStyle);
			return this;
		}

		add(component: WComponent): this {
			if(!this.grid.length) this.addRow().addCol();
			if (!component) return this;
			let r = this.grid.length - 1;
			let g = this.grid[r];
			let c = g.length - 1;
			this.comp.push(component);
			this.corc.push(this.subId(r + '_' + c));
			return this;
		}

		protected render(): any {
			let inner = '';
			let rm = this.grid.length;
			if(rm) {
				for(let r = 0; r < rm; r++) {
					let g = this.grid[r];
					let cm = g.length;
					if(!cm) continue;
					inner += '<div ' + this.cs(g[0]) + '>';
					for(let c = 1; c < cm; c++) {
						inner += '<div id="' + this.subId(r + '_' + c) + '" ' + this.cs(g[c]) + '></div>';
					}
					inner += "</div>";
				}
			}
			return this.buildRoot(this.rootTag, inner);
		}

		protected componentDidMount(): void {
			for(let i = 0; i < this.comp.length; i++) {
				let c = this.comp[i];
				let e = document.getElementById(this.corc[i]);
				if(!e) continue;
				c.mount(e);
			}
		}

		componentWillUnmount(): void {
			for (let c of this.comp) {
				c.unmount();
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
		}
		
		protected render() {
			if (!this.shouldBuildRoot()) return undefined;
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
						r += '<th' + WUX.buildCss(s, x) + '>' + h + '</th>';
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
						r = '<tr' + buildCss(this.footerStyle) + '>'
					}
					else {
						r = '<tr' + buildCss(this.rowStyle) + '>'
					}
				}
				else {
					r = '<tr' + buildCss(this.rowStyle) + '>'
				}
				b += r;
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
					b += '<td' + WUX.buildCss(s, align, { w: w }) + '>' + v + '</td>';
				}
				if (this.header && this.header.length > this.keys.length) {
					for (let i = 0; i < this.header.length - this.keys.length; i++) {
						b += '<td' + WUX.buildCss(this.colStyle) + '></td>';
					}
				}
				b += '</tr>';
				tbody.innerHTML = b;
			}
		}
	}

}