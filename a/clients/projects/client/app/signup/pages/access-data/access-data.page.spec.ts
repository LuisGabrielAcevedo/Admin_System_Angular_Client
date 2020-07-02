import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDataPage } from './access-data.page';
import { CoreModule } from '@angular/flex-layout';
import { MainModule } from '@mcy/main/main.module';
import { SignupModule } from 'client/app/signup/signup.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SignupService } from 'client/app/signup/services/signup.service';
import { SignupServiceMock } from 'client/app/signup/services/signup.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';

describe('AccessDataPage', () => {
	let component: AccessDataPage;
	let fixture: ComponentFixture<AccessDataPage>;
	let modalService: ModalService;
	let router: Router;
	let signupService: SignupService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ],
			imports: [
				CoreModule,
				MainModule,
				SignupModule,
				RouterTestingModule,
				NoopAnimationsModule,
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: SignupService, useClass: SignupServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				ValidatorService,
				{ provide: XHRService, useClass: XHRServiceMock }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccessDataPage);
		component = fixture.componentInstance;
		modalService = TestBed.get(ModalService);
		signupService = TestBed.get(SignupService);
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle onCancel', () => {
		spyOn(modalService, 'openDialog');
		component.onCancel();
		expect(modalService.openDialog).toHaveBeenCalled();
	});

	it('should sumbmit register and redirect to login', () => {
		spyOn(signupService, 'updateSignupState');
		spyOn(signupService, 'submitRegister').and.returnValue(of(true));
		spyOn(router, 'navigate');
		component.onContinue();
		expect(router.navigate).toHaveBeenCalledWith(['/signup/signupSuccessPage']);
		expect(signupService.submitRegister).toHaveBeenCalled();
		expect(signupService.updateSignupState).toHaveBeenCalled();
	});
});
