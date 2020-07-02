import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEnterprise, makeEnterprise } from 'client/app/app/models';
import { CONTRAINTS } from 'client/app/app/constants';

@Component({
	selector: 'mcy-enterprise-button',
	templateUrl: './enterprise-button.component.html',
	styleUrls: ['./enterprise-button.component.scss']
})
export class EnterpriseButtonComponent {
	@Input() selectedEnterprise: IEnterprise = makeEnterprise({});
	@Input() enterprises: IEnterprise[] = [];
	@Input() favorite: string = '';
	@Output() handleOnViewEnterpriseDetails = new EventEmitter();
	@Output() handleOnViewAllEnterprisesClick = new EventEmitter();
	@Output() handleOnOtherEnterpriseClick = new EventEmitter();

	public menuOpened = false;

	onViewDetailsClick() {
		this.handleOnViewEnterpriseDetails.emit();
	}

	onViewAllEnterprisesClick() {
		this.handleOnViewAllEnterprisesClick.emit();
	}

	handleMenuOpened() {
		this.menuOpened = !this.menuOpened;
	}

	onOtherEnterpriseClick(enterprise: IEnterprise) {
		this.handleOnOtherEnterpriseClick.emit(enterprise);
	}

	get otherEnterprises(): IEnterprise[] {
		return this.enterprises.filter(enterprise =>
				enterprise.id !== this.selectedEnterprise.id
			).slice(0, CONTRAINTS.ENTERPRISES.HEADER.MAX_DISPLAYED);
	}
}
