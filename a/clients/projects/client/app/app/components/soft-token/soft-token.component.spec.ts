import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SoftTokenComponent } from './soft-token.component';
import {
	CUSTOM_ELEMENTS_SCHEMA,
	NO_ERRORS_SCHEMA,
	Renderer2,
	ElementRef,
	Type,
} from '@angular/core';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
xdescribe('SoftTokenComponent', () => {
	let component: SoftTokenComponent;
	let fixture: ComponentFixture<SoftTokenComponent>;
	let renderer: Renderer2;
	const idPrevField: ElementRef | null = null;
	let idNextField: ElementRef | null = null;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SoftTokenComponent],
			imports: [ReactiveFormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [Renderer2]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SoftTokenComponent);
		renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it(' should call function add', () => {
		spyOn(component.subscription, 'add');
		const firstFieldControl: AbstractControl | null = component.softTokenForm.get(
			'firstField'
		);
		if (firstFieldControl) {
			firstFieldControl.patchValue(7);
		}
		component.observerChanges(firstFieldControl, idPrevField, idNextField);
		expect(component.subscription.add).toHaveBeenCalled();
	});

	it(' should call function setSelect', () => {
		spyOn(component, 'setSelect');
		const firstFieldControl: AbstractControl | null = component.softTokenForm.get(
			'firstField'
		);
		if (firstFieldControl) {
			firstFieldControl.patchValue(7);
		}
		idNextField = {
			nativeElement: {
				value: '3'
			}
		};
		component.observerChanges(firstFieldControl, idPrevField, idNextField);
		expect(component.setSelect).toHaveBeenCalled();
	});

	it(' not should call function setSelect', () => {
		spyOn(component, 'setSelect');
		idNextField = {
			nativeElement: {
				value: '4'
			}
		};
		component.observerChanges(null, idPrevField, idNextField);
		expect(component.setSelect).not.toHaveBeenCalled();
	});

	it(' should call function setSelect and enter the else', () => {
		spyOn(component, 'setSelect');
		const firstFieldControl: AbstractControl | null = component.softTokenForm.get(
			'firstField'
		);
		if (firstFieldControl) {
			firstFieldControl.patchValue(null);
		}
		idNextField = {
			nativeElement: {
				value: '2'
			}
		};
		component.observerChanges(firstFieldControl, idPrevField, idNextField);
		expect(component.setSelect).toHaveBeenCalled();
	});

	it(' should call function selectRootElement', () => {
		spyOn(renderer, 'selectRootElement');
		const firstFieldControl: AbstractControl | null = component.softTokenForm.get(
			'firstField'
		);
		if (firstFieldControl) {
			firstFieldControl.patchValue(7);
		}
		idNextField = {
			nativeElement: {
				value: '8'
			}
		};
		component.observerChanges(firstFieldControl, idPrevField, idNextField);
		expect(renderer.selectRootElement).toHaveBeenCalled();
	});
});
