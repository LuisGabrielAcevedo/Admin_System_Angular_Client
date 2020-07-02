import { Component, Input } from '@angular/core';
import { ScheduledRequestCardComponent } from 'client/app/app/modules/requests/components/scheduled-request-card/scheduled-request-card.component';
import { IRequest, makeCancelRequestModal, IRequestCarouselAction } from 'client/app/app/models';
import { ICarouselConfiguration, makeCarouselConfiguration } from 'client/app/app/models/carousel';
import { ModalService } from '@mcy/core/services/modal.service';
import { CancelScheduledRequestComponent } from 'client/app/app/modules/requests/components/cancel-scheduled-request/cancel-scheduled-request.component';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { ToastService } from '@mcy/core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { of } from 'rxjs';

@Component({
	selector: 'mcy-salary-scheduled-requests',
	templateUrl: './salary-scheduled-requests.component.html',
	styleUrls: ['./salary-scheduled-requests.component.scss'],
})
export class SalaryScheduledRequestsComponent {
	public component = ScheduledRequestCardComponent;
	public configuration: ICarouselConfiguration = makeCarouselConfiguration(5);
	@Input() public requests: IRequest[] = [];
	@Input() public totalRequest = 0;

	constructor(
		private modalService: ModalService,
		private transactionService: TransactionService,
		private toast: ToastService,
		private translateService: TranslateService,
		private requestsService: RequestsService,
		private sidenavService: SidenavService,
		private softTokenService: SoftTokenService,
	) {}

	requestAction(item: IRequestCarouselAction) {
		if(item.action === 'CANCEL') {
			this.cancelRequestModal(item.request);
		}
		if(item.action === 'DETAIL') {
			this.goToRequestDetail(item.request);
		}
	}

	cancelRequestModal(request: IRequest) {
		this.modalService.openDialog(makeCancelRequestModal({
			request,
			component: CancelScheduledRequestComponent,
			onCancel: () => {},
			onConfirm: () => this.onCancelClick(request)
		}));
	}

	goToRequestDetail(request: IRequest) {
		this.sidenavService.open({
			title: this.translateService.instant('pages.payments.salary.salaryPayment'),
			component: RequestDetailComponent,
			data: {
				id: request.id
			}
		});
	}

	onCancelClick(request: IRequest): void {
		this.softTokenService.requestSoftToken((token: string) => this.cancelRequest(request, token), 'cancelScheduledRequest');
	}

	cancelRequest(request: IRequest, softToken?: string)  {
		const requestId = [request.id];
		return this.transactionService.cancel(requestId, softToken).pipe(
			tap((response) => {
				if (response.success) {
					this.transactionService.updateTransactionState({
						lastTransactions: response.data
					});
					this.requestsService.cancelRequest(request);
					this.toast.success(
						this.translateService.instant(
							'pages.requests.cancelScheduledRequest.cancelMessage',
							{ detail: request.detail }
						)
					);
				} else {
					this.softTokenService.handleErrors(response, (token: string) => this.cancelRequest(request, token), 'cancelScheduledRequest');
					this.toast.error(this.translateService.instant('pages.requests.cancelScheduledRequest.error'));
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				this.toast.error(this.translateService.instant('pages.requests.cancelScheduledRequest.error'));
				this.softTokenService.handleErrors(
					errorResponse.error,
					(token: string) => this.cancelRequest(request, token),
					'cancelScheduledRequest');
				return of(errorResponse.error);
			})
		);
	}
}
