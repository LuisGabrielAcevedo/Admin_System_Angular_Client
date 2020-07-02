import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { makeSalaryPaymentCancelModal } from 'client/app/app/models/modal';
import { TranslateModule } from '@ngx-translate/core';
import { UncoverComponent } from './uncover-modal.component';

describe('UncoverComponent', () => {
	let component: UncoverComponent;
	let fixture: ComponentFixture<UncoverComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UncoverComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: makeSalaryPaymentCancelModal({})}
			],
			imports: [TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UncoverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
