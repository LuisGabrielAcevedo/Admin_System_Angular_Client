import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewOwnTransferAccountsPage } from './new-own-transfer-accounts.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { IAccountsTransferForm, makeAccountsTransferForm } from 'client/app/app/modules/transfers/models/transfers';
import { makeTransferState, ITransferState } from 'client/app/app/models';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('NewOwnTransferAccounts', () => {
	let component: NewOwnTransferAccountsPage;
	let fixture: ComponentFixture<NewOwnTransferAccountsPage>;
	const accountsTransferForm: IAccountsTransferForm = makeAccountsTransferForm({});
	let router: Router;
	let transferService: TransferService;
	const accountState: ITransferState = makeTransferState({});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule
			],
			declarations: [NewOwnTransferAccountsPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewOwnTransferAccountsPage);
		router = TestBed.get(Router);
		transferService = TestBed.get(TransferService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load the last transfer on init', () => {
		spyOn(transferService, 'getTransferState').and.returnValue(
			new BehaviorSubject(makeTransferState({}))
		);
		component.ngOnInit();
		expect(transferService.getTransferState).toHaveBeenCalled();
	});

	it('should load the last transfer on init with accounts data', () => {
		accountState.newTransferFormValue.sourceAccount.number = 'number';
		accountState.newTransferFormValue.destinationAccount.number = 'number';
		spyOn(transferService, 'getTransferState').and.returnValue(
			new BehaviorSubject(makeTransferState(accountState))
		);
		component.ngOnInit();
		expect(transferService.getTransferState).toHaveBeenCalled();
	});


	it('should go back', async(() => {
		spyOn(router, 'navigate');
		component.back();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/new']);
	}));

	it('should go to the next step', async(() => {
		spyOn(router, 'navigate');
		component.next();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/ownTransferAmount']);
	}));

	it('should set the accounts value', () => {
		component.setAccounts(accountsTransferForm);
		expect(component.accounts ).toEqual(accountsTransferForm);
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
