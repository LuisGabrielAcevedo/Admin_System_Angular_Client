import { Component, Input } from '@angular/core';
import { IRequest, ITransactionsErrors, RequestAction, ITransfer, IServicePayment } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { RequestsService } from 'client/app/app/services/requests.service';
import { TranslateService } from '@ngx-translate/core';
import { SalaryPaymentDetailComponent } from 'client/app/app/sidenav/salary-payment/salary-payment-detail/salary-payment-detail.component';
import { TransferDetailsComponent } from 'client/app/app/sidenav/transfer-details/transfer-details.component';
import { ServicePaymentDetailComponent } from 'client/app/app/sidenav/service-payment/service-payment-detail/service-payment-detail.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { STATUS_REQUEST } from 'client/app/app/constants';

@Component({
	selector: 'mcy-requests-actions-list',
	templateUrl: './requests-actions-list.component.html',
	styleUrls: ['./requests-actions-list.component.scss']
})
export class RequestsActionsListComponent {
	@Input() selectedRequests: IRequest[] = [];
	@Input() showStatus = true;
	@Input() errors: ITransactionsErrors = {};
	@Input() action: RequestAction = 'SIGN';
	public openRows: number[] = [];
	public status: string = '';
	public icon: string = '';

	constructor(
		private utilsService: UtilsService,
		private requestsService: RequestsService,
		private translateService: TranslateService,
		private sidenavService: SidenavService
		) {}
	getOperation(request: IRequest) {
		return this.requestsService.getOperationText(request);
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	getStatus(request: IRequest){
		if (this.errors[request.id]){
			this.status =  STATUS_REQUEST.CANCELLED;
		}else{
			this.status =  STATUS_REQUEST.SUCCESS;
		}
		return this.status;
	}

	getStateText(request: IRequest) {
		const hasError: string = this.errors[request.id];
		let successTranslate: string = this.translateService.instant('pages.requests.signStatus.signedSuccessfully');
		if (this.action === 'REJECT') {
			successTranslate = this.translateService.instant('pages.requests.rejectStatus.rejected');
		}
		if (this.action === 'CANCEL') {
			successTranslate = this.translateService.instant('pages.requests.cancelStatus.cancelled');
		}
		return !hasError
			? successTranslate
			: this.translateService.instant('pages.requests.signStatus.error');

	}

	isOpenRow(index: number) {
		return this.showStatus && this.openRows.includes(index);
	}

	isCloseRow(index: number, request: IRequest) {
		return this.errors[request.id] && this.showStatus && !this.openRows.includes(index);
	}

	openRow(index: number) {
		this.openRows.push(index);
	}

	closeRow(index: number) {
		this. openRows = this.openRows.filter(row => row !== index);
	}

	showState(request: IRequest) {
		return this.action === 'SIGN' || this.errors[request.id];
	}

	goToDetail(request: IRequest) {
		if (this.requestsService.isSalary(request)) {
			this.goToSalaryDetail(request.content as ITransfer);
		};

		if (this.requestsService.isTransfer(request)) {
			this.goToTransferDetail(request.content as ITransfer);
		}

		if (this.requestsService.isServicePayment(request)) {
			this.goToServicePaymentDetail(request.content as IServicePayment);
		}
	}

	goToSalaryDetail(payment: ITransfer) {
		this.sidenavService.open({
			title: this.translateService.instant('pages.payments.salary.salaryPayment'),
			component: SalaryPaymentDetailComponent,
			data: payment
		});
	}

	goToTransferDetail(transfer: ITransfer): void {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.transferDetails.title'),
			component: TransferDetailsComponent,
			data: {
				transfer
			}
		})
	}

	goToServicePaymentDetail(payment: IServicePayment) {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.payments.serviceDetail'),
			component: ServicePaymentDetailComponent,
			data: payment
		});
	}
}
