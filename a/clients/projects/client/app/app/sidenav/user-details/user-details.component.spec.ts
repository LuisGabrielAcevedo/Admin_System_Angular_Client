import { UserDetailsComponent } from './user-details.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { makeUserState, IProfileDataResponse, makeUserDataResponse } from 'client/app/app/models/user';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { SoftTokenServiceMock } from 'client/app/app/services/soft-token.service.mock';

describe('UserDetailsComponent', () => {
	let component: UserDetailsComponent;
	let fixture: ComponentFixture<UserDetailsComponent>;
	let sidenavService: SidenavService;
	let userService: UserService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserDetailsComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: SoftTokenService, useClass: SoftTokenServiceMock }
			]
		}).compileComponents();
	}));

	const profileResponse: IProfileDataResponse = {
		data: makeUserDataResponse({}),
		success: true,
		status: [],
	}

	beforeEach(() => {
		fixture = TestBed.createComponent(UserDetailsComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		userService = TestBed.get(UserService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#ngOnDestroy should unsubscribe on component destroy', () => {
		spyOn(component.subscription, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('#onEditClick should set is editing to true', () => {
		component.onEditClick();
		expect(component.isEditing).toBe(true);
	});

	it('#closeSidenav should call close from sidenavService', () => {
		spyOn(sidenavService, 'close');
		component.closeSidenav();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('#onCloseEditClick should set is editing to false', () => {
		component.onCloseEditClick();
		expect(component.isEditing).toBe(false);
	});

	it('#onSubmitToken should format the user data to bff format', () => {
		spyOn(userService, 'updateUserDetails').and.returnValue(new Observable());
		component.onSubmitToken('123456');
		expect(userService.updateUserDetails).toHaveBeenCalled();
	});

	it('#onSubmitToken should update the user', () => {
		spyOn(userService, 'updateUserDetails').and.returnValue(of(profileResponse));
		component.onSubmitToken('123456');
		expect(userService.updateUserDetails).toHaveBeenCalled();
	});

	it('#onSubmitToken should open the user details sidenav if it is success', async(() => {
		spyOn(userService, 'updateUserDetails').and.returnValue(of(profileResponse));
		spyOn(userService, 'updateUserState');
		component.onSubmitToken('123456').subscribe(() => {
			expect(userService.updateUserDetails).toHaveBeenCalled();
			expect(userService.updateUserState).toHaveBeenCalled();
		});
	}));

	it('#onSubmitToken should update the user state if it is success', async(() => {
		spyOn(userService, 'updateUserDetails').and.returnValue(of(profileResponse));
		component.onSubmitToken('123456').subscribe(() => {
			expect(userService.updateUserDetails).toHaveBeenCalled();
		});
	}));

	it('#openUserDetails should open user details', async(() => {
		spyOn(userService, 'getUserState').and.returnValue(new BehaviorSubject(makeUserState({})));
		spyOn(sidenavService, 'open');
		component.openUserDetails();
		expect(userService.getUserState).toHaveBeenCalled();
		expect(sidenavService.open).toHaveBeenCalled();
	}));

	it('#onSaveClick should set is editing to false', () => {
		component.onSaveClick();
		expect(component.isEditing).toBe(false);
	});

	it('#onSaveClick should open the sidenav', () => {
		spyOn(sidenavService, 'nextStep');
		component.onSaveClick();
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});
});
