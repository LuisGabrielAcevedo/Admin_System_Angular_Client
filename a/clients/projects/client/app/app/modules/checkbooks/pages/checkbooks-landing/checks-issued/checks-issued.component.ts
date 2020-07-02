import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IAccount, ICheckIssued, ICheckState, makeCheckState, makeChecksIssuedStates } from 'client/app/app/models';
import { ChecksService } from 'client/app/app/services/checks.service';
import { Subscription } from 'rxjs';
import { IChecksFilters } from 'client/app/app/modules/checkbooks/models/checks-filters';
import { isWithinInterval } from 'date-fns';
import { ITEMS_PER_PAGE } from 'client/app/app/constants';
import { TranslateService } from '@ngx-translate/core';
import { IApiStatusResponse } from '@mcy/core/interfaces/api.interfaces';

@Component({
	selector: 'mcy-checks-issued',
	templateUrl: './checks-issued.component.html',
	styleUrls: ['./checks-issued.component.scss'],
})
export class ChecksIssuedComponent implements OnInit, OnDestroy {
	@Input() public accountList: IAccount[] = [];

	private errorStatus: IApiStatusResponse[] = [];
	private errorStates: string[] = makeChecksIssuedStates();
	public generalErrorMessage: string = '';
	public errorMessages: string[] = [];
	public state: ICheckState = makeCheckState({});
	public subscription: Subscription = new Subscription();
	public checksIssuedOrigin: ICheckIssued[] = [];
	public filteredChecksIssued: ICheckIssued[] = [];
	public paginatedChecksIssued: ICheckIssued[]= [];
	public loading = false;
	public showFilters = false;
	public page = 1;
	public labelFilters = '';
	public selectedAccount: IAccount | null = null;
	public hasAccountSelected: boolean = false;

	constructor(
		private checksService: ChecksService,
		private translateService: TranslateService
	) {}

	accountSelected(account: IAccount) {
		this.selectedAccount = account;
		this.hasAccountSelected = true;
		this.checksService.findChecksIssued(account);
	}

	ngOnInit() {
		this.getChecks();
		this.generalErrorMessage = this.translateService.instant('pages.checkbooks.errors.issued.generalError');
		this.labelFilters = this.translateService.instant('pages.checkbooks.checksIssued.filters.showFilters');
	}

	toggle() {
		this.showFilters = !this.showFilters;
		this.labelFilters = this.translateService.instant('pages.checkbooks.checksIssued.filters.hiddenFilters');
		if (!this.showFilters) {
			this.filteredChecksIssued = this.checksIssuedOrigin;
			this.resetPagination();
			this.labelFilters = this.translateService.instant('pages.checkbooks.checksIssued.filters.showFilters');
		}
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	getChecks() {
		this.subscription.add(this.checksService.getCheckState().subscribe(state => {
			this.clear();
			this.state = state;
			this.checkErrorStatus();
			this.checksIssuedOrigin = state.checksIssued;
			this.filteredChecksIssued = this.orderList(this.checksIssuedOrigin);
			this.loading = state.loadingChecksIssued;
			this.setPagination();
		}))
	}

	checkErrorStatus() {
		if (this.state.warningChecksIssuedList.length) {
			this.state.warningChecksIssuedList.forEach(message => this.errorMessages.push(message));
		};
	}

	get hasGeneralError(): boolean {
		return this.errorStatus.length >= this.errorStates.length;
	}

	retry() {
		this.loading = true;
		this.errorMessages = [];
		this.accountSelected(this.selectedAccount!);
	}

	clear() {
		this.errorMessages = [];
		this.checksIssuedOrigin = [];
		this.filteredChecksIssued = [];
		this.paginatedChecksIssued = [];
		this.resetPagination();
		this.loading = false;
		this.showFilters = false;
	}

	setPagination() {
		this.paginatedChecksIssued = this.filteredChecksIssued.slice(0, this.page * ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	resetPagination() {
		this.page = 1;
		this.paginatedChecksIssued = [];
		this.setPagination();
	}

	sendFilters(filters: IChecksFilters) {
		this.filteredChecksIssued = this.checksIssuedOrigin.filter(
			check =>
				this.validateNumberOrAmount(check, filters) &&
				this.validateState(check, filters) &&
				this.validateDateRange(check, filters)
		);
		this.filteredChecksIssued = this.orderList(this.filteredChecksIssued);
		this.resetPagination();
	}

	validateDateRange(
		check: ICheckIssued,
		filters: IChecksFilters
	): boolean {
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

	validateNumberOrAmount(
		check: ICheckIssued,
		filters: IChecksFilters
	) {
		if (check.number || check.amount) {
			return check.number.includes(filters.searchField)
			|| String(check.amount).includes(filters.searchField);
		} else {
			return false
		}
	}

	validateState(check: ICheckIssued, filters: IChecksFilters): boolean {
		if (filters.stateField && filters.stateField.length) {
			return filters.stateField.includes(check.state || '');
		} else {
			return true;
		}
	}

	orderList(checks: ICheckIssued[]) {
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
}
