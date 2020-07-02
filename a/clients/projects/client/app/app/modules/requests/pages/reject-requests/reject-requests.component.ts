import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IRequestCurrencySummary, IRequest, ITransactionsResponse, ITransactionState, makeTransactionState } from 'client/app/app/models';
import { Subscription, Observable, of } from 'rxjs';
import { RequestsService } from 'client/app/app/services/requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { CONTRAINTS } from 'client/app/app/constants';
import { Location } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SidenavService } from 'client/app/app/services/sidenav.service';

@Component({
	selector: 'mcy-reject-requests',
	templateUrl: './reject-requests.component.html',
	styleUrls: ['./reject-requests.component.scss']
})
export class RejectRequestsComponent implements OnInit, OnDestroy {
	public requestsSummary: IRequestCurrencySummary[] = [];
	public transactionState: ITransactionState = makeTransactionState({});
	public selectedRequests: IRequest[] = [];
	public subscription: Subscription = new Subscription();
	public rejectForm: FormGroup;
	public motiveValidators: Validators[] = [];
	public moviteMaxLength = CONTRAINTS.REQUESTS.REJECT.MOVITE.MAX_LENGTH;
	constructor(
		private router: Router,
		private requestsService: RequestsService,
		private transactionService: TransactionService,
		private fb: FormBuilder,
		private location: Location,
		private softTokenService: SoftTokenService,
		private sidenavService: SidenavService,
	) {
		this.motiveValidators = [Validators.required]
		this.rejectForm = this.fb.group({
			motive: ''
		});
	}

	ngOnInit() {
		this.requestsSummary = this.requestsService.requestCurrencySummary;
		this.subscription.add(this.requestsService.getRequestsState().subscribe((state) => {
			this.selectedRequests = state.selectedRequests;
		}));
		
		this.subscription.add(this.transactionService.getTransactionState().subscribe((state) => {
			this.transactionState = state;
		}));
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
		this.softTokenService.requestSoftToken((token) => this.reject(token), 'requestReject');
	}

	reject(softToken?: string): Observable<ITransactionsResponse> {
		this.transactionService.updateTransactionState({ loadingSignature: true });
		return this.transactionService.reject(this.selectedRequests[0], this.rejectForm.value.motive, softToken).pipe(
			tap(resp => {
				if (resp.success) {
					this.transactionService.updateTransactionState({
						lastTransactions: resp.data,
						loadingSignature: false,
						hasErrorSignature: false,
					});
					this.router.navigateByUrl('app/requests/reject/status');
				} else {
					const errorHandled = this.softTokenService.handleErrors(resp, (token) => this.reject(token), 'requestReject');
					this.transactionService.updateTransactionState({ loadingSignature: false, hasErrorSignature: !errorHandled });
				}
			}),
			catchError((responseError: HttpErrorResponse) => {
				const errorHandled = this.softTokenService.handleErrors(responseError.error, (token) => this.reject(token), 'requestReject');
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
