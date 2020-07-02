import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FindContactFormComponent } from './find-contact-form.component';
import { FormBuilder } from '@angular/forms';

describe('ContactListComponent', () => {
	let component: FindContactFormComponent;
	let fixture: ComponentFixture<FindContactFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FindContactFormComponent],
			imports: [
				TranslateModule.forRoot(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				FormBuilder,
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FindContactFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle a alias search parameter change', () => {
		const enableAlias = spyOn(component.searchForm.get('alias')!, 'enable');
		const disableCbvu = spyOn(component.searchForm.get('cbvu')!, 'disable');
		component.searchForm.value.searchBy = 'alias';
		component.onOptionChange();
		expect(enableAlias).toHaveBeenCalled();
		expect(disableCbvu).toHaveBeenCalled();
	});

	it('should handle a cbvu search parameter change', () => {
		const enableCbvu = spyOn(component.searchForm.get('cbvu')!, 'enable');
		const disableAlias = spyOn(component.searchForm.get('alias')!, 'disable');
		component.searchForm.value.searchBy = 'cbvu';
		component.onOptionChange();
		expect(enableCbvu).toHaveBeenCalled();
		expect(disableAlias).toHaveBeenCalled();
	});
});
