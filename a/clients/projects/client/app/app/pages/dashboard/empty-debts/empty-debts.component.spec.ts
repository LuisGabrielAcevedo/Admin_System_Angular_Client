import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EmptyDebtsComponent } from './empty-debts.component';

describe('EmptyDebtsComponent', () => {
	let component: EmptyDebtsComponent;
	let fixture: ComponentFixture<EmptyDebtsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EmptyDebtsComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmptyDebtsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
