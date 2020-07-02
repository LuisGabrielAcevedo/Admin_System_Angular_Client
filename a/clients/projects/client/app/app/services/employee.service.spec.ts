import { TestBed } from '@angular/core/testing';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { EmployeeService } from './employee.service';
import { makeEmployeeBFFResponse, makeEmployee, makeEmployeeResponse } from 'client/app/app/models/employee';
import { of } from 'rxjs';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { DataService } from '@mcy/core/services/data.service';
import { EventServiceMock } from './event.service.mock';
import { EventService } from './event.service';
import { UserServiceMock } from './user.service.mock';
import { UserService } from './user.service';

describe('EmployeeService', () => {
	let employeeService: EmployeeService;
	let dataService: DataService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EmployeeService,
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: UserService, useClass: UserServiceMock }
			]
		});
	});
	
	beforeEach(() => {
		employeeService = TestBed.get(EmployeeService);
		dataService = TestBed.get(DataService);
	});

	it('should be created', () => {
		expect(employeeService).toBeTruthy();
	});

	it('should get employees', () => {
		spyOn(employeeService, 'getEmployees').and.returnValue(of(makeEmployeeResponse({})));
		employeeService.findEmployees();
		expect(employeeService.getEmployees).toHaveBeenCalled();
	});

	it('should get employees and update the state on success', () => {
		spyOn(employeeService, 'getEmployees').and.returnValue(of(makeEmployeeResponse({})));
		spyOn(employeeService, 'updateEmployeeState');
		employeeService.findEmployees();
		expect(employeeService.updateEmployeeState).toHaveBeenCalled();
	});

	it('should unsubscribe when the service is destroyed', () => {
		spyOn(employeeService.subscription, 'unsubscribe');
		employeeService.ngOnDestroy();
		expect(employeeService.subscription.unsubscribe).toHaveBeenCalled();
	});

	// Agregar cuando el servicio este disponible
	xit('should get employees', () => {
		spyOn(dataService, 'get');
		employeeService.getEmployees();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should get the employee state', () => {
		const subject = employeeService.getEmployeesState();
		expect(employeeService.employeeSubject).toEqual(subject);
	});

	it('should update the state', () => {
		spyOn(employeeService.employeeSubject, 'next');
		employeeService.updateEmployeeState({});
		expect(employeeService.employeeSubject.next).toHaveBeenCalled();
	});

	it('should format the employeebff to employee', () => {
		const employee = employeeService.setEmployeesFormat([makeEmployeeBFFResponse({})])
		expect(employee).toEqual([makeEmployee({})]);
	});
});
