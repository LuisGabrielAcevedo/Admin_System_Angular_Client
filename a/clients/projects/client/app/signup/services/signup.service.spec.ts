import { TestBed } from '@angular/core/testing';
import { SignupService } from './signup.service';
import { IUserDocumentType } from 'client/app/signup/models';
import { DOCUMENTS } from 'client/app/app/constants';
import {
	makeDocument,
	IDocument,
	ISignupFormValue,
	makeSignupFormValue,
	makeSignupBffData,
	ISignupBFF,
	makeUserRegistrationResponse,
	IDocumentBff,
	makeDocumentBff,
	makePositiveValidationResponse
} from 'client/app/signup/models/signup';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { Observable, of } from 'rxjs';

describe('SignupService', () => {
	let signupService: SignupService;
	let xhrService: XHRService;

	const userDocumentType: IUserDocumentType = DOCUMENTS[0];
	const documentMock: IDocument = makeDocument({});
	const documentBffMock: IDocumentBff = makeDocumentBff({})
	const userData: ISignupFormValue = makeSignupFormValue({});
	const userBffData: ISignupBFF = makeSignupBffData({});

	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [
			SignupService,
			{ provide: XHRService, useClass: XHRServiceMock }
		],
		});
	});

	beforeEach(() => {
		signupService = TestBed.get(SignupService);
		xhrService = TestBed.get(XHRService);
	});

	it('should be created', () => {
		expect(signupService).toBeTruthy();
	});

	it('should update the signup state', () => {
		spyOn(signupService.subject, 'next');
		signupService.updateSignupState({});
		expect(signupService.subject.next).toHaveBeenCalled();
	});

	it('should get the signup state', () => {
		const subject = signupService.getSignupState();
		expect(signupService.subject).toEqual(subject);
	});

	it('should return a document when searching by its id', () => {
		const returnedDocument = signupService.findDocumentById(userDocumentType.code);
		expect(returnedDocument).toEqual(userDocumentType);
	});

	it('should call the user validation endpoint', () => {
		spyOn(xhrService, 'get');
		const isRegistration: string = '';
		signupService.submitDocument(documentMock, isRegistration);
		expect(xhrService.get).toHaveBeenCalledWith('v1/registrations/registration/user-validate', {
			params: {
				documentType: documentMock.documentType.code,
				documentNumber: documentMock.documentNumber,
				isRegistration
			}
		})
	});

	it('should validate if the document is correct', () => {
		spyOn(signupService, 'submitDocument').and.returnValue(new Observable());
		signupService.validateDocument(documentMock);
		expect(signupService.submitDocument).toHaveBeenCalled();
	});

	it('should submit register data', () => {
		spyOn(signupService, 'postUsers').and.returnValue(of(makeUserRegistrationResponse({})));
		signupService.submitRegister(userData);
		expect(signupService.postUsers).toHaveBeenCalled();
	});

	it('should call the post method', () => {
		spyOn(xhrService, 'post');
		signupService.postUsers(userBffData, '', '');
		expect(xhrService.post).toHaveBeenCalled();
	});

	it('should call to the positive validation endpoint function', () => {
		const code: string = '';
		spyOn(signupService, 'submitPositiveValidation').and.returnValue(of(makePositiveValidationResponse({})));
		signupService.checkPositiveValidation(code, documentBffMock);
		expect(signupService.submitPositiveValidation).toHaveBeenCalledWith(code, documentBffMock);
	});
});
