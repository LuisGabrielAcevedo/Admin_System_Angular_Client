import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckbooksLandingComponent } from './checkbooks-landing.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { ChecksService } from 'client/app/app/services/checks.service';
import { ChecksServiceMock } from 'client/app/app/services/checks.service.mock';

describe('CheckbooksLandingComponent', () => {
	let component: CheckbooksLandingComponent;
	let fixture: ComponentFixture<CheckbooksLandingComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CheckbooksLandingComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				CoreModule.forRoot(),
				BrowserAnimationsModule,
			],
			providers: [
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: ChecksService, useClass: ChecksServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckbooksLandingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
