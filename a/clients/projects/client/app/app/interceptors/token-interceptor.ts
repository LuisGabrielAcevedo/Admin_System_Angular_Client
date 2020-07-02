import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EXPIRATION_TOKEN_STATUS } from 'client/app/app/constants';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeTokenExpirationModal } from 'client/app/app/models/modal';
import { ExpirationTokenModalComponent } from 'client/app/app/components/expiration-token-modal/expiration-token-modal.component';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		private modalService: ModalService 
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
		.pipe(
			tap(
				(event) => {
					if(event instanceof HttpResponse) {
						const responseStatus = event.body.status;
						if(responseStatus && responseStatus[0].code) {
							if(responseStatus[0].code.includes(EXPIRATION_TOKEN_STATUS)) {
								this.displayTokenExpirationModal();
							}
						}
					}
				}, () => {}
			)
		)
	}

	displayTokenExpirationModal() {
		this.modalService.openDialog(
			makeTokenExpirationModal({
				component: ExpirationTokenModalComponent,
			}),
			{
				disableClose: true,
				backdropClass: 'expiration-token-modal-backdrop'
			}
		)
	}
}