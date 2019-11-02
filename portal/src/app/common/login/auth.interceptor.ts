import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExitMessagesEnum } from './models/exit-messages.enum';
import { TokenService } from './services/token.service';
import { CloseSessionAction } from './store/login.actions';
import { LoginState } from './store/login.state';

const addHeader = function(
  request: HttpRequest<any>,
  headerName: string,
  headerValue: string
): HttpRequest<any> {
  return request.clone({
    headers: request.headers.set(headerName, headerValue)
  });
};

const addAuthorizationHeader = function(
  request: HttpRequest<any>,
  token: string
): HttpRequest<any> {
  return addHeader(request, 'Authorization', `Bearer ${token}`);
};

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private store: Store<LoginState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.loadToken();
    const newRequest = addAuthorizationHeader(request, token);

    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.store.dispatch(
            new CloseSessionAction(ExitMessagesEnum.SESSION_EXPIRED)
          );
        }
        return throwError(error);
      })
    );
  }
}
