import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen, takeWhile } from 'rxjs/operators';
import { EXPIRED_TOKEN_MESSAGE } from './../../constants/error.constants';
type callbackThatReturnsABoolean = (...args: any[]) => boolean;

@Injectable({
  providedIn: 'root'
})
export class PollingService {
  constructor(private httpClient: HttpClient) {}

  public doPolling(
    url: string,
    callback: callbackThatReturnsABoolean,
    step = 1000,
    maxRetries = 10
  ): Observable<any> {
    let retries = 0;
    return this.httpClient.get(url).pipe(
      mergeMap(response => {
        if (callback(response) && retries < maxRetries) {
          retries++;
          return throwError(response);
        } else {
          return of(response);
        }
      }),
      retryWhen(errors => {
        return errors.pipe(
          takeWhile(res => {
            const condition = res.error && res.error === EXPIRED_TOKEN_MESSAGE; // Identification token not found; Did it expire?
            return !condition;
          }),
          delay(step)
        );
      })
    );
  }
}
