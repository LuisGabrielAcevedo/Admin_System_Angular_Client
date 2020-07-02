import { Observable } from 'rxjs/internal/Observable';

export type Event = 'changeEnterprise';

export class EventServiceMock {

	on(_subscribedEvent: Event): Observable<string> {
		return new Observable();
	}

	emit(_event: Event) { }
}
