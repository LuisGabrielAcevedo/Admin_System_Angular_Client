import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotificationState, makeNotificationState, INotification } from 'client/app/app/models/notification';

@Injectable()
export class NotificationServiceMock {
	private subject = new BehaviorSubject<INotificationState>(makeNotificationState({}));
	
	getNotificationState() {
		return this.subject;
	}

	findNotifications() {}

	updateNotificationState( _data: INotificationState ) {}

	setNotificationState() {}

	setAllAsRead() {}

	deleteNotification() {}

	setItemAsRead() {}

	goToAction( _notification: INotification ) {}

	requestSetAsRead( _ids: string[] ) {}

}
