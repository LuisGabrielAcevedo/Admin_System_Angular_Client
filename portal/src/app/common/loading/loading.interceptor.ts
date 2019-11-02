import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddRequestAction, RemoveRequestAction } from './store/loading.actions';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {
  UID = 0;
  constructor(private store: Store<any>) {}

  generateUID() {
    return `UID-${this.UID++}`;
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let id = this.generateUID();
    let payload = { id, request };

    this.store.dispatch(new AddRequestAction(payload));

    return next
      .handle(request)
      .pipe(
        finalize(() => this.store.dispatch(new RemoveRequestAction(payload)))
      );
  }
}
