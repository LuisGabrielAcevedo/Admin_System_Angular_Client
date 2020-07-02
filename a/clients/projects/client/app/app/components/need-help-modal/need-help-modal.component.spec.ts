import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedHelpModalComponent } from './need-help-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { makeNeedHelpModal } from 'client/app/app/models/modal';

describe('NeedHelpModalComponent', () => {
	let component: NeedHelpModalComponent;
	let fixture: ComponentFixture<NeedHelpModalComponent>;
	const dialogMock = {
		close: () => { }
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NeedHelpModalComponent ],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers:[
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: MAT_DIALOG_DATA, useValue: makeNeedHelpModal({})},
			]

		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NeedHelpModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
