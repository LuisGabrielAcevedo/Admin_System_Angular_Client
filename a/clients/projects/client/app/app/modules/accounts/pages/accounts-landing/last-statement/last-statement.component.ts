import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { IAccount, makeAccount } from 'client/app/app/models';
import { StatementsComponent } from 'client/app/app/sidenav/account/statements/statements.component';
import { PdfService } from 'client/app/app/services/pdf.service';
import { StatementsService } from 'client/app/app/services/statements.service';
import { IStatementsState, makeStatementsState, IStatement } from 'client/app/app/modules/accounts/models/statement';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-last-statement',
	templateUrl: './last-statement.component.html',
	styleUrls: ['./last-statement.component.scss']
})
export class LastStatementComponent implements OnInit {
	@Input() account: IAccount = makeAccount({});
	public statementsState: IStatementsState = makeStatementsState({});
	public statements: IStatement[] = [];
	public subscription: Subscription = new Subscription();

	constructor(private utilsService: UtilsService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private statementsService: StatementsService,
		private  pdfService: PdfService) {
	}

	ngOnInit() {
		this.subscription.add(this.statementsService.getStatementsState().subscribe(state => {
			this.statementsState = state;
			 this.statements = this.statementsState.statements;
		}));
	}

	formatDate() {
		if (this.statements.length) {
			const formattedDate = new Date(this.statements[0].date);
			return this.utilsService.formatDate(formattedDate);
		}
		return '';
	}

	openAccountsSummariesAll() {
		this.sidenavService.open({
			title: this.translateService.instant(
				'pages.accounts.accountsSummariesAll.title'
			),
			component: StatementsComponent,
			data: {
				account: this.account,
				statements: this.statementsState.statements
			}
		});
	}

	download() {
		if (this.statementsState.statements.length) {
			this.subscription.add(
				this.statementsService.getStatement(this.statementsState.statements[0], this.account).subscribe(statement => {
					this.pdfService.downloadPdf(statement.data.file);
				})
			);
		}
	}

	onSubmitStatements() {
		this.subscription.add(
			this.statementsService.findStatements(this.account).subscribe()
		);
	}
}
