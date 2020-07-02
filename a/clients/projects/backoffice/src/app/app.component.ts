import { Component } from '@angular/core';
import { XHRService } from '@mcy/main/services/xhr.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'mcy-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'backoffice';

	constructor(
		private dataService: XHRService,
		private storage: StorageService
	) {
		console.log(this.storage.getData('tempUser'));
		this.dataService.get(`v1/profiles/users?userName=${this.storage.getData('tempUser')}`).pipe(
			map((res) => {
				console.log(res);
			}, (err: any) => {
				console.log(err);
			})
		);
	}
}
