import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-login-error-message',
	templateUrl: './login-error-message.component.html',
	styleUrls: ['./login-error-message.component.scss']
})
export class LoginErrorMessageComponent { 
	@Input() title: string = '';
	@Input() message: string = '';
	@Output() handleCloseClick = new EventEmitter();

	onCloseClick() {
		this.handleCloseClick.emit();
	}
}
