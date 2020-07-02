import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDetailsComponent } from './notification-details.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';
import { NotificationService } from 'client/app/app/services/notification.service';
import { NotificationServiceMock } from 'client/app/app/services/notification.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';

describe('NotificationDetailsComponent', () => {
	let component: NotificationDetailsComponent;
	let fixture: ComponentFixture<NotificationDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NotificationDetailsComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), PipesModule, CoreModule.forRoot()],
			providers: [
				{ provide: NotificationService, useClass: NotificationServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NotificationDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
