import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
	IExportCSVModal,
	ContactCategory,
	makeContactCategories,
	CSVFilter,
} from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISelectOption } from '@mcy/core/components/select/select.component';

@Component({
	selector: 'mcy-export-csv-modal',
	templateUrl: './export-csv-modal.component.html',
	styleUrls: ['./export-csv-modal.component.scss']
})
export class ExportCSVModalComponent implements OnInit {
	public categories: ContactCategory[] = makeContactCategories();
	public selectedCategory: ContactCategory = 'OTHERS';
	public categoriesList: ISelectOption[] = [];
	public form: FormGroup = new FormGroup({
		filterType: new FormControl('all', [ Validators.required ]),
		contactCategory: new FormControl('OTHERS')
	});

	constructor(
		private translateService: TranslateService,
		public dialogRef: MatDialogRef<ExportCSVModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IExportCSVModal
	) {}

	ngOnInit() {
		this.categoriesList = this.getCategoriesList();
	}

	getCategoriesList(): ISelectOption[] {
		return this.categories.map((category) => {
			return {
				viewValue: this.translateService.instant('pages.contacts.categories.' + category),
				value: category
			};
		});
	}

	onCancel() {
		this.data.onCancel();
		this.dialogRef.close();
	}

	onClose() {
		this.data.onClose();
		this.dialogRef.close();
	}

	onConfirm() {
		this.selectedCategory = this.areCategoriesSelected && this.form.value.contactCategory;
		const selectedFilter: CSVFilter = this.areCategoriesSelected ? this.selectedCategory : this.form.value.filterType;
		this.data.onConfirm(selectedFilter);
		this.dialogRef.close();
	}

	get areCategoriesSelected(): boolean {
		return this.form.value.filterType === 'category';
	}
}
