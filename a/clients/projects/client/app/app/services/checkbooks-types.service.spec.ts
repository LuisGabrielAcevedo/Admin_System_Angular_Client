import { TestBed } from '@angular/core/testing';
import { CheckbooksTypesService } from './checkbooks-types.service';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { SidenavService } from './sidenav.service';
import { SidenavServiceMock } from './sidenav.service.mock';

describe('CheckbooksTypesService', () => {
	let service: CheckbooksTypesService;

	beforeEach(() => TestBed.configureTestingModule({
			providers: [
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				CheckbooksTypesService
			]
		})
	);

	beforeEach(() => {
		service = TestBed.get(CheckbooksTypesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
