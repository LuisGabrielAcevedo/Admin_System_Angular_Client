import { Component, Input, OnInit } from '@angular/core';
import { ISidenavData, makeContact, IContact } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { Subscription } from 'rxjs';
import { ContactService } from 'client/app/app/services/contact.service';

@Component({
	templateUrl: './validate-contact.component.html',
	styleUrls: ['./validate-contact.component.scss']
})
export class ValidateContactComponent implements OnInit {
	@Input() public data: ISidenavData = { contact: makeContact({}) };
	public validatedContact: IContact = makeContact({});
	public subscription = new Subscription();
	public isLoading = false;

	constructor(
		private sidenavService: SidenavService,
		private analyticsService: AnalyticsService,
		private contactService: ContactService,
	) {
		this.trackPageView();
	}

	ngOnInit() {
		this.getContact();
	}

	getContact() {
		this.isLoading = true;
		this.subscription.add(
			this.contactService.findContactBy({ type: this.data.type, value: this.data.value }).subscribe((contact) => {
				if (contact) {
					this.validatedContact = contact;
					this.isLoading = false;
					this.sidenavService.resetError();
				} else {
					this.isLoading = false;
					this.sidenavService.onError(() => this.getContact());
				}
			}, () => {
				this.isLoading = false;
				this.sidenavService.onError(() => this.getContact());
			})
		);
	}

	confirm() {
		this.sidenavService.close();
		if (this.data.onConfirm) {
			this.data.onConfirm(this.validatedContact);
		}
	}

	cancel() {
		this.sidenavService.close();
	}

	trackPageView() {
		this.analyticsService.trackPageView({
			name: 'ValidaciónCBU',
			family: 'Pagos',
			subfamily: 'Sueldos',
			action: 'Pagar',
		}, {
			name: 'PagoSueldos',
			details: {
				transactionstep: '2'
			}
		}, {
			transactionstep02: '1'
		});
	}
}
