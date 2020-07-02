import { Injectable } from '@angular/core';
import { ILogoutResponse } from 'client/app/app/models';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthServiceMock {

	constructor(

	) { }

	logout() {

	}

	postLogout(_username: string): Observable<ILogoutResponse> {
		return new Observable();
	}
}
