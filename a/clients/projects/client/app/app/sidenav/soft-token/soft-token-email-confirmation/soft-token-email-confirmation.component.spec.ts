import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftTokenEmailConfirmationComponent } from './soft-token-email-confirmation.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateModule } from '@ngx-translate/core';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { AppModule } from 'client/app/app/app.module';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ISoftTokenValidationResponse } from 'client/app/app/models';
import { of } from 'rxjs';

describe('SoftTokenEmailConfirmationComponent', () => {
	let component: SoftTokenEmailConfirmationComponent;
	let fixture: ComponentFixture<SoftTokenEmailConfirmationComponent>;
	let sidenavService: SidenavService;
	let userService: UserService;
	const token: string = '111111';
	const softTokenValidationSuccess: ISoftTokenValidationResponse = {
		success: true,
		status: [],
		data: { isValid: true },
	}
	const softTokenValidationInvalid: ISoftTokenValidationResponse = {
		success: true,
		status: [],
		data: { isValid: false },
	}
	const softTokenValidationError: ISoftTokenValidationResponse = {
		success: false,
		status: [],
		data: { isValid: false },
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ],
			imports: [
				AppModule,
				[TranslateModule.forRoot()]
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SoftTokenEmailConfirmationComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		userService = TestBed.get(UserService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle onCancel', () => {
		spyOn(sidenavService, 'goToStep');
		component.onCancel();
		expect(sidenavService.goToStep).toHaveBeenCalled();
	});

	it('should return null if soft token validation is success', async(() => {
		spyOn(userService, 'getSoftTokenValidation').and.returnValue(of(softTokenValidationSuccess));
		component.onSubmitToken(token).subscribe(() => {
			expect(userService.getSoftTokenValidation).toHaveBeenCalled();
		});
	}));

	it('should return error if soft token validation is invalid', async(() => {
		spyOn(userService, 'getSoftTokenValidation').and.returnValue(of(softTokenValidationInvalid));
		component.onSubmitToken(token).subscribe(() => {
			expect(userService.getSoftTokenValidation).toHaveBeenCalled();
		});
	}));

	it('should return error', async(() => {
		spyOn(userService, 'getSoftTokenValidation').and.returnValue(of(softTokenValidationError));
		component.onSubmitToken(token).subscribe(() => {
			expect(userService.getSoftTokenValidation).toHaveBeenCalled();
		});
	}));

	it('should go to the next step', () => {
		spyOn(sidenavService, 'nextStep');
		component.tokenValidation();
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});

	it('should handle onClose', () => {
		spyOn(sidenavService, 'close');
		component.onClose();
		expect(sidenavService.close).toHaveBeenCalled();
	});
});
