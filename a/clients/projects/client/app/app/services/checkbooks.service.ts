import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestResponse, INewCheckbook, IEnablementCheckbook, IEnablementCheckbookResponse } from 'client/app/app/models';
import { DataService } from '@mcy/core/services/data.service';


@Injectable()
export class CheckbooksService {
	constructor(
		private dataService: DataService
	){}

	requestCheckbooks(checkbook: INewCheckbook, softToken?: string): Observable<IRequestResponse>{
		return this.dataService.post('v1/transactions/checkbooks', {
			headers: {
				softToken: softToken ? softToken : null,
			},
			body: checkbook
		})
	}

	enableCheckbook(data: IEnablementCheckbook, softToken?: string): Observable<IEnablementCheckbookResponse> {
		return this.dataService.post('v1/checkbooks/enable-pending', {
			headers: {
				softToken: softToken ? softToken : null,
			},
			body: data
		});
	}
}
