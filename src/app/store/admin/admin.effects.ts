import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as AdminActions from './admin.actions';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { AdminService } from '../../services/http/admin.service';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';

@Injectable()
export class AdminEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpAdminService: AdminService
    ) { }

    @Effect()
    loadAdmins$: Observable<Action> = this.actions$.pipe(
        ofType<AdminActions.LoadAdminsAction>(AdminActions.LOAD_ADMINS),
        switchMap((action) =>
            this.httpAdminService.getAdmins().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new AdminActions.SetPaginationAction(pagination),
                        new AdminActions.LoadAdminsSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    return of(new AdminActions.AdminErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveAdmin$: Observable<Action> = this.actions$.pipe(
        ofType<AdminActions.SaveAdminAction>(AdminActions.SAVE_ADMIN),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpAdminService.saveAdmin(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/admins/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new AdminActions.SaveAdminSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new AdminActions.AdminErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateAdmin$: Observable<Action> = this.actions$.pipe(
        ofType<AdminActions.UpdateAdminAction>(AdminActions.UPDATE_ADMIN),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpAdminService.updateAdmin(updateRequest.admin, updateRequest.file).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/admins/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new AdminActions.UpdateAdminSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new AdminActions.AdminErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteAdmin$: Observable<Action> = this.actions$.pipe(
        ofType<AdminActions.DeleteAdminAction>(AdminActions.DELETE_ADMIN),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpAdminService.deleteAdmin(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new AdminActions.DeleteAdminSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new AdminActions.LoadAdminsAction()
                    ];
                }),
                catchError(errorResp => {
                    return of(new AdminActions.AdminErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<AdminActions.ChangePaginationAction>(AdminActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpAdminService.changePagination(pagination).pipe(
                map((response) => {
                    return new AdminActions.LoadAdminsAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<AdminActions.ChangeSearchValueAction>(AdminActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpAdminService.changeSearchValue(value).pipe(
                map((response) => {
                    return new AdminActions.LoadAdminsAction();
                })
            )
        )
    );

    @Effect()
    adminError$: Observable<Action> = this.actions$.pipe(
        ofType<AdminActions.AdminErrorAction>(AdminActions.ADMIN_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
