namespace APP {
	
	export function getURLServices() {
		return window.location.origin;
	}
	
	export class HttpClient {
		url: string;
		mres: { [key: string]: any };
		mock: boolean;
		
		constructor(url?: string) {
			if(url) {
				this.url = url;
			}
			else {
				this.url = window.location.origin;
			}
		}
		
		before() {
			window['BSIT'].showLoader();
		}
		
		after() {
			window['BSIT'].hideLoader();
		}
		
		sim(method: string, entity: string, params: any, success: (result: any) => void, failure?: (error: any) => void) {
			console.log('sim(' + method + "," + entity + ')', params);
			method = method ? method.toLowerCase() : 'get';
			this.before();
			setTimeout(() => {
				this.after();
				let d = null;
				if(this.mres) {
					let r = this.mres[method + "_" + entity];
					if(!r) r = this.mres[method];
					d = (typeof r === 'function') ? r(entity, params) : r;
				}
				if(d != null && d != undefined) {
					if(success) success(d);
				}
				else {
					if(failure) {
						failure({"message": 'No mock data for ' + method + ' ' + entity});
					}
					else {
						showError("Errore servizio", 'No mock data for ' + method + ' ' + entity);
					}
				}
			}, 500);
		}
		
		get(entity: string, params: { [key: string]: any }, success: (result: any) => void, failure?: (error: any) => void) {
			if(this.mock) {
				this.sim('get', entity, params, success, failure);
				return;
			}
			this._get('GET', entity, params, success, failure);
		}
		
		delete(entity: string, params: { [key: string]: any }, success: (result: any) => void, failure?: (error: any) => void) {
			if(this.mock) {
				this.sim('delete', entity, params, success, failure);
				return;
			}
			this._get('DELETE', entity, params, success, failure);
		}
		
		post(entity: string, data: object, success: (result: any) => void, failure?: (error: any) => void) {
			if(this.mock) {
				this.sim('post', entity, data, success, failure);
				return;
			}
			this._send('POST', entity, data, success, failure);
		}
		
		put(entity: string, data: object, success: (result: any) => void, failure?: (error: any) => void) {
			if(this.mock) {
				this.sim('put', entity, data, success, failure);
				return;
			}
			this._send('PUT', entity, data, success, failure);
		}
		
		patch(entity: string, data: object, success: (result: any) => void, failure?: (error: any) => void) {
			if(this.mock) {
				this.sim('patch', entity, data, success, failure);
				return;
			}
			this._send('PATCH', entity, data, success, failure);
		}
		
		_get(method: string, entity: string, params: { [key: string]: any }, success: (result: any) => void, failure?: (error: any) => void) {
			if(!method) method = 'GET';
			let search = params ? new URLSearchParams(params).toString() : "";
			let requrl = search ? this.url + "/" + entity + "?" + search : this.url + entity;
			this.before();
			fetch(requrl, {
				"method" : method
			})
			.then(response => {
				this.after();
				if (!response.ok) {
					console.error('[HttpClient] ' + method + ' ' + entity + ': HTTP ' + response.status);
					if(failure) {
						failure(new Error("HTTP " + response.status));
					}
					else {
						showError("Errore servizio", "Si e' verificato un errore di servizio.");
					}
					return;
				}
				return response.json();
			})
			.then(data => {
				if(success) success(data);
			})
			.catch(error => {
				console.error('[HttpClient] ' + method + ' ' + entity + ':', error);
				this.after();
				if(failure) {
					failure(error);
				}
				else {
					showError("Errore servizio", "Si e' verificato un errore di servizio.");
				}
			});
		}
		
		_send(method: string, entity: string, data: object, success: (result: any) => void, failure?: (error: any) => void) {
			if(!method) method = 'POST';
			let requrl = this.url + "/" + entity;
			this.before();
			fetch(requrl, {
				"method" : method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})
			.then(response => {
				this.after();
				if (!response.ok) {
					console.error('[HttpClient] ' + method + ' ' + entity + ': HTTP ' + response.status);
					if(failure) {
						failure(new Error("HTTP " + response.status));
					}
					else {
						showError("Errore servizio", "Si e' verificato un errore di servizio.");
					}
					return;
				}
				return response.json();
			})
			.then(data => {
				if(success) success(data);
			})
			.catch(error => {
				console.error('[HttpClient] ' + method + ' ' + entity + ':', error);
				this.after();
				if(failure) {
					failure(error);
				}
				else {
					showError("Errore servizio", "Si e' verificato un errore di servizio.");
				}
			});
		}
	}

	export let http = new HttpClient(getURLServices());
}