import { Component, OnInit, OnDestroy } from '@angular/core';
import { INotificationState, makeNotificationState, INotification } from 'client/app/app/models/notification';
import { NotificationService } from 'client/app/app/services/notification.service';
import { NotificationDetailsComponent } from 'client/app/app/sidenav/notification-details/notification-details.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

	public notificationState: INotificationState = makeNotificationState({});
	public maxNotificationsNum: number = 4;
	public menuOpened: boolean = false;
	public subscription: Subscription = new Subscription();

	constructor(
		private notificationService: NotificationService,
		private sidenavService: SidenavService,
		private translateService: TranslateService
	) { }

	ngOnInit() {
		this.subscription.add(this.notificationService.getNotificationState().subscribe(state => {
			this.notificationState = state;
			if ( !this.notificationState.searchedNotifications && !this.notificationState.loading) {
				this.notificationService.findNotifications();
			}
		}));
	}

	markAllAsRead() {
		this.notificationService.setAllAsRead();
	}

	hasNotificationsUnread() {
		return this.notificationState.notifications.some((elem) => !elem.readStatus);
	}

	handleNotificationClick(notification: INotification) {
		this.notificationService.goToAction(notification)
	}

	getUnreadedNotifications() {
		return this.notificationState.notifications.filter((elem) => !elem.readStatus).length;
	}

	onDelete(notification: INotification) {
		this.notificationService.deleteNotification(notification);
	}

	onSetAsReadAction(notification: INotification) {
		this.notificationService.setItemAsRead(notification)
	}

	onGoToDetailsAction(){
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.notificationsDetails.title'),
			component: NotificationDetailsComponent
		});
	}

	switchMenuStatus(){
		this.menuOpened = !this.menuOpened;
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
