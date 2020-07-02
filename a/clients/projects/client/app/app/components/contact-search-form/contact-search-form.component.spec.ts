import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContactSearchFormComponent } from './contact-search-form.component';
import { FormBuilder } from '@angular/forms';

describe('ContactListComponent', () => {
	let component: ContactSearchFormComponent;
	let fixture: ComponentFixture<ContactSearchFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ContactSearchFormComponent],
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
		fixture = TestBed.createComponent(ContactSearchFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit handleChange', () => {
		spyOn(component.handleChange, 'emit');
		component.onInputChange();
		expect(component.handleChange.emit).toHaveBeenCalled();
	});

	it('should emit handleChange', () => {
		spyOn(component, 'onInputChange');
		component.selectedCategory = 'PROVIDER';
		component.ngOnInit();
		expect(component.onInputChange).toHaveBeenCalled();
	});
});
