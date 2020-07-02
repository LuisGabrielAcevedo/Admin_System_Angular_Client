import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IRequest } from 'client/app/app/models/request';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';

@Component({
	selector: 'mcy-checkbook-list',
	templateUrl: './checkbook-list.component.html',
	styleUrls: ['./checkbook-list.component.scss'],
})
export class CheckbookListComponent implements OnInit {

	@Input() public checkbooks: IRequest[] = [];
	@Input() public emptyMessage = '';
	@Input() public loading = false;
	public displayedColumns: string[] = [
		'icon',
		'checkbookType',
		'requestDate',
		'requestNumber',
		'state',
		'detail',
	];

	constructor(
		private utilsService: UtilsService,
		private sidenavService: SidenavService,
		private translateService: TranslateService
	) { }

	ngOnInit() { }

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	showDetails(request: IRequest): void {
		this.sidenavService.open({
			title: this.translateService.instant('pages.checkbooks.detail.title'),
			component: RequestDetailComponent,
			data: {
				id: request.id
			}
		});
	}
}
