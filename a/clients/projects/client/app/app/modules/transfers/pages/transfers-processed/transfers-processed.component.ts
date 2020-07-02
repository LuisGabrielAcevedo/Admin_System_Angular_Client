import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'client/app/app/services/account.service';
import {
	IAccountState,
	makeAccountState,
	ITransfer,
	makeTransferState,
	ITransferState,
	ITransferFilters,
	makeTransferFilters,
	ITransferStateStatus
} from 'client/app/app/models';
import { TransferService } from 'client/app/app/services/transfer.service';
import { MatTableDataSource } from '@angular/material';
import { ITEMS_PER_LARGE_PAGE } from 'client/app/app/constants';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { CSVService } from 'client/app/app/services/csv.service';
import { TranslateService } from '@ngx-translate/core';
import compareAsc from 'date-fns/compareAsc';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';

const stateNameKeys = {
	APPROVED: 'successful',
	INPROGRESS: 'processing',
	DENIED: 'rejected'
};

@Component({
	selector: 'mcy-transfers-processed',
	templateUrl: './transfers-processed.component.html',
	styleUrls: ['./transfers-processed.component.scss']
})
export class TransfersProcessedComponent implements OnInit, OnDestroy {
	public subscription = new Subscription();
	public transfersListTableSource = new MatTableDataSource<ITransfer>([]);
	public displayedColumns: string[] = [
		'name',
		'amount',
		'date',
		'operationNumber',
		'state',
		'actions'
	];
	public accountState: IAccountState = makeAccountState({});
	public transferState: ITransferState = makeTransferState({});

	public itemsDisplayed = ITEMS_PER_LARGE_PAGE;
	public transferFilters: ITransferFilters = makeTransferFilters({});

	public isFilterActive: boolean = false;

	constructor(
		private router: Router,
		private accountService: AccountService,
		private transferService: TransferService,
		private utilsService: UtilsService,
		private csvService: CSVService,
		private pdfService: PdfService,
		private receiptsService: ReceiptsService,
		private translateService: TranslateService,
		private sidenavService: SidenavService,
	) { }

	ngOnInit() {
		this.subscription.add(this.transferService.getTransferState().subscribe(state => {
			this.transferState = state;
			if (!state.searchedTransfers && !this.transferState.loading) {
				this.transferService.findTransfers();
			}
			this.transfersListTableSource.data = this.filteredTransfers;
		}));

		this.accountService.findAccounts();

		this.subscription.add(this.accountService.getAccountState().subscribe(state => {
			this.accountState = state;
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onFiltersChange(data: ITransferFilters) {
		this.transferFilters = data;
		this.transferFilters.searchKeyword = this.transferFilters.searchKeyword.toLowerCase();
		this.itemsDisplayed = ITEMS_PER_LARGE_PAGE;
		this.transfersListTableSource.data = this.filteredTransfers;
	}

	goToLanding() {
		this.router.navigate(['/app/transfers']);
	}

	onNewTransferClick() {
		if (this.accountService.hasMultipleSameCurrencyAccounts) {
			this.router.navigate(['/app/transfers/new']);
		} else {
			this.router.navigate(['/app/transfers/thirdPartyTransferContact']);
		}
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	get isLoadingAccounts(): boolean {
		return !this.accountState.searchedAccounts;
	}

	showMoreTransfersProcessed() {
		this.itemsDisplayed =  this.itemsDisplayed + ITEMS_PER_LARGE_PAGE;
		this.transfersListTableSource.data = this.filteredTransfers;
	}

	validateTransferKeyword(transfer: ITransfer): boolean {
		if (this.transferFilters.searchKeyword !== '' && this.transferFilters.searchKeyword !== null) {
			return transfer.destinationHolder.toLowerCase().includes(this.transferFilters.searchKeyword) ||
					(transfer.id ? transfer.id.toLowerCase().includes(this.transferFilters.searchKeyword) : false)
		} else {
			return true;
		}
	}

	validateTransferStatus(transfer: ITransfer) {
		if (this.transferFilters.transferStatus !== '') {
			return transfer.state === this.transferFilters.transferStatus;
		} else {
			return true;
		}
	}

	validateTransferFromDate(transfer: ITransfer) {
		if (this.transferFilters.transferExecutionDateFrom !== '') {
			return compareAsc(
				new Date(transfer.date),
				new Date(this.transferFilters.transferExecutionDateFrom)
			) > -1;
		} else {
			return true;
		}
	}

	validateTransferToDate(transfer: ITransfer) {
		if (this.transferFilters.transferExecutionDateTo !== '') {
			return compareAsc(
				new Date(transfer.date),
				new Date(this.transferFilters.transferExecutionDateTo)
			) < 1;
		} else {
			return true;
		}
	}

	get transfers(): ITransfer[] {
		return this.transferState.transfers
			.filter((transfer) =>
				this.validateTransferKeyword(transfer) &&
				this.validateTransferStatus(transfer) &&
				this.validateTransferFromDate(transfer) &&
				this.validateTransferToDate(transfer)
			);
	}

	get filteredTransfers(): ITransfer[] {
		return this.transfers.slice(0, this.itemsDisplayed);
	}

	onFilterClick() {
		if (this.isFilterActive) {
			this.transferFilters = makeTransferFilters({});
			this.transfersListTableSource.data = this.filteredTransfers;
		}
		this.isFilterActive = !this.isFilterActive;
	}

	getStateName(state: ITransferStateStatus): string {
		if (state) {
			const stateName = stateNameKeys[state];
			return this.translateService.instant(`pages.transfers.transfersProcessed.${stateName}`);
		} else {
			return '';
		}
	}

	get tableHeader(): string[] {
		return [
			this.translateService.instant('pages.transfers.transfersProcessed.nameCSV'),
			this.translateService.instant('pages.transfers.transfersProcessed.amountCSV'),
			this.translateService.instant('pages.transfers.transfersProcessed.dateCSV'),
			this.translateService.instant('pages.transfers.transfersProcessed.operationNumberCSV'),
			this.translateService.instant('pages.transfers.transfersProcessed.stateCSV')
		];
	}

	getTableData(transfer: ITransfer): string[] {
		return [
			transfer.destinationHolder,
			`"${transfer.currency.symbol} ${this.utilsService.formatAmount(transfer.amount)}"`,
			this.formatDate(transfer.date),
			transfer.id ? transfer.id : '',
			this.getStateName(transfer.state!)
		];
	}

	onExportClick(): void {
		const tableHeader = this.tableHeader;
		const tableData = this.transfers.map(this.getTableData.bind(this));
		const fileName = this.translateService.instant('pages.transfers.transfersProcessed.fileName');
		const csvData = [tableHeader, ...tableData];

		this.csvService.downloadCSV(csvData, fileName);
	}

	downloadReceipt(transfer: ITransfer) {
		if(transfer && transfer.id){
			this.subscription.add(
				this.receiptsService.getReceipt(transfer.id).subscribe(receipt => {
					this.pdfService.downloadPdf(receipt.data.file);
				})
			);
		}
	}

	showDetails(transfer: ITransfer): void {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.transferDetails.title'),
			component: RequestDetailComponent,
			data: {
				id: transfer.id,
				date: transfer.date,
				state: transfer.state,
			}
		})
	}
}
