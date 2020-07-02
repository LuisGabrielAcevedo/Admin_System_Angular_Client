import { Component, OnInit } from '@angular/core';
import { UserService } from 'backoffice/src/app/services/user.service';
import { IUserState, makeUserState, IEnterprise, makeEnterprise, IEnterpriseUser } from 'backoffice/src/app/models/user';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ITEMS_PER_PAGE_LARGE } from 'backoffice/src/app/constants';
import { Router } from '@angular/router';

@Component({
	selector: 'mcy-enterprise-details',
	templateUrl: './enterprise-details.page.html',
	styleUrls: ['./enterprise-details.page.scss']
})
export class EnterpriseDetailsPage implements OnInit {
	public userState: IUserState = makeUserState({});
	public subscription = new Subscription();
	public usersTableSource = new MatTableDataSource<IEnterpriseUser>([]);

	public displayedColumns: string[] = [
		'name',
		'document',
		'role',
		'actions'
	];
	public itemsPerPage: number = ITEMS_PER_PAGE_LARGE;

	constructor(
		private userService: UserService,
		private router: Router,
	) {}

	ngOnInit() {
		this.subscription.add(this.userService.getUserState().subscribe((state) => {
			this.userState = state;
			this.usersTableSource.data = this.enterpriseUsers;
		}));
	}

	showMoreUsers() {
		this.itemsPerPage += ITEMS_PER_PAGE_LARGE;
		this.usersTableSource.data = this.enterpriseUsers;
	}

	goToUserDetail(user: IEnterpriseUser) {
		this.userService.updateUsername(user.username)
		this.router.navigate(['userDetails']);
	}

	onBack() {
		this.router.navigate(['home']);
	}

	get enterprise(): IEnterprise {
		return this.userState.enterprise || makeEnterprise({});
	}

	get enterpriseUsers(): IEnterpriseUser[] {
		return this.userState.enterprise ? this.userState.enterprise.users.slice(0, this.itemsPerPage) : [];
	}

	get totalEnterpriseUsers(): number {
		return this.userState.enterprise ? this.userState.enterprise.users.length : 0;
	}
}
