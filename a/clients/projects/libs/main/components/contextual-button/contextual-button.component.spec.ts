import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextualButtonComponent } from './contextual-button.component';

describe('ContextualButtonComponent', () => {
	let component: ContextualButtonComponent;
	let fixture: ComponentFixture<ContextualButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ContextualButtonComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContextualButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
