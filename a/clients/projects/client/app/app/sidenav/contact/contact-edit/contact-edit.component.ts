import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ISidenavData, makeSidenavClose } from 'client/app/app/models/sidenav';
import { Validators, FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { ContactService } from 'client/app/app/services/contact.service';
import { makeContactCategories } from 'client/app/app/models';
import { IContact, makeContact, ISearchContact } from 'client/app/app/models/contact';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ContactDeleteComponent } from 'client/app/app/sidenav/contact/contact-delete/contact-delete.component';
import { CONTRAINTS } from 'client/app/app/constants';
import { REGEXP } from '@mcy/core/constants';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { ContactSuccessComponent } from 'client/app/app/sidenav/contact/contact-success/contact-success.component';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './contact-edit.component.html',
	styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit, OnDestroy {
	public emailValidators: ValidatorFn[] = [];
	public referenceValidators: ValidatorFn[] = [];
	public referenceMaxlength = CONTRAINTS.CONTACT.REFERENCE.MAX_LENGTH;
	public cbvuMaxlength = CONTRAINTS.CONTACT.CBVU.MAX_LENGTH;
	public categoryOptions: ISelectOption[];
	public contactForm: FormGroup;
	public emailMaxlength = CONTRAINTS.CONTACT.EMAIL.MAX_LENGTH;
	public isSubmitLoading: boolean = false;
	public contactData: IContact;
	public updateError: string = '';
	public isUpdateError: boolean = false;
	public subscription = new Subscription();
	@Input() public data: ISidenavData = {};

	constructor(
		private contactService: ContactService,
		private sidenavService: SidenavService,
		private translate: TranslateService,
		private validatorService: ValidatorService
	) {
		this.contactData = makeContact({});
		this.emailValidators = [ Validators.pattern(REGEXP.EMAIL) ];
		this.referenceValidators = [
			Validators.maxLength(this.referenceMaxlength),
			Validators.pattern(REGEXP.REFERENCE),
			Validators.required,
			this.validatorService.noWhitespaceValidator()
		];
		this.contactForm = new FormGroup({
			email: new FormControl('', this.emailValidators),
			reference: new FormControl('', this.referenceValidators),
			category: new FormControl('', this.referenceValidators),
			favorite: new FormControl(false),
		});
		this.categoryOptions = this.categories;
	}

	ngOnInit() {
		this.loadAccountData();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	loadAccountData() {
		const data: ISearchContact = {
			type: 'id',
			value: this.data.contactId
		};
		this.subscription.add(
			this.contactService.findContactBy(data).subscribe((contact: IContact | null) => {
				if (contact) {
					this.contactData = contact;
					this.setContactForm();
				}
			}, () => { })
		);
	}

	setContactForm() {
		this.contactForm.controls.email.setValue(this.contactData.email);
		this.contactForm.controls.reference.setValue(this.contactData.reference);
		this.contactForm.controls.category.setValue(this.contactData.category);
		this.contactForm.controls.favorite.setValue(this.contactData.favorite);
	}

	submitContactData() {
		this.updateContactData();
		this.isSubmitLoading = true;
		this.subscription.add(
			this.contactService.updateContact(this.contactData)
			.subscribe((response: boolean) => {
				this.isUpdateError = !response;
				if (response) {
					this.nextStep();
				}
			}, (error: any) => {
				this.isUpdateError = true;
				this.updateError = error.message;
			})
		);
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
		this.contactData.email = this.email;
		this.contactData.reference = this.contactForm.controls.reference.value;
		this.contactData.category = this.contactForm.controls.category.value;
		this.contactData.favorite = this.contactForm.controls.favorite.value;
	}

	nextStep() {
		this.sidenavService.nextStep({
			title: this.translate.instant('pages.contacts.editSuccess.title'),
			component: ContactSuccessComponent,
			data: {
				title: this.translate.instant('pages.contacts.editSuccess.subtitle'),
				contact: this.contactData,
			}
		});
	}

	deleteStep() {
		this.sidenavService.nextStep({
			title: this.translate.instant('pages.contacts.delete.title'),
			component: ContactDeleteComponent,
			data: {
				contactId: this.data.contactId,
				contactData: this.contactData,
			},
			hasMoreData: true,
			closeAction: makeSidenavClose({
				text: this.translate.instant('components.sidenavCancel.message'),
				cancelText: this.translate.instant('common.cancel'),
				confirmText: this.translate.instant('common.ok')
			})
		});
	}

	onFavoriteClick() {
		this.contactForm.controls.favorite.patchValue(
			!this.contactForm.value.favorite
		);
	}

	get categories(): ISelectOption[] {
		return makeContactCategories().map((category) => {
			return {
				value: category,
				viewValue: this.translate.instant('pages.contacts.categories.' + category),
			}
		});
	}
}
