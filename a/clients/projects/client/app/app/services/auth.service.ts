import { Injectable, OnDestroy } from '@angular/core';
import { StorageService } from '@mcy/main/services/storage.service';
import { Router } from '@angular/router';
import { EventService } from 'client/app/app/services/event.service';
import { ILogoutResponse } from 'client/app/app/models';
import { Observable, Subscription } from 'rxjs';
import { XHRService } from '@mcy/main/services/xhr.service';

@Injectable()
export class AuthService implements OnDestroy {
	public subscription = new Subscription();

	constructor(
		private router: Router,
		private storage: StorageService,
		private eventService: EventService,
		private xhrService: XHRService,
	) { }

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	logout() {
		this.subscription.add(
			this.postLogout(this.storage.getData('tempUser')).subscribe(() => {}, () => {})
		);
		this.storage.clear();
		this.router.navigate(['/']).then(() => {
			this.eventService.emit('resetAppState');
		});
	}

	postLogout(username: string): Observable<ILogoutResponse> {
		return this.xhrService.post(`v1/login/sign-in/${username}/sign-out`);
	}
}
