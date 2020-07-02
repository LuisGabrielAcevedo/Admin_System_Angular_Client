import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecksIssuedFiltersComponent } from './checks-issued-filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChecksIssuedFiltersComponent', () => {
	let component: ChecksIssuedFiltersComponent;
	let fixture: ComponentFixture<ChecksIssuedFiltersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChecksIssuedFiltersComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(), BrowserAnimationsModule],
			providers: [FormBuilder],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksIssuedFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
