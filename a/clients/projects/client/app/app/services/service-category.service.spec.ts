import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ServiceCategoryService } from './service-category.service';
import {
	makeServiceCategory,
	IServiceCategoriesResponse,
	makeServiceCategoryState
} from 'client/app/app/models';
import { of, throwError } from 'rxjs';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';

describe('ServiceCategoryService', () => {
	let service: ServiceCategoryService;
	let dataService: DataService;

	const serviceCategoriesSuccessResponse: IServiceCategoriesResponse = {
		success: true,
		status: [],
		data: [makeServiceCategory({})]
	};

	const serviceCategoriesBussinessResponse: IServiceCategoriesResponse = {
		success: false,
		status: [{ code: '1', message: 'foo' }, { code: '2', message: 'foo' }],
		data: []
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([])],
			providers: [
				ServiceCategoryService,
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: EventService, useClass: EventServiceMock }
			]
		});
	});
	beforeEach(() => {
		service = TestBed.get(ServiceCategoryService);
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

	it('should return service categories', () => {
		spyOn(service, 'getServiceCategories').and.returnValue(
			of(serviceCategoriesSuccessResponse)
		);
		spyOn(service, 'updateServiceCategoryState');
		service.findServiceCategories();
		expect(service.getServiceCategories).toHaveBeenCalled();
		expect(service.updateServiceCategoryState).toHaveBeenCalled();
	});

	it('should fail getting service categories due to a bussiness error', () => {
		spyOn(service, 'getServiceCategories').and.returnValue(of(serviceCategoriesBussinessResponse));
		service.findServiceCategories();
		expect(service.getServiceCategories).toHaveBeenCalled();
	});

	it('should handle a failure response', () => {
		spyOn(service, 'getServiceCategories').and.returnValue(throwError('Error'));
		service.findServiceCategories();
		expect(service.getServiceCategories).toHaveBeenCalled();
	});

	it('should load the service categories from API', () => {
		spyOn(dataService, 'get');
		service.getServiceCategories();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should update service category state', () => {
		spyOn(service.subject, 'next');
		service.updateServiceCategoryState({});
		expect(service.subject.next).toHaveBeenCalledWith(makeServiceCategoryState({}));
	});

	it('should return a service category state', () => {
		const subject = service.getServiceCategoryState();
		expect(service.subject).toEqual(subject);
	});
});
