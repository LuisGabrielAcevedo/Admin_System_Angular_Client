import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactCategory } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {
	@Input() name: string = '';
	@Input() size: 'small'| 'medium' | 'large' = 'medium';
	@Input() selected: boolean = false;
	@Input() favorite: boolean | null = null;
	@Input() category: ContactCategory = 'OTHERS';
	@Input() showFavoriteTooltip: boolean = false;
	@Output() handleFavorite = new EventEmitter();

	constructor(
		private utilsService: UtilsService
	) { }

	get displayName() {
		return this.utilsService.formatProfileName(this.name)
	}

	ngOnInit() {}

	get isProvider(): boolean {
		return this.category === 'PROVIDER';
	}

	get isUnknown(): boolean {
		return this.category === 'UNKNOWN';
	}

	get isOthers(): boolean {
		return this.category === 'OTHERS';
	}

	get isClient(): boolean {
		return this.category === 'CLIENT';
	}

	get isEmployee(): boolean {
		return this.category === 'EMPLOYEE';
	}

	get isService(): boolean {
		return this.category === 'SERVICE';
	}

	onChange() {
		this.handleFavorite.emit();
	}

}
