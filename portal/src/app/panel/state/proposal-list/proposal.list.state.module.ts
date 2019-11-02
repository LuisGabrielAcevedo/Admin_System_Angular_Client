import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { proposalListReducer } from './proposal.list.reducer';
import { ProposalListEffects } from './proposal.list.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('proposal-list', proposalListReducer),
    EffectsModule.forFeature([ProposalListEffects])
  ]
})
export class ProposalListStateModule {}
