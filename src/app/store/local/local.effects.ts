import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as LocalActions from './local.actions';
import { StoreService } from '../../services/http/local.service';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';

@Injectable()
export class LocalEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpStoreService: StoreService
    ) { }

    @Effect()
    loadLocal$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.LoadLocalsAction>(LocalActions.LOAD_LOCALS),
        switchMap((action) =>
            this.httpStoreService.getLocals().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new LocalActions.SetPaginationAction(pagination),
                        new LocalActions.LoadLocalsSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new LocalActions.LocalErrorAction(errorResp));
                })
            )
        )
    );


    @Effect()
    loadLocalList$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.LoadLocalsListAction>(LocalActions.LOAD_LOCALS_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpStoreService.getLocalsList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new LocalActions.LoadLocalsListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    return of(new LocalActions.LocalErrorAction(errorResp));
                })
            )
        )
    );




    @Effect()
    saveLocal$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.SaveLocalAction>(LocalActions.SAVE_LOCAL),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpStoreService.saveLocal(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/locals/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new LocalActions.SaveLocalSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new LocalActions.LocalErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateLocal$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.UpdateLocalAction>(LocalActions.UPDATE_LOCAL),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpStoreService.updateLocal(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/locals/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new LocalActions.UpdateLocalSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new LocalActions.LocalErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteLocal$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.DeleteLocalAction>(LocalActions.DELETE_LOCAL),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpStoreService.deleteLocal(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new LocalActions.DeleteLocalSuccessAction(),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new LocalActions.LoadLocalsAction()
                    ];
                }),
                catchError(errorResp => {
                     return of(new LocalActions.LocalErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.ChangePaginationAction>(LocalActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpStoreService.changePagination(pagination).pipe(
                map((response) => {
                    return new LocalActions.LoadLocalsAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.ChangeSearchValueAction>(LocalActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpStoreService.changeSearchValue(value).pipe(
                map((response) => {
                    return new LocalActions.LoadLocalsAction();
                })
            )
        )
    );

    @Effect()
    localError$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.LocalErrorAction>(LocalActions.LOCAL_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );

    @Effect()
    resetLoadRequest$: Observable<Action> = this.actions$.pipe(
        ofType<LocalActions.ResetLoadRequestAction>(LocalActions.RESET_LOAD_REQUEST),
        switchMap((action) =>
            this.httpStoreService.resetLoadRequest().pipe(
                map(() => {
                    return new LocalActions.ResetLoadRequestSuccessAction();
                })
            )
        )
    );
}
