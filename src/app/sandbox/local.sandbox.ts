import { ILocal } from './../inferfaces/local';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LocalActions from '../store/local/local.actions';
import * as fromRoot from '../store/index.store';
import { TablePagination } from '../components/sharedComponents/table/table.interfaces';
import { IApplication } from 'src/app/inferfaces/application';
import { ICompany } from '../inferfaces/company';
import { ILoadRequest } from '../inferfaces/loadRequest';


@Injectable()
export class LocalSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchLocals(): Observable<ILocal[]> {
        return this.store.select(fromRoot.getLocals);
    }
    fetchLocalsList(): Observable<ILocal[]> {
        return this.store.select(fromRoot.getLocalsList);
    }
    fetchIsLoadingLocals(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingLocals);
    }
    fetchIsLoadingLocal(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingLocal);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationLocal);
    }
    loadLocals(): void {
        this.store.dispatch(new LocalActions.LoadLocalsAction());
    }
    loadLocalsList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new LocalActions.LoadLocalsListAction(loadRequest));
    }
    saveLocal(local: ILocal): void {
        this.store.dispatch(new LocalActions.SaveLocalAction(local));
    }
    updateLocal(local: ILocal): void {
        this.store.dispatch(new LocalActions.UpdateLocalAction(local));
    }
    deleteLocal(local: ILocal): void {
        this.store.dispatch(new LocalActions.DeleteLocalAction(local));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new LocalActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new LocalActions.ChangeSearchValueAction(value));
    }
    resetLoadRequest(): void {
        this.store.dispatch(new LocalActions.ResetLoadRequestAction());
    }
}
