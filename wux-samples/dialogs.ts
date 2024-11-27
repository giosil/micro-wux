namespace APP {
	
	export class DlgCompetenza extends WUX.WDialog<string, Competenza> {
		fp: WUX.WFormPanel;
		
		constructor(id: string) {
			super(id, 'DlgCompetenza');
			
			this.title = 'Competenza';
			
			this.fp = new WUX.WFormPanel(this.subId('fp'));
			this.fp.addRow();
			this.fp.addTextField('codice', 'Codice', {"readonly": true});
			this.fp.addRow();
			this.fp.addTextField('nome', 'Nome');
			this.fp.addRow();
			this.fp.addTextField('descrizione', 'Descrizione');
			this.fp.addRow();
			this.fp.addTextField('areaCompetenza', 'Area di competenza');
			this.fp.addInternalField('id');
			
			this.body
				.addRow()
					.addCol('col-md-12')
						.add(this.fp);
		}
		
		override updateState(nextState: Competenza): void {
			this.state = nextState;
			if(this.fp) {
				this.fp.setState(this.state);
			}
		}
		
		override getState(): Competenza {
			if(this.fp) {
				this.state = this.fp.getState();
			}
			return this.state;
		}
		
		override onClickOk(): boolean {
			return true;
		}
		
		protected onShown() {
			setTimeout(() => { this.fp.focusOn('nome'); });
		}
		
		clear() {
			if(this.fp) {
				this.fp.clear();
			}
			this.state = null;
		}
	}
}
