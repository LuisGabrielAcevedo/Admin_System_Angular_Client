import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'backoffice/src/app/services/login.service';
import { makeSesionData, ISesionData } from 'backoffice/src/app/models/login';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	public userInitials: string | undefined;
	public sesionState: ISesionData = makeSesionData({});
	public subscription = new Subscription();

	constructor (
		private loginService: LoginService,
	) {}

	ngOnInit() {
		this.subscription.add(
			this.loginService.getSesionData().subscribe((state) => {
				if(state.token !== '' && state.username !== '') {
					this.sesionState = state;
				} else {
					this.loginService.updateUserStateFromStorage();
				}
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get isLogged() {
		return this.sesionState.token && this.sesionState.token !== '';
	}

	logout() {
		this.loginService.logout();
	}

	checkLogs() {
		window.open('https://splunkpl01.sis.ad.bia.itau/en-US/account/login', '_blank');
	}

}
