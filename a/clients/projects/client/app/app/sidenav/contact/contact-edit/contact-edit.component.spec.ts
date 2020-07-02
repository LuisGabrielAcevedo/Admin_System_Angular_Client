import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditComponent } from './contact-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { of, throwError } from 'rxjs';
import { makeContact } from 'client/app/app/models';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { PasswordService } from '@mcy/core/services/password.service';
import { PasswordServiceMock } from '@mcy/core/services/password.service.mock';

describe('ContactEditComponent', () => {
	let component: ContactEditComponent;
	let fixture: ComponentFixture<ContactEditComponent>;
	let contactService: ContactService;
	let sidenavService: SidenavService;

	const accountData: any = {
		data: [ makeContact({}) ],
		status: '0',
	};
	const accountDataEmpty: any = {
		data: []
	};
	const accountDataError: any = {
		status: '404',
		message: 'El CBU es incorrecto'
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				CoreModule,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			declarations: [ ContactEditComponent ],
			providers: [
				{ provide: ContactService, useClass: ContactServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: XHRService, useClass: XHRServiceMock },
				{ provide: PasswordService, useClass: PasswordServiceMock },
				ValidatorService
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactEditComponent);
		component = fixture.componentInstance;
		contactService = TestBed.get(ContactService);
		sidenavService = TestBed.get(SidenavService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should init', () => {
		spyOn(component, 'loadAccountData');
		component.ngOnInit();
		expect(component.loadAccountData).toHaveBeenCalled();
	});

	it('should set the contact data', () => {
		const formData = component.contactForm.controls;
		spyOn(formData.email, 'setValue');
		spyOn(formData.reference, 'setValue');
		spyOn(formData.category, 'setValue');
		component.setContactForm();
		expect(formData.email.setValue).toHaveBeenCalled();
		expect(formData.reference.setValue).toHaveBeenCalled();
		expect(formData.category.setValue).toHaveBeenCalled();
	});

	it('should get the contact data', () => {
		spyOn(contactService, 'findContactBy').and.returnValue(of(accountData));
		component.loadAccountData();
		expect(contactService.findContactBy).toHaveBeenCalled();
	});

	it('should get the contact data empty', () => {
		spyOn(contactService, 'findContactBy').and.returnValue(of(accountDataEmpty));
		component.loadAccountData();
		expect(contactService.findContactBy).toHaveBeenCalled();
	});

	it('should get the contact data with error', () => {
		spyOn(contactService, 'findContactBy').and.returnValue(throwError(accountDataError));
		component.loadAccountData();
		expect(contactService.findContactBy).toHaveBeenCalled();
	});

	it('should update the contact data', () => {
		spyOn(contactService, 'updateContact').and.returnValue(of(accountData));
		component.submitContactData();
		expect(contactService.updateContact).toHaveBeenCalled();
	});

	it('should update the contact data with error', () => {
		spyOn(contactService, 'updateContact').and.returnValue(throwError(accountDataError));
		component.submitContactData();
		expect(contactService.updateContact).toHaveBeenCalled();
	});

	it('should handle deleteStep', () => {
		spyOn(sidenavService, 'nextStep');
		component.deleteStep();
		expect(sidenavService.nextStep).toHaveBeenCalled();
	})

	it('should update favorite form vlaue on onFavoriteClick', () => {
		spyOn(component.contactForm.controls.favorite, 'patchValue');
		component.onFavoriteClick();
		expect(component.contactForm.controls.favorite.patchValue).toHaveBeenCalled();
	});
});
