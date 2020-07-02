import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksRejectedComponent } from './checks-rejected.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('ChecksRejectedComponent', () => {
	let component: ChecksRejectedComponent;
	let fixture: ComponentFixture<ChecksRejectedComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				CoreModule,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			declarations: [ ChecksRejectedComponent ],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksRejectedComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
