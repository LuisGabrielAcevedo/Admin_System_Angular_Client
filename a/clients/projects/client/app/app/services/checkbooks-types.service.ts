import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { DataService } from '@mcy/core/services/data.service';
import {
			ITypesOfCheckbookResponse,
			ITypesOfCheckbookState,
			makeTypesOfCheckbookState
		} from 'client/app/app/models/checkbook';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { SidenavService } from './sidenav.service';
import { IAccount } from '../models';

@Injectable()
export class CheckbooksTypesService extends StatefulService implements OnDestroy{
	public subject = new BehaviorSubject<ITypesOfCheckbookState>(makeTypesOfCheckbookState({}));

	public subscription = new Subscription();

	constructor(
		private dataService: DataService,
		public eventService: EventService,
		private sidenavService: SidenavService
	) {
		super(eventService);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	findTypesOfCheckbooks(account: IAccount): void {
		this.subscription.add(
			this.getTypesOfCheckbook(account).subscribe(
				(res: ITypesOfCheckbookResponse) => {
					if (res.success && Object.keys(res.data).length) {
						this.updateTypesOfCheckbookState({
							typesOfCheckbooks: res.data.checkbookTypes,
							provinces: res.data.provinces,
							searchedTypesOfCheckbooks: true
						});
					} else {
						this.sidenavService.onError(() => this.sidenavService.close(), { message: res.status[0]!.message} );
					}
				},
				() => {
					this.sidenavService.onError(() => this.sidenavService.close() );
				}
			)
		);
	}

	getTypesOfCheckbook(account: IAccount): Observable<ITypesOfCheckbookResponse> {
		return this.dataService.get(
			`v1/checkbooks/types`,
			{
				params: {
					accountNumber: account.number
				}
			}
		);
	}

	getTypesOfCheckbookState(): BehaviorSubject<ITypesOfCheckbookState> {
		return this.subject;
	}

	updateTypesOfCheckbookState(data: Partial<ITypesOfCheckbookState>) {
		this.subject.next(
			makeTypesOfCheckbookState({ ...this.getTypesOfCheckbookState().value, ...data })
		);
	}

	resetState() {
		this.updateTypesOfCheckbookState(makeTypesOfCheckbookState({}));
	}
}
