import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import {
	IUserState,
	makeUserState,
	IEnterpriseResponse,
	IUserResponse,
	IUsersResponse,
} from 'backoffice/src/app/models/user';

@Injectable()
export class UserServiceMock {
	userSubject = new BehaviorSubject<IUserState>(makeUserState({}));

	updateUserState(_data: Partial<IUserState>) {}

	getUserState(): BehaviorSubject<IUserState> {
		return this.userSubject;
	}

	findEnterprise(_cuit: number) {}

	getEnterprise(_cuit: number): Observable<IEnterpriseResponse> {
		return new Observable();
	}

	updateUsername(_username: string) {}

	findUser(_username: string): Observable<boolean> {
		return new Observable();
	}

	findUsers() {}

	getUser(_username: string): Observable<IUserResponse> {
		return new Observable();
	}

	getUsers(): Observable<IUsersResponse> {
		return new Observable();
	}

}
