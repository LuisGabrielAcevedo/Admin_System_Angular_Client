import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationTokenModalComponent } from './expiration-token-modal.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { makeTermsAndConditionsModal } from 'client/app/app/models/modal';
import { AuthService } from 'client/app/app/services/auth.service';
import { AuthServiceMock } from 'client/app/app/services/auth.service.mock';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';

describe('ExpirationTokenModalComponent', () => {
	let component: ExpirationTokenModalComponent;
	let fixture: ComponentFixture<ExpirationTokenModalComponent>;
	const dialogMock = {
		close: () => { }
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				CoreModule
			],
			declarations: [ExpirationTokenModalComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: MAT_DIALOG_DATA, useValue: makeTermsAndConditionsModal({})},
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: AuthService, useClass: AuthServiceMock }
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ExpirationTokenModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
