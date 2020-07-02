import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription, of, Observable } from 'rxjs';
import { AccountService } from 'client/app/app/services/account.service';
import { IAccount, IRequestResponse } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { RequestCheckbooksSuccessComponent } from '../request-checkbooks-success/request-checkbooks-success.component';
import { ICheckbookTypeInfo, IProvince, IBranch, INewCheckbook, makeBranch, ITypesOfCheckbookState } from 'client/app/app/models/checkbook';
import { CheckbooksTypesService } from 'client/app/app/services/checkbooks-types.service';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { CheckbooksService } from 'client/app/app/services/checkbooks.service';
import { tap, catchError } from 'rxjs/operators';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'mcy-request-checkbooks-new',
	templateUrl: './request-checkbooks-new.component.html',
	styleUrls: ['./request-checkbooks-new.component.scss']
})
export class RequestCheckbooksNewComponent implements OnInit, OnDestroy {
	public requestCheckbooksForm: FormGroup;
	public subscription = new Subscription();
	public accounts: IAccount[] = [];
	public typesOfCheckbooks: ICheckbookTypeInfo[] = [];
	public provinces: IProvince[] = [];
	public typesOfCheckbooksOptions: ISelectOption[] = [];
	public provincesOptions: ISelectOption[] = [];
	public branches: IBranch[] = [];
	public branchesOptions: ISelectOption[] = [];
	public pesosCode = '032';

	constructor (
		private fb: FormBuilder,
		private accountService: AccountService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private checkbooksService: CheckbooksService,
		private checkbooksTypesService: CheckbooksTypesService,
		private softTokenService: SoftTokenService,

	) {
		this.requestCheckbooksForm = this.fb.group({
			account: [null, [Validators.required]],
			typeCheckbook: [{value: null, disabled: true}, [Validators.required]],
			quantity:  [null, [Validators.required, Validators.maxLength(2)]],
			province:  [{value: null, disabled: true}, [Validators.required]],
			branches:  [{value: null, disabled: true}, [Validators.required]]
		});
	}

	ngOnInit() {
		this.loadAccounts();
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	loadAccounts() {
		this.accountService.findAccounts();
		this.subscription.add(
			this.accountService.getAccountState()
			.subscribe(state => {
				this.accounts = state.accounts.filter(account => account.currency.code === this.pesosCode)
			})
		)
	}

	onProvinceChange() {
		this.getBranchesList(this.requestCheckbooksForm.value.province);
	}

	back() {
		this.sidenavService.close();
	}

	loadCheckbooksTypes() {
		this.subscription.add(
			this.checkbooksTypesService.getTypesOfCheckbookState()
			.subscribe(state => {
					this.getTypesOfCheackbooks(state);
			})
		)
	}

	getTypesOfCheackbooks(state: ITypesOfCheckbookState) {
		const account = this.requestCheckbooksForm.value.account;
		if (!state.typesOfCheckbooks.length) {
			this.checkbooksTypesService.findTypesOfCheckbooks(account);
		} else {
			this.typesOfCheckbooks = state.typesOfCheckbooks;
			this.provinces = state!.provinces;
			this.typesOfCheckbooksOptions = this.getTypeCheckbooksList();
			this.provincesOptions = this.getProvincesList();
			this.requestCheckbooksForm.controls.typeCheckbook.enable();
			this.requestCheckbooksForm.controls.province.enable();
			this.requestCheckbooksForm.controls.branches.enable();
		}
	}

	getTypeCheckbooksList(): ISelectOption[] {
		return this.typesOfCheckbooks.map((type) => {
			return {
				viewValue: type.description,
				value: type.type
			};
		});
	}

	getProvincesList(): ISelectOption[] {
		return this.provinces.map((province) => {
			return {
				viewValue: province.description,
				value: province.id
			};
		});
	}

	getBranchesList(provinceId: string) {
		this.provinces.forEach(province => {
			if(province.id === provinceId){
				this.getBranchesListOptions(province);
			}
		});
	}

	getBranchesListOptions(province: IProvince): void {
		this.branchesOptions = [];
		if(province.branchOffices){
			province.branchOffices.forEach(branch => {
				this.branchesOptions.push({
					value: branch.id,
					viewValue: branch.description
				})
			});
		}
	}

	onRequestCheckbook(): void {
		this.subscription.add(
			this.requestCheckbook().subscribe()
		);
	}

	requestCheckbook(softToken?: string): Observable<IRequestResponse> {
		const provinceSelected = this.provinces.filter(province => province.id === this.requestCheckbooksForm.value.province)[0];
		let branchSelected = makeBranch({});

		if (provinceSelected && provinceSelected.branchOffices) {
			branchSelected = provinceSelected.branchOffices.filter(branch => branch.id === this.requestCheckbooksForm.value.branches)[0];
		}

		const typeSelected = this.typesOfCheckbooks.filter(type => type.type === this.requestCheckbooksForm.value.typeCheckbook)[0];

		const newRequestCheckbook : INewCheckbook = {
			account: {
				number: this.requestCheckbooksForm.value.account.number,
				type: this.requestCheckbooksForm.value.account.type
			},
			branch: {
				id: branchSelected.id,
				description: branchSelected.description,
				code: branchSelected.code
			},
			count: this.requestCheckbooksForm.value.quantity,
			currencyCode: this.pesosCode,
			deferred: typeSelected.deferred,
			typeCode: typeSelected.code,
			typeDescription: typeSelected.description,
			province: {
				id: provinceSelected.id,
				description: provinceSelected.description
			}
		}

		return this.checkbooksService.requestCheckbooks(newRequestCheckbook, softToken).pipe(
			tap((response) => {
				if (response.success) {
					this.sidenavService.nextStep({
						title: this.translateService.instant('pages.checkbooks.checkbooks.requestNewCheckbook'),
						component: RequestCheckbooksSuccessComponent,
						data: response.data
					});
				} else {
					this.softTokenService.handleErrors(response, (token: string) => this.requestCheckbook(token), 'requestCheckbook');
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				this.softTokenService.handleErrors(errorResponse.error, (token: string) => this.requestCheckbook(token), 'requestCheckbook');
				return of(errorResponse.error);
			})
		);
	}
}
