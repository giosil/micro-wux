namespace APP {

	export class LookupField extends WUX.WComponent {
		icon: string;
		hint: string;
		_i: HTMLElement;
		_s: HTMLElement;
		_c: HTMLElement;

		constructor(id?: string, classStyle?: string, style?: string | WUX.WStyle, attributes?: string | object) {
			super(id ? id : '*', 'LookupField', '', classStyle, style, attributes);
		}

		setText(text: string): this {
			if (!this._i) return this;
			this._i['value'] = text;
			return this;
		}

		getText(): string {
			if (!this._i) return '';
			return this._i['value'];
		}

		onSearch(h: (e: WUX.WEvent) => any): void {
			// Single handler
			this.handlers['_search'] = [h];
		}

		onCancel(h: (e: WUX.WEvent) => any): void {
			// Single handler
			this.handlers['_cancel'] = [h];
		}

		render() {
			let c = this._classStyle ? 'container ' + this._classStyle : 'container';
			let r = '<div class="input-group">';
			if (this.icon) {
				let i = this.icon.indexOf(' ') > 0 ? this.icon : 'fas ' + this.icon;
				r += '<span class="input-group-text"><i class="' + i + '"></i></span>';
			}
			if (!this.hint) this.hint = '';
			r += '<input id="' + this.id + '-i" type="text" class="form-control" placeholder="' + this.hint + '">';
			r += '<a id="' + this.id + '-s" title="Cerca" class="input-group-text" style="cursor:pointer;"><i class="fas fa-search"></i></a>';
			r += '<a id="' + this.id + '-c" title="Cancella" class="input-group-text" style="cursor:pointer;"><i class="fas fa-times"></i></a>';
			r += '</div>';
			return this.build('div', r, '', c);
		}

		protected componentDidMount(): void {
			this._i = document.getElementById(this.id + '-i');
			this._s = document.getElementById(this.id + '-s');
			this._c = document.getElementById(this.id + '-c');
			if (this._s) {
				this._s.onclick = (e: MouseEvent) => {
					this.trigger('_search', this.getText());
				};
			}
			if (this._c) {
				this._c.onclick = (e: MouseEvent) => {
					if(this._i) this._i['value'] = '';
					this.setProps(null);
					this.setState(null);
					this.trigger('_cancel');
				};
			}
		}
	}

}