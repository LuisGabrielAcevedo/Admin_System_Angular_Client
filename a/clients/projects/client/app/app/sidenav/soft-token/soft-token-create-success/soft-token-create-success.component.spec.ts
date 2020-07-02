import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftTokenCreateSuccessComponent } from './soft-token-create-success.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SoftTokenCreateSuccessComponent', () => {
	let component: SoftTokenCreateSuccessComponent;
	let fixture: ComponentFixture<SoftTokenCreateSuccessComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SoftTokenCreateSuccessComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock }
			],
			imports: [TranslateModule.forRoot()]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SoftTokenCreateSuccessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
