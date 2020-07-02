import { Component, Input } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { ICheckReceived, IAccount, makeAccount } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { PdfService } from 'client/app/app/services/pdf.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ChecksRejectedComponent } from 'client/app/app/sidenav/checkbooks/checks-rejected/checks-rejected.component';
import { AMOUNT_THRESHOLD } from 'client/app/app/constants';
import { ChecksService } from 'client/app/app/services/checks.service';

@Component({
	selector: 'mcy-checks-received-list',
	templateUrl: './checks-received-list.component.html',
	styleUrls: ['./checks-received-list.component.scss'],
})
export class ChecksReceivedListComponent {
	@Input() public checks: ICheckReceived[] = [];
	@Input() public emptyMessage = '';
	@Input() public hasAccountSelected = false;
	@Input() public loading = false;
	@Input () public selectedAccount: IAccount = makeAccount({});
	subscription = new Subscription();
	public AMOUNT_THRESHOLD: number = 40000;
	public displayedColumns: string[] = [
		'icon',
		'number',
		'code',
		'accreditationDate',
		'amount',
		'state',
		'options',
	];

	constructor(
		private utilsService: UtilsService,
		private pdfService: PdfService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private checksService: ChecksService

	) { }

	selectDate(check: ICheckReceived) {
		return check.state === 'DISCOUNTED' || check.state === 'REJECTED'
			? this.formatDate(check.rejectionDate)
			: this.formatDate(check.accreditationDate)
	}

	formatDate(date: Date): string {
		if(date) {
			const dateAux = new Date(date);
			return this.utilsService.formatDate(dateAux, true);
		}
		return ' - ';
	}

	downloadImage(check: ICheckReceived) {
		this.subscription.add(this.checksService.getImgNote(check.code).subscribe(checkNew => {
				this.pdfService.downloadPdf(checkNew.data.file);
			})
		);
	}

	downloadBouncedCheckNote(check: ICheckReceived) {
		this.subscription.add(this.checksService.getBouncedCheckNote(check,this.selectedAccount).subscribe(checkNew => {
				this.pdfService.downloadPdf(checkNew.data.file);
			})
		);
	}


	showDownloadImage(check: ICheckReceived) {
		return check.amount > AMOUNT_THRESHOLD;
	}

	showOption(check: ICheckReceived) {
		return check.state === 'DISCOUNTED' || check.state === 'REJECTED';
	}

	showOptionsButton(check: ICheckReceived) {
		return this.showOption(check) || ((
			check.state === 'ACCREDITED' ||
			check.state === 'PENDING_ACCREDITATION'
		) && this.showDownloadImage(check))
	}

	showReasonRejection(check: ICheckReceived): void {
		this.sidenavService.open({
			title: this.translateService.instant('pages.checkbooks.received.checkRejected'),
			component: ChecksRejectedComponent,
			data: { check }
		});
	}
}
