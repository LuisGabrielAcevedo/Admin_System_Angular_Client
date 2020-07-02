import { Injectable, OnDestroy } from '@angular/core';
import {
	IChecksIssuedResponse,
	IAccount,
	IChecksDiscountedResponse,
	IChecksReceivedResponse,
	makeCheckState,
	ICheckState,
	ICheckReceived,
} from 'client/app/app/models';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from '@mcy/core/services/data.service';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { IReceiptPdfResponse } from 'client/app/app/models/receipt';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { CHECKS_SUCCESS } from 'client/app/app/constants';

@Injectable()
export class ChecksService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<ICheckState>(makeCheckState({}));
	public subscription: Subscription;
	constructor(
		public eventService: EventService,
		private dataService: DataService,
		private storage: StorageService,
		private utilsService: UtilsService
	) {
		super(eventService);
		this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getChecksIssued(account: IAccount): Observable<IChecksIssuedResponse> {
		return this.dataService.get('v1/checks/checks', {
			params: {
				type: 'issued',
				accountNumber: account.number,
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType')
			},
		});
	}

	getChecksReceived(account: IAccount): Observable<IChecksReceivedResponse> {
		return this.dataService.get('v1/checks/checks', {
			params: {
				type: 'received',
				accountNumber: account.number,
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType')
			},
		});
	}

	getChecksDiscounted(): Observable<IChecksDiscountedResponse> {
		return this.dataService.get('v1/checks/checks-discounted', {
			params: {
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType')
			},
		});
	}

	getCheckState(): BehaviorSubject<ICheckState> {
		return this.subject;
	}

	updateCheckState(data: Partial<ICheckState>) {
		this.subject.next(
			makeCheckState({
				...this.getCheckState().value,
				...data,
			})
		);
	}

	findChecksIssued(account: IAccount): void {
		this.updateCheckState({ loadingChecksIssued: true });
		this.subscription.add(
			this.getChecksIssued(account).subscribe(
				(res: IChecksIssuedResponse) => {
					if (res.success) {
						const listWarnings = res.status.filter(
							(status) => !status.code.includes(CHECKS_SUCCESS)
						).map(
							(status) => status.message
						);
						this.updateCheckState({
							checksIssued: res.data,
							searchedChecksIssued: true,
							loadingChecksIssued: false,
							hasErrorChecksIssued: false,
							warningChecksIssuedList: listWarnings
						});
					} else {
						this.updateCheckState({
							checksIssued: res.data,
							loadingChecksIssued: false,
							searchedChecksIssued: true,
							hasErrorChecksIssued: true,
							checksIssuedErrorStatus: res.status,
						});
					}
				}, () => {
					this.updateCheckState({
						loadingChecksIssued: false,
						searchedChecksIssued: true,
						hasErrorChecksIssued: true,
					});
				}
			)
		);
	}

	findChecksReceived(account: IAccount): void {
		this.updateCheckState({ loadingChecksReceived: true });
		this.subscription.add(
			this.getChecksReceived(account).subscribe(
				(res: IChecksReceivedResponse) => {
					if (res.success) {
						const listWarnings = res.status.filter(
							(status) => !status.code.includes(CHECKS_SUCCESS)
						).map(
							(status) => status.message
						);
						this.updateCheckState({
							checksReceived: res.data,
							searchedChecksReceived: true,
							loadingChecksReceived: false,
							hasErrorChecksReceived: false,
							warningChecksReceivedList: listWarnings
						});
					} else {
						this.updateCheckState({
							checksReceived: res.data,
							loadingChecksReceived: false,
							searchedChecksReceived: true,
							hasErrorChecksReceived: true,
							checksReceivedErrorStatus: res.status,
						});
					}
				}, () => {
					this.updateCheckState({
						loadingChecksReceived: false,
						searchedChecksReceived: true,
						hasErrorChecksReceived: true
					});
				}
			)
		);
	}

	findChecksDiscounted(): void {
		this.updateCheckState({ loadingChecksDiscounted: true });
		this.subscription.add(
			this.getChecksDiscounted().subscribe(
				(res: IChecksDiscountedResponse) => {
					if (res.success) {
						this.updateCheckState({
							checksDiscounted: res.data,
							searchedChecksDiscounted: true,
							loadingChecksDiscounted: false,
							hasErrorChecksDiscounted: false,
						});
					} else {
						this.updateCheckState({
							checksDiscounted: res.data,
							loadingChecksDiscounted: false,
							searchedChecksDiscounted: true,
							hasErrorChecksDiscounted: true,
						});
					}
				}, () => {
					this.updateCheckState({
						loadingChecksDiscounted: false,
						searchedChecksDiscounted: true,
						hasErrorChecksDiscounted: true,
					});
				}
			)
		);
	}

	getImgNote(cmc7Code: string): Observable<IReceiptPdfResponse> {
		return this.dataService.get('v1/receipts/check-img-note',
		{
			params: {
				cmc7: cmc7Code
			}
		});
	}

	getBouncedCheckNote(check : ICheckReceived,
		account:IAccount): Observable<IReceiptPdfResponse> {
		return this.dataService.get('v1/receipts/bounced-check-note',
		{
			params: {
				cmc7: check.code,
				checkNumber:  check.number,
				amount:  check.amount,
				bounceDate: this.utilsService.formatDate(new Date(check.rejectionDate), false, 'dd/MM/yyyy'),
				bounceReason:  check.rejectionReason,
				account: `${account.type} ${account.number}`
			}
		});
	}

	resetState() {
		this.updateCheckState(makeCheckState({}));
	}
}
