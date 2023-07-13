namespace WUX {
	
	export interface WChartData {
		labels?: string[];
		titles?: string[];
		series?: number[][];
		styles?: string[];
	}
		
	export function JQ(e: any): JQuery {
		let jq = window['jQuery'] ? window['jQuery'] as JQueryStatic : null;
		if(!jq) {
			console.error('[WUX] jQuery is not available');
			return null;
		}
		let r = jq(e);
		if(!r.length) {
			console.error('[WUX] !jQuery(' + e + ').length==true');
			return null;
		}
		return r;
	}

	// Bootstrap / JQuery
	export class WDialog<P = any, S = any> extends WUX.WComponent<P, S> {
		cntRoot: WUX.WContainer;
		cntMain: WUX.WContainer;
		cntContent: WUX.WContainer;
		cntHeader: WUX.WContainer;
		cntBody: WUX.WContainer;
		cntFooter: WUX.WContainer;
		// GUI
		_title: string;
		tagTitle: string;
		btnClose: WUX.WButton;
		btnOK: WUX.WButton;
		btnCancel: WUX.WButton;
		txtCancel: string;
		buttons: WUX.WButton[];
		// Flag
		ok: boolean;
		cancel: boolean;
		isShown: boolean;
		// Control
		// parent handler
		ph: (e?: JQueryEventObject) => any;
		// show handler
		sh: (e?: JQueryEventObject) => any;
		// hidden handler
		hh: (e?: JQueryEventObject) => any;
		// JQ(this.root) -> $(this.root)
		$r: JQuery;

		constructor(id: string, name: string = 'WDialog', btnOk = true, btnClose = true, classStyle?: string, style?: string | WUX.WStyle, attributes?: string | object) {
			super(id, name, undefined, classStyle, style, attributes);
			this.buttons = [];
			this.tagTitle = 'h5';
			if (btnClose) {
				if (!btnOk) this.txtCancel = RES.CLOSE;
				this.buttonCancel();
			}
			if (btnOk) this.buttonOk();
			this.ok = false;
			this.cancel = false;
			this.isShown = false;
			// Auto-mount
			if (this.id && this.id != '*') {
				let e = document.getElementById(this.id);
				if(e) e.remove();
			}
			WuxDOM.onRender((e: WUX.WEvent) => {
				if (this.mounted) return;
				this.mount(e.element);
			});
		}

		makeUp(title: string, body: string | WUX.WComponent, onHidden?: (e?: JQueryEventObject) => any): this {
			this.title = title;
			this.body.addRow().addCol('12').add(body);
			if(onHidden) this.hh = onHidden;
			return this;
		}

		onShownModal(handler: (e?: JQueryEventObject) => any) {
			this.sh = handler;
		}

		onHiddenModal(handler: (e?: JQueryEventObject) => any) {
			this.hh = handler;
		}

		get header(): WUX.WContainer {
			if (this.cntHeader) return this.cntHeader;
			this.cntHeader = new WUX.WContainer('', 'modal-header');
			return this.cntHeader;
		}

		get body(): WUX.WContainer {
			if (this.cntBody) return this.cntBody;
			this.cntBody = new WUX.WContainer('', WUX.cls('modal-body', this._classStyle), '', this._attributes);
			return this.cntBody;
		}

		get footer(): WUX.WContainer {
			if (this.cntFooter) return this.cntFooter;
			this.cntFooter = new WUX.WContainer('', 'modal-footer');
			return this.cntFooter;
		}

		get title(): string {
			return this._title;
		}
		set title(s: string) {
			this._title = s;
			let te = document.getElementById(this.subId('title'));
			if(te) {
				te.innerText = s;
			}
			else {
				this.btnClose = new WUX.WButton(this.subId('bhc'), '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>', undefined, 'close', '', 'data-dismiss="modal"');
				this.btnClose.on('click', (e: PointerEvent) => {
					this.close();
				});
				this.header.add(this.buildTitle()).add(this.btnClose);
			}
		}

		protected onClickOk(): boolean {
			return true;
		}

		protected onClickCancel(): boolean {
			return true;
		}

		protected buildBtnOK(): WUX.WButton {
			return new WUX.WButton(this.subId('bfo'), RES.OK, '', 'btn btn-primary button-sm', '', '');
		}

		protected buildBtnCancel(): WUX.WButton {
			if (this.txtCancel) {
				return new WUX.WButton(this.subId('bfc'), this.txtCancel, '', 'btn btn-secondary button-sm', '', '');
			}
			return new WUX.WButton(this.subId('bfc'), RES.CANCEL, '', 'btn btn-secondary button-sm', '', '');
		}

		buttonOk(): WUX.WButton {
			if (this.btnOK) return this.btnOK;
			this.btnOK = this.buildBtnOK();
			this.btnOK.on('click', (e: JQueryEventObject) => {
				if (this.onClickOk()) {
					this.ok = true;
					this.cancel = false;
					if(this.$r) this.$r.modal('hide');
				}
			});
			this.buttons.push(this.btnOK);
		}

		buttonCancel(): WUX.WButton {
			if (this.btnCancel) return this.btnCancel;
			this.btnCancel = this.buildBtnCancel();
			this.btnCancel.on('click', (e: JQueryEventObject) => {
				if (this.onClickCancel()) {
					this.ok = false;
					this.cancel = true;
					if(this.$r) this.$r.modal('hide');
				}
			});
			this.buttons.push(this.btnCancel);
		}

		show(parent?: WUX.WComponent, handler?: (e?: JQueryEventObject) => any): void {
			if (!this.beforeShow()) return;
			this.ok = false;
			this.cancel = false;
			this.parent = parent;
			this.ph = handler;
			if (!this.mounted) WuxDOM.mount(this);
			if(!this.$r) return;
			this.$r.modal({ backdrop: 'static', keyboard: false, show: false});
			this.$r.modal('show');
		}

		hide(): void {
			if(this.$r) this.$r.modal('hide');
		}

		close(): void {
			this.ok = false;
			this.cancel = false;
			if(this.$r) this.$r.modal('hide');
		}

		protected beforeShow(): boolean {
			return true;
		}

		protected onShown() {
		}

		protected onHidden() {
		}

		protected render() {
			this.isShown = false;
			this.cntRoot = new WUX.WContainer(this.id, 'modal inmodal fade', '', 'role="dialog" aria-hidden="true"');
			this.cntMain = this.cntRoot.addContainer('', 'modal-dialog modal-lg', this._style);
			this.cntContent = this.cntMain.addContainer('', 'modal-content');
			if (this.cntHeader) this.cntContent.addContainer(this.cntHeader);
			if (this.cntBody) this.cntContent.addContainer(this.cntBody);
			for (let btn of this.buttons) this.footer.add(btn);
			if (this.cntFooter) this.cntContent.addContainer(this.cntFooter);
			return this.cntRoot;
		}

		protected componentDidMount(): void {
			if(!this.root) return;

			this.$r = JQ(this.root);
			if(!this.$r) return;

			this.$r.on('shown.bs.modal', (e: JQueryEventObject) => {
				this.isShown = true;
				this.onShown();
				if (this.sh) this.sh(e);
			});
			this.$r.on('hidden.bs.modal', (e: JQueryEventObject) => {
				this.isShown = false;
				this.onHidden();
				if (this.hh) this.hh(e);
				if (this.ph) {
					this.ph(e);
					this.ph = null;
				}
			});
		}

		componentWillUnmount(): void {
			this.isShown = false;
			if (this.btnClose) this.btnClose.unmount();
			if (this.btnCancel) this.btnCancel.unmount();
			if (this.cntFooter) this.cntFooter.unmount();
			if (this.cntBody) this.cntBody.unmount();
			if (this.cntHeader) this.cntHeader.unmount();
			if (this.cntContent) this.cntContent.unmount();
			if (this.cntMain) this.cntMain.unmount();
			if (this.cntRoot) this.cntRoot.unmount();
		}

		protected buildTitle(): string {
			if (!this.tagTitle) this.tagTitle = 'h3';
			return '<' + this.tagTitle + ' class="modal-title" id="' + this.subId('title') + '">' + WUtil.toText(this._title) + '</' + this.tagTitle + '>';
		}
	}
	
	export class WCalendar extends WComponent<number, Date> {
		// Element previous
		ep: HTMLElement;
		// Element month
		em: HTMLElement;
		// Element next
		en: HTMLElement;
		// Element table
		et: HTMLElement;
		// Element table body
		eb: HTMLElement;
		// Class table
		ct: string;
		// Class div table
		cd: string;
		// Style previous
		sp: string;
		// Style month
		sm: string;
		// Style next
		sn: string;
		// Style week day
		sw: string;
		// Style day
		sd: string;
		// Style day over
		so: string;
		// Style day selected
		ss: string;
		// Style day marked
		sk: string;
		// Style empty
		se: string;
		// Style today
		st: string;
		// Today
		td: string;
		// Array of marker
		am: string[] = [];
		// Map date - title
		mt: {[k: string]: string} = {};
		// Last state (converted to string)
		ls: string;

		constructor(id?: string, classStyle?: string, style?: string | WStyle, attributes?: string | object) {
			// WComponent init
			super(id ? id : '*', 'WCalendar', 1, classStyle, style, attributes);
			// Class table
			this.ct = 'table';
			// Class div table
			this.cd = 'table-responsive';
			// Class div table
			this.ct = 'table';
			// Style previous
			this.sp = 'padding:1rem;text-align:center;font-weight:bold;background-color:#eeeeee;';
			// Style month
			this.sm = this.sp;
			// Style next
			this.sn = this.sp;
			// Style week day
			this.sw = 'text-align:center;';
			// Style day
			this.sd = 'text-align:center;';
			// Style day over
			this.so = 'text-align:center;background-color:#f6f6f6;cursor:pointer;';
			// Style day selected (table-primary)
			this.ss = 'text-align:center;background-color:#b8d4f1;'; 
			// Style day marked (table-warning)
			this.sk = 'text-align:center;background-color:#e6d3b8;';
			// Style empty
			this.se = 'background-color:#f0f0f0;';
			// Style today
			this.st = 'font-weight:bold;';
			// Today
			this.td = this.str(new Date());
		}

		onDoubleClick(handler: (e: WEvent) => any): void {
			if (!this.handlers['_doubleclick']) this.handlers['_doubleclick'] = [];
			this.handlers['_doubleclick'].push(handler);
		}

		protected updateState(nextState: Date): void {
			this.state = nextState;
			if(!this.state) this.state = new Date();
			let d = this.state.getDate();
			let m = this.state.getMonth();
			let y = this.state.getFullYear();
			this.ls = (y * 10000 + (m + 1) * 100 + d) + '';
		}

		protected render() {
			if(!this.state) this.state = new Date();
			// Build table
			let t = '<table id="' + this.subId('t') + '" class="' + this.ct + '"><thead><tr>';
			for(let x = 0; x < 7; x++) {
				let k = x == 6 ? 0 : x + 1;
				t += '<th id="' + this.subId(k + '') + '" style="' + this.sw + '">' + WUX.formatDay(k, false) + '</th>'; 
			}
			t += '</tr></thead><tbody id="' + this.subId('b') + '">';
			t += this.body();
			t += '</tbody></table>';
			// Build component
			let m = this.state.getMonth();
			let y = this.state.getFullYear();
			let k = y * 100 + m + 1;
			let p = '<a id="' + this.subId('p') + '" title="Mese precedente"><i class="fa fa-arrow-circle-left"></i></a>';
			let n = '<a id="' + this.subId('n') + '" title="Mese successivo"><i class="fa fa-arrow-circle-right"></i></a>';
			let i = '<div class="row"><div class="col-2" style="' + this.sp + '">' + p + '</div><div id="' + this.subId('m') + '" class="col-8" style="' + this.sm + '">' + WUX.formatMonth(k, true, true) + '</div><div class="col-2" style="' + this.sn + '">' + n + '</div></div>';
			if(this.cd) {
				i += '<div class="row"><div class="' + this.cd + '">' + t + '</div></div>';
			}
			else {
				i += '<div class="row"><div class="col-12">' + t + '</div></div>';
			}
			return this.buildRoot(this.rootTag, i);
		}

		add(a: number): Date {
			if(!this.state) this.state = new Date();
			let d = this.state.getDate();
			let m = this.state.getMonth();
			let y = this.state.getFullYear();
			let r = m + a;
			let n = new Date(y, r, d);
			let nm = n.getMonth();
			if(nm != r) {
				n = new Date(y, r + 1, 0);
				nm = n.getMonth();
			}
			let ny = n.getFullYear();
			// Invocare prima del metodo body
			this.setState(n);
			if(this.eb) {
				this.eb.innerHTML = this.body();
			}
			if(this.em) {
				let w = ny * 100 + nm + 1;
				this.em.innerText = WUX.formatMonth(w, true, true);
			}
			return n;
		}

		mark(...p: any[]): this {
			if(!p || !p.length) return this;
			for(let o of p) {
				let dt = WUtil.toDate(o);
				if(!dt) continue;
				let k = this.str(dt);
				this.am.push(k);
				if(k == this.ls) continue;
				let e = document.getElementById(this.subId(k));
				if(e) e.setAttribute('style', this.sk);
			}
			return this;
		}

		unmark(...p: any[]): this {
			if(!p || !p.length) return this;
			for(let o of p) {
				let dt = WUtil.toDate(o);
				if(!dt) continue;
				let k = this.str(dt);
				this.unm(this.am.indexOf(k));
			}
			return this;
		}

		title(d: any, t: string): this {
			let dt = WUtil.toDate(d);
			if(!dt) return this;
			let k = this.str(dt);
			this.mt[k] = t;
			let e = document.getElementById(this.subId(k));
			if(e) e.setAttribute('title', t);
			return this;
		}

		unm(i: number, r: boolean = true): void {
			if(i < 0) return;
			let k = this.am[i];
			if(!k) return;
			if(r) this.am.splice(i, 1);
			let e = document.getElementById(this.subId(k));
			if(e) {
				let s = this.str(this.state);
				if(s == k) {
					e.setAttribute('style', this.ss);
				}
				else {
					e.setAttribute('style', this.sd);
				}
			}
		}

		clear(): this {
			if(this.am && this.am.length) {
				for(let i = 0; i < this.am.length; i++) {
					this.unm(i, false);
				}
				this.am = [];
			}
			if(this.mt) {
				for(let k in this.mt) {
					let e = document.getElementById(this.subId(k));
					if(e) e.setAttribute('title', null);
				}
				this.mt = {};
			}
			return this;
		}

		prev(): Date {
			return this.add(-1);
		}

		next(): Date {
			return this.add(1);
		}

		ele(dt: Date): HTMLElement {
			if(!dt) return null;
			return document.getElementById(this.subId(this.str(dt)));
		}

		str(dt: Date): string {
			if(!dt) return null;
			return (dt.getFullYear() * 10000 + (dt.getMonth() + 1) * 100 + dt.getDate()) + '';
		}

		from(): string {
			if(!this.state) this.state = new Date();
			let m = this.state.getMonth();
			let y = this.state.getFullYear();
			return (y * 10000 + (m + 1) * 100 + 1) + '';
		}

		to(): string {
			if(!this.state) this.state = new Date();
			let m = this.state.getMonth();
			let y = this.state.getFullYear();
			// Last day
			let n = new Date(y, m + 1, 0);
			let d = n.getDate();
			return (y * 10000 + (m + 1) * 100 + d) + '';
		}

		protected body(): string {
			if(!this.state) this.state = new Date();
			let b = '';
			// Current state
			let d = this.state.getDate();
			let m = this.state.getMonth();
			let y = this.state.getFullYear();
			this.ls = (y * 10000 + (m + 1) * 100 + d) + '';
			// First day of month
			let h = new Date(y, m, 1);
			let w = h.getDay();
			if(w == 0) w = 7;
			// Last day of month
			let j = new Date(y, m + 1, 0);
			let l = j.getDate();
			let z = 1;
			for(let r = 1; r <= 6; r++) {
				b += '<tr>';
				// rows
				for(let c = 1; c <= 7; c++) {
					// cols
					if(r == 1 && c < w) {
						// empty cell in first row
						b += '<td style="' + this.se + '"></td>';
					}
					else if(z > l) {
						// empty cell in last row
						b += '<td style="' + this.se + '"></td>';
					}
					else {
						let k = (y * 10000 + (m + 1) * 100 + z) + '';
						let t = k == this.td ? this.st : '';
						let a = this.mt[k];
						a = a ? ' title="' + a + '"' : '';
						if(k == this.ls) {
							b += '<td id="' + this.subId(k) + '" style="' + this.ss + t + '"' + a + '>' + z + '</td>';
						}
						else {
							if(this.am.indexOf(k) >= 0) {
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
				if(z > l) break;
			}
			return b;
		}

		protected componentDidMount(): void {
			this.ep = document.getElementById(this.subId('p'));
			this.em = document.getElementById(this.subId('m'));
			this.en = document.getElementById(this.subId('n'));
			this.et = document.getElementById(this.subId('t'));
			this.eb = document.getElementById(this.subId('b'));
			if(this.ep) {
				this.ep.addEventListener('click', (e) => {
					this.prev();
				});
			}
			if(this.en) {
				this.en.addEventListener('click', (e) => {
					this.next();
				});
			}
			this.root.addEventListener('click', (e) => {
				let s = WUX.lastSub(e.target);
				if(!s) return;
				if(s.length == 8) {
					let n = parseInt(s);
					let t = s == this.td ? this.st : '';
					// Date
					let se = this.ele(this.state);
					if(se) {
						let p = this.str(this.state);
						let q = p == this.td ? this.st : '';
						if(this.am.indexOf(p) >= 0) {
							se.setAttribute('style', this.sk + q);
						}
						else {
							se.setAttribute('style', this.sd + q);
						}
					}
					e.target['style'] = this.ss + t;
					if(this.ls == s) return;
					this.setState(new Date(n / 10000, ((n % 10000) / 100) - 1, (n % 10000) % 100));
				}
			});
			this.root.addEventListener('dblclick', (e) => {
				let s = WUX.lastSub(e.target);
				if(!s) return;
				if(s.length == 8) {
					this.trigger('_doubleclick', s);
				}
			});
			this.root.addEventListener('mouseover', (e) => {
				let s = WUX.lastSub(e.target);
				if(!s) return;
				if(s.length == 8) {
					let t = s == this.td ? this.st : '';
					// Over date
					e.target['style'] = this.so + t;
				}
			});
			this.root.addEventListener('mouseout', (e) => {
				let s = WUX.lastSub(e.target);
				if(!s) return;
				if(s.length == 8) {
					let t = s == this.td ? this.st : '';
					let i = this.str(this.state);
					if(s == i) {
						// Selected date
						e.target['style'] = this.ss + t;
					}
					else {
						if(this.am.indexOf(s) >= 0) {
							// Marked date
							e.target['style'] = this.sk + t;
						}
						else {
							// Normal date
							e.target['style'] = this.sd + t;
						}
					}
				}
			});
		}
	}

	export class WLineChart extends WUX.WComponent<string, WChartData> {
		fontName: string;
		fontSize: number;
		axis: string;
		grid: string;
		line: string;
		offx: number;
		offy: number;
		maxy: number;
		_w: number;
		_h: number;

		constructor(id?: string, classStyle?: string, style?: string | WUX.WStyle) {
			super(id ? id : '*', 'WLineChart', '', classStyle, style);
			this.rootTag = 'canvas';
			this.forceOnChange = true;

			let iw = window.innerWidth;
			this._w = 750;
			this._h = 370;
			if(iw < 900 || iw > 1920) {
				this._w = Math.round(750 * iw / 1400);
				this._h = Math.round(370 * this._w / 750);
			}
			this._attributes = 'width="' + this._w + '" height="' + this._h + '"';

			this.fontSize = 14;
			this.fontName = 'Arial';
			this.axis = '#808080';
			this.grid = '#a0a0a0';
			this.line = '#e23222';
			this.offx = 30;
			this.offy = 30;
		}

		size(width: number, height: number): this {
			this._w = width;
			this._h = height;
			if(this._w < 40) this._w = 40;
			if(this._h < 40) this._h = 40;
			this._attributes = 'width="' + this._w + '" height="' + this._h + '"';
			return this;
		}

		get width(): number {
			return this._w;
		}
		set width(v: number) {
			this._w = v;
			if(this._w < 40) this._w = 40;
			this._attributes = 'width="' + this._w + '" height="' + this._h + '"';
		}

		get height(): number {
			return this._h;
		}
		set height(v: number) {
			this._h = v;
			if(this._h < 40) this._h = 40;
			this._attributes = 'width="' + this._w + '" height="' + this._h + '"';
		}

		protected componentDidMount(): void {
			// Get data
			if(!this.state) return;
			let s = this.state.series;
			if(!s || !s.length) return;
			let d0 = s[0];
			if(!d0 || d0.length < 2) return;
			let cs = this.state.styles;
			
			// Get Context
			let r = this.root as HTMLCanvasElement;
			let ctx = r.getContext('2d');
			if(!ctx) return;
			
			// Check labels (arguments)
			let labels = this.state.labels;
			let pady = 0;
			let padx = 0;
			let drawL = false;
			if(labels && labels.length == d0.length) {
				let t0 = labels[0];
				let l0 = t0 ? t0.length : 0;
				let dl = l0 > 4 ? Math.ceil(l0 / 2) : 2;
				pady = this.fontSize * dl + 4;
				padx = this.fontSize * 2 + 4;
				drawL = true;
			}
			
			// Boundary
			let cw = r.width - this.offx - padx;
			let ch = r.height - this.offy - pady;
			let bw = cw / (d0.length - 1);
			// Max Y
			let my = Math.max(...d0);
			if(!my) my = 4;
			if(this.maxy && this.maxy > my) {
				my = this.maxy;
			}
			// Intermediate Y
			let iy = [Math.round(my / 4), Math.round(my / 2), Math.round(my * 3 / 4)];
			// Step Y
			let sy = ch / my;
			
			// Chart
			for(let j = 0; j < s.length; j++) {
				let dj = s[j];
				// Mind this: < d0.length
				if(!dj || dj.length < d0.length) return;
				let sl = this.line;
				if(cs && cs.length > j) {
					sl = cs[j];
					if(!sl) sl = this.line;
				}
				
				ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = sl;
				ctx.moveTo(this.offx, r.height - pady - (dj[0] * sy));
				// Mind this: < d0.length
				for (let i = 1; i < d0.length; i++) {
					let x = this.offx + i * bw;
					let y = r.height - pady - (dj[i] * sy);
					ctx.lineTo(x, y);
				}
				ctx.stroke();
			}
			
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
			for (let i = 1; i < d0.length; i++) {
				let x = this.offx + i * bw;
				// X
				ctx.moveTo(x, this.offy);
				ctx.lineTo(x, r.height - pady);
			}
			// Max Y
			ctx.moveTo(this.offx, this.offy);
			ctx.lineTo(r.width - padx, this.offy);
			// Intermediate Y
			for(let vy of iy) {
				ctx.moveTo(this.offx, r.height - pady - (vy * sy));
				ctx.lineTo(r.width - padx, r.height - pady - (vy * sy));
			}
			ctx.stroke();
			
			// Labels
			ctx.fillStyle = this.axis;
			ctx.font = this.fontSize + 'px ' + this.fontName;
			ctx.fillText('0', 0, r.height - pady);
			for(let vy of iy) {
				ctx.fillText('' + vy, 0, r.height - pady - (vy * sy));
			}
			ctx.fillText('' + my, 0, this.offy);
			
			if(drawL) {
				for (let i = 0; i < labels.length; i++) {
					let x = this.offx + i * bw;
					// Etichetta inclinata sull'asse X
					ctx.save();
					ctx.translate(x - this.fontSize, r.height);
					ctx.rotate(-Math.PI / 3);
					ctx.fillStyle = this.axis;
					ctx.fillText(labels[i], 0, 0);
					ctx.restore();
				}
			}
		}
	}
}