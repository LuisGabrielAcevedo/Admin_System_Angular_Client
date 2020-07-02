import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDeleteComponent } from './contact-delete.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';

describe('ContactDeleteComponent', () => {
	let component: ContactDeleteComponent;
	let fixture: ComponentFixture<ContactDeleteComponent>;
	let sidenavService: SidenavService;
	let contactService: ContactService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ContactDeleteComponent ],
			imports: [
				TranslateModule.forRoot(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: ContactService, useClass: ContactServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock },
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactDeleteComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		contactService = TestBed.get(ContactService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should go to the previous step', () => {
		spyOn(sidenavService, 'prevStep');
		component.back();
		expect(sidenavService.prevStep).toHaveBeenCalled();
	});

	it('should remove the contact', () => {
		spyOn(contactService, 'removeContact');
		spyOn(sidenavService, 'close');
		component.removeContact();
		expect(contactService.removeContact).toHaveBeenCalled();
		expect(sidenavService.close).toHaveBeenCalled();
	});
});
