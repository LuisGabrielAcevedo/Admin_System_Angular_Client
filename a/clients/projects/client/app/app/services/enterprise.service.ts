import { Injectable } from '@angular/core';
import { IEnterprise } from '../models';
import { StorageService } from '@mcy/main/services/storage.service';
import { UserService } from './user.service';

@Injectable()
export class EnterpriseService {
	
	constructor(
		private storage: StorageService,
		private userService: UserService,
	) {}

	isEnterpriseInStorage(): boolean {
		const enterpriseId: string = this.storage.getData('enterpriseId')
			? this.storage.getData('enterpriseId').toString()
			: '';
		return !!enterpriseId.length;
	}

	favoriteEnterprise(enterprises: IEnterprise[], enterpriseDefault: string): IEnterprise[] {
		return enterprises.filter(enterprise => enterprise.id === enterpriseDefault);
	}

	setEnterpriseState(enterprise: IEnterprise) {
		this.userService.updateEnterpriseState({selectedEnterprise: enterprise});
		this.storage.setData('enterpriseId', enterprise.id);

		// TODO hotfix solve it
		this.storage.setData('documentType', 'CUIT');
		this.storage.setData('documentNumber', enterprise.cuilt);
	}
}
