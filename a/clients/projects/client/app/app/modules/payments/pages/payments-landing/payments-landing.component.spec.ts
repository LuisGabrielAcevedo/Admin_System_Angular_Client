import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsLandingComponent } from './payments-landing.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';

describe('PaymentsLandingComponent', () => {
	let component: PaymentsLandingComponent;
	let fixture: ComponentFixture<PaymentsLandingComponent>;
	let service: StorageService;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PaymentsLandingComponent],
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaymentsLandingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(StorageService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call function setData', () => {
		spyOn(service, 'setData');
		component.setSelectedIndex(1);
		expect(service.setData).toHaveBeenCalled();
	});
});
