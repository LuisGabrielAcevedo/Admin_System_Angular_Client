import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StorageService } from '@mcy/main/services/storage.service';
import { RequestsService } from 'client/app/app/services/requests.service';

@Component({
	selector: 'mcy-payments-landing',
	templateUrl: './payments-landing.component.html',
	styleUrls: ['./payments-landing.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PaymentsLandingComponent implements OnInit {
	selectedIndex: number | null = null;

	constructor(
		private storageService: StorageService,
		private requestsService: RequestsService
	) {}

	ngOnInit() {
		this.requestsService.findRequests();
		this.selectedIndex = this.storageService.getData('selectedIndex');
	}

	setSelectedIndex(index: number): void {
		this.storageService.setData('selectedIndex', index);
		this.selectedIndex = index;
	}
}
