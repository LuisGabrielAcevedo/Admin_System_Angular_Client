import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
	selector: 'mcy-transfer-type',
	templateUrl: './transfer-type.component.html',
	styleUrls: ['./transfer-type.component.scss'],
})
export class TransferTypeComponent {
	@Input() title: string = '';
	@Input() description: string = '';
	@Input() id: string = '';
	@Input() icon: string = '';
	@Input() disabled: boolean = false;
	@Input() disabledTooltip: string = '';
	@Output() handleClick = new EventEmitter();


	onClick() {
		if (!this.disabled) {
			this.handleClick.emit();
		}
	}

	get isTooltipDisabled(): boolean {
		return this.disabled && this.disabledTooltip.length > 0;
	}
}
