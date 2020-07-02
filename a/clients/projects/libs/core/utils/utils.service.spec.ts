import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
	let utilsService: UtilsService;
	const eventString = new KeyboardEvent('keypress', {
		key: 'w'
	});
	const eventNumber = new KeyboardEvent('keypress', {
		key: '5'
	});

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [UtilsService]
		})
	);

	beforeEach(() => {
		utilsService = TestBed.get(UtilsService);
	});

	it('should be created', () => {
		expect(utilsService).toBeTruthy();
	});

	it('should receive a number and return true ', () => {
		expect(utilsService.keypressNumber(eventNumber)).toBeTruthy();
	});

	it('should receive a string and return false ', () => {
		expect(utilsService.keypressNumber(eventString)).toBeFalsy();
	});


	it('should return true if you receive a number else return false ', () => {
		expect(utilsService.keypressNumber(eventNumber)).toBeTruthy();
	});

	it('#formatProfileName should format a name to its initials', () => {
		const name = 'john doe';
		const formattedName = utilsService.formatProfileName(name);
		expect(formattedName).toBe('jd');
	});

	it('#formatProfileName should format a single word name to its initial', () => {
		const name = 'john';
		const formattedName = utilsService.formatProfileName(name);
		expect(formattedName).toBe('j');
	});

	it('#formatDate should call #format with date-hours format if true is passed as second parameter', () => {
		const date = new Date();
		const dateHoursFormat = 'dd MMM yyyy - HH:mm'
		spyOn(utilsService, 'format').and.returnValue('');
		utilsService.formatDate(date, true);
		expect(utilsService.format).toHaveBeenCalledWith(date, dateHoursFormat, {locale: utilsService.es});
	});

	it('#formatDate should call #format with date format if true is not passed as second parameter', () => {
		const date = new Date();
		const dateFormat = 'dd MMM yyyy';
		spyOn(utilsService, 'format').and.returnValue('');
		utilsService.formatDate(date);
		expect(utilsService.format).toHaveBeenCalledWith(date, dateFormat, {locale: utilsService.es});
	});

	it('#removeSpecialCharater should remove special characters', () => {
		const textAux = 'Cablevisión';
		expect(utilsService.removeSpecialCharater(textAux)).toEqual('Cablevision');
	});
});
