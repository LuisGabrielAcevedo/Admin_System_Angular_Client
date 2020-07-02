import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter } from 'rxjs/internal/operators/filter';
import { Observable } from 'rxjs/internal/Observable';

export type Event = 'resetAppState' | 'changeEnterprise' | 'contactDataUpdated' | 'getPermissionsFailed';

export class EventService {
	public subject: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor() {}

	on(subscribedEvent: Event): Observable<string> {
		return this.subject.asObservable().pipe(
			filter(event => event !== ''),
			filter(event => event === subscribedEvent)
		);
	}

	emit(event: Event) {
		this.subject.next(event);
	}
}
