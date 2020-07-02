import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchContactFormComponent } from './search-contact-form.component';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { AppModule } from 'client/app/app/app.module';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';

describe('SearchContactForm', () => {
	let component: SearchContactFormComponent;
	let fixture: ComponentFixture<SearchContactFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ 
				ReactiveFormsModule,
				AppModule,
				FormsModule,
				TranslateModule.forRoot() 
			],
			providers: [
				FormBuilder,
				{ provide: EventService, useClass: EventServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchContactFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should reset form on cancel search', () => {
		spyOn(component.form, 'reset');
		component.onCancel();
		expect(component.form.reset).toHaveBeenCalled();
	});

	it('should clear keyword on cancel search', () => {
		component.onCancel();
		expect(component.keyword).toEqual('');
	});

	it('should emit handleSearch on cancel search', () => {
		spyOn(component.handleSearch, 'emit');
		component.onCancel();
		expect(component.handleSearch.emit).toHaveBeenCalledWith('');
	});

	it('should emit handleSearch on search', () => {
		spyOn(component.handleSearch, 'emit');
		component.onSearch();
		expect(component.handleSearch.emit).toHaveBeenCalledWith(component.keyword);
	});

	it('should not have searched', () => {
		expect(component.keyword.length).toEqual(0);
	});

	it('should have searched', () => {
		component.keyword = 'foo';
		expect(component.keyword.length).toBeGreaterThan(0);
	});
});
