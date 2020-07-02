import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountsMovementsListComponent } from './accounts-movements-list.component';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { makeAccountMovement } from 'client/app/app/modules/accounts/models';

describe('AccountsMovementsListComponent', () => {
	let component: AccountsMovementsListComponent;
	let fixture: ComponentFixture<AccountsMovementsListComponent>;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountsMovementsListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock }
			],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountsMovementsListComponent);
		sidenavService = TestBed.get(SidenavService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return true if movementDetail field is S', () => {
		const movement = makeAccountMovement({});
		const show = component.showDetailIcon(movement);
		expect(show).toBeTrue();
	});

	it('should return true if movementDetail field is N', () => {
		const movement = makeAccountMovement({});
		movement.moreDetail = 'N';
		const show = component.showDetailIcon(movement);
		expect(show).toBeFalse();
	});

	it('should call open from sidenavService', () => {
		spyOn(sidenavService, 'open');
		component.onShowMovementDetail(makeAccountMovement({id: '123'}));
		expect(sidenavService.open).toHaveBeenCalled();
	});
});
