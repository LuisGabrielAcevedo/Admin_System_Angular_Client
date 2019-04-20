import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as ApplicationActions from './application.actions';
import { ApplicationService } from '../../services/http/application.service';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import * as RouterActions from '../router/router.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';

@Injectable()
export class ApplicationEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpApplicationService: ApplicationService
    ) { }

    @Effect()
    loadApplications$: Observable<Action> = this.actions$.pipe(
        ofType<ApplicationActions.LoadApplicationsAction>(ApplicationActions.LOAD_APPLICATIONS),
        switchMap((action) =>
            this.httpApplicationService.getApplications().pipe(
                switchMap((response) => {
                    const pagination: TablePagination = {
                        currentPage: response.currentPage,
                        totalItems: response.totalItems,
                        itemsPerPage: response.itemsPerPage
                    };
                    return [
                        new ApplicationActions.SetPaginationAction(pagination),
                        new ApplicationActions.LoadApplicationsSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new ApplicationActions.ApplicationErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    loadApplicationsList$: Observable<Action> = this.actions$.pipe(
        ofType<ApplicationActions.LoadApplicationsListAction>(ApplicationActions.LOAD_APPLICATIONS_LIST),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpApplicationService.getApplicationsList(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new ApplicationActions.LoadApplicationsListSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                     return of(new ApplicationActions.ApplicationErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    saveApplication$: Observable<Action> = this.actions$.pipe(
        ofType<ApplicationActions.SaveApplicationAction>(ApplicationActions.SAVE_APPLICATION),
        map(action => action.payload),
        switchMap((saveRequest) =>
            this.httpApplicationService.saveApplication(saveRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/applications/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ApplicationActions.SaveApplicationSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new ApplicationActions.ApplicationErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    updateApplication$: Observable<Action> = this.actions$.pipe(
        ofType<ApplicationActions.UpdateApplicationAction>(ApplicationActions.UPDATE_APPLICATION),
        map(action => action.payload),
        switchMap((updateRequest) =>
            this.httpApplicationService.updateApplication(updateRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/applications/list']
                        }),
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ApplicationActions.UpdateApplicationSuccessAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new ApplicationActions.ApplicationErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    deleteApplication$: Observable<Action> = this.actions$.pipe(
        ofType<ApplicationActions.DeleteApplicationAction>(ApplicationActions.DELETE_APPLICATION),
        map(action => action.payload),
        switchMap((deleteRequest) =>
            this.httpApplicationService.deleteApplication(deleteRequest).pipe(
                switchMap((response) => {
                    return [
                        new SnackbarActions.SendMessageAction({message: response.msg}),
                        new ApplicationActions.DeleteApplicationSuccessAction(),
                        new ApplicationActions.LoadApplicationsAction()
                    ];
                }),
                catchError(errorResp => {
                    console.log(errorResp.error.msg);
                    return of(new ApplicationActions.ApplicationErrorAction(errorResp));
                })
            )
        )
    );

    @Effect()
    changePagination$: Observable<Action> = this.actions$.pipe(
        ofType<ApplicationActions.ChangePaginationAction>(ApplicationActions.CHANGE_PAGINATION),
        map(action => action.payload),
        switchMap((pagination) =>
            this.httpApplicationService.changePagination(pagination).pipe(
                map((response) => {
                    return new ApplicationActions.LoadApplicationsAction();
                })
            )
        )
    );

    @Effect()
    changeSearchValue$: Observable<Action> = this.actions$.pipe(
        ofType<ApplicationActions.ChangeSearchValueAction>(ApplicationActions.CHANGE_SEARCH_VALUE),
        map(action => action.payload),
        switchMap((value) =>
            this.httpApplicationService.changeSearchValue(value).pipe(
                map((response) => {
                    return new ApplicationActions.LoadApplicationsAction();
                })
            )
        )
    );
}
