import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
import { LandingPage } from './landing.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { EmployeeService } from 'client/app/app/services/employee.service';
import { EmployeeServiceMock } from 'client/app/app/services/employee.service.mock';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { makeEmployeesState, IEmployeesState, makeEmployee, IEmployee } from 'client/app/app/models/employee';
import { MatButtonToggleChange, MatButtonToggle, MatButtonToggleGroup } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { Platform } from '@angular/cdk/platform';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('LandingPage', () => {
	let component: LandingPage;
	let fixture: ComponentFixture<LandingPage>;
	let employeeService: EmployeeService;
	let sidenavService: SidenavService;
	let translateService: TranslateService;

	const employeeStateWithEmployees: IEmployeesState = makeEmployeesState({
		employees: [makeEmployee({})]
	});
	const employeeState: IEmployeesState = makeEmployeesState({});
	const employeeSubject = new BehaviorSubject<IEmployeesState>(makeEmployeesState({}));
	const changeDetectorRefMock: ChangeDetectorRef = {
		detectChanges: () => {},
		markForCheck: () => {},
		detach: () => {},
		checkNoChanges: () => {},
		reattach: () => {}
	};
	const elementRefMock: ElementRef = {nativeElement: ''};
	const focusMonitor: FocusMonitor = new FocusMonitor(new NgZone({enableLongStackTrace: true}), new Platform());
	let eventMock: MatButtonToggleChange;
	const buttonToggleGroup: MatButtonToggleGroup = new MatButtonToggleGroup(changeDetectorRefMock);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				CoreModule.forRoot(),
			],
			providers: [
				{ provide: EmployeeService, useClass: EmployeeServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: UserService, useClass: UserServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LandingPage);
		component = fixture.componentInstance;
		employeeService = TestBed.get(EmployeeService);
		sidenavService = TestBed.get(SidenavService);
		translateService = TestBed.get(TranslateService);
		fixture.detectChanges();
		eventMock = {
			source: new MatButtonToggle(
				buttonToggleGroup,
				changeDetectorRefMock,
				elementRefMock,
				focusMonitor,
				''
			),
			value: ''
		}
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should add a subscription on getEmployeeState call', () => {
		spyOn(component.subscription, 'add');
		component.ngOnInit();
		expect(component.subscription.add).toHaveBeenCalled();
	});

	it('should get the employees state when initializing', () => {
		spyOn(employeeService, 'getEmployeesState').and.returnValue(employeeSubject);
		spyOn(employeeService, 'findEmployees');
		component.ngOnInit();
		expect(employeeService.getEmployeesState).toHaveBeenCalled();
	});

	it('should set the state in the component when initializing', () => {
		spyOn(employeeService, 'getEmployeesState').and.returnValue(employeeSubject);
		spyOn(employeeService, 'findEmployees');
		component.ngOnInit();
		expect(component.employeeState).toEqual(employeeState);
	});

	it('should set isUsersListEmpty to true if the employees" array length is zero or less', () => {
		spyOn(employeeService, 'getEmployeesState').and.returnValue(employeeSubject);
		component.ngOnInit();
		expect(component.isUsersListEmpty).toBeTruthy();
	});

	it('should set isUsersListEmpty to true if the employees" array length is zero or less', () => {
		const employeeSubjectWithEmployees = new BehaviorSubject<IEmployeesState>(employeeStateWithEmployees);
		spyOn(employeeService, 'getEmployeesState').and.returnValue(employeeSubjectWithEmployees);
		component.ngOnInit();
		expect(component.isUsersListEmpty).toBeFalsy();
	});

	it('should find employees if these have not been searched', () => {
		employeeStateWithEmployees.searchedEmployee = false;
		employeeStateWithEmployees.loading = false;
		const employeeSubjectWithEmployees = new BehaviorSubject<IEmployeesState>(makeEmployeesState({
			searchedEmployee: false,
			loading: false,
			employees: [makeEmployee({})],
		}));
		spyOn(employeeService, 'getEmployeesState').and.returnValue(employeeSubjectWithEmployees);
		spyOn(employeeService, 'findEmployees');
		component.ngOnInit();
		expect(employeeService.findEmployees).toHaveBeenCalled();
	});

	it('should not find employees if the employees have been searched', () => {
		employeeStateWithEmployees.searchedEmployee = true;
		employeeStateWithEmployees.loading = true;
		const employeeSubjectWithEmployees = new BehaviorSubject<IEmployeesState>(makeEmployeesState({
			searchedEmployee: true,
			loading: true,
			employees: [],
		}));
		spyOn(employeeService, 'getEmployeesState').and.returnValue(employeeSubjectWithEmployees);
		spyOn(employeeService, 'findEmployees');
		component.ngOnInit();
		expect(employeeService.findEmployees).not.toHaveBeenCalled();
	});

	it('should set the items displayed as the sum between the items displayed and the constraint', () => {
		component.showMoreUsers();
		expect(component.itemsDisplayed)
			.toBe(
				(component.itemsDisplayed - component.itemsPaginatorLength)
				+ component.itemsPaginatorLength
			);
	});

	it('should open sideNav', () => {
		spyOn(sidenavService, 'open');
		component.bindUser();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should add a subscription on changeEmployeeRole call', () => {
		const employee: IEmployee = makeEmployee({})
		spyOn(component.subscription, 'add');
		spyOn(component, 'updateToggleGroupState');
		spyOn(employeeService, 'updateEmployee').and.returnValue(new Observable());

		component.onButtonToggleChange(eventMock, employee);

		expect(component.subscription.add).toHaveBeenCalled();
	});

	it('should call updateToggleGroupState before changing the user role with the actual employee', () => {
		const employee: IEmployee = makeEmployee({})
		spyOn(component.subscription, 'add');
		spyOn(component, 'updateToggleGroupState');
		spyOn(employeeService, 'updateEmployee').and.returnValue(new Observable());

		component.onButtonToggleChange(eventMock, employee);

		expect(component.updateToggleGroupState).toHaveBeenCalledBefore(employeeService.updateEmployee);
		expect(component.updateToggleGroupState).toHaveBeenCalledWith(buttonToggleGroup, employee);
	});

	it('should call changeEmployeeRole if role the to be changed is not the same as the existing role', () => {
		const employee: IEmployee = makeEmployee({
			role: 'CONSULTOR'
		});
		spyOn(component.subscription, 'add');
		spyOn(component, 'updateToggleGroupState');
		spyOn(employeeService, 'updateEmployee').and.returnValue(new Observable());

		component.onButtonToggleChange(eventMock, employee);

		expect(employeeService.updateEmployee).toHaveBeenCalled();
	});

	it('should NOT call changeEmployeeRole if the role to be changed is the same as the existing role', () => {
		const employee: IEmployee = makeEmployee({
			role: 'CONSULTOR'
		});
		spyOn(component.subscription, 'add');
		spyOn(component, 'updateToggleGroupState');
		spyOn(employeeService, 'updateEmployee').and.returnValue(new Observable());
		eventMock.value = 'CONSULTOR';
		component.onButtonToggleChange(eventMock, employee);

		expect(employeeService.updateEmployee).not.toHaveBeenCalled();
	});

	it('should call updateToggleGroupState with the modified employee after changeEmployeeRole call, on success', () => {
		const employee: IEmployee = makeEmployee({
			role: 'CONSULTOR'
		});
		const modifiedEmployee: IEmployee = makeEmployee({
			role: 'OPERADOR'
		});
		eventMock.value = 'OPERADOR';
		spyOn(component.subscription, 'add');
		spyOn(component, 'updateToggleGroupState');
		spyOn(employeeService, 'updateEmployee').and.returnValue(of(true));

		component.onButtonToggleChange(eventMock, employee);

		expect(component.updateToggleGroupState).toHaveBeenCalledTimes(2);
		expect(component.updateToggleGroupState).toHaveBeenCalledWith(buttonToggleGroup, modifiedEmployee);
	});

	it('should call updateToggleGroupState with the unmodified employee after changeEmployeeRole call, on error', () => {
		const employee: IEmployee = makeEmployee({
			role: 'CONSULTOR'
		});
		spyOn(component.subscription, 'add');
		spyOn(component, 'updateToggleGroupState');
		spyOn(employeeService, 'updateEmployee').and.returnValue(throwError({}));

		component.onButtonToggleChange(eventMock, employee);

		expect(component.updateToggleGroupState).toHaveBeenCalledWith(buttonToggleGroup, employee);
	});

	it('should make a toast message', () => {
		const employeeName = 'Alejandro';
		const role = 'OPERADOR';
		spyOn(translateService, 'instant').and.returnValue('');
		component.makeToastMessage(employeeName, role);
		expect(translateService.instant).toHaveBeenCalled();
	});
});
