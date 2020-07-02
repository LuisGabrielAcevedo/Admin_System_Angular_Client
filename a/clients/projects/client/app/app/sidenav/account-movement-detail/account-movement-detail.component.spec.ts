import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountMovementDetailComponent } from './account-movement-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { MovementsService } from 'client/app/app/services/movements.service';
import { MovementsServiceMock } from 'client/app/app/services/movements.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { makeAccountMovementDetail, IMovementDetailResponse } from 'client/app/app/modules/accounts/models';
import { of } from 'rxjs';

describe('AccountMovementDetailComponent', () => {
	let component: AccountMovementDetailComponent;
	let fixture: ComponentFixture<AccountMovementDetailComponent>;
	let sidenavService: SidenavService;
	let movementService: MovementsService;

	const movementDetailDebitSuccessResponse: IMovementDetailResponse = {
		success: true,
		status: [{
			code: '0',
			message: 'success'
		}],
		data: makeAccountMovementDetail({
			creditDebitIndicator: 'D'
		})
	}

	const movementDetailCreditSuccessResponse: IMovementDetailResponse = {
		success: true,
		status: [{
			code: '0',
			message: 'success'
		}],
		data: makeAccountMovementDetail({
			creditDebitIndicator: 'C'
		})
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountMovementDetailComponent],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: MovementsService, useClass: MovementsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountMovementDetailComponent);
		sidenavService = TestBed.get(SidenavService);
		movementService = TestBed.get(MovementsService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('the function open in sidenavService should be called', () => {
		spyOn(sidenavService, 'open');
		component.openCreditDetail(makeAccountMovementDetail({}));
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('the function open in sidenavService should be called', () => {
		spyOn(sidenavService, 'open');
		component.openDebitDetail(makeAccountMovementDetail({}));
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('when the movement is debit, should be call openCreditDetail', () => {
		spyOn(movementService, 'getMovementDetail').and.returnValue(of(movementDetailDebitSuccessResponse));
		spyOn(component, 'openDebitDetail');
		component.getMovementDetail();
		expect(component.openDebitDetail).toHaveBeenCalled();
	});

	it('when the movement is debit, should be call openCreditDetail', () => {
		spyOn(movementService, 'getMovementDetail').and.returnValue(of(movementDetailDebitSuccessResponse));
		spyOn(component, 'openDebitDetail');
		component.isServicePayment = true;
		component.getMovementDetail();
		expect(component.openDebitDetail).toHaveBeenCalled();
	});

	it('when the movement is credit, should be call openCreditDetail', () => {
		spyOn(movementService, 'getMovementDetail').and.returnValue(of(movementDetailCreditSuccessResponse));
		spyOn(component, 'openCreditDetail');
		component.getMovementDetail();
		expect(component.openCreditDetail).toHaveBeenCalled();
	});
});
