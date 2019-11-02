import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { blockingReducer } from './blocking.reducer';
@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature('blocking', blockingReducer)]
})
export class BlockingStateModule {}
