import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { RouterState } from './model/router-state';

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterState> {
  /**
   * Only returns a simple object (with URL, params and query params) instead of an entire angular router snapshot
   */
  serialize(routerState: RouterStateSnapshot): RouterState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    return { url, params, queryParams } as RouterState;
  }
}
