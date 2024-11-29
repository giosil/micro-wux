namespace APP {

	export function getPageComponent(): WUX.WComponent {
		let p = WUX.WUtil.getParam('test');
		switch(window.location.pathname) {
			case '/app-adc':  return new GUIAreeCompetenza();
			case '/app-cco':  return new GUICompetenze('Competenze comportamentali', 'C_COM');
			case '/app-ctp':  return new GUICompetenze('Competenze Tecnico Professionali', 'C_TP');
			case '/app-cts':  return new GUICompetenzeDX('Competenze Tecnico Specialistiche', 'C_TS');
			case '/app-demo': return new GUIDemo();
			case '/app-test': return p == 'dx' ? new GUIEntitiesDX() : new GUIEntities();
		}
		return null;
	}

	export function showInfo(m: string, title?: string) {
		if(!title) title = "Messaggio";
		window["BSIT"].notify({"state": 'info', "title" : title, "message": m});
	}

	export function showSuccess(m: string, title?: string) {
		if(!title) title = "Messaggio";
		window["BSIT"].notify({"state": 'success', "title" : title, "message": m});
	}

	export function showWarning(m: string, title?: string) {
		if(!title) title = "Messaggio";
		window["BSIT"].notify({"state": 'warning', "title" : title, "message": m});
	}

	export function showError(m: string, title?: string) {
		if(!title) title = "Messaggio";
		window["BSIT"].notify({"state": 'error', "title" : title, "message": m});
	}

	let _dc: DlgConfirm;
	
	export function confirm(m: string, f?: (response: any) => void) {
		if(!_dc) _dc = new DlgConfirm('', m);
		_dc.onHiddenModal((e) => { if(f) f(_dc.ok); });
		_dc.message = m;
		_dc.show();
	}

	export function dropdownBtn(id: string, t: string, items: string, cls: string = 'btn btn-outline-primary') {
		let r = '<button id="' + id + '-b" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle ' + cls + '">' + t + ' <i class="fa fa-caret-down"></i></button>';
		let a = ' tabindex="-1"';
		let s = ' style="max-height:180px;overflow-y:auto;"';
		r += '<div id="' + id + '-m"' + a + ' role="menu" aria-hidden="true" class="dropdown-menu"' + s + '>';
		r += '<div class="link-list-wrapper">';
		r += '<ul id="' + id + '-l" class="link-list">';
		if(items) r += items;
		r +=  '</ul></div></div>';
		return r;
	}
}