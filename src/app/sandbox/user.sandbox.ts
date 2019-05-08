import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from '../store/user/user.actions';
import * as fromRoot from '../store/index.store';
import { IUser } from '../inferfaces/user';
import { ILoadRequest } from '../inferfaces/loadRequest';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';

@Injectable()
export class UserSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchUsers(): Observable<IUser[]> {
        return this.store.select(fromRoot.getUsers);
    }
    fetchUsersList(): Observable<IUser[]> {
        return this.store.select(fromRoot.getUsersList);
    }
    fetchIsLoadingUsers(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingUsers);
    }
    fetchIsLoadingUser(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingUser);
    }
    fetchPagination(): Observable<TablePagination> {
        return this.store.select(fromRoot.getPaginationUser);
    }
    loadUsers(): void {
        this.store.dispatch(new UserActions.LoadUsersAction());
    }
    loadUsersList(loadRequest: ILoadRequest): void {
        this.store.dispatch(new UserActions.LoadUsersListAction(loadRequest));
    }
    saveUser(user: IUser): void {
        this.store.dispatch(new UserActions.SaveUserAction(user));
    }
    updateUser(user: IUser, file: File): void {
        this.store.dispatch(new UserActions.UpdateUserAction({ user: user, file: file }));
    }
    deleteUser(user: IUser): void {
        this.store.dispatch(new UserActions.DeleteUserAction(user));
    }
    changePagination(pagination: TablePagination): void {
        this.store.dispatch(new UserActions.ChangePaginationAction(pagination));
    }
    changeSearchValue(value: string): void {
        this.store.dispatch(new UserActions.ChangeSearchValueAction(value));
    }
    resetLoadRequest(): void {
        this.store.dispatch(new UserActions.ResetLoadRequestAction());
    }
}

