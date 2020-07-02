import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EnableCheckbookComponent } from './enable-checkbook.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { FormBuilder } from '@angular/forms';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CheckbooksService } from 'client/app/app/services/checkbooks.service';
import { CheckbooksServiceMock } from 'client/app/app/services/checkbooks.service.mock';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { SoftTokenServiceMock } from 'client/app/app/services/soft-token.service.mock';

describe('EnableCheckbookComponent', () => {
	let component: EnableCheckbookComponent;
	let fixture: ComponentFixture<EnableCheckbookComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EnableCheckbookComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				CoreModule.forRoot(),
				BrowserAnimationsModule,
			],
			providers: [
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: CheckbooksService, useClass: CheckbooksServiceMock },
				{ provide: SoftTokenService, useClass: SoftTokenServiceMock },
				FormBuilder,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EnableCheckbookComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
