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
}