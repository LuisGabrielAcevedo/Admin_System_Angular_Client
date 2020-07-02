import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoDataMessageComponent } from './no-data-message.component';

describe('NoDataMessageComponent', () => {
	let component: NoDataMessageComponent;
	let fixture: ComponentFixture<NoDataMessageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NoDataMessageComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NoDataMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
