import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromRoot from '../index.store';
import * as AdminSystemActions from './adminSystem.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { AdminSystemService } from 'src/app/services/http/adminSystem.service';

@Injectable()
export class AdminSystemEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private httpAdminSystemService: AdminSystemService
    ) { }

    @Effect()
    loadApiProductTypes$: Observable<Action> = this.actions$.pipe(
        ofType<AdminSystemActions.LoadApiProductTypesAction>(AdminSystemActions.LOAD_API_PRODUCT_TYPES),
        switchMap((action) =>
            this.httpAdminSystemService.loadApiProductTypes().pipe(
                switchMap((response) => {
                    return [
                        new AdminSystemActions.LoadApiProductTypesSuccessAction(response.data)
                    ];
                })
            )
        )
    );

    @Effect()
    loadUnits$: Observable<Action> = this.actions$.pipe(
        ofType<AdminSystemActions.LoadUnitsAction>(AdminSystemActions.LOAD_UNITS),
        switchMap((action) =>
            this.httpAdminSystemService.loadUnits().pipe(
                switchMap((response) => {
                    return [
                        new AdminSystemActions.LoadUnitsSuccessAction(response.data)
                    ];
                })
            )
        )
    );

    @Effect()
    loadCoins$: Observable<Action> = this.actions$.pipe(
        ofType<AdminSystemActions.LoadCoinsAction>(AdminSystemActions.LOAD_COINS),
        switchMap((action) =>
            this.httpAdminSystemService.loadCoins().pipe(
                switchMap((response) => {
                    return [
                        new AdminSystemActions.LoadCoinsSuccessAction(response.data)
                    ];
                })
            )
        )
    );
}
