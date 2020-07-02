import { TestBed } from '@angular/core/testing';
import { StatementsService } from './statements.service';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { IAccount, makeAccount } from 'client/app/app/models';
import { EventServiceMock } from './event.service.mock';
import { EventService } from './event.service';

describe('StatementsService', () => {
	let dataService: DataService;
	let statementService: StatementsService;
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				StatementsService
			]
		})
	);

	beforeEach(() => {
		dataService = TestBed.get(DataService);
		statementService = TestBed.get(StatementsService);
	});

	it('should be created', () => {
		expect(statementService).toBeTruthy();
	});

	it('should load the statements from API', () => {
		spyOn(dataService, 'get');
		const account: IAccount = makeAccount({});
		statementService.getStatements(account);
		expect(dataService.get).toHaveBeenCalled();
	});
});
