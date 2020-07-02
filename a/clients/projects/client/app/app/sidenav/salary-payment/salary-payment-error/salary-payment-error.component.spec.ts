import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryPaymentErrorComponent } from './salary-payment-error.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('SalaryPaymentErrorComponent', () => {
	let component: SalaryPaymentErrorComponent;
	let fixture: ComponentFixture<SalaryPaymentErrorComponent>;
	let service: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryPaymentErrorComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock }
			],
			imports: [TranslateModule.forRoot(), PipesModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(SidenavService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call function close', () => {
		spyOn(service, 'close');
		component.close();
		expect(service.close).toHaveBeenCalled();
	});
});
