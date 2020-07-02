import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IRequest, IRequestCurrencySummary } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { ISavedSignatures } from 'client/app/app/models/signs';
import { IRequestAction, RequestAction, RequestState } from 'client/app/app/models/request';
import { RequestsService } from 'client/app/app/services/requests.service';

@Component({
	selector: 'mcy-requests-selection',
	templateUrl: './requests-selection.component.html',
	styleUrls: ['./requests-selection.component.scss']
})
export class RequestsSelectionComponent implements OnChanges {
	@Input() selectedRequests: IRequest[] = [];
	@Input() searchedSignatures: ISavedSignatures = {};
	@Input() width: number = 0;
	@Input() userDocumentNumber = '';
	@Input() userDocumentType = '' ;
	@Output() resetSelection: EventEmitter<any> = new EventEmitter();
	@Output() actionRedirect: EventEmitter<string> = new EventEmitter();
	public currencySummary: IRequestCurrencySummary[] = [];
	public selectedSignatures: boolean[] = [];
	public selectedStates: RequestState[] = [];
	public requestsActions: IRequestAction[] = [];
	public isCreatorOnSelectedRequests: boolean[] = [];
	public isSigned: boolean [] = [];

	constructor(
		private tranlateService: TranslateService,
		private requestsService: RequestsService
	) {
		this.requestsActions = [
			{
				type: 'CANCEL',
				color: 'primary',
				path: 'app/requests/cancel',
				id: 'cancel',
			},
			{
				type: 'REJECT',
				color: 'secondary',
				path: 'app/requests/reject',
				id: 'reject'
			},
			{
				type: 'SIGN',
				color: 'primary',
				path: 'app/requests/sign',
				id: 'sign'
			}
		];
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.selectedRequests && changes.selectedRequests.currentValue) {
			this.setData();
		}
	}

	get formattedWidth() {
		return `${this.width}px`
	}

	reset() {
		this.resetSelection.emit();
	}

	selectionText() {
		return this.requestsService.selectionText;
	}

	setData() {
		const groups: IRequestCurrencySummary[] = [];
		const selectedSignatures: boolean[] = [];
		const selectedStates: RequestState[] = [];
		const isCreatorOnSelectedRequests: boolean[] = [];
		const requestsGroupByCurrency = this.requestsService.getRequestsGroupByCurrency(this.selectedRequests);
		const isSigned: boolean[] = []
		Object.keys(requestsGroupByCurrency).forEach(key => {
			if (requestsGroupByCurrency[key]) {
				let amount = 0;
				requestsGroupByCurrency[key].forEach((req: IRequest ) => {
					selectedSignatures.push(this.searchedSignatures[req.id].signAllowed);
					selectedStates.push(req.state);
					amount += req.amount;
					const isCreator = req.user.document.number === this.userDocumentNumber && req.user.document.type === this.userDocumentType;
					isCreatorOnSelectedRequests.push(isCreator);
					isSigned.push(!!this.searchedSignatures[req.id].signed);
				});
				groups.push({
					currency: key,
					amount
				})
			}
		});
		this.selectedSignatures = selectedSignatures;
		this.selectedStates = selectedStates;
		this.isCreatorOnSelectedRequests = isCreatorOnSelectedRequests;
		this.isSigned = isSigned;
		this.currencySummary = groups;
	}

	getCurrencyLabel(value: string) {
		return this.tranlateService.instant(`pages.requests.requestsList.subtotal${value}`);
	}

	checkStates() {
		return this.selectedStates.every( state => state === this.selectedStates[0] )
	}

	checkSignatures() {
		return this.selectedSignatures.every( sign => sign === this.selectedSignatures[0])
	}

	checkCreator() {
		return this.isCreatorOnSelectedRequests.every( user => user === this.isCreatorOnSelectedRequests[0])
	}

	checkSigned() {
		return this.isSigned.every( user => user === this.isSigned[0])
	}

	goTo(path: string) {
		this.actionRedirect.emit(path);
	}

	get validSelection() {
		return this.checkSignatures() && this.checkStates() && this.checkSigned();
	}

	get tempRequestList() {
		return this.selectedRequests.slice(
			0,
			3
		);
	}

	get activeActions() {
		let availableActions: RequestAction[] = [];
		const powerSignature = this.selectedSignatures[0];
		const state = this.selectedStates[0];
		const isSigned = this.isSigned[0]
		if (state === 'PENDING_APPROVAL' && powerSignature && !isSigned) {
			availableActions = this.selectedRequests.length > 1
				? ['SIGN']
				: ['SIGN', 'REJECT'];
		}
		if (state === 'PARTIALLY_AUTHORIZED' && powerSignature && !isSigned) {
			availableActions = this.selectedRequests.length > 1
				? ['SIGN']
				: ['SIGN', 'REJECT'];
		}
		if (state === 'PENDING_APPROVAL' && !powerSignature) {
			if (this.checkCreator() && this.isCreatorOnSelectedRequests[0]) {
				availableActions = ['CANCEL'];
			}
		}
		return this.requestsActions.filter(action => availableActions.includes(action.type));
	}

	getActionLabel(value: string) {
		return this.tranlateService.instant(`pages.requests.actions.${value}`);
	}
}
