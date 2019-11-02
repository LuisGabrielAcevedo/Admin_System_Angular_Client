import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockingComponent } from './blocking/blocking.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockingContainerComponent } from './blocking.container/blocking.container.component';
import { BlockingStateModule } from './state/blocking.state.module';

@NgModule({
  declarations: [BlockingComponent, BlockingContainerComponent],
  imports: [CommonModule, NgbModule, BlockingStateModule],
  exports: [BlockingContainerComponent]
})
export class BlockingModule {}
