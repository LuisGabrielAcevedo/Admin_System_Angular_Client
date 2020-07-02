import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseDetailsPage } from './enterprise-details.page';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'backoffice/src/app/services/user.service';
import { UserServiceMock } from 'backoffice/src/app/services/user.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDetailsComponent', () => {
	let component: EnterpriseDetailsPage;
	let fixture: ComponentFixture<EnterpriseDetailsPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EnterpriseDetailsPage ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UserService, useClass: UserServiceMock }
			],
			imports: [
				TranslateModule.forRoot(),
				MatTableModule,
				RouterTestingModule,
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EnterpriseDetailsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
