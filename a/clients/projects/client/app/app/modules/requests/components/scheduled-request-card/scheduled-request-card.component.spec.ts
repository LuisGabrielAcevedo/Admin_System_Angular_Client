import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledRequestCardComponent } from './scheduled-request-card.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { SignaturesService } from 'client/app/app/services/signatures.service';
import { SignaturesServiceMock } from 'client/app/app/services/signatures.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';

describe('ScheduledRequestCardComponent', () => {
	let component: ScheduledRequestCardComponent;
	let fixture: ComponentFixture<ScheduledRequestCardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			declarations: [ScheduledRequestCardComponent],
			imports: [PipesModule, TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SignaturesService, useClass: SignaturesServiceMock },
				{ provide: UserService, useClass: UserServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ScheduledRequestCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
