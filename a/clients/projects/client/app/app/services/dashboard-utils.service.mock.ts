import { Injectable } from '@angular/core';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

@Injectable()
export class DashboardUtilsServiceMock {

	constructor() {}

	isSoftTokenError(_res: IApiResponseArray<any> | IApiResponseObject<any>): boolean {
		return false;
	}

	showWelcomeModal(_fullName: string, _pageId: string, _versionId: string, _userId: string) {}

	showTermsAndConditionsModal(
		_pageId: string,
		_versionId: string,
		_userId: string,
		_username: string,
		_tycDescription: string
	) {}

	displayMissingSignatures() {}
}
