import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TokenUserDataDTO } from '../models/api/token';
import { ExitMessagesEnum } from '../models/exit-messages.enum';
import { UserData } from '../models/state/user-data';
import { CloseSessionAction, LoadUserDataAction } from '../store/login.actions';
import { LoginState } from '../store/login.state';

@Injectable()
export class TokenService {
  constructor(private store: Store<LoginState>) {}

  private decodeUserData(token: string): TokenUserDataDTO {
    if (!token) return null;
    const encodedParts = token.split('.');

    if (!encodedParts || !encodedParts[1]) return null;
    const encodedData = encodedParts[1];
    const decodedData = atob(encodedData);

    if (!decodedData) return null;
    try {
      const userData = JSON.parse(decodedData);
      return userData;
    } catch {
      return null;
    }
  }

  private tokenUserDataDTO2UserData(tud: TokenUserDataDTO): UserData {
    const {
      userId: id,
      name,
      email,
      username,
      sellingPointIds,
      roles
    } = tud.userInfo;
    return { id, email, username, sellingPointIds, name, roles };
  }

  public getUserData(): UserData {
    const token = this.loadToken();
    const tokenUserData = this.decodeUserData(token);
    if (tokenUserData) return this.tokenUserDataDTO2UserData(tokenUserData);
    return null;
  }

  public login() {
    const userData = this.getUserData();
    if (userData) {
      this.store.dispatch(new LoadUserDataAction(userData));
    } else {
      this.store.dispatch(
        new CloseSessionAction(ExitMessagesEnum.INVALID_TOKEN)
      );
    }
    return of(userData).toPromise();
  }

  public saveToken(token: string) {
    return window.sessionStorage.setItem('srt', token);
  }

  public loadToken(): string {
    return window.sessionStorage.getItem('srt');
  }

  public removeToken() {
    return window.sessionStorage.removeItem('srt');
  }
}
