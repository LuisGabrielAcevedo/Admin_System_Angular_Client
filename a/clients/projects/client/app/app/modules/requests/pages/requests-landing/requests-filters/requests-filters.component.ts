import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CONTRAINTS, MIN_DATE, MAX_HOUR, MAX_DATE } from 'client/app/app/constants';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { TranslateService } from '@ngx-translate/core';
import { RequestState, IRequestFilters, makeRequestType, makeRequestFilters } from 'client/app/app/models';

@Component({
	selector: 'mcy-requests-filters',
	templateUrl: './requests-filters.component.html',
	styleUrls: ['./requests-filters.component.scss']
})
export class RequestsFiltersComponent implements OnChanges{
	@Output() sendFilters: EventEmitter<any> = new EventEmitter();
	@Input() statesToShow: RequestState[]= [];
	@Input() defaultFilters: IRequestFilters = makeRequestFilters({});
	public searchFieldLength = CONTRAINTS.REQUESTS.SEARCHFIELD.MAX_LENGTH;
	public filterForm: FormGroup;
	public typeOptions: ISelectOption[]=[];
	public statesOptions: ISelectOption[]=[];

	constructor(
		private fb: FormBuilder,
		private translateService: TranslateService,
	) {
		this.filterForm = this.fb.group(
			{
				searchField: new FormControl(''),
				typeField: new FormControl(''),
				stateField: new FormControl([]),
				startDate: new FormControl(''),
				endDate: new FormControl('')
			}
		);
		this.typeOptions = this.types;
	}

	ngOnChanges(changes: SimpleChanges){
		if (changes.defaultFilters && changes.defaultFilters.currentValue) {
			const filters: IRequestFilters = changes.defaultFilters.currentValue;
			this.filterForm.patchValue({
				...filters,
				startDate: this.getStartDateValue(filters.startDate),
				endDate: this.getEndDateValue(filters.endDate)
			});
		}
		if (changes.statesToShow && changes.statesToShow.currentValue.length) {
			this.statesOptions =  this.states(changes.statesToShow.currentValue);
		}
	}

	getStartDateValue(date: Date | null) {
		if (date && date !== MIN_DATE) {
			return new Date(date);
		}

		return '';
	}

	getEndDateValue(date: Date | null) {
		if (date && date !== MAX_DATE) {
			return new Date(date);
		}

		return '';
	}

	filtersEmit() {
		const filters: IRequestFilters = {
			searchField: this.filterForm.value.searchField,
			typeField:  this.filterForm.value.typeField,
			stateField: this.filterForm.value.stateField,
			startDate: this.filterForm.value.startDate
				? this.filterForm.value.startDate
				: MIN_DATE,
			endDate: this.filterForm.value.endDate
				? this.filterForm.value.endDate.setHours(
						MAX_HOUR.HOUR,
						MAX_HOUR.MINUTES
				)
				: MAX_DATE,
		};
		if (this.filterForm.valid) {
			this.sendFilters.emit(filters);
		}
	}

	get types(): ISelectOption[] {
		return makeRequestType().map(types => {
				return {
					value: types,
					viewValue: this.translateService.instant(
						'pages.requests.filters.types.' + types
					)
				};
			})
	}

	states(states: RequestState[]): ISelectOption[] {
		return states.map(state => {
				return {
					value: state,
					viewValue: this.translateService.instant(
						'pages.requests.states.' + state
					)
				};
			})
		;
	}
}
