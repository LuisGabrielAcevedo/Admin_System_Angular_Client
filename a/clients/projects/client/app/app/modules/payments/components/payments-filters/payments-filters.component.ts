import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { IServiceDebt } from 'client/app/app/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPaymentFilters } from 'client/app/app/modules/payments/models/payments-filters';
import { makeServicePaymentsStates } from 'client/app/app/models/service-payment';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { TranslateService } from '@ngx-translate/core';
import {
	CONTRAINTS,
	MAX_HOUR,
	MAX_DATE_EXTEND,
	MIN_DATE_EXTEND
} from 'client/app/app/constants';
import { DateRange } from 'client/app/app/validators/date-range.validator';
@Component({
	selector: 'mcy-payments-filters',
	templateUrl: './payments-filters.component.html',
	styleUrls: ['./payments-filters.component.scss']
})
export class PaymentsFiltersComponent implements OnInit{
	@Output() sendFilters: EventEmitter<any> = new EventEmitter();
	@Input () typeFilters: string = '';
	maxDate = MAX_DATE_EXTEND;
	minDate = MIN_DATE_EXTEND ;
	public typeFiltersShow: string = '';
	public listService: IServiceDebt[] = [];
	public searchFieldLength = CONTRAINTS.PAYMENTS.SEARCHFIELD.MAX_LENGTH;
	public filterForm: FormGroup;
	public statesOptions: any = [];
	constructor(
		private fb: FormBuilder,
		private translateService: TranslateService
	) {
		this.filterForm = this.fb.group(
			{
				searchField: '',
				startDate: '',
				endDate: '',
				state: ['']
			},
			{
				validators: DateRange.valid
			}
		);

		this.statesOptions = this.states;
	}

	ngOnInit(){
		if (this.typeFilters === 'service'){
			this.typeFiltersShow = this.translateService.instant('pages.payments.services.searchFieldLabel');
		}else if(this.typeFilters === 'salary'){
			this.typeFiltersShow = this.typeFiltersShow = this.translateService.instant('pages.payments.salary.searchFieldLabel');
		}
	}

	filtersEmit() {
		const filters: IPaymentFilters = {
			searchField: this.filterForm.value.searchField,
			state: this.filterForm.value.state,
			startDate: this.filterForm.value.startDate
				? this.filterForm.value.startDate
				: MIN_DATE_EXTEND,
			endDate: this.filterForm.value.endDate
				? this.filterForm.value.endDate.setHours(MAX_HOUR.HOUR, MAX_HOUR.MINUTES)
				: MAX_DATE_EXTEND,
		};
		if (this.filterForm.valid) {
			this.sendFilters.emit(filters);
		}
	}

	get states(): ISelectOption[] {
		return [
			...makeServicePaymentsStates().map(states => {
				return {
					value: states,
					viewValue: this.translateService.instant(
						'pages.payments.stateHistory.' + states
					)
				};
			})
		];
	}
}
