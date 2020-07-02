import { TestBed } from '@angular/core/testing';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';

describe('AuthService', () => {
	let service: AuthService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([])],
			providers: [
				AuthService,
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: XHRService, useClass: XHRServiceMock },
			]
		});
	});
	beforeEach(() => {
		service = TestBed.get(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('function logout called', () => {
		spyOn(service, 'logout').and.callThrough();
		service.logout();
		expect(service.logout).toBeTruthy();
	});
});
