import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationService } from 'client/app/app/services/notification.service';
import { NotificationServiceMock } from 'client/app/app/services/notification.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { makeNotification, INotification } from 'client/app/app/models/notification';

describe('NotificationComponent', () => {
	let component: NotificationComponent;
	let fixture: ComponentFixture<NotificationComponent>;
	let notificationService: NotificationService;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NotificationComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), PipesModule, CoreModule.forRoot()],
			providers: [
				{provide: NotificationService, useClass: NotificationServiceMock},
				{ provide: SidenavService, useClass: SidenavServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NotificationComponent);
		component = fixture.componentInstance;
		notificationService = TestBed.get(NotificationService);
		sidenavService = TestBed.get(SidenavService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call markAllAsRead', () => {
		spyOn(notificationService, 'setAllAsRead');
		component.markAllAsRead();
		expect(notificationService.setAllAsRead).toHaveBeenCalled();
	})

	it('should call onDelete ', () => {
		const notification: INotification = makeNotification({}); 
		spyOn(notificationService, 'deleteNotification');
		component.onDelete(notification);
		expect(notificationService.deleteNotification).toHaveBeenCalled();
	})

	it('should call onSetAsReadAction ', () => {
		const notification: INotification = makeNotification({}); 
		spyOn(notificationService, 'setItemAsRead');
		component.onSetAsReadAction(notification);
		expect(notificationService.setItemAsRead).toHaveBeenCalled();		
	})

	it('should call onGoToDetailsAction()', () => {
		spyOn(sidenavService, 'open');
		component.onGoToDetailsAction();
		expect(sidenavService.open).toHaveBeenCalled();
	})
});
