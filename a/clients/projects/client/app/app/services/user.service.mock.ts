import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUserDataResponse, IUserResponse } from 'client/app/app/models';
import { 
	IUserState, 
	makeUserState, 
	IUserApp, 
	makeUserResponse, 
	IProfileUpdateResponse, 
	makeUserApp, 
	ISoftTokenValidationResponse, 
	ISignablePageState, 
	makeSignablePageState, 
	ISignablePage,
	IProfileDataResponse,
	ITokenGenerationResponse,
	ISignPageResponse
} from 'client/app/app/models/user';
import { 
	IEnterpriseState, 
	makeEnterpriseState, 
	IEnterpriseDefaultData, 
	IEnterprise 
} from 'client/app/app/models/enterprise';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IDocumentBff, IPositiveValidationResponse } from 'client/app/signup/models/signup';

@Injectable()
export class UserServiceMock {
	private enterpriseSubject = new BehaviorSubject<IEnterpriseState>(makeEnterpriseState({}));
	private userSubject = new BehaviorSubject<IUserState>(makeUserState({}));
	signablePageSubject = new BehaviorSubject<ISignablePageState>(makeSignablePageState({}))

	updateEnterpriseState(_data: Partial<IEnterpriseState>) {}

	getEnterpriseState(): BehaviorSubject<IEnterpriseState> {
		return this.enterpriseSubject;
	}

	updateUserState(_data: Partial<IUserState>) {}

	getUserState(): BehaviorSubject<IUserState> {
		return this.userSubject;
	}

	findEnterprise(): Observable<boolean> {
		return new Observable();
	}

	findUser(): Observable<boolean> {
		return new Observable();
	}

	positiveValidationValidator(): ValidatorFn {
		return (_control: AbstractControl): ValidationErrors | null => {
			return null;
		}
	}

	setUserFormat(_user: IUserResponse): IUserApp {
		return makeUserApp({})
	}

	setBFFUserFormat(_user: IUserApp): IUserResponse {
		return makeUserResponse({});
	}

	getUserDataFull(): Observable<IUserDataResponse | null> {
		return new Observable();
	}

	updateUserDetails(_userData: Partial<IUserResponse>): Observable<IProfileUpdateResponse> {
		return new Observable();
	}

	patchUserData(_userId: string, _enterpriseState: IEnterpriseState, _user: IUserApp): Observable<IProfileDataResponse> {
		return new Observable();
	}


	updateEnterpriseDefault(_enterpriseDefault: IEnterpriseDefaultData): Observable<boolean> {
		return new Observable();
	}

	getUserData(): Observable<IUserResponse> {
		return new Observable();
	}

	changeEnterprise(_enterprise: IEnterprise) { }

	getNewSeed(): Observable<ITokenGenerationResponse> {
		return new Observable();
	}

	setEnterprise(_enterprise: IEnterprise) { }

	generateNewSeed(): Observable<boolean> {
		return new Observable();
	}

	updateSignablePageStateById(_pageId: string) { }

	updateSignedPages(_pageId: string, _versionId: string, _userId: string): Observable<boolean> {
		return new Observable();
	}

	checkPositiveValidation(_code: string, _document: IDocumentBff): Observable<boolean> {
		return new Observable();
	}

	submitPositiveValidation(_code: string, _documentBff: IDocumentBff): Observable<IPositiveValidationResponse> {		
		return new Observable();
	}

	getSoftTokenValidation(
		_token: string, 
		_username: string, 
		_securityToken: string
	): Observable<ISoftTokenValidationResponse> {
		return new Observable();
	}

	signPage(_pageId: string, _versionId: string, _userId: string): Observable<ISignPageResponse> {
		return new Observable();
	}

	getSignablePageState(): BehaviorSubject<ISignablePageState> {
		return this.signablePageSubject;
	}
	updateSignablePagesState(_data: Partial<ISignablePageState>) { }

	adaptSignablePagesToState(_pages: ISignablePage[]): ISignablePageState { 
		return makeSignablePageState({});
	}

	getEnterprises(): Observable<boolean> {
		return new Observable();
	}

	hasPermission(_permission: string): boolean {
		return true;
	}
}
