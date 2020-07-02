import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceRequestDetailComponent } from './service-request-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { makeRequest, makeServicePayment } from 'client/app/app/models';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';

describe('ServiceRequestDetailComponent', () => {
	let component: ServiceRequestDetailComponent;
	let fixture: ComponentFixture<ServiceRequestDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ServiceRequestDetailComponent ],
			imports: [TranslateModule.forRoot(), PipesModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{provide: UtilsService, useClass: UtilsServiceMock},
				{provide: PdfService, useClass: PdfServiceMock},
				{provide: ReceiptsService, useClass: ReceiptsServiceMock},
				{provide: RequestsService, useClass: RequestsServiceMock},
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServiceRequestDetailComponent);
		component = fixture.componentInstance;
		component.data = {
			request: makeRequest({
				content: makeServicePayment({
					state: 'APPROVED'
				})
			}),
			date: new Date(),
			state: 'AUTHORIZED'
		}
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
