import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
	CUSTOM_ELEMENTS_SCHEMA,
	NO_ERRORS_SCHEMA
} from '@angular/core';
import { SidenavCancelComponent } from './sidenav-cancel.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SidenavCancelComponent', () => {
	let component: SidenavCancelComponent;
	let fixture: ComponentFixture<SidenavCancelComponent>;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot()
			],
			declarations: [SidenavCancelComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidenavCancelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should emit when the button Aceptar is clicked', () => {
		spyOn(component.closeEvent, 'emit');
		component.close();
		fixture.detectChanges();
		expect(component.closeEvent.emit).toHaveBeenCalled();
	});

	it('should emit when the button Cancelar is clicked', () => {
		spyOn(component.cancelEvent, 'emit');
		component.cancel();
		fixture.detectChanges();
		expect(component.cancelEvent.emit).toHaveBeenCalled();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
