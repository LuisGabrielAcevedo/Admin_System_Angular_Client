import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationItemComponent } from './notification-item.component';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { makeNotification, notificationTypeEnum } from '../../models/notification';

describe('NotificationItemComponent', () => {
	let component: NotificationItemComponent;
	let fixture: ComponentFixture<NotificationItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NotificationItemComponent ],
			imports: [TranslateModule.forRoot(), PipesModule, CoreModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock }
			]			
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NotificationItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return cheque_outline icon', () => {
		component.notificationItem = makeNotification({notificationType: notificationTypeEnum.checks});
		expect(component.getIcon()).toEqual('cheque_outline');
	})

	it('should return email_resposta_rapida_outline icon', () => {
		component.notificationItem = makeNotification({notificationType: notificationTypeEnum.requests});
		expect(component.getIcon()).toEqual('email_resposta_rapida_outline');
	})

	it('should return globo_outline icon', () => {
		component.notificationItem = makeNotification({notificationType: notificationTypeEnum.services});
		expect(component.getIcon()).toEqual('globo_outline');
	})

	it('should return pagamentos icon', () => {
		component.notificationItem = makeNotification({notificationType: notificationTypeEnum.payments});
		expect(component.getIcon()).toEqual('pagamentos');
	})

	it('should return tranfers icon', () => {
		component.notificationItem = makeNotification({notificationType: notificationTypeEnum.tranfers});
		expect(component.getIcon()).toEqual('transferencia');
	})

	it('should return token icon', () => {
		component.notificationItem = makeNotification({notificationType: notificationTypeEnum.token});
		expect(component.getIcon()).toEqual('itoken_outline');
	})

	it('should return power icon', () => {
		component.notificationItem = makeNotification({notificationType: notificationTypeEnum.power});
		expect(component.getIcon()).toEqual('usuario_outline');
	})

	it('should return keys icon', () => {
		component.notificationItem = makeNotification({notificationType: notificationTypeEnum.keys});
		expect(component.getIcon()).toEqual('chave_outline');
	})

});
