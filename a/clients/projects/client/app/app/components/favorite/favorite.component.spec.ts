import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
	let component: FavoriteComponent;
	let fixture: ComponentFixture<FavoriteComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FavoriteComponent],
			imports: [ReactiveFormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FavoriteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit handleClick on onClick', () => {
		spyOn(component.handleClick, 'emit');
		component.onClick(true);
		expect(component.handleClick.emit).toHaveBeenCalledWith(true);
	});
});
