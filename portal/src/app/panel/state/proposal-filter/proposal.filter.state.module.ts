import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { proposalFilterReducer } from './proposal.filter.reducer';
@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature('proposal-filter', proposalFilterReducer)]
})
export class ProposaFilterStateModule {}
