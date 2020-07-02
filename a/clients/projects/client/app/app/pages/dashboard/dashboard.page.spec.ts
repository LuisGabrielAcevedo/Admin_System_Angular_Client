import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardPage } from 'client/app/app/pages/dashboard/dashboard.page';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { MovementsService } from 'client/app/app/services/movements.service';
import { MovementsServiceMock } from 'client/app/app/services/movements.service.mock';
import { ServiceDebtService } from 'client/app/app/services/service-debt.service';
import { ServiceDebtServiceMock } from 'client/app/app/services/service-debt.service.mock';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { ContactService } from 'client/app/app/services/contact.service';

describe('DashboardPage', () => {
	let component: DashboardPage;
	let fixture: ComponentFixture<DashboardPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DashboardPage ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: MovementsService, useClass: MovementsServiceMock },
				{ provide: ServiceDebtService, useClass: ServiceDebtServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock },
			],
			imports: [
				TranslateModule.forRoot(),
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DashboardPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
