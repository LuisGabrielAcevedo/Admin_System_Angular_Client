import { TestBed } from '@angular/core/testing';
import { ChecksService } from './checks.service';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { EventService } from './event.service';
import { EventServiceMock } from './event.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('ChecksService', () => {
	let checksService: ChecksService;

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				ChecksService,
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
			],
		})
	);

	beforeEach(() => {
		checksService = TestBed.get(ChecksService);
	});

	it('should be created', () => {
		expect(checksService).toBeTruthy();
	});
});
