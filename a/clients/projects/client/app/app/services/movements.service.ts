import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { DataService } from '@mcy/core/services/data.service';
import { IMovementsResponse, IAccountMovement, IMovementDetailResponse, IAccountMovementState, makeAccountMovementState } from 'client/app/app/modules/accounts/models';
import { IAccount } from 'client/app/app/models';
import { CSVService } from './csv.service';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@mcy/main/services/storage.service';
import { catchError, map } from 'rxjs/operators';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { MOVEMENTS } from 'client/app/app/constants';
import subDays from 'date-fns/subDays';

@Injectable()
export class MovementsService extends StatefulService implements OnDestroy {
	private movementsSubject = new BehaviorSubject<IAccountMovementState>(makeAccountMovementState({}));
	public subscription: Subscription = new Subscription();

	constructor(
		private dataService: DataService,
		private csvService: CSVService,
		private utilsService: UtilsService,
		private translateService: TranslateService,
		private storage: StorageService,
		eventService: EventService,
	) {
		super(eventService);
	}

	updateMovementsState(data: Partial<IAccountMovementState>) {
		this.movementsSubject.next(makeAccountMovementState({...this.getMovementsState().value, ...data}));
	}

	getMovementsState(): BehaviorSubject<IAccountMovementState> {
		return this.movementsSubject;
	}

	findMovements(account: IAccount): Observable<boolean> {
		this.updateMovementsState({ isLoading: true })
		return this.getMovements(account).pipe(
			map((res: IMovementsResponse) => {
				if (res.success && res.data.length) {
					const sortedMovements = res.data.sort((movement, nextMovement) =>
						new Date(nextMovement.accountingDate).getTime() -
						new Date(movement.accountingDate).getTime()
					);
					this.updateMovementsState({ movements: sortedMovements, selectedAccount: account, isLoading: false, hasMovementsErrors: false });
					return true;
				} else {
					this.updateMovementsState({ isLoading: false, hasMovementsErrors: true, selectedAccount: null });
					return false;
				}
			}),
			catchError(() => {
				this.updateMovementsState({ isLoading: false, hasMovementsErrors: true, selectedAccount: null });
				return of(false);
			})
		);
	}

	getMovements(account: IAccount): Observable<IMovementsResponse> {
		// TODO: QUITAR LA RESTA DE DOS DIAS, SE AGREGA SOLO POR BUG EN EL BROKER PARA QUE QA AVANCE CON PRUEBAS.
		const fromDate = subDays(new Date(), MOVEMENTS.DAYS_FROM_TODAY - 2);
		return this.dataService.get('v1/movements/movements', {
			params: {
				accountNumber: account.number,
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType'),
				fromAmount: MOVEMENTS.MIN_AMOUNT,
				toAmount: MOVEMENTS.MAX_AMOUNT,
				fromDate: this.utilsService.formatDate(fromDate, false, 'yyyy-MM-dd'),
				toDate: this.utilsService.formatDate(new Date(), false, 'yyyy-MM-dd')
			}
		});
	}

	getMovementDetail(movement: IAccountMovement, account: IAccount): Observable<IMovementDetailResponse> {
		const accountingDate = new Date(movement.accountingDate);
		return this.dataService.get(`v1/movements/movements/${movement.id}`, {
			params: {
				accountNumber: account.number,
				accountType: account.type,
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType'),
				accountingDate: this.utilsService.formatDate(accountingDate, false, 'yyyy-MM-dd'),
				amount: movement.amount
			}
		});
	}

	getTableHeaders(): string[]  {
		return [
			this.translateService.instant('pages.accounts.accountMovementsList.accountingDate'),
			this.translateService.instant('pages.accounts.accountMovementsList.description'),
			this.translateService.instant('pages.accounts.accountMovementsList.amount'),
			this.translateService.instant('pages.accounts.accountMovementsList.balance')
		];
	}

	formattedDate(date: Date | undefined) {
		if (date) {
			return this.utilsService.formatDate(new Date(date));
		}
		return '';
	}

	serializeMovement(movement: IAccountMovement, account: IAccount): string[] {
		return [
			this.formattedDate(movement.accountingDate),
			movement.description || '',
			`"${account.currency.symbol} ${this.utilsService.formatAmount(movement.amount)}"`,
			`"${account.currency.symbol} ${this.utilsService.formatAmount(movement.balance)}"`,
		];
	}

	exportToCSV(movements: IAccountMovement[], account: IAccount) {
		const csvData: string[][] = [];
		const fileNameTranslation = this.translateService.instant('pages.accounts.accountMovements.accountMovementsFileName');
		const header = Object.values(this.getTableHeaders());
		csvData.push(header);
		movements.forEach((service: IAccountMovement) => {
			csvData.push(this.serializeMovement(service, account));
		});
		this.csvService.downloadCSV(csvData, fileNameTranslation);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	resetState() {
		this.updateMovementsState(makeAccountMovementState({}));
	}
}
