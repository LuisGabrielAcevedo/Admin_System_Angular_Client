import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DebitMovementDetailComponent } from './debit-movement-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('DebitMovementDetailComponent', () => {
	let component: DebitMovementDetailComponent;
	let fixture: ComponentFixture<DebitMovementDetailComponent>;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DebitMovementDetailComponent],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(), PipesModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DebitMovementDetailComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call the function close in sidenavService', () => {
		spyOn(sidenavService, 'close');
		component.close();
		expect(sidenavService.close).toHaveBeenCalled();
	});
});
