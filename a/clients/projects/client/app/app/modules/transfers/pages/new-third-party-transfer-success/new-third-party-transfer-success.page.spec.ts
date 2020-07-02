import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewThirdPartyTransferSuccessPage } from './new-third-party-transfer-success.page';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import {
	makeTransferState,
	makeRequest
} from 'client/app/app/models';
import { Observable } from 'rxjs';
import { ConceptService } from 'client/app/app/services/concept.service';
import { ConceptServiceMock } from 'client/app/app/services/concept.service.mock';

describe('NewThirdPartyTransferSuccessPage', () => {
	let component: NewThirdPartyTransferSuccessPage;
	let fixture: ComponentFixture<NewThirdPartyTransferSuccessPage>;
	let receiptsService: ReceiptsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NewThirdPartyTransferSuccessPage],
			imports: [
				TranslateModule.forRoot(),
				CoreModule,
				RouterTestingModule,
				PipesModule,
			],
			providers: [
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: ConceptService, useClass: ConceptServiceMock }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		}).compileComponents();

		receiptsService = TestBed.get(ReceiptsService);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewThirdPartyTransferSuccessPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call the pdf generation service', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(new Observable());
		component.transferState = makeTransferState({});
		component.lastTransferRequest = makeRequest({
			id: 'test',
		});
		component.downloadReceipt();
		expect(receiptsService.getReceipt).toHaveBeenCalledWith('test');
	});
});
