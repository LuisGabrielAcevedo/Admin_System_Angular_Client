import { Component, Input } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent {
	@Input() name: string = '';
	@Input() size: 'small'| 'medium' | 'large' = 'medium';

	constructor(
		private utilsService: UtilsService
	) { }

	get displayName() {
		return this.utilsService.formatProfileName(this.name)
	}

}
