import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSessionModalComponent } from './multi-session-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'client/app/app/services/auth.service';
import { AuthServiceMock } from 'client/app/app/services/auth.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('MultiSessionModalComponent', () => {
	let component: MultiSessionModalComponent;
	let fixture: ComponentFixture<MultiSessionModalComponent>;
	const dialogMock = { close: () => { } };
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MultiSessionModalComponent],
			imports: [TranslateModule.forRoot(), RouterTestingModule, PipesModule, CoreModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: MatDialogRef, useValue: dialogMock },
				{ provide: AuthService, useClass: AuthServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MultiSessionModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
