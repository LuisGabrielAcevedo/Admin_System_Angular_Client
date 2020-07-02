import { TestBed } from '@angular/core/testing';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { ProviderPaymentService } from './provider-payment.service';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionUtilsService } from './transaction-utils.service';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { TransferServiceMock } from './transfer.service.mock';
import { TransferService } from './transfer.service';

describe('ProviderPaymentService', () => {
	let service: ProviderPaymentService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes([]),
				TranslateModule.forRoot(),
			],
			providers: [
				ProviderPaymentService,
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				TransactionUtilsService,
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock }
			]
		});
	});
	beforeEach(() => {
		service = TestBed.get(ProviderPaymentService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should unsubscribe when dismounting', () => {
		spyOn(service.subscription, 'unsubscribe');
		service.ngOnDestroy();
		expect(service.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should handle getProviderPaymentState', () => {
		expect(service.getProviderPaymentState()).toBeTruthy();
	});

	it('should handle updateProviderPaymentState', () => {
		spyOn(service.subject, 'next');
		service.updateProviderPaymentState({});
		expect(service.subject.next).toHaveBeenCalled();
	});

	it('should handle resetFormState', () => {
		spyOn(service, 'updateProviderPaymentState');
		service.resetFormState();
		expect(service.updateProviderPaymentState).toHaveBeenCalled();
	});

	it('should handle resetState', () => {
		spyOn(service, 'updateProviderPaymentState');
		service.resetState();
		expect(service.updateProviderPaymentState).toHaveBeenCalled();
	});
});
