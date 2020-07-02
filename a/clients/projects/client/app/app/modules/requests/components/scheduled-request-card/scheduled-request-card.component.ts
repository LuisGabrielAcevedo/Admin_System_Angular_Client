import { Component, Input, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
import { IRequest, makeRequest, ISavedSignatures, IRequestCarouselAction, makeUserApp } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SignaturesService } from 'client/app/app/services/signatures.service';
import { Subscription } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Component({
	selector: 'mcy-scheduled-request-card',
	templateUrl: './scheduled-request-card.component.html',
	styleUrls: ['./scheduled-request-card.component.scss'],
})
export class ScheduledRequestCardComponent implements OnDestroy, OnInit {
	@Input() data: IRequest = makeRequest({});
	public currentUser = makeUserApp({})
	public searchedSignatures: ISavedSignatures = {};
	public subscription: Subscription = new Subscription();
	public loading = false;
	public showCancelButton = false;
	@Output() actionEvent: EventEmitter<IRequestCarouselAction> = new EventEmitter();
	constructor(
		private utilsService: UtilsService,
		private signaturesService: SignaturesService,
		private userService: UserService,
	) {}

	ngOnInit() {
		this.subscription.add(
			this.userService.getUserState().subscribe(state => this.currentUser = state.user)
		);
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.SALARY_PAYMENT.WRITE);
	}

	get hasUserDeletePermission(): boolean {
		if(!this.data) return false;
		return this.isUserSigner && this.hasWritePermission;
	}

	get isUserSigner(): boolean {
		return this.data.signers.some((signer) => {
			return (signer.document.number === this.currentUser.document.number) &&
				(signer.document.type === this.currentUser.document.type)
		});
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	searchSignature() {
		this.loading = true;
		this.subscription.add(
			this.signaturesService.searchSignCapacity(this.data).subscribe(signature => {
				if (signature) this.showCancelButton = signature.signAllowed && this.hasWritePermission;
				this.loading = false;
			})
		);
	}

	showRequestDetail() {
		this.actionEvent.emit({
			action: 'DETAIL',
			request: this.data
		})
	}

	cancelRequest() {
		this.actionEvent.emit({
			action: 'CANCEL',
			request: this.data
		})
	}
}
