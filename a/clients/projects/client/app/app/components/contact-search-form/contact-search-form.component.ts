import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { makeContactCategories, ContactCategory } from '../../models';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { TranslateService } from '@ngx-translate/core';


export interface ContactSearchFormChangeEvent {
	searchKeyword: string, 
	category: ContactCategory 
}

@Component({
	selector: 'mcy-contact-search-form',
	templateUrl: './contact-search-form.component.html',
	styleUrls: ['./contact-search-form.component.scss'],
})
export class ContactSearchFormComponent implements OnInit {
	@Input() selectedCategory: ContactCategory | null = null;
	@Output() handleChange = new EventEmitter();
	
	public searchForm: FormGroup;
	public categoryOptions: any = [];

	constructor(private fb: FormBuilder, private translateService: TranslateService) {
		this.searchForm = this.fb.group({
			searchKeyword: [''],
			category: ['']
		});

		this.categoryOptions = this.categories;
	}

	ngOnInit() {
		if (this.selectedCategory) {
			this.searchForm.patchValue({ category: this.selectedCategory });
			this.onInputChange();
		}
	}

	onInputChange() {
		this.handleChange.emit(this.searchForm.value);
	}

	get categories(): ISelectOption[] {
		return [
			{
				value: '',
				viewValue: this.translateService.instant('components.contactSearchForm.allOptions'),
			},
			...makeContactCategories().map((category) => {
				return { 
					value: category, 
					viewValue: this.translateService.instant('pages.contacts.categories.' + category)
				}
			})
		]
	}
}
