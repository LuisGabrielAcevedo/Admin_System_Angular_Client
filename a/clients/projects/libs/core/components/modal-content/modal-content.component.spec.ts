import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalContentComponent } from './modal-content.component';

describe('ModalContentComponent', () => {
	let component: ModalContentComponent;
	let fixture: ComponentFixture<ModalContentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ModalContentComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
