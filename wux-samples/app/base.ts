namespace APP {

	export function getPageComponent(): WUX.WComponent {
		switch(window.location.pathname) {
			case '/app-demo': return new GUIDemo();
			case '/app-test': return new GUIEntities();
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