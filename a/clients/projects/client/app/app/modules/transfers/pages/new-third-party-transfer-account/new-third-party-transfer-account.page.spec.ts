import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewThirdPartyTransferAccountPage } from './new-third-party-transfer-account.page';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferService } from 'client/app/app/services/transfer.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { AccountService } from 'client/app/app/services/account.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { Router } from '@angular/router';
import { makeAccount, makeAccountState } from 'client/app/app/models';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('NewThirdPartyTransferAccountPage', () => {
	let component: NewThirdPartyTransferAccountPage;
	let fixture: ComponentFixture<NewThirdPartyTransferAccountPage>;
	let router: Router;
	let transferService: TransferService;
	let utilsService: UtilsService;
	let accountService: AccountService;
	const formBuilder: FormBuilder = new FormBuilder();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
				PipesModule,
				FormsModule,
				ReactiveFormsModule,
			],
			declarations: [NewThirdPartyTransferAccountPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: FormBuilder, useValue: formBuilder },
				{ provide: ModalService, useClass: ModalServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewThirdPartyTransferAccountPage);
		router = TestBed.get(Router);
		transferService = TestBed.get(TransferService);
		accountService = TestBed.get(AccountService);
		utilsService = TestBed.get(UtilsService);
		component = fixture.componentInstance;
		component.sourceAccountsForm = formBuilder.group({
			sourceAccount: [null],
			executionDate: [{
				value: null,
				disabled: true
			}]
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#back should go back to the previous step', async(() => {
		spyOn(router, 'navigate');
		component.back();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferAmount']);
	}));

	it('#next should call to update state', () => {
		spyOn(router, 'navigate');
		spyOn(transferService, 'updateTransferState');
		component.next();
		expect(transferService.updateTransferState).toHaveBeenCalled();
	});

	it('#next should go to the next step', async(() => {
		spyOn(router, 'navigate');
		component.next();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferSummary']);
	}));

	it('#onChangeSourceAccount should set the executionDate inside the form', () => {
		const date = '11 FEB 2020';
		spyOn(component.sourceAccountsForm, 'patchValue');
		spyOn(utilsService, 'formatDate').and.returnValue(date);
		component.onChangeSourceAccount();
		expect(component.sourceAccountsForm.patchValue).toHaveBeenCalledWith({executionDate: date});
	});

	it('#filterValidAccounts should return all the accounts have more money than the specified amount and correct symbol', () => {
		const account = makeAccount(
		{
			cbvu: '1',
			number: '123456',
			type: 'CA',
			balance: 12345,
			currency: {
				code: '032',
				symbol: 'ARS',
				description: 'Pesos argentinos'
			}
		})
		const accountStateWithAccounts = makeAccountState({
				accounts: [account],
		});
		component.transferState.newTransferFormValue.currency.symbol = 'ARS';
		component.accountState = accountStateWithAccounts;
		expect(component.filterValidAccounts).toContain(account);
	});

	it('#ngOnInit should look for accounts on init', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(
			new BehaviorSubject(makeAccountState({searchedAccounts: false})),
		);
		spyOn(accountService, 'findAccounts');
		component.ngOnInit();
		expect(accountService.findAccounts).toHaveBeenCalled();
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
