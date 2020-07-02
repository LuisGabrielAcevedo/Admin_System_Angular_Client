import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'backoffice/src/app/services/user.service';
import { IUserState, makeUserState, IUserEnterprise } from 'backoffice/src/app/models/user';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ITEMS_PER_PAGE } from 'backoffice/src/app/constants';
import { Router } from '@angular/router';

@Component({
	selector: 'mcy-user-details',
	templateUrl: './user-details.page.html',
	styleUrls: ['./user-details.page.scss']
})
export class UserDetailsPage implements OnInit, OnDestroy  {
	public userState: IUserState = makeUserState({});
	public subscription = new Subscription();
	public enterpriseListTableSource = new MatTableDataSource<IUserEnterprise>([]);
	public displayedColumns: string[] = [
		'favorite',
		'name',
		'cuilt',
		'role'
	];
	public itemsDisplayed: number = ITEMS_PER_PAGE;
	public totalEnterprisesToDisplay: IUserEnterprise[] = [];

	constructor(
		private userService: UserService,
		private router: Router
	) {	}

	get fullName(): string {
		return `${this.userState.userSelected.firstName} ${this.userState.userSelected.lastName}`
	}

	get enterprisesShowed(): number {
		return this.userState.userSelected.enterprises.length;
	}

	ngOnInit() {
		this.subscription.add(this.userService.getUserState().subscribe((state) => {
			this.userState = state;
			if (!state.searchedUserDetails && !this.userState.loadingUserDetails) {
				this.onSubmit();
			}
		}));
	}

	showMoreEnterprises() {
		this.itemsDisplayed =  this.itemsDisplayed + ITEMS_PER_PAGE;
		this.enterpriseListTableSource.data = this.totalEnterprisesToDisplay.slice(0, this.itemsDisplayed);
	}

	goToHome() {
		this.router.navigate(['home']);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.subscription.add(this.userService.findUser(this.userState.userSelected.username).subscribe((success) => {
			if(success) {
				this.enterpriseListTableSource.data = this.userState.userSelected.enterprises.slice(0, this.itemsDisplayed);
				this.totalEnterprisesToDisplay = this.userState.userSelected.enterprises;
			}
		}));
	}
}
