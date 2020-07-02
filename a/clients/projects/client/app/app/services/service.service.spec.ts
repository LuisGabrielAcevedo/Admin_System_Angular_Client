import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ServiceService } from './service.service';
import {
	makeService,
	IServicesResponse, makeServiceState,
} from 'client/app/app/models';
import { of, throwError } from 'rxjs';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';

describe('ServiceService', () => {
	let service: ServiceService;
	let dataService: DataService;
	const servicesSuccessResponse: IServicesResponse = {
		success: true,
		status: [],
		data: [makeService({})]
	};

	const servicesBussinessResponse: IServicesResponse = {
		success: false,
		status: [{ code: '1', message: 'foo' }, { code: '2', message: 'foo' }],
		data: []
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([])],
			providers: [
				ServiceService,
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]
		});
	});
	beforeEach(() => {
		service = TestBed.get(ServiceService);
		dataService = TestBed.get(DataService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should unsubscribe on dismount', () => {
		spyOn(service.subscription, 'unsubscribe');
		service.ngOnDestroy();
		expect(service.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should return services', () => {
		spyOn(service, 'getServices').and.returnValue(
			of(servicesSuccessResponse)
		);
		spyOn(service, 'updateServiceState');
		service.findServices('');
		expect(service.getServices).toHaveBeenCalled();
		expect(service.updateServiceState).toHaveBeenCalled();
	});

	it('should fail getting services due to a bussiness error', () => {
		spyOn(service, 'getServices').and.returnValue(of(servicesBussinessResponse));
		service.findServices('');
		expect(service.getServices).toHaveBeenCalled();
	});

	it('should handle a failure response', () => {
		spyOn(service, 'getServices').and.returnValue(throwError('Error'));
		service.findServices('');
		expect(service.getServices).toHaveBeenCalled();
	});

	it('should load the services from API', () => {
		spyOn(dataService, 'get');
		service.getServices('');
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should update service state', () => {
		spyOn(service.subject, 'next');
		service.updateServiceState({});
		expect(service.subject.next).toHaveBeenCalledWith(makeServiceState({}));
	});

	it('should return a service state', () => {
		const subject = service.getServiceState();
		expect(service.subject).toEqual(subject);
	});
});
