import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { EventService } from 'client/app/app/services/event.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-search-contact-form',
	templateUrl: './search-contact-form.component.html',
	styleUrls: ['./search-contact-form.component.scss']
})
export class SearchContactFormComponent implements OnDestroy {
	@Input() placeholder: string = '';
	@Output() handleSearch = new EventEmitter<string>();

	public subscription: Subscription = new Subscription();

	public form: FormGroup = new FormGroup({});
	public keyword: string = '';
	public keywordValidators: ValidatorFn[];

	constructor(
		private eventService: EventService,
	) {
		this.keywordValidators = [ Validators.minLength(1) ];
		this.form =  new FormGroup({
			keyword: new FormControl('', this.keywordValidators)
		});
		this.subscription.add(
			this.eventService.on('contactDataUpdated').subscribe(() => this.onCancel())
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onSearch() {
		if (this.form.valid) {
			this.keyword = this.form.value.keyword;
			this.handleSearch.emit(this.form.value.keyword);
		}
	}

	onCancel() {
		this.form.reset();
		this.form.value.keyword = '';
		this.keyword = '';
		this.handleSearch.emit(this.keyword);
	}

	get didSearch(): boolean {
		return this.keyword.length > 0;
	}
}
