import { TestBed } from '@angular/core/testing';
import { MovementsService } from './movements.service';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { CSVService } from './csv.service';
import { CSVServiceMock } from './csv.service.mock';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IAccountMovement, makeAccountMovement } from 'client/app/app/modules/accounts/models';
import { IAccount, makeAccount } from 'client/app/app/models';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { EventServiceMock } from './event.service.mock';
import { EventService } from './event.service';

describe('MovementsService', () => {
	let movementsService: MovementsService;
	let dataService: DataService;
	let translateService: TranslateService;
	let utilsService: UtilsService;
	let csvService: CSVService;

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: CSVService, useClass: CSVServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: EventService, useClass: EventServiceMock },
				MovementsService
			],
			imports: [TranslateModule.forRoot()]
		})
	);

	beforeEach(() => {
		movementsService = TestBed.get(MovementsService);
		translateService = TestBed.get(TranslateService);
		utilsService = TestBed.get(UtilsService);
		csvService = TestBed.get(CSVService);
		dataService = TestBed.get(DataService);
	});

	it('should be created', () => {
		expect(movementsService).toBeTruthy();
	});

	it('should load the movements from API', () => {
		spyOn(dataService, 'get');
		const account: IAccount = makeAccount({});
		movementsService.getMovements(account);
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should load the movement detail from API', () => {
		spyOn(dataService, 'get');
		movementsService.getMovementDetail(makeAccountMovement({}), makeAccount({}));
		expect(dataService.get).toHaveBeenCalled();
	});

	it('when serializeMovement is called, should call to formatAmount from utilsService', () => {
		spyOn(utilsService, 'formatAmount');
		const movement: IAccountMovement = makeAccountMovement({});
		const account: IAccount = makeAccount({});
		movementsService.serializeMovement(movement, account);
		expect(utilsService.formatAmount).toHaveBeenCalledWith(movement.amount);
	});

	it('when serializeMovement is called, should call to formattedDate', () => {
		spyOn(movementsService, 'formattedDate');
		const movement: IAccountMovement = makeAccountMovement({});
		const account: IAccount = makeAccount({});
		movementsService.serializeMovement(movement, account);
		expect(movementsService.formattedDate).toHaveBeenCalledWith(movement.accountingDate);
	});

	it('when formattedDate is called with undefined date, should return empty string', () => {
		const formattedDate = movementsService.formattedDate(undefined);
		expect(formattedDate).toBe('');
	});

	it('when exportToCSV is called, should call to instant from translateService', () => {
		spyOn(translateService, 'instant');
		const movement: IAccountMovement = makeAccountMovement({});
		const account: IAccount = makeAccount({});
		movementsService.exportToCSV([movement], account);
		expect(translateService.instant).toHaveBeenCalledWith('pages.accounts.accountMovements.accountMovementsFileName');
	});

	it('when exportToCSV is called, should call to subscribe from getTableHeaders', () => {
		spyOn(movementsService, 'getTableHeaders').and.returnValue([]);
		spyOn(movementsService, 'serializeMovement');
		spyOn(csvService, 'downloadCSV');
		const movement: IAccountMovement = makeAccountMovement({});
		const account: IAccount = makeAccount({});
		movementsService.exportToCSV([movement], account);
		expect(movementsService.getTableHeaders).toHaveBeenCalled();
		expect(movementsService.serializeMovement).toHaveBeenCalled();
		expect(csvService.downloadCSV).toHaveBeenCalled();
	});
});
