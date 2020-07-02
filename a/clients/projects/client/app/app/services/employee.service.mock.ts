import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { 
	IEmployeesState, makeEmployeesState, 
	IEmployeeResponse, IEmployee, 
	IEmployeeBFF, makeEmployee, 
	makeEmployeeObjectResponse, IEmployeeObjectResponse
} from 'client/app/app/models/employee';

@Injectable()
export class EmployeeServiceMock implements OnDestroy {
	private subject = new BehaviorSubject<IEmployeesState>(makeEmployeesState({}));

	ngOnDestroy(): void {}

	getEmployeesState(): BehaviorSubject<IEmployeesState> {
		return this.subject;
	}

	findEmployees(): void {}

	updateEmployeeState(_data: Partial<IEmployeesState>) { }

	getEmployees(): Observable<IEmployeeResponse> {
		return new Observable();
	}

	setEmployeesFormat(_employees: IEmployeeBFF[]): IEmployee[] {
		return [makeEmployee({})];
	}

	updateEmployee(_employee: IEmployee): Observable<boolean> {
		return new Observable();
	}

	postUserData(_employee: IEmployeeBFF): Observable<IEmployeeObjectResponse> {
		return of(makeEmployeeObjectResponse({}))
	}

	addEmployee() : void {}
}
