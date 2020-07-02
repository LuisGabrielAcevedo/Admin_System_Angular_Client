import { Injectable, OnDestroy } from '@angular/core';
import { StatefulService } from './stateful.service';
import {
	INotificationState, makeNotificationState,
	makeNotificationByNotificationBFF,
	INotification, notificationTypeEnum, INotificationBFF
} from 'client/app/app/models/notification';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { EventService } from './event.service';
import { ToastService } from '@mcy/core/services/toast.service';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { SoftTokenCreateComponent } from 'client/app/app/sidenav/soft-token/soft-token-create/soft-token-create.component';
import { UserService } from './user.service';
import { DataService } from '@mcy/core/services/data.service';
import { INotificationResponse } from 'client/app/app/models/notification';

@Injectable()
export class NotificationService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<INotificationState>(makeNotificationState({}));
	public subscription: Subscription;
	constructor(
		public eventService: EventService,
		private dataService: DataService,
		private toast: ToastService,
		private router: Router,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private userService: UserService
	) {
		super(eventService);
		this.subscription = new Subscription();
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	getNotificationState() {
		return this.subject;
	}

	updateNotificationState( data: Partial<INotificationState> ) {
		this.subject.next({ ...this.getNotificationState().value, ...data});
	}

	adaptNotificationResponse(notifications: INotificationBFF[]) {
		this.sortArrayByDate(notifications);
		const adaptedNotifications = notifications.map((data) => makeNotificationByNotificationBFF(data));
		this.updateNotificationState(
			makeNotificationState(
				{ notifications: adaptedNotifications, searchedNotifications: true }
			)
		)
	}

	findNotifications() {
		if(!this.getNotificationState().value.searchedNotifications){
			this.updateNotificationState({ loading: true });
			this.subscription.add(
				this.getNotificationsByApi().subscribe((res : INotificationResponse) => {
					if(res.success){
						this.updateNotificationState({ loading: false , searchedNotifications: true, hasErrors: false});
						this.adaptNotificationResponse(res.data);
					} else {
						this.updateNotificationState({ loading: false, hasErrors: true});
					}
				})
			);
		}
	}

	getNotificationsByApi() : Observable<INotificationResponse> {
		return this.dataService.get(`v1/profiles/screen-notifications`, { headers: { userId: this.getUserid() } });
	}

	setAllAsRead(){
		const idsUnread: string[] = []
		const updatedNotifications =
			this.getNotificationState().value.
				notifications.map((ele) => {
					if(!ele.readStatus) {
						idsUnread.push(ele.id);
						ele.readStatus = true;
					}
					return ele;
				})
		this.updateNotificationState({ ...this.getNotificationState().value, notifications: updatedNotifications } );
		this.toast.message(this.translateService.instant('components.header.notifications.setAllAsReadMessage'));
		this.subscription.add(
			this.requestSetAsRead(idsUnread).subscribe()
		);
	}

	deleteNotification(notification: INotification){
		const updatedNotifications = this.getNotificationState().value.notifications.filter((ele) => ele.id !== notification.id);
		this.updateNotificationState({ ...this.getNotificationState().value, notifications: updatedNotifications } );
		this.toast.message(this.translateService.instant('components.header.notifications.deleteMessage'));
		this.subscription.add(
			this.dataService.delete(`v1/profiles/screen-notifications`, { 
				headers: { 
					userId: this.getUserid()},
					body: [notification.id] 
				}
			).subscribe()
		);
	}

	setItemAsRead(notification: INotification) {
		const updatedNotifications: INotification[] = this.getNotificationState().value.notifications;
		const foundIndex = updatedNotifications.findIndex((ele) => ele.id === notification.id);
		updatedNotifications[foundIndex].readStatus = true;
		this.updateNotificationState({ ...this.getNotificationState().value, notifications: updatedNotifications });
		this.toast.message(this.translateService.instant('components.header.notifications.setItemAsRead'));
		this.subscription.add(
			this.requestSetAsRead([updatedNotifications[foundIndex].id]).subscribe()
		);
	}

	goToAction(notification: INotification) {
		switch (notification.notificationType){
			case notificationTypeEnum.checks:
				this.router.navigate(['/app/checkbooks']);
				this.sidenavService.close();
				break;
			case notificationTypeEnum.requests:
				this.router.navigate(['/app/requests']);
				this.sidenavService.close();
				break;
			case notificationTypeEnum.services:
				sessionStorage.setItem('mcyselectedIndex', '0');
				this.router.navigate(['/app/payments']);
				this.sidenavService.close();
				break;
			case notificationTypeEnum.payments:
				sessionStorage.setItem('mcyselectedIndex', '1');
				this.router.navigate(['/app/payments']);
				this.sidenavService.close();
				break;
			case notificationTypeEnum.tranfers:
				this.router.navigate(['/app/transfers']);
				this.sidenavService.close();
				break;
			case notificationTypeEnum.token:
				this.sidenavService.open({
					title: this.translateService.instant('sidenav.notificationsDetails.title'),
					component: SoftTokenCreateComponent,
				});
				break;
		}
	}

	requestSetAsRead(ids: string[]){
		return this.dataService.patch(`v1/profiles/screen-notifications`, { headers: { userId: this.getUserid()}, body: ids });
	}

	getUserid(){
		return this.userService.getUserState().value.user.id;
	}

	sortArrayByDate( array: INotificationBFF[]){
		array.sort( (a , b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())
	}

	resetState() {
		this.updateNotificationState(makeNotificationState({}));
	}
}
