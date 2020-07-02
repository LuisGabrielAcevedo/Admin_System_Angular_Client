import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	IRequest,
	IRequestFilters,
	makeRequestFilters
} from 'client/app/app/models';
import { RequestsService } from 'client/app/app/services/requests.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'client/app/app/constants';

@Component({
	selector: 'mcy-transfers-requests-list',
	templateUrl: './transfers-requests-list.component.html',
	styleUrls: ['./transfers-requests-list.component.scss']
})
export class TransfersRequestsListComponent implements OnInit, OnDestroy {
	public selectedRequests: IRequest[] = [];
	public subscription: Subscription = new Subscription();
	public requests: IRequest[] = [];
	public filteredRequest: IRequest[] = [];
	public filteredRequestBySizePage: IRequest[] = [];
	public loading = false;
	public totalRequest = 0;
	public requestsSizeList = ITEMS_PER_PAGE;
	public defaultFilters = makeRequestFilters({
		typeField: 'TRANSFER',
		stateField: [
			'PENDING_APPROVAL' ,
			'PARTIALLY_AUTHORIZED'
		]
	});

	constructor(
		private requestsService: RequestsService,
		private router: Router
	) {}

	ngOnInit() {
		this.getRequest();
	}

	getRequest() {
		this.subscription.add(this.requestsService
			.getRequestsState()
			.subscribe(state => {
				this.requests = state.requests;
				this.totalRequest = this.requests.length;
				this.loading = state.loading;
				this.selectedRequests = state.selectedRequests;
				if (!state.searchedRequest && !this.loading) {
					this.requestsService.findRequests();
				} else {
					this.filterData(this.defaultFilters);
				}
			}));
	}

	filterData(filters: IRequestFilters) {
		this.filteredRequest = this.requestsService.filterRequests(
			this.requests,
			filters
		);
		this.totalRequest = this.filteredRequest.length;
		this.filteredRequestBySizePage = this.filteredRequest.slice(0, ITEMS_PER_PAGE);
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

	goTo(path: string) {
		this.requestsService.updateRequestsState({
			selectedRequests: this.selectedRequests
		});
		this.router.navigateByUrl(path);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
