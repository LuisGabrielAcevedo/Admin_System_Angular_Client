import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConceptState } from 'client/app/app/models';

@Injectable()
export class ConceptServiceMock {
	getConcepts(): Observable<boolean> {
		return new Observable();
	}

	updateConceptState(_data: Partial<IConceptState>) {
	}

	getConceptState(): Observable<IConceptState> {
		return new Observable();
	}
}