import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { CreditMovementDetailComponent } from 'client/app/app/sidenav/account/credit-movement-detail/credit-movement-detail.component';
import { makeAccount, ISidenavData } from 'client/app/app/models';
import {
	makeAccountMovement,
	IAccountMovementDetail
} from 'client/app/app/modules/accounts/models';
import { DebitMovementDetailComponent } from 'client/app/app/sidenav/account/debit-movement-detail/debit-movement-detail.component';
import { SERVICE_PAYMENT_CODES } from 'client/app/app/constants/movements-codes';
import { MovementsService } from 'client/app/app/services/movements.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-account-movement-detail',
	templateUrl: './account-movement-detail.component.html',
	styleUrls: ['./account-movement-detail.component.scss']
})
export class AccountMovementDetailComponent implements OnInit, OnDestroy {
	@Input() public data: ISidenavData = {
		movement: makeAccountMovement({}),
		account: makeAccount({})
	};
	public paymentServiceCodes: string[] = SERVICE_PAYMENT_CODES;
	public isServicePayment = false;
	public creditIndicator = 'C';
	public subscription = new Subscription();

	constructor(
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private movementService: MovementsService
	) {}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	ngOnInit() {
		this.isServicePayment = this.paymentServiceCodes.includes(
			this.data.movement.eventCode
		);
		this.getMovementDetail();
	}

	getMovementDetail() {
		this.subscription.add(
			this.movementService
			.getMovementDetail(this.data.movement, this.data.account)
			.subscribe(resp => {
				if (resp.success) {
					if (this.isServicePayment) {
						this.openDebitDetail(resp.data);
					} else {
						if (resp.data.creditDebitIndicator === this.creditIndicator) {
							this.openCreditDetail(resp.data);
						} else {
							this.openDebitDetail(resp.data);
						}
					}
				} else {
					this.sidenavService.onError(() => { this.getMovementDetail() });
				}
			}, () => this.sidenavService.onError(() => { this.getMovementDetail() }))
		);
	}

	openCreditDetail(movementDetail: IAccountMovementDetail) {
		movementDetail.amount = this.data.movement.amount;
		movementDetail.accountingDate = this.data.movement.accountingDate;
		this.sidenavService.open({
			title: this.translateService.instant(
				'pages.accounts.accountMovementDetail.title'
			),
			component: CreditMovementDetailComponent,
			data: {
				account: this.data.account,
				movement: movementDetail
			}
		});
	}

	openDebitDetail(movementDetail: IAccountMovementDetail) {
		this.sidenavService.open({
			title: this.translateService.instant(
				'pages.accounts.accountMovementDetail.title'
			),
			component: DebitMovementDetailComponent,
			data: {
				servicePayment: this.isServicePayment,
				account: this.data.account,
				movement: movementDetail
			}
		});
	}
}
