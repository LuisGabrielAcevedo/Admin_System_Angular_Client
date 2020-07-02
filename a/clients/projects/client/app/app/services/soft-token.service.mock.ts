import { Injectable } from '@angular/core';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

@Injectable()
export class SoftTokenServiceMock {

	constructor() {}

	handleErrors(
		_res: IApiResponseArray<any> | IApiResponseObject<any>, 
		_callback: (softToken: string) => void): boolean
	{
		return false;
	}

	requestSoftToken(_callback: (softToken: string) => void) {}
}
