import { TestBed } from '@angular/core/testing';
import { SidenavService } from './sidenav.service';
import { PaymentNewComponent } from 'client/app/app/sidenav/service-payment/payment-new/payment-new.component';
import { PaymentConfirmationComponent } from 'client/app/app/sidenav/service-payment/payment-confirmation/payment-confirmation.component';
import { makeSidenavClose } from 'client/app/app/models';

describe('SidenavService', () => {
	let service: SidenavService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SidenavService]
		});
	});

	beforeEach(() => {
		service = TestBed.get(SidenavService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('when the funtion open is called, the history length is 1', () => {
		service.open({
			title: 'Nuevo pago',
			component: PaymentNewComponent
		});
		expect(service.step.title).toBe('Nuevo pago');
		expect(service.history.length).toBe(1);
		expect(service.opened).toBeTruthy();
	});

	it('when the funtion close is called, the history length is 0', () => {
		service.close();
		expect(service.step.title).toBe('');
		expect(service.history.length).toBe(0);
		expect(service.opened).toBeFalsy();
	});

	it('when the funtion next is called, the history length is 2', () => {
		service.open({
			title: 'Nuevo pago',
			component: PaymentNewComponent
		});

		service.nextStep({
			title: 'Confirmación',
			component: PaymentConfirmationComponent
		});

		expect(service.step.title).toBe('Confirmación');
		expect(service.history.length).toBe(2);
		expect(service.opened).toBeTruthy();
	});

	it('when the funtion prevStep is called, the history length is 1', () => {
		service.open({
			title: 'Nuevo pago',
			component: PaymentNewComponent
		});

		service.nextStep({
			title: 'Confirmación',
			component: PaymentConfirmationComponent
		});

		service.prevStep();

		expect(service.step.title).toBe('Nuevo pago');
		expect(service.history.length).toBe(1);
		expect(service.opened).toBeTruthy();
	});

	it('function cancel called', () => {
		service.cancel();
		expect(service.closeView).toBeTruthy();
		service.cancel();
		expect(service.closeView).toBeFalsy();
	});

	it('when the function reset have data, the step.data have the data', () => {
		service.open({
			title: 'Nuevo pago',
			component: PaymentNewComponent
		});

		service.nextStep({
			title: 'Confirmación',
			component: PaymentConfirmationComponent
		});

		service.reset({ edit: true });

		if (service.step.data) {
			expect(service.step.data.edit).toBeTruthy();
		}
	});

	it('when the function reset dont have data, the step.data is the same', () => {
		service.open({
			title: 'Nuevo pago',
			component: PaymentNewComponent
		});

		service.nextStep({
			title: 'Confirmación',
			component: PaymentConfirmationComponent
		});

		service.reset();

		if (service.step.data) {
			expect(service.step.data).toBeFalsy();
		} else {
			expect(service.step.data).toBeUndefined();
		}
	});

	it('function cancel called', () => {
		spyOn(service, 'cancel').and.callThrough();
		service.preClose();
		expect(service.cancel).not.toHaveBeenCalled();
		service.opened = true;
		service.step.closeAction = makeSidenavClose({});
		service.preClose();
		expect(service.cancel).toHaveBeenCalled();
	});

	it('function close called', () => {
		spyOn(service, 'close').and.callThrough();
		service.preClose();
		expect(service.close).not.toHaveBeenCalled();
		service.opened = true;
		service.preClose();
		expect(service.close).toHaveBeenCalled();
	});
});
