import { RequestCheckbooksNewComponent } from 'client/app/app/sidenav/request-checkbooks/request-checkbooks-new/request-checkbooks-new.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRequest, IRequestFilters, makeRequestFilters } from 'client/app/app/models';
import { CONTRAINTS, ITEMS_PER_PAGE, USER_PERMISSIONS } from 'client/app/app/constants';
import { Subscription } from 'rxjs';
import { RequestsService } from 'client/app/app/services/requests.service';
import { Router } from '@angular/router';
import { EnableCheckbookComponent } from 'client/app/app/sidenav/enable-checkbook/enable-checkbook.component';
import { UserService } from 'client/app/app/services/user.service';

@Component({
	selector: 'mcy-checkbooks',
	templateUrl: './checkbooks.component.html',
	styleUrls: ['./checkbooks.component.scss'],
})
export class CheckbooksComponent implements OnInit, OnDestroy {
	public requestOrigin: IRequest[] = [];
	public filteredRequest: IRequest[] = [];
	public filteredCheckbookRequest: IRequest[] = [];
	public paginatedRequestList: IRequest[] = [];
	public paginatedCheckbookRequestList: IRequest[] = [];
	public page = 1;
	public searchFieldLength = CONTRAINTS.REQUESTS.SEARCHFIELD.MAX_LENGTH;
	public subscription: Subscription = new Subscription();
	public loading = false;
	public visibleFilters = false;
	public totalRequest: number = 0;
	public totalCheckbookRequest: number = 0;
	public selectedRequests: IRequest[] = [];

	public requestsFilters: IRequestFilters = makeRequestFilters({
		typeField: 'CHECKBOOK',
		stateField: ['PARTIALLY_AUTHORIZED', 'PENDING_APPROVAL'],
	});
	public checkbooksFilters: IRequestFilters = makeRequestFilters({
		typeField: 'CHECKBOOK',
		stateField: ['AUTHORIZED'],
	});

	constructor(
		private requestsService: RequestsService,
		private router: Router,
		private translateService: TranslateService,
		private sidenavService: SidenavService,
		private userService: UserService
	) { }

	ngOnInit() {
		this.getRequest();
	}
	
	get hasWritePermissions(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.CHECKS.WRITE);
	}

	goToRequestCheckbooks() {
		this.sidenavService.open({
			title: this.translateService.instant('pages.checkbooks.checkbooks.requestNewCheckbook'),
			component: RequestCheckbooksNewComponent
		});
	}

	getRequest() {
		this.subscription.add(this.requestsService
			.getRequestsState()
			.subscribe(state => {
				this.requestOrigin = state.requests;
				this.totalRequest = this.filteredRequest.length;
				this.loading = state.loading;
				if (this.requestOrigin.length) {
					this.selectedRequests = state.selectedRequests;
					this.filterRequests(this.requestsFilters);
					this.filterCheckbooks(this.checkbooksFilters);
				}
				if (!state.searchedRequest && !this.loading) {
					this.requestsService.findRequests();
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
		this.paginatedCheckbookRequestList = this.filteredCheckbookRequest.slice(0, this.page * ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	resetPagination() {
		this.page = 1;
		this.paginatedCheckbookRequestList = [];
		this.setPagination();
	}

	filterRequests(filters: IRequestFilters) {
		this.filteredRequest = this.requestsService.filterRequests(
			this.requestOrigin,
			filters
		);

		this.totalRequest = this.filteredRequest.length;
		this.paginatedRequestList = this.filteredRequest.slice(0, ITEMS_PER_PAGE);
	}

	filterCheckbooks(filters: IRequestFilters) {
		this.filteredCheckbookRequest = this.requestsService.filterRequests(
			this.requestOrigin,
			filters
		);
		this.totalCheckbookRequest = this.filteredCheckbookRequest.length;
		this.setPagination();
	}

	goTo(path: string) {
		this.requestsService.updateRequestsState({
			selectedFilters: this.requestsFilters,
			selectedRequests: this.selectedRequests
		});
		this.router.navigateByUrl(path);
	}

	goToRequestsLanding() {
		this.requestsService.updateRequestsState({
			selectedFilters: this.requestsFilters
		});
		this.router.navigateByUrl('app/requests');
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	enableCheckbook() {
		this.sidenavService.open({
			title: this.translateService.instant('pages.checkbooks.checkbooks.enableCheckbook'),
			component: EnableCheckbookComponent
		})
	}
}
