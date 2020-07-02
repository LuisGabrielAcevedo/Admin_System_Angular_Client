import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isToday, isYesterday } from 'date-fns';
import { makeNotification } from 'client/app/app/models/notification';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { notificationTypeEnum, INotification } from 'client/app/app/models/notification';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mcy-notification-item',
	templateUrl: './notification-item.component.html',
	styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent {
	@Input() notificationItem: INotification = makeNotification({});
	@Input() isDetailNotifitacion: boolean = false;
	@Output() handleDeleteAction = new EventEmitter();
	@Output() handleSetAsReadAction = new EventEmitter();
	@Output() handleGoToSectionAction = new EventEmitter();

	constructor(
		private utilsService: UtilsService,
		private translateService: TranslateService
	) { }


	onDeleteAction(event: MouseEvent) {
		event.stopPropagation();
		this.handleDeleteAction.emit(this.notificationItem);
	}

	onSetAsReadAction(event: MouseEvent) {
		event.stopPropagation();
		this.handleSetAsReadAction.emit(this.notificationItem);
	}

	onGoToSectionAction() {
		this.handleGoToSectionAction.emit(this.notificationItem);
	}
	checkDate(stringDate: string) {
		const date = new Date(stringDate);
		return isToday(date) ? this.translateService.instant('components.header.notifications.today') : 
		isYesterday(date) ? this.translateService.instant('components.header.notifications.yesterday') : this.formatedDate(date);
	}

	formatedDate(date: Date) {
		return this.utilsService.formatDate(date, true);
	}

	getIcon(){
		switch (this.notificationItem.notificationType){
			case notificationTypeEnum.checks:
				return 'cheque_outline';
			case notificationTypeEnum.requests:
				return 'email_resposta_rapida_outline';
			case notificationTypeEnum.services:
				return 'globo_outline';
			case notificationTypeEnum.payments:
				return 'pagamentos';
			case notificationTypeEnum.tranfers:
				return 'transferencia';
			case notificationTypeEnum.token: 
				return 'itoken_outline';
			case notificationTypeEnum.power:
				return 'usuario_outline';
			case notificationTypeEnum.keys:
				return 'chave_outline';
		}
	}
}
