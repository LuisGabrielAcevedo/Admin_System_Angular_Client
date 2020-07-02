import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecksIssuedComponent } from './checks-issued.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { ChecksService } from 'client/app/app/services/checks.service';
import { ChecksServiceMock } from 'client/app/app/services/checks.service.mock';

describe('ChecksIssuedComponent', () => {
	let component: ChecksIssuedComponent;
	let fixture: ComponentFixture<ChecksIssuedComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChecksIssuedComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: ChecksService, useClass: ChecksServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksIssuedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
