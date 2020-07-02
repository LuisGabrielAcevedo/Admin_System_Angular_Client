import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, of } from 'rxjs';
import {
	IEmployeesState,
	makeEmployeesState,
	IEmployeeResponse,
	IEmployee,
	IEmployeeBFF,
	adaptEmployee,
	IEmployeeObjectResponse,
	adaptEmployeeBFF
} from 'client/app/app/models/employee';
import { DataService } from '@mcy/core/services/data.service';
import { map, catchError } from 'rxjs/operators';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { USER_PERMISSIONS, ROLES } from 'client/app/app/constants';
import { UserService } from './user.service';

@Injectable()
export class EmployeeService extends StatefulService implements OnDestroy {
	public employeeSubject = new BehaviorSubject<IEmployeesState>(makeEmployeesState({}));
	public subscription: Subscription;

	constructor(
		private dataService: DataService,
		eventService: EventService,
		private userService: UserService
	) {
		super(eventService);
		this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getEmployeesState(): BehaviorSubject<IEmployeesState> {
		return this.employeeSubject;
	}

	findEmployees(): void {
		this.updateEmployeeState({ loading: true });
		this.subscription.add(
			this.getEmployees().subscribe((res: IEmployeeResponse) => {
				if(res.success && res.data.length) {
					const employees = res.data.filter(
						(employee) => this.hasAdminPermission ? true : employee.role !== ROLES.ADMIN && employee.role !== ROLES.SUPERADMIN
					);
					this.updateEmployeeState({
						employees: this.setEmployeesFormat(employees),
						searchedEmployee: true,
						loading: false,
						hasErrors: false,
					});
				} else {
					this.updateEmployeeState({
						loading: false,
						hasErrors: true,
					});
				}
			},
			() => {
				this.updateEmployeeState({
					loading: false,
					hasErrors: true,
				});
			})
		)
	}

	updateEmployeeState(data: Partial<IEmployeesState>) {
		this.employeeSubject.next(makeEmployeesState({...this.getEmployeesState().value, ...data}));
	}

	resetState() {
		this.updateEmployeeState(makeEmployeesState({}));
	}

	getEmployees(): Observable<IEmployeeResponse> {
		return this.dataService.get(`v1/users-management/usermanagement`);
	}

	setEmployeesFormat(employees: IEmployeeBFF[]): IEmployee[] {
		const employeesFormatted: IEmployee[] = employees.map((employee: IEmployeeBFF) => {
			return adaptEmployeeBFF(employee)
		});
		return employeesFormatted;
	}

	updateEmployee(employee: IEmployee): Observable<boolean> {
		this.updateEmployeeState({ loadingUpdateEmployee: true });
		return this.patchUserData(employee).pipe(
			map((res: IEmployeeObjectResponse) => {
				if (res.success) {
					this.updateEmployeeState({ loadingUpdateEmployee: false });
					this.findEmployees();
					return true;
				} else {
					this.updateEmployeeState({ loadingUpdateEmployee: false });
					return false;
				}
			}),
			catchError(() => {
				this.updateEmployeeState({ loadingUpdateEmployee: false });
				return of(false);
			})
		);
	}

	patchUserData(employee: IEmployee): Observable<IEmployeeObjectResponse> {
		const adaptedEmployee = adaptEmployee(employee);
		delete adaptedEmployee.id;
		return this.dataService.patch(`v1/users-management/usermanagement/${employee.user.id}`, { body: adaptedEmployee });
	}

	postUserData(employee: IEmployeeBFF): Observable<IEmployeeObjectResponse> {
		delete employee.id;
		delete employee.phone;
		delete employee.username;
		return this.dataService.post(`v1/users-management/usermanagement`, { body: employee })
	}

	addEmployee(user: IEmployeeBFF ) {
		const state: IEmployeesState = this.getEmployeesState().value;
		state.employees = [...state.employees, adaptEmployeeBFF(user)];
		this.updateEmployeeState(state);
	}

	get hasAdminPermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.ADMIN)
	}
}
