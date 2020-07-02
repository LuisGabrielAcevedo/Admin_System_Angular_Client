import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { TransferDetailsComponent } from './transfer-details.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { makeAccount, makeAccountState, makeTransfer } from 'client/app/app/models';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { Observable } from 'rxjs';
import { ConceptServiceMock } from 'client/app/app/services/concept.service.mock';
import { ConceptService } from 'client/app/app/services/concept.service';

describe('TransferDetails', () => {
	let component: TransferDetailsComponent;
	let fixture: ComponentFixture<TransferDetailsComponent>;
	let utilsService: UtilsService;
	let receiptsService: ReceiptsService;

	const accountStateWithAccounts = makeAccountState({
		accounts: [makeAccount({
			cbvu: '1', 
			number: '123456789101', 
			type: 'CC'
		})],
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TransferDetailsComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: ConceptService, useClass: ConceptServiceMock}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TransferDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		utilsService = TestBed.get(UtilsService);
		receiptsService = TestBed.get(ReceiptsService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#formatAmount should call to formatAmount from utilsService with the amount passed as parameter', () => {
		const amount: number = 1000;
		spyOn(utilsService, 'formatAmount');
		component.formatAmount(amount);
		expect(utilsService.formatAmount).toHaveBeenCalledWith(amount);
	});

	it('#formatDate should call to formatDate from utilsService with the amount passed as parameter', () => {
		const date: Date = new Date();
		spyOn(utilsService, 'formatDate');
		component.formatDate(date);
		expect(utilsService.formatDate).toHaveBeenCalledWith(date);
	});

	it('#get originAccount should return an account', () => {
		component.data.accountState = accountStateWithAccounts;
		spyOn(component, 'formatAccountNumber').and.returnValue('12345678-910/1');
		component.data.transfer = makeTransfer({originCbvu: '1'});
		expect(component.originAccount).toEqual('CC 12345678-910/1');
	});

	it('should call the pdf generation service', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(new Observable());
		component.data.transfer = makeTransfer({});
		component.data.transfer.id = 'test'
		component.downloadReceipt();
		expect(receiptsService.getReceipt).toHaveBeenCalledWith('test');
	});
})
