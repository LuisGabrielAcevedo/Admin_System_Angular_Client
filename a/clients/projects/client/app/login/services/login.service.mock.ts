import { Injectable } from '@angular/core';
import { ILoginState, makeLoginState, ISignInResponse, IUserAccount } from 'client/app/login/models';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginServiceMock {
	private subject = new BehaviorSubject<ILoginState>(makeLoginState({}));

	validateAccount(_account: IUserAccount): Observable<boolean> {
		return new Observable();
	}

	updateLoginState(_data: Partial<ILoginState>) {}

	getLoginState(): BehaviorSubject<ILoginState> {
		return this.subject;
	}

	getAccount(_username: string, _password: string): Observable<ISignInResponse> {
		return new Observable();
	}
}
