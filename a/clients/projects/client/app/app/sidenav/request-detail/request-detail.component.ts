import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IRequest } from 'client/app/app/models/request';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { SalaryRequestDetailComponent }
	from 'client/app/app/sidenav/request/salary-request-detail/salary-request-detail.component';
import { RequestsService } from 'client/app/app/services/requests.service';
import { ISidenavData, ISidenavStep, makeSidenavStep } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { ServiceRequestDetailComponent }
	from 'client/app/app/sidenav/request/service-request-detail/service-request-detail.component';
import { CheckbookRequestDetailComponent }
	from 'client/app/app/sidenav/request/checkbook-request-detail/checkbook-request-detail.component';


@Component({
	selector: 'mcy-request-detail',
	templateUrl: './request-detail.component.html',
	styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit, OnDestroy {
	@Input() public data: ISidenavData = {};
	public subscriptions: Subscription = new Subscription();

	constructor(private sidenavService: SidenavService,
			private translateService: TranslateService,
			private requestsService: RequestsService) { }

	ngOnInit() {
		this.getRequestDetail(this.data.id);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	getRequestDetail(id: string) {
		this.subscriptions.add(
			this.requestsService
			.getRequestById(id)
			.subscribe(resp => {
				if (resp.success) {
					this.goToRequestDetail(resp.data);
				} else {
					this.sidenavService.onError(() => { this.getRequestDetail(id) });
				}
			}, () => this.sidenavService.onError(() => { this.getRequestDetail(id) }))
		);
	}

	goToRequestDetail(request: IRequest) {
		const step = this.getSidenavStep(request);
		this.sidenavService.open(step);
	}

	getSidenavStep(request: IRequest) {
		const step: ISidenavStep = makeSidenavStep({data: {request}});

		if (this.requestsService.isCheckbook(request)) {
			step.title = this.translateService.instant('pages.checkbooks.detail.title');
			step.component = CheckbookRequestDetailComponent;
			return step;
		}

		if (this.requestsService.isServicePayment(request)) {
			step.title = this.translateService.instant('sidenav.payments.serviceDetail');
			step.component = ServiceRequestDetailComponent;
			return step;
		}

		step.component = SalaryRequestDetailComponent;
		if (this.requestsService.isSalary(request)) {
			step.title = this.translateService.instant('pages.payments.salary.salaryPayment');
		} else if (this.requestsService.isTransfer(request)) {
			step.title = this.translateService.instant('sidenav.transferDetails.title');
		} else if (this.requestsService.isProviderPayment(request)) {
			step.title = this.translateService.instant('sidenav.payments.providerPaymentDetailTitle');
		}
		return step;
	}
}
