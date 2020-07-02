import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';

describe('TransactionService', () => {
	let transactionService: TransactionService;

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				TransactionService,
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: EventService, useClass: EventServiceMock }
			]
		})
	);

	beforeEach(() => {
		transactionService = TestBed.get(TransactionService);
	});

	it('should be created', () => {
		expect(transactionService).toBeTruthy();
	});
});
