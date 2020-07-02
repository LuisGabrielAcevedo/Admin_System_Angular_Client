import { Injectable } from '@angular/core';
import { ISignCapacity, ISignState } from 'client/app/app/models';
import { Observable } from 'rxjs';

@Injectable()
export class SignaturesServiceMock {
	getSignCapacity(): Observable<ISignCapacity> {
		return new Observable();
	}

	getSignState(): Observable<ISignState> {
		return new Observable();
	}

	searchSignCapacity(_id: string): Observable<ISignCapacity | undefined>{
		return new Observable();
	}

	getCapacity(_data: ISignCapacity, _id: string): Observable<ISignCapacity | undefined> {
		return new Observable();
	}

	updateSignState(_data: Partial<ISignState>): void {}
}
