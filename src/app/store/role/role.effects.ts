import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as RoleActions from './role.actions';
import { RoleService } from '../../services/http/role.service';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import * as RouterActions from '../router/router.actions';

@Injectable()
export class RoleEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpRoleService: RoleService
    ) { }

    @Effect()
    loadRoles$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.LoadRolesAction>(RoleActions.LOAD_ROLES),
        switchMap((action) =>
            this.httpRoleService.getRoles().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new RoleActions.SetPaginationAction(pagination),
                        new RoleActions.LoadRolesSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    return of(new RoleActions.RoleErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadRolesList$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.LoadRolesListAction>(RoleActions.LOAD_ROLES_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpRoleService.getRolesList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new RoleActions.LoadRolesListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    return of(new RoleActions.RoleErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveRole$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.SaveRoleAction>(RoleActions.SAVE_ROLE),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpRoleService.saveRole(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/roles/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new RoleActions.SaveRoleSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new RoleActions.RoleErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateRole$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.UpdateRoleAction>(RoleActions.UPDATE_ROLE),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpRoleService.updateRole(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/roles/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new RoleActions.UpdateRoleSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new RoleActions.RoleErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteRole$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.DeleteRoleAction>(RoleActions.DELETE_ROLE),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpRoleService.deleteRole(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new RoleActions.DeleteRoleSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new RoleActions.LoadRolesAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new RoleActions.RoleErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.ChangePaginationAction>(RoleActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpRoleService.changePagination(pagination).pipe(
                map((response) => {
                    return new RoleActions.LoadRolesAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.ChangeSearchValueAction>(RoleActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpRoleService.changeSearchValue(value).pipe(
                map((response) => {
                    return new RoleActions.LoadRolesAction();
                })
            )
        )
    );

    @Effect()
    RoleError$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.RoleErrorAction>(RoleActions.ROLE_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );


    @Effect()
    resetLoadRequest$: Observable<Action> = this.actions$.pipe(
        ofType<RoleActions.ResetLoadRequestAction>(RoleActions.RESET_LOAD_REQUEST),
        switchMap((action) =>
            this.httpRoleService.resetLoadRequest().pipe(
                map(() => {
                    return new RoleActions.ResetLoadRequestSuccessAction();
                })
            )
        )
    );
}
