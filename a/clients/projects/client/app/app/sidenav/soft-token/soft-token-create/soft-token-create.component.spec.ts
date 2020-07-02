import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftTokenCreateComponent } from './soft-token-create.component';
import { AppModule } from 'client/app/app/app.module';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('SoftTokenCreateComponent', () => {
	let component: SoftTokenCreateComponent;
	let fixture: ComponentFixture<SoftTokenCreateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ],
			imports: [
				AppModule,
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UserService, useClass: UserServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SoftTokenCreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();	
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
