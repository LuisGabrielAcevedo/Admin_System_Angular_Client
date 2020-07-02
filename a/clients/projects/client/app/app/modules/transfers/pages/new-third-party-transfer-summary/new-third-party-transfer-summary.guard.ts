import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';
import { ITransferFormValue, IRequest } from 'client/app/app/models';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Injectable({
	providedIn: 'root',
})
export class NewThirdPartyTransferSummaryGuard implements CanActivate {

	constructor(
		private transferService: TransferService,
		private router: Router,
		private userService: UserService
	) {}

	get formValue(): ITransferFormValue {
		return this.transferService.getTransferState().value.newTransferFormValue;
	}

	get lastTransfer(): IRequest | null {
		return this.transferService.getTransferState().value.lastTransfer;
	}

	canActivate(): boolean {
		if (this.formValue.destinationContact.id !== '' &&
			this.formValue.amount !== 0 &&
			this.formValue.concept.code !== '' &&
			this.formValue.sourceAccount.number !== '' &&
			this.formValue.executionDate.toString() !== '' &&
			this.lastTransfer === null &&
			this.userService.hasPermission(USER_PERMISSIONS.TRANSFERS.WRITE)) {
				return true;
		} else {
				this.router.navigate(['app/transfers/new']);
			return false;
		}
	}
}
