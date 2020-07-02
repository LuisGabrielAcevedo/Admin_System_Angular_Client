import { Component, Input } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-user-profile-image',
	templateUrl: './user-profile-image.component.html',
	styleUrls: ['./user-profile-image.component.scss']
})

export class UserProfileImageComponent{
	@Input() name: string = '';
	@Input() size: 'small'| 'medium' | 'large' = 'medium';
	@Input() selected: boolean = false;
	@Input() hoverEnabled: boolean = true;
	@Input() id: string = '';

	
	constructor(
		private utilsService: UtilsService
	) {}

	get displayName(): string {
		return this.utilsService.formatProfileName(this.name);
	}
}
