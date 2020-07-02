import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PasswordService } from '@mcy/core/services/password.service';

@Component({
	selector: 'mcy-password-security',
	templateUrl: './password-security.component.html',
	styleUrls: ['./password-security.component.scss']
})
export class PasswordSecurityComponent {
	@Input() password: string = '';

	constructor(
		private translateService: TranslateService,
		private passwordService: PasswordService
	) { }

	getLevelLabel(): string {
		const level = this.passwordService.getLevel(this.password);
		if (level === 0) {
			return '';
		} else if (level === 1) {
			return this.translateService.instant('components.password.securityLevelWeak');
		} else if (level === 2) {
			return this.translateService.instant('components.password.securityLevelMedium');
		} else {
			return this.translateService.instant('components.password.securityLevelStrong');
		}
	}

	getLevel(): number {
		return this.passwordService.getLevel(this.password);
	}

}
