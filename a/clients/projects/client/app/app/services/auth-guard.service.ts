import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { StorageService } from '@mcy/main/services/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanLoad {
	constructor(
		private storage: StorageService,
		private router: Router
	) {
	}

	canLoad(/*route: ActivatedRouteSnapshot, segments: UrlSegment[]*/): Observable<boolean> | Promise<boolean> | boolean {
		const requires = [
			this.storage.getData('token'),

			// TODO reactivate after reolver passed to page
			// this.storage.getData('documentType'),
			// this.storage.getData('documentNumber'),
		];

		if (!requires.some( item => item === undefined)) {
			return true;
		} else {
			this.router.navigate(['/forbidden']).finally(() => false);
			return false;
		}
	}
}
