import { Component, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MAX_DATE_EXTEND, MIN_DATE_EXTEND, CONTRAINTS, MAX_HOUR, MIN_DATE } from 'client/app/app/constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateRange } from 'client/app/app/validators/date-range.validator';
import { IChecksFilters } from 'client/app/app/modules/checkbooks/models/checks-filters';
import { makeChecksIssuedStates } from 'client/app/app/models/check';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mcy-checks-issued-filters',
	templateUrl: './checks-issued-filters.component.html',
	styleUrls: ['./checks-issued-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecksIssuedFiltersComponent implements OnInit {
	@Output() sendFilters: EventEmitter<IChecksFilters> = new EventEmitter();
	public statesOptions: ISelectOption[]= [];
	maxDate = MAX_DATE_EXTEND;
	minDate = MIN_DATE_EXTEND ;
	public searchFieldLength = CONTRAINTS.PAYMENTS.SEARCHFIELD.MAX_LENGTH;
	public filterForm: FormGroup;
	constructor(
		private fb: FormBuilder,
		private translateService: TranslateService
	) {
		this.filterForm = this.fb.group(
			{
				searchField: '',
				stateField: '',
				startDate: '',
				endDate: ''
			},
			{
				validators: DateRange.valid
			}
		);

		this.statesOptions = this.states;
	}

	ngOnInit() {}

	filtersEmit() {
		const filters: IChecksFilters = {
			startDate: this.filterForm.value.startDate
				? this.filterForm.value.startDate
				: MIN_DATE_EXTEND,
			endDate: this.filterForm.value.endDate
				? this.filterForm.value.endDate.setHours(MAX_HOUR.HOUR,MAX_HOUR.MINUTES)
				: MAX_DATE_EXTEND,
			searchField: this.filterForm.value.searchField,
			stateField: this.filterForm.value.stateField
		};
		if (this.filterForm.valid) {
			this.sendFilters.emit(filters);
		}
	}

	get states(): ISelectOption[] {
		return makeChecksIssuedStates().map(state => {
			return  {
				value: state,
				viewValue: this.translateService.instant(
					'pages.checkbooks.filters.states.' + state
				)
			}
		});
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
