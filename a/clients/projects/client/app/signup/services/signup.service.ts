import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ISignupState, makeSignupState, makeSignupFormValue } from 'client/app/signup/models';
import { Observable, of } from 'rxjs';
import {
	IDocument,
	IUserDocumentType,
	adaptDocument,
	IDocumentResponse,
	ISignupFormValue,
	IUserRegistrationResponse,
	adaptUserDataToBFF, ISignupBFF, IPositiveValidationResponse, IDocumentBff
} from 'client/app/signup/models/signup';
import { map, catchError } from 'rxjs/operators';
import { DOCUMENTS } from 'client/app/app/constants';
import { XHRService } from '@mcy/main/services/xhr.service';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable()
export class SignupService {
	public subject = new BehaviorSubject<ISignupState>(makeSignupState({}));

	constructor(
		private xhrService: XHRService
	) { }

	updateSignupState(data: Partial<ISignupState>): void {
		this.subject.next(makeSignupState({ ...this.getSignupState().value, ...data }));
	}

	getSignupState(): BehaviorSubject<ISignupState> {
		return this.subject;
	}

	get isRegistration() {
		return  `${!this.getSignupState().value.hasUserForgotCredentials}`;
	}

	validateDocument(document: IDocument) : Observable<boolean> {
		this.updateSignupState({ 
			isSignupLoading: true,
		});
		return this.submitDocument(document, this.isRegistration).pipe(
			map((res: IDocumentResponse) => {
				this.updateSignupState({ isSignupLoading: false });
				return res.data.isValid;
			}),
			catchError(() => {
				this.updateSignupState({ isSignupLoading: false });
				return of(false);
			})
		);
	}

	submitDocument(document: IDocument, isRegistration: string): Observable<IDocumentResponse> {
		return this.xhrService.get('v1/registrations/registration/user-validate', {
			params: {
				documentType: document.documentType.documentType,
				documentNumber: document.documentNumber,
				isRegistration
			}
		})
	}

	findDocumentById(id: string): IUserDocumentType {
		const document = DOCUMENTS.find((element: IUserDocumentType) => {
			return element.code === id;
		});
		return adaptDocument(document);
	}

	resetFormState() {
		this.updateSignupState({ signupFormValue: makeSignupFormValue({}) });
	}

	submitRegister(userData: ISignupFormValue): Observable<boolean> {
		return this.postUsers(adaptUserDataToBFF(userData), userData.token, this.isRegistration).pipe(
			map ((res: IUserRegistrationResponse) => {
				return !!res.success;
			}),
			catchError(() => {
				return of(false);
			})
		)
	}

	postUsers(userData: ISignupBFF, token: string, isRegistration: string): Observable<IUserRegistrationResponse> {
		return this.xhrService.post(('v1/registrations/registration/users'),
		 { 
			 body: userData, 
			 headers: { tokenToValidate: token }, 
			 params: { isRegistration }
		});
	}

	checkPositiveValidation(code: string, document: IDocumentBff): Observable<boolean> {
		this.updateSignupState({
			isPositiveValidationLoading: true, 
			hasPositiveValidationErrors: false,
			isPositiveValidationValid: true
		});
		return this.submitPositiveValidation(code, document).pipe(
			map((res: IPositiveValidationResponse) => {
				this.updateSignupState({isPositiveValidationLoading: false});
				if(res.success && res.data.token !== '') {
					this.updateSignupState({
						signupFormValue: {
							...this.getSignupState().value.signupFormValue,
							token: res.data.token
						},
						hasPositiveValidationErrors: false,
						isPositiveValidationValid: true
					});
					return true;
				}
				this.updateSignupState({hasPositiveValidationErrors: true, isPositiveValidationValid: false});
				return false;
			}),
			catchError(() => {
				this.updateSignupState({
					hasPositiveValidationErrors: true, 
					isPositiveValidationValid: false,
					isPositiveValidationLoading: false
				});
				return of(false);
			})
		)
	}

	positiveValidationValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const isPositiveValidationValid = this.getSignupState().value.isPositiveValidationValid;
			return isPositiveValidationValid || control.value ? null : { positiveValidationError: {value: control.value}};
		}
	}

	submitPositiveValidation(code: string, documentBff: IDocumentBff): Observable<IPositiveValidationResponse> {		
		return this.xhrService.post('v1/positive-validation/validate-code', {
			body: {
				codeToValidate: code,
				document: {
					type: documentBff.type,
					number: documentBff.number
				}
			}
		});
	}
}
