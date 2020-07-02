import { Component, Input, OnInit } from '@angular/core';
import { STATUS_REQUEST } from 'client/app/app/constants';

@Component({
	selector: 'mcy-status-icon',
	templateUrl: './status-icon.component.html',
	styleUrls: ['./status-icon.component.scss']
})
export class StatusIconComponent implements OnInit{
	@Input() status : 'SUCCESS' |
	'APPROVED' |
	'PARTIALLY_AUTHORIZED' |
	'PENDING_APPROVAL' |
	'CANCELLED' |
	'AUTHORIZED' |
	'REJECTED' |
	'DENIED' | '' = '';
	@Input() size: 'small'| 'medium' | 'large' = 'medium';

	public classState = '';
	public classStatus = '';
	public icon = '';


	ngOnInit(){
		this.setStyle();
		this.setStatus();
	}

	setStyle(){
		switch (this.size) {
			case 'small':
				this.classState = 'status-icon__circle--small status-icon__icon--small'
				break;

			case 'medium':
				this.classState = 'status-icon__circle--medium status-icon__icon--medium'
				break;

			case 'large':
				this.classState = 'status-icon__circle--large status-icon__icon--large'
				break;

			default:
				break;
		}
	}

	setStatus(){
		switch (this.status) {

			case STATUS_REQUEST.SUCCESS :
				this.classStatus = 'status-icon__circle--checked';
				this.icon = 'check';
				break;

			case STATUS_REQUEST.APPROVED :
					this.classStatus = 'status-icon__circle--checked';
					this.icon = 'check';
					break;

			case STATUS_REQUEST.AUTHORIZED :
					this.classStatus = 'status-icon__circle--authorized';
					this.icon = 'senha_circulo_outline';
					break;

			case  STATUS_REQUEST.AUTHORIZED_CONTENT.APPROVED :
					this.classStatus = 'status-icon__circle--checked';
					this.icon = 'check';
					break;

			case STATUS_REQUEST.CANCELLED :
				this.classStatus = 'status-icon__circle--error';
				this.icon = 'fechar';
				break;

			case  STATUS_REQUEST.REJECTED :
					this.classStatus = 'status-icon__circle--error';
					this.icon = 'fechar';
					break;

			case  STATUS_REQUEST.AUTHORIZED_CONTENT.DENIED :
					this.classStatus = 'status-icon__circle--error';
					this.icon = 'fechar';
					break;

			case STATUS_REQUEST.PENDING_APPROVAL :
				this.classStatus = 'status-icon__circle--pending-approval';
				this.icon = 'senha_circulo_outline';
				break;

			case STATUS_REQUEST.PARTIALLY_AUTHORIZED :
				this.classStatus = 'status-icon__circle--partially-authorized';
				this.icon = 'senha_circulo_outline';
				break;

			default:
				break;
		}
	}
}
