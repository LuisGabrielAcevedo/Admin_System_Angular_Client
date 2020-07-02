import { TestBed } from '@angular/core/testing';
import { ReceiptsService } from './receipts.service';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';

describe('ReceiptsService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			{ provide: DataService, useClass: DataServiceMock },
			ReceiptsService
		],
	}));

	it('should be created', () => {
		const service: ReceiptsService = TestBed.get(ReceiptsService);
		expect(service).toBeTruthy();
	});
});
