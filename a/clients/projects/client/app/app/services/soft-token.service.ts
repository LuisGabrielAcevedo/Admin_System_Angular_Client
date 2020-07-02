import { Injectable } from '@angular/core';
import { SOFT_TOKEN_STATUS } from 'client/app/app/constants';
import { SidenavService } from './sidenav.service';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';
import { TranslateService } from '@ngx-translate/core';
import { SidenavSoftTokenErrorComponent } from 'client/app/app/components/sidenav-soft-token-error/sidenav-soft-token-error.component';
import { SoftTokenConfirmComponent } from 'client/app/app/sidenav/soft-token/soft-token-confirm/soft-token-confirm.component';
import { ISoftTokenActionType } from '../models';

@Injectable()
export class SoftTokenService {

	constructor(
		private sidenavService: SidenavService,
		private translateService: TranslateService,
	) {}

	handleErrors(
		res: IApiResponseArray<any> | IApiResponseObject<any>,
		callback: (softToken: string) => void,
		actionType: ISoftTokenActionType,
		trackPageView?: () => void
	): boolean
	{
		if (!res.status || res.status.length === 0) {
			return false;
		} else if (res.status[0].code.includes(SOFT_TOKEN_STATUS.REQUIRED_SUFFIX)) {
			this.requestSoftToken(callback, actionType, trackPageView);
			return true;
		} else if (res.status[0].code === SOFT_TOKEN_STATUS.EXPIRED) {
			this.displaySoftTokenStatusError(
				this.translateService.instant('components.sidenavSoftTokenError.titles.expired'),
				res.status[0].message
			);
			return true;
		} else if (res.status[0].code === SOFT_TOKEN_STATUS.UNREGISTERED) {
			this.displaySoftTokenStatusError(
				this.translateService.instant('components.sidenavSoftTokenError.titles.unregistered'),
				res.status[0].message
			);
			return true;
		} else if (res.status[0].code === SOFT_TOKEN_STATUS.INPROCESS) {
			this.displaySoftTokenStatusError(
				this.translateService.instant('components.sidenavSoftTokenError.titles.inprocess'),
				res.status[0].message
			);
			return true;
		} else if (res.status[0].code === SOFT_TOKEN_STATUS.BLOCKED1 || res.status[0].code === SOFT_TOKEN_STATUS.BLOCKED2) {
			this.displaySoftTokenStatusError(
				this.translateService.instant('components.sidenavSoftTokenError.titles.blocked'),
				res.status[0].message
			);
			return true;
		} else return false;
	}

	requestSoftToken(
		callback: (softToken: string) => void,
		actionType: ISoftTokenActionType,
		trackPageView?: () => void
	) {
		const closeAction = this.sidenavService.hasPreviousStep ? {
			cancelText: this.translateService.instant('sidenav.softokenConfirm.sidenavCancelConfirmation.cancel'),
			confirmText: this.translateService.instant('sidenav.softokenConfirm.sidenavCancelConfirmation.confirm'),
			text: this.translateService.instant('sidenav.softokenConfirm.sidenavCancelConfirmation.message'),
		} : undefined;

		this.sidenavService.nextStep({
			title: this.translateService.instant('sidenav.tokenValidation.title'),
			component: SoftTokenConfirmComponent,
			data: {
				actionType,
				onConfirm: (softToken: string) => callback(softToken),
				confirmLabel: this.translateService.instant('common.payAndTransfer'),
				trackPageView
			},
			closeAction
		});
	}

	displaySoftTokenStatusError(title: string, message: string) {
		this.sidenavService.open({
			title,
			component: SidenavSoftTokenErrorComponent,
			data: {
				message,
			},
		});
	}
}
