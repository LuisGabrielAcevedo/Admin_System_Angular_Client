import { Component, Input, OnInit } from '@angular/core';
import { ISidenavData, makeContactCategories, makeContact, makeSidenavClose, IContact } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { TranslateService } from '@ngx-translate/core';
import { CONTRAINTS } from 'client/app/app/constants';
import { REGEXP } from '@mcy/core/constants';
import {
	ContactAddConfirmationComponent
} from 'client/app/app/sidenav/contact/contact-add-confirmation/contact-add-confirmation.component';

@Component({
	selector: 'mcy-contact-add',
	templateUrl: './contact-add.component.html',
	styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
	@Input() public data: ISidenavData = {
		contact: makeContact({})
	}
	public descriptionMaxlength = CONTRAINTS.TRANSFER.REFERENCE.MAX_LENGTH;
	public contactForm: FormGroup;
	public emailValidators: ValidatorFn[] = [Validators.pattern(REGEXP.EMAIL)];
	public descriptionValidators: ValidatorFn[] = [Validators.pattern(REGEXP.DESCRIPTION), Validators.required];
	public categoryValidators: ValidatorFn[] = [Validators.required];
	public categoryOptions: ISelectOption[] = [];

	constructor(
		public sidenavService: SidenavService,
		private fb: FormBuilder,
		private translateService: TranslateService
	) {
		this.categoryOptions = this.categories;
		this.contactForm = new FormGroup({});
	}

	ngOnInit() {
		this.contactForm = this.fb.group({
			email: [this.data.contact.email, this.emailValidators],
			description: [this.data.contact.reference
				? this.data.contact.reference
				: this.data.contact.name
			, this.descriptionValidators],
			category: ['EMPLOYEE', this.categoryValidators]
		});
		this.data.contact.favorite = false;
	}

	back() {
		if (this.sidenavService.hasPreviousStep) {
			this.sidenavService.prevStep();
		} else {
			this.sidenavService.close();
		}
	}

	next() {
		this.updateContactData();
		this.addSuccessStep(this.data.contact);
	}

	toggleFavorite() {
		this.data.contact.favorite = !this.data.contact.favorite;
	}

	get categories(): ISelectOption[] {
		return makeContactCategories().map((category) => {
			return {
				value: category,
				viewValue: this.translateService.instant('pages.contacts.categories.' + category)
			}
		});
	}

	get lastAmountPaidSymbol(): string {
		return this.data.contact.lastAmountPaid
			? this.data.contact.lastAmountPaid[0].currency.symbol
			: ''
	}

	get lastAmountPaidDescription(): string {
		return this.data.contact.lastAmountPaid
			? this.data.contact.lastAmountPaid[0].currency.description
			: ''
	}

	get email(): string | null {
		const { email } = this.contactForm.value;
		if (email) {
			if (email === '') return null;
			return email;
		}
		return null;
	}

	updateContactData() {
		this.data.contact.email = this.email;
		this.data.contact.reference = this.contactForm.value.description;
		this.data.contact.category = this.contactForm.value.category;
	}

	addSuccessStep(contactData: IContact) {
		this.sidenavService.nextStep({
			title: this.translateService.instant('pages.contacts.add.title'),
			component: ContactAddConfirmationComponent,
			data: {
				contact: contactData
			},
			closeAction: makeSidenavClose({
				text: this.translateService.instant('components.sidenavCancel.message'),
				cancelText: this.translateService.instant('common.cancel'),
				confirmText: this.translateService.instant('components.sidenavCancel.discard')
			})
		});
	}
}
