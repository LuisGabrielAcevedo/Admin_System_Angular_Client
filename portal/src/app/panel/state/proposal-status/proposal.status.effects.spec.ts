import { TestBed } from '@angular/core/testing';
import { ProposalStatusEffects } from './proposal.status.effects';
import { PanelService } from '../../service/panel.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { LoadProposalAction } from '../../../proposal/state/proposal.actions';
import {
  LoadProposalStatusAction,
  LoadProposalStatusSuccessAction
} from './proposal.status.actions';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';
// describe('ProposalStatusEffects', () => {
//   let db: any;
//   let effects: ProposalStatusEffects;
//   let actions$: Observable<any>;
//   let panelService: PanelService;
//   let store: Store<any>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         ProposalStatusEffects,
//         {
//           provide: PanelService,
//           useValue: {
//             getProposalStatus: jest.fn()
//           }
//         },

//         provideMockActions(() => actions$)
//       ]
//     });
//     panelService = TestBed.get(PanelService);
//     actions$ = TestBed.get(Actions);

//     effects = TestBed.get(ProposalStatusEffects);
//   });

//   it('LoadProposalStatusSuccessAction should work', () => {
//     effects.proposalLoad$.subscribe(teste => console.log(teste));
//     const spy = jest.spyOn(panelService, 'getProposalStatus');

//     actions$.subscribe(teste => console.log(teste));

//     store.dispatch(new LoadProposalStatusAction());

//     expect(spy).toHaveBeenCalled();
//     expect(effects.proposalLoad$).toBeObservable()
//   });
// });

describe('rxjs-marbles', () => {
  let db: any;
  let effects: ProposalStatusEffects;
  let actions$: Observable<any>;
  let panelService: PanelService;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProposalStatusEffects,
        {
          provide: PanelService,
          useValue: {
            getProposalStatus: jest.fn()
          }
        },

        provideMockActions(() => actions$)
      ]
    });
    panelService = TestBed.get(PanelService);
    actions$ = TestBed.get(Actions);

    effects = TestBed.get(ProposalStatusEffects);
  });

  it(
    'should support marble tests',
    marbles(m => {
      const source = m.hot('--^-a-b-c-|');
      const subs = '^-------!';
      const expected = '--b-c-d-|';

      const destination = source.pipe(
        map(value => String.fromCharCode(value.charCodeAt(0) + 1))
      );
      m.expect(destination).toBeObservable(expected);
      m.expect(source).toHaveSubscriptions(subs);
    })
  );

  it(
    'should pass marble tests',
    marbles(m => {
      const action = new LoadProposalStatusAction();
      const statuses = [{ description: 'abc', id: '123' }];
      const completion = new LoadProposalStatusSuccessAction({
        proposalStatus: [{ id: '', description: 'TODOS' }, ...statuses]
      });
      actions$ = m.hot('-a---', { a: action });
      const response = m.cold('-a|', { a: statuses });
      const expected = m.cold('--b', { b: completion });
      panelService.getProposalStatus = jest.fn(() => response);
      m.expect(effects.proposalLoad$).toBeObservable(expected);
    })
  );
});
