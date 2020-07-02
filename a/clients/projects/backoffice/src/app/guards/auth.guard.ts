import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '@mcy/main/services/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(
		private storage: StorageService,
		private router: Router
	) { }

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		const requires = this.storage.getData('agentToken');
		if (requires) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
