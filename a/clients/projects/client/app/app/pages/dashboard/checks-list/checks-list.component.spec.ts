import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksListComponent } from './checks-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ChecksService } from 'client/app/app/services/checks.service';
import { ChecksServiceMock } from 'client/app/app/services/checks.service.mock';

describe('ChecksListComponent', () => {
	let component: ChecksListComponent;
	let fixture: ComponentFixture<ChecksListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChecksListComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: ChecksService, useClass: ChecksServiceMock },
			],
			imports: [
				TranslateModule.forRoot(),
				PipesModule,
				RouterTestingModule,
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
