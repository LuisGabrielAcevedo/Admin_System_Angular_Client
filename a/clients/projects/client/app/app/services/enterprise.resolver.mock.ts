import { Injectable } from '@angular/core';
import { Resolve, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { IEnterprise } from 'client/app/app/models';

@Injectable()
export class EnterpriseResolverMock implements Resolve<IEnterprise>, CanActivate{
	isEnterpriseInStorage(): boolean {
		return false;
	}

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		return false;
	}

	resolve(): Observable<any> | Promise<any> |any {
		return false;
	}
}
