import { Component, OnInit, OnDestroy } from '@angular/core';
import { INotificationState, makeNotificationState, INotification, INotificationGroup } from 'client/app/app/models/notification';
import { NotificationService } from 'client/app/app/services/notification.service';
import { Subscription } from 'rxjs';
import groupBy from 'lodash/groupBy'
import { isToday, isYesterday } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { NOTIFICATIONS_ITEMS_PER_PAGE } from 'client/app/app/constants';

@Component({
	selector: 'mcy-notification-details',
	templateUrl: './notification-details.component.html',
	styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit, OnDestroy {

	public notificationSate: INotificationState = makeNotificationState({});
	public notificationsFiltred: INotification [] = [];
	public subscription: Subscription;
	public notificationsGrupedByDate: INotificationGroup = {};
	public itemsPerPage: number = NOTIFICATIONS_ITEMS_PER_PAGE;
	public page: number = 1;
	
	constructor(
		private notificationService: NotificationService,
		private translateService: TranslateService,
		private utilsService: UtilsService
	) { 
		this.subscription = new Subscription();
	}

	ngOnInit() {
		this.subscription.add(this.notificationService.getNotificationState().subscribe(state => {
			this.notificationSate = state;
			this.updatePagination()
		}));
		
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	
	hasNotificationsUnread() {		 
		return this.notificationSate.notifications.some((elem) => !elem.readStatus);
	}

	markAllAsRead(){
		this.notificationService.setAllAsRead();
	}

	onGoToAction(notification: INotification) {
		this.notificationService.goToAction(notification)
	}

	getUnreadedNotifications() {
		return this.notificationSate.notifications.filter((elem) => !elem.readStatus).length;
	}

	onDelete(notification: INotification) {
		this.notificationService.deleteNotification(notification);
	}

	onSetAsReadAction(notification: INotification) {
		this.notificationService.setItemAsRead(notification)
	}

	getNotificationsByDate(){
		const notifications = this.notificationsFiltred;
		return groupBy(notifications, 
			(notification: INotification) => 
				new Date(notification.createDate).toLocaleDateString()
		);
	}

	objectKeys(object: any){
		return Object.keys(object);
	}

	checkDate(stringDate: string) {
		const date = new Date(stringDate);
		return isToday(date) ? this.translateService.instant('sidenav.notificationsDetails.today') : 
		isYesterday(date) ? this.translateService.instant('sidenav.notificationsDetails.yesterday') : this.formatedDate(date);
	}

	formatedDate(date: Date) {
		return this.utilsService.formatDate(date, false);
	}

	updatePagination() {
		const offset: number = (this.page - 1) * NOTIFICATIONS_ITEMS_PER_PAGE;
		const data: INotification[] = this.notificationSate.notifications.slice(
			0,
			offset + NOTIFICATIONS_ITEMS_PER_PAGE
		);
		this.notificationsFiltred = data;
		this.notificationsGrupedByDate = this.getNotificationsByDate();
	}

	incrementPagination() {
		this.page = this.page + 1;
		this.updatePagination();
	}
}
