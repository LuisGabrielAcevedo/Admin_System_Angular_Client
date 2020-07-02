import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
	IServiceDebt,
	makeService,
	makeServiceCategory,
	makeServicePaymentFormValue,
	IServiceDebtState,
	makeServiceDebtState,
	IServiceCategory,
	IServicesResponse,
	IService
} from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { ServiceDebtService } from 'client/app/app/services/service-debt.service';
import { IPaymentFilters } from 'client/app/app/modules/payments/models/payments-filters';
import { isWithinInterval } from 'date-fns';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ITEMS_PER_PAGE, CONTRAINTS, USER_PERMISSIONS } from 'client/app/app/constants';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UserService } from 'client/app/app/services/user.service';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServiceCategoryService } from 'client/app/app/services/service-category.service';
import { ServiceService } from 'client/app/app/services/service.service';

@Component({
	selector: 'mcy-service',
	templateUrl: './service.page.html',
	styleUrls: ['./service.page.scss']
})
export class ServiceComponent implements OnInit, OnDestroy {
	public debtsListOrigin: IServiceDebt[] = [];
	public filteredDebtsList: IServiceDebt[] = [];
	public paginatedDebtsList: IServiceDebt[] = [];
	public searchFieldLength = CONTRAINTS.PAYMENTS.SEARCHFIELD.MAX_LENGTH;
	public totalServicesSoonExpired = 0;
	public searchKeyword: string = '';
	public visibleFilters: boolean = false;
	public loading: boolean = false;
	public page = 1;
	public serviceDebtsState: IServiceDebtState = makeServiceDebtState({});
	public categories: IServiceCategory[] = [];
	subscription = new Subscription();
	constructor(
		private router: Router,
		private serviceDebtService: ServiceDebtService,
		private translateService: TranslateService,
		private sidenavService: SidenavService,
		private utilsService: UtilsService,
		private userService: UserService,
		private servicePaymentService: ServicePaymentService,
		private serviceCategoryService: ServiceCategoryService,
		private serviceServices: ServiceService
	) {}

	ngOnInit() {
		this.getServiceDebt();
		this.subscription.add(this.sidenavService.reloadBackPageEvent.subscribe(() => this.reloadServiceDebts()));
		this.subscription.add(
			this.serviceCategoryService.getServiceCategoryState().subscribe(state => {
				this.categories = state.categories;
				if (!state.searchedCategories && !state.loading) {
					this.serviceCategoryService.findServiceCategories();
				}
			})
		)
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	goToServicePaymentHistory() {
		this.router.navigateByUrl('app/payments/service/history');
	}

	showFilters() {
		this.visibleFilters = !this.visibleFilters;
		if (!this.visibleFilters) {
			this.filteredDebtsList = this.debtsListOrigin;
			this.totalServicesSoonExpired = this.filteredDebtsList.length;
			this.resetPagination();
		}
	}

	getServiceDebt() {
		this.serviceDebtService.findServiceDebts();
		this.subscription.add(
			this.serviceDebtService.getServiceDebtState().subscribe(state => {
				this.serviceDebtsState = state;
				this.filteredDebtsList = state.debts;
				this.debtsListOrigin = state.debts;
				this.setPagination();
				this.totalServicesSoonExpired = this.filteredDebtsList.length;
			})
		);
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.SERVICE_PAYMENT.WRITE);
	}

	reloadServiceDebts() {
		this.serviceDebtService.findServiceDebts();
	}

	setPagination() {
		this.paginatedDebtsList = this.filteredDebtsList.slice(0, this.page * ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	resetPagination() {
		this.page = 1;
		this.paginatedDebtsList = [];
		this.setPagination();
	}

	filterData(filters: IPaymentFilters) {
		this.searchKeyword = filters.searchField.toLowerCase();
		this.filteredDebtsList = this.debtsListOrigin.filter(
			service =>
			this.utilsService.removeSpecialCharater(service.description)
			.toLowerCase()
			.includes(this.utilsService.removeSpecialCharater(this.searchKeyword)) &&
				isWithinInterval(new Date(service.expirationDate), {
					start: filters.startDate,
					end: filters.endDate
				})
		);
		this.filteredDebtsList = this.orderList(this.filteredDebtsList);
		this.totalServicesSoonExpired = this.filteredDebtsList.length;
		this.resetPagination();
	}

	orderList(service: IServiceDebt[]) {
		const listOrdered = service.sort((oneService, otherService) => {
			if (oneService.expirationDate > otherService.expirationDate) {
				return 1;
			} else {
				return -1;
			}
		});
		return listOrdered;
	}

	newPay() {
		this.servicePaymentService.updateServicePaymentState({
			newServicePaymentFormValue: makeServicePaymentFormValue({})
		});
		this.router.navigateByUrl('app/payments/service/debt');
	}

	payServiceDebt(debt: IServiceDebt) {
		const serviceCategory: IServiceCategory | undefined = this.categories.find(category => category.id === debt.categoryId);
		if (serviceCategory) {
			this.subscription.add(
				this.serviceServices.getServices(serviceCategory.id).subscribe(
					(resp: IServicesResponse) => {
						const serviceService: IService | undefined = resp.data.find(service => service.id === debt.serviceId);
						if (serviceService) {
							this.servicePaymentService.updateServicePaymentState({
								newServicePaymentFormValue: makeServicePaymentFormValue({
									debt,
									banelcoClientId: debt.banelcoClientId,
									category: makeServiceCategory({
										id: serviceCategory.id,
										description: serviceCategory.description
									}),
									service: makeService({
										id: serviceService.id,
										description: serviceService.description
									}),
									fromDebts: true
								})
							});
							this.router.navigateByUrl('app/payments/service/debt');
						}
					}
				)
			);
		}
	}

	get emptyMessage() {
		return this.debtsListOrigin.length
			? this.translateService.instant(
					'pages.payments.debtsList.emptyDebtsMessage'
			)
			: this.translateService.instant(
					'pages.payments.debtsList.emptySearchDebtsMessage'
			);
	}

	onSubmitDebts() {
		this.serviceDebtService.findServiceDebts();
	}
}
