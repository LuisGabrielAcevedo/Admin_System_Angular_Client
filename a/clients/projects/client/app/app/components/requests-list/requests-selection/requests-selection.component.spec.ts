import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { RequestsSelectionComponent } from './requests-selection.component';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';

describe('RequestsSelectionComponent', () => {
	let component: RequestsSelectionComponent;
	let fixture: ComponentFixture<RequestsSelectionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RequestsSelectionComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				CoreModule.forRoot(), PipesModule],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestsSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
