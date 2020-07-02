import { RangeComponent } from './range.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

describe('RangeComponent', () => {
	let component: RangeComponent;
	let fixture: ComponentFixture<RangeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RangeComponent],
			imports: [MatInputModule,
				MatFormFieldModule, BrowserAnimationsModule, ReactiveFormsModule]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RangeComponent);
		component = fixture.componentInstance;
		component.min = 25;
		component.max = 150;
		fixture.detectChanges();
	});

	it('Should create', () => {
		expect(component).toBeTruthy();
	});

	it('El rango debe ser invalido cuando el valor es menor a min', () => {
		component.ngOnInit();
		component.range.patchValue(20.5);
		expect(component.range.invalid).toBeTruthy();
	});

	it('El rango debe ser invalido cuando el valor es mayor a max', () => {
		component.ngOnInit();
		component.range.patchValue(200);
		expect(component.range.invalid).toBeTruthy();
	});

	it('El evento debe enviar un valor valido!', () => {
		let value = 20;
		component.changeValue.subscribe((v: any) => {
			value = v;
		});
		component.ngOnInit();
		component.range.patchValue(40);
		expect(value).toBeGreaterThanOrEqual(component.min);
		expect(value).toBeLessThanOrEqual(component.max);
	});

	it('La funcion setError() debe devolver un error y de tipo string', () => {
		component.ngOnInit();
		component.range.patchValue(20);
		const resp = component.setError();
		expect(component.range.invalid).toBeTruthy();
		expect(resp).toBe(component.messages.min);
		expect(typeof resp).toBe('string');
	});
});
