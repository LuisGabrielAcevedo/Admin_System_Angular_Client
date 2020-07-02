import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestsFiltersComponent } from './requests-filters.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { makeRequestFilters } from 'client/app/app/models';
import { MAX_DATE, MIN_DATE } from 'client/app/app/constants';

describe('RequestsFiltersComponent', () => {
	let component: RequestsFiltersComponent;
	let fixture: ComponentFixture<RequestsFiltersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RequestsFiltersComponent],
			imports: [TranslateModule.forRoot()],
			providers: [FormBuilder],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestsFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit sendFilters', () => {
		spyOn(component.sendFilters, 'emit');
		component.filterForm.setValue(makeRequestFilters({
			startDate: new Date('02/01/2020'),
			endDate: new Date('02/01/2020')
		}));
		component.filtersEmit();
		expect(component.sendFilters.emit).toHaveBeenCalled();
	});

	it('when the input defaultFilters change, the filterForm should be updated', () => {
		spyOn(component.filterForm, 'patchValue');
		const changes: SimpleChanges = { defaultFilters: new SimpleChange(null, makeRequestFilters({
			startDate: new Date('02/01/2020'),
			endDate: new Date('02/01/2020')
		}), true)};
		component.ngOnChanges(changes);
		fixture.detectChanges();
		expect(component.filterForm.patchValue).toHaveBeenCalled();
	});

	it('when the input statesToShow change, the statesOptions should be updated', () => {
		const changes: SimpleChanges = { statesToShow: new SimpleChange(null, ['PENDING_APPROVAL', 'PARTIALLY_AUTHORIZED'] , true)};
		component.ngOnChanges(changes);
		fixture.detectChanges();
		expect(component.statesOptions.length).toBe(2);
	});

	it('when getEndDateValue is called with MAX_DATE, should return "" ', () => {
		const resp = component.getEndDateValue(MAX_DATE)
		expect(resp).toBe('');
	});

	it('when getStartDateValue is called with MIN_DATE, should return "" ', () => {
		const resp = component.getStartDateValue(MIN_DATE)
		expect(resp).toBe('');
	});
});
