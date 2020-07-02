import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginErrorMessageComponent } from './login-error-message.component';

describe('LoginErrorMessageComponent', () => {
	let component: LoginErrorMessageComponent;
	let fixture: ComponentFixture<LoginErrorMessageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginErrorMessageComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ TranslateModule.forRoot() ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginErrorMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
