import { DataService } from '@mcy/core/services/data.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import {
	makeServiceCategoryState,
	IServiceCategoryState,
	IServiceCategoriesResponse
} from 'client/app/app/models';
import { EventService } from './event.service';
import { StatefulService } from './stateful.service';

@Injectable()
export class ServiceCategoryService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<IServiceCategoryState>(
		makeServiceCategoryState({})
	);
	public subscription: Subscription;

	constructor(
		private dataService: DataService,
		public eventService: EventService
	) {
		super(eventService);
		this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	updateServiceCategoryState(data: Partial<IServiceCategoryState>) {
		this.subject.next(
			makeServiceCategoryState({
				...this.getServiceCategoryState().value,
				...data
			})
		);
	}

	getServiceCategoryState(): BehaviorSubject<IServiceCategoryState> {
		return this.subject;
	}

	getServiceCategories(): Observable<IServiceCategoriesResponse> {
		return this.dataService.get('v1/pagomiscuentas/categories');
	}

	findServiceCategories(): void {
		this.updateServiceCategoryState({ loading: true });
		this.subscription.add(
			this.getServiceCategories()
			.subscribe((res: IServiceCategoriesResponse) => {
				if (res.success && res.data.length) {
					this.updateServiceCategoryState({
						categories: res.data,
						searchedCategories: true,
						loading: false,
						hasErrorCategories: false
					});
				} else {
					this.updateServiceCategoryState({ loading: false, hasErrorCategories: true, searchedCategories: true });
				}
			}, () => {
				this.updateServiceCategoryState({ loading: false, hasErrorCategories: true, searchedCategories: true });
			})
		);
	}

	resetState() {
		this.updateServiceCategoryState(makeServiceCategoryState({}));
	}
}
