import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsFiltersComponent } from './payments-filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('PaymentsFiltersComponent', () => {
	let component: PaymentsFiltersComponent;
	let fixture: ComponentFixture<PaymentsFiltersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PaymentsFiltersComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder],
			imports: [TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaymentsFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit sendFilters', () => {
		spyOn(component.sendFilters, 'emit');
		component.filterForm.setValue({
			searchField: '',
			startDate: new Date('02/01/2020'),
			endDate: new Date('02/01/2020'),
			state: ''
		});
		component.filtersEmit();
		expect(component.sendFilters.emit).toHaveBeenCalled();
	});
});
