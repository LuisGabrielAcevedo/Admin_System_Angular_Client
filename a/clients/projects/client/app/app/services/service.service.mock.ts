import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IServiceState, IServicesResponse } from 'client/app/app/models';

export class ServiceServiceMock implements OnDestroy {
	ngOnDestroy(): void {}

	findService(): void {}

	updateServiceState(_data: Partial<IServiceState>) {}

	getServiceState(): Observable<IServiceState> {
		return new Observable();
	}

	getService(): Observable<IServicesResponse> {
		return new Observable();
	}
}
