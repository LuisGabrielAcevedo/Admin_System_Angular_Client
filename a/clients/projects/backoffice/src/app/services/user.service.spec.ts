import { TestBed } from '@angular/core/testing';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { AgentDataService } from './data.service';
import { UserService } from './user.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { of } from 'rxjs';
import { IEnterpriseResponse, makeEnterprise } from 'backoffice/src/app/models/user';
import { AgentDataServiceMock } from 'backoffice/src/app/services/data.service.mock';

describe('UserService', () => {
	let service: UserService;

	const enterpriseResponse: IEnterpriseResponse = { success: true, data: makeEnterprise({}), status: [] }

	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [
				CoreModule,
			],
			providers: [
				UserService,
				{ provide: AgentDataService, useClass: AgentDataServiceMock },
				{ provide: XHRService, useClass: XHRServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock }
			]
		}).compileComponents()
	);

	beforeEach(() => {
		service = TestBed.get(UserService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should handle findEnterprise', () => {
		spyOn(service, 'getEnterprise').and.returnValue(of(enterpriseResponse));
		spyOn(service, 'updateUserState');
		service.findEnterprise(1);
		expect(service.getEnterprise).toHaveBeenCalled();
		expect(service.updateUserState).toHaveBeenCalled();
	});
});
