import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AdminActions from '../store/admin/admin.actions';
import * as fromRoot from '../store/index.store';
import { IAdmin } from '../inferfaces/admin';
import { ILoadRequest } from 'src/app/inferfaces/loadRequest';
import { TablePagination } from '../components/sharedComponents/table/table.interfaces';

@Injectable()
export class AdminSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchAdmins(): Observable<IAdmin[]> {
        return this.store.select(fromRoot.getAdmins);
    }
    fetchIsLoadingAdmins(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingAdmins);
    }
    fetchIsLoadingAdmin(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingAdmin);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationAdmin);
    }
    loadAdmins(): void {
        this.store.dispatch(new AdminActions.LoadAdminsAction());
    }
    saveAdmin(admin: IAdmin): void {
        this.store.dispatch(new AdminActions.SaveAdminAction(admin));
    }
    updateAdmin(admin: IAdmin, file: File): void {
        this.store.dispatch(new AdminActions.UpdateAdminAction({ admin: admin, file: file }));
    }
    deleteAdmin(admin: IAdmin): void {
        this.store.dispatch(new AdminActions.DeleteAdminAction(admin));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new AdminActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new AdminActions.ChangeSearchValueAction(value));
    }
}
