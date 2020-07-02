import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckDiscountedComponent } from './check-discounted.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('CheckDiscountedComponent', () => {
	let component: CheckDiscountedComponent;
	let fixture: ComponentFixture<CheckDiscountedComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CheckDiscountedComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(), PipesModule],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckDiscountedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
