import { EventService } from './event.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StatefulService {
	/*
		This service is used to create a subscription on every service that should have it's state
		reseted when the user changes between enterprises.
	*/

	constructor(public eventService: EventService) {
		/*
			Used setTimeout to avoid executing a resetState event before service initialization
		*/
		setTimeout(() => {
			this.eventService.on('changeEnterprise').subscribe(() => this.resetState());
			this.eventService.on('resetAppState').subscribe(() => this.resetState());
		}, 0);
	}

	resetState() {
		throw  new Error('You should overwrite resetState method');
	}
}
