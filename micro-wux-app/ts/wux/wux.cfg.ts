namespace WUX {

	/** Shared data */
	let _data: { [key: string]: any } = {};
	/** DataChanged callbacks */
	let _dccb: { [key: string]: ((e?: any) => any)[] } = {};

	export let global: WGlobal = {
		locale: 'it',

		init: function _init(callback: () => any) {
			if (WUX.debug) console.log('[WUX] global.init...');
			// Initialization code
			if (WUX.debug) console.log('[WUX] global.init completed');
			if (callback) callback();
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
	
	export class CSS {
		static readonly FORM = 'padding-top:16px;';
		static readonly FORM_GROUP = 'form-group';
		static readonly FORM_CTRL = 'form-control';
	}
	
	// Data format utilities

	export function formatDate(a: any, withDay: boolean = false, e: boolean = false): string {
		if (!a) return '';
		let d = WUtil.toDate(a);
		if (!d) return '';
		let m = d.getMonth() + 1;
		let sm = m < 10 ? '0' + m : '' + m;
		let sd = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
		if (withDay) {
			return WUX.formatDay(d.getDay(), e) + ', ' + sd + '/' + sm + '/' + d.getFullYear();
		}
		return sd + '/' + sm + '/' + d.getFullYear();
	}

	export function formatDateTime(a: any, withSec: boolean = false, withDay: boolean = false, e: boolean = false): string {
		if (!a) return '';
		let d = WUtil.toDate(a);
		if (!d) return '';
		let m = d.getMonth() + 1;
		let sm = m < 10 ? '0' + m : '' + m;
		let sd = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
		let sh = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
		let sp = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
		if (withSec) {
			let ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
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

	export function formatTime(a: any, withSec: boolean = false): string {
		if (a == null) return '';
		if (typeof a == 'number') {
			if (withSec) {
				let hh = Math.floor(a / 10000);
				let mm = Math.floor((a % 10000) / 100);
				let is = (a % 10000) % 100;
				let sm = mm < 10 ? '0' + mm : '' + mm;
				let ss = is < 10 ? '0' + is : '' + is;
				return hh + ':' + sm + ':' + ss;
			}
			else {
				let hh = Math.floor(a / 100);
				let mm = a % 100;
				let sm = mm < 10 ? '0' + mm : '' + mm;
				return hh + ':' + sm;
			}
		}
		if (typeof a == 'string') {
			if (a.indexOf(':') > 0) return a;
			if (a.length < 3) return a + ':00';
			if (a.length >= 5) return a.substring(0, 2) + ':' + a.substring(2, 4) + ':' + a.substring(4);
			return a.substring(0, 2) + ':' + a.substring(2);
		}
		if (a instanceof Date) {
			let sh = a.getHours() < 10 ? '0' + a.getHours() : '' + a.getHours();
			let sp = a.getMinutes() < 10 ? '0' + a.getMinutes() : '' + a.getMinutes();
			if (withSec) {
				let ss = a.getSeconds() < 10 ? '0' + a.getSeconds() : '' + a.getSeconds();
				return sh + ':' + sp + ':' + ss;
			}
			return sh + ':' + sp;
		}
		return '';
	}

	/**
	 * Formatta numero alla 2a cifra decimale SENZA separatore migliaia.
	 */
	export function formatNum2(a: any, nz?: string, z?: string, neg?: string): string {
		if (a === '' || a == null) return '';
		let n = WUtil.toNumber(a);
		let r = ('' + (Math.round(n * 100) / 100)).replace('.', ',');
		if (nz != null && n != 0) {
			if (neg != null && n < 0) return neg.replace('$', r);
			return nz.replace('$', r);
		}
		if (z != null && n == 0) return z.replace('$', r);
		return r;
	}

	/**
	 * Formatta numero di default SENZA separatore migliaia. Specificare 'l' per la rappresentazione locale.
	 */
	export function formatNum(a: any, nz?: string, z?: string, neg?: string): string {
		if (a === '' || a == null) return '';
		let n = WUtil.toNumber(a);
		let r = ('' + n).replace('.', ',');
		if (nz != null && n != 0) {
			if (neg != null && n < 0) {
				if (neg == 'l') return n.toLocaleString('it-IT');
				return neg.replace('$', r);
			}
			if (nz == 'l') return n.toLocaleString('it-IT');
			return nz.replace('$', r);
		}
		if (z != null && n == 0) return z.replace('$', r);
		return r;
	}

	/**
	 * Formatta numero alla 2a cifra decimale CON separatore migliaia e riportando SEMPRE le cifre decimali.
	 */
	export function formatCurr(a: any, nz?: string, z?: string, neg?: string): string {
		if (a === '' || a == null) return '';
		let n = WUtil.toNumber(a);
		let r = (Math.round(n * 100) / 100).toLocaleString('it-IT');
		let d = r.indexOf(',');
		if (d < 0) r += ',00';
		if (d == r.length - 2) r += '0';
		if (nz != null && n != 0) {
			if (neg != null && n < 0) return neg.replace('$', r);
			return nz.replace('$', r);
		}
		if (z != null && n == 0) return z.replace('$', r);
		return r;
	}

	/**
	 * Formatta numero alla 5a cifra decimale CON separatore migliaia e riportando SEMPRE le cifre decimali (massimo 2).
	 */
	export function formatCurr5(a: any, nz?: string, z?: string, neg?: string): string {
		if (a === '' || a == null) return '';
		let n = WUtil.toNumber(a);
		let r = ('' + (Math.round(n * 100000) / 100000)).replace('.', ',');
		let d = r.indexOf(',');
		if (d < 0) r += ',00';
		if (d == r.length - 2) r += '0';
		if (d > 0) {
			let s1 = r.substring(0, d);
			let s2 = r.substring(d);
			let s3 = '';
			for (let i = 1; i <= s1.length; i++) {
				if (i > 3 && (i - 1) % 3 == 0) s3 = '.' + s3;
				s3 = s1.charAt(s1.length - i) + s3;
			}
			r = s3 + s2;
		}
		if (nz != null && n != 0) {
			if (neg != null && n < 0) return neg.replace('$', r);
			return nz.replace('$', r);
		}
		if (z != null && n == 0) return z.replace('$', r);
		return r;
	}

	export function formatBoolean(a: any): string {
		if (a == null) return '';
		return a ? 'S' : 'N';
	}

	export function format(a: any): string {
		if (a == null) return '';
		if (typeof a == 'string') return a;
		if (typeof a == 'boolean') return WUX.formatBoolean(a);
		if (typeof a == 'number') {
			let r = ('' + a);
			if (r.indexOf('.') >= 0) return WUX.formatCurr(a);
			return WUX.formatNum(a);
		}
		if (a instanceof Date) return WUX.formatDate(a);
		if (a instanceof WUX.WComponent) {
			return WUX.format(a.getState());
		}
		return '' + a;
	}

	export function formatDay(d: number, e?: boolean): string {
		switch (d) {
			case 0: return e ? 'Domenica' : 'Dom';
			case 1: return e ? 'Luned&igrave;': 'Lun';
			case 2: return e ? 'Marted&igrave;': 'Mar';
			case 3: return e ? 'Mercoled&igrave;': 'Mer';
			case 4: return e ? 'Giove&igrave;': 'Gio';
			case 5: return e ? 'Venerd&igrave;': 'Ven';
			case 6: return e ? 'Sabato': 'Sab';
		}
		return '';
	}
	
	export function formatMonth(m: number, e?: boolean, y?: any): string {
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
}