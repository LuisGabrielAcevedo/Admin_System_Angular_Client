import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateRange } from 'client/app/app/validators/date-range.validator';
import {
	CONTRAINTS,
	MAX_HOUR,
	MIN_DATE,
	MAX_DATE
} from 'client/app/app/constants';
import { IAccountsFilters } from 'client/app/app/modules/accounts/models/accounts-filters';
@Component({
	selector: 'mcy-accounts-filters',
	templateUrl: './accounts-filters.component.html',
	styleUrls: ['./accounts-filters.component.scss']
})
export class AccountsFiltersComponent {
	@Output() sendFilters: EventEmitter<any> = new EventEmitter();
	public searchFieldLength = CONTRAINTS.PAYMENTS.SEARCHFIELD.MAX_LENGTH;
	public filterForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.filterForm = this.fb.group(
			{
				searchField: '',
				startDate: '',
				endDate: ''
			},
			{
				validators: DateRange.valid
			}
		);
	}
	filtersEmit() {
		const filters: IAccountsFilters = {
			startDate: this.filterForm.value.startDate
				? this.filterForm.value.startDate
				: MIN_DATE,
			endDate: this.filterForm.value.endDate
				? this.filterForm.value.endDate.setHours(
						MAX_HOUR.HOUR,
						MAX_HOUR.MINUTES
				)
				: MAX_DATE,
			searchField: this.filterForm.value.searchField
		};
		if (this.filterForm.valid) {
			this.sendFilters.emit(filters);
		}
	}
}
