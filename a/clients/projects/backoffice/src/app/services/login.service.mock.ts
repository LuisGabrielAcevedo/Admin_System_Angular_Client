import { Injectable } from '@angular/core';
import { IUserAccount, ISignInResponse, makeSesionData, ISesionData } from 'backoffice/src/app/models/login';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginServiceMock {
	updateUserState(_data: Partial<ISesionData>) {}

	getSesionData(): BehaviorSubject<ISesionData> {
		return new BehaviorSubject(makeSesionData({}));
	}

	validateAccount(_account: IUserAccount): Observable<boolean> {
		return new Observable();
	}

	getAccount(_username: string, _password: string): Observable<ISignInResponse> {
		return new Observable();
	}

	logout() {}

	updateUserStateFromStorage() {}
}

