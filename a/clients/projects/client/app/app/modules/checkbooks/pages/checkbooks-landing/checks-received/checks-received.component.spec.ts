import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecksReceivedComponent } from './checks-received.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { ChecksService } from 'client/app/app/services/checks.service';
import { ChecksServiceMock } from 'client/app/app/services/checks.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('ChecksReceivedComponent', () => {
	let component: ChecksReceivedComponent;
	let fixture: ComponentFixture<ChecksReceivedComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChecksReceivedComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: ChecksService, useClass: ChecksServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksReceivedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
