import { Injectable } from '@angular/core';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';
import { IConceptResponse, IConceptState, makeConceptState } from 'client/app/app/models';
import { map } from 'rxjs/operators';
import { DataService } from '@mcy/core/services/data.service';

@Injectable()
export class ConceptService {
	public subject = new BehaviorSubject<IConceptState>(makeConceptState({}));
	public subscription: Subscription = new Subscription();

	constructor(
		private dataService: DataService
	) {}

	getConcepts(): Observable<boolean> {
		if (this.getConceptState().value.concepts.length){
			return of(true);
		} else {
			return this.dataService.get<IConceptResponse>('v1/transfers/concepts').pipe(
				map((response: IConceptResponse) => {
					if (response.success) {
						this.updateConceptState({ concepts: response.data });
						return true;
					} else {
						return false;
					}
				})
			);
		}
	}

	updateConceptState(data: Partial<IConceptState>) {
		this.subject.next(makeConceptState({ ...this.getConceptState().value, ...data }));
	}

	getConceptState(): BehaviorSubject<IConceptState> {
		return this.subject;
	}
}
