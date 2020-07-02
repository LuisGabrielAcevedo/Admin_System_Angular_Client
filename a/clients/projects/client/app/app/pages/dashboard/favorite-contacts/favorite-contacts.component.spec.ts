import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteContactsComponent } from './favorite-contacts.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('FavoriteContactsComponent', () => {
	let component: FavoriteContactsComponent;
	let fixture: ComponentFixture<FavoriteContactsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FavoriteContactsComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
			],
			providers: [
				{ provide: UserService, useClass: UserServiceMock},
				{ provide: SalaryPaymentService , useClass: SalaryPaymentServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock },
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FavoriteContactsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
