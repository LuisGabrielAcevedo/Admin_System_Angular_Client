import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	IUserState,
	makeUserState,
	makeAccountState,
	IAccountState,
	IAccountBalanceByCurrency,
	IAccount,
	makeAccount,
	makeEnterpriseState,
	IEnterpriseState,
	IServiceDebtState,
	makeServiceDebtState,
	IContactState,
	makeContactState
} from 'client/app/app/models';
import { UserService } from 'client/app/app/services/user.service';
import { Subscription } from 'rxjs';
import { AccountService } from 'client/app/app/services/account.service';
import { MovementsService } from 'client/app/app/services/movements.service';
import { IAccountMovement, IAccountMovementState, makeAccountMovementState } from 'client/app/app/modules/accounts/models';
import { ITEMS_PER_SMALL_PAGE, ITEMS_PER_PAGE } from 'client/app/app/constants';
import { ServiceDebtService } from 'client/app/app/services/service-debt.service';
import { ContactService } from 'client/app/app/services/contact.service';

@Component({
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy {
	public userState: IUserState = makeUserState({});
	public enterpriseState: IEnterpriseState = makeEnterpriseState({});
	public accountState: IAccountState = makeAccountState({});
	public movementsState: IAccountMovementState = makeAccountMovementState({});
	public subscription: Subscription = new Subscription();
	public selectedAccount: IAccount= makeAccount({});
	public movements: IAccountMovement[] = [];
	public movementsDisplayed: number = ITEMS_PER_SMALL_PAGE;
	public movementsLoading: boolean = true;
	public serviceDebtsState: IServiceDebtState = makeServiceDebtState({});
	public contactState: IContactState = makeContactState({});

	constructor(
		private userService: UserService,
		private accountService: AccountService,
		private movementsService: MovementsService,
		private serviceDebtService: ServiceDebtService,
		private contactService: ContactService,
	) { }

	ngOnInit() {
		this.subscription.add(this.userService.getUserState().subscribe(state => {
			this.userState = state;
			if (!state.searchedUser && !this.userState.isLoading) {
				this.userService.findUser();
			}
		}));

		this.subscription.add(this.userService.getEnterpriseState().subscribe(state => {
			this.enterpriseState = state;
			if (!state.searchedEnterprises && !this.enterpriseState.isLoading) {
				this.userService.findUser();
			}
		}));

		this.accountService.findAccounts();

		this.subscription.add(this.accountService.getAccountState().subscribe(state => {
			this.accountState = state;
		}));

		this.subscription.add(this.movementsService.getMovementsState().subscribe(state => {
			this.movementsState = state;
		}));

		this.subscription.add(
			this.serviceDebtService.getServiceDebtState().subscribe(state => {
				this.serviceDebtsState = state;
				if (!state.searchedDebts && !this.serviceDebtsState.loading) {
					this.serviceDebtService.findServiceDebts();
				}
			})
		);

		this.subscription.add(this.contactService.getContactState().subscribe(state => {
			this.contactState = state;
			if (!state.searchedContacts && !this.contactState.loading) {
				this.contactService.findContacts();
			}
		}));
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	get totalBalanceByCurrency(): IAccountBalanceByCurrency[] {
		return this.accountService.totalBalanceByCurrency;
	}

	changeAccount(account: IAccount) {
		this.selectedAccount = account;
		this.movementsService.findMovements(this.selectedAccount).subscribe((isSuccess) => {
			if(isSuccess) {
				this.movements = this.movementsState.movements.slice(0, this.movementsDisplayed);
			}
		});
	}

	onSubmit() {
		if(this.userState.hasUserErrors) {
			this.userService.findUser();
		};
		if (this.accountState.hasErrorAccounts) {
			this.accountService.findAccounts();
		};
	}

	onSubmitMovements() {
		this.changeAccount(this.selectedAccount);
	}

	onSubmitDebts() {
		this.serviceDebtService.findServiceDebts();
	}

	get favoriteContacts() {
		return this.contactState.contacts.filter(contact => contact.favorite === true).slice(0, ITEMS_PER_PAGE);
	}

	onSubmitContacts() {
		this.contactService.findContacts();
	}
}
