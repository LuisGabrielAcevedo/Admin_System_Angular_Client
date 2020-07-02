import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSoftTokenErrorComponent } from './sidenav-soft-token-error.component';
import { AppModule } from 'client/app/app/app.module';

describe('SidenavErrorComponent', () => {
	let component: SidenavSoftTokenErrorComponent;
	let fixture: ComponentFixture<SidenavSoftTokenErrorComponent>;

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
		fixture = TestBed.createComponent(SidenavSoftTokenErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
