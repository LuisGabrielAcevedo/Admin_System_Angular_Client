import { TestBed } from '@angular/core/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { TransferService } from './transfer.service';
import { BehaviorSubject, of } from 'rxjs';
import { ITransfersResponse, makeTransfer, makeTransferState } from 'client/app/app/models';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { TransactionUtilsService } from './transaction-utils.service';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { SoftTokenServiceMock } from './soft-token.service.mock';
import { SoftTokenService } from './soft-token.service';

describe('TransferService', () => {
	let transferService: TransferService;
	let dataService: DataService;

	const transferData: ITransfersResponse = {
		success: true,
		status: [{
			code: '0',
			message: 'success'
		}],
		data: [
			makeTransfer({})
		]
	};

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientModule,
			CoreModule,
			TranslateModule.forRoot()
		],
		providers: [
			TransferService,
			{ provide: DataService, useClass: DataServiceMock },
			{ provide: StorageService, useClass: StorageServiceMock },
			{ provide: EventService, useClass: EventServiceMock },
			TransactionUtilsService,
			{ provide: UserService, useClass: UserServiceMock},
			{ provide: SoftTokenService, useClass: SoftTokenServiceMock }
		],
		})
		.compileComponents()
	);

	beforeEach(() => {
		transferService = TestBed.get(TransferService);
		dataService = TestBed.get(DataService);
	});

	it('should be created', () => {
		expect(transferService).toBeTruthy();
	});

	it('should unsubscribe on destroy', () => {
		spyOn(transferService.subscription, 'unsubscribe');
		transferService.ngOnDestroy();
		expect(transferService.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should find trasfers', () => {
		spyOn(transferService, 'getTransfers').and.returnValue(of(transferData));
		spyOn(transferService, 'updateTransferState');
		transferService.findTransfers();
		expect(transferService.getTransfers).toHaveBeenCalled();
		expect(transferService.updateTransferState).toHaveBeenCalled();
	});

	it('should update transfer state on update', () => {
		spyOn(transferService.subject, 'next');
		transferService.updateTransferState({});
		expect(transferService.subject.next).toHaveBeenCalled();
	});

	it('should call dataService on getTransfers', () => {
		spyOn(dataService, 'get');
		transferService.getTransfers();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should return a transfer from form', () => {
		spyOn(transferService, 'getTransferState').and.returnValue(new BehaviorSubject(makeTransferState({})));
		transferService.getNewTransferFromForm();
		expect(transferService.getTransferState).toHaveBeenCalled();
	});

	it('should reset state', () => {
		spyOn(transferService, 'updateTransferState');
		transferService.resetState();
		expect(transferService.updateTransferState).toHaveBeenCalled();
	});

	it('should reset form state', () => {
		spyOn(transferService, 'updateTransferState');
		transferService.resetFormState();
		expect(transferService.updateTransferState).toHaveBeenCalled();
	});
});
