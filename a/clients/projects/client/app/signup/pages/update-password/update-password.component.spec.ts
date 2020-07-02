import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  UpdatePasswordService } from 'client/app/signup/services/update-password.service';
import { UpdatePasswordPage } from './update-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UpdatePasswordServiceMock } from 'client/app/signup/services/update-password.service.mock';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('UpdatePasswordPageComponent', () => {
	let component: UpdatePasswordPage;
	let fixture: ComponentFixture<UpdatePasswordPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UpdatePasswordPage ],
			imports: [TranslateModule.forRoot(), RouterTestingModule, PipesModule, CoreModule.forRoot(), BrowserAnimationsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [	
				{ provide: UpdatePasswordService, useClass: UpdatePasswordServiceMock },
				{ provide: XHRService, useClass: XHRServiceMock },				
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UpdatePasswordPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
