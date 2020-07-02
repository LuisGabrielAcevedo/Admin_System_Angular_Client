import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountsResponse } from 'client/app/app/models/account';
import { IServiceCategoriesResponse, IServiceCategory } from 'client/app/app/models/service-category';
import { IServicesResponse } from 'client/app/app/models/service';
import { IServiceDebtResponse } from 'client/app/app/models/service-debt';
import {
	IServicePaymentState,
	IServicePaymentsResponse,
	IServicePaymentResponse,
	IServicePayment,
} from 'client/app/app/models/service-payment';

@Injectable()
export class ServicePaymentServiceMock implements OnDestroy {
	getAccounts(): Observable<IAccountsResponse> {
		return new Observable();
	}

	getCategories(): Observable<IServiceCategoriesResponse> {
		return new Observable();
	}

	getServices(_category: IServiceCategory): Observable<IServicesResponse> {
		return new Observable();
	}

	getDebt(_id: string, _serviceId: string): Observable<IServiceDebtResponse> {
		return new Observable();
	}

	ngOnDestroy(): void {}

	getServicePaymentState(): Observable<IServicePaymentState> {
		return new Observable();
	}

	updateServicePaymentState(_data: Partial<IServicePaymentState>) {}

	requestPaymentService(_data: IServicePayment, _softToken: string): Observable<IServicePaymentResponse> {
		return new Observable();
	}



	getServicePayments(): Observable<IServicePaymentsResponse> {
		return new Observable();
	}

	findServicePayments(): void {}

	exportToCSV(){}
}
