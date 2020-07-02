import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TransferTypeComponent } from './transfer-type.component';

describe('TransferTypeComponent', () => {
	let component: TransferTypeComponent;
	let fixture: ComponentFixture<TransferTypeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TransferTypeComponent],
			imports: [ReactiveFormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TransferTypeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
