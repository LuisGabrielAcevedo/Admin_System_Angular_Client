import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PositiveValidationComponent } from './positive-validation.component';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { XHRService } from '@mcy/main/services/xhr.service';
import { PasswordServiceMock } from '@mcy/core/services/password.service.mock';
import { PasswordService } from '@mcy/core/services/password.service';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { of } from 'rxjs';

describe('PositiveValidationComponent', () => {
	let component: PositiveValidationComponent;
	let fixture: ComponentFixture<PositiveValidationComponent>;
	let userService: UserService;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PositiveValidationComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: XHRService, useClass: XHRServiceMock },
				{ provide: PasswordService, useClass: PasswordServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				ValidatorService
			],
			imports: [TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PositiveValidationComponent);
		userService = TestBed.get(UserService);
		sidenavService = TestBed.get(SidenavService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should open a new tab with the whatsapp url', () => {
		spyOn(window, 'open');
		component.openNewMessage();
		expect(window.open).toHaveBeenCalledWith('https://wa.me/1126028000?text=%23codigoempresa', '_blank' );
	});
	
	it('should handle generating a token on generateSeed', () => {
		spyOn(userService, 'generateNewSeed').and.returnValue(of(true));
		spyOn(sidenavService, 'nextStep');
		component.positiveValidationForm.controls.code.patchValue('13123123');
		component.generateSeed();
		expect(userService.generateNewSeed).toHaveBeenCalled();
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});

	it('should handle could not generate a token on generateSeed', () => {
		spyOn(userService, 'generateNewSeed').and.returnValue(of(false));
		spyOn(component.positiveValidationForm, 'reset');
		component.positiveValidationForm.controls.code.patchValue('13123123');
		component.generateSeed();
		expect(userService.generateNewSeed).toHaveBeenCalled();
		expect(component.positiveValidationForm.reset).toHaveBeenCalled();
	});
});
