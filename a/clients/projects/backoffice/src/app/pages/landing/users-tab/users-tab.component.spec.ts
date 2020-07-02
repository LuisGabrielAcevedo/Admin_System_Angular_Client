import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingUsersTabComponent } from './users-tab.component';
import { AppModule } from 'backoffice/src/app/app.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'backoffice/src/app/services/user.service';
import { UserServiceMock } from 'backoffice/src/app/services/user.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LandingEnterpriseTabComponent', () => {
	let component: LandingUsersTabComponent;
	let fixture: ComponentFixture<LandingUsersTabComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				AppModule,
				TranslateModule.forRoot(),
				RouterTestingModule,
				BrowserAnimationsModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UserService, useClass: UserServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LandingUsersTabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
