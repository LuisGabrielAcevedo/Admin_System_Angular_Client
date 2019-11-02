import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { PhaseEffects } from './phase.effects';

@NgModule({
  declarations: [],
  imports: [EffectsModule.forFeature([PhaseEffects])]
})
export class PhaseStateModule {}
