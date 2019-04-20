import { ILoadRequest } from 'src/app/inferfaces/loadRequest';
import { IRole } from './../inferfaces/role';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RoleActions from '../store/role/role.actions';
import * as fromRoot from '../store/index.store';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


@Injectable()
export class RoleSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchRoles(): Observable<IRole[]> {
        return this.store.select(fromRoot.getRoles);
    }
    fetchRolesList(): Observable<IRole[]> {
        return this.store.select(fromRoot.getRolesList);
    }
    fetchIsLoadingRoles(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingRoles);
    }
    fetchIsLoadingRole(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingRole);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationRole);
    }
    loadRoles(): void {
        this.store.dispatch(new RoleActions.LoadRolesAction());
    }
    loadRolesList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new RoleActions.LoadRolesListAction(loadRequest));
    }

    saveRole(role: IRole): void {
        this.store.dispatch(new RoleActions.SaveRoleAction(role));
    }
    updateRole(role: IRole): void {
        this.store.dispatch(new RoleActions.UpdateRoleAction(role));
    }
    deleteRole(role: IRole): void {
        this.store.dispatch(new RoleActions.DeleteRoleAction(role));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new RoleActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new RoleActions.ChangeSearchValueAction(value));
    }
    resetLoadRequest(): void {
        this.store.dispatch(new RoleActions.ResetLoadRequestAction());
    }
}
