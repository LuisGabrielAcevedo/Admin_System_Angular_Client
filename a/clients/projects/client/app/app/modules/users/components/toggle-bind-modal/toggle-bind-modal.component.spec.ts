import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleBindModalComponent } from './toggle-bind-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { makeToggleBindModal } from 'client/app/app/models';
import { EmployeeService } from 'client/app/app/services/employee.service';
import { EmployeeServiceMock } from 'client/app/app/services/employee.service.mock';
import { of } from 'rxjs';

describe('ToggleBindModalComponent', () => {
	let component: ToggleBindModalComponent;
	let fixture: ComponentFixture<ToggleBindModalComponent>;
	let employeeService: EmployeeService;
	let translateService: TranslateService;
	const dialogMock = {
		close: () => {}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ToggleBindModalComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: MAT_DIALOG_DATA, useValue: makeToggleBindModal({}) },
				{ provide: EmployeeService, useClass: EmployeeServiceMock }
			]
		})
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToggleBindModalComponent);
		component = fixture.componentInstance;
		employeeService = TestBed.get(EmployeeService);
		translateService = TestBed.get(TranslateService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call onConfirm when handling onConfirm event', async () => {
		spyOn(employeeService, 'updateEmployee').and.returnValue(of(true));
		spyOn(component.dialogRef, 'close');
		spyOn(component.data, 'onConfirm');
		spyOn(component, 'makeToastMessage')
		component.onConfirm();
		expect(employeeService.updateEmployee).toHaveBeenCalled();
		expect(component.makeToastMessage).toHaveBeenCalled();
		expect(component.data.onConfirm).toHaveBeenCalled();
		expect(component.dialogRef.close).toHaveBeenCalled();
	});

	it('should call onConfirm when handling onConfirm event with error', async () => {
		component.data.employee.linkedState = 'INACTIVO';
		spyOn(employeeService, 'updateEmployee').and.returnValue(of(false));
		component.onConfirm();
		expect(employeeService.updateEmployee).toHaveBeenCalled();
	});

	it('should make the success mesage to bind', () => {
		spyOn(translateService, 'instant');
		component.makeToastMessage();
		expect(translateService.instant).toHaveBeenCalled();
	});

	it('should make the success mesage to unbind', () => {
		spyOn(translateService, 'instant');
		component.makeToastMessage();
		expect(translateService.instant).toHaveBeenCalled();
	});

	it('should call onCancel when handling onCancel event', () => {
		spyOn(component.dialogRef, 'close');
		spyOn(component.data, 'onCancel');
		component.onCancel();
		expect(component.data.onCancel).toHaveBeenCalled();
		expect(component.dialogRef.close).toHaveBeenCalled();
	});
});
