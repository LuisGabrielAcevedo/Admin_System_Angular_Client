import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountState, IServiceCategoriesResponse, IServiceCategoryState } from 'client/app/app/models';

export class ServiceCategoryServiceMock implements OnDestroy {
	ngOnDestroy(): void {}

	findServiceCategories(): void {}

	updateServiceCategoryState(_data: Partial<IAccountState>) {}

	getServiceCategoryState(): Observable<IServiceCategoryState> {
		return new Observable();
	}

	getServiceCategories(): Observable<IServiceCategoriesResponse> {
		return new Observable();
	}
}
