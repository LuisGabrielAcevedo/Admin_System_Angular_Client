import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordSuccessComponent } from './update-password-success.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';

describe('UpdatePasswordSuccessComponent', () => {
	let component: UpdatePasswordSuccessComponent;
	let fixture: ComponentFixture<UpdatePasswordSuccessComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UpdatePasswordSuccessComponent ],
			imports: [TranslateModule.forRoot(), RouterTestingModule, PipesModule, CoreModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				RouterTestingModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UpdatePasswordSuccessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	});
