import { Component, Input } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { ICheckIssued } from 'client/app/app/models';
import { AMOUNT_THRESHOLD } from 'client/app/app/constants';
import { Subscription } from 'rxjs';
import { PdfService } from 'client/app/app/services/pdf.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ChecksRejectedComponent } from 'client/app/app/sidenav/checkbooks/checks-rejected/checks-rejected.component';
import { TranslateService } from '@ngx-translate/core';
import { ChecksService } from 'client/app/app/services/checks.service';

@Component({
	selector: 'mcy-checks-issued-list',
	templateUrl: './checks-issued-list.component.html',
	styleUrls: ['./checks-issued-list.component.scss'],
})
export class ChecksIssuedListComponent {
	@Input() public checks: ICheckIssued[] = [];
	@Input() public emptyMessage = '';
	@Input() public loading = false;
	@Input() public hasAccountSelected = false;

	subscription = new Subscription();
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
		) {}

	selectDate(check: ICheckIssued) {
		return  check.state === 'REJECTED'
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

	showDownloadImage(check: ICheckIssued) {
		return check.amount > AMOUNT_THRESHOLD;
	}

	showRejectMotive(check: ICheckIssued) {
		return check.state === 'REJECTED';
	}

	showOptions(check: ICheckIssued) {
		return this.showDownloadImage(check) || this.showRejectMotive(check)
	}

	downloadImage(check: ICheckIssued) {
		this.subscription.add(this.checksService.getImgNote(check.code).subscribe(checkNew => {
				this.pdfService.downloadPdf(checkNew.data.file);
			})
		);
	}

	showReasonRejection(check: ICheckIssued): void {
		this.sidenavService.open({
			title: this.translateService.instant('pages.checkbooks.checksIssued.checkRejected'),
			component: ChecksRejectedComponent,
			data: { check }
		});
	}
}
