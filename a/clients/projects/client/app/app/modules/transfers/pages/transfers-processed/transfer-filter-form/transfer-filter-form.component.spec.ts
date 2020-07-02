import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TransferFilterFormComponent } from './transfer-filter-form.component';

describe('TransferFilterFormComponent', () => {
	let component: TransferFilterFormComponent;
	let fixture: ComponentFixture<TransferFilterFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TransferFilterFormComponent],
			imports: [
				TranslateModule.forRoot(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: []
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TransferFilterFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit handleChange on onInputChange', () => {
		spyOn(component.handleChange, 'emit');
		component.onInputChange();
		expect(component.handleChange.emit).toHaveBeenCalled();
	});
});
