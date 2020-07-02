import { Component, Input, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IRequest, RequestFiltersType, RequestState, makeRequestColorClassByState } from 'client/app/app/models/request';
import { ISavedSignatures } from 'client/app/app/models/signs';
import { TranslateService } from '@ngx-translate/core';
import { RequestsService } from 'client/app/app/services/requests.service';
import { SignaturesService } from 'client/app/app/services/signatures.service';
import { Subscription } from 'rxjs';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { UserService } from 'client/app/app/services/user.service';

@Component({
	selector: 'mcy-requests-list',
	templateUrl: './requests-list.component.html',
	styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnDestroy, OnInit {
	@Input() public requests: IRequest[] = [];
	@Input() public loading = false;
	public searchedSignatures: ISavedSignatures = {};
	public displayedColumns: string[] = [
		'profiles',
		'number',
		'operationAndDetail',
		'amount',
		'lastUpdate',
		'state',
		'powerOfSignature',
		'details'
	];
	@Input() selectedRequests: IRequest[] = [];
	@Input() public type: RequestFiltersType = 'ALL';
	@Output() selectRequest: EventEmitter<IRequest> = new EventEmitter();
	@Output() resetSelection: EventEmitter<any> = new EventEmitter();
	@Output() actionRedirect: EventEmitter<string> = new EventEmitter();
	public subscription: Subscription = new Subscription();
	public userDocumentNumber = '';
	public userDocumentType = '' ;
	public emptyMessage = '' ;

	constructor(
		private utilsService: UtilsService,
		private translateService: TranslateService,
		private requestsService: RequestsService,
		private signaturesService: SignaturesService,
		private sidenavService: SidenavService,
		private userService: UserService,
	) {
		this.userDocumentNumber = this.userService.getUserState().value.user.document.number;
		this.userDocumentType = this.userService.getUserState().value.user.document.type;
	}

	ngOnInit() {
		if (this.type === 'CHECKBOOK') {
			this.displayedColumns = this.displayedColumns.filter(column => column !== 'amount');
			this.emptyMessage = this.translateService.instant('pages.checkbooks.checkbooks.emptyRequestMessage');
		} else {
			this.emptyMessage = this.translateService.instant('pages.requests.requestsList.emptyRequestsMessage');
		}
		this.subscription.add(this.signaturesService.getSignState().subscribe(state => {
			this.searchedSignatures = state.searchedSignatures;
		}));
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	select(request: IRequest) {
		this.selectRequest.emit(request);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	isServicePayment(request: IRequest){
		return  request.type.includes('SERVICE_PAYMENT');
	}

	isCheckbook(request: IRequest){
		return  request.type.includes('CHECKBOOK');
	}

	getOperation(request: IRequest) {
		return this.requestsService.getOperationText(request);
	}

	getState(state: string) {
		return this.translateService.instant(`pages.requests.states.${state}`);
	}

	selectedRequestsIds() {
		return this.selectedRequests.map(req => req.id);
	}

	selected(request: IRequest) {
		return this.selectedRequestsIds().includes(request.id);
	}

	resetSelectionFn() {
		this.resetSelection.emit();
	}

	goTo(path: string) {
		this.actionRedirect.emit(path);
	}

	goToDetail(request: IRequest) {
		if (this.requestsService.isSalary(request)) {
			this.goToRequestDetail(request, 'pages.payments.salary.salaryPayment');
		};

		if (this.requestsService.isTransfer(request)) {
			this.goToRequestDetail(request, 'sidenav.transferDetails.title');
		}

		if (this.requestsService.isServicePayment(request)) {
			this.goToRequestDetail(request, 'sidenav.payments.serviceDetail');
		}

		if (this.requestsService.isProviderPayment(request)) {
			this.goToRequestDetail(request, 'sidenav.payments.providerPaymentDetailTitle');
		}

		if (this.requestsService.isCheckbook(request)) {
			this.goToRequestDetail(request, 'pages.checkbooks.detail.title');
		}
	}

	goToRequestDetail(request: IRequest, title: string) {
		this.sidenavService.open({
			title: this.translateService.instant(title),
			component: RequestDetailComponent,
			data: {
				id: request.id
			}
		});
	}

	getColorClassByState(state: RequestState) {
		const colorForState = makeRequestColorClassByState();
		return colorForState[state] || '';
	}
}
