import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ValidateContactComponent } from './validate-contact.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { ContactService } from 'client/app/app/services/contact.service';

describe('ValidateContactComponent', () => {
	let component: ValidateContactComponent;
	let fixture: ComponentFixture<ValidateContactComponent>;
	let service: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ValidateContactComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock }
			],
			imports: [RouterTestingModule, TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ValidateContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(SidenavService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call function close', () => {
		spyOn(service, 'close');
		component.cancel();
		expect(service.close).toHaveBeenCalled();
	});

	it('should call function close and router', () => {
		spyOn(service, 'close');
		component.confirm();
		expect(service.close).toHaveBeenCalled();
	});
});
