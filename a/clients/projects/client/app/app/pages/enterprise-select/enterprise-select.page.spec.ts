import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseSelectPage } from './enterprise-select.page';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { AuthService } from 'client/app/app/services/auth.service';
import { AuthServiceMock } from 'client/app/app/services/auth.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { makeUserState } from 'client/app/app/models/user';
import { IEnterprise, makeEnterprise } from 'client/app/app/models';

describe('EnterpriseSelectPage', () => {
	let component: EnterpriseSelectPage;
	let fixture: ComponentFixture<EnterpriseSelectPage>;
	let router: Router;
	let authService: AuthService;
	let userService: UserService;
	let storage: StorageService;
	const enterprise: IEnterprise = makeEnterprise({});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EnterpriseSelectPage ],
			imports: [
				HttpClientModule,
				RouterTestingModule,
				CoreModule.forRoot(),
				BrowserAnimationsModule,
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: AuthService, useClass: AuthServiceMock }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EnterpriseSelectPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
		router = TestBed.get(Router);
		authService = TestBed.get(AuthService);
		userService = TestBed.get(UserService);
		storage = TestBed.get(StorageService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should find user data', () => {
		spyOn(userService, 'getUserState').and.returnValue(new BehaviorSubject(makeUserState({ searchedUser: false })))
		spyOn(userService, 'findUser');
		component.ngOnInit();
		expect(userService.findUser).toHaveBeenCalled();
		expect(userService.getUserState).toHaveBeenCalled();
	});

	it('should not find user data', () => {
		spyOn(userService, 'getUserState').and.returnValue(new BehaviorSubject(makeUserState({ searchedUser: true })));
		spyOn(userService, 'findUser');
		component.ngOnInit();
		expect(userService.findUser).not.toHaveBeenCalled();
		expect(userService.getUserState).toHaveBeenCalled();
	});

	it('should go to the dashboard', async(() => {
		spyOn(router, 'navigateByUrl');
		component.goToDashboard(enterprise);
		expect(router.navigateByUrl).toHaveBeenCalledWith('app/dashboard');
	}));

	it('should update the user data', async(() => {
		spyOn(storage, 'getData');
		spyOn(userService, 'updateUserState');
		component.updateUserState();
		expect(storage.getData).toHaveBeenCalledWith('lastEntry');
		expect(userService.updateUserState).toHaveBeenCalled();
	}));

	it('should go to the login page', async(() => {
		spyOn(authService, 'logout');
		component.logout();
		expect(authService.logout).toHaveBeenCalled();
	}));
});
