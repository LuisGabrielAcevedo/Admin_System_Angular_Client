import { Injectable } from '@angular/core';
import { INewCheckbook, IEnablementCheckbook, IEnablementCheckbookResponse } from 'client/app/app/models';
import { Observable } from 'rxjs';
import { IRequestResponse } from 'client/app/app/models';


@Injectable()
export class CheckbooksServiceMock {

	requestCheckbooks(_checkbook: INewCheckbook): Observable<IRequestResponse>{
		return new Observable();
	}

	enableCheckbook(_data: IEnablementCheckbook): Observable<IEnablementCheckbookResponse> {
		return new Observable();
	}
}