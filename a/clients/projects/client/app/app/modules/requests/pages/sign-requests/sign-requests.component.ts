import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IRequestCurrencySummary, IRequest, ITransactionsResponse, makeTransactionState, ITransactionState } from 'client/app/app/models';
import { RequestsService } from 'client/app/app/services/requests.service';
import { Subscription, Observable, of } from 'rxjs';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { Location } from '@angular/common';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SidenavService } from 'client/app/app/services/sidenav.service';

@Component({
	selector: 'mcy-sign-requests',
	templateUrl: './sign-requests.component.html',
	styleUrls: ['./sign-requests.component.scss']
})
export class SignRequestsComponent implements OnInit, OnDestroy {
	public requestsSummary: IRequestCurrencySummary[] = [];
	public transactionState: ITransactionState = makeTransactionState({});
	public selectedRequests: IRequest[] = [];
	public subscription: Subscription = new Subscription();
	constructor(
		private router: Router,
		private requestsService: RequestsService,
		private transactionService: TransactionService,
		private location: Location,
		private softTokenService: SoftTokenService,
		private sidenavService: SidenavService,
	) {}

	ngOnInit() {
		this.requestsSummary = this.requestsService.requestCurrencySummary;
		this.subscription.add(this.requestsService.getRequestsState().subscribe(state => {
			this.selectedRequests = state.selectedRequests;
		}));
		
		this.subscription.add(this.transactionService.getTransactionState().subscribe((state) => {
			this.transactionState = state;
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

	confirm() {
		this.softTokenService.requestSoftToken((token) => this.sign(token), 'requestSign');
	}

	sign(softToken?: string): Observable<ITransactionsResponse> {
		this.transactionService.updateTransactionState({ loadingSignature: true });
		const requestIds = this.selectedRequests.map(request => request.id);
		return this.transactionService.sign(requestIds, softToken).pipe(
			tap(resp => {
				if (resp.success) {
					this.transactionService.updateTransactionState({
						lastTransactions: resp.data,
						loadingSignature: false,
						hasErrorSignature: false,
					});
					this.router.navigateByUrl('app/requests/sign/status');
				} else {
					const errorHandled = this.softTokenService.handleErrors(resp, (token) => this.sign(token), 'requestSign');
					this.transactionService.updateTransactionState({ loadingSignature: false, hasErrorSignature: !errorHandled });
				}
			}),
			catchError((responseError: HttpErrorResponse) => {
				const errorHandled = this.softTokenService.handleErrors(responseError.error, (token) => this.sign(token), 'requestSign');
				this.transactionService.updateTransactionState({ loadingSignature: false, hasErrorSignature: !errorHandled });
				return of(responseError.error);
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get isSidenavOpen(): boolean {
		return this.sidenavService.opened;
	}
}
