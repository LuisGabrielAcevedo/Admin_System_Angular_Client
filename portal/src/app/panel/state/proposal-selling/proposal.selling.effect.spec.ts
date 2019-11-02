import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { ChangeFilterByAction } from '../proposal-filter/proposal.filter.actions';
import { SetSellingAction } from './proposal.selling.actions';
import { ProposalSellingEffects } from './proposal.selling.effect';

describe('rxjs-marbles', () => {
  let effects: ProposalSellingEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProposalSellingEffects, provideMockActions(() => actions$)]
    });
    actions$ = TestBed.get(Actions);

    effects = TestBed.get(ProposalSellingEffects);
  });
  const payload = {
    sellingPoint: {
      idSellingPoint: 350763,
      name: 'SALVADOR M PESTELLI SA',
      city: 'CAPITAL',
      sellingPointCode: '540',
      strategyCode: 'C540',
      agentCode: '540',
      branchCode: '90055',
      integrationCode: '55'
    }
  };
  it(
    'should pass marble tests',
    marbles(m => {
      const action = new SetSellingAction(payload);
      const statuses = [{ description: 'abc', id: '123' }];

      const complPayload = {
        filterBy: {
          sellingPointCode: '540'
        }
      };
      const completion = new ChangeFilterByAction(complPayload);
      actions$ = m.hot('-a---', { a: action });
      const response = m.cold('-a|', { a: statuses });
      const expected = m.cold('-b', { b: completion });
      m.expect(effects.proposalLoad$).toBeObservable(expected);
    })
  );
});
