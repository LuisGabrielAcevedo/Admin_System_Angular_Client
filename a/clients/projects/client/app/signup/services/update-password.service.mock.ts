import { Injectable } from '@angular/core';
import { IUpdatePasswordState, makeUpdatePasswordState } from 'client/app/signup/models/update-password';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UpdatePasswordServiceMock {
	public subject = new BehaviorSubject<IUpdatePasswordState>(makeUpdatePasswordState({}));
	
	constructor() {}

	getUpdatePasswordState() {
		return this.subject;
	}

}
