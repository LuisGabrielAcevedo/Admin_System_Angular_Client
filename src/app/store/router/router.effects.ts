import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as RouterActions from './router.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
    constructor(private actions$: Actions, private router: Router) { }

    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(RouterActions.GO),
        map((action: RouterActions.Go) => action.payload),
        tap(({ path, query: queryParams, extras }) => {
            this.router.navigate(path, { queryParams, ...extras });
        })
    );
}
