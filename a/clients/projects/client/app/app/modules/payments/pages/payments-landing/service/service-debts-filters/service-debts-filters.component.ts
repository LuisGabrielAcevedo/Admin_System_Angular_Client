import { Component, Output, EventEmitter } from '@angular/core';
import { IServiceDebt } from 'client/app/app/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPaymentFilters } from 'client/app/app/modules/payments/models/payments-filters';
import {
	CONTRAINTS,
	MAX_HOUR,
	MIN_DATE_EXTEND,
	MAX_DATE_EXTEND
} from 'client/app/app/constants';
import { DateRange } from 'client/app/app/validators/date-range.validator';
@Component({
	selector: 'mcy-service-debts-filters',
	templateUrl: './service-debts-filters.component.html',
	styleUrls: ['./service-debts-filters.component.scss']
})
export class ServiceDebtsFiltersComponent  {
	@Output() sendFilters: EventEmitter<any> = new EventEmitter();
	maxDate = MAX_DATE_EXTEND;
	minDate =MIN_DATE_EXTEND ;
	public listService: IServiceDebt[] = [];
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
		const filters: IPaymentFilters = {
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
}
