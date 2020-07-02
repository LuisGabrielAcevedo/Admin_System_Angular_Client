import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';
import { of } from 'rxjs';

describe('StatefulService', () => {
	let eventService: EventService;

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				EventService
			]
		})
	);

	beforeEach(() => {
		eventService = TestBed.get(EventService);
	});

	it('should be created', () => {
		expect(eventService).toBeTruthy();
	});

	it('should return an observable on', () => {
		spyOn(eventService.subject, 'asObservable').and.returnValue(of(''));
		eventService.on('changeEnterprise');
		expect(eventService.subject.asObservable).toHaveBeenCalled();
	});

	it('should handle emit an event', () => {
		spyOn(eventService.subject, 'next');
		eventService.emit('changeEnterprise');
		expect(eventService.subject.next).toHaveBeenCalled();
	});
});
