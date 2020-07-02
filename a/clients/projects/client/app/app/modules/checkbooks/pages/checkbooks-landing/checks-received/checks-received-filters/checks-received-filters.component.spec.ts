import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksReceivedFiltersComponent } from './checks-received-filters.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('ChecksReceivedFiltersComponent', () => {
	let component: ChecksReceivedFiltersComponent;
	let fixture: ComponentFixture<ChecksReceivedFiltersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChecksReceivedFiltersComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder],
			imports: [TranslateModule.forRoot()]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksReceivedFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
