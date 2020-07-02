import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryPaymentCancelComponent } from './salary-payment-cancel.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
	makeSalaryPaymentCancelModal,
	ISalaryPaymentCancelModal
} from 'client/app/app/models/modal';
import { TranslateModule } from '@ngx-translate/core';

describe('SalaryPaymentCancelComponent', () => {
	let component: SalaryPaymentCancelComponent;
	let fixture: ComponentFixture<SalaryPaymentCancelComponent>;
	let data: ISalaryPaymentCancelModal;
	let dialogRef: MatDialogRef<SalaryPaymentCancelComponent>;

	const dialogMock = {
		close: () => {}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryPaymentCancelComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: MAT_DIALOG_DATA, useValue: makeSalaryPaymentCancelModal({}) }
			],
			imports: [TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentCancelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		data = TestBed.get(MAT_DIALOG_DATA);
		dialogRef = TestBed.get(MatDialogRef);
	});

	it('should call data.onCancel and dialogRef.close', () => {
		spyOn(data, 'onCancel');
		spyOn(dialogRef, 'close');
		component.onCancel();
		expect(data.onCancel).toHaveBeenCalled();
		expect(dialogRef.close).toHaveBeenCalled();
	});

	it('should call data.onConfirm and dialogRef.close', () => {
		spyOn(data, 'onConfirm');
		spyOn(dialogRef, 'close');
		component.onConfirm();
		expect(data.onConfirm).toHaveBeenCalled();
		expect(dialogRef.close).toHaveBeenCalled();
	});
});
