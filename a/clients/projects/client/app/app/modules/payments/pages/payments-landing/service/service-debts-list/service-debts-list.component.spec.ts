import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServiceDebtsListComponent } from './service-debts-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IServiceDebt, makeServiceDebt } from 'client/app/app/models';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('ServiceDebtsListComponent', () => {
	let component: ServiceDebtsListComponent;
	let fixture: ComponentFixture<ServiceDebtsListComponent>;
	let service: UtilsService;
	const debt: IServiceDebt = makeServiceDebt({
		banelcoClientId: '545620333433456675723766',
		serviceId: '5dfa20333d33cde6c5f23e66',
		description: 'Cablevisión',
		usdPayment: false,
		amount: 5000
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServiceDebtsListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: UserService, useClass: UserServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServiceDebtsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(UtilsService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit handlePayClick', () => {
		spyOn(component.handlePayClick, 'emit');
		component.pay(debt);
		expect(component.handlePayClick.emit).toHaveBeenCalled();
	});

	it('should call formatDate and return 02 ENE 2020', () => {
		let dateAux = '';
		spyOn(service, 'formatDate').and.returnValue('02 ENE 2020');
		dateAux = component.formatDate(new Date('02/01/2020'));
		expect(service.formatDate).toHaveBeenCalled();
		expect(dateAux).toEqual('02 ENE 2020');
	});
});
