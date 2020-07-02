import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterprisesSelectorComponent } from './enterprises-selector.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { makeEnterprise, IEnterprise } from 'client/app/app/models';

describe('EnterprisesSelectorComponent', () => {
	let component: EnterprisesSelectorComponent;
	let fixture: ComponentFixture<EnterprisesSelectorComponent>;
	let service: SidenavService;
	const enterprise: IEnterprise = makeEnterprise({});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EnterprisesSelectorComponent ],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
			],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EnterprisesSelectorComponent);
		component = fixture.componentInstance;
		service = TestBed.get(SidenavService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should close function is called', () => {
		spyOn(service, 'close');
		component.close(enterprise);
		expect(service.close).toHaveBeenCalled();
	});
});
