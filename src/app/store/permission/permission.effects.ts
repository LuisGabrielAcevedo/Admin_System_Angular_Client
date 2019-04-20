import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as PermissionActions from './permission.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { PermissionService } from '../../services/http/permission.service';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';

@Injectable()
export class PermissionEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpPermissionService: PermissionService
    ) { }

    @Effect()
    loadPermissions$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.LoadPermissionsAction>(PermissionActions.LOAD_PERMISSIONS),
        switchMap((action) =>
            this.httpPermissionService.getPermissions().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new PermissionActions.SetPaginationAction(pagination),
                        new PermissionActions.LoadPermissionsSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    return of(new PermissionActions.PermissionErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadPermissionsList$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.LoadPermissionsListAction>(PermissionActions.LOAD_PERMISSIONS_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpPermissionService.getPermissionsList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new PermissionActions.LoadPermissionsListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    return of(new PermissionActions.PermissionErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    savePermission$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.SavePermissionAction>(PermissionActions.SAVE_PERMISSION),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpPermissionService.savePermission(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/permissions/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new PermissionActions.SavePermissionSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new PermissionActions.PermissionErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updatePermission$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.UpdatePermissionAction>(PermissionActions.UPDATE_PERMISSION),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpPermissionService.updatePermission(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/permissions/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new PermissionActions.UpdatePermissionSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new PermissionActions.PermissionErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deletePermission$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.DeletePermissionAction>(PermissionActions.DELETE_PERMISSION),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpPermissionService.deletePermission(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new PermissionActions.DeletePermissionSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new PermissionActions.LoadPermissionsAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new PermissionActions.PermissionErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.ChangePaginationAction>(PermissionActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpPermissionService.changePagination(pagination).pipe(
                map((response) => {
                    return new PermissionActions.LoadPermissionsAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.ChangeSearchValueAction>(PermissionActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpPermissionService.changeSearchValue(value).pipe(
                map((response) => {
                    return new PermissionActions.LoadPermissionsAction();
                })
            )
        )
    );

    @Effect()
    permissionError$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.PermissionErrorAction>(PermissionActions.PERMISSION_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );


    @Effect()
    resetLoadRequest$: Observable<Action> = this.actions$.pipe(
        ofType<PermissionActions.ResetLoadRequestAction>(PermissionActions.RESET_LOAD_REQUEST),
        switchMap((action) =>
            this.httpPermissionService.resetLoadRequest().pipe(
                map(() => {
                    return new PermissionActions.ResetLoadRequestSuccessAction();
                })
            )
        )
    );
}
