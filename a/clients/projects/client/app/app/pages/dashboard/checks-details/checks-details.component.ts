import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChecksService } from 'client/app/app/services/checks.service';
import { makeCheckState, ICheckState, makeAccount, IAccount } from 'client/app/app/models';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-checks-details',
	templateUrl: './checks-details.component.html',
	styleUrls: ['./checks-details.component.scss']
})
export class ChecksDetailsComponent implements OnInit, OnDestroy {
	public checksState: ICheckState = makeCheckState({});
	public subscription: Subscription = new Subscription();
	@Input() account: IAccount = makeAccount({});

	constructor(
		private checksService: ChecksService,
	) { }

	ngOnInit() {
		this.subscription.add(this.checksService.getCheckState().subscribe(state => {
			this.checksState = state;

			if (!state.searchedChecksIssued && !this.checksState.loadingChecksIssued) {
				this.onSubmitChecksIssued();
			}

			if (!state.searchedChecksReceived && !this.checksState.loadingChecksReceived) {
				this.onSubmitChecksReceived();
			}
		}));
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	onSubmitChecksIssued() {
		this.checksService.findChecksIssued(this.account);
	}

	onSubmitChecksReceived() {
		this.checksService.findChecksReceived(this.account);
	}

	get checksIssued() {
		return this.checksState.checksIssued.filter((checkData) => checkData.state === 'TO_COVER');
	}

	get checksReceived() {
		return this.checksState.checksReceived.filter((checkData) => checkData.state === 'PENDING_ACCREDITATION');
	}
}
