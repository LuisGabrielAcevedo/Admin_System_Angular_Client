
import { Injectable } from '@angular/core';

interface IAnalyticsPage {};
interface IAnalyticsEvent {};
interface IAnalyticsTransaction {};

@Injectable()
export class AnalyticsServiceMock {

	constructor() {}

	public init() {}

	public trackPageView(_page: IAnalyticsPage, _transaction: IAnalyticsTransaction, _events?: any) {}

	public trackEvent(_event: IAnalyticsEvent, _transactionName: string) {}

}
