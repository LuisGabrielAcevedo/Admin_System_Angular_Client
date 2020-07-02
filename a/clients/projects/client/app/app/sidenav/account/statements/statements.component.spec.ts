import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementsComponent } from './statements.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { UtilsService,  } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { StatementsServiceMock } from 'client/app/app/services/statements.service.mock';
import { StatementsService } from 'client/app/app/services/statements.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';

describe('StatementsComponent', () => {
	let component: StatementsComponent;
	let fixture: ComponentFixture<StatementsComponent>;
	let sidenavService: SidenavService;
	let utilsService: UtilsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StatementsComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: StatementsService, useClass: StatementsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StatementsComponent);
		sidenavService = TestBed.get(SidenavService);
		utilsService = TestBed.get(UtilsService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call the function close in sidenavService', () => {
		spyOn(sidenavService, 'close');
		component.end();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('should call formatDate and return ENE 2020', () => {
		spyOn(utilsService, 'formatDate').and.returnValue('02 ENE 2020');
		const dateAux = component.formatDate(new Date('02/01/2020'));
		expect(utilsService.formatDate).toHaveBeenCalled();
		expect(dateAux).toEqual('ENE 2020');
	});
});
