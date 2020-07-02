import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { XHRService } from '@mcy/main/services/xhr.service';
import { ISignInResponse, ILoginState, makeLoginState, IUserAccount } from 'client/app/login/models';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '@mcy/main/services/storage.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeModal } from 'client/app/app/models';
import { UpdatePasswordModalComponent } from 'client/app/login/components/update-password-modal/update-password-modal.component';
import { LOGIN_ERROR } from 'client/app/app/constants/index';
import { MultiSessionModalComponent } from 'client/app/login/components/multi-session-modal/multi-session-modal.component';

@Injectable()
export class LoginService {
	public subject = new BehaviorSubject<ILoginState>(makeLoginState({}));

	constructor (
		private dataService: XHRService,
		private storage: StorageService,
		private modalService: ModalService
	) { }

	validateAccount(account: IUserAccount): Observable<boolean> {
		this.updateLoginState({ isLoading: true, error: undefined });
		return this.getAccount(account).pipe(
			map((res: ISignInResponse) => {
				if(res.success) {
					this.storage.setData('token', res.data.token);
					this.storage.setData('lastEntry', new Date());

					this.updateLoginState({
						token: res.data.token,
						isLoading: false,
						error: undefined,
					});
					return true;
				}
				return false;
			}),
			catchError((data) => {
				this.updateLoginState({ error: data.error, isLoading: false });
				if( data.error && 
					data.error.code
				){
					if(data.error.code.includes(LOGIN_ERROR.PASSWORD_EXPIRED)) {
						this.updateLoginState(makeLoginState({error: undefined}));
						this.showUpdatePasswordModal();
					} 
					else if(data.error.code.includes(LOGIN_ERROR.MULTI_SESSION)) {
						this.updateLoginState(makeLoginState({error: undefined}));
						this.showMultiSessionModal();
					}					
				}				
				return of(false);
			})
		)
	}
	
	showUpdatePasswordModal() {
		this.modalService.openDialog(
			makeModal({
				component: UpdatePasswordModalComponent,
			}),
			{
				disableClose: true,
				id: 'tyc-modal',
				backdropClass: 'tyc-modal-backdrop'
			}
		)
	}

	showMultiSessionModal() {
		this.modalService.openDialog(
			makeModal({
				component: MultiSessionModalComponent,
			}),
			{
				disableClose: true,
				id: 'tyc-modal',
				backdropClass: 'tyc-modal-backdrop'
			}
		)
	}
	

	updateLoginState(data: Partial<ILoginState>): void {
		this.subject.next(makeLoginState({ ...this.getLoginState().value, ...data }));
	}

	getLoginState(): BehaviorSubject<ILoginState> {
		return this.subject;
	}

	getAccount(account: IUserAccount): Observable<ISignInResponse> {
		return this.dataService.post('v1/login/sign-in', {
			body: {
				username: account.user,
				password: account.password
			}
		});
	}
}
