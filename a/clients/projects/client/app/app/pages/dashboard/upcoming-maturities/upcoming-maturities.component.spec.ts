import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMaturitiesComponent } from './upcoming-maturities.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';

describe('UpcomingMaturitiesComponent', () => {
	let component: UpcomingMaturitiesComponent;
	let fixture: ComponentFixture<UpcomingMaturitiesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UpcomingMaturitiesComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				PipesModule,
				RouterTestingModule,
			],
			providers: [
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: UserService, useClass: UserServiceMock},
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UpcomingMaturitiesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
