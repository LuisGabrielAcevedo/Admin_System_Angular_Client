
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../services/http/token.service';
import { Router } from '@angular/router';

@Injectable()
export class AdminSystemInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    const n = request.url.search('google');
    const updatedRequest = n < 0 ? request.clone({
      headers: request.headers.set('Authorization', token ? token : '')
    }) : request;

    return next.handle(updatedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error.code === 401) {
          this.router.navigate(['login']);
        }
        return throwError(err);
      })
    );
  }
}
