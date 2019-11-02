import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { proposalStatusReducer } from './proposal.status.reducer';
import { ProposalStatusEffects } from './proposal.status.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('proposal-status', proposalStatusReducer),
    EffectsModule.forFeature([ProposalStatusEffects])
  ]
})
export class ProposalStatusStateModule {}
