import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ITransferState, makeTransferState, makeSidenavClose, makeAccount, IConceptState, makeConceptState } from 'client/app/app/models';
import { TransferService } from 'client/app/app/services/transfer.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CONTRAINTS, CURRENCIES } from 'client/app/app/constants';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { SwornDeclarationComponent }
	from 'client/app/app/sidenav/sworn-declaration/sworn-declaration.component';
import { REGEXP } from '@mcy/core/constants';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { Subscription } from 'rxjs';
import { ConceptService } from 'client/app/app/services/concept.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';

@Component({
	templateUrl: './new-third-party-transfer-amount.page.html',
	styleUrls: ['./new-third-party-transfer-amount.page.scss']
})
export class NewThirdPartyTransferAmountPage implements OnInit, OnDestroy  {
	private subscription: Subscription = new Subscription();
	public complete: boolean = false;
	public amountForm: FormGroup;
	public balanceValidators: ValidatorFn[] = [Validators.required, Validators.min(0.01)];
	public conceptValidators: ValidatorFn[] = [Validators.required];
	public currencyValidators: ValidatorFn[] = [Validators.required];
	public isConceptApprovedValidators: ValidatorFn[] = [Validators.requiredTrue];
	public descriptionValidators: ValidatorFn[] = [
		Validators.maxLength(CONTRAINTS.TRANSFER.REFERENCE.MAX_LENGTH),
		Validators.pattern(REGEXP.DESCRIPTION)
	];
	public descriptionMaxlength = CONTRAINTS.TRANSFER.REFERENCE.MAX_LENGTH;
	public conceptsListOption: ISelectOption[] = [];
	public currenciesListOption: ISelectOption[] = [];
	public balance = {
		amount: 0,
		description: ''
	};
	public transferState: ITransferState = makeTransferState({});
	public conceptState: IConceptState = makeConceptState({});

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private transferService: TransferService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private conceptsService: ConceptService,
		private modalService: ModalService,
	) {
		this.amountForm = this.fb.group({
			amount: [0, this.balanceValidators],
			currency: [null, this.currencyValidators],
			currencyCode: [null, this.currencyValidators],
			description: ['', this.descriptionValidators],
			concept: [null, this.conceptValidators],
			conceptCode: [null, this.conceptValidators],
			swornDeclaration: [false, this.isConceptApprovedValidators]
		});
	}

	ngOnInit() {
		this.subscription.add(this.transferService.getTransferState().subscribe((transferState: ITransferState) => {
			this.transferState = transferState;
			this.amountForm.get('amount')!.patchValue(this.transferState.newTransferFormValue.amount);
			this.amountForm.get('description')!.patchValue(this.transferState.newTransferFormValue.paymentDescription);
		}));

		this.currenciesListOption = this.currenciesList;
		if (this.transferState.newTransferFormValue.currency.code.length) {
			this.amountForm.get('currencyCode')!.patchValue(this.transferState.newTransferFormValue.currency.code);
			this.amountForm.get('currency')!.patchValue(this.transferState.newTransferFormValue.currency);
		} else {
			this.amountForm.get('currencyCode')!.patchValue(CURRENCIES[0].code);
			this.amountForm.get('currency')!.patchValue(CURRENCIES[0]);
		}

		this.subscription.add(this.conceptsService.getConceptState().subscribe((conceptState) => {
			this.conceptState = conceptState;
		}));

		this.subscription.add(this.conceptsService.getConcepts().subscribe((isSuccess: boolean) => {
			if (isSuccess) {
				this.conceptsListOption = this.conceptsList;
				if (this.transferState.newTransferFormValue.concept.code.length) {
					this.amountForm.get('conceptCode')!.patchValue(this.transferState.newTransferFormValue.concept.code);
					this.amountForm.get('concept')!.patchValue(this.transferState.newTransferFormValue.concept);
					this.amountForm.get('swornDeclaration')!.patchValue(true);
				}
			}
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get currenciesList(): ISelectOption[] {
		return CURRENCIES.map((concept) => {
			return {
				viewValue: concept.symbol,
				value: concept.code
			};
		});
	}

	get conceptsList(): ISelectOption[] {
		return this.conceptState.concepts.map((concept) => {
			return {
				viewValue: concept.description,
				value: concept.code
			};
		});
	}

	back() {
		this.router.navigate(['/app/transfers/thirdPartyTransferContact']);
	}

	next() {
		this.transferState.newTransferFormValue.amount = this.amountForm.value.amount;
		this.transferState.newTransferFormValue.currency = this.amountForm.value.currency;
		this.transferState.newTransferFormValue.paymentDescription = this.amountForm.value.description;
		this.transferState.newTransferFormValue.concept = this.amountForm.value.concept;
		this.transferState.newTransferFormValue.sourceAccount = makeAccount({});
		this.transferState.newTransferFormValue.executionDate = new Date();
		this.transferService.updateTransferState(this.transferState);
		this.router.navigate(['/app/transfers/thirdPartyTransferAccount']);
	}

	goToLanding() {
		this.router.navigate(['/app/transfers']);
	}

	goToSelectTransfer() {
		this.router.navigate(['/app/transfers/new']);
	}

	conceptChange() {
		const concept = this.conceptState.concepts.find(elem => {
			return elem.code === this.amountForm.value.conceptCode;
		});
		this.amountForm.get('concept')!.patchValue(concept);
		if (this.amountForm.value.concept && this.amountForm.value.concept.swornDeclaration) {
			this.amountForm.get('swornDeclaration')!.enable();
		} else {
			this.amountForm.get('swornDeclaration')!.disable();
		}
	}

	currencyChange() {
		const value = CURRENCIES.find((currency) => {
			return currency.code === this.amountForm.value.currencyCode
		});
		this.amountForm.get('currency')!.patchValue(value);
	}

	updateSwornDeclaration(value: boolean) {

		this.amountForm.get('swornDeclaration')!.patchValue(value);
	}

	openSwornDeclaration() {
		this.sidenavService.open({
			title: this.translateService.instant('pages.transfers.thirdParty.amount.swornDeclarationTitle'),
			component: SwornDeclarationComponent,
			data: {
				onAcceptTerms: () => {
					this.updateSwornDeclaration(true);
				}
			},
			closeAction: makeSidenavClose({
				text: this.translateService.instant('components.sidenavCancel.message'),
				cancelText: this.translateService.instant('common.cancel'),
				confirmText: this.translateService.instant('common.ok'),
			})
		});
	}

	onCancel(goToLanding: boolean) {
		this.modalService.openDialog(makeFlowExitModal({
			component: FlowExitModalComponent,
			title: this.translateService.instant('pages.transfers.exitModal.thirdParty.title'),
			description: this.translateService.instant('pages.transfers.exitModal.thirdParty.description'),
			cancel: this.translateService.instant('pages.transfers.exitModal.thirdParty.cancel'),
			confirm: this.translateService.instant('pages.transfers.exitModal.thirdParty.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				goToLanding ? this.goToLanding() : this.goToSelectTransfer();
			}
		}));
	}
}
