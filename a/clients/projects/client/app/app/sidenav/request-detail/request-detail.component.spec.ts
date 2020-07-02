import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailComponent } from './request-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';

describe('RequestDetailComponent', () => {
	let component: RequestDetailComponent;
	let fixture: ComponentFixture<RequestDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RequestDetailComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
