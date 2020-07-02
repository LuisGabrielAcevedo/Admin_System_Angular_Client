import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IRequestCurrencySummary } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mcy-requests-actions-footer',
	templateUrl: './requests-actions-footer.component.html',
	styleUrls: ['./requests-actions-footer.component.scss']
})
export class RequestsActionsFooterComponent {
	@Input() public buttonLabel = '';
	@Input() public disabled = false;
	@Input() public requestsSummary: IRequestCurrencySummary[] = [];

	@Output() buttonClick: EventEmitter<any> = new EventEmitter();

	constructor(private tranlateService: TranslateService) {}

	click() {
		this.buttonClick.emit();
	}

	getSubtotalLabelByCurrency(value: string) {
		return this.tranlateService.instant(
			`pages.requests.requestsList.subtotal${value}`
		);
	}
}
