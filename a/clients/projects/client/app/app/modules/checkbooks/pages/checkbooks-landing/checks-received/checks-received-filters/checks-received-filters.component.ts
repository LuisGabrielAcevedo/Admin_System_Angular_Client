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
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { makeChecksReceivedStates } from 'client/app/app/models/check';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mcy-checks-received-filters',
	templateUrl: './checks-received-filters.component.html',
	styleUrls: ['./checks-received-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecksReceivedFiltersComponent {
	@Output() sendFilters: EventEmitter<any> = new EventEmitter();

	maxDate = MAX_DATE_EXTEND;
	minDate = MIN_DATE_EXTEND ;

	public searchFieldLength = CONTRAINTS.PAYMENTS.SEARCHFIELD.MAX_LENGTH;
	public filterForm: FormGroup;
	public statesOptions: ISelectOption[] = [];

	constructor(
		private fb: FormBuilder,
		private translateService: TranslateService,
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

	filtersEmit() {
		const filters: IChecksFilters = {
			searchField: this.filterForm.value.searchField,
			stateField: this.filterForm.value.stateField,
			startDate: this.filterForm.value.startDate
				? this.filterForm.value.startDate
				: MIN_DATE_EXTEND,
			endDate: this.filterForm.value.endDate
				? this.filterForm.value.endDate.setHours(MAX_HOUR.HOUR,MAX_HOUR.MINUTES)
				: MAX_DATE_EXTEND,
		};
		if (this.filterForm.valid) {
			this.sendFilters.emit(filters);
		}
	}

	get states(): ISelectOption[] {
		return makeChecksReceivedStates().map(states => {
			return {
				value: states,
				viewValue: this.translateService.instant(
					'pages.checkbooks.filters.states.' + states
				)
			};
		})
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
