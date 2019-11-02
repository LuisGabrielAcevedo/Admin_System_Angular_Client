import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhaseStateModule } from './state/phase.state.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbModule, PhaseStateModule]
})
export class PhaseModule {}
