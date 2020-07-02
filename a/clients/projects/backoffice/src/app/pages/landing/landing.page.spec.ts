import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPage } from './landing.page';
import { AppModule } from 'backoffice/src/app/app.module';
import { UserService } from 'backoffice/src/app/services/user.service';
import { UserServiceMock } from 'backoffice/src/app/services/user.service.mock';

describe('LandingPage', () => {
	let component: LandingPage;
	let fixture: ComponentFixture<LandingPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ AppModule ],
			providers: [
				{ provide: UserService, useClass: UserServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LandingPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
