import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { proposalReducer } from './proposal.reducer';
import { proposalInitialState } from './proposal.init';
import { ProposalEffects } from './proposal.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('proposal', proposalReducer, {
      initialState: proposalInitialState
    }),
    EffectsModule.forFeature([ProposalEffects])
  ]
})
export class ProposalStateModule {}
