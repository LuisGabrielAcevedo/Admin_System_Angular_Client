import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SignaturesService } from 'client/app/app/services/signatures.service';
import { TranslateService } from '@ngx-translate/core';
import { makeRequest, IRequest } from 'client/app/app/models';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-signature',
	templateUrl: './signature.component.html',
	styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit, OnDestroy {
	@Input() request: IRequest =  makeRequest({});
	public loading = false;
	public status = '';
	public subscription = new Subscription();

	constructor(
		private signaturesService: SignaturesService,
		private tranlateService: TranslateService
	) {}

	ngOnInit() {
		this.searchSignature();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	searchSignature() {
		this.loading = true;
		this.subscription.add(
			this.signaturesService.searchSignCapacity(this.request).subscribe(signature => {
				if (signature) {
					this.status = signature.signed
						? this.tranlateService.instant('pages.requests.signatures.signed')
						: this.getSignature(signature.signAllowed);
				}
				this.loading = false;
			})
		);
	}

	getSignature(value: boolean) {
		return value
		? this.tranlateService.instant('pages.requests.signatures.allowed')
		: this.tranlateService.instant('pages.requests.signatures.notAllowed');
	}
}
