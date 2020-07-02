import { async, TestBed } from '@angular/core/testing';
import { ScreenService } from './screen.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MOBILE_MAX_WIDTH } from 'client/app/app/constants';

const breakpointObserverMock = {
	observe: jasmine.createSpy()
};

describe('ScreenService', () => {
	let screenService: ScreenService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				ScreenService,
				{ provide: BreakpointObserver, useValue: breakpointObserverMock }
			]
		});
	}));


	it('delegate the media observer with the correct query', () => {
		const mediaQuery = `(max-width: ${MOBILE_MAX_WIDTH}px)`;
		screenService = TestBed.get(ScreenService);
		screenService.isMobileObserver();
		expect(breakpointObserverMock.observe).toHaveBeenCalledWith([
			mediaQuery
		]);
	});
});
