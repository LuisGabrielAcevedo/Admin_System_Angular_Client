import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {
	CONTRAINTS,
	MIN_DATE_EXTEND,
	MAX_DATE_EXTEND,
	MAX_HOUR,
	MIN_DATE
} from 'client/app/app/constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateRange } from 'client/app/app/validators/date-range.validator';
import {
	IChecksFilters
} from 'client/app/app/modules/checkbooks/models/checks-filters';

@Component({
	selector: 'mcy-checks-discounted-filters',
	templateUrl: './checks-discounted-filters.component.html',
	styleUrls: ['./checks-discounted-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecksDiscountedFiltersComponent {
	@Output() sendFilters: EventEmitter<any> = new EventEmitter();
	maxDate = MAX_DATE_EXTEND;
	minDate = MIN_DATE_EXTEND ;
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
		const filters: IChecksFilters = {
			startDate: this.filterForm.value.startDate
				? this.filterForm.value.startDate
				: MIN_DATE_EXTEND,
			endDate: this.filterForm.value.endDate
				? this.filterForm.value.endDate.setHours(MAX_HOUR.HOUR,MAX_HOUR.MINUTES)
				: MAX_DATE_EXTEND,
			searchField: this.filterForm.value.searchField
		};
		if (this.filterForm.valid) {
			this.sendFilters.emit(filters);
		}
	}

	get executionDateFromMax(): Date {
		return this.filterForm.value.endDate
			? new Date(this.filterForm.value.endDate)
			: new Date()
	}

	get executionDateToMin(): Date {
		return this.filterForm.value.startDate
			? new Date(this.filterForm.value.startDate)
			: MIN_DATE
	}

	get executionDateToMax(): Date {
		return new Date();
	}
}
