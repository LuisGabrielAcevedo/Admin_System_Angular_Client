import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { AuthService } from 'client/app/app/services/auth.service';
import { AuthServiceMock } from 'client/app/app/services/auth.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { makeEnterprise } from 'client/app/app/models';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let authService: AuthService;
	let sidenavService: SidenavService;
	let utilsService: UtilsService;
	let router: Router;
	let userService: UserService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HeaderComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: AuthService, useClass: AuthServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock }
			],
			imports: [
				TranslateModule.forRoot(),
				MatMenuModule,
				RouterTestingModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		authService = TestBed.get(AuthService);
		sidenavService = TestBed.get(SidenavService);
		utilsService = TestBed.get(UtilsService);
		router = TestBed.get(Router);
		userService = TestBed.get(UserService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#onOpenUserMenu should set isUserProfileSelected to true', () => {
		component.onOpenUserMenu();
		expect(component.isUserProfileSelected).toBeTruthy();
	});

	it('#onCloseUserMenu should set isUserProfileSelected to true', () => {
		component.onCloseUserMenu();
		expect(component.isUserProfileSelected).toBeFalsy();
	});

	it('#logout should call auth service', () => {
		spyOn(authService, 'logout');
		component.logout();
		expect(authService.logout).toHaveBeenCalled();
	});

	it('#openUserDetails should open the sidenav', () => {
		spyOn(sidenavService, 'open');
		component.openUserDetails();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('#lastEntry should call utils Service to format the date passing the date from the user state as parameter', () => {
		const date = new Date();
		component.userState.user.lastEntry = date;
		spyOn(utilsService, 'formatDate').and.returnValue('');
		const result = component.lastEntry;
		expect(utilsService.formatDate).toHaveBeenCalledWith(date, true);
		expect(result).toBeDefined();
	});

	it('should navigate on UsersClick', () => {
		spyOn(router, 'navigate');
		component.onUsersClick();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should open enterprise details sidenav', () => {
		spyOn(sidenavService, 'open');
		component.onViewEnterpriseDetails();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should open all enterprises sidenav', () => {
		spyOn(sidenavService, 'open');
		component.onViewAllEnterprises();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should call userService on onOtherEnterpriseClick', () => {
		spyOn(userService, 'changeEnterprise');
		component.onOtherEnterpriseClick(makeEnterprise({}));
		expect(userService.changeEnterprise).toHaveBeenCalled();
	});
});
