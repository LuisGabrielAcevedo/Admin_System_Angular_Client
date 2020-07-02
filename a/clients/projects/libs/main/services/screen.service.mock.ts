import { Injectable } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';


@Injectable()
export class MediaServiceMock {

	constructor() {}

	isMobileObserver(): Observable<BreakpointState> {
		return new Observable<BreakpointState>();
	}

}
