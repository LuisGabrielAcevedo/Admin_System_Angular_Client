import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ISignupState, makeSignupState } from 'client/app/signup/models';
import { IDocument, makeUserDocumentType, IUserDocumentType, ISignupFormValue, IDocumentBff, IPositiveValidationResponse } from 'client/app/signup/models/signup';
import { Observable } from 'rxjs';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


@Injectable()
export class SignupServiceMock {
	public subject = new BehaviorSubject<ISignupState>(makeSignupState({}));

	updateSignupState(_data: Partial<ISignupState>): void {
		return;
	}

	getSignupState(): BehaviorSubject<ISignupState> {
		return this.subject;
	}

	validateDocument(_document: IDocument) : Observable<boolean> {
		return new Observable();
	}

	submitDocument(_document: IDocument): Observable<boolean> {
		return new Observable();
	}

	findDocumentById(_id: string): IUserDocumentType {
		return makeUserDocumentType({});
	}

	validateUsername(_username: string): Observable<boolean> {
		return new Observable();
	}

	submitRegister(_contactData: ISignupFormValue): Observable<boolean> {
		return new Observable();
	}

	positiveValidationValidator(): ValidatorFn {
		return (_control: AbstractControl): ValidationErrors | null => {
			return null;
		}
	}
	
	checkPositiveValidation(_code: string, _document: IDocumentBff): Observable<boolean> {
		return new Observable();
	}

	submitPositiveValidation(_code: string, _document: IDocumentBff): Observable<IPositiveValidationResponse> {
		return new Observable();
	}
}
