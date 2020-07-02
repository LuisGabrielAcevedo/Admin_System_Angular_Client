import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MOBILE_MAX_WIDTH } from 'client/app/app/constants';

@Injectable()
export class ScreenService {

	constructor(private breakpointObserver: BreakpointObserver) {}

	isMobileObserver(): Observable<BreakpointState> {
		return this.breakpointObserver.observe([`(max-width: ${MOBILE_MAX_WIDTH}px)`]);
	}

}
