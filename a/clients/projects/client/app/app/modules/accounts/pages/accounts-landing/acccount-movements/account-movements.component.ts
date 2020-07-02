import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IAccountsFilters } from 'client/app/app/modules/accounts/models/accounts-filters';
import { Subscription } from 'rxjs';
import { isWithinInterval } from 'date-fns';
import { ITEMS_PER_PAGE } from 'client/app/app/constants';
import { IAccountMovement, IAccountMovementState, makeAccountMovementState } from 'client/app/app/modules/accounts/models';
import { MovementsService } from 'client/app/app/services/movements.service';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-account-movements',
	templateUrl: './account-movements.component.html',
	styleUrls: ['./account-movements.component.scss']
})
export class AccountMovementsComponent implements OnChanges, OnInit {
	public filteredAccountMovementsList: IAccountMovement[] = [];
	public subscription: Subscription = new Subscription();
	public loading = false;
	public page = 1;
	public totalAccountsMovements = 0;
	public visibleFilters: boolean = false;
	public movementsState: IAccountMovementState = makeAccountMovementState({});

	constructor(
		private movementService: MovementsService,
		private utilsService: UtilsService,
		private movementsService: MovementsService
	) {}

	ngOnInit() {
		this.subscription.add(this.movementsService.getMovementsState().subscribe(state => {
			this.movementsState = state;
			this.filteredAccountMovementsList = state.movements;
			this.totalAccountsMovements = state.movements.length;
		}));
	}

	showFilters() {
		this.visibleFilters = !this.visibleFilters;
		if (!this.visibleFilters) {
			this.filteredAccountMovementsList = this.movementsState.movements;
			this.totalAccountsMovements = this.filteredAccountMovementsList.length;
			this.resetPagination();
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.movements && changes.movements.currentValue) {
			this.visibleFilters = false;
			this.totalAccountsMovements = this.movementsState.movements.length;
			this.resetPagination();
		}
	}

	get paginatedAccountMovementsList() {
		const offset: number = (this.page - 1) * ITEMS_PER_PAGE;
		return this.filteredAccountMovementsList.slice(0, offset + ITEMS_PER_PAGE);
	}

	changePagination() {
		this.page = this.page + 1;
	}

	resetPagination() {
		this.page = 1;
	}

	filterData(filters: IAccountsFilters) {
		this.filteredAccountMovementsList = this.movementsState.movements.filter(
			movementAccount =>
				this.validateSearchField(movementAccount, filters) &&
				this.validateDateRange(movementAccount, filters)
		);
		this.totalAccountsMovements = this.filteredAccountMovementsList.length;
		this.resetPagination();
	}

	validateSearchField(movementAccount: IAccountMovement, filters: IAccountsFilters): boolean {
		if (movementAccount.description) {
			return this.utilsService.removeSpecialCharater(movementAccount.description)
				.toLocaleLowerCase()
				.includes(this.utilsService.removeSpecialCharater(filters.searchField).toLowerCase());
		} else {
			return false;
		}
	}

	validateDateRange(movementAccount: IAccountMovement, filters: IAccountsFilters): boolean {
		return isWithinInterval(new Date(movementAccount.accountingDate), {
			start: filters.startDate,
			end: filters.endDate
		});
	}

	exportMovements() {
		if(this.movementsState.selectedAccount) {
			this.movementService.exportToCSV(this.filteredAccountMovementsList, this.movementsState.selectedAccount);
		}
	}
}
