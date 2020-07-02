import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StatusIconComponent } from './status-icon.component';

describe('StatusIconComponent', () => {
	let component: StatusIconComponent;
	let fixture: ComponentFixture<StatusIconComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StatusIconComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StatusIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call function setStatus and to assign variables classStatus and  icon with the values SUCCESS',() => {
		component.status = 'SUCCESS';
		component.setStatus();
		expect(component.classStatus).toEqual('status-icon__circle--checked');
		expect(component.icon).toEqual('check')
	});

	it('should call functiion setStatus and to assign variables classStatus and  icon with the values APPROVED',() => {
		component.status = 'APPROVED';
		component.setStatus();
		expect(component.classStatus).toEqual('status-icon__circle--checked');
		expect(component.icon).toEqual('check')
	});

	it('should call function setStatus and to assign variables classStatus and  icon with the values PARTIALLY_AUTHORIZED',() => {
		component.status = 'PARTIALLY_AUTHORIZED';
		component.setStatus();
		expect(component.classStatus).toEqual('status-icon__circle--partially-authorized');
		expect(component.icon).toEqual('senha_circulo_outline')
	});


	it('should call function setStatus and to assign variables classStatus and  icon with the values PENDING_APPROVAL',() => {
		component.status = 'PENDING_APPROVAL';
		component.setStatus();
		expect(component.classStatus).toEqual('status-icon__circle--pending-approval');
		expect(component.icon).toEqual('senha_circulo_outline')
	});


	it('should call function setStatus and to assign variables classStatus and  icon with the values CANCELLED',() => {
		component.status = 'CANCELLED';
		component.setStatus();
		expect(component.classStatus).toEqual('status-icon__circle--error');
		expect(component.icon).toEqual('fechar')
	});


	it('should call function setStatus and to assign variables classStatus and  icon with the values REJECTED',() => {
		component.status = 'REJECTED';
		component.setStatus();
		expect(component.classStatus).toEqual('status-icon__circle--error');
		expect(component.icon).toEqual('fechar')
	});

	it('should call function setStyle and to assign variable classState with the value small',() => {
		component.size = 'small';
		component.setStyle();
		expect(component.classState).toEqual('status-icon__circle--small status-icon__icon--small');
	});


	it('should call function setStyle and to assign variable classState with the value medium',() => {
		component.size = 'medium';
		component.setStyle();
		expect(component.classState).toEqual('status-icon__circle--medium status-icon__icon--medium');
	});


	it('should call function setStyle and to assign variable classState with the value large',() => {
		component.size = 'large';
		component.setStyle();
		expect(component.classState).toEqual('status-icon__circle--large status-icon__icon--large');
	});




});
