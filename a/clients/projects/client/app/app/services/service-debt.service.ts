import { DataService } from '@mcy/core/services/data.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import {
	makeServiceDebtState,
	IServiceDebtState,
	IServiceDebtsResponse
} from 'client/app/app/models';
import {
	IHttpError,
	IApiStatusResponse
} from '@mcy/core/interfaces/api.interfaces';
import { ToastService } from '@mcy/core/services/toast.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
@Injectable()
export class ServiceDebtService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<IServiceDebtState>(
		makeServiceDebtState({})
	);
	public subscription: Subscription;
	constructor(
		public eventService: EventService,
		private dataService: DataService,
		private toast: ToastService,
		private storage: StorageService
	) {
		super(eventService);
		this.subscription = new Subscription();
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	updateServiceDebtState(data: Partial<IServiceDebtState>) {
		this.subject.next(
			makeServiceDebtState({
				...this.getServiceDebtState().value,
				...data
			})
		);
	}

	getServiceDebtState(): BehaviorSubject<IServiceDebtState> {
		return this.subject;
	}

	getServiceDebts(): Observable<IServiceDebtsResponse> {
		return this.dataService.get('v1/pagomiscuentas/debts', {
			params: {
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType'),
			}});
	}

	getServiceDebt(id: string, serviceId: string): Observable<IServiceDebtsResponse> {
		return this.dataService.get('v1/pagomiscuentas/debts', {
			params: {
				banelcoClientId: id,
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType'),
				serviceId
			}
		});
	}

	findServiceDebts(): void {
		this.updateServiceDebtState({
			debts: [],
			loading: true,
			hasServiceDebtsErrors: false
		});
		this.subscription.add(
			this.getServiceDebts().subscribe(
				(res: IServiceDebtsResponse) => {
					if (res.success) {
						this.updateServiceDebtState({ });
						this.updateServiceDebtState({
							debts: res.data,
							loading: false,
							searchedDebts: true,
							hasServiceDebtsErrors: false
						});
					} else {
						res.status.forEach(() => {
							this.updateServiceDebtState({ loading: false, searchedDebts: true, hasServiceDebtsErrors: true});
						});
					}
				},
				() => {
					this.updateServiceDebtState({ loading: false, searchedDebts: true, hasServiceDebtsErrors: true});
				}
			)
		);
	}

	findServiceDebt(id: string, serviceId: string): void {
		this.subscription.add(
			this.getServiceDebt(id, serviceId).subscribe(
				(res: IServiceDebtsResponse) => {
					if (res.success && res.data.length) {
						this.updateServiceDebtState({ debts: res.data });
					} else {
						res.status.forEach((status: IApiStatusResponse) =>
							this.toast.message(status.message)
						);
					}
				},
				(error: IHttpError) => {
					this.toast.message(error.message);
				}
			)
		);
	}

	resetState() {
		this.updateServiceDebtState(makeServiceDebtState({}));
	}
}
