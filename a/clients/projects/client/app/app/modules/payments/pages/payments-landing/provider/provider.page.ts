import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ITransfer, IProviderPaymentState, makeProviderPaymentState } from 'client/app/app/models';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITEMS_PER_PAGE, USER_PERMISSIONS } from 'client/app/app/constants';
import { MatTableDataSource } from '@angular/material';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { RequestsService } from 'client/app/app/services/requests.service';
import {
	IRequest,
	IRequestFilters,
	makeRequestFilters,
	IRequestState,
	makeRequestState
} from 'client/app/app/models';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { UserService } from 'client/app/app/services/user.service';

@Component({
	selector: 'mcy-provider-page',
	templateUrl: './provider.page.html',
	styleUrls: ['./provider.page.scss']
})
export class ProviderPageComponent implements OnInit, OnDestroy {
	public providerPaymentState: IProviderPaymentState = makeProviderPaymentState({});
	public subscription = new Subscription();
	public itemsPerPage: number = ITEMS_PER_PAGE;
	public paymentsListTableSource = new MatTableDataSource<ITransfer>([]);
	public providerTransfers: ITransfer[] = [];
	public page: number = 1;
	public requestState: IRequestState = makeRequestState({});
	public filteredRequest: IRequest[] = [];
	public selectedRequests: IRequest[] = [];
	public displayedColumns: string[] = [
		'name',
		'amount',
		'date',
		'operationNumber',
		'state',
		'actions'
	];
	public defaultFilters = makeRequestFilters({
		typeField: 'PROVIDER_PAYMENT',
		stateField: [
			'PENDING_APPROVAL' ,
			'PARTIALLY_AUTHORIZED'
		]
	});
	constructor (
		private router: Router,
		private providerPaymentService: ProviderPaymentService,
		private utilsService: UtilsService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private pdfService: PdfService,
		private receiptsService: ReceiptsService,
		private requestsService: RequestsService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.getProviderTransfers();
		this.getRequest();
	}

	ngOnDestroy() :void {
		this.subscription.unsubscribe();
	}

	goToNewProviderPayment(){
		this.router.navigateByUrl('app/payments/provider');
	}

	formatDate(date: Date): string {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	showDetails(transfer: ITransfer): void {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.payments.providerPaymentDetailTitle'),
			component: RequestDetailComponent,
			data: {
				id: transfer.id,
				date: transfer.date,
				state: transfer.state
			}
		});
	}

	downloadReceipt(transfer: ITransfer) {
		if(transfer && transfer.id){
			this.subscription.add(this.receiptsService.getReceipt(transfer.id).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}

	setPagination() {
		this.paymentsListTableSource.data = this.providerTransfers.slice(0, this.page * ITEMS_PER_PAGE);
	}

	incrementPagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	getRequest() {
		this.subscription.add(this.requestsService
			.getRequestsState()
			.subscribe(state => {
				this.requestState = state;
					this.filterData(this.defaultFilters, state.requests);
			}));
	}

	getProviderTransfers(){
		this.providerPaymentService.findProviderPayments();
		this.subscription.add(this.providerPaymentService.getProviderPaymentState().subscribe(state => {
			this.providerPaymentState = state;
			this.providerTransfers = state.providerPayments;
			this.setPagination();
		}));
	}

	filterData(filters: IRequestFilters, request: IRequest[]) {
		const filteredRequest = this.requestsService.filterRequests(
			request,
			filters
		);
		this.filteredRequest = filteredRequest;
	}

	getRequestPerPage() {
		return this.filteredRequest.slice(0, ITEMS_PER_PAGE);
	}

	goTo(path: string) {
		this.requestsService.updateRequestsState({
			selectedRequests: this.selectedRequests
		});
		this.router.navigateByUrl(path);
	}

	select(request: IRequest) {
		this.selectedRequests = this.requestsService.selectRequest(this.selectedRequests, request);
	}

	resetSelection() {
		this.selectedRequests = [];
	}

	goToRequestsLanging() {
		this.requestsService.updateRequestsState({
			selectedFilters: this.defaultFilters
		});
		this.router.navigateByUrl('app/requests');
	}

	onRetryProviderPayments() {
		this.providerPaymentService.findProviderPayments();
	}

	get isLoading(): boolean {
		return this.providerPaymentState.loading || this.requestState.loading;
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.PROVIDERS.WRITE);
	}

	onSubmitRequest() {
		this.requestsService.findRequests();
	}
}
