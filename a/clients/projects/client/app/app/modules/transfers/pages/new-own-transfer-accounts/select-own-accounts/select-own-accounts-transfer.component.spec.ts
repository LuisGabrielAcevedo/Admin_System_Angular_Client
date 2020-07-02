import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { SelectOwnAccountsTransferComponent } from './select-own-accounts-transfer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { IAccount, makeAccount, makeAccountState, makeCurrency, makeTransferFormValue, ITransferFormValue } from 'client/app/app/models';
import { BehaviorSubject } from 'rxjs';

describe('SelectOwnAccountsTransferComponent', () => {
	let component: SelectOwnAccountsTransferComponent;
	let fixture: ComponentFixture<SelectOwnAccountsTransferComponent>;
	let accountService: AccountService;
	const account: IAccount = makeAccount({});
	const accountWithData: IAccount =  makeAccount({
		currency: makeCurrency({}),
		number: 'number'
	});
	const accountState: ITransferFormValue = makeTransferFormValue({});
	const accountListWithData: IAccount[] = [
		accountWithData,
		accountWithData
	];
	const accountList: IAccount[] = [
		makeAccount({}),
		makeAccount({})
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				ReactiveFormsModule,
				FormsModule
			],
			declarations: [ SelectOwnAccountsTransferComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: AccountService, useClass: AccountServiceMock },
				FormBuilder
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectOwnAccountsTransferComponent);
		component = fixture.componentInstance;
		accountService = TestBed.get(AccountService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load accounts on init', () => {
		spyOn(component, 'filterValidAccounts');
		spyOn(component, 'setFormWatcher');
		spyOn(accountService, 'getAccountState').and.returnValue(new BehaviorSubject(makeAccountState({})));
		component.ngOnInit();
		expect(component.filterValidAccounts).toHaveBeenCalledWith(accountService.getAccountState().value.accounts);
		expect(component.setFormWatcher).toHaveBeenCalled();
	});

	it('should filter the destination account', () => {
		spyOn(component.accounts, 'filter').and.returnValue(accountList);
		component.changeAccount(account, 'sourceAccounts');
		expect(component.accounts.filter).toHaveBeenCalled();
	});

	it('should filter the source account', () => {
		spyOn(component.accounts, 'filter').and.returnValue(accountList);
		component.changeAccount(account, 'destinationAccounts');
		expect(component.accounts.filter).toHaveBeenCalled();
	});

	it('should filter the source account, multiple accounts', () => {
		component.accounts = accountListWithData;
		component.changeAccount(account, 'destinationAccounts');
		expect(component.sourceAccounts.length).toEqual(2);
	});

	it('should filter the source account', () => {
		const validListAccount = component.filterValidAccounts(accountList);
		expect(validListAccount).toEqual(accountList);
	});

	it('should set watchers to the form', () => {
		component.setFormWatcher();
		expect(component.accountForm.statusChanges).toBeTruthy();
	});

	it('should set account state', () => {
		spyOn(component, 'changeAccount');
		accountState.sourceAccount.number = 'number';
		accountState.destinationAccount.number = 'number';
		component.setAccountsState(accountState);
		expect(component.changeAccount).toHaveBeenCalledWith(accountState.sourceAccount, 'sourceAccounts');
		expect(component.changeAccount).toHaveBeenCalledWith(accountState.destinationAccount, 'destinationAccounts');
	});
});
