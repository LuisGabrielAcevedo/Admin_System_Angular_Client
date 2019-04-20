import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ApplicationActions from '../store/application/application.actions';
import * as fromRoot from '../store/index.store';
import { IApplication } from '../inferfaces/application';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';

@Injectable()
export class ApplicationSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchApplications(): Observable<IApplication[]> {
        return this.store.select(fromRoot.getApplications);
    }
    fetchApplicationsList(): Observable<IApplication[]> {
        return this.store.select(fromRoot.getApplicationsList);
    }
    fetchIsLoadingApplications(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingApplications);
    }
    fetchIsLoadingApplication(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingApplication);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationApplication);
    }
    loadApplications(): void {
        this.store.dispatch(new ApplicationActions.LoadApplicationsAction());
    }
    loadApplicationsList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new ApplicationActions.LoadApplicationsListAction(loadRequest));
    }
    saveApplication(application: IApplication): void {
        this.store.dispatch(new ApplicationActions.SaveApplicationAction(application));
    }
    updateApplication(application: IApplication): void {
        this.store.dispatch(new ApplicationActions.UpdateApplicationAction(application));
    }
    deleteApplication(application: IApplication): void {
        this.store.dispatch(new ApplicationActions.DeleteApplicationAction(application));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new ApplicationActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new ApplicationActions.ChangeSearchValueAction(value));
    }
}

