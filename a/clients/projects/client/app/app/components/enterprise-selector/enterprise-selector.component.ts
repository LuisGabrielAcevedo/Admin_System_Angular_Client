import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { UserService } from 'client/app/app/services/user.service';
import { IEnterpriseState, makeEnterpriseState, IEnterprise } from 'client/app/app/models/enterprise';
import { MatTableDataSource } from '@angular/material';
import { ITEMS_PER_PAGE } from 'client/app/app/constants';
import { makeUserState, IUserState } from 'client/app/app/models';
import { ToastService } from '@mcy/core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-enterprise-selector',
	templateUrl: './enterprise-selector.component.html',
	styleUrls: ['./enterprise-selector.component.scss']
})
export class EnterpriseSelectorComponent implements OnInit, OnDestroy {
	public enterpriseState: IEnterpriseState = makeEnterpriseState({});
	public userState: IUserState = makeUserState({});
	public enterpriseListTableSource = new MatTableDataSource<IEnterprise>([]);
	public displayedColumns: string[] = [
		'favorite',
		'name',
		'cuilt',
		'actions'
	];
	public itemsDisplayed: number = ITEMS_PER_PAGE;
	public totalEnterprisesToDisplay: IEnterprise[] = [];
	public subscription: Subscription = new Subscription();
	public updateEnterpriseDefaultLoading: boolean = false;
	@Input() position: 'right' | 'left' = 'left';
	@Output() handleChange = new EventEmitter();

	constructor(
		private userService: UserService,
		private toast: ToastService,
		private translateService: TranslateService,
	) { }

	ngOnInit() {
		this.subscription.add(this.userService.getEnterpriseState().subscribe(state => {
			this.enterpriseState = state;
			if (!state.searchedEnterprises && !this.enterpriseState.isLoading) {
				this.userService.findEnterprise();
			}
			this.enterpriseListTableSource.data = this.enterpriseState.enterprises.slice(0, this.itemsDisplayed);
			this.totalEnterprisesToDisplay = this.enterpriseState.enterprises;
		}));

		this.subscription.add(this.userService.getUserState().subscribe(state => {
			this.userState = state;
			if (!state.searchedUser && !this.userState.isLoading) {
				this.userService.findUser();
			}
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	enterpriseSelected(enterprise: IEnterprise) {
		this.handleChange.emit(enterprise);
	}

	showMoreEnterprises() {
		this.itemsDisplayed =  this.itemsDisplayed + ITEMS_PER_PAGE;
		this.enterpriseListTableSource.data = this.totalEnterprisesToDisplay.slice(0, this.itemsDisplayed);
	}

	onFavoriteClick(enterprise: IEnterprise, event: Event) {
		event.stopPropagation();
		const enterpriseDefault = this.enterpriseState.enterpriseDefault !== enterprise.id
			? enterprise.id
			: '-1';
		this.updateEnterpriseDefaultLoading = true;
		this.subscription.add(
			this.userService.updateEnterpriseDefault(enterpriseDefault).subscribe(isSuccess => {
				if (isSuccess) {
					this.updateEnterpriseDefaultLoading = false;
					this.toast.message(
						this.translateService.instant('pages.enterprises.favoriteEnterprise'),
						{
							horizontalPosition: this.position,
							panelClass: ['default', this.position]
						}
					);
				} else {
					this.updateEnterpriseDefaultLoading = false;
					this.toast.error(
						this.translateService.instant('pages.enterprises.error'),
						{
							horizontalPosition: this.position,
							panelClass: [this.position]
						}
					);
				}
			}, () => {
				this.toast.error(
					this.translateService.instant('pages.enterprises.error'),
					{
						horizontalPosition: this.position,
						panelClass: [this.position]
					}
				);
			})
		);
	}

	onSearch(value: string) {
		const enterprisesFiltered = this.enterpriseState.enterprises
		.filter(data => {
			return data.name.toLowerCase().includes(value.toLowerCase()) || data.cuilt.includes(value);
		});
		this.enterpriseListTableSource.data = enterprisesFiltered.slice(0,this.itemsDisplayed);
		this.totalEnterprisesToDisplay = enterprisesFiltered;
	}
}
