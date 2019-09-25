import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AppSettingsActions from './app-settings.actions';
import * as fromRoot from '../index.store';
import { IRequestEvent, IRequests } from 'src/app/inferfaces/app-settings/loading';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchRequests(): Observable<IRequests> {
        return this.store.select(fromRoot.getRequests);
    }
    addLoandig(loadingEvent: IRequestEvent): void {
        this.store.dispatch(new AppSettingsActions.AddLoadingAction(loadingEvent));
    }
    removeLoandig(id: string): void {
        this.store.dispatch(new AppSettingsActions.RemoveLoadingAction(id));
    }
}
