import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRequestCurrencySummary, IRequest } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { RequestsService } from 'client/app/app/services/requests.service';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'mcy-cancel-requests',
	templateUrl: './cancel-requests.component.html',
	styleUrls: ['./cancel-requests.component.scss'],
})
export class CancelRequestsComponent implements OnInit, OnDestroy {
	public requestsSummary: IRequestCurrencySummary[] = [];
	public selectedRequests: IRequest[] = [];
	public subscription: Subscription = new Subscription();
	constructor(
		private router: Router,
		private requestsService: RequestsService,
		private transactionService: TransactionService,
		private location: Location
	) {}

	ngOnInit() {
		this.requestsSummary = this.requestsService.requestCurrencySummary;
		this.subscription.add(this.requestsService
			.getRequestsState()
			.subscribe((state) => {
				this.selectedRequests = state.selectedRequests;
			}));
	}

	selectionText() {
		return this.requestsService.selectionText;
	}

	goToLanding() {
		this.requestsService.resetSelectedState();
		this.transactionService.resetState();
		this.location.back();
	}

	edit() {
		this.location.back();
	}

	cancel() {
		const requestIds = this.selectedRequests.map(request => request.id);
		this.subscription.add(
			this.transactionService.cancel(requestIds).subscribe(resp => {
				if (resp.success) {
					this.transactionService.updateTransactionState({
						lastTransactions: resp.data
					});
					this.router.navigateByUrl('app/requests/cancel/status');
				}
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
