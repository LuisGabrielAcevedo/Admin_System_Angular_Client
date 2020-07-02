import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NewContactBoxComponent } from './new-contact-box.component';
import { TranslateModule } from '@ngx-translate/core';

describe('FavoriteComponent', () => {
	let component: NewContactBoxComponent;
	let fixture: ComponentFixture<NewContactBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NewContactBoxComponent],
			imports: [
				TranslateModule.forRoot(),
				ReactiveFormsModule
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewContactBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit handleClick on onClick', () => {
		spyOn(component.handleClick, 'emit');
		component.onClick();
		expect(component.handleClick.emit).toHaveBeenCalled();
	});
});
