import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { AccountSelectComponent } from './account-select.component';
import { IAccount, makeAccount, makeCurrency } from 'client/app/app/models';
import { PipesModule } from '@mcy/core/pipes/pipes.module';

describe('AccountSelectComponent', () => {
	let component: AccountSelectComponent;
	let fixture: ComponentFixture<AccountSelectComponent>;
	const accounts: IAccount[] = [
		makeAccount({
			number: '34564567-343/7',
			type: 'CC',
			balance: 8000,
			currency: makeCurrency({
				symbol: 'ARS'
			})
		}),
		makeAccount({
			number: '22114567-343/7',
			type: 'CA',
			balance: 5000,
			currency: makeCurrency({
				symbol: 'ARS'
			})
		})
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountSelectComponent],
			imports: [ReactiveFormsModule, PipesModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				FormBuilder
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when account is selected the function formattedAccountAmount should return a string', () => {
		component.balanceText = 'Saldo:';
		component.selectedAccount.patchValue(accounts[0]);
		const resp = component.formattedAccountAmount();
		expect(resp).toBe(`Saldo: ARS 8000`);
	});

	it('when exist account compareAccounts() should return a string with a the number', () => {
		const resp = component.compareAccounts(accounts[0], accounts[0]);
		expect(resp).toBeTruthy();
	});

	it('when account is selected the function formattedAccountAmount should return a string', () => {
		spyOn(component, 'formatAccountNumber').and.returnValue('34564567-343/7');
		const resp1 = component.selectAccountLabel();
		expect(resp1).toBe('');
		component.selectedAccount.patchValue(accounts[0]);
		const resp2 = component.selectAccountLabel();
		expect(resp2).toBe(`CC 34564567-343/7`);
	});

	it('when selectedAccount is valid the function validate() should return null', () => {
		const resp = component.validate();
		expect(resp).toBeNull();
	});

	it('when selectedAccount is valid the function validate() should return null', () => {
		component.required = true;
		component.ngOnInit();
		component.selectedAccount.patchValue(null);
		const resp = component.validate();
		expect(resp).toEqual({ required: true });
	});

	it('when setDisabledState have true the selectedAccount.disabled should be true', () => {
		component.setDisabledState(true);
		expect(component.selectedAccount.disabled).toBeTruthy();
		component.setDisabledState(false);
		expect(component.selectedAccount.disabled).toBeFalsy();
	});

	it('when writeValue have value the selectedAccount should have value', () => {
		component.writeValue(accounts[0]);
		expect(component.selectedAccount.value.number).toBe('34564567-343/7');
	});

	it('registerOnChange()', () => {
		const onChangeEvent = (change: any) => { console.log('There were changes', change); };
		component.registerOnChange(onChangeEvent);
		expect(component.subscription).toBeTruthy();
	});

	it('registerOnTouched()', () => {
		component.onTouched();
		const onTouchedEvent = (touched: any) => { console.log('There were touched', touched); };
		component.registerOnTouched(onTouchedEvent);
		expect(component.subscription).toBeTruthy();
	});
});
