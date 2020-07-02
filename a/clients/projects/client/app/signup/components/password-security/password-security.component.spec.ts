import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PasswordSecurityComponent } from './password-security.component';
import { TranslateService } from '@ngx-translate/core';
import { PasswordService } from '@mcy/core/services/password.service';
import { PasswordServiceMock } from '@mcy/core/services/password.service.mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';


describe('PasswordSecurityComponent', () => {
	let component: PasswordSecurityComponent;
	let fixture: ComponentFixture<PasswordSecurityComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				PipesModule
			],
			declarations: [ PasswordSecurityComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: PasswordService, useClass: PasswordServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PasswordSecurityComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
