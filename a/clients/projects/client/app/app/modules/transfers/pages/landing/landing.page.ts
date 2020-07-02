import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransferService } from 'client/app/app/services/transfer.service';
import { ITransfer, ITransferState, makeTransferState } from 'client/app/app/models';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ITEMS_PER_PAGE, USER_PERMISSIONS } from 'client/app/app/constants';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { AccountService } from 'client/app/app/services/account.service';
import { IAccountState, makeAccountState, IAccountBalanceByCurrency, IRequestState, makeRequestState } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { RequestsService } from 'client/app/app/services/requests.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { UserService } from 'client/app/app/services/user.service';

@Component({
	templateUrl: './landing.page.html',
	styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit, OnDestroy {
	public transfersListTableSource = new MatTableDataSource<ITransfer>([]);
	public subscription = new Subscription();
	public displayedColumns: string[] = [
		'name',
		'amount',
		'date',
		'operationNumber',
		'state',
		'actions'
	];
	public itemsPerPage: number = ITEMS_PER_PAGE;
	public transferState: ITransferState = makeTransferState({});
	public requestsState: IRequestState = makeRequestState({});
	public accountState: IAccountState = makeAccountState({});

	constructor(
		private sidenavService: SidenavService,
		private transferService: TransferService,
		private utilsService: UtilsService,
		private accountService: AccountService,
		private translateService: TranslateService,
		private pdfService: PdfService,
		private receiptsService: ReceiptsService,
		private router: Router,
		private requestsService: RequestsService,
		private userService: UserService,
	) {}

	ngOnInit() {
		this.transferService.findTransfers();
		this.requestsService.findRequests();
		this.accountService.findAccounts();

		this.subscription.add(this.transferService.getTransferState().subscribe(state => {
			this.transferState = state;
			this.transfersListTableSource.data = state.transfers.slice(0, this.itemsPerPage);
		}));

		this.subscription.add(this.requestsService.getRequestsState().subscribe(state => {
			this.requestsState = state;
		}));

		this.subscription.add(this.accountService.getAccountState().subscribe(state => {
			this.accountState = state;
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	showDetails(transfer: ITransfer): void {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.transferDetails.title'),
			component: RequestDetailComponent,
			data: {
				id: transfer.id,
				date: transfer.date,
				state: transfer.state
			}
		});
	}

	formatDate(date: Date): string {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	showMoreTransfersProcessed() {
		this.router.navigate(['/app/transfers/transfersProcessed']);
	}

	onNewTransferClick() {
		if (this.accountService.hasMultipleSameCurrencyAccounts) {
			this.router.navigate(['/app/transfers/new']);
		} else {
			this.router.navigate(['/app/transfers/thirdPartyTransferContact']);
		}
	}

	get isLoadingAccounts(): boolean {
		return !this.accountState.searchedAccounts;
	}

	get totalBalanceByCurrency(): IAccountBalanceByCurrency[] {
		return this.accountService.totalBalanceByCurrency;
	}

	downloadReceipt(transfer: ITransfer) {
		if(transfer && transfer.id){
			this.subscription.add(this.receiptsService.getReceipt(transfer.id).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}

	get isLoading(): boolean {
		return this.requestsState.loading || this.transferState.loading || this.accountState.loading;
	}

	onRetryTranfers() {
		this.transferService.findTransfers();
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.TRANSFERS.WRITE);
	}

}
