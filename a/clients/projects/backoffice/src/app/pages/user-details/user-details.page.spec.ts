import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsPage } from './user-details.page';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'backoffice/src/app/services/user.service';
import { UserServiceMock } from 'backoffice/src/app/services/user.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@mcy/core/core.module';

describe('UserDetailsComponent', () => {
	let component: UserDetailsPage;
	let fixture: ComponentFixture<UserDetailsPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UserDetailsPage ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UserService, useClass: UserServiceMock }
			],
			imports: [
				CoreModule,
				TranslateModule.forRoot(),
				RouterTestingModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserDetailsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
