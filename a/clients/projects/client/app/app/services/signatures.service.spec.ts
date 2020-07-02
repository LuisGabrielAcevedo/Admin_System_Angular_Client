import { TestBed } from '@angular/core/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { SignaturesService } from './signatures.service';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { UserServiceMock } from './user.service.mock';
import { UserService } from './user.service';

describe('SignaturesService', () => {
	let signaturesService: SignaturesService;

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
				SignaturesService
			]
		})
	);

	beforeEach(() => {
		signaturesService = TestBed.get(SignaturesService);
	});

	it('should be created', () => {
		expect(signaturesService).toBeTruthy();
	});
});
