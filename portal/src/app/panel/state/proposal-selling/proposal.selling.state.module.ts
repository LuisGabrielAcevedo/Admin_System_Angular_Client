import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { proposalSellingReducer } from './proposal.selling.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProposalSellingEffects } from './proposal.selling.effect';
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('proposal-selling', proposalSellingReducer),
    EffectsModule.forFeature([ProposalSellingEffects])
  ]
})
export class ProposalSellingStateModule {}
