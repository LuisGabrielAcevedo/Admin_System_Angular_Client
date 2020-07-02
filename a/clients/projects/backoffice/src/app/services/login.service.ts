import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { XHRService } from '@mcy/main/services/xhr.service';
import { ISignInResponse, IUserAccount, IUserAccountResponse, ISesionData, makeSesionData } from 'backoffice/src/app/models/login';
import { StorageService } from '@mcy/main/services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
	usernameSubject = new BehaviorSubject<ISesionData>(makeSesionData({}));

	constructor (
		private dataService: XHRService,
		private storage: StorageService,
		private router: Router,
	) { }

	updateUserState(data: Partial<ISesionData>) {
		this.usernameSubject.next(makeSesionData({...this.getSesionData().value, ...data}));
	}

	getSesionData(): BehaviorSubject<ISesionData> {
		return this.usernameSubject;
	}

	validateAccount(account: IUserAccount): Observable<IUserAccountResponse> {
		return this.getAccount(account).pipe(
			map((res: ISignInResponse) => {
				if (res.success) {
					this.storage.setData('agentToken', res.data.token);
					this.storage.setData('agentUsername', account.user);
					this.updateUserStateFromStorage();
					return { success: true, messages: [] };
				}
				const messageError = res.status.map(status => status.message);
				return { success: false, messages: messageError };
			}),
			catchError((error) => {
				return of({ success: false, messages: [error.message] });
			})
		)
	}

	logout() {
		this.storage.clear();
		this.updateUserState(makeSesionData({}));
		this.router.navigate(['/']);
	}

	getAccount(account: IUserAccount): Observable<ISignInResponse> {
		return this.dataService.post('v1/agents/sign-in', {
			body: {
				username: account.user,
				password: account.password
			}
		});
	}

	updateUserStateFromStorage() {
		const username = this.storage.getData('agentUsername');
		const token = this.storage.getData('agentToken');
		let userInitials = (username || '').slice(0,2);
		userInitials = `${userInitials![0]}, ${userInitials![1]}`;
		this.updateUserState({username: userInitials, token});
	}
}
