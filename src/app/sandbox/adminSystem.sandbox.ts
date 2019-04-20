import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AdminSystemActions from '../store/adminSystem/adminSystem.actions';
import * as fromRoot from '../store/index.store';
import { IApiProductType } from 'src/app/inferfaces/apiProductType';


@Injectable()
export class AdminSystemSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchApiProductTypes(): Observable<IApiProductType[]> {
        return this.store.select(fromRoot.getApiProductTypes);
    }
    fetchUnits(): Observable<string[]> {
        return this.store.select(fromRoot.getUnits);
    }
    fetchCoins(): Observable<string[]> {
        return this.store.select(fromRoot.getCoins);
    }
    fetchIsLoadingAdminSystem(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingAdminSystem);
    }
    loadApiProductTypes(): void {
        this.store.dispatch(new AdminSystemActions.LoadApiProductTypesAction());
    }
    loadUnits(): void {
        this.store.dispatch(new AdminSystemActions.LoadUnitsAction());
    }
    loadCoins(): void {
        this.store.dispatch(new AdminSystemActions.LoadCoinsAction());
    }
}
