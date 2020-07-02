import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EmptyDataComponent } from './empty-data.component';

describe('EmptyDataComponent', () => {
	let component: EmptyDataComponent;
	let fixture: ComponentFixture<EmptyDataComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EmptyDataComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmptyDataComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
