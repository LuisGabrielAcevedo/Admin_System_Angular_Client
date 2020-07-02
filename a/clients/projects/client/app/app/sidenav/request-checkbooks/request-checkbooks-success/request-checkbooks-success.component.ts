import { Component, Input } from '@angular/core';
import { makeRequest, IRequest, ICheckbookState, makeCheckbook, ICheckbook } from 'client/app/app/models';
import { STATUS_REQUEST } from 'client/app/app/constants';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
@Component({
	selector: 'mcy-request-checkbooks-success',
	templateUrl: './request-checkbooks-success.component.html',
	styleUrls: ['./request-checkbooks-success.component.scss']
})

export class RequestCheckbooksSuccessComponent {
	@Input() public data: IRequest = makeRequest({content:makeCheckbook({})});
	constructor(
		private translateService: TranslateService,
		private sidenavService: SidenavService
	) {}

	end() {
		this.sidenavService.close();
	}

	showDetailCheckbook(){
		this.sidenavService.open({
			title: this.translateService.instant('pages.checkbooks.checkbooks.requestNewCheckbook'),
			component: RequestDetailComponent,
			data: this.data
		});
	}


	get requestNumber() {
		return this.data.id;
	}

	get requestStatus(){
		return this.data.state !== 'AUTHORIZED' ? this.data.state : this.data.content.state;
	}

	getCentralMessage() {
		let message: string = '';
		if (this.requestStatus === 'DENIED') {
			message = this.translateService.instant('pages.checkbooks.success.centralMessageRejected');
			// TODO Concatenar el mensaje de error cuando se tenga la respuesta de BE
		} else {
			message = this.translateService.instant('pages.checkbooks.success.centralMessage');

		}

		return message;
	}

	getStateAuthorized(state: ICheckbookState) {
		let message = '';
		switch (state) {
			case STATUS_REQUEST.AUTHORIZED_CONTENT.APPROVED:
				message = this.translateService.instant('pages.checkbooks.success.success');
			break;
			case STATUS_REQUEST.AUTHORIZED_CONTENT.DENIED :
				message = this.translateService.instant('pages.checkbooks.success.rejected');
			break;
			default:
				message='';
			break;
		}
		return message;
	}

	get messageSubTitle(){
		let message = '';
		if(this.data.state === 'AUTHORIZED'){
			message = this.getStateAuthorized((this.data.content as ICheckbook).state);
		}else {
			switch (this.data.state) {

				case STATUS_REQUEST.CANCELLED :
					message = this.translateService.instant('pages.checkbooks.success.rejected');
				break;

				case STATUS_REQUEST.REJECTED :
					message = this.translateService.instant('pages.checkbooks.success.rejected');
				break;
				case STATUS_REQUEST.PARTIALLY_AUTHORIZED :
					message = this.translateService.instant('pages.checkbooks.success.partially_authorized');
				break;
				case STATUS_REQUEST.PENDING_APPROVAL :
					message = this.translateService.instant('pages.checkbooks.success.pending_approval');
				break;
				default:
					message='';
				break;
			}
		}
		return message;
	}

}
