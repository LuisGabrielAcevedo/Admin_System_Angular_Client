import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavErrorComponent } from './sidenav-error.component';
import { AppModule } from 'client/app/app/app.module';

describe('SidenavErrorComponent', () => {
	let component: SidenavErrorComponent;
	let fixture: ComponentFixture<SidenavErrorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ],
			imports: [
				AppModule,
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidenavErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle onConfirm', () => {
		spyOn(component.handleConfirm, 'emit');
		component.onConfirm();
		expect(component.handleConfirm.emit).toHaveBeenCalled();
	});
});
