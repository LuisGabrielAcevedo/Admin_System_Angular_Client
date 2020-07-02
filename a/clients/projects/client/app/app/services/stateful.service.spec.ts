import { TestBed } from '@angular/core/testing';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { EventServiceMock } from './event.service.mock';

describe('StatefulService', () => {
	let statefulService: StatefulService;
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{ provide: EventService, useClass: EventServiceMock },
				StatefulService
			]
		})
	);

	beforeEach(() => {
		statefulService = TestBed.get(StatefulService);
	});

	it('should be created', () => {
		expect(statefulService).toBeTruthy();
	});

	it('it should throw an error on resetState', () => {
		expect(statefulService.resetState).toThrowError();
	});
});
