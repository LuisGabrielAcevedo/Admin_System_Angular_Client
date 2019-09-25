import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import * as fromRoot from "../index.store";
import * as UserActions from "./user.actions";
import UserService from "../../services/admin-system/users.service";
import { TablePagination } from "src/app/components/sharedComponents/table/table.interfaces";
import * as RouterActions from "../router/router.actions";
import * as SnackbarActions from "../snackbar/snackbar.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private httpUserService: UserService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.LoadUsersAction>(UserActions.LOAD_USERS),
    switchMap(action =>
      this.httpUserService.getUsers().pipe(
        switchMap(response => {
          const pagination: TablePagination = {
            currentPage: response.currentPage,
            totalItems: response.totalItems,
            itemsPerPage: response.itemsPerPage
          };
          return [
            new UserActions.SetPaginationAction(pagination),
            new UserActions.LoadUsersSuccessAction(response.data)
          ];
        }),
        catchError(errorResp => {
          return of(new UserActions.UserErrorAction(errorResp));
        })
      )
    )
  );

  @Effect()
  loadUsersList$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.LoadUsersListAction>(UserActions.LOAD_USERS_LIST),
    map(action => action.payload),
    switchMap(loadRequest =>
      this.httpUserService.getUsersList(loadRequest).pipe(
        switchMap(response => {
          return [new UserActions.LoadUsersListSuccessAction(response.data)];
        })
      )
    )
  );

  @Effect()
  saveUser$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.SaveUserAction>(UserActions.SAVE_USER),
    map(action => action.payload),
    switchMap(saveRequest =>
      this.httpUserService.saveUser(saveRequest).pipe(
        switchMap(response => {
          return [
            new RouterActions.Go({
              path: ["/administration/users/list"]
            }),
            new SnackbarActions.SendMessageAction({ message: response.msg }),
            new UserActions.SaveUserSuccessAction()
          ];
        }),
        catchError(errorResp => {
          return of(new UserActions.UserErrorAction(errorResp));
        })
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.UpdateUserAction>(UserActions.UPDATE_USER),
    map(action => action.payload),
    switchMap(updateRequest =>
      this.httpUserService
        .updateUser(updateRequest.user, updateRequest.file)
        .pipe(
          switchMap(response => {
            return [
              new RouterActions.Go({
                path: ["/administration/users/list"]
              }),
              new SnackbarActions.SendMessageAction({ message: response.msg }),
              new UserActions.UpdateUserSuccessAction()
            ];
          }),
          catchError(errorResp => {
            return of(new UserActions.UserErrorAction(errorResp));
          })
        )
    )
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.DeleteUserAction>(UserActions.DELETE_USER),
    map(action => action.payload),
    switchMap(deleteRequest =>
      this.httpUserService.deleteUser(deleteRequest).pipe(
        switchMap(response => {
          return [
            new UserActions.DeleteUserSuccessAction(),
            new SnackbarActions.SendMessageAction({ message: response.msg }),
            new UserActions.LoadUsersAction()
          ];
        }),
        catchError(errorResp => {
          return of(new UserActions.UserErrorAction(errorResp));
        })
      )
    )
  );

  @Effect()
  changePagination$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.ChangePaginationAction>(UserActions.CHANGE_PAGINATION),
    map(action => action.payload),
    switchMap(pagination =>
      this.httpUserService.changePagination(pagination).pipe(
        map(response => {
          return new UserActions.LoadUsersAction();
        })
      )
    )
  );

  @Effect()
  changeSearchValue$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.ChangeSearchValueAction>(
      UserActions.CHANGE_SEARCH_VALUE
    ),
    map(action => action.payload),
    switchMap(value =>
      this.httpUserService.changeSearchValue(value).pipe(
        map(response => {
          return new UserActions.LoadUsersAction();
        })
      )
    )
  );

  @Effect()
  UserError$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.UserErrorAction>(UserActions.USER_ERROR),
    map(action => action.payload),
    switchMap(errorMessage => {
      return [
        new SnackbarActions.SendMessageAction({
          message: errorMessage.error.msg
        })
      ];
    })
  );

  @Effect()
  resetLoadRequest$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.ResetLoadRequestAction>(UserActions.RESET_LOAD_REQUEST),
    switchMap(action =>
      this.httpUserService.resetLoadRequest().pipe(
        map(() => {
          return new UserActions.ResetLoadRequestSuccessAction();
        })
      )
    )
  );
}
