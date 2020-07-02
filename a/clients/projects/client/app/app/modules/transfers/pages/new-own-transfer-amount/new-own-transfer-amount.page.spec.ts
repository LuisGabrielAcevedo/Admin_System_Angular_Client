import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewOwnTransferAmountPage } from './new-own-transfer-amount.page';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { Router } from '@angular/router';
import { IAmountTransferForm, makeAmountTransferForm } from 'client/app/app/modules/transfers/models/transfers';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('NewOwnTransferAmount', () => {
	let component: NewOwnTransferAmountPage;
	let fixture: ComponentFixture<NewOwnTransferAmountPage>;
	let router: Router;
	const amountTransferForm: IAmountTransferForm = makeAmountTransferForm({});
	let transferService: TransferService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule
			],
			declarations: [NewOwnTransferAmountPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewOwnTransferAmountPage);
		component = fixture.componentInstance;
		transferService = TestBed.get(TransferService);
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load the last transfer on init', () => {
		spyOn(component, 'setLastTransfer');
		component.ngOnInit();
		expect(component.setLastTransfer).toHaveBeenCalled();
	});

	it('should go to the previous page', () => {
		spyOn(router, 'navigate');
		component.back();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/ownTransferAccounts']);
	});

	it('should go to the next page', () => {
		spyOn(router, 'navigate');
		spyOn(transferService, 'updateTransferState');
		component.next();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/ownTransferSummary']);
		expect(transferService.updateTransferState).toHaveBeenCalled();
	});

	it('should set the balance value', () => {
		component.setBalance(amountTransferForm);
		expect(component.balance).toEqual(amountTransferForm);
	});

	it('should set complete value', () => {
		component.setValidation(true);
		expect(component.complete).toBe(true);
	});

	it('should navigate on goToLanding', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers']);
	});

	it('should navigate on goToSelectTransfer', () => {
		spyOn(router, 'navigate');
		component.goToSelectTransfer();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/new']);
	});
});
