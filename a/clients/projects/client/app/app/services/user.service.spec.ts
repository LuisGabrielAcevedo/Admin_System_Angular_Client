import { TestBed, async } from '@angular/core/testing';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { EnterpriseResolver } from 'client/app/app/services/enterprise.resolver';
import { EnterpriseResolverMock } from 'client/app/app/services/enterprise.resolver.mock';
import { UserService } from 'client/app/app/services/user.service';
import {
	makeUserState,
	makeProfileDataResponse,
	makeUserResponse,
	makeUserApp,
	IUserApp,
	makeSignablePageState,
	ISignablePageState,
	makeSignPageResponse,
	IProfileDataResponse,
	makeSignablePage
} from 'client/app/app/models/user';
import { makeEnterpriseState, makeEnterprise } from 'client/app/app/models/enterprise';
import { of, BehaviorSubject } from 'rxjs';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { DataService } from '@mcy/core/services/data.service';
import { LoginServiceMock } from 'client/app/login/services/login.service.mock';
import { LoginService } from 'client/app/login/services/login.service';
import { AuthService } from './auth.service';
import { AuthServiceMock } from './auth.service.mock';

describe('UserService', () => {
	let userService: UserService;
	let dataService: XHRService;
	let router: Router;
	let eventService: EventService;
	const pageId = '';
	const versionId = '';
	const userId = '';

	const profileDataResponseMock: IProfileDataResponse = makeProfileDataResponse({
		success: true
	});

	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [
				CoreModule,
				RouterTestingModule
			],
			providers: [
				UserService,
				{ provide: XHRService, useClass: XHRServiceMock },
				{ provide: EnterpriseResolver, useClass: EnterpriseResolverMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: LoginService, useClass: LoginServiceMock },
				{ provide: AuthService, useClass: AuthServiceMock }
			]
		}).compileComponents()
	);

	beforeEach(() => {
		userService = TestBed.get(UserService);
		dataService = TestBed.get(XHRService);
		eventService = TestBed.get(EventService);
		router = TestBed.get(Router);
	});

	it('should be created', () => {
		expect(dataService).toBeTruthy();
	});

	it('should get user data', async(() => {
		spyOn(dataService, 'get');
		userService.getUserData();
		expect(dataService.get).toHaveBeenCalledWith('v1/profiles/users?userName=undefined');
	}));

	it('should get user state', async(() => {
		const userData = userService.getUserState();
		expect(userData).toBeTruthy();
	}));

	it('should get enterprise state', async(() => {
		const enterpriseState = userService.getEnterpriseState();
		expect(enterpriseState).toBeTruthy();
	}));

	it('should update the enterprise State', async(() => {
		spyOn(userService.enterpriseSubject, 'next');
		userService.updateEnterpriseState(makeEnterpriseState({}));
		expect(userService.enterpriseSubject.next).toHaveBeenCalled();
	}));

	it('should update the user State', async(() => {
		spyOn(userService.userSubject, 'next');
		userService.updateUserState(makeUserState({}));
		expect(userService.userSubject.next).toHaveBeenCalled();
	}));

	it('should get the user and enterprise empty', () => {
		spyOn(userService, 'getUserData').and.returnValue(of(profileDataResponseMock));
		spyOn(userService, 'updateEnterpriseState');
		spyOn(userService, 'updateSignablePagesState');
		userService.getUserDataFull();
		expect(userService.getUserData).toHaveBeenCalled();
		expect(userService.updateEnterpriseState).toHaveBeenCalled();
	});

	xit('should update the signable pages state if get users call is success', () => {
		spyOn(userService, 'getUserData').and.returnValue(of(makeProfileDataResponse({})));
		spyOn(userService, 'updateEnterpriseState');
		spyOn(userService, 'updateSignablePagesState');
		userService.getUserDataFull().subscribe(() => {
			expect(userService.adaptSignablePagesToState).toHaveBeenCalledBefore(
				userService.updateSignablePagesState
			);
			expect(userService.updateSignablePagesState).toHaveBeenCalled();
		});
	});

	it('should sign the current page', () => {
		const state = new BehaviorSubject<ISignablePageState>(makeSignablePageState({}));
		spyOn(userService, 'signPage').and.returnValue(of(makeSignPageResponse({})));
		spyOn(userService, 'getSignablePageState').and.returnValue(state);
		spyOn(userService, 'updateSignablePagesState');
		userService.updateSignedPages(pageId, versionId, userId);
		expect(userService.signPage).toHaveBeenCalledWith(pageId, versionId, userId);
	});

	it('should update the signable pages state on signing the page successfully ', () => {
		spyOn(userService, 'signPage').and.returnValue(of(makeSignPageResponse({})));
		spyOn(userService, 'updateSignablePageStateById');
		userService.updateSignedPages(pageId, versionId, userId).subscribe(() => {
			expect(userService.updateSignablePageStateById).toHaveBeenCalledWith(pageId);
		});
	});

	it('should update the page state of welcome', () => {
		const id: string = '1';
		const state = new BehaviorSubject<ISignablePageState>(makeSignablePageState({
			welcome: {
				signed: false,
				data: makeSignablePage({
					pageId: id
				})
			}
		}));
		spyOn(userService, 'getSignablePageState').and.returnValue(state);
		spyOn(userService, 'updateSignablePagesState');
		userService.updateSignablePageStateById(id);
		expect(userService.updateSignablePagesState).toHaveBeenCalledWith({
			...state.value,
			welcome: {
				...state.value.welcome,
				signed: true
			}
		});
	});

	it('should update the page state of terms and conditions', () => {
		const id: string = '1';
		const state = new BehaviorSubject<ISignablePageState>(makeSignablePageState({
			termsAndConditions: {
				signed: false,
				data: makeSignablePage({
					pageId: id
				})
			}
		}));
		spyOn(userService, 'getSignablePageState').and.returnValue(state);
		spyOn(userService, 'updateSignablePagesState');
		userService.updateSignablePageStateById(id);
		expect(userService.updateSignablePagesState).toHaveBeenCalledWith({
			...state.value,
			termsAndConditions: {
				...state.value.termsAndConditions,
				signed: true
			}
		});
	});

	it('should get the user and enterprise data', async(() => {
		const data = userService.setUserFormat(makeUserResponse({}));
		expect(data).toEqual(makeUserApp({ lastEntry: data.lastEntry }));
	}));

	it('#setBFFUserFormat should return a user with the BFF format', () => {
		const user: IUserApp = makeUserApp({});
		const bffuser = userService.setBFFUserFormat(user);
		expect(bffuser).toEqual(makeUserResponse({}))
	});

	it('should handle changing enteprises', async(() => {
		const routerPromise = of(true).toPromise();
		spyOn(router, 'navigate').and.returnValue(routerPromise);
		spyOn(userService, 'updateEnterpriseState');
		spyOn(eventService, 'emit');

		userService.changeEnterprise(makeEnterprise({}));

		routerPromise.then(() => {
			expect(router.navigate).toHaveBeenCalled();
			expect(userService.updateEnterpriseState).toHaveBeenCalled();
			expect(eventService.emit).toHaveBeenCalled();
		});
	}));


});
