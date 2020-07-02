import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { Subscription } from 'rxjs';
import { ITransfer, IRequestFilters, makeRequestFilters, IRequest, IRequestState, makeRequestState } from 'client/app/app/models';
import { IPaymentFilters } from 'client/app/app/modules/payments/models/payments-filters';
import { isWithinInterval } from 'date-fns';
import { ITEMS_PER_PAGE, USER_PERMISSIONS } from 'client/app/app/constants';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { RequestsService } from 'client/app/app/services/requests.service';
import { UserService } from 'client/app/app/services/user.service';
import { ISalaryPaymentState, makeSalaryPaymentState } from 'client/app/app/modules/payments/models/salary-payment';

@Component({
	selector: 'mcy-salary',
	templateUrl: './salary.page.html',
	styleUrls: ['./salary.page.scss']
})
export class SalaryComponent implements OnInit {
	public filteredSalaryPayments: ITransfer[] = [];
	public subscription: Subscription = new Subscription();
	public paginatedSalaryPaymentsList: ITransfer[] = [];
	public page = 1;
	public totalSalariesSoonExpired = 0;
	public visibleFilters: boolean = false;
	public salaryPaymentState: ISalaryPaymentState = makeSalaryPaymentState({});
	public requestsState: IRequestState = makeRequestState({});
	public requestsFilters = makeRequestFilters({
		typeField: 'SALARY_PAYMENT',
		stateField: [
			'PENDING_APPROVAL' ,
			'PARTIALLY_AUTHORIZED'
		]
	});
	public scheduledRequestsFilters = makeRequestFilters({
		scheduledField: 'SALARY_PAYMENT'
	});
	public filteredRequest: IRequest[] = [];
	public filteredScheduledRequests: IRequest[] = [];
	public filteredRequestBySizePage: IRequest[] = [];
	public selectedRequests: IRequest[] = [];
	public totalRequest = 0;

	constructor (
		private salaryPaymentService: SalaryPaymentService,
		private requestsService: RequestsService,
		private router: Router,
		private utilsService: UtilsService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.salaryPaymentService.findSalaryPayments();
		this.subscription.add(
			this.salaryPaymentService
			.getSalaryPaymentState()
			.subscribe(state => {
				this.salaryPaymentState = state;
				this.filteredSalaryPayments = this.orderList(state.salaryPayments);
				this.totalSalariesSoonExpired = this.filteredSalaryPayments.length;
				this.setPagination();
			})
		);

		this.subscription.add(
			this.requestsService
			.getRequestsState()
			.subscribe(state => {
				this.requestsState = state;
				this.selectedRequests = state.selectedRequests;
				this.filterRequests(this.requestsFilters);
				this.filterScheduledRequests(this.scheduledRequestsFilters);
			})
		)
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.SALARY_PAYMENT.WRITE);
	}

	filterRequests(filters: IRequestFilters) {
		this.filteredRequest = this.requestsService.filterRequests(
			this.requestsState.requests,
			filters
		);
		this.totalRequest = this.filteredRequest.length;
		this.filteredRequestBySizePage = this.filteredRequest.slice(0, ITEMS_PER_PAGE);
	}

	filterScheduledRequests(filters: IRequestFilters) {
		this.filteredScheduledRequests = this.requestsService.filterRequests(
			this.requestsState.requests,
			filters
		);
	}

	showFilters() {
		this.visibleFilters = !this.visibleFilters;
		if(!this.visibleFilters) {
			this.filteredSalaryPayments = this.salaryPaymentState.salaryPayments;
			this.totalSalariesSoonExpired = this.filteredSalaryPayments.length;
			this.resetPagination();
		}
	}

	goToNewSalaryPayment() {
		this.router.navigateByUrl('app/payments/salary');
	}

	setPagination() {
		this.paginatedSalaryPaymentsList = this.filteredSalaryPayments.slice(0, this.page * ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	resetPagination() {
		this.page = 1;
		this.paginatedSalaryPaymentsList = [];
		this.setPagination();
	}

	filterData(filters: IPaymentFilters) {
		this.filteredSalaryPayments = this.salaryPaymentState.salaryPayments.filter(
			service =>
				this.validateState(service, filters) &&
				this.validateSearchField(service, filters) &&
				this.validateDateRange(service, filters)
		);
		this.filteredSalaryPayments = this.orderList(this.filteredSalaryPayments);
		this.totalSalariesSoonExpired = this.filteredSalaryPayments.length;
		this.resetPagination();
	}

	validateState(service: ITransfer, filters: IPaymentFilters): boolean {
		if (service.state) {
			return service.state.includes(filters.state || '');
		} else {
			return false;
		}
	}

	validateSearchField(
		service: ITransfer,
		filters: IPaymentFilters
	): boolean {
		if (service.destinationHolder) {
			return this.utilsService.removeSpecialCharater(service.destinationHolder)
				.toLocaleLowerCase()
				.includes(this.utilsService.removeSpecialCharater(filters.searchField).toLowerCase());
		} else {
			return false;
		}
	}

	validateDateRange(
		service: ITransfer,
		filters: IPaymentFilters
	): boolean {
		if (service.date) {
			return isWithinInterval(new Date(service.date), {
				start: filters.startDate,
				end: filters.endDate
			});
		} else {
			return false;
		}
	}

	orderList(service: ITransfer[]) {
		const listOrdered = service.sort((oneService, otherService) => {
			if (otherService.date > oneService.date) {
				return 1;
			} else {
				return -1;
			}
		});
		return listOrdered;
	}

	exportServiceList() {
		this.salaryPaymentService.exportToCSV(this.filteredSalaryPayments);
	}

	onSubmitSalaryPayment() {
		this.salaryPaymentService.findSalaryPayments();
	}

	onSubmitRequest() {
		this.requestsService.findRequests();
	}
}
