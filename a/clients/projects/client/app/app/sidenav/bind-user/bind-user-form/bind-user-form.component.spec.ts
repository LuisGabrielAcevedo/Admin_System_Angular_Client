import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { BindUserFormComponent } from './bind-user-form.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { EmployeeServiceMock } from 'client/app/app/services/employee.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { EmployeeService } from 'client/app/app/services/employee.service';
import { 
	makeEmployeeObjectResponse, 
	IEmployeeObjectResponse,
	makeEmployeeBFFResponse
 } from 'client/app/app/models/employee';
import { Observable, of } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('BindUserFormComponent', () => {
	let component: BindUserFormComponent;
	let fixture: ComponentFixture<BindUserFormComponent>;
	let sidenavService: SidenavService;
	let employeeService: EmployeeService;

	const employee: Observable<IEmployeeObjectResponse> = of(makeEmployeeObjectResponse({}));

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ BindUserFormComponent ],
			imports: [
				TranslateModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: EmployeeService, useClass: EmployeeServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BindUserFormComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService); 
		employeeService = TestBed.get(EmployeeService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should send user information and get a created employee', () => {
		spyOn(employeeService, 'postUserData').and.returnValue(employee)
		spyOn(employeeService, 'addEmployee');
		component.startContinueProcess();
		expect(employeeService.postUserData).toHaveBeenCalled()
	})

	it('should go to next step on sideNav', () => {
		spyOn(sidenavService, 'nextStep');
		component.continue(makeEmployeeBFFResponse({}));
		expect(sidenavService.nextStep).toHaveBeenCalled();
	})

	it('should close the sidenav panel', () => {
		spyOn(sidenavService, 'preClose');
		component.cancel();
		expect(sidenavService.preClose).toHaveBeenCalled();
	})


});
