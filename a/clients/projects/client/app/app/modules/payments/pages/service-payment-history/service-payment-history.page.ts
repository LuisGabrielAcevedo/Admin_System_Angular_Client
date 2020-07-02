import { Component, OnInit, OnDestroy } from '@angular/core';
import { IServicePayment, IRequest, IRequestFilters, makeRequestFilters } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { IPaymentFilters } from 'client/app/app/modules/payments/models/payments-filters';
import { isWithinInterval } from 'date-fns';
import { Router } from '@angular/router';
import { CONTRAINTS, ITEMS_PER_PAGE } from 'client/app/app/constants';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { RequestsService } from 'client/app/app/services/requests.service';

@Component({
	selector: 'mcy-service-payment-history',
	templateUrl: './service-payment-history.page.html',
	styleUrls: ['./service-payment-history.page.scss']
})
export class ServicePaymentHistoryComponent implements OnInit, OnDestroy {
	public servicePaymentsOrigin: IRequest[] = [];
	public filteredServicePayments: IRequest[] = [];
	public paginatedHistoryList: IRequest[] = [];
	public page = 1;
	public searchFieldLength = CONTRAINTS.PAYMENTS.SEARCHFIELD.MAX_LENGTH;
	public subscription: Subscription = new Subscription();
	public loading = false;
	public visibleFilters = false;
	public totalHistoryService: number = 0;
	public servicePaymentRequestFilters: IRequestFilters = makeRequestFilters({
		typeField: 'SERVICE_PAYMENT',
		stateField: ['AUTHORIZED']
	});
	constructor(
		private utilsService: UtilsService,
		private servicePaymentService: ServicePaymentService,
		private router: Router,
		private requestsService: RequestsService,
	) {}

	ngOnInit() {
		this.getServicePayments();
	}

	getServicePayments() {
		this.subscription.add(
			this.requestsService.getRequestsState().subscribe(state => {
				this.servicePaymentsOrigin = this.requestsService.filterRequests(state.requests, this.servicePaymentRequestFilters);
				this.filteredServicePayments = this.orderList(this.servicePaymentsOrigin);
				this.totalHistoryService = this.servicePaymentsOrigin.length;
				this.loading = state.loading;
				this.setPagination();
				if (!state.searchedRequest && !this.loading) {
					this.requestsService.findRequests();
				}
			})
		);
	}

	newPay() {
		this.router.navigateByUrl('app/payments/service/debt');
	}

	showFilters() {
		this.visibleFilters = !this.visibleFilters;
		if (!this.visibleFilters) {
			this.filteredServicePayments = this.servicePaymentsOrigin;
			this.totalHistoryService = this.filteredServicePayments.length;
			this.resetPagination();
		}
	}

	setPagination() {
		this.paginatedHistoryList = this.filteredServicePayments.slice(0, this.page * ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	resetPagination() {
		this.page = 1;
		this.paginatedHistoryList = [];
		this.setPagination();
	}

	filterData(filters: IPaymentFilters) {
		this.filteredServicePayments = this.servicePaymentsOrigin.filter(
			service =>
				this.validateState(service, filters) &&
				this.validateSearchField(service, filters) &&
				this.validateDateRange(service, filters)
		);
		this.filteredServicePayments = this.orderList(this.filteredServicePayments);
		this.totalHistoryService = this.filteredServicePayments.length;
		this.resetPagination();
	}

	validateState(service: IRequest, filters: IPaymentFilters): boolean {
		if (service.content.state) {
			return service.content.state.includes(filters.state || '');
		} else {
			return false;
		}
	}

	validateSearchField(
		service: IRequest,
		filters: IPaymentFilters
	): boolean {
		if (service.detail) {
			return this.utilsService.removeSpecialCharater(service.detail)
				.toLocaleLowerCase()
				.includes(this.utilsService.removeSpecialCharater(filters.searchField).toLowerCase()) ;
		} else {
			return false;
		}
	}

	validateDateRange(
		service: IRequest,
		filters: IPaymentFilters
	): boolean {
		if (service.content.date) {
			return isWithinInterval(new Date(service.content.date), {
				start: filters.startDate,
				end: filters.endDate
			});
		} else {
			return false;
		}
	}

	orderList(service: IRequest[]) {
		const listOrdered = service.sort((oneService, otherService) => {
			if (oneService.content.date && otherService.content.date) {
				if (oneService.content.date > otherService.content.date) {
					return -1;
				} else {
					return 1;
				}
			} else {
				return 0;
			}
		});
		return listOrdered;
	}

	goToLanding() {
		this.router.navigateByUrl('app/payments');
	}

	exportServiceList() {
		const servicePayment: IServicePayment[] = this.filteredServicePayments.map(service => service.content as IServicePayment);
		this.servicePaymentService.exportToCSV(servicePayment);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
