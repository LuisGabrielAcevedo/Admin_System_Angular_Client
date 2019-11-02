import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LoadUserDataAction,
  LoginActionTypes,
  UserSellingPointsLoadAction,
  UserSellingPointsLoadEndedAction,
  LogoutAction,
  CloseSessionAction
} from './login.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { forkJoin, NEVER } from 'rxjs';
import { UserSellingPointsService } from '../services/user-selling-points.service';
import { LoginService } from '../services/login.service';
import { ExitMessagesEnum } from '../models/exit-messages.enum';

@Injectable()
export class LoginEffects {
  constructor(
    public actions: Actions,
    private userSellingPointService: UserSellingPointsService,
    private loginService: LoginService
  ) {}

  @Effect()
  loadUserData = this.actions.pipe(
    ofType<LoadUserDataAction>(LoginActionTypes.USER_DATA_LOAD),
    map(action =>
      action.userData.sellingPointIds.length > 0
        ? new UserSellingPointsLoadAction(
            action.userData.sellingPointIds,
            action.userData.id
          )
        : new CloseSessionAction(ExitMessagesEnum.USER_SELLING_POINT_MISSING)
    )
  );

  @Effect()
  userSellingPointsLoad = this.actions.pipe(
    ofType<UserSellingPointsLoadAction>(
      LoginActionTypes.USER_SELLING_POINTS_REMOTE_LOAD
    ),
    mergeMap(action =>
      forkJoin(
        action.sellingPointsId.map(id =>
          this.userSellingPointService.getSellingPoint(id)
        )
      )
    ),
    map(sellingPoints => new UserSellingPointsLoadEndedAction(sellingPoints)),
    catchError(err => NEVER)
  );

  @Effect()
  logout = this.actions.pipe(
    ofType<LogoutAction>(LoginActionTypes.LOG_OUT),
    map(action => new CloseSessionAction(ExitMessagesEnum.LOGOUT))
  );

  @Effect()
  closeSession = this.actions.pipe(
    ofType<CloseSessionAction>(LoginActionTypes.CLOSE_SESSION),
    mergeMap(action => this.loginService.logout(action.message))
  );
}
