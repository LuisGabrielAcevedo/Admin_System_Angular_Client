import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { IEnterpriseState, makeEnterpriseState, IEnterprise } from 'client/app/app/models';
import { UserService } from 'client/app/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-enterprises-selector',
	templateUrl: './enterprises-selector.component.html',
	styleUrls: ['./enterprises-selector.component.scss']
})
export class EnterprisesSelectorComponent implements OnInit, OnDestroy {
	public enterpriseState: IEnterpriseState = makeEnterpriseState({});
	public subscription: Subscription = new Subscription();

	constructor(
		public sidenavService: SidenavService,
		private userService: UserService,
	) { }

	ngOnInit() {
		this.subscription.add(this.userService.getEnterpriseState().subscribe(state => {
			this.enterpriseState = state;
			if (!state.selectedEnterprise && !this.enterpriseState.isLoading) {
				this.userService.findEnterprise();
			}
		}));
	}

	close(enterprise: IEnterprise) {
		if (this.enterpriseState.selectedEnterprise.id !== enterprise.id) {
			this.userService.changeEnterprise(enterprise);
		}
		this.sidenavService.close();
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
