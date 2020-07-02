import { PrimaryPageLayout } from './primary-page.layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PrimaryPageLayout', () => {
	let component: PrimaryPageLayout;
	let fixture: ComponentFixture<PrimaryPageLayout>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PrimaryPageLayout],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PrimaryPageLayout);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle on back click', () => {
		spyOn(component.handleBack, 'emit');
		component.onBackClick();
		expect(component.handleBack.emit).toHaveBeenCalled();
	});
});
