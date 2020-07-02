import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddFindComponent } from './contact-add-find.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { of, BehaviorSubject } from 'rxjs';
import { IContact, makeContact, makeContactState, IFindContactFormChangeEvent, FormValue, makeFindContactFormChangeEvent } from 'client/app/app/models';

describe('ContactAddFindComponent', () => {
	let component: ContactAddFindComponent;
	let fixture: ComponentFixture<ContactAddFindComponent>;
	let sidenavService: SidenavService;
	let contactService: ContactService;
	const contact: IContact = makeContact({});
	const data: FormValue<IFindContactFormChangeEvent> = makeFindContactFormChangeEvent({});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ContactAddFindComponent ],
			imports: [
				TranslateModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactAddFindComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		contactService = TestBed.get(ContactService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call contact service on empty state', () => {
		spyOn(contactService, 'getContactState').and.returnValue(new BehaviorSubject(makeContactState({})));
		spyOn(contactService, 'findContacts');
		component.ngOnInit();
		expect(contactService.getContactState).toHaveBeenCalled();
		expect(contactService.findContacts).toHaveBeenCalled();
	});

	it('should not call contact service on init', () => {
		spyOn(contactService, 'getContactState').and.returnValue(new BehaviorSubject(makeContactState({ searchedContacts: true })));
		spyOn(contactService, 'findContacts');
		component.ngOnInit();
		expect(contactService.getContactState).toHaveBeenCalled();
		expect(contactService.findContacts).not.toHaveBeenCalled();
	});

	it('should go to the next step', () => {
		component.onFindContactFormChange(data);
		expect(component.findContactFormValue ).toEqual(data);
	});

	it('should handle on continue by cbvu', () => {
		component.findContactFormValue.value.searchBy = 'cbvu';
		component.findContactFormValue.value.cbvu = '1234567890123456789012';
		spyOn(contactService, 'findContactBy').and.returnValue(of(contact));
		spyOn(sidenavService, 'nextStep');
		component.onContinue();
		expect(contactService.findContactBy).toHaveBeenCalled();
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});

	it('should handle on continue by alias', () => {
		component.findContactFormValue.value.searchBy = 'alias';
		component.findContactFormValue.value.alias = 'alias test';
		spyOn(contactService, 'findContactBy').and.returnValue(of(null));
		component.onContinue();
		expect(contactService.findContactBy).toHaveBeenCalled();
	});
});
