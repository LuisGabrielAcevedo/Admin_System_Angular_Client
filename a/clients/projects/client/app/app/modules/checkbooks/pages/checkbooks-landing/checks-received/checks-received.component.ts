import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { IAccount, ICheckReceived, ICheckState, makeCheckState } from 'client/app/app/models';
import { ITEMS_PER_PAGE } from 'client/app/app/constants';
import { Subscription } from 'rxjs';
import { ChecksService } from 'client/app/app/services/checks.service';
import { TranslateService } from '@ngx-translate/core';
import { IChecksFilters } from 'client/app/app/modules/checkbooks/models/checks-filters';
import { isWithinInterval } from 'date-fns';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { makeChecksReceivedStates } from 'client/app/app/models/check';
import { IApiStatusResponse } from '@mcy/core/interfaces/api.interfaces';

@Component({
	selector: 'mcy-checks-received',
	templateUrl: './checks-received.component.html',
	styleUrls: ['./checks-received.component.scss'],
})
export class ChecksReceivedComponent implements OnInit, OnDestroy {
	@Input() public accountList: IAccount[] = [];
	private checksOrigin: ICheckReceived[] = [];
	private subscription: Subscription = new Subscription();
	private errorStatus: IApiStatusResponse[] = [];
	private errorStates: string[] = makeChecksReceivedStates();
	public state: ICheckState = makeCheckState({});
	public errorMessages: string[] = [];
	public generalErrorMessage: string = '';
	public originalChecksFilteredByType: ICheckReceived[] = [];
	public paginatedChecksList: ICheckReceived[] = [];
	public page = 1;
	public loading: boolean = false;
	public hasAccountSelected: boolean = false;
	public selectedAccount: IAccount | null = null;
	public visibleFilters: boolean = false;
	public totalChecks: number = 0;
	public accountSelectorTitle: string = '';
	public emptyMessage: string = '';
	public labelShowFilter: string = '';

	constructor(
		private checksService: ChecksService,
		private translateService: TranslateService,
		private utilsService: UtilsService,
	) { }

	ngOnInit() {
		this.getChecksReceived();
		this.generalErrorMessage = this.translateService.instant('pages.checkbooks.errors.received.generalError');
		this.labelShowFilter = this.translateService.instant('pages.checkbooks.received.filters.showFilters');
	}

	setPagination() {
		this.paginatedChecksList = this.originalChecksFilteredByType.slice(0, this.page * ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	resetPagination() {
		this.page = 1;
		this.paginatedChecksList = [];
		this.totalChecks = this.originalChecksFilteredByType.length;
		this.setPagination();
	}

	showFilters() {
		this.visibleFilters = !this.visibleFilters;
		this.setLabelShowFilter();
		if (!this.visibleFilters) {
			this.originalChecksFilteredByType = this.checksOrigin;
			this.totalChecks = this.originalChecksFilteredByType.length;
			this.resetPagination();
		}
	}

	getChecksReceived() {
		this.subscription.add(
			this.checksService.getCheckState().subscribe(state => {
				this.clear();
				this.state = state;
				this.checkErrorStatus();
				this.checksOrigin = state.checksReceived;
				this.loading = state.loadingChecksReceived;
				this.originalChecksFilteredByType = this.orderList(this.checksOrigin);
				this.totalChecks = this.checksOrigin.length;
				this.setPagination();
		}));
	}

	checkErrorStatus() {
		if (this.state.warningChecksReceivedList.length) {
			this.state.warningChecksReceivedList.forEach(message => this.errorMessages.push(message));
		};
	}

	get hasGeneralError(): boolean {
		return this.errorStatus.length >= this.errorStates.length;
	}

	retry() {
		this.loading = true;
		this.generalErrorMessage = '';
		this.errorMessages = [];
		this.accountSelected(this.selectedAccount!);
	}

	accountSelected(account: IAccount) {
		this.hasAccountSelected = true;
		this.selectedAccount = account;
		this.checksService.findChecksReceived(account);
	}

	filterChecks(filters: IChecksFilters) {
		this.originalChecksFilteredByType = this.checksOrigin.filter(
			check =>
				this.validateSearchField(check, filters) &&
				this.validateDateRange(check, filters) &&
				this.validateState(check, filters)
		);
		this.originalChecksFilteredByType = this.orderList(this.originalChecksFilteredByType);
		this.resetPagination();
	}

	validateSearchField(check: ICheckReceived, filters: IChecksFilters): boolean {
		const searchText: string = this.utilsService.removeSpecialCharater(filters.searchField.toString()).toLocaleLowerCase();

		if (searchText) {
			return (
				check.number.includes(searchText) ||
				check.amount.toString().includes(searchText)
			);
		} else {
			return true;
		}
	}

	validateDateRange(check: ICheckReceived, filters: IChecksFilters): boolean {
		if (check.accreditationDate) {
			return isWithinInterval(new Date(check.accreditationDate), {
				start: filters.startDate,
				end: filters.endDate
			});
		} else if (check.rejectionDate) {
			return isWithinInterval(new Date(check.rejectionDate), {
				start: filters.startDate,
				end: filters.endDate
			});
		} else {
			return true;
		}
	}

	validateState(check: ICheckReceived, filters: IChecksFilters): boolean {
		if (filters.stateField && filters.stateField.length) {
			return filters.stateField.includes(check.state || '');
		} else {
			return true;
		}
	}

	setLabelShowFilter() {
		this.labelShowFilter = this.visibleFilters ?
			this.translateService.instant('pages.checkbooks.received.filters.hiddenFilters') :
			this.translateService.instant('pages.checkbooks.received.filters.showFilters');
	}

	clear() {
		this.generalErrorMessage = '';
		this.errorMessages = [];
		this.checksOrigin = [];
		this.originalChecksFilteredByType = [];
		this.paginatedChecksList = [];
		this.page = 1;
		this.loading = false;
		this.visibleFilters = false;
		this.setLabelShowFilter();
	}

	orderList(checks: ICheckReceived[]) {
		const listOrdered = checks.sort((oneService, otherService) => {
			if (oneService.accreditationDate && otherService.accreditationDate) {
				if (oneService.accreditationDate > otherService.accreditationDate) {
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

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
