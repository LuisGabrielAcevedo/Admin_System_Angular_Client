import { Component, Input } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ISidenavData } from 'client/app/app/models';
import { SWORN_DECLARATION } from 'client/app/app/constants/sworn-declaration';

@Component({
	selector: 'mcy-sworn-declaration',
	templateUrl: './sworn-declaration.component.html',
	styleUrls: ['./sworn-declaration.component.scss']
})
export class SwornDeclarationComponent {
	@Input() public data: ISidenavData = {};
	public swornDeclaration: string = SWORN_DECLARATION;

	constructor(
		private sidenavService: SidenavService
	) { }

	back() {
		this.sidenavService.close();
	}

	confirmSwornDeclaration() {
		this.data.onAcceptTerms();
		this.sidenavService.close();
	}
}
