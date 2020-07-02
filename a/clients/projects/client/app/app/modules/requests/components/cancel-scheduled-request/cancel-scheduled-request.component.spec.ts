import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelScheduledRequestComponent } from './cancel-scheduled-request.component';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { makeCancelRequestModal } from 'client/app/app/models';

describe('CancelScheduledRequestComponent', () => {
	let component: CancelScheduledRequestComponent;
	let fixture: ComponentFixture<CancelScheduledRequestComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CancelScheduledRequestComponent],
			imports: [PipesModule, TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: MatDialogRef, useValue: makeCancelRequestModal({}) },
				{ provide: MAT_DIALOG_DATA, useValue: makeCancelRequestModal({}) }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CancelScheduledRequestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
