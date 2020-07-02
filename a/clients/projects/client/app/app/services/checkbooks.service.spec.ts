import { TestBed } from '@angular/core/testing';
import { CheckbooksService } from './checkbooks.service';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';

describe('CheckbooksService', () => {
	let service: CheckbooksService;

	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			{ provide: DataService, useClass: DataServiceMock },
			CheckbooksService]
	}));

	beforeEach(() => {
		service = TestBed.get(CheckbooksService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
