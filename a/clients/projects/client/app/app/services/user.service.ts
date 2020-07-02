import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { IEnterpriseState, makeEnterpriseState, IEnterprise, makeEnterprise } from 'client/app/app/models/enterprise';
import { map, catchError } from 'rxjs/operators';
import {
	IUserState,
	makeUserState,
	IUserResponse,
	IUserApp,
	IProfileDataResponse,
	makeUserApp,
	ISoftTokenValidationResponse,
	makeUserResponse,
	IUserDataResponse,
	ITokenGenerationResponse,
	ISignPageResponse,
	ISignablePage,
	makeSignablePageState,
	ISignablePageState,
	IUserPermissionsResponse,
} from 'client/app/app/models/user';
import { XHRService } from '@mcy/main/services/xhr.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { EventService } from './event.service';
import { Router } from '@angular/router';
import { DataService } from '@mcy/core/services/data.service';
import { SIGNABLE_PAGES } from 'client/app/app/constants';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IPositiveValidationResponse } from 'client/app/signup/models/signup';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'client/app/login/services/login.service';
import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class UserService implements OnDestroy {
	/*
		This service does not extend StatefulService because it shouldn't reset it's state
		when changing between enterprises
	*/

	enterpriseSubject = new BehaviorSubject<IEnterpriseState>(makeEnterpriseState({}));
	userSubject = new BehaviorSubject<IUserState>(makeUserState({}));
	signablePageSubject = new BehaviorSubject<ISignablePageState>(makeSignablePageState({}));
	subscription = new Subscription();

	constructor(
		private eventService: EventService,
		private xhrService: XHRService,
		private dataService: DataService,
		private storage: StorageService,
		private router: Router,
		private loginService: LoginService,
		private authService: AuthService
	) {
		this.subscription.add(
			this.eventService.on('resetAppState').subscribe(() => this.resetState())
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	updateEnterpriseState(data: Partial<IEnterpriseState>) {
		this.enterpriseSubject.next(makeEnterpriseState({...this.getEnterpriseState().value, ...data}));
	}

	getEnterpriseState(): BehaviorSubject<IEnterpriseState> {
		return this.enterpriseSubject;
	}

	updateUserState(data: Partial<IUserState>) {
		this.userSubject.next(makeUserState({...this.getUserState().value, ...data}));
	}

	getUserState(): BehaviorSubject<IUserState> {
		return this.userSubject;
	}

	findEnterprise(): Observable<boolean> {
		return this.findUserData();
	}

	findUser(): Observable<boolean> {
		return this.findUserData();
	}

	private findUserData(): Observable<boolean> {
		return this.getUserDataFull().pipe(
			map((res: IUserDataResponse | null) => {
				return !!res;
			}, () => {
				return false;
			})
		);
	}

	getSignablePageState(): BehaviorSubject<ISignablePageState> {
		return this.signablePageSubject;
	}

	updateSignablePagesState(data: Partial<ISignablePageState>) {
		this.signablePageSubject.next(makeSignablePageState({...this.getSignablePageState().value, ...data}));
	}

	adaptSignablePagesToState(pages: ISignablePage[]): ISignablePageState {
		const signablePagesState: ISignablePageState = makeSignablePageState({});
		pages.forEach((page) => {
			switch(page.name) {
				case SIGNABLE_PAGES.TERMS_AND_CONDITIONS:
					signablePagesState.termsAndConditions.signed = false;
					signablePagesState.termsAndConditions.data = page;
					break;
				case SIGNABLE_PAGES.WELCOME:
					signablePagesState.welcome.signed = false;
					signablePagesState.welcome.data = page;
					break;
			}
		});
		return signablePagesState;
	}

	getEnterprises(): Observable<boolean> {
		const state = this.getEnterpriseState().value;
		if (!state.searchedEnterprises && !state.isLoading) {
			return this.findEnterprise();
		} else {
			return of(true);
		}
	}

	getUserDataFull(): Observable<IUserDataResponse | null> {
		this.updateUserState({isLoading:true, hasUserErrors: false });
		this.updateEnterpriseState({isLoading:true});
		return this.getUserData().pipe(
			map((res: IProfileDataResponse) => {
				let returnValue = null;

				if (res.success && res.data.enterprises.length) {
					const enterprises = res.data.enterprises;
					enterprises.sort((enterpriseA, enterpriseB) => enterpriseA.name.localeCompare(enterpriseB.name));
					const user = this.setUserFormat(res.data.user);
					const enterpriseId: string = this.storage.getData('enterpriseId');
					const selectedEnterprise = enterprises.find(enterprise => enterprise.id === enterpriseId);
					this.updateEnterpriseState({
						enterprises,
						searchedEnterprises: true,
						enterpriseDefault: res.data.enterpriseDefault,
						selectedEnterprise: selectedEnterprise ? selectedEnterprise : makeEnterprise({}),
						isLoading: false,
					});
					const signablePagesState: ISignablePageState = this.adaptSignablePagesToState(res.data.pages);
					this.updateSignablePagesState(signablePagesState);
					this.updateUserState(
						{
							isLoading: false,
							user,
							searchedUser: true,
							hasUserErrors: false,
							pages: res.data.pages
						}
					);
					returnValue = res.data;
				} else {
					const error = {
						description: res.status[0].message,
						code: res.status[0].code
					};
					this.updateUserState(
						{
							isLoading: false,
							searchedUser: false,
							hasUserErrors: true,
						}
					);
					this.updateEnterpriseState({
						searchedEnterprises: false,
						isLoading: false,
						hasEnterpriseErrors: true
					});
					this.loginService.updateLoginState({ error });
					return null;
				}

				return returnValue;
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				const error = {
					description: errorResponse.error.status[0].message,
					code: errorResponse.error.status[0].code
				};
				this.updateUserState({
					isLoading: false,
					searchedUser: false,
					hasUserErrors: true,
				});
				this.updateEnterpriseState({
					searchedEnterprises: false,
					isLoading: false,
					hasEnterpriseErrors: true
				});
				this.loginService.updateLoginState({ error });
				return of(null);
			})
		);
	}

	setUserFormat(user: IUserResponse): IUserApp {
		return makeUserApp({
			id: user.id,
			username: user.username,
			document: {
				number: user.documentNumber,
				type: user.documentType
			},
			name: `${user.firstName} ${user.lastName}`.trim(),
			firstName: user.firstName,
			lastName: user.lastName,
			cellPhone: user.cellPhone,
			email: user.email
		});
	}

	setBFFUserFormat(user: IUserApp): IUserResponse {
		return makeUserResponse({
			id: user.id,
			username: user.username,
			documentNumber: user.document.number,
			documentType: user.document.type,
			firstName: user.firstName,
			lastName: user.lastName,
			cellPhone: user.cellPhone,
			email: user.email
		});
	}

	updateUserDetails(user: IUserApp, softToken: string): Observable<IProfileDataResponse> {
		return this.patchUserData(user, softToken);
	}

	updateEnterpriseDefault(enterpriseDefault: string): Observable<boolean> {
		return this.patchEnterpriseDefault(enterpriseDefault).pipe(
			map((isSuccess) => {
				if(isSuccess) {
					this.updateEnterpriseState({ enterpriseDefault });
				}
				return isSuccess;
			}),
			catchError(() => {
				return of(false);
			})
		);
	}

	patchEnterpriseDefault(enterpriseDefault: string): Observable<boolean>  {
		const user = this.setBFFUserFormat(this.getUserState().value.user);
		const data = {
			user,
			enterprises: this.getEnterpriseState().value.enterprises,
			enterpriseDefault,
		};
		delete data.user.username;
		return this.xhrService.patch(`v1/profiles/users/${user.id}`, {
			body: data,
			params: {
				isEnterpriseDefault: 'true',
			}
		}).pipe(
			map((response) => response as IApiResponseObject<{}>),
			map((response) => response.success ? response.success : false)
		);
	}

	getUserData(): Observable<IProfileDataResponse> {
		// TODO remover cuando este el token listo MER-2294
		return this.xhrService.get(`v1/profiles/users?userName=${this.storage.getData('tempUser')}`);
	}

	patchUserData(userApp: IUserApp, softToken: string): Observable<IProfileDataResponse> {
		const data = {
			user: this.setBFFUserFormat(userApp),
			enterprises: this.getEnterpriseState().value.enterprises,
			enterpriseDefault: this.getEnterpriseState().value.enterpriseDefault,
		};
		delete data.user.username;
		return this.xhrService.patch(`v1/profiles/users/${userApp.id}`, {
			body: data,
			headers: {
				softToken,
			},
		});
	}

	getNewSeed(code: string): Observable<ITokenGenerationResponse> {
		return this.dataService.get(`v1/softtoken/generate-seed/${this.storage.getData('tempUser')}`, {
			headers: {
				tokenToValidate: code
			}
		});
	}

	positiveValidationValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const isPositiveValidationValid = !this.getUserState().value.hasUserPositiveValidationErrors;
			return isPositiveValidationValid || control.value ? null : { positiveValidationError: {value: control.value}};
		}
	}

	setEnterprise(enterprise: IEnterprise) {
		this.updateEnterpriseState({ selectedEnterprise: enterprise });
		this.storage.setData('enterpriseId', enterprise.id);

		this.storage.setData('documentType', 'CUIT');
		this.storage.setData('documentNumber', enterprise.cuilt);
	}

	changeEnterprise(enterprise: IEnterprise) {
		this.router.navigate(['/app']).then(() => {
			this.setEnterprise(enterprise);
			this.eventService.emit('changeEnterprise');
			this.subscription.add(
				this.getPermissions().subscribe(isSuccess => {
					if (!isSuccess) {
						this.authService.logout();
					}
				})
			);
		});
	}

	getSoftTokenValidation(
		token: string,
		username: string,
		securityToken: string
	): Observable<ISoftTokenValidationResponse> {
		return this.dataService.get('v1/softtoken/users/validate', {
			headers: {
				tokenToValidate: securityToken
			},
			params: {
				token,
				username
			}
		});
	}

	generateNewSeed(code: string): Observable<boolean> {
		this.updateUserState({ loadingPositiveValidation: true, hasUserPositiveValidationErrors: false });
		return this.getNewSeed(code).pipe(
			map(response => {
				this.updateUserState({ loadingPositiveValidation: false, hasUserPositiveValidationErrors: false });
				return !!response.success;
			}),
			catchError(() => {
				this.updateUserState({ loadingPositiveValidation: false, hasUserPositiveValidationErrors: true });
				return of(false);
			})
		);
	}

	checkPositiveValidation(code: string): Observable<boolean> {
		this.updateUserState({ loadingPositiveValidation: true, hasUserPositiveValidationErrors: false, securityToken: '' });
		return this.submitPositiveValidation(code).pipe(
			map((res: IPositiveValidationResponse) => {
				this.updateUserState({ loadingPositiveValidation: false });
				if(res.success && res.data.token !== '') {
					this.updateUserState({ hasUserPositiveValidationErrors: false, securityToken: res.data.token });
					return true;
				}
				this.updateUserState({ hasUserPositiveValidationErrors: true });
				return false;
			}),
			catchError(() => {
				this.updateUserState({ loadingPositiveValidation: false, hasUserPositiveValidationErrors: true });
				return of(false);
			})
		)
	}

	submitPositiveValidation(code: string): Observable<IPositiveValidationResponse> {
		return this.xhrService.post('v1/positive-validation/validate-code', {
			body: {
				codeToValidate: code,
				document: {
					type: this.getUserState().value.user.document.type,
					number: this.getUserState().value.user.document.number
				}
			}
		});
	}

	updateSignablePageStateById(pageId: string) {
		const signablePageState: ISignablePageState = this.getSignablePageState().value;
		switch(pageId) {
			case signablePageState.termsAndConditions.data.pageId:
				this.updateSignablePagesState({
					...signablePageState,
					termsAndConditions: {
						...signablePageState.termsAndConditions,
						signed: true
					}
				});
				break;
			case signablePageState.welcome.data.pageId:
				this.updateSignablePagesState({
					...signablePageState,
					welcome: {
						...signablePageState.welcome,
						signed: true
					}
				});
				break;
		}
	}

	updateSignedPages(pageId: string, versionId: string, userId: string): Observable<boolean> {
		return this.signPage(pageId, versionId, userId).pipe(
			map((res: ISignPageResponse) => {
				this.updateSignablePageStateById(pageId);
				return !!res.success;
			})
		);
	}

	signPage(pageId: string, versionId: string, userId: string): Observable<ISignPageResponse> {
		return this.xhrService.post(`v1/profiles/users/sign/page/${pageId}/version/${versionId}`,{
			params: {
				userId
			}
		});
	}

	getPermissions(): Observable<boolean> {
		this.updateUserState({ permissions: [], loadingPermissions: true });
		return this.dataService.get('v1/profiles/users/permissions').pipe(
			map(response => response as IUserPermissionsResponse),
			map((response: IUserPermissionsResponse) => {
				if (response.success) {
					this.updateUserState({
						permissions: response.data,
						loadingPermissions: false,
						hasErrorsPermissions: false
					});
					return true;
				} else {
					this.handleGetPermissionsError(response);
					return false;
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				this.handleGetPermissionsError(errorResponse.error);
				return of(false);
			}),
		);
	}

	handleGetPermissionsError(response: IUserPermissionsResponse) {
		this.eventService.emit('getPermissionsFailed');
		this.updateUserState({
			loadingPermissions: false,
			hasErrorsPermissions: true
		});
		this.loginService.updateLoginState({
			error: { 
				code: response.status[0].code,
				description: response.status[0].message 
			},
		});
	}

	hasPermission(permission: string): boolean {
		return this.getUserState().value.permissions.includes(permission);
	}

	resetState() {
		this.updateEnterpriseState(makeEnterpriseState({}));
		this.updateUserState(makeUserState({}));
		this.updateSignablePagesState(makeSignablePageState({}))
	}

}
