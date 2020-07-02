import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceDebtsFiltersComponent } from './service-debts-filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('ServiceDebtsFiltersComponent', () => {
	let component: ServiceDebtsFiltersComponent;
	let fixture: ComponentFixture<ServiceDebtsFiltersComponent>;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServiceDebtsFiltersComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder],
			imports: [TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServiceDebtsFiltersComponent);
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
			endDate: new Date('02/01/2020')
		});
		component.filtersEmit();
		expect(component.sendFilters.emit).toHaveBeenCalled();
	});
});
