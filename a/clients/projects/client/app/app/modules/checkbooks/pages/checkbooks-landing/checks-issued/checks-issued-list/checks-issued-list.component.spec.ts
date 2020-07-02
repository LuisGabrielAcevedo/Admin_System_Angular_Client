import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChecksIssuedListComponent } from './checks-issued-list.component';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ChecksService } from 'client/app/app/services/checks.service';
import { ChecksServiceMock } from 'client/app/app/services/checks.service.mock';

describe('ChecksIssuedListComponent', () => {
	let component: ChecksIssuedListComponent;
	let fixture: ComponentFixture<ChecksIssuedListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChecksIssuedListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(), PipesModule],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ChecksService, useClass: ChecksServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksIssuedListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
