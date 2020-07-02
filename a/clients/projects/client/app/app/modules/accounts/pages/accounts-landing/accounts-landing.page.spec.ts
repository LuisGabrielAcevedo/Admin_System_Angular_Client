import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccountsLandingPage } from './accounts-landing.page';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { AccountService } from 'client/app/app/services/account.service';
import { StatementsService } from 'client/app/app/services/statements.service';
import { StatementsServiceMock } from 'client/app/app/services/statements.service.mock';
import { MovementsService } from 'client/app/app/services/movements.service';
import { MovementsServiceMock } from 'client/app/app/services/movements.service.mock';

describe('AccountsLandingPage', () => {
	let component: AccountsLandingPage;
	let fixture: ComponentFixture<AccountsLandingPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountsLandingPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: StatementsService, useClass: StatementsServiceMock },
				{ provide: MovementsService, useClass: MovementsServiceMock }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountsLandingPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
