import { TestBed } from '@angular/core/testing';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { AgentDataService } from './data.service';
import { UserService } from './user.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';

describe('AgentDataService', () => {
	let service: AgentDataService;
	let storageService: StorageService;
	let xhrService: XHRService;

	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [
				CoreModule,
			],
			providers: [
				AgentDataService,
				UserService,
				{ provide: XHRService, useClass: XHRServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock }
			]
		}).compileComponents()
	);

	beforeEach(() => {
		service = TestBed.get(AgentDataService);
		xhrService = TestBed.get(XHRService);
		storageService = TestBed.get(StorageService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should handle delete', () => {
		spyOn(xhrService, 'delete');
		spyOn(service, 'setOptions');
		service.delete('test');
		expect(xhrService.delete).toHaveBeenCalled();
		expect(service.setOptions).toHaveBeenCalled();
	});

	it('should handle get', () => {
		spyOn(xhrService, 'get');
		spyOn(service, 'setOptions');
		service.get('test');
		expect(xhrService.get).toHaveBeenCalled();
		expect(service.setOptions).toHaveBeenCalled();
	});

	it('should handle post', () => {
		spyOn(xhrService, 'post');
		spyOn(service, 'setOptions');
		service.post('test');
		expect(xhrService.post).toHaveBeenCalled();
		expect(service.setOptions).toHaveBeenCalled();
	});

	it('should handle patch', () => {
		spyOn(xhrService, 'patch');
		spyOn(service, 'setOptions');
		service.patch('test');
		expect(xhrService.patch).toHaveBeenCalled();
		expect(service.setOptions).toHaveBeenCalled();
	});

	it('should handle setOptions', () => {
		spyOn(storageService, 'getData').and.returnValue('test');
		service.setOptions();
		expect(storageService.getData).toHaveBeenCalled();
	});
});
