import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ISidenavData } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { SoftTokenCreateSuccessComponent } from 'client/app/app/sidenav/soft-token/soft-token-create-success/soft-token-create-success.component';
import { IApiResponseObject, IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';
import { SOFT_TOKEN_STATUS, CONTRAINTS } from 'client/app/app/constants';
import { DashboardUtilsService } from 'client/app/app/services/dashboard-utils.service';
import { SoftTokenComponent } from 'client/app/app/components/soft-token/soft-token.component';

@Component({
	selector: 'mcy-soft-token-confirm',
	templateUrl: './soft-token-confirm.component.html',
	styleUrls: ['./soft-token-confirm.component.scss']
})
export class SoftTokenConfirmComponent implements OnInit, OnDestroy {
	@Input() data: ISidenavData = {
		confirmLabel: ''
	};
	@ViewChild(SoftTokenComponent, { static: false }) softTokenComponent!: SoftTokenComponent;
	
	public softToken: FormControl;
	public subscription = new Subscription();
	public tokenInvalid = false;
	public isLoading: boolean = false;
	public ACTION_TYPES = ['requestCheckbook','enableCheckbook'];

	constructor(
		private sidenavService: SidenavService,
		private fb: FormBuilder,
		private translateService: TranslateService,
		private dashboardUtilsService: DashboardUtilsService
	) {
		this.softToken = this.fb.control('', [Validators.required, Validators.minLength(CONTRAINTS.SOFT_TOKEN.MIN_LENGTH)]);
	}

	ngOnInit() {
		this.subscription.add();
		if (this.data.trackPageView) {
			this.data.trackPageView();
		}
	}

	onConfirm() {
		if (this.data.onConfirm) {
			this.isLoading = true;
			this.subscription.add(
				this.data.onConfirm(this.softToken.value).subscribe((res: IApiResponseObject<any> | IApiResponseArray<any>) => {
					this.isLoading = false;
					if (res.success) {
						this.success();
					} else if (!res.status || res.status.length === 0) {
						this.sidenavService.onError(() => this.resetError());
					} else if (res.status[0].code === SOFT_TOKEN_STATUS.INVALID) {
						this.softToken.reset();
						this.tokenInvalid = true;
					} else {
						if (!this.dashboardUtilsService.isSoftTokenError(res) && !this.sidenavService.error) {
							this.sidenavService.onError(() => this.resetError());
						};
					}
				},
				() => {
					this.sidenavService.onError(() => this.resetError());
				})
			);
		};
	}

	resetError() {
		this.isLoading = false;
		this.softTokenComponent.softTokenForm.reset();
		this.softToken.reset();
		this.sidenavService.resetError();
	}

	success() {
		if (this.data.showSuccess) {
			this.sidenavService.nextStep({
				title: this.translateService.instant('sidenav.softokenCreateSuccess.title'),
				component: SoftTokenCreateSuccessComponent,
				data: {
					onClose: () => this.onClose()
				},
			})
		} else {
			if (!this.ACTION_TYPES.includes(this.data.actionType)) {
				this.onClose();
			}
		}
	}

	onClose() {
		this.data.onClose
			? this.data.onClose()
			: this.sidenavService.close()
	}

	cancel() {
		this.sidenavService.prevStep();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	modalNeedHelp() {
		this.dashboardUtilsService.showNeedHelpModal()
	}
	get confirmLabel(): string {
		if (this.data.actionType === 'requestSign') {
			return this.translateService.instant('sidenav.softokenConfirm.confirm.requestSign');
		} else if (this.data.actionType === 'requestReject') {
			return this.translateService.instant('sidenav.softokenConfirm.confirm.requestReject');
		} else if (this.data.actionType === 'salaryPayment') {
			return this.translateService.instant('sidenav.softokenConfirm.confirm.salaryPaymentSign');
		} else if (this.data.actionType === 'providerPayment') {
			return this.translateService.instant('sidenav.softokenConfirm.confirm.providerPaymentSign');
		} else if (this.data.actionType === 'requestCheckbook') {
			return this.translateService.instant('sidenav.softokenConfirm.confirm.requestCheckbook');
		} else if (this.data.actionType === 'servicePayment') {
			return this.translateService.instant('sidenav.softokenConfirm.confirm.servicePaymentSign');
		} else if (this.data.actionType === 'enableCheckbook') {
			return this.translateService.instant('sidenav.softokenConfirm.confirm.enableCheckbook');
		}
		return this.data.confirmLabel;
	}
}
