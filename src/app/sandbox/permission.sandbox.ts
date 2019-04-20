import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PermissionActions from '../store/permission/permission.actions';
import * as fromRoot from '../store/index.store';
import { IPermission } from '../inferfaces/permission';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';


@Injectable()
export class PermissionSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchPermissions(): Observable<IPermission[]> {
        return this.store.select(fromRoot.getPermissions);
    }
    fetchPermissionsList(): Observable<IPermission[]> {
        return this.store.select(fromRoot.getPermissionsList);
    }
    fetchIsLoadingPermissions(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingPermissions);
    }
    fetchIsLoadingPermission(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingPermission);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationPermission);
    }
    loadPermissions(): void {
        this.store.dispatch(new PermissionActions.LoadPermissionsAction());
    }
    loadPermissionsList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new PermissionActions.LoadPermissionsListAction(loadRequest));
    }
    savePermission(permission: IPermission): void {
        this.store.dispatch(new PermissionActions.SavePermissionAction(permission));
    }
    updatePermission(permission: IPermission): void {
        this.store.dispatch(new PermissionActions.UpdatePermissionAction(permission));
    }
    deletePermission(permission: IPermission): void {
        this.store.dispatch(new PermissionActions.DeletePermissionAction(permission));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new PermissionActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new PermissionActions.ChangeSearchValueAction(value));
    }
    resetLoadRequest(): void {
        this.store.dispatch(new PermissionActions.ResetLoadRequestAction());
    }
}
