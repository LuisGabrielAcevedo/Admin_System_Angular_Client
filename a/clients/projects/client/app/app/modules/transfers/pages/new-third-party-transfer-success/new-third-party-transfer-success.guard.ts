import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';
import { IRequest } from 'client/app/app/models';
import { USER_PERMISSIONS } from 'client/app/app/constants';
import { UserService } from 'client/app/app/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class NewThirdPartyTransferSuccessGuard implements CanActivate {

	constructor(
		private transferService: TransferService,
		private router: Router,
		private userService: UserService
	) {}

	get lastTransfer(): IRequest | null {
		return this.transferService.getTransferState().value.lastTransfer;
	}

	canActivate(): boolean {
		if (this.lastTransfer && 
			this.userService.hasPermission(USER_PERMISSIONS.TRANSFERS.WRITE)) {
			return true;
		} else {
				this.router.navigate(['app/transfers/new']);
			return false;
		}
	}
}
