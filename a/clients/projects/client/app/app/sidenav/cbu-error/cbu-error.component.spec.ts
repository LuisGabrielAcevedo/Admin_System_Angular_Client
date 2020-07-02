import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CbuErrorComponent } from './cbu-error.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { FeedbackStatus } from 'client/app/app/models';

describe('CbuErrorComponent', () => {
	let component: CbuErrorComponent;
	let fixture: ComponentFixture<CbuErrorComponent>;
	let service: SidenavService;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CbuErrorComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot()],
			providers: [{ provide: SidenavService, useClass: SidenavServiceMock }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CbuErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(SidenavService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should has setted status as ERROR', () => {
		expect(component.status).toBe(FeedbackStatus.error);
	});

	it('should call function close', () => {
		spyOn(service, 'close');
		component.close();
		expect(service.close).toHaveBeenCalledWith();
	});
});
