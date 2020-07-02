import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
	IAccountState,
	IServiceDebtsResponse,
	IServiceDebtState
} from 'client/app/app/models';
export class ServiceDebtServiceMock implements OnDestroy {
	ngOnDestroy(): void {}
	findServiceDebts(): void {}
	updateServiceDebtState(_data: Partial<IAccountState>) {}
	getServiceDebtState(): Observable<IServiceDebtState> {
		return new Observable();
	}
	getServiceDebts(
		_id: string,
		_serviceId: string
	): Observable<IServiceDebtsResponse> {
		return new Observable();
	}
	findServiceDebt(): void {}
	getServiceDebt(
		_id: string,
		_serviceId: string
	): Observable<IServiceDebtsResponse> {
		return new Observable();
	}
}
