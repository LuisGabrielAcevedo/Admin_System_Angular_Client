import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SoftTokenConfirmComponent } from './soft-token-confirm.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { IRequestResponse, makeRequest } from 'client/app/app/models';
import { of, throwError } from 'rxjs';
import { DashboardUtilsService } from 'client/app/app/services/dashboard-utils.service';
import { DashboardUtilsServiceMock } from 'client/app/app/services/dashboard-utils.service.mock';

describe('SoftTokenConfirmComponent', () => {
	let component: SoftTokenConfirmComponent;
	let fixture: ComponentFixture<SoftTokenConfirmComponent>;
	let sidenavService: SidenavService;

	const token: string = '123456';
	const softTokenResponseSuccess: IRequestResponse = {
		data: makeRequest({}),
		status: [ { code: 'BFF-TST:000:000', message: '' } ],
		success: true
	};
	const softTokenResponseError: IRequestResponse = {
		data: makeRequest({}),
		status: [ { code: 'BFF-TST:500:000', message: '' } ],
		success: false,
	};
	const softTokenResponseInvalid: IRequestResponse = {
		data: makeRequest({}),
		status: [ { code: 'ARCOT:500:5707', message: '' } ],
		success: false,
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SoftTokenConfirmComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				FormBuilder,
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: DashboardUtilsService, useClass: DashboardUtilsServiceMock },
			],
			imports: [TranslateModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SoftTokenConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		sidenavService = TestBed.get(SidenavService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should close function is called', () => {
		spyOn(sidenavService, 'prevStep');
		component.cancel();
		expect(sidenavService.prevStep).toHaveBeenCalled();
	});

	it('#onConfirm should call success when the soft token is correct', () => {
		component.data = {
			onConfirm: () => {}
		}
		component.softToken.patchValue(token);
		spyOn(component, 'success');
		spyOn(component.data, 'onConfirm').and.returnValue(of(softTokenResponseSuccess));
		component.onConfirm();
		expect(component.success).toHaveBeenCalled();
		expect(component.data.onConfirm).toHaveBeenCalled();
	});

	it('#onConfirm should call reset when the soft token is invalid', () => {
		component.data = {
			onConfirm: () => {}
		}
		component.softToken.patchValue(token);
		spyOn(component.softToken, 'reset');
		spyOn(component.data, 'onConfirm').and.returnValue(of(softTokenResponseInvalid));
		component.onConfirm();
		expect(component.softToken.reset).toHaveBeenCalled();
		expect(component.data.onConfirm).toHaveBeenCalled();
		expect(component.tokenInvalid).toBe(true);
	});

	it('#onConfirm should call onConfirm callback when the soft token failed', () => {
		component.data = {
			onConfirm: () => {}
		}
		component.softToken.patchValue(token);
		spyOn(sidenavService, 'onError');
		spyOn(component.data, 'onConfirm').and.returnValue(of(softTokenResponseError));
		component.onConfirm();
		expect(sidenavService.onError).toHaveBeenCalled();
		expect(component.data.onConfirm).toHaveBeenCalled();
	});

	it('#onConfirm should call onConfirm callback when the soft token service failed', () => {
		component.data = {
			onConfirm: () => {}
		}
		component.softToken.patchValue(token);
		spyOn(sidenavService, 'onError');
		spyOn(component.data, 'onConfirm').and.returnValue(throwError(''));
		component.onConfirm();
		expect(sidenavService.onError).toHaveBeenCalled();
		expect(component.data.onConfirm).toHaveBeenCalled();
	});

	it('#success should call next sidenav when is success', () => {
		component.data.showSuccess = true;
		spyOn(sidenavService, 'nextStep');
		component.success();
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});

	it('#success should call onClose when is success', () => {
		component.data.showSuccess = false;
		spyOn(component, 'onClose');
		component.success();
		expect(component.onClose).toHaveBeenCalled();
	});

	it('#onClose should call onClose when close', () => {
		component.data.onClose = () => {};
		spyOn(component.data, 'onClose');
		component.onClose();
		expect(component.data.onClose).toHaveBeenCalled();
	});

	it('#onClose should call close when close', () => {
		component.data.onClose = null;
		spyOn(sidenavService, 'close');
		component.onClose();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('#cancel should call prevStep when cancel', () => {
		spyOn(sidenavService, 'prevStep');
		component.cancel();
		expect(sidenavService.prevStep).toHaveBeenCalled();
	});
});
