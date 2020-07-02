import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
	let component: IconButtonComponent;
	let fixture: ComponentFixture<IconButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ IconButtonComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IconButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
