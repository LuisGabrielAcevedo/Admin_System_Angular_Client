import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ChecksReceivedListComponent } from './checks-received-list.component';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ChecksService } from 'client/app/app/services/checks.service';
import { ChecksServiceMock } from 'client/app/app/services/checks.service.mock';

describe('ChecksReceivedListComponent', () => {
	let component: ChecksReceivedListComponent;
	let fixture: ComponentFixture<ChecksReceivedListComponent>;
	let service: UtilsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChecksReceivedListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				CoreModule.forRoot(),
				TranslateModule.forRoot(),
				RouterTestingModule
			],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: ChecksService, useClass: ChecksServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksReceivedListComponent);
		service = TestBed.get(UtilsService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call formatDate from utils service', () => {
		spyOn(service, 'formatDate');
		component.formatDate(new Date());
		expect(service.formatDate).toHaveBeenCalled();
	});
});
