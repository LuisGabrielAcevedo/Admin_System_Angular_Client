import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISidenavData, makeSidenavData, makeAccount, IConcept } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { makeAccountMovementDetail } from 'client/app/app/modules/accounts/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { ConceptService } from 'client/app/app/services/concept.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-credit-movement-detail',
	templateUrl: './credit-movement-detail.component.html',
	styleUrls: ['./credit-movement-detail.component.scss']
})
export class CreditMovementDetailComponent implements OnDestroy, OnInit {
	@Input() data: ISidenavData = makeSidenavData({
		account: makeAccount({}),
		movement: makeAccountMovementDetail({})
	});
	public subscription = new Subscription();
	public concepts: IConcept[] = [];
	constructor(
		private translateService: TranslateService,
		private sidenavService: SidenavService,
		private utilsService: UtilsService,
		private conceptService: ConceptService
	) {}

	ngOnInit() {
		this.subscription.add(this.conceptService.getConceptState().subscribe((state => {
			this.concepts = state.concepts;
		})));
		this.getConcepts();
	}

	getAccountTypeTranslate() {
		return this.translateService.instant(`pages.accounts.type.${this.data.account.type}`);
	}

	getConcepts() {
		this.subscription.add(this.conceptService.getConcepts().subscribe());
	}

	getConceptName(code: string) {
		const searchedConcept: IConcept | undefined = this.concepts.find(concept => concept.code === code);
		return searchedConcept ? searchedConcept.description : '';
	}

	close() {
		this.sidenavService.close();
	}

	formatDate(date: Date) {
		const formattedDate = new Date(date);
		return this.utilsService.formatDate(formattedDate, true);
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
