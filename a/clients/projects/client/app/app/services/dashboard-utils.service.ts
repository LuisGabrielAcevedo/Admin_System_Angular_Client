import { Injectable, OnDestroy } from '@angular/core';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';
import { SOFT_TOKEN_STATUS } from 'client/app/app/constants';
import { ModalService } from '@mcy/core/services/modal.service';
import { UserService } from './user.service';
import { WelcomeModalComponent }
	from 'client/app/app/components/welcome-modal/welcome-modal.component';
import { makeWelcomeModal, makeTermsAndConditionsModal, makeNeedHelpModal }
	from 'client/app/app/models/modal';
import { TermsAndConditionsModalComponent }
	from 'client/app/app/components/terms-and-conditions-modal/terms-and-conditions-modal.component';
import { NeedHelpModalComponent }
	from 'client/app/app/components/need-help-modal/need-help-modal.component';
import { Subscription } from 'rxjs';

@Injectable()
export class DashboardUtilsService implements OnDestroy {
	public subscription = new Subscription();

	constructor(
		private modalService: ModalService,
		private userService: UserService
	) {}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	isSoftTokenError(res: IApiResponseArray<any> | IApiResponseObject<any>): boolean {
	/*
		Used to avoid a circular dependecy between soft token service and soft token confirm component.
		This method should follow the same logic as softTokenService handleError method
	*/
		if (!res.status || res.status.length === 0) {
			return false;
		} else if (res.status[0].code.includes(SOFT_TOKEN_STATUS.REQUIRED_SUFFIX)) {
			return true;
		} else if (res.status[0].code === SOFT_TOKEN_STATUS.EXPIRED) {
			return true;
		} else if (res.status[0].code === SOFT_TOKEN_STATUS.UNREGISTERED) {
			return true;
		} else if (res.status[0].code === SOFT_TOKEN_STATUS.INPROCESS) {
			return true;
		} else if (res.status[0].code === SOFT_TOKEN_STATUS.BLOCKED1 || res.status[0].code === SOFT_TOKEN_STATUS.BLOCKED2) {
			return true;
		} else return false;
	}

	showWelcomeModal(pageId: string, versionId: string, userId: string) {
		this.modalService.openDialog(
			makeWelcomeModal({
				component: WelcomeModalComponent,
				pageId,
				versionId,
				userId
			}),
			{
				disableClose: true,
				id: 'welcome-message-modal'
			}
		);
	}

	showTermsAndConditionsModal(
		pageId: string,
		versionId: string,
		userId: string,
		username: string,
		tycDescription: string
	) {
		this.modalService.openDialog(
			makeTermsAndConditionsModal({
				component: TermsAndConditionsModalComponent,
				pageId,
				versionId,
				userId,
				tycDescription,
				username
			}),
			{
				disableClose: true,
				id: 'tyc-modal',
				backdropClass: 'tyc-modal-backdrop'
			}
		)
	}

	displayMissingSignatures() {
		const userState = this.userService.getUserState().value;
		this.subscription.add(
			this.userService.getSignablePageState().subscribe((pages) => {
				const html: string = pages.termsAndConditions.data.html || '';
				if(!pages.termsAndConditions.signed) {
					this.showTermsAndConditionsModal(
						pages.termsAndConditions.data.pageId,
						pages.termsAndConditions.data.versionId,
						userState.user.id,
						userState.user.username,
						html
					);
				} else if(!pages.welcome.signed) {
					this.showWelcomeModal(
						pages.welcome.data.pageId,
						pages.welcome.data.versionId,
						userState.user.id
					);
				}
			})
		);
	}

	showNeedHelpModal( ) {
		this.modalService.openDialog (
			makeNeedHelpModal({
				component: NeedHelpModalComponent
			}),
			{
				backdropClass: 'tyc-modal-backdrop',
				id: 'need-help-modal'
			}
		)
	}
}
