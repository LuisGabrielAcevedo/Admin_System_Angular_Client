
import { Injectable } from '@angular/core';
import { Analytics } from '@mcy/main/services/analytics';
import { environment } from 'client/environments/environment';
import { version } from 'client/app/version';

const GTM_ID = 'GTM-NMBQHMJ';

interface IAnalyticsPage {
	name: string;
	family: string;
	subfamily: string;
	action: string;
	pageid?: string;
};

interface IAnalyticsEvent {
	customCategory: string;
	customAction: string;
	customLabel: string;
}

interface IAnalyticsTransaction {
	name: string;
	details: any;
};

@Injectable()
export class AnalyticsService {

	constructor(private analyticsLib: Analytics) {}

	public init() {
		this.analyticsLib.init({
			gtmContainerId: GTM_ID
	 	});
	}

	public trackPageView(page: IAnalyticsPage, transaction: IAnalyticsTransaction, events?: any) {
		const baseEvent = this.buildCommonPackage(page, transaction, events);
		this.analyticsLib.setData('analyticsData', baseEvent);
		this.analyticsLib.trackState(baseEvent.page.name);
	}

	public trackEvent(event: IAnalyticsEvent, transactionName: string) {
		this.analyticsLib.setData('transaction.name', transactionName);
		this.analyticsLib.trackAction(event);
	}

	private buildVisitorInfo() {
		return {
			geolocation: ''
		}
	}

	buildPageInfo(page: IAnalyticsPage) {
		return {
			name: `HB:AR:PJ:LG:${page.subfamily}:${page.action}:${page.name}`,
			family: page.family,
			subfamily: page.subfamily,
			action: page.action,
			pageid: page.pageid
		}
	}

	private buildCommonPackage(page: IAnalyticsPage, transaction: IAnalyticsTransaction, events?: any) {
		return {
			site: {
				developmenttype: 'Web',
				environment: environment.production ? 'Prod' : 'Dev',
				useragent: navigator.userAgent,
				permissions: '',
				accessibility: '',
				channel: 'HomeBankingPJ'
			},
			visitor: this.buildVisitorInfo(),
			page: this.buildPageInfo(page),
			custom: {
				events,
				internaltracking: '',
				errorname: ''
			},
			toolkit: {
				versao: version,
				data: ''
			},
			transaction,
			rule: 'pageLoad'
		};
	}

}
