import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { userSelector } from '../login/store/login.selectors';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private store: Store<any>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(userSelector).pipe(
      take(1),
      mergeMap(user => {
        if (user.roles.some(role => next.data.roles.indexOf(role) >= 0)) {
          return of(true);
        } else {
          this.router.navigate(['/panel']);
          return EMPTY;
        }
      })
    );
  }
}
