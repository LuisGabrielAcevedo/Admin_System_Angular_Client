import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingEnterpriseTabComponent } from './enterprises-tab.component';
import { AppModule } from 'backoffice/src/app/app.module';

describe('LandingEnterpriseTabComponent', () => {
	let component: LandingEnterpriseTabComponent;
	let fixture: ComponentFixture<LandingEnterpriseTabComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ AppModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LandingEnterpriseTabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
