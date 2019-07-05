import { Action } from '@ngrx/store';
import { ILoginRequest, IUser } from '../../inferfaces/user';

export const AUTH_USER = '[Auth] Auth Users';
export const AUTH_USER_SUCCESS = '[Auth] Auth Users Succces';

export const AUTH_ERROR = '[Auth] User Error';

export class AuthUserAction implements Action {
    readonly type = AUTH_USER;
    constructor(public payload: ILoginRequest) { }
}

export class AuthUserSuccessAction implements Action {
    readonly type = AUTH_USER_SUCCESS;
    constructor(public payload: IUser) { }
}

export class AuthErrorAction implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload: any) { }
}

export type Actions
    = AuthUserAction
    | AuthUserSuccessAction
    | AuthErrorAction;
