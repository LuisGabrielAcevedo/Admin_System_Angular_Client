import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveValidationPage } from './positive-validation.page';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SignupModule } from 'client/app/signup/signup.module';
import { ISignupState, makeSignupState } from 'client/app/signup/models';
import { SignupService } from 'client/app/signup/services/signup.service';
import { SignupServiceMock } from 'client/app/signup/services/signup.service.mock';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { IDocumentBff, makeDocumentBff } from 'client/app/signup/models/signup';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PositiveValidationPage', () => {
	let component: PositiveValidationPage;
	let fixture: ComponentFixture<PositiveValidationPage>;
	const signupState: ISignupState = makeSignupState({});
	let router: Router;
	let signupService: SignupService;
	let modalService: ModalService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				CoreModule,
				SignupModule,
				RouterTestingModule,
				NoopAnimationsModule,
				TranslateModule.forRoot() 
			],
			providers: [
				{ provide: SignupService, useClass: SignupServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: XHRService, useClass: XHRServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PositiveValidationPage);
		signupService = TestBed.get(SignupService);
		modalService = TestBed.get(ModalService);
		router = TestBed.get(Router);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get the document type', () => {
		expect(component.documentType).toBe(signupState.signupFormValue.documentType.documentType);
	});

	it('should get the document number', () => {
		expect(component.documentNumber).toBe(signupState.signupFormValue.documentNumber);
	});

	it('should redirect to the next page if the code or document are valid', () => {
		const document: IDocumentBff = makeDocumentBff({
			number: component.signupState.signupFormValue.documentNumber,
			type: component.signupState.signupFormValue.documentType.documentType
		});
		component.positiveValidationForm.controls.code.patchValue('13123123');
		const code: string = component.positiveValidationForm.controls.code.value;
		spyOn(signupService, 'checkPositiveValidation').and.returnValue(of(true));
		spyOn(router, 'navigate');
		component.onContinue();
		expect(signupService.checkPositiveValidation).toHaveBeenCalledWith(code, document);
		expect(router.navigate).toHaveBeenCalledWith(['/signup/accessDataPage']);
	});

	it('should reset the form if the code or document are invalid', () => {
		const document: IDocumentBff = makeDocumentBff({
			number: component.signupState.signupFormValue.documentNumber,
			type: component.signupState.signupFormValue.documentType.documentType
		});
		component.positiveValidationForm.controls.code.patchValue('13123123');
		const code: string = component.positiveValidationForm.controls.code.value;
		spyOn(signupService, 'checkPositiveValidation').and.returnValue(of(false));
		spyOn(component.positiveValidationForm, 'reset');
		component.onContinue();
		expect(signupService.checkPositiveValidation).toHaveBeenCalledWith(code, document);
		expect(component.positiveValidationForm.reset).toHaveBeenCalled();
	});

	it('should get if the endpoint is still loading', () => {
		component.signupState.isPositiveValidationLoading = false;
		expect(component.isLoading).toBeFalsy();
	});

	it('should redirect to the previous step', () => {
		spyOn(router, 'navigate');
		component.onPreviousStepClick();
		expect(router.navigate).toHaveBeenCalledWith(['signup']);
	});

	it('should open a new tab with the whatsapp url', () => {
		spyOn(window, 'open');
		component.openNewMessage();
		expect(window.open).toHaveBeenCalledWith('https://wa.me/1126028000?text=%23codigoempresa', '_blank');
	});

	it('should call the modal service if the user wants to cancel the process', () => {
		spyOn(modalService, 'openDialog');
		component.onCancel();
		expect(modalService.openDialog).toHaveBeenCalled();
	});
});
