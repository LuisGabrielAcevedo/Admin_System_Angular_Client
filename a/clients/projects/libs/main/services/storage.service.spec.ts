import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { CONFIG_MODULE_MAIN } from '../main.config';
import { MainService } from '../main.service';

const key = 'a1';
const exampleObject = {data: 'dataa'};
const exampleObjectEncoded = window.btoa(JSON.stringify(exampleObject));
const exampleString = 'stringg';
const exampleBoolean = false;
const exampleNumber = 1;
const exampleDate = new Date();

describe('StorageService', () => {
	describe('basic black tests', () => {
		beforeEach(() => {
			sessionStorage.clear();
			return TestBed.configureTestingModule({
				providers: [
					MainService,
					StorageService,
					{
						provide: CONFIG_MODULE_MAIN,
						useValue: {
							storage: sessionStorage,
							production: false
						}
					}
				]
			});
		});

		it('should be created', () => {
			const service: StorageService = TestBed.get(StorageService);
			expect(service).toBeTruthy();
		});

		it('should save and retrieve an object', () => {
			const service: StorageService = TestBed.get(StorageService);

			service.setData(key, exampleObject);
			const getData: {} = service.getData(key);

			expect(typeof getData).toBe('object');
			expect(getData).toBe(exampleObject);
		});

		it('should save and retrieve a string', () => {
			const service: StorageService = TestBed.get(StorageService);

			service.setData(key, exampleString);
			const getData: string = service.getData(key);

			expect(typeof getData).toBe('string');
			expect(getData).toBe(exampleString);
		});

		it('should save and retrieve a boolean', () => {
			const service: StorageService = TestBed.get(StorageService);

			service.setData(key, exampleBoolean);
			const getData: boolean = service.getData(key);

			expect(typeof getData).toBe('boolean');
			expect(getData).toBe(exampleBoolean);
		});

		it('should save and retrieve a number', () => {
			const service: StorageService = TestBed.get(StorageService);

			service.setData(key, exampleNumber);
			const getData: number = service.getData(key);

			expect(typeof getData).toBe('number');
			expect(getData).toBe(exampleNumber);
		});

		it('should save and retrieve a date', () => {
			const service: StorageService = TestBed.get(StorageService);

			service.setData(key, exampleDate);
			const getData: Date = service.getData(key);

			expect(typeof getData).toBe('object');
			expect(getData.getDay()).toBe(exampleDate.getDay());
			expect(getData).toBe(exampleDate);
		});

		it('should save and retrieve null', () => {
			const service: StorageService = TestBed.get(StorageService);

			service.setData(key, null);
			const getData = service.getData(key);

			expect(typeof getData).toBe('object');
			expect(getData).toBe(null);
		});

		it('should save and retrieve an undefined', () => {
			const service: StorageService = TestBed.get(StorageService);

			service.setData(key, undefined);
			const getData = service.getData(key);

			expect(typeof getData).toBe('undefined');
			expect(getData).toBe(undefined);
		});

		it('should get undefined by not found the key', () => {
			const service: StorageService = TestBed.get(StorageService);

			const getData = service.getData(key);

			expect(typeof getData).toBe('undefined');
			expect(getData).toBe(undefined);
		});

		it('should remove an object by key', () => {
			const service: StorageService = TestBed.get(StorageService);

			let getData = service.getData(key);
			expect(typeof getData).toBe('undefined');
			expect(getData).toBe(undefined);

			service.setData(key, exampleObject);

			getData = service.getData(key);
			expect(typeof getData).toBe('object');
			expect(getData).toBe(exampleObject);

			service.removeData(key);

			getData = service.getData(key);
			expect(typeof getData).toBe('undefined');
			expect(getData).toBe(undefined);
		});

		describe('dataInMemory', () => {
			it('should save and retrieve an object', () => {
				const service: StorageService = TestBed.get(StorageService);

				service.setDataMemory(key, exampleObject);
				const getData: {} = service.getDataMemory(key);

				expect(typeof getData).toBe('object');
				expect(getData).toBe(exampleObject);
			});

			it('should save and retrieve a string', () => {
				const service: StorageService = TestBed.get(StorageService);

				service.setDataMemory(key, exampleString);
				const getData: string = service.getDataMemory(key);

				expect(typeof getData).toBe('string');
				expect(getData).toBe(exampleString);
			});

			it('should save and retrieve a boolean', () => {
				const service: StorageService = TestBed.get(StorageService);

				service.setDataMemory(key, exampleBoolean);
				const getData: boolean = service.getDataMemory(key);

				expect(typeof getData).toBe('boolean');
				expect(getData).toBe(exampleBoolean);
			});

			it('should save and retrieve a number', () => {
				const service: StorageService = TestBed.get(StorageService);

				service.setDataMemory(key, exampleNumber);
				const getData: number = service.getDataMemory(key);

				expect(typeof getData).toBe('number');
				expect(getData).toBe(exampleNumber);
			});

			it('should save and retrieve a date', () => {
				const service: StorageService = TestBed.get(StorageService);

				service.setDataMemory(key, exampleDate);
				const getData: Date = service.getDataMemory(key);

				expect(typeof getData).toBe('object');
				expect(getData.getDay()).toBe(exampleDate.getDay());
				expect(getData).toBe(exampleDate);
			});

			it('should save and retrieve null', () => {
				const service: StorageService = TestBed.get(StorageService);

				service.setDataMemory(key, null);
				const getData = service.getDataMemory(key);

				expect(typeof getData).toBe('object');
				expect(getData).toBeNull();
			});

			it('should save and retrieve an undefined', () => {
				const service: StorageService = TestBed.get(StorageService);

				service.setDataMemory(key, undefined);
				const getData = service.getDataMemory(key);

				expect(typeof getData).toBe('undefined');
				expect(getData).toBeUndefined();
			});

			it('should get undefined by not found the key', () => {
				const service: StorageService = TestBed.get(StorageService);

				const getData = service.getDataMemory(key);

				expect(typeof getData).toBe('undefined');
				expect(getData).toBeUndefined();
			});

			it('should remove an object by key', () => {
				const service: StorageService = TestBed.get(StorageService);

				let getData = service.getDataMemory(key);
				expect(typeof getData).toBe('undefined');

				service.setDataMemory(key, exampleObject);

				getData = service.getDataMemory(key);
				expect(typeof getData).toBe('object');
				expect(getData).toBe(exampleObject);

				service.removeDataMemory(key);

				getData = service.getDataMemory(key);
				expect(typeof getData).toBe('undefined');
				expect(getData).toBeUndefined();
			});

			it('should remove an object with clear', () => {
				const service: StorageService = TestBed.get(StorageService);

				let getData = service.getDataMemory(key);
				expect(typeof getData).toBe('undefined');

				service.setDataMemory(key, exampleObject);

				getData = service.getDataMemory(key);
				expect(typeof getData).toBe('object');
				expect(getData).toBe(exampleObject);

				service.clear();

				getData = service.getDataMemory(key);
				expect(typeof getData).toBe('undefined');
				expect(getData).toBeUndefined();
			});
		});
	});

	describe('with invalid storage', () => {
		beforeEach(() => TestBed.configureTestingModule({
			providers: [
				MainService,
				StorageService,
				{
					provide: CONFIG_MODULE_MAIN,
					useValue: {
						storage: null,
						production: false
					}
				}
			]
		}));

		it('should throw an error', () => {
			const service: StorageService = TestBed.get(StorageService);
			expect(() => {
				service.setData(key, exampleObject);
			}).toThrow();
		});
	});

	describe('white tests sessionStorage (prod true)', () => {
		beforeEach(() => {
			sessionStorage.clear();
			return TestBed.configureTestingModule({
				providers: [
					MainService,
					StorageService,
					{
						provide: CONFIG_MODULE_MAIN,
						useValue: {
							storage: sessionStorage,
							prefix: 'mcykey',
							production: true
						}
					}
				]
			});
		});

		it('should save the object on session and encoded by prod', () => {
			const service: StorageService = TestBed.get(StorageService);

			let item: string | null = sessionStorage.getItem('mcykey' + key);
			expect(item).toBeFalsy();

			service.setData(key, exampleObject);
			item = sessionStorage.getItem('mcykey' + key);

			expect(item).toBeTruthy();
			const len = item && item.toString().length;
			expect(item).toBe(exampleObjectEncoded);
			expect(len).toBeGreaterThan(20);
			expect(len).toBeLessThan(30);
		});

		it('should retrieve the object from session by prod', () => {
			const service: StorageService = TestBed.get(StorageService);

			sessionStorage.setItem('mcykey' + key, exampleObjectEncoded);

			const item = service.getData(key);
			expect(item).toBeTruthy();

			const sessionItem = sessionStorage.getItem('mcykey' + key);
			const len = sessionItem && sessionItem.toString().length;
			expect(len).toBeGreaterThan(20);
			expect(len).toBeLessThan(30);
		});
	});

	describe('white tests sessionStorage', () => {
		beforeEach(() => {
			sessionStorage.clear();
			return TestBed.configureTestingModule({
				providers: [
					MainService,
					StorageService,
					{
						provide: CONFIG_MODULE_MAIN,
						useValue: {
							storage: sessionStorage,
							prefix: 'mcykey',
							production: false
						}
					}
				]
			});
		});


		it('should save the object on session', () => {
			const service: StorageService = TestBed.get(StorageService);

			let item: string | null = sessionStorage.getItem('mcykey' + key);
			expect(item).toBeFalsy();

			service.setData(key, exampleObject);
			item = sessionStorage.getItem('mcykey' + key);

			expect(item).toBeTruthy();
			const len = item && item.length;
			expect(item).toBe(JSON.stringify(exampleObject));
			expect(len).toBeGreaterThan(10);
			expect(len).toBeLessThan(20);
		});

		it('should retrieve the object from session', () => {
			const service: StorageService = TestBed.get(StorageService);
			sessionStorage.setItem('mcykey' + key, JSON.stringify(exampleObject));

			const item = service.getData(key);

			expect(item).toBeTruthy();
			expect(item).toEqual(exampleObject);

			const sessionItem = sessionStorage.getItem('mcykey' + key);
			const len = sessionItem && sessionItem.toString().length;
			expect(len).toBeGreaterThan(10);
			expect(len).toBeLessThan(20);
		});

		it('should retrieve the object from session an invalid item', () => {
			const service: StorageService = TestBed.get(StorageService);

			sessionStorage.setItem('mcykey' + key, exampleObjectEncoded + 'badCharacter');
			let sessionItem = sessionStorage.getItem('mcykey' + key);
			expect(sessionItem).toBeDefined();

			const item = service.getData(key);
			expect(item).toBeFalsy();

			sessionItem = sessionStorage.getItem('mcykey' + key);
			expect(sessionItem).toBeNull();
		});

		it('should remove all items relate to this app', () => {
			const service: StorageService = TestBed.get(StorageService);

			service.setData('1', exampleString);
			service.setData('2', exampleString);
			service.setData('3', exampleString);
			sessionStorage.setItem('dontRemoveMe', exampleString);
			expect(sessionStorage.length).toBe(4);

			service.clear();

			expect(sessionStorage.getItem('dontRemoveMe')).toBeDefined();
			expect(sessionStorage.getItem('mcykey1')).toBeNull();
			expect(sessionStorage.getItem('mcykey2')).toBeNull();
			expect(sessionStorage.getItem('mcykey3')).toBeNull();
			expect(sessionStorage.length).toBe(1);
		});

		it('should remove all items relate to this app from session', () => {
			const service: StorageService = TestBed.get(StorageService);

			sessionStorage.setItem('mcykey1', exampleString);
			sessionStorage.setItem('mcykey2', exampleString);
			sessionStorage.setItem('mcykey3', exampleString);
			sessionStorage.setItem('dontRemoveMe', exampleString);
			expect(sessionStorage.length).toBe(4);

			service.clear();

			expect(sessionStorage.getItem('dontRemoveMe')).toBeDefined();
			expect(sessionStorage.getItem('mcykey1')).toBeNull();
			expect(sessionStorage.getItem('mcykey2')).toBeNull();
			expect(sessionStorage.getItem('mcykey3')).toBeNull();
			expect(sessionStorage.length).toBe(1);
		});
	});
});
