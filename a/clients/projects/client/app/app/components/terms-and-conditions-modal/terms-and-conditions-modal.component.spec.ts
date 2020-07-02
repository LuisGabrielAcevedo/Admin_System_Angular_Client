import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsModalComponent } from './terms-and-conditions-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { makeTermsAndConditionsModal } from 'client/app/app/models/modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CoreModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { Observable, of } from 'rxjs';
import { AuthServiceMock } from 'client/app/app/services/auth.service.mock';
import { AuthService } from 'client/app/app/services/auth.service';

describe('TermsAndConditionsModalComponent', () => {
	let component: TermsAndConditionsModalComponent;
	let fixture: ComponentFixture<TermsAndConditionsModalComponent>;
	let userService: UserService;
	
	const dialogMock = {
		close: () => { }
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				CoreModule
			],
			declarations: [TermsAndConditionsModalComponent],
			providers: [
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: MAT_DIALOG_DATA, useValue: makeTermsAndConditionsModal({})},
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: AuthService, useClass: AuthServiceMock }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TermsAndConditionsModalComponent);
		userService = TestBed.get(UserService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should unsubscribe when the component is destroyed', () => {
		spyOn(component.subscription, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should update the signed status of welcome', () => {
		spyOn(component.subscription, 'add');
		spyOn(userService, 'updateSignedPages').and.returnValue(new Observable());
		component.onConfirm();
		expect(userService.updateSignedPages).toHaveBeenCalled();
	});

	it('should call the confirm method from the data passed', () => {
		spyOn(component.subscription, 'add');
		spyOn(userService, 'updateSignedPages').and.returnValue(of(true));
		spyOn(component.data, 'onConfirm');
		component.onConfirm();
		expect(component.data.onConfirm).toHaveBeenCalled();
	});
});
