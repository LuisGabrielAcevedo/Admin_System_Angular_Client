import { Component, Input, OnDestroy } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { ISidenavData, makeSidenavData, makeAccount } from 'client/app/app/models';
import { StatementsService } from 'client/app/app/services/statements.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { IStatement } from 'client/app/app/modules/accounts/models';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-statements-all',
	templateUrl: './statements.component.html',
	styleUrls: ['./statements.component.scss']
})
export class StatementsComponent implements OnDestroy {
	@Input() data: ISidenavData = makeSidenavData({
		account: makeAccount({}),
		statements: []
	});
	subscription = new Subscription();

	constructor(
		private sidenavService: SidenavService,
		private utilsService: UtilsService,
		private statementsService: StatementsService,
		private  pdfService: PdfService
	) {}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	end() {
		this.sidenavService.close();
	}

	formatDate(date: Date) {
		const formattedDate = new Date(date);
		return this.utilsService.formatDate(formattedDate).substr(3, 8);
	}

	download(statement: IStatement) {
		this.subscription.add(
			this.statementsService.getStatement(statement, this.data.account).subscribe(response => {
				this.pdfService.downloadPdf(response.data.file);
			})
		);
	}
}
