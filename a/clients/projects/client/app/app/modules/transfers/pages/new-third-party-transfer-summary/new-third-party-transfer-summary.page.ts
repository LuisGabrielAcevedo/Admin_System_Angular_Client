import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
	ITransferState,
	makeTransferState,
	IAccount,
	makeAccount,
	IContact,
	makeContact,
	ITransferFormValue,
	makeTransferFormValue,
	makeNewTransfer,
	IRequestResponse,
} from 'client/app/app/models';
import { TransferService } from 'client/app/app/services/transfer.service';
import format from 'date-fns/format';
import { Subscription, Observable, of } from 'rxjs';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';

@Component({
	templateUrl: './new-third-party-transfer-summary.page.html',
	styleUrls: ['./new-third-party-transfer-summary.page.scss']
})

export class NewThirdPartyTransferSummaryPage implements OnInit, OnDestroy {
	public transfer: ITransferFormValue = makeTransferFormValue({});
	public transferState: ITransferState = makeTransferState({});
	public sourceAccount: IAccount = makeAccount({});
	public destinationContact: IContact = makeContact({});
	public transferDate: string = '';
	public subscription = new Subscription();

	constructor(
		private router: Router,
		private softTokenService: SoftTokenService,
		private transferService: TransferService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private modalService: ModalService,
	) {}

	ngOnInit() {
		this.subscription.add(this.transferService.getTransferState().subscribe((transferState: ITransferState) => {
			this.transferState = transferState;
			this.sourceAccount = transferState.newTransferFormValue.sourceAccount;
			this.transfer = transferState.newTransferFormValue;
			this.destinationContact = transferState.newTransferFormValue.destinationContact;
			this.transferDate = format(
				new Date(transferState.newTransferFormValue.executionDate),
				'dd/MM/yyyy'
			);
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	back() {
		this.router.navigate(['/app/transfers/thirdPartyTransferAccount']);
	}

	get transferAmount(): number {
		return this.transferState.newTransferFormValue.amount;
	}

	onTransferClick(): void {
		this.subscription.add(
			this.submitTransfer().subscribe()
		);
	}

	submitTransfer(softToken?: string): Observable<IRequestResponse> {
		const transferForm = this.transferState.newTransferFormValue;
		const transferFinal = makeNewTransfer({
			accountType: transferForm.sourceAccount.type,
			amount: transferForm.amount,
			conceptCode: transferForm.concept.code,
			currencyCode: transferForm.currency.code,
			destinationCuilt: transferForm.destinationContact.cuilt,
			destinationCbvu: transferForm.destinationContact.cbvu,
			originCuilt: transferForm.sourceAccount.cuilt,
			destinationHolder: transferForm.destinationContact.name,
			originCbvu: transferForm.sourceAccount.cbvu,
		});

		return this.transferService.submitRequestTransfer(transferFinal, softToken).pipe(
			tap((response) => {
				if (response.success) {
					this.router.navigateByUrl('app/transfers/thirdPartyTransferSuccess');
				} else {
					const errorHandled = this.softTokenService.handleErrors(response, (token: string) => this.submitTransfer(token), 'thirdPartyTransfer');
					this.transferService.updateTransferState({ loadingNewTransfer: false, hasNewTransferErrors: !errorHandled });
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				const errorHandled = this.softTokenService.handleErrors(errorResponse.error, (token: string) => this.submitTransfer(token), 'thirdPartyTransfer');
				this.transferService.updateTransferState({ loadingNewTransfer: false, hasNewTransferErrors: !errorHandled });
				return of(errorResponse.error);
			})
		);
	}

	backToEditDestinatary() {
		this.router.navigate(['/app/transfers/thirdPartyTransferContact']);
	}

	backToEditBalance() {
		this.router.navigate(['/app/transfers/thirdPartyTransferAmount']);
	}

	backToEditSource() {
		this.router.navigate(['/app/transfers/thirdPartyTransferAccount']);
	}

	goToLanding() {
		this.router.navigate(['/app/transfers']);
	}

	goToSelectTransfer() {
		this.router.navigate(['/app/transfers/new']);
	}

	get isSidenavOpen(): boolean {
		return this.sidenavService.opened;
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
