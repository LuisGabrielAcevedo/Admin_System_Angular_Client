import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPage } from './signup.page';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupService } from 'client/app/signup/services/signup.service';
import { SignupServiceMock } from 'client/app/signup/services/signup.service.mock';
import { Router } from '@angular/router';
import { makeSignupState, ISignupState, makeUserDocumentType } from 'client/app/signup/models';
import { of, BehaviorSubject } from 'rxjs';
import { IDocument, makeDocument } from 'client/app/signup/models/signup';
import { FormGroup, FormControl } from '@angular/forms';


describe('SignupPage', () => {
	let component: SignupPage;
	let fixture: ComponentFixture<SignupPage>;
	let router: Router;
	let signupService: SignupService;

	const state: BehaviorSubject<ISignupState> = new BehaviorSubject(makeSignupState({}));

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SignupPage ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				CoreModule,
				RouterTestingModule,
				TranslateModule.forRoot() 
			],
			providers: [
				{ provide: SignupService, useClass: SignupServiceMock },
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignupPage);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		signupService = TestBed.get(SignupService);
		fixture.detectChanges();
	});

	beforeEach(() => {
		component.signupForm = new FormGroup({
			documentNumber: new FormControl(null),
			documentType: new FormControl(null)
		})
	})

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get the signup state', () => {
		spyOn(signupService, 'getSignupState').and.returnValue(state);
		component.ngOnInit();
		expect(signupService.getSignupState).toHaveBeenCalled();
	});

	it('should set the signup state',() => {
		spyOn(signupService, 'getSignupState').and.returnValue(state);
		component.ngOnInit();
		expect(component.signupState).toEqual(makeSignupState({}));
	});

	it('should redirect to login', () => {
		spyOn(router, 'navigate');
		component.redirectToLogin();
		expect(router.navigate).toHaveBeenCalledWith(['/']);
	});

	it('should submit the form if the form is valid', () => {
		const documentNumber = '123123';

		spyOn(component, 'submitForm');
		spyOn(signupService, 'findDocumentById').and.returnValue(makeUserDocumentType({}));

		component.signupForm.controls.documentType.patchValue('3');
		component.signupForm.controls.documentNumber.patchValue(documentNumber);
		component.validateForm();
		expect(component.submitForm).toHaveBeenCalledWith({
			documentNumber,
			documentType: makeUserDocumentType({})
		});
	});

	it('should redirect to an error if the document is not valid', () => {
		const document: IDocument = makeDocument({});
		spyOn(component, 'redirectError');
		spyOn(signupService, 'updateSignupState');
		spyOn(signupService, 'validateDocument').and.returnValue(of(false));
		component.submitForm(document);
		expect(component.redirectError).toHaveBeenCalled();
	});

	it('should redirect to the next step if the document is valid', () => {
		const document: IDocument = makeDocument({});
		spyOn(component, 'redirectToNextStep');
		spyOn(signupService, 'updateSignupState');
		spyOn(signupService, 'validateDocument').and.returnValue(of(true));
		component.submitForm(document);
		expect(component.redirectToNextStep).toHaveBeenCalled();
	});

	it('should update the state if the document is valid', () => {
		const document: IDocument = makeDocument({});
		spyOn(signupService, 'updateSignupState');
		spyOn(component, 'redirectToNextStep');
		spyOn(signupService, 'validateDocument').and.returnValue(of(true));
		component.submitForm(document);
		expect(signupService.updateSignupState).toHaveBeenCalled();
	});

	it('should redirect to the next step', () => {
		spyOn(router, 'navigate');
		component.redirectToNextStep();
		expect(router.navigate).toHaveBeenCalledWith(['/signup/positiveValidation']);
	});

	it('should redirect to its error page', () => {
		spyOn(router, 'navigate');
		component.redirectError();
		expect(router.navigate).toHaveBeenCalledWith(['/signup/signupErrorPage']);
	});
});
