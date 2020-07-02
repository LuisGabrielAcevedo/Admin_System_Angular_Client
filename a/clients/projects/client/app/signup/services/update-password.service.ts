import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { makeUpdatePasswordState, IUpdatePasswordState, UpdatePasswordResponse } from 'client/app/signup/models/update-password';
import { XHRService } from '@mcy/main/services/xhr.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UpdatePasswordService {
	public subject = new BehaviorSubject<IUpdatePasswordState>(makeUpdatePasswordState({}));
	public subscription: Subscription; 
	constructor(
		private dataService: XHRService,
		private router: Router,
		) { 
			this.subscription = new Subscription();
		}

	updatePasswordState(data: Partial<IUpdatePasswordState>): void {
		this.subject.next(makeUpdatePasswordState({...this.getUpdatePasswordState().value, ...data }));
	}

	getUpdatePasswordState() {
		return this.subject;
	}

	resetState() {
		this.updatePasswordState(makeUpdatePasswordState({}));
	}

	updatePassword( oldPass: string, newPass: string ) {
		this.updatePasswordState({
			isLoading: true, 
			hasErrors: false, 
		});
		this.subscription.add(this.makeUpdatePasswordApiCall(this.getUpdatePasswordState().value, oldPass, newPass ).subscribe((res) => {
			if(res.success){
				this.updatePasswordState({
					isLoading: false, 
					hasErrors: false,
					oldPassword: oldPass, 
					newPassword: newPass
				});
				this.router.navigate(['/signup/updatePasswordSuccessPage']);
			} else {
				this.updatePasswordState({
					isLoading: false, 
					hasErrors: true
				});
			}
		}, () => {
			this.updatePasswordState({
				isLoading: false, 
				hasErrors: true
			});
		}))
	}

	makeUpdatePasswordApiCall(state :IUpdatePasswordState, oldPass: string, newPass: string): Observable<UpdatePasswordResponse>{
		return this.dataService.put('v1/registrations/registration/change-username-password', {
			body: {
				username: state.userName,
				password: oldPass,
				newPassword: newPass
			}
		});
	}

}
