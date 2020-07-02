import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordModalComponent } from './update-password-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';

describe('PasswordResetModalComponent', () => {
	let component: UpdatePasswordModalComponent;
	let fixture: ComponentFixture<UpdatePasswordModalComponent>;
	const dialogMock = { close: () => { } };
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UpdatePasswordModalComponent ],
			imports: [TranslateModule.forRoot(), RouterTestingModule, PipesModule, CoreModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: MatDialogRef, useValue: dialogMock },
				RouterTestingModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UpdatePasswordModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
