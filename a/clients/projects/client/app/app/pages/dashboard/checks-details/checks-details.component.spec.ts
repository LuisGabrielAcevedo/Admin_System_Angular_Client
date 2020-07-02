import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksDetailsComponent } from './checks-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChecksService } from 'client/app/app/services/checks.service';
import { ChecksServiceMock } from 'client/app/app/services/checks.service.mock';

describe('ChecksListComponent', () => {
	let component: ChecksDetailsComponent;
	let fixture: ComponentFixture<ChecksDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChecksDetailsComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
			],
			providers: [
				{ provide: ChecksService, useClass: ChecksServiceMock},
			],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
