import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UserService } from 'backoffice/src/app/services/user.service';
import { UserServiceMock } from 'backoffice/src/app/services/user.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { LoginService } from 'backoffice/src/app/services/login.service';
import { LoginServiceMock } from 'backoffice/src/app/services/login.service.mock';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let loginService: LoginService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HeaderComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: LoginService, useClass: LoginServiceMock }
			],
			imports: [
				TranslateModule.forRoot()
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		loginService = TestBed.get(LoginService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#logout should logout sesion', () => {
		spyOn(loginService, 'logout');
		component.logout();
		expect(loginService.logout).toHaveBeenCalled();
	});
});
