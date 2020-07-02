import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { CONSTRAINTS, ITEMS_PER_PAGE } from 'backoffice/src/app/constants';
import { UserService } from 'backoffice/src/app/services/user.service';
import { IUserState, makeUserState, IUser } from 'backoffice/src/app/models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'mcy-landing-users-tab',
	templateUrl: './users-tab.component.html',
	styleUrls: ['./users-tab.component.scss']
})
export class LandingUsersTabComponent implements OnInit, OnDestroy {
	public userState: IUserState = makeUserState({});
	public subscription = new Subscription();
	public form: FormGroup = new FormGroup({});
	public searchKeywordValidators: ValidatorFn[] = [
		Validators.required,
		Validators.pattern(CONSTRAINTS.DOCUMENTS.PATTERN)
	];
	public usersListTableSource = new MatTableDataSource<IUser>([]);
	public displayedColumns: string[] = [
		'name',
		'document',
		'cellphone',
		'email',
		'icon'
	];
	public itemsDisplayed: number = ITEMS_PER_PAGE;
	public totalUsersToDisplay: IUser[] = [];

	constructor(
		private userService: UserService,
		private router: Router,
	) {	}

	ngOnInit() {
		this.form = new FormGroup({
			searchKeyword: new FormControl('', this.searchKeywordValidators),
		});

		this.subscription.add(this.userService.getUserState().subscribe((state) => {
			this.userState = state;
			if (!state.searchedUser && !this.userState.loadingUser) {
				this.userService.findUsers();
			}

			this.usersListTableSource.data = this.userState.users.slice(0, this.itemsDisplayed);
			this.totalUsersToDisplay = this.userState.users;
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	handleUserSelected(user: IUser) {
		this.userService.updateUsername(user.username);
		this.router.navigate(['userDetails']);
	}

	showMoreUsers() {
		this.itemsDisplayed =  this.itemsDisplayed + ITEMS_PER_PAGE;
		this.usersListTableSource.data = this.totalUsersToDisplay.slice(0, this.itemsDisplayed);
	}


	onSearch(value: string) {
		const enterprisesFiltered = this.userState.users
		.filter(data => {
			return (
				(data.firstName ? data.firstName.toLowerCase().includes(value.toLowerCase()) : false) ||
				(data.lastName ? data.lastName.toLowerCase().includes(value.toLowerCase()) : false) ||
				(data.email ? data.email.toLowerCase().includes(value.toLowerCase()) : false) ||
				(data.documentNumber ? data.documentNumber.includes(value) : false) ||
				(data.cellPhone ? data.cellPhone.includes(value) : false)
			)
		});
		this.usersListTableSource.data = enterprisesFiltered.slice(0,this.itemsDisplayed);
		this.totalUsersToDisplay = enterprisesFiltered;
	}

	onSubmit() {
		this.userService.findUsers();
	}
}
