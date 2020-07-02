import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRequest, RequestState, IRequestFilters, makeRequestFilters } from 'client/app/app/models' ;
import { CONTRAINTS, ITEMS_PER_PAGE } from 'client/app/app/constants';
import { Subscription } from 'rxjs';
import { RequestsService } from 'client/app/app/services/requests.service';
import { Router } from '@angular/router';

@Component({
	selector: 'mcy-requests-landing',
	templateUrl: './requests-landing.component.html',
	styleUrls: ['./requests-landing.component.scss']
})
export class RequestsLandingComponent implements OnInit, OnDestroy{
	public requestOrigin: IRequest[] = [];
	public filteredRequest: IRequest[] = [];
	public paginatedRequestList: IRequest[] = [];
	public statesToShow: RequestState[]= [];
	public page = 1;
	public searchFieldLength = CONTRAINTS.REQUESTS.SEARCHFIELD.MAX_LENGTH;
	public subscription: Subscription = new Subscription();
	public loading = false;
	public visibleFilters = false;
	public totalRequest: number = 0;
	public currentFilters: IRequestFilters = makeRequestFilters({});
	public defaultFilters: IRequestFilters = makeRequestFilters({});
	public selectedRequests: IRequest[] = [];

	constructor(
		private requestsService: RequestsService,
		private router: Router
	){}

	ngOnInit(){
		this.getRequest();
	}

	getRequest() {
		this.requestsService.findRequests();

		this.subscription.add(this.requestsService
			.getRequestsState()
			.subscribe(state => {
				this.requestOrigin = state.requests;
				this.totalRequest = this.filteredRequest.length;
				this.loading = state.loading;
				if (this.requestOrigin.length) {
					this.statesToShow = state.statesToShow;
					this.selectedRequests = state.selectedRequests;
					this.defaultFilters = state.selectedFilters;
					this.filterData(this.defaultFilters);
				}
			}));
	}

	select(request: IRequest) {
		this.selectedRequests = this.requestsService.selectRequest(this.selectedRequests, request);
	}

	resetSelection() {
		this.selectedRequests = [];
	}

	setPagination() {
		this.paginatedRequestList = this.filteredRequest.slice(0, this.page * ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	resetPagination() {
		this.page = 1;
		this.paginatedRequestList = [];
		this.setPagination();
	}

	filterRequests(filters: IRequestFilters) {
		this.filterData(filters);
		this.resetSelection();
	}

	filterData(filters: IRequestFilters) {
		this.currentFilters = {...this.currentFilters, ...filters};
		this.filteredRequest = this.requestsService.filterRequests(this.requestOrigin, this.currentFilters);
		this.filteredRequest = this.requestsService.orderList(this.filteredRequest);
		this.totalRequest = this.filteredRequest.length;
		this.resetPagination();
	}

	onMyRequestsToggle(myRequests: boolean) {
		this.currentFilters.myRequests = myRequests;
		this.filterRequests(this.currentFilters);
	}

	goTo(path: string) {
		this.requestsService.updateRequestsState({
			selectedFilters: this.currentFilters,
			selectedRequests: this.selectedRequests
		});
		this.router.navigateByUrl(path);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
