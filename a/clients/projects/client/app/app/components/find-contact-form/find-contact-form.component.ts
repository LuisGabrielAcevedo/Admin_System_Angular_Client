import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { CONTRAINTS } from 'client/app/app/constants';

@Component({
	selector: 'mcy-find-contact-form',
	templateUrl: './find-contact-form.component.html',
	styleUrls: ['./find-contact-form.component.scss'],
})
export class FindContactFormComponent implements OnInit {
	@Output() handleChange = new EventEmitter();
	@Input() cbvu: string = '';
	@Input() alias: string = '';
	@Input() searchBy: string = 'cbvu'
	public searchForm: FormGroup = new FormGroup({});
	public categoryOptions: any = [];

	public cbvuValidators: ValidatorFn[] = [];
	public aliasValidators: ValidatorFn[] = [];

	ngOnInit() {
		this.cbvuValidators = [
			Validators.pattern(CONTRAINTS.CONTACT.CBVU.PATTERN),
			Validators.required,
			Validators.maxLength(CONTRAINTS.CONTACT.CBVU.MAX_LENGTH),
			Validators.minLength(CONTRAINTS.CONTACT.CBVU.MIN_LENGTH)
		];

		this.aliasValidators = [
			Validators.pattern(CONTRAINTS.CONTACT.ALIAS.PATTERN),
			Validators.required,
			Validators.minLength(CONTRAINTS.CONTACT.ALIAS.MIN_LENGTH),
			Validators.maxLength(CONTRAINTS.CONTACT.ALIAS.MAX_LENGTH)
		];

		this.searchForm = new FormGroup({
			searchBy: new FormControl(this.searchBy),
			cbvu: new FormControl(this.cbvu, this.cbvuValidators),
			alias: new FormControl(this.alias, this.aliasValidators)
		});
		this.onOptionChange();
	};

	onChange() {
		this.handleChange.emit({
			valid: this.searchForm.valid,
			value: this.searchForm.value
		});
	}

	onOptionChange() {
		switch(this.searchForm.value.searchBy) {
			case 'cbvu':
				this.searchForm.get('cbvu')!.enable();
				this.searchForm.get('alias')!.disable();
				this.searchForm.get('alias')!.patchValue('');
				break;

			case 'alias':
				this.searchForm.get('alias')!.enable();
				this.searchForm.get('cbvu')!.disable();
				this.searchForm.get('cbvu')!.patchValue('');
				break;
		}
		this.onChange();
	};

	get cbvuMaxLength(): number {
		return CONTRAINTS.CONTACT.CBVU.MAX_LENGTH;
	}

	get aliasMaxLength(): number {
		return CONTRAINTS.CONTACT.ALIAS.MAX_LENGTH;
	}

	get cbvuMissingCharacters(): number {
		return CONTRAINTS.CONTACT.CBVU.MAX_LENGTH - this.searchForm.getRawValue().cbvu.length;
	};

	get isFormValid(): boolean {
		return this.searchForm.valid;
	}
}
