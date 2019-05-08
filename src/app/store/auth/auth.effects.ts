import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as RouterActions from '../router/router.actions';
import * as AuthActions from './auth.actions';
import { UserService } from '../../services/http/user.service';
import * as SnackbarActions from '../snackbar/snackbar.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private httpUserService: UserService
    ) { }

    @Effect()
    loadUsers$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.AuthUserAction>(AuthActions.AUTH_USER),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.httpUserService.login(loadRequest).pipe(
                switchMap((response) => {
                    return [
                        new RouterActions.Go({
                            path: ['/administration/users/list']
                        }),
                        new AuthActions.AuthUserSuccessAction(response.data)
                    ];
                }),
                catchError(errorResp => {
                    return of(new AuthActions.AuthErrorAction(errorResp));
                })

            )
        )
    );

    @Effect()
    UserError$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.AuthErrorAction>(AuthActions.AUTH_ERROR),
        map(action => action.payload),
        switchMap((errorMessage) => {
            return [new SnackbarActions.SendMessageAction({message: errorMessage.error.msg})];
        })
    );
}
