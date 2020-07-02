import { DataService } from '@mcy/core/services/data.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import {
	makeServiceState,
	IServiceState,
	IServicesResponse
} from 'client/app/app/models';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';

@Injectable()
export class ServiceService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<IServiceState>(makeServiceState({}));
	public subscription: Subscription;

	constructor(
		public eventService: EventService,
		private dataService: DataService,
	) {
		super(eventService);
		this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	updateServiceState(data: Partial<IServiceState>) {
		this.subject.next(
			makeServiceState({
				...this.getServiceState().value,
				...data
			})
		);
	}

	getServiceState(): BehaviorSubject<IServiceState> {
		return this.subject;
	}

	getServices(categoryId: string): Observable<IServicesResponse> {
		return this.dataService.get(`v1/pagomiscuentas/categories/${categoryId}/services`);
	}

	findServices(categoryId: string): void {
		this.updateServiceState({ loading: true });
		this.subscription.add(
			this.getServices(categoryId)
			.subscribe((res: IServicesResponse) => {
				if (res.success) {
					this.updateServiceState({
						services: res.data,
						searchedServices: true,
						loading: false,
						hasServiceError: false
					});
				} else {
					this.updateServiceState({ loading: false, hasServiceError: true, searchedServices: true });
				}
			}, () => {
				this.updateServiceState({ loading: false, hasServiceError: true, searchedServices: true });
			})
		);
	}

	resetState() {
		this.updateServiceState(makeServiceState({}));
	}
}
