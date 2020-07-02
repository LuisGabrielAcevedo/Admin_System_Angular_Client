import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksDiscountedFiltersComponent } from './checks-discounted-filters.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('ChecksDiscountedFiltersComponent', () => {
	let component: ChecksDiscountedFiltersComponent;
	let fixture: ComponentFixture<ChecksDiscountedFiltersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChecksDiscountedFiltersComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder],
			imports: [TranslateModule.forRoot()]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksDiscountedFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
