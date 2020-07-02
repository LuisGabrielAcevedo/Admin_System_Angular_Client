import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestsService } from 'client/app/app/services/requests.service';
import { IRequest } from 'client/app/app/models';

@Injectable()
export class SelectedRequestsGuard implements CanActivate {
	constructor(
		private requestsService: RequestsService,
		private router: Router
	) {}

	get selectedRequests(): IRequest[] {
		return this.requestsService.getRequestsState().value.selectedRequests;
	}

	canActivate(): boolean {
		if (!this.selectedRequests.length) {
			this.router.navigateByUrl('app/requests');
		}
		return true;
	}
}
