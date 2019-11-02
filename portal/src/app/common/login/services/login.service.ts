import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RedirectService } from '@app/common/redirect/redirect.service';

@Injectable()
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private redirectService: RedirectService
  ) {}

  public revokeToken(): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiEndpoint + '/login/token/revoke',
      {}
    );
  }

  public getLoginUrl(): string {
    const userData = this.tokenService.getUserData();
    const loginMap = environment.loginMap;
    if (userData && userData.roles && userData.roles.length > 0) {
      let role = userData.roles.find(r => !!loginMap[r]);
      if (role) return loginMap[role];
    }
    return loginMap.DEFAULT;
  }

  public logout(message: string = ''): Observable<any> {
    const loginUrl = this.getLoginUrl();
    return this.revokeToken().pipe(
      finalize(() => {
        this.tokenService.removeToken();
        if (message) {
          this.redirectService.showExitMessage(loginUrl, message);
        } else {
          this.redirectService.go(loginUrl);
        }
      })
    );
  }
}
