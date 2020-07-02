import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTransferamountComponent } from './select-transfer-amount.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { Router } from '@angular/router';
import { AccountType } from 'client/app/app/models/account';
import { IAmountTransferForm, makeAmountTransferForm } from 'client/app/app/modules/transfers/models/transfers';
import { BehaviorSubject } from 'rxjs';
import { makeTransferState } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('SelectTransferamountComponent', () => {
	let component: SelectTransferamountComponent;
	let fixture: ComponentFixture<SelectTransferamountComponent>;
	let router: Router;
	let transferService: TransferService;
	const accountType: AccountType = 'CC';
	const amountTransferForm: IAmountTransferForm = makeAmountTransferForm({});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				ReactiveFormsModule,
				RouterTestingModule,
				FormsModule,
				PipesModule
			],
			declarations: [ SelectTransferamountComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectTransferamountComponent);
		router = TestBed.get(Router);
		component = fixture.componentInstance;
		transferService = TestBed.get(TransferService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set the accounts state on init', () => {
		spyOn(component, 'setAccountState');
		component.ngOnInit();
		expect(component.setAccountState).toHaveBeenCalled();
	});

	it('should back to edit page', () => {
		spyOn(router, 'navigate');
		component.backToEdit();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/ownTransferAccounts']);
	});

	it('should back to edit page', () => {
		spyOn(component.changeBalance, 'emit');
		component.updateAccount(amountTransferForm);
		expect(component.changeBalance.emit).toHaveBeenCalledWith(amountTransferForm);
	});

	it('should formatted the account type', () => {
		const result = component.formattedAccountType(accountType);
		expect(result).toBe('CC');
	});

	it('should set account state', () => {
		spyOn(transferService, 'getTransferState').and.returnValue(
			new BehaviorSubject(makeTransferState({}))
		);
		component.setAccountState();
		expect(transferService.getTransferState).toHaveBeenCalled();
	});
});
