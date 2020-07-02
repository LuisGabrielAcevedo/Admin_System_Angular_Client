import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TransferTypeSelectionPage } from './transfer-type-selection.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { makeAccountState } from 'client/app/app/models';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';

describe('TransferTypeSelectionPage', () => {
	let component: TransferTypeSelectionPage;
	let fixture: ComponentFixture<TransferTypeSelectionPage>;
	let accountService: AccountService;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TransferTypeSelectionPage],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TransferTypeSelectionPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
		accountService = TestBed.get(AccountService);
		router = TestBed.get(Router);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should look for accounts on init', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(
			new BehaviorSubject(makeAccountState({}))
		);
		spyOn(accountService, 'findAccounts');
		component.ngOnInit();
		expect(accountService.findAccounts).toHaveBeenCalled();
	});

	it('should navigate on goToLanding', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should navigate on goToLanding', () => {
		spyOn(router, 'navigate');
		component.goToOwnAccountTransfers();
		expect(router.navigate).toHaveBeenCalled();
	});
});
