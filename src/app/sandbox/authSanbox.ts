import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../store/auth/auth.actions';
import * as fromRoot from '../store/index.store';
import { IUser, ILoginRequest } from '../inferfaces/user';

@Injectable()
export class AuthSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchUser(): Observable<IUser> {
        return this.store.select(fromRoot.getUser);
    }
    fetchIsLogged(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLogged);
    }
    fetchIsLoading(): Observable<boolean> {
        return this.store.select(fromRoot.getIsLoadingAuth);
    }
    login(user: ILoginRequest): void {
        this.store.dispatch(new AuthActions.AuthUserAction(user));
    }
}
