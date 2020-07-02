import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
	ISalaryPaymentState,
	makeSalaryPaymentState,
	makeSalaryPaymentFormValue,
} from 'client/app/app/modules/payments/models/salary-payment';
import { DataService } from '@mcy/core/services/data.service';
import { ITransfersResponse, INewTransfer, ITransfer } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { CSVService } from './csv.service';
import { tap, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';
import { IRequestResponse } from 'client/app/app/models';
import { EventService } from './event.service';
import { StatefulService } from './stateful.service';
import { UserService } from './user.service';
import { TransferService } from './transfer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TRANSFER_STATUS } from 'client/app/app/constants';

@Injectable()
export class SalaryPaymentService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<ISalaryPaymentState>(
		makeSalaryPaymentState({})
	);
	public subscription: Subscription;

	constructor(
		public eventService: EventService,
		private data: DataService,
		private translateService: TranslateService,
		private utilsService: UtilsService,
		private userService: UserService,
		private csvService: CSVService,
		private transferService: TransferService) {
			super(eventService);
			this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getSalaryPaymentState(): BehaviorSubject<ISalaryPaymentState> {
		return this.subject;
	}

	updateSalaryPaymentState(data: Partial<ISalaryPaymentState>) {
		this.subject.next(makeSalaryPaymentState({ ...this.getSalaryPaymentState().value, ...data }));
	}

	getSalaryPayments(): Observable<ITransfersResponse> {
		// @Todo cambiar el endoint y agregar los query para filtrar los pagos de sueldo de trasferencia
		return this.data.get('v1/transfers/transfers', { params: {
			conceptId: 'HAB',
			originCuit: this.userService.getEnterpriseState().value.selectedEnterprise.cuilt
		} });
	}

	findSalaryPayments(): void {
		this.updateSalaryPaymentState({ loading: true });
		this.subscription.add(
			this.getSalaryPayments().subscribe(
				(res: ITransfersResponse) => {
					if (res.success && res.data.length) {
						const payments = res.data;
						this.orderPaymentsByDate(payments);
						this.updateSalaryPaymentState({
							salaryPayments: payments,
							loading: false,
							hasSalaryPaymentErrors: false
							,searchedSalaryPayments: true
						});
					} else {
						this.updateSalaryPaymentState({ loading: false, hasSalaryPaymentErrors: true, searchedSalaryPayments: true });
					}
				}, (res: HttpErrorResponse) => {
					if (res.error && res.error.status[0].code === TRANSFER_STATUS.EMPTY_LIST) {
						this.updateSalaryPaymentState({ searchedSalaryPayments: true, loading: false, hasSalaryPaymentErrors: false });
					} else {
						this.updateSalaryPaymentState({ loading: false, hasSalaryPaymentErrors: true, searchedSalaryPayments: true });
					}
				}
			)
		);
	}

	paySalary(data: INewTransfer, softToken?: string): Observable<IRequestResponse> {
		this.updateSalaryPaymentState({ loadingNewPayment: true, hasNewPaymentErrors: false });
		return this.data.post('v1/transactions/transfers', {
			body: data,
			headers: {
				softToken: softToken ? softToken : null
			}
		}).pipe(
			map((response) => response as IRequestResponse),
			switchMap((response: IRequestResponse) => this.transferService.validateRequest(response)),
			tap((response: any) => {
				if (response.success && response.data) {
					this.updateSalaryPaymentState({ lastSalaryPayment: response.data, loadingNewPayment: false, hasNewPaymentErrors: false })
				}
			})
		);
	}

	getTableHeaders(): string[]  {
		return [
			this.translateService.instant('pages.payments.salaryPaymentsList.name'),
			this.translateService.instant('pages.payments.salaryPaymentsList.cuilt'),
			this.translateService.instant('pages.payments.salaryPaymentsList.amount'),
			this.translateService.instant('pages.payments.salaryPaymentsList.date'),
			this.translateService.instant('pages.payments.salaryPaymentsList.state')
		];
	}

	resetFormState() {
		this.subject.value.newSalaryPaymentFormValue = makeSalaryPaymentFormValue({});
	}

	formattedDate(date: Date | undefined) {
		if (date) {
			return this.utilsService.formatDate(new Date(date));
		}

		return '';
	}

	stateDescription(state: string | undefined) {
		if (state === 'APPROVED') {
			return this.translateService.instant('pages.payments.state.successful');
		}

		if (state === 'DENIED') {
			return this.translateService.instant('pages.payments.state.rejected');
		}

		return '';
	}

	serializeService(salary: ITransfer): string[] {
		return [
			salary.destinationHolder,
			salary.destinationCuilt,
			`"${salary.currency.symbol} ${this.utilsService.formatAmount(salary.amount)}"`,
			this.formattedDate(salary.date),
			this.stateDescription(salary.state)
		];
	}

	exportToCSV(salaryPayments: ITransfer[]) {
		const csvData: string[][] = [];
		const fileNameTranslation = this.translateService.instant('pages.payments.salaryPaymentsList.salaryPaymentFileName');
		const header = Object.values(this.getTableHeaders());
		csvData.push(header);
		salaryPayments.forEach((salary: ITransfer) => {
			csvData.push(this.serializeService(salary));
		});
		this.csvService.downloadCSV(csvData, fileNameTranslation);
	}

	resetState() {
		this.updateSalaryPaymentState(makeSalaryPaymentState({}));
	}

	orderPaymentsByDate(payments: ITransfer[]) {
		payments.sort( (a , b) =>new Date(b.date).getTime() - new Date(a.date).getTime());
	}
}
