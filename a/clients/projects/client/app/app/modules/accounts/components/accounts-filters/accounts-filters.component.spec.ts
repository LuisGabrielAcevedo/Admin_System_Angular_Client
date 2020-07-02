import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsFiltersComponent } from './accounts-filters.component';
import { FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('AccountsFiltersComponent', () => {
	let component: AccountsFiltersComponent;
	let fixture: ComponentFixture<AccountsFiltersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountsFiltersComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder],
			imports: [TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountsFiltersComponent);
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
