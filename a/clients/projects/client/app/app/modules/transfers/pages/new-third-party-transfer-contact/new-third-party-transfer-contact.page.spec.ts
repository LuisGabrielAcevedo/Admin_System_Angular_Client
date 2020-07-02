import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewThirdPartyTransferContactPage } from './new-third-party-transfer-contact.page';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { BehaviorSubject, of } from 'rxjs';
import { makeContactState, makeContact } from 'client/app/app/models';
import { Router } from '@angular/router';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('NewThirdPartyTransferContactPage', () => {
	let component: NewThirdPartyTransferContactPage;
	let fixture: ComponentFixture<NewThirdPartyTransferContactPage>;
	let contactService: ContactService;
	let router: Router;
	let sidenavService: SidenavService;
	let transferService: TransferService;

	const contact = makeContact({ category: 'PROVIDER', name: 'foo', cbvu: '123456', reference: 'bar' });

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
			],
			providers: [
				{ provide: ContactService, useClass: ContactServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
			],
			declarations: [NewThirdPartyTransferContactPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewThirdPartyTransferContactPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
		contactService = TestBed.get(ContactService);
		router = TestBed.get(Router);
		sidenavService = TestBed.get(SidenavService);
		transferService = TestBed.get(TransferService);
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

	it('should navigate on onBack', () => {
		spyOn(router, 'navigate');
		component.onBack();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should navigate on goToLanding', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should navigate on goToSelectTransfer', () => {
		spyOn(router, 'navigate');
		component.goToSelectTransfer();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should handle on continue', () => {
		spyOn(contactService, 'findContactBy').and.returnValue(of(contact));
		spyOn(sidenavService, 'open');
		component.onContinue();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should handle next', () => {
		spyOn(transferService, 'updateTransferState');
		spyOn(router, 'navigate');
		component.next(makeContact({}));
		expect(transferService.updateTransferState).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalled();
	});
});
