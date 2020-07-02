import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInformationModalComponent } from './action-information-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActionInformationModalComponent', () => {
	let component: ActionInformationModalComponent;
	let fixture: ComponentFixture<ActionInformationModalComponent>;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ActionInformationModalComponent ],
			imports: [TranslateModule.forRoot(), RouterTestingModule, PipesModule, CoreModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ActionInformationModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
