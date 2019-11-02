import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PanelService } from '../../service/panel.service';
import { ChangeFilterByAction } from '../proposal-filter/proposal.filter.actions';
import { SET_SELLING, SetSellingAction } from './proposal.selling.actions';

@Injectable({
  providedIn: 'root'
})
export class ProposalSellingEffects {
  @Effect()
  proposalLoad$: Observable<any> = this.actions$.pipe(
    ofType(SET_SELLING),
    map(
      (action: SetSellingAction) =>
        new ChangeFilterByAction({
          filterBy: {
            sellingPointCode: action.payload.sellingPoint['sellingPointCode']
          }
        })
    )
  );
  constructor(private actions$: Actions) {}
}
