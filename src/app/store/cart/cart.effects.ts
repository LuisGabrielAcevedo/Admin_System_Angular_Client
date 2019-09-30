import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of, timer } from "rxjs";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import * as CartActions from "./cart.actions";
import User from "src/app/models/admin-system/users";
import { ECartTabActive } from "src/app/inferfaces/admin-system/order";
import { MatDialog } from "@angular/material";
import { ProfileCardComponent } from "src/app/modules/admin-system/system/profile-card/profile-card.component";

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, public dialog: MatDialog) {}

  @Effect()
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType<CartActions.SetAddItemAction>(CartActions.CART_ADD_ITEM),
    map(action => action.payload),
    tap(a => console.log(a)),
    switchMap(data =>
      User.findRx().pipe(
        switchMap(response => {
          const dialogRef = timer(5000);
          return dialogRef.pipe(
            switchMap(response => {
              return [
                new CartActions.SetTabActiveAction(ECartTabActive.checkout)
              ];
            }),
            catchError(errorResp => {
              return of(errorResp);
            })
          );
        }),
        catchError(errorResp => {
          return of(errorResp);
        })
      )
    )
  );
}

// switchMap(response => {
//           this.tokenService.setToken(response.token);
//             return [
//               new RouterActions.Go({
//                 path: ["/administration/users"]
//               }),
//               new CartActions.AuthUserSuccessAction(response.data)
//             ];
//         }),
