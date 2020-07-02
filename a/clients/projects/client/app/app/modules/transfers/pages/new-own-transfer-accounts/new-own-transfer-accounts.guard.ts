import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from 'client/app/app/services/account.service';
import { IRequest } from 'client/app/app/models';
import { TransferService } from 'client/app/app/services/transfer.service';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Injectable({
	providedIn: 'root',
})
export class NewOwnTransferAccountGuard implements CanActivate {

	constructor(
		private accountService: AccountService,
		private router: Router,
		private transferService: TransferService,
		private userService: UserService,
	) {}

	get lastTransfer(): IRequest | null {
		return this.transferService.getTransferState().value.lastTransfer;
	}

	canActivate(): boolean {
		if (this.accountService.hasMultipleSameCurrencyAccounts &&
			this.lastTransfer === null &&
			this.userService.hasPermission(USER_PERMISSIONS.TRANSFERS.WRITE)) {
			return true;
		} else {
			this.router.navigate(['app/transfers/new']);
			return false;
		}
	}
}
