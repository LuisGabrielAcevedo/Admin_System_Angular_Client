import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EnterpriseButtonComponent } from './enterprise-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material';
import { makeEnterprise } from 'client/app/app/models';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('EnterpriseButtonComponent', () => {
	let component: EnterpriseButtonComponent;
	let fixture: ComponentFixture<EnterpriseButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EnterpriseButtonComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [ 
				{ provide: EventService, useClass: EventServiceMock }
			],
			imports: [
				TranslateModule.forRoot(),
				MatMenuModule,
				RouterTestingModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EnterpriseButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit on view details', () => {
		spyOn(component.handleOnViewEnterpriseDetails, 'emit');
		component.onViewDetailsClick();
		expect(component.handleOnViewEnterpriseDetails.emit).toHaveBeenCalled();
	});

	it('should filter enterprises', () => {
		component.selectedEnterprise = makeEnterprise({ id: '1' });
		component.enterprises = [ makeEnterprise({ id: '1' }), makeEnterprise({ id: '2' }) ]
		expect(component.otherEnterprises.length).toBe(1);
		expect(component.otherEnterprises[0].id).toEqual('2');
	});

	it('should toggle the menu status', () => {
		component.handleMenuOpened();
		expect(component.menuOpened).toBeTruthy();
	});

	it('should emit on view all enterprises', () => {
		spyOn(component.handleOnViewAllEnterprisesClick, 'emit');
		component.onViewAllEnterprisesClick();
		expect(component.handleOnViewAllEnterprisesClick.emit).toHaveBeenCalled();
	});
});
