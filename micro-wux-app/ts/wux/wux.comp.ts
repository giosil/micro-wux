namespace WUX {
	
	export class WHtml extends WUX.WComponent<string, any> {
		constructor(html: string) {
			super(null, 'WHtml', html);
		}
		protected render() {
			if (!this.props) return "<span></span>";
			if(this.props.charAt(0) != '<') {
				this.props = "<span>" + this.props + "</span>";
			}
			return this.props
		}
	}
	
	export class WContainer extends WComponent<string, any> {
		components: Array<WElement>;

		constructor(id?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object, inline?: boolean, type?: string) {
			// WComponent init
			super(id, 'WContainer', type, classStyle, WUX.style(style), attributes);
			// WContainer init
			this.components = [];
			this.rootTag = inline ? 'span' : 'div';
			if (type == 'aside') this.rootTag = 'aside';
		}

		end(): WContainer {
			if (this.parent instanceof WContainer) return this.parent.end();
			return this;
		}

		grid(): WContainer {
			if (this.props == 'row' && this.parent instanceof WContainer) return this.parent;
			if (this.parent instanceof WContainer) return this.parent.grid();
			return this;
		}

		row(): WContainer {
			if (this.props == 'row') return this;
			if (!this.parent) {
				if (!this.components || !this.components.length) return this;
				for (let i = this.components.length-1; i >= 0; i--) {
					let c = this.components[i];
					if (c instanceof WContainer && c.getProps() == 'row') return c;
				}
				return this;
			}
			if (this.parent instanceof WContainer) return this.parent.row();
			return this;
		}

		col(): WContainer {
			if (this.props == 'col') return this;
			if (this.parent instanceof WContainer) return this.parent.col();
			return this;
		}

		add(component: WElement): this {
			if (!component) return this;
			if (component instanceof WComponent) {
				if (!component.parent) component.parent = this;
			}
			let c: WElement;
			if (typeof component == 'string' && component.length > 0) {
				if (component.charAt(0) == '<' && component.charAt(component.length - 1) == '>') {
					c = new WHtml(component);
				}
			}
			if (!c) c = component;
			this.components.push(c);
			return this;
		}

		remove(index: number): this {
			if (index < 0) index = this.components.length + index;
			if (index < 0 || index >= this.components.length) return undefined;
			this.components.splice(index, 1);
			return this;
		}

		removeAll(): this {
			if (this.mounted) {
				this.parent = null;
				for (let c of this.components) {
					if (c instanceof WComponent) c.unmount();
				}
			}
			this.components = [];
			return this;
		}

		addRow(classStyle?: string, style?: string | WStyle, id?: string, attributes?: string | object): WContainer {
			let classRow = classStyle == null ? 'row' : classStyle;
			let row = new WContainer(id, classRow, style, attributes, false, 'row');
			row.name = row.name + '_row';
			return this.grid().addContainer(row);
		}

		addCol(classStyle?: string, style?: string | WStyle, id?: string, attributes?: string | object): WContainer {
			if (!isNaN(parseInt(classStyle))) classStyle = 'col-md-' + classStyle;
			let classCol = classStyle == null ? 'col' : classStyle;
			let col = new WContainer(id, classCol, style, attributes, false, 'col');
			col.name = col.name + '_col';
			return this.row().addContainer(col);
		}

		addText(text: string[], rowTag?: string, classStyle?: string, style?: string | WStyle, id?: string, attributes?: string | object): this {
			if (!text || !text.length) return this;
			let endRow = '';
			if (rowTag) {
				let i = rowTag.indexOf(' ');
				endRow = i > 0 ? rowTag.substring(0, i) : rowTag;
			}
			let s = '';
			for (let r of text) {
				if (r && r.length > 3) {
					let b = r.substring(0, 3);
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
		}

		addContainer(container: WContainer, constraints?: string): WContainer;
		addContainer(id?: string, classStyle?: string, style?: string, attributes?: string | object, inline?: boolean, props?: any): WContainer;
		addContainer(conid: string | WContainer, classStyle?: string, style?: string, attributes?: string | object, inline?: boolean, props?: any) {
			if (conid instanceof WContainer) {
				if (this._classStyle == null) {
					// If you add a 'row'...
					if (conid._classStyle && conid._classStyle.indexOf('row') == 0) {
						if (this.parent instanceof WContainer) {
							this._classStyle = global.con_class;
						}
						else {
							this._classStyle = global.main_class;
						}
					}
				}
				conid.parent = this;
				this.components.push(conid);
				return conid;
			}
			else if (typeof conid == 'string') {
				let container = new WContainer(conid, classStyle, style, attributes, inline, props);
				this.components.push(container);
				return container;
			}
		}

		protected render(): any {
			if (this.parent || this._classStyle || this._style) {
				return this.build(this.rootTag);
			}
			return this.buildRoot(this.rootTag);
		}

		protected componentDidMount(): void {
			for (let element of this.components) {
				if (element instanceof WComponent) {
					element.mount(this.root);
				}
				else {
					this.root.append(element);
				}
			}
		}

		componentWillUnmount(): void {
			for (let c of this.components) {
				if (c instanceof WComponent) c.unmount();
			}
		}

		rebuild(): this {
			this.root.innerHTML = '';
			for (let element of this.components) {
				if (element instanceof WComponent) {
					element.mount(this.root);
				}
				else {
					this.root.append(element);
				}
			}
			return this;
		}
	}
}