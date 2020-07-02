import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { makeSidenavClose } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { PositiveValidationComponent } from './positive-validation/positive-validation.component';

@Component({
	selector: 'mcy-soft-token-create',
	templateUrl: './soft-token-create.component.html',
	styleUrls: ['./soft-token-create.component.scss']
})
export class SoftTokenCreateComponent implements OnDestroy {
	public subscription = new Subscription();

	constructor(
		private sidenavService: SidenavService,
		private translateService: TranslateService,
	) { }

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onConfirm() {
		this.sidenavService.nextStep({
			component: PositiveValidationComponent,
			title: this.translateService.instant('sidenav.positiveValidation.title'),
			closeAction: makeSidenavClose({
				text: this.translateService.instant('sidenav.positiveValidation.sidenavCancelConfirmation.message'),
				cancelText: this.translateService.instant('sidenav.positiveValidation.sidenavCancelConfirmation.cancel'),
				confirmText: this.translateService.instant('sidenav.positiveValidation.sidenavCancelConfirmation.confirm')
			})
		});
	}
	
}
