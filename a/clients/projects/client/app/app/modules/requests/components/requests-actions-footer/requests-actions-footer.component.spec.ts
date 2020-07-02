import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { RequestsActionsFooterComponent } from './requests-actions-footer.component';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('RequestsActionsFooterComponent', () => {
	let component: RequestsActionsFooterComponent;
	let fixture: ComponentFixture<RequestsActionsFooterComponent>;
	let translateService: TranslateService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RequestsActionsFooterComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(), PipesModule],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: TranslateService, useClass: TranslateService }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestsActionsFooterComponent);
		translateService = TestBed.get(TranslateService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call emit in buttonClick when click is called', () => {
		spyOn(component.buttonClick, 'emit');
		component.click();
		expect(component.buttonClick.emit).toHaveBeenCalled();
	});

	it('should call translate service with string pages.requests.requestsList.subtotalARS', () => {
		spyOn(translateService, 'instant');
		component.getSubtotalLabelByCurrency('ARS');
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.requestsList.subtotalARS');
	});
});
