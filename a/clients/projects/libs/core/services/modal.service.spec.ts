import { TestBed } from '@angular/core/testing';
import { ToastService } from '@mcy/core/services/toast.service';
import { CoreModule } from '@mcy/core/core.module';
import { ModalService } from './modal.service';
import { MatDialog } from '@angular/material';
import { makeModal } from 'client/app/app/models';

describe('ModalService', () => {
	let dialog: MatDialog;
	let modalService: ModalService;

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			CoreModule
		],
		providers: [
			ModalService,
			CoreModule,
			ToastService,
		],
		})
		.compileComponents()
	);

	beforeEach(() => {
		dialog = TestBed.get(MatDialog);
		modalService = TestBed.get(ModalService);
	});

	it('should be created', () => {
		const service: ModalService = TestBed.get(ModalService);
		expect(service).toBeTruthy();
	});

	it('shoud open a new dialog on openDialog', () => {
		spyOn(dialog, 'open');
		modalService.openDialog(makeModal({}));
		expect(dialog.open).toHaveBeenCalled();
	});
});
