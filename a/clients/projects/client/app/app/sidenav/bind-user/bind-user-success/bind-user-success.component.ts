import { Component, Input } from '@angular/core';
import { ContactCategory, ISidenavData  } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { makeEmployeeBFFResponse } from 'client/app/app/models/employee'

@Component({
	selector: 'mcy-bind-user-success',
	templateUrl: './bind-user-success.component.html',
	styleUrls: ['./bind-user-success.component.scss']
})
export class BindUserSuccessComponent  {
	
	@Input() public data: ISidenavData = {
		userData: makeEmployeeBFFResponse({})
	}

	public profileType: ContactCategory = 'PROVIDER';
	

	constructor(
		private sidenavService: SidenavService
		) { }

	finish() {
		this.sidenavService.close();
	}

	getFormatedName(){
		return `${this.data.userData.firstName} ${this.data.userData.lastName}`
	}

}
