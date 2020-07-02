import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlowExitModalComponent } from './flow-exit-modal.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { MainModule } from '@mcy/main/main.module';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('FlowExitModalComponent', () => {
	let component: FlowExitModalComponent;
	let fixture: ComponentFixture<FlowExitModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ 
				CoreModule,
				MainModule,
				TranslateModule.forRoot() 
			],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock},
				{ provide: MatDialogRef, useValue: { close: () => {} } },
				{ provide: MAT_DIALOG_DATA, useValue: makeFlowExitModal({})}
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FlowExitModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call onConfirm when handling onConfirm event', () => {
		spyOn(component.dialogRef, 'close');
		spyOn(component.data, 'onConfirm');
		component.onConfirm();
		expect(component.data.onConfirm).toHaveBeenCalled();
		expect(component.dialogRef.close).toHaveBeenCalled();
	});

	it('should call onCancel when handling onCancel event', () => {
		spyOn(component.dialogRef, 'close');
		spyOn(component.data, 'onCancel');
		component.onCancel();
		expect(component.data.onCancel).toHaveBeenCalled();
		expect(component.dialogRef.close).toHaveBeenCalled();
	});
});
