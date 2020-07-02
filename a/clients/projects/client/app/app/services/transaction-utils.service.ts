
import { Injectable } from '@angular/core';
import { ITransferDetailSuccess } from '../models/transfers';
import { IRequest } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TransactionUtilsService {

	constructor(private translateService: TranslateService) {}

	getContentForRequestState(
		request: IRequest,
		blockClass: string = '',
		titleTranslatePath: string = ''
	): Partial<ITransferDetailSuccess> {
		let contentDetailTransferSuccess: any;
		switch (request.state){
			case 'PENDING_APPROVAL':
				contentDetailTransferSuccess = {
					title: this.translateService.instant(titleTranslatePath + '.titlePendingApproval'),
					state: 'PENDING_APPROVAL',
					icon: 'senha_circulo_outline',
					class: `${blockClass}__circle-success ${blockClass}__circle-success--pending-authorized`,
					iconButtonSecundary: 'comprovante_outline',
					allowDownload: false
				};
				break;

			case 'PARTIALLY_AUTHORIZED':
				contentDetailTransferSuccess = {
					title: this.translateService.instant(titleTranslatePath + '.titlePartiallyAuthorized'),
					state: 'PARTIALLY_AUTHORIZED',
					icon: 'senha_circulo_outline',
					class: `${blockClass}__circle-success ${blockClass}__circle-success--partially-authorized`,
					iconButtonSecundary: 'comprovante_outline',
					allowDownload: false
				};
				break;

			case 'AUTHORIZED':
				if (request.content.state === 'APPROVED') {
					contentDetailTransferSuccess = {
						title: this.translateService.instant(titleTranslatePath + '.titleAuthorized'),
						state: 'AUTHORIZED',
						icon: 'check',
						class: `${blockClass}__circle-success ${blockClass}__circle-success--authorized`,
						iconButtonSecundary: 'download_outline',
						allowDownload: true
					};
				}

				if (request.content.state === 'DENIED') {
					contentDetailTransferSuccess = {
						title: this.translateService.instant(titleTranslatePath + '.titleRejected'),
						state: 'REJECTED',
						icon: 'fechar',
						class: `${blockClass}__circle-success ${blockClass}__circle-success--rejected`,
						iconButtonSecundary: 'comprovante_outline',
						allowDownload: false
					};
				}
					break;

			case 'REJECTED':
				contentDetailTransferSuccess = {
						title: this.translateService.instant(titleTranslatePath + '.titleRejected'),
						state: 'REJECTED',
						icon: 'fechar',
						class: `${blockClass}__circle-success ${blockClass}__circle-success--rejected`,
						iconButtonSecundary: 'comprovante_outline',
						allowDownload: false
					};
					break;

			default:
				break;
		}

		return contentDetailTransferSuccess;
	}
}




