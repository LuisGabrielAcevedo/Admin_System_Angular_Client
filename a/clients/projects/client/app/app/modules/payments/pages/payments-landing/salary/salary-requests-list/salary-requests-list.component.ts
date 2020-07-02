import { Component, Input } from '@angular/core';
import { IRequest, makeRequestFilters } from 'client/app/app/models';
import { RequestsService } from 'client/app/app/services/requests.service';
import { Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'client/app/app/constants';

@Component({
	selector: 'mcy-salary-requests-list',
	templateUrl: './salary-requests-list.component.html',
	styleUrls: ['./salary-requests-list.component.scss']
})
export class SalaryRequestsListComponent {
	@Input() public selectedRequests: IRequest[] = [];
	@Input() public requests: IRequest[] = [];
	@Input() public defaultFilters = makeRequestFilters({});
	@Input() public totalRequest = 0;

	public itemsPerPage: number = ITEMS_PER_PAGE;

	constructor(
		private requestsService: RequestsService,
		private router: Router
	) {}

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
}
