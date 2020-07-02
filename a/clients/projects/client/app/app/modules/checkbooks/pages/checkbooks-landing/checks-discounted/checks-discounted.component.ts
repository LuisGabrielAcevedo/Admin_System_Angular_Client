import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICheckDiscounted, makeCheckState, ICheckState } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { CONTRAINTS, ITEMS_PER_PAGE } from 'client/app/app/constants';
import { TranslateService } from '@ngx-translate/core';
import { ChecksService } from 'client/app/app/services/checks.service';
import { IChecksFilters } from 'client/app/app/modules/checkbooks/models/checks-filters';
import { isWithinInterval } from 'date-fns';

@Component({
	selector: 'mcy-checks-discounted',
	templateUrl: './checks-discounted.component.html',
	styleUrls: ['./checks-discounted.component.scss']
})
export class ChecksDiscountedComponent implements OnInit, OnDestroy{

	public state: ICheckState = makeCheckState({});
	public generalErrorMessage: string = '';
	public subscription = new Subscription();
	public checksDiscountedOrigin: ICheckDiscounted[] = [];
	public filteredCheckDiscounted: ICheckDiscounted[] = [];
	public paginatedChecksDiscounted: ICheckDiscounted[] = [];
	public page = 1;
	public searchNumber: number = 0;
	public searchFieldLength = CONTRAINTS.REQUESTS.SEARCHFIELD.MAX_LENGTH;
	public visibleFilters = false;
	public labelShowFilter: string = '';
	public totalChecksDiscounted: number = 0;

	constructor(
		private translateService: TranslateService,
		private checksService: ChecksService,
	) { }

	ngOnInit() {
		this.getCheksDiscounted();
		this.generalErrorMessage = this.translateService.instant('pages.checkbooks.errors.discounted.generalError');
		this.labelShowFilter = this.translateService.instant('pages.checkbooks.checksDiscounted.filters.showFilters');
	};

	get titleAccounts(){
		return this.translateService.instant('pages.checkbooks.checksDiscounted.title');
	}

	getCheksDiscounted() {
		this.subscription.add(
			this.checksService.getCheckState().subscribe(state => {
				this.clear();
				this.state = state;
				if (!state.searchedChecksDiscounted && !this.state.loadingChecksDiscounted) {
					this.checksService.findChecksDiscounted();
				} else {
					this.checksDiscountedOrigin = state.checksDiscounted;
					this.filteredCheckDiscounted = this.orderList(this.checksDiscountedOrigin);
					this.totalChecksDiscounted = this.checksDiscountedOrigin.length;
					this.setPagination();
				}
			})
		);
	}

	onSubmitChecksDiscounted() {
		this.checksService.findChecksDiscounted();
	}

	showFilters() {
		this.visibleFilters = !this.visibleFilters;
		if (!this.visibleFilters) {
			this.filteredCheckDiscounted = this.orderList(this.checksDiscountedOrigin);
			this.totalChecksDiscounted = this.filteredCheckDiscounted.length;
			this.resetPagination();
			this.labelShowFilter = this.translateService.instant('pages.checkbooks.checksDiscounted.filters.showFilters')
		}else{
			this.labelShowFilter = this.translateService.instant('pages.checkbooks.checksDiscounted.filters.hiddenFilters');
		}
	}

	retry() {
		this.checksService.findChecksDiscounted();
	}

	clear() {
		this.checksDiscountedOrigin = [];
		this.filteredCheckDiscounted = [];
		this.paginatedChecksDiscounted = [];
		this.resetPagination();
		this.visibleFilters = false;
	}

	setPagination() {
		this.paginatedChecksDiscounted = this.filteredCheckDiscounted.slice(0, this.page * ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
		this.setPagination();
	}

	resetPagination() {
		this.page = 1;
		this.paginatedChecksDiscounted = [];
		this.setPagination();
	}

	filterData(filters: IChecksFilters) {
		this.filteredCheckDiscounted = this.checksDiscountedOrigin.filter(
			check =>
			(check.number
			.includes(filters.searchField) || String(check.amount)
			.includes(filters.searchField)) &&
				isWithinInterval(new Date(check.accreditationDate), {
					start: filters.startDate,
					end: filters.endDate
				}
			)
		);
		this.filteredCheckDiscounted = this.orderList(this.filteredCheckDiscounted);
		this.totalChecksDiscounted = this.filteredCheckDiscounted.length;
		this.resetPagination();
	}

	orderList(check: ICheckDiscounted[]) {
		const listOrdered = check.sort((oneCheck, otherCheck) => {
			if (oneCheck.accreditationDate > otherCheck.accreditationDate) {
				return -1;
			} else {
				return 1;
			}
		});
		return listOrdered;
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	};

}
