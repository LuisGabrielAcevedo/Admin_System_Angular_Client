import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UpdatePasswordService } from 'client/app/signup/services/update-password.service';
import { StorageService } from '@mcy/main/services/storage.service';

@Injectable({
	providedIn: 'root',
})
export class UpdatePasswordGuard implements CanActivate {

	constructor(
		private updatePasswordService: UpdatePasswordService,
		private router: Router,
		private storage: StorageService
	) {}

	get hasUsername(): boolean {
		return this.storage.getData('tempUser') && this.storage.getData('tempUser').length > 0;
	}

	canActivate(): boolean {		
		if(this.hasUsername){
			this.updatePasswordService.updatePasswordState({ userName: this.storage.getData('tempUser') });
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}

}
