import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckbookRequestDetailComponent } from './checkbook-request-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { makeRequest } from 'client/app/app/models';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { makeCheckbook } from 'client/app/app/models/checkbook';
import { CheckbooksTypesService } from 'client/app/app/services/checkbooks-types.service';
import { CheckbooksTypesServiceMock } from 'client/app/app/services/checkbooks-types.service.mock';

describe('CheckbookRequestDetailComponent', () => {
	let component: CheckbookRequestDetailComponent;
	let fixture: ComponentFixture<CheckbookRequestDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CheckbookRequestDetailComponent ],
			imports: [TranslateModule.forRoot(), PipesModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{provide: UtilsService, useClass: UtilsServiceMock},
				{provide: PdfService, useClass: PdfServiceMock},
				{provide: ReceiptsService, useClass: ReceiptsServiceMock},
				{provide: RequestsService, useClass: RequestsServiceMock},
				{provide: CheckbooksTypesService, useClass: CheckbooksTypesServiceMock}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckbookRequestDetailComponent);
		component = fixture.componentInstance;
		component.data = {
			request: makeRequest({
				content: makeCheckbook({
					state: 'APPROVED',
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
