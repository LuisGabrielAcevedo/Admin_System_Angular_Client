import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ITypesOfCheckbookResponse, ITypesOfCheckbookState } from '../models/checkbook';

@Injectable()
export class CheckbooksTypesServiceMock implements OnDestroy{

	ngOnDestroy(): void {}

	findTypesOfCheckbooks(): void {}

	getTypesOfCheckbook(): Observable<ITypesOfCheckbookResponse> {
		return new Observable();
	}

	getTypesOfCheckbookState(): Observable<ITypesOfCheckbookState> {
		return new Observable();
	}

	updateTypesOfCheckbookState(_data: Partial<ITypesOfCheckbookState>) {}
}
