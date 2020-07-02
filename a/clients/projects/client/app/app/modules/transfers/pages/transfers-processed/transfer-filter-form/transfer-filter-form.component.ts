import { Component, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { makeTransferStateStatus, ITransferFilters } from 'client/app/app/models';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { TranslateService } from '@ngx-translate/core';
import { MIN_DATE, CONTRAINTS } from 'client/app/app/constants';

@Component({
	selector: 'mcy-transfer-filter-form',
	templateUrl: './transfer-filter-form.component.html',
	styleUrls: ['./transfer-filter-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferFilterFormComponent implements OnInit{
	@Output() handleChange = new EventEmitter<ITransferFilters>();

	public searchKeywordValidators = [
		Validators.maxLength(CONTRAINTS.TRANSFER.SEARCHFIELD.MAX_LENGTH)
	];
	public transferStatusValidators = [];
	public transferExecutionDateFromValidators = [];
	public transferExecutionDateToValidators = [];
	public transferStatusOptions: ISelectOption[] = [];

	public form: FormGroup = new FormGroup({});

	constructor(private translateService: TranslateService) {
		this.setTransferStatusOptions();
	}

	ngOnInit() {
		this.form = new FormGroup({
			searchKeyword: new FormControl('', this.searchKeywordValidators),
			transferStatus: new FormControl('', this.transferStatusValidators),
			transferExecutionDateFrom: new FormControl('', this.transferExecutionDateFromValidators),
			transferExecutionDateTo: new FormControl('', this.transferExecutionDateToValidators)
		});
	}

	onInputChange() {
		if (this.form.valid) {
			this.handleChange.emit(this.form.value);
		}
	}

	setTransferStatusOptions() {
		this.transferStatusOptions = [
			{
				viewValue: this.translateService.instant('pages.transfers.status.ALL'),
				value: '',
			},
			...makeTransferStateStatus().map(status => {
				return {
					value: status,
					viewValue: this.translateService.instant('pages.transfers.status.' + status)
				}
			})
		];
	}

	get executionDateFromMax(): Date {
		return this.form.value.transferExecutionDateTo
			? new Date(this.form.value.transferExecutionDateTo)
			: new Date()
	}

	get executionDateToMin(): Date {
		return this.form.value.transferExecutionDateFrom
			? new Date(this.form.value.transferExecutionDateFrom)
			: MIN_DATE
	}

	get executionDateToMax(): Date {
		return new Date();
	}

	get searchKeywordMaxLength(): number {
		return CONTRAINTS.TRANSFER.SEARCHFIELD.MAX_LENGTH;
	}
}
