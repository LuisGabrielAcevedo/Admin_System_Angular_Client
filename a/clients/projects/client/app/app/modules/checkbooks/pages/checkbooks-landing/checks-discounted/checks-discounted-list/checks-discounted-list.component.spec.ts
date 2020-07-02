import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksDiscountedListComponent } from './checks-discounted-list.component';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
describe('ChecksDiscountedListComponent', () => {
	let component: ChecksDiscountedListComponent;
	let fixture: ComponentFixture<ChecksDiscountedListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChecksDiscountedListComponent ],
			imports:[TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksDiscountedListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
